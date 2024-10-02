<template>
  <div @mousedown="bringToFront(id)" class="modal" ref="modal">
    <div class="modal-header" ref="modalHeader">
      <div class="header-item">
        <img src="/img/icons/profile.png" class="modal-icon" />
        <div class="title">
          <slot name="header-title"></slot>
        </div>
      </div>
      <div class="header-item">
        <button
          @click="minimizeModal(id)"
          class="control-button w95-button-border"
        >
          -
        </button>
        <button
          @click="closeModal(id)"
          class="control-button close-button w95-button-border"
        >
          X
        </button>
      </div>
    </div>
    <div class="modal-content">
      <slot name="modal-content"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useModals } from "@/composables/useModals";

const { closeModal, minimizeModal, modalMoved, bringToFront } = useModals();

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const modal = ref<HTMLElement | null>(null);
    const modalHeader = ref<HTMLElement | null>(null);
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const onMouseDown = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(".control-button")) {
        return;
      }
      isDragging = true;
      const modalRect = modal.value!.getBoundingClientRect();
      offsetX = event.clientX - modalRect.left;
      offsetY = event.clientY - modalRect.top;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    // Handle mouse movement to move the modal, constrained within viewport
    const onMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const modalRect = modal.value!.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight - 36; // 36px toolbar height

        let newLeft = event.clientX - offsetX;
        let newTop = event.clientY - offsetY;

        if (newLeft < 0) {
          newLeft = 0;
        } else if (newLeft + modalRect.width > viewportWidth) {
          newLeft = viewportWidth - modalRect.width;
        }

        if (newTop < 0) {
          newTop = 0;
        } else if (newTop + modalRect.height > viewportHeight) {
          newTop = viewportHeight - modalRect.height;
        }

        modal.value!.style.left = `${newLeft}px`;
        modal.value!.style.top = `${newTop}px`;

        modalMoved(props.id, newLeft, newTop);
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    onMounted(() => {
      if (modalHeader.value) {
        modalHeader.value.addEventListener("mousedown", onMouseDown);
      }
    });

    onBeforeUnmount(() => {
      if (modalHeader.value) {
        modalHeader.value.removeEventListener("mousedown", onMouseDown);
      }
    });

    return {
      modal,
      modalHeader,
      closeModal,
      minimizeModal,
      bringToFront,
    };
  },
};
</script>
<style lang="scss">
@import "@/assets/style/index";

.modal {
  position: absolute;
  min-width: 300px;
  min-height: 200px;
  max-width: 80%;
  background-color: $secondary-background;
  border-top: 2px solid white;
  border-left: 2px solid white;
  border-right: 2px solid #393939;
  border-bottom: 2px solid #393939;
  cursor: default;
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
    font-weight: 700;
    text-shadow: 0 1px 0 #fff;
  }
}

.modal-icon {
  width: 16px;
  height: 16px;
  margin-left: 4px;
}
</style>
