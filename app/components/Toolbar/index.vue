<script setup lang="ts">
import { useModalStore } from '@/composables/useModals';

const now = useNow();

const timeOutput = computed(() => {
  const hours = now.value.getHours().toString().padStart(2, '0');
  const minutes = now.value.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
});

const modalStore = useModalStore();
const { openModal } = modalStore;

const { state: clippyState, activate: activateClippy } = useClippy();

// Reuses clippyjs's own bundled sprite sheet for the tray icon (frame [0,0],
// Clippy's resting pose) instead of shipping a separate icon asset.
const CLIPPY_FRAME_WIDTH = 124;
const CLIPPY_FRAME_HEIGHT = 93;
const CLIPPY_ICON_SIZE = 20;
const CLIPPY_ICON_SCALE = CLIPPY_ICON_SIZE / CLIPPY_FRAME_HEIGHT;
const clippyMapUrl = ref('');

onMounted(async () => {
  const { Clippy } = await import('clippyjs/agents');
  const { default: mapUrl } = await Clippy.map();
  clippyMapUrl.value = mapUrl;
});

const clippyIconStyle = computed(() => ({
  width: `${CLIPPY_FRAME_WIDTH}px`,
  height: `${CLIPPY_FRAME_HEIGHT}px`,
  backgroundImage: `url(${clippyMapUrl.value})`,
  backgroundPosition: '0 0',
  backgroundRepeat: 'no-repeat',
  transformOrigin: 'top left',
  transform: `scale(${CLIPPY_ICON_SCALE})`,
}));

const { width: windowWidth } = useWindowSize();
const isMobile = computed(() => windowWidth.value > 0 && windowWidth.value < 640);

const taskbar = computed(() => {
  const all = modalStore.modals.value.filter(m => m.taskbar);
  if (isMobile.value) {
    return all.filter(m => m.id === modalStore.activeModal.value);
  }
  return all;
});

const showStartMenu = ref(false);
const startButtonRef = ref<HTMLElement>();

function handleTabClicked(tabId: string) {
  openModal(tabId);
  toggleStartMenu();
}

function toggleStartMenu() {
  showStartMenu.value = !showStartMenu.value;
  const startButton = document.querySelector('.start-button-inner-text');
  startButton?.classList.toggle('active');
}

function handleStartButtonClick(e: Event) {
  e.stopPropagation();
  toggleStartMenu();
}

onClickOutside(startButtonRef, (event) => {
  // Don't close if clicking on the start menu itself
  if (showStartMenu.value && !(event.target as HTMLElement).closest('.start-menu')) {
    toggleStartMenu();
  }
});
</script>

<template>
  <StartMenu
    v-if="showStartMenu"
    class="start-menu"
  />
  <div class="w-screen h-9 text-[0.65rem] p-[7px] select-none bg-w95-gray absolute bottom-0 flex items-center justify-between overflow-hidden z-[500]">
    <div class="flex items-center text-center align-middle text-black text-[0.65rem] h-6 cursor-pointer">
      <span
        ref="startButtonRef"
        class="flex items-center px-1 mr-0.5 px-1 text-black cursor-pointer whitespace-nowrap w95-button-border"
        @click="handleStartButtonClick($event)"
      >
        <img
          class="mr-1 max-h-[80%] max-w-[25px]"
          src="/img/w95-icon.png"
        >
        <span>Start</span>
      </span>
    </div>

    <div class="flex-grow flex items-center ml-1 overflow-x-auto">
      <div
        v-for="tab in taskbar"
        :key="tab.id"
        class="mr-0.5 px-1 text-black cursor-pointer whitespace-nowrap flex items-center text-center align-middle text-[0.65rem] h-6 w95-button-border"
        :class="{ 'active-tab': tab.id === modalStore.activeModal.value }"
        @click="handleTabClicked(tab.id)"
      >
        <img
          class="mr-1 max-h-[80%] max-w-[25px]"
          :src="`img/icons/${tab.icon}`"
        >
        <span>{{ tab.title }}</span>
      </div>
    </div>
    <div
      v-if="clippyState === 'docked'"
      class="mr-0.5 px-1 cursor-pointer flex items-center justify-center h-6 w95-border-inverse shrink-0"
      title="Ask Clippy"
      @click="activateClippy"
    >
      <div
        class="relative overflow-hidden"
        :style="{ width: `${CLIPPY_FRAME_WIDTH * CLIPPY_ICON_SCALE}px`, height: `${CLIPPY_ICON_SIZE}px` }"
      >
        <div
          v-if="clippyMapUrl"
          class="absolute top-0 left-0"
          :style="clippyIconStyle"
        />
      </div>
    </div>
    <div class="py-[5px] mr-0.5 px-1 text-black cursor-pointer whitespace-nowrap flex items-center text-center align-middle text-[0.65rem] h-6 w95-border-inverse">
      {{ timeOutput }}
    </div>
  </div>
</template>

<style scoped>
.active-tab {
  background: repeating-conic-gradient(#808080 0% 25%, #fff 0% 50%) 50% / 2px 2px;
  color: #000000;
  font-weight: 400;
  border-top: 1px solid #08080e !important;
  border-left: 1px solid #08080e !important;
  border-bottom: 1px solid #fcfcfc !important;
  border-right: 1px solid #fcfcfc !important;
}
</style>
