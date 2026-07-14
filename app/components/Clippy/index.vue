<script setup lang="ts">
type ClippyAgent = Awaited<ReturnType<(typeof import('clippyjs'))['initAgent']>>;

const GREETINGS = [
  'It looks like you\'re browsing Daan\'s portfolio. Is there anything you\'d like to know?',
  'Hi! I\'m Clippy. Want to know more about Daan?',
  'It looks like you\'re looking at a portfolio! Need a tour guide?',
  'Oh hey! Ask me anything about Daan\'s work.',
  'It looks like you\'re trying to learn about Daan. Fire away!',
];
const THINKING_PHRASES = [
  'Thinking...',
  'Hmm, let me see...',
  'One moment...',
  'Consulting my paperclip wisdom...',
  'Digging through the archives...',
];
const FALLBACK_REPLY = 'Uh oh, my brain isn\'t working right now. Try asking again in a bit?';

function pickRandom(options: string[]) {
  return options[Math.floor(Math.random() * options.length)]!;
}

const INPUT_GAP = 8;
// Toolbar/index.vue's taskbar is h-9 (36px) - keep the input bar clear of it.
const TASKBAR_HEIGHT = 36;

const { state, activate, dismiss } = useClippy();

const input = ref('');
const loading = ref(false);
const history = ref<{ role: 'user' | 'assistant'; content: string }[]>([]);
const inputBarRef = ref<HTMLElement>();
const inputPos = ref({ top: 0, left: 0 });
let agent: ClippyAgent | null = null;
let trackHandle: number | undefined;
let funTimer: ReturnType<typeof setTimeout> | undefined;

// Clippy is draggable, so the input bar can't have a fixed position of its
// own - every frame it re-reads Clippy's actual rect and docks below it.
function trackPosition() {
  if (agent && inputBarRef.value) {
    const clippyRect = agent._el.getBoundingClientRect();
    // Clippy's element is size-0 while hidden/mid-animation-start - skip
    // those frames instead of docking the input bar to a bogus (0,0) rect.
    if (clippyRect.width && clippyRect.height) {
      const bar = inputBarRef.value;
      const maxTop = window.innerHeight - TASKBAR_HEIGHT - bar.offsetHeight;
      let top = clippyRect.bottom + INPUT_GAP;
      if (top > maxTop)
        top = clippyRect.top - bar.offsetHeight - INPUT_GAP;
      top = Math.min(top, maxTop);
      const left = Math.min(Math.max(clippyRect.right - bar.offsetWidth, 0), window.innerWidth - bar.offsetWidth);
      inputPos.value = { top, left };
    }
  }
  trackHandle = requestAnimationFrame(trackPosition);
}

// Just for fun: a random non-idle gesture every 15-30s while Clippy is out.
function scheduleFunAnimation() {
  funTimer = setTimeout(() => {
    agent?.animate();
    scheduleFunAnimation();
  }, 15000 + Math.random() * 15000);
}

onMounted(async () => {
  const { initAgent } = await import('clippyjs');
  const { Clippy } = await import('clippyjs/agents');
  agent = await initAgent(Clippy);

  setTimeout(activate, 2500);
});

// clippyjs's action queue only advances once the balloon is explicitly
// closed, so a held-open balloon (hold=true) must be stopped before the
// next speak() - otherwise every following reply queues up forever.
function say(text: string) {
  agent?.stopCurrent();
  agent?.speak(text, true);
}

// play() auto-exits after 5s even if the request is slower, and clippyjs
// falls back to idle fidgeting until say() interrupts it once the reply is in.
function think() {
  if (!agent)
    return;
  agent.stopCurrent();
  agent.play('Thinking');
  agent.speak(pickRandom(THINKING_PHRASES), false);
}

watch(state, (value) => {
  if (!agent)
    return;
  if (value === 'active') {
    agent.show(false);
    agent.play('Greeting');
    say(pickRandom(GREETINGS));
    trackHandle = requestAnimationFrame(trackPosition);
    scheduleFunAnimation();
  }
  else {
    if (trackHandle)
      cancelAnimationFrame(trackHandle);
    clearTimeout(funTimer);
    agent.stop();
    agent.play('GoodBye', 5000, () => agent?.hide(true, undefined));
  }
});

async function send() {
  const message = input.value.trim();
  if (!message || loading.value)
    return;

  input.value = '';
  loading.value = true;
  think();

  try {
    const { reply } = await $fetch('/api/clippy', {
      method: 'POST',
      body: { message, history: history.value.slice(-6) },
    });
    history.value.push({ role: 'user', content: message }, { role: 'assistant', content: reply });
    say(reply);
  }
  catch {
    say(FALLBACK_REPLY);
  }
  finally {
    loading.value = false;
  }
}

onUnmounted(() => {
  if (trackHandle)
    cancelAnimationFrame(trackHandle);
  clearTimeout(funTimer);
  agent?.dispose();
});
</script>

<template>
  <div
    v-if="state === 'active'"
    ref="inputBarRef"
    class="fixed z-[600] w95-button-border bg-w95-gray p-1.5 flex gap-1.5 items-center"
    :style="{ top: `${inputPos.top}px`, left: `${inputPos.left}px` }"
  >
    <input
      v-model="input"
      type="text"
      :disabled="loading"
      placeholder="Ask Clippy..."
      class="w95-border font-w95 text-[10px] focus:outline-none px-1 py-0.5 w-[160px] max-sm:w-[120px]"
      @keyup.enter="send"
    >
    <W95Button size="sm" :disabled="loading" @click="send">
      {{ loading ? '...' : 'Ask' }}
    </W95Button>
    <W95Button size="sm" title="Dismiss" @click="dismiss">
      X
    </W95Button>
  </div>
</template>
