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
    class="absolute min-w-[300px] min-h-[200px] max-h-[80vh] max-w-[1024px] bg-w95-gray border-t-2 border-l-2 border-r-2 border-b-2 border-t-white border-l-white border-r-[#393939] border-b-[#393939] overflow-hidden cursor-default"
    @mousedown="bringToFront(id)"
  >
    <div
      ref="modalHeader"
      class="bg-w95-blue text-white h-6 flex flex-row justify-between items-center text-[10px] leading-[1.5] w-full select-none cursor-pointer"
    >
      <div class="flex gap-1 items-center">
        <img
          :src="`/img/icons/${icon}`"
          class="w-4 h-4 ml-1"
        >
        <div class="ml-1.5">
          <slot name="header-title" />
        </div>
      </div>
      <div class="flex gap-1 items-center">
        <button
          class="flex items-center justify-center bg-w95-gray text-black text-[10px] cursor-pointer h-4 w-4 tracking-wide font-bold leading-none w95-button-border"
          @click="minimizeModal(id)"
        >
          —
        </button>
        <button
          class="flex items-center justify-center bg-w95-gray text-black text-[10px] cursor-pointer h-4 w-4 tracking-wide font-bold leading-none mr-1 w95-button-border -translate-y-px"
          @click="closeModal(id)"
        >
          ✖
        </button>
      </div>
    </div>
    <div class="flex flex-grow max-h-[inherit] overflow-y-auto bg-w95-gray">
      <slot name="modal-content" />
    </div>
  </div>
</template>
