<script setup lang="ts">
import { useModalStore } from '@/composables/useModals'

const props = defineProps<{
  id: string
  icon: string
}>()

const { closeModal, minimizeModal, modalMoved, bringToFront }
  = useModalStore()

const modal = ref<HTMLElement | null>(null)
const modalHeader = ref<HTMLElement | null>(null)
let isDragging = false
let offsetX = 0
let offsetY = 0
let newPosition = { x: 0, y: 0 }

function onMouseDown(event: MouseEvent) {
  if ((event.target as HTMLElement).closest('.control-button')) {
    return
  }
  isDragging = true
  const modalRect = modal.value!.getBoundingClientRect()
  offsetX = event.clientX - modalRect.left
  offsetY = event.clientY - modalRect.top
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

// Handle mouse movement to move the modal, constrained within viewport
function onMouseMove(event: MouseEvent) {
  if (isDragging) {
    const modalRect = modal.value!.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight - 36 // 36px toolbar height

    let newLeft = event.clientX - offsetX
    let newTop = event.clientY - offsetY

    if (newLeft < 0) {
      newLeft = 0
    }
    else if (newLeft + modalRect.width > viewportWidth) {
      newLeft = viewportWidth - modalRect.width
    }

    if (newTop < 0) {
      newTop = 0
    }
    else if (newTop + modalRect.height > viewportHeight) {
      newTop = viewportHeight - modalRect.height
    }

    modal.value!.style.left = `${newLeft}px`
    modal.value!.style.top = `${newTop}px`

    newPosition = { x: newLeft, y: newTop }
  }
}

function onMouseUp() {
  isDragging = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)

  if (newPosition.x !== 0 || newPosition.y !== 0) {
    modalMoved(props.id, newPosition.x, newPosition.y)
  }
}

onMounted(() => {
  if (modalHeader.value) {
    modalHeader.value.addEventListener('mousedown', onMouseDown)
  }
})

onBeforeUnmount(() => {
  if (modalHeader.value) {
    modalHeader.value.removeEventListener('mousedown', onMouseDown)
  }
})
</script>

<template>
  <div
    ref="modal"
    class="modal"
    @mousedown="bringToFront(id)"
  >
    <div
      ref="modalHeader"
      class="modal-header"
    >
      <div class="header-item">
        <img
          :src="`/img/icons/${icon}`"
          class="modal-icon"
        >
        <div class="title">
          <slot name="header-title" />
        </div>
      </div>
      <div class="header-item">
        <button
          class="control-button w95-button-border"
          @click="minimizeModal(id)"
        >
          —
        </button>
        <button
          class="control-button close-button w95-button-border"
          @click="closeModal(id)"
        >
          ✖
        </button>
      </div>
    </div>
    <div class="modal-content">
      <slot name="modal-content" />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/style/index";

.modal {
  position: absolute;
  min-width: 300px;
  min-height: 200px;
  max-height: 80vh;
  max-width: 1024px;
  background-color: $secondary-background;
  border-top: 2px solid white;
  border-left: 2px solid white;
  border-right: 2px solid #393939;
  border-bottom: 2px solid #393939;
  overflow: hidden;
  cursor: default;
}

.modal-content {
  display: flex;
  flex-grow: 1;
  max-height: inherit;
  overflow-y: auto;
  background-color: $secondary-background;
}

.modal-header {
  background-color: $dark-blue;
  color: $text-light;
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  line-height: 1.5;
  width: 100%;
  user-select: none;
  cursor: pointer;

  .title {
    margin-left: 6px;
  }
}

.header-item {
  display: flex;
  gap: 4px;
  align-items: center;

  .close-button {
    margin-right: 4px;
  }

  .control-button {
    vertical-align: middle;
    background-color: $secondary-background;
    border: none;
    color: $text-dark;
    font-size: 10px;
    cursor: pointer;
    height: 16px;
    width: 16px;
    letter-spacing: 1px;
    font-weight: bold;
    text-shadow: 0 1px 0 #fff;
  }
}

.modal-icon {
  width: 16px;
  height: 16px;
  margin-left: 4px;
}
</style>
