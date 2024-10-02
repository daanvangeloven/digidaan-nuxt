<template>
  <NuxtPage />
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
  setup() {
    useSeoMeta({
      title: "Digidaan DaanOS '02",
      description:
        "A Windows 95 inspired portfolio for my front-end development work.",
      ogTitle: "Digidaan - Daan van Geloven",
      ogDescription:
        "Go back in time with my Windows 95 inspired portfolio. Built with NuxtJS and Vue 3.",
      ogImage: "/img/w95-backgroundlogo.png",
      ogUrl: "https://digidaan.io",
      twitterTitle: "Digidaan",
      twitterDescription:
        "A Windows 95 inspired portfolio for my front-end development work.",
      twitterImage: "/img/w95-backgroundlogo.png",
      twitterCard: "summary",
    });

    useHead({
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/img/w95-icon.png",
        },
      ],
    });
  },
};
</script>
