// https://nuxt.com/docs/api/configuration/nuxt-config
import nitroServerAsyncContext from "../../dist";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [nitroServerAsyncContext],
  devServer: {
    port: 3002,
  },
  nitro: {
    experimental: {
      asyncContext: true,
    },
  },
});
