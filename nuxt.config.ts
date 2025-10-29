// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/components/ui',
      pathPrefix: false,
      // Auto-import all components from ~/components/ui
      // This allows using <W95Button> without explicit imports
    },
  ],
});
