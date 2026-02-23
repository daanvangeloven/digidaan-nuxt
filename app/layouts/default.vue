<script setup lang="ts">
useSeoMeta({
  title: 'Digidaan DaanOS \'02',
  description:
    'A Windows 95 inspired portfolio for my front-end development work.',
  ogTitle: 'Digidaan - Daan van Geloven',
  ogDescription:
    'Go back in time with my Windows 95 inspired portfolio. Built with NuxtJS and Vue 3.',
  ogImage: '/img/w95-backgroundlogo.png',
  ogUrl: 'https://digidaan.io',
  twitterTitle: 'Digidaan',
  twitterDescription:
    'A Windows 95 inspired portfolio for my front-end development work.',
  twitterImage: '/img/w95-backgroundlogo.png',
  twitterCard: 'summary',
});

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/img/w95-icon.png',
    },
  ],
  bodyAttrs: {
    class: 'reset-body',
  },
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Daan van Geloven',
        'jobTitle': 'Front-end Developer',
        'url': 'https://digidaan.io',
        'sameAs': [
          'https://www.linkedin.com/in/daan-van-geloven-644794170/',
        ],
      }),
    },
  ],
});
</script>

<template>
  <NuxtPage />
</template>
