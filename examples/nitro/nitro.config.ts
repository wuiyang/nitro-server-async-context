import nitroServerAsyncContext from "../../dist";

// https://nitro.unjs.io/config
export default defineNitroConfig({
  modules: [nitroServerAsyncContext],
  srcDir: "server",
  compatibilityDate: "2025-06-24",
  typescript: {
    strict: true,
  },
  experimental: {
    asyncContext: true,
  },
});
