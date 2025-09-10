import { defineNitroPlugin } from "nitropack/runtime";

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("request", async (event) => {
    await nitro.hooks.callHook("async-context:create", event.context);
  });
});
