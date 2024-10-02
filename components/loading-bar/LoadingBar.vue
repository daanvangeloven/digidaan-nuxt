<template>
  <div class="loading-bar">
    <span v-for="n in counter" class="loading-block"></span>
  </div>
</template>

<script>
const counter = ref(1);

export default {
  setup() {
    return { counter };
  },
  mounted() {
    const interval = setInterval(() => {
      counter.value++;
      if (counter.value === 15) {
        counter.value = 0;
      }
    }, 1000);
  },
};
</script>

<style lang="scss">
@import "@/assets/style/index";

.loading-bar {
  position: absolute;
  top: 70%;
  left: calc(50% - 150px);
  width: 300px;
  height: 34px;
  background-color: $secondary-background;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  border-top: 2px solid $border-light;
  border-left: 2px solid $border-light;
  border-right: 2px solid $border-dark;
  border-bottom: 2px solid $border-dark;
  overflow: hidden;
}

.loading-block {
  width: 20px;
  height: 28px;
  background-color: $dark-blue;
  z-index: 1000;
  animation: loading 2s infinite;
}
</style>
