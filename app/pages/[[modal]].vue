<script setup lang="ts">
import screensData from '@/assets/json/screens.json';
import ContactContent from '@/components/Modal/modalcontent/ContactContent.vue';
import { useModalStore } from '@/composables/useModals';

const modalStore = useModalStore();
const loading = ref(true);
const route = useRoute();

const activeScreen = computed(() =>
  screensData.screens.find(s => s.id === route.params.modal),
);

const defaultTitle = 'Digidaan DaanOS \'02';
const defaultDescription = 'A Windows 95 inspired portfolio for my front-end development work.';

useSeoMeta({
  title: () => activeScreen.value?.seoTitle ?? defaultTitle,
  description: () => activeScreen.value?.seoDescription ?? defaultDescription,
  ogTitle: () => activeScreen.value?.seoTitle ?? 'Digidaan - Daan van Geloven',
  ogDescription: () => activeScreen.value?.seoDescription ?? 'Go back in time with my Windows 95 inspired portfolio. Built with NuxtJS and Vue 3.',
  ogUrl: () => `https://digidaan.io/${activeScreen.value?.id ?? ''}`,
});

useHead({
  link: [
    {
      rel: 'canonical',
      href: () => `https://digidaan.io/${activeScreen.value?.id ?? ''}`,
    },
  ],
  bodyAttrs: {
    class: 'reset-body',
  },
});

onMounted(() => {
  loading.value = false;
  if (route.params.modal) {
    modalStore.openModal(route.params.modal as string);
  }
});
</script>

<template>
  <!-- Statically rendered for Netlify form detection on /contact -->
  <div
    v-if="route.params.modal === 'contact'"
    style="display:none"
    aria-hidden="true"
  >
    <ContactContent />
  </div>
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
        :initial-x="modal.x"
        :initial-y="modal.y"
        :class="{ minimized: modal.minimized }"
        :style="{
          'z-index': modal.zIndex,
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
