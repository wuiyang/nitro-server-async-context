declare module "#custom-server-async-context" {
  interface NitroServerAsyncContext {
    testing: true;
  }
}

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("async-context:create", (context) => {
    context.testing = true;
  });
});
