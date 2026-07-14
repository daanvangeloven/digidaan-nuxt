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

// Clippy's replies can end with a hidden [[action:open:contact]] marker (see
// server/api/clippy.post.ts) telling us to drive a window. Strip it out of
// what gets spoken and act on it - unknown ids are just no-ops in useModals.
const ACTION_RE = /\[\[action:(open|close|minimize):([\w-]+)\]\]\s*$/i;

function extractAction(reply: string) {
  const match = reply.match(ACTION_RE);
  if (!match)
    return { text: reply, action: null };
  return {
    text: reply.slice(0, match.index).trim(),
    action: { type: match[1] as 'open' | 'close' | 'minimize', id: match[2]! },
  };
}

const INPUT_GAP = 8;
// Toolbar/index.vue's taskbar is h-9 (36px) - keep the input bar clear of it.
const TASKBAR_HEIGHT = 36;

const { state, activate } = useClippy();
const { openModal, closeModal, minimizeModal } = useModalStore();

const input = ref('');
const loading = ref(false);
const thinkingPhrase = ref('');
const history = ref<{ role: 'user' | 'assistant'; content: string }[]>([]);
const inputBarRef = ref<HTMLElement>();
const inputPos = ref({ top: 0, left: 0 });
let agent: ClippyAgent | null = null;
let trackHandle: number | undefined;
let funTimer: ReturnType<typeof setTimeout> | undefined;
let repositioned = false;

// Clippy can move on show/reposition, so the input bar can't have a fixed
// position of its own - every frame it re-reads Clippy's actual rect and docks below it.
function trackPosition() {
  if (agent && inputBarRef.value) {
    const clippyRect = agent._el.getBoundingClientRect();
    // Clippy's element is size-0 while hidden/mid-animation-start (its first
    // "Show" frame has no image data, so it stays display:none for a tick)
    // - skip those frames instead of docking the input bar to a bogus (0,0)
    // rect.
    if (clippyRect.width && clippyRect.height) {
      // show()'s own initial-position clamp runs on that same still-hidden
      // first tick, so it reads offsetWidth/offsetHeight as 0 and doesn't
      // actually keep the 124x93 sprite on screen - clips off the edge on
      // narrow viewports. Correct it once, as soon as it's actually visible
      // and reposition() can read its real size.
      if (!repositioned) {
        agent.reposition();
        repositioned = true;
      }
      // The balloon can render above OR below Clippy (clippyjs picks
      // whichever side fits), so always dock under the lower of the two
      // instead of flipping above Clippy - that flip could land the bar
      // right on top of a balloon that's rendered above.
      const balloonEl = agent._balloon._balloon;
      const balloonRect = balloonEl.style.display === 'none' ? null : balloonEl.getBoundingClientRect();
      const bottom = balloonRect ? Math.max(clippyRect.bottom, balloonRect.bottom) : clippyRect.bottom;
      const bar = inputBarRef.value;
      const maxTop = window.innerHeight - TASKBAR_HEIGHT - bar.offsetHeight;
      const top = Math.min(Math.max(bottom + INPUT_GAP, 0), maxTop);
      const left = Math.min(Math.max(clippyRect.right - bar.offsetWidth, 0), window.innerWidth - bar.offsetWidth);
      inputPos.value = { top, left };
    }
  }
  trackHandle = requestAnimationFrame(trackPosition);
}

// Just for fun: a random non-idle gesture every 15-30s while Clippy is out.
function scheduleFunAnimation() {
  funTimer = setTimeout(() => {
    // Skip while waiting on a reply - stopCurrent() doesn't clear the queue,
    // so a gesture queued here would sit ahead of the reply and delay it.
    if (!loading.value)
      agent?.animate();
    scheduleFunAnimation();
  }, 15000 + Math.random() * 15000);
}

function showClippy() {
  if (!agent)
    return;
  repositioned = false;
  agent.show(false);
  agent.play('Greeting');
  say(pickRandom(GREETINGS));
  trackHandle = requestAnimationFrame(trackPosition);
  scheduleFunAnimation();
}

onMounted(async () => {
  const { initAgent } = await import('clippyjs');
  const { Clippy } = await import('clippyjs/agents');
  agent = await initAgent(Clippy);
  // clippyjs has no option to disable dragging - it wires this up itself in
  // _setupEvents() with no way to opt out, so tear its own listener back off.
  agent._el.removeEventListener('mousedown', agent._mouseDownHandle);

  // User may have clicked "Ask Clippy" while this was still loading - the
  // state watcher below already fired and no-opped (agent was null), so
  // catch up here instead of waiting for a state change that won't happen.
  if (state.value === 'active') {
    showClippy();
  }
  else {
    // Re-check state.value when the timer actually fires, not just now - the
    // user can activate manually (via the toolbar) in the meantime, and
    // calling activate() again re-triggers the watcher (even though the
    // value doesn't change), firing a second, unrelated showClippy() that
    // overwrites whatever's already showing with a fresh random greeting.
    setTimeout(() => {
      if (state.value === 'docked')
        activate();
    }, 2500);
  }
});

// clippyjs's queue is a plain FIFO with no way to jump ahead: if think()/say()
// is called before a prior animation+balloon has fully played out (e.g. the
// user asks a question while the greeting is still mid-gesture), a naive
// queue(action); release() just appends behind that stale, not-yet-shown
// item - every following turn then permanently lags one step behind.
// _queue.clear() drops that backlog first. Queuing the new action before
// releasing the current one matters too: stopCurrent()/close() route through
// clippyjs's "queue just went empty" path, which auto-starts an idle fidget
// animation - if our action isn't already queued when that happens, it gets
// deferred behind that idle animation instead of running immediately.
function interrupt(queueAction: () => void) {
  if (!agent)
    return;
  agent._queue.clear();
  queueAction();
  agent.stopCurrent();
}

function say(text: string) {
  interrupt(() => agent!.speak(text, true));
}

// The filler phrase is shown via the input placeholder instead of
// agent.speak(), so it can never sit in clippyjs's queue ahead of the real
// reply - it used to, which delayed the actual answer behind the filler.
function think() {
  thinkingPhrase.value = pickRandom(THINKING_PHRASES);
  interrupt(() => agent!.play('Thinking'));
}

// state only ever goes 'docked' -> 'active', once - there's no dismiss
// mechanic to bring it back.
watch(state, (value) => {
  if (value === 'active')
    showClippy();
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
    const { text, action } = extractAction(reply);
    history.value.push({ role: 'user', content: message }, { role: 'assistant', content: text });
    say(text);
    if (action?.type === 'open')
      openModal(action.id);
    else if (action?.type === 'close')
      closeModal(action.id);
    else if (action?.type === 'minimize')
      minimizeModal(action.id);
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
  <Transition name="clippy-bar">
    <div
      v-if="state === 'active'"
      ref="inputBarRef"
      class="fixed z-[10010] w95-button-border bg-w95-gray p-1.5"
      :style="{ top: `${inputPos.top}px`, left: `${inputPos.left}px` }"
    >
      <textarea
        v-model="input"
        rows="2"
        :disabled="loading"
        :placeholder="loading ? thinkingPhrase : 'Ask Clippy...'"
        class="w95-border font-w95 text-[10px] focus:outline-none px-1 py-0.5 w-[220px] max-sm:w-[160px] resize-none leading-tight"
        @keydown.enter.exact.prevent="send"
      />
    </div>
  </Transition>
</template>

<style scoped>
.clippy-bar-enter-active,
.clippy-bar-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.clippy-bar-enter-from,
.clippy-bar-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
