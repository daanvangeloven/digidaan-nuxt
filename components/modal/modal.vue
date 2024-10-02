<template>
  <div class="modal" ref="modal">
    <div class="modal-header" ref="modalHeader">
      <div class="header-item">
        <img src="/img/icons/profile.png" class="modal-icon" />
        <div class="title">
          <slot name="header-title"></slot>
        </div>
      </div>
      <div class="header-item">
        <button class="control-button w95-button-border">-</button>
        <button class="control-button close-button w95-button-border">X</button>
      </div>
    </div>
    <div class="modal-content">
      <slot> </slot>
      <ProfileContent />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import ProfileContent from "@/components/modal/modalcontent/ProfileContent.vue";

export default {
  components: {
    ProfileContent,
  },
  setup() {
    const modal = ref<HTMLElement | null>(null);
    const modalHeader = ref<HTMLElement | null>(null);
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Handle when the user presses the mouse button down on the modal header
    const onMouseDown = (event: MouseEvent) => {
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

        // Calculate the new left and top values
        let newLeft = event.clientX - offsetX;
        let newTop = event.clientY - offsetY;

        // Constrain horizontal (left) movement within the viewport
        if (newLeft < 0) {
          newLeft = 0; // Prevent dragging past the left edge
        } else if (newLeft + modalRect.width > viewportWidth) {
          newLeft = viewportWidth - modalRect.width; // Prevent dragging past the right edge
        }

        // Constrain vertical (top) movement within the viewport
        if (newTop < 0) {
          newTop = 0; // Prevent dragging past the top edge
        } else if (newTop + modalRect.height > viewportHeight) {
          newTop = viewportHeight - modalRect.height; // Prevent dragging past the bottom edge
        }

        // Apply the new constrained positions
        modal.value!.style.left = `${newLeft}px`;
        modal.value!.style.top = `${newTop}px`;
      }
    };

    // Handle when the user releases the mouse button to stop dragging
    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    onMounted(() => {
      // Ensure modalHeader exists before adding the event listener
      if (modalHeader.value) {
        modalHeader.value.addEventListener("mousedown", onMouseDown);
      }
    });

    onBeforeUnmount(() => {
      // Clean up event listeners when the component is destroyed
      if (modalHeader.value) {
        modalHeader.value.removeEventListener("mousedown", onMouseDown);
      }
    });

    return {
      modal,
      modalHeader,
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
