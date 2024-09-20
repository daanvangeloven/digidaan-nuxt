<template>
  <div class="start-menu">
    <div class="w-full">Start menu</div>
  </div>
</template>
<script lang="ts"></script>
<style lang="scss">
@import "@/assets/style/global";

.start-menu {
  background-color: $secondary-background;
  position: absolute;
  bottom: 24px;
  left: 0;
  display: flex;
  border-width: 2px;
  width: 100%;

  @include responsive("small") {
    background-color: red; // Styles for 'small' breakpoint or above (568px)
  }
}
</style>
