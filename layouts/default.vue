<template>
  <div class="content">
    <Toolbar />
  </div>
</template>

<script lang="ts">
export default {
  head() {
    return {
      bodyAttrs: {
        class: "reset-body",
      },
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/style/global";

@font-face {
  font-family: "Windows 95";
  src: url("../assets/fonts/w-95-sans-serif.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}

body {
  background-color: $base-background;
  background-image: url("../assets/img/w95-backgroundlogo.png");
  background-repeat: no-repeat;
  background-size: 30%;
  background-position: center;
}

* {
  font-family: "Windows 95", sans-serif;
}
.content {
  height: 100vh;
  cursor: auto;
  padding: 0;
  margin: 0;
}
</style>
