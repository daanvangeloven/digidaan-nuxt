<template>
  <div class="desktop-icons">
    <div
      v-for="item in screens"
      :key="item.id"
      @click="itemClick(item.id)"
      class="desktop-icon"
    >
      <img :src="`/img/icons/${item.icon}`" alt="icon" class="icon-img" />
      <span>{{ item.title }} </span>
    </div>
  </div>
</template>

<script lang="ts">
import data from "@/assets/json/screens.json";
import { useModalStore } from "@/composables/useModals";

export default {
  setup() {
    const { openModal } = useModalStore();

    const screens = data.screens.filter((screen) => screen.onDesktop === true);

    const itemClick = (modalId: string) => {
      openModal(modalId);
    };

    return {
      screens,
      itemClick,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/style/index";

$img-size: 32px;
$img-size-sm: 24px;

.desktop-icons {
  position: absolute;
  top: 10px;
  left: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 16px;
  color: $text-light;
  user-select: none;
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.icon-img {
  width: $img-size;
  height: $img-size;
  display: flex;
}

@media (max-width: 600px) {
  .desktop-icons {
    top: 5px;
    left: 5px;
    gap: 10px;
    font-size: 11px;
  }

  .icon-img {
    width: $img-size-sm;
    height: $img-size-sm;
  }
}
</style>
