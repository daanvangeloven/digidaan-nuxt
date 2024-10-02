<template>
  <LoadingBar v-if="loading" class="loading"></LoadingBar>
  <div v-else class="content">
    <DesktopIcons />
    <div v-for="modal in modals">
      <Modal
        :id="modal.id"
        :class="{ minimized: modal.minimized }"
        :style="{ 'z-index': modal.zIndex }"
      >
        <template #header-title>
          <span>{{ modal.title }}</span>
        </template>
        <template #modal-content><component :is="modal.content" /> </template>
      </Modal>
    </div>
    <Toolbar />
  </div>
</template>

<script lang="ts">
import LoadingBar from "@/components/loading-bar/LoadingBar.vue";
import { useModals } from "@/composables/useModals";

const { modals } = useModals();

const loading = ref(true);

export default {
  components: {
    LoadingBar,
  },
  head() {
    return {
      bodyAttrs: {
        class: "reset-body",
      },
    };
  },
  data() {
    return {
      modals,
      loading,
    };
  },
  setup() {
    onMounted(() => {
      loading.value = false;
    });
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
  overflow-x: hidden;
  overflow-y: auto;
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

.minimized {
  display: none;
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
