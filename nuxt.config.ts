// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: ['~/plugins/pinia.ts'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/style/index.scss"',
        },
      },
    },
  },
})
