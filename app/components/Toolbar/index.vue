<script setup lang="ts">
import { useModalStore } from '@/composables/useModals'

const time = ref(new Date())

const timeOutput = computed(() => {
  const hours = time.value.getHours().toString().padStart(2, '0')
  const minutes = time.value.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
})
const modalStore = useModalStore()
const { openModal } = modalStore

const taskbar = computed(() =>
  modalStore.modals.value.filter(modal => modal.taskbar),
)

const showStartMenu = ref(false)
const startButtonRef = ref<HTMLElement>()

function handleTabClicked(tabId: string) {
  openModal(tabId)
  toggleStartMenu()
}

function toggleStartMenu() {
  showStartMenu.value = !showStartMenu.value
  const startButton = document.querySelector('.start-button-inner-text')
  startButton?.classList.toggle('active')
}

function handleStartButtonClick(e: Event) {
  e.stopPropagation()
  toggleStartMenu()
}

onClickOutside(startButtonRef, (event) => {
  // Don't close if clicking on the start menu itself
  if (showStartMenu.value && !(event.target as HTMLElement).closest('.start-menu')) {
    toggleStartMenu()
  }
})

onMounted(() => {
  setInterval(() => {
    time.value = new Date()
  }, 1000)
})
</script>

<template>
  <StartMenu
    v-if="showStartMenu"
    class="start-menu"
  />
  <div class="w-screen h-9 text-[0.65rem] p-[7px] select-none bg-w95-gray absolute bottom-0 flex items-center justify-between overflow-hidden">
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
