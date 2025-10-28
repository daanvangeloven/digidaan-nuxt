<template>
  <start-menu class="start-menu" v-if="showStartMenu"> </start-menu>
  <div class="toolbar">
    <div class="toolbar-start toolbar-item">
      <span
        @click="handleStartButtonClick($event)"
        class="start-button-inner-text tab w95-button-border"
      >
        <img class="tab-icon" src="/img/w95-icon.png" />
        <span>Start</span>
      </span>
    </div>

    <div class="open-tabs">
      <div
        @click="openModal(tab.id)"
        v-for="tab in taskbar"
        :key="tab.id"
        class="tab w95-button-border toolbar-item"
        :class="{ active: tab.id === modalStore.activeModal }"
      >
        <img class="tab-icon" :src="`img/icons/${tab.icon}`" />
        <span>{{ tab.title }}</span>
      </div>
    </div>
    <div class="toolbar-timer tab w95-border-inverse toolbar-item">
      {{ timeOutput }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useModalStore } from "@/composables/useModals";

export default {
  setup() {
    const time = ref(new Date());

    const timeOutput = computed(() => {
      const hours = time.value.getHours().toString().padStart(2, "0");
      const minutes = time.value.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    });
    const modalStore = useModalStore();
    const { openModal, closeModal } = modalStore;

    const taskbar = computed(() =>
      modalStore.modals.filter((modal) => modal.taskbar)
    );

    const showStartMenu = ref(false);

    const toggleStartMenu = () => {
      showStartMenu.value = !showStartMenu.value;
      const startButton = document.querySelector(".start-button-inner-text");
      startButton?.classList.toggle("active");
    };

    const handleStartButtonClick = (e: Event) => {
      e.stopPropagation();
      toggleStartMenu();
    };

    const handleWindowClick = (e: Event) => {
      if (
        showStartMenu.value &&
        !(e.target as HTMLElement).closest(".start-menu")
      ) {
        toggleStartMenu();
      }
    };

    onMounted(() => {
      window.addEventListener("click", handleWindowClick);
      setInterval(() => {
        time.value = new Date();
      }, 1000);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("click", handleWindowClick);
    });

    return {
      showStartMenu,
      handleStartButtonClick,
      taskbar,
      openModal,
      closeModal,
      modalStore,
      timeOutput,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/style/index";

.toolbar {
  width: 100vw;
  height: 36px;
  font-size: 0.65rem;
  padding: 7px;
  user-select: none;

  background-color: $secondary-background;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  .toolbar-item {
    display: flex;
    align-items: center;
    text-align: center;
    vertical-align: middle;
    color: $text-dark;
    font-size: 0.65rem;
    height: 24px;
  }
}

.toolbar-start {
  cursor: pointer;
}

.start-button-inner-text {
  display: flex;
  align-items: center;
  padding: 0 4px;

  img {
    margin-right: 0.25rem;
  }
}

.open-tabs {
  flex-grow: 1;
  display: flex;
  align-items: center;
  margin-left: 4px;
  overflow-x: auto;
}

.tab {
  margin-right: 2px;
  padding: 0 4px;
  color: $text-dark;
  cursor: pointer;
  white-space: nowrap;

  &.active {
    background: repeating-conic-gradient(#808080 0% 25%, #fff 0% 50%) 50% / 2px
      2px;
    color: $text-dark;
    font-weight: 400;
    border-top: 1px solid $border-dark !important;
    border-left: 1px solid $border-dark !important;
    border-bottom: 1px solid $border-light !important;
    border-right: 1px solid $border-light !important;
  }
}

.close-tab {
  margin-left: 4px;
  cursor: pointer;
  color: red; /* Close tab icon color */
}

.tab-icon {
  margin-right: 0.25rem;
  max-height: 80%;
  max-width: 25px;
}

.toolbar-timer {
  padding: 5px 15px;
}
</style>
