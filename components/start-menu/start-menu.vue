<template>
  <div class="start-menu">
    <div class="menu-title sideways">
      Digidaan DaanOS <span class="text-white">'02</span>
    </div>
    <div class="start-list">
      <div
        class="start-item"
        v-for="item in screens"
        @click="itemClick(item.id)"
        :key="item.id"
      >
        <img :src="`/img/icons/${item.icon}`" class="start-icon" />

        {{ item.title }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import data from "@/assets/json/screens.json";
import { useModalStore } from "@/composables/useModals";

export default {
  setup() {
    const { openModal } = useModalStore();

    const itemClick = (modalId: any) => {
      openModal(modalId);
    };

    const screens = data.screens.filter(
      (screen) => screen.onStartMenu === true
    );

    return {
      screens,
      itemClick,
    };
  },
};
</script>
<style lang="scss">
@import "@/assets/style/index";

.start-menu {
  background-color: $secondary-background;
  position: absolute;
  bottom: 34px;
  left: 0;
  display: flex;
  border-width: 2px;
  width: 350px;
  height: 270px;
  user-select: none;

  border-top: 2px solid #fcfcfc;
  border-left: 2px solid #fcfcfc;
  border-bottom: 2px solid #08080e;
  border-right: 2px solid #08080e;
}

.menu-title {
  display: flex;
  background-color: $dark-gray;
  color: $secondary-background;
  font-size: 16px;
  padding: 8px 4px 0px 16px;
}

.sideways {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-weight: bold;
  text-align: start;
}

.text-white {
  color: #fff;
}

.start-list {
  display: flex;
  flex-direction: column;
  width: 100%;

  .start-item {
    font-size: 14px;
    display: flex;
    vertical-align: middle;
    align-items: center;
    text-align: start;
    padding: 0.25rem;
    flex-grow: 1;

    cursor: pointer;
    &:hover {
      background-color: $dark-blue;
      color: #fff;
    }

    .start-icon {
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
  }
}
</style>
