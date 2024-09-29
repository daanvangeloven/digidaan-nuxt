<template>
  <client-only>
    <Modal v-model:visible="isVisible">
      <div>your content...</div>
    </Modal>
  </client-only>
</template>

<script lang="ts">
import { Modal } from "usemodal-vue3";

export default {
  data() {
    return {
      isVisible: false,
    };
  },
};
</script>
<style lang="scss">
@import "@/assets/style/index";
</style>
