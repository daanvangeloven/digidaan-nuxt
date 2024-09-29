<template>
  <div class="content">
    <DesktopIcons />
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
@import "@/assets/style/index";

@font-face {
  font-family: "Windows 95";
  src: url("../assets/fonts/w-95-sans-serif.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  overflow-x: hidden; /* Prevent horizontal scroll */
  overflow-y: auto; /* Allow vertical scrolling */
  height: 100%;
}

body {
  background-color: $base-background;
  background-image: url("/img/w95-backgroundlogo.png");
  background-repeat: no-repeat;
  background-size: 30%;
  background-position: center;
  font-family: "Windows 95", sans-serif;
}

.content {
  height: 100%;
  max-height: 100%;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  cursor: auto;
}

@media (max-width: 600px) {
  body {
    background-size: 40%;
  }

  .content {
    height: auto;
    padding-bottom: 0;
  }
}
</style>
