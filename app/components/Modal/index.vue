<script setup lang="ts">
import { useModalStore } from '@/composables/useModals';

const props = defineProps<{
  id: string;
  icon: string;
  initialX: number;
  initialY: number;
}>();

const { closeModal, minimizeModal, modalMoved, bringToFront }
  = useModalStore();

const modal = ref<HTMLElement>();
const modalHeader = ref<HTMLElement>();

const { width: windowWidth, height: windowHeight } = useWindowSize();

const { x, y, isDragging, style } = useDraggable(modal, {
  initialValue: { x: props.initialX, y: props.initialY },
  handle: modalHeader,
  preventDefault: true,
  onStart: (position, event) => {
    // Don't drag if clicking on control buttons
    if ((event.target as HTMLElement).closest('.control-button')) {
      return false;
    }
  },
});

// Save position when dragging ends and constrain to viewport
watch(isDragging, (dragging) => {
  if (!dragging) {
    let finalX = x.value;
    let finalY = y.value;

    if (modal.value) {
      const modalRect = modal.value.getBoundingClientRect();
      const viewportWidth = windowWidth.value;
      const viewportHeight = windowHeight.value - 36; // 36px toolbar height

      // Constrain x position
      if (finalX < 0) {
        finalX = 0;
      }
      else if (finalX + modalRect.width > viewportWidth) {
        finalX = Math.max(0, viewportWidth - modalRect.width);
      }

      // Constrain y position
      if (finalY < 0) {
        finalY = 0;
      }
      else if (finalY + modalRect.height > viewportHeight) {
        finalY = Math.max(0, viewportHeight - modalRect.height);
      }

      // Update position if constrained
      if (finalX !== x.value || finalY !== y.value) {
        x.value = finalX;
        y.value = finalY;
      }
    }

    modalMoved(props.id, finalX, finalY);
  }
});
</script>

<template>
  <div
    ref="modal"
    class="absolute min-w-[300px] min-h-[200px] max-h-[80vh] max-w-[1024px] bg-w95-gray border-t-2 border-l-2 border-r-2 border-b-2 border-t-white border-l-white border-r-[#393939] border-b-[#393939] overflow-hidden cursor-default"
    :style="style"
    @mousedown="bringToFront(id)"
  >
    <div
      ref="modalHeader"
      class="bg-w95-blue text-white h-6 flex flex-row justify-between items-center text-[10px] leading-[1.5] w-full select-none cursor-pointer"
      @mousedown="bringToFront(id)"
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
          class="control-button flex items-center justify-center bg-w95-gray text-black text-[10px] cursor-pointer h-4 w-4 tracking-wide font-bold leading-none w95-button-border"
          @click="minimizeModal(id)"
        >
          —
        </button>
        <button
          class="control-button flex items-center justify-center bg-w95-gray text-black text-[10px] cursor-pointer h-4 w-4 tracking-wide font-bold leading-none mr-1 w95-button-border -translate-y-px"
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
