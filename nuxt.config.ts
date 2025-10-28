// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: ['~/plugins/pinia.ts'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  modules: ['@nuxtjs/tailwindcss'],
})
