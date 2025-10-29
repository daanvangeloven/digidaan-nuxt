<script setup lang="ts">
import { useModalStore } from '@/composables/useModals'

const modalStore = useModalStore()
const loading = ref(true)

onMounted(() => {
  loading.value = false
})

useHead({
  bodyAttrs: {
    class: 'reset-body',
  },
})
</script>

<template>
  <LoadingBar
    v-if="loading"
    class="loading"
  />
  <div
    v-else
    class="content"
  >
    <DesktopIcons />
    <div v-for="(modal, index) in modalStore.modals.value" :key="index">
      <Modal
        :id="modal.id"
        :icon="modal.icon"
        :class="{ minimized: modal.minimized }"
        :style="{
          'z-index': modal.zIndex,
          'left': `${modal.x}px`,
          'top': `${modal.y}px`,
        }"
      >
        <template #header-title>
          <span>{{ modal.title }}</span>
        </template>
        <template #modal-content>
          <component :is="modal.content" />
        </template>
      </Modal>
    </div>
    <Toolbar />
  </div>
</template>

<style>
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
  background-color: #008081;
  background-image: url("/img/w95-backgroundlogo.png");
  background-repeat: no-repeat;
  background-size: 30%;
  background-position: center;
  font-family: "Windows 95", sans-serif;
}

.minimized {
  display: none;
}

a{
  color: #007bff;
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
