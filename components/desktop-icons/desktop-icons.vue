<template>
  <div class="desktop-icons">
    <div
      v-for="icon in data.items"
      :key="icon.modal"
      class="desktop-icon"
      :style="{ top: icon.top, left: icon.left }"
    >
      <img :src="`/img/icons/${icon.icon}`" alt="icon" class="icon-img" />
      <span>{{ icon.title }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import data from "@/assets/json/startmenu.json";

export default {
  data() {
    return {
      data,
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
