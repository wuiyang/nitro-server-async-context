declare module "#custom-server-async-context" {
  interface CustomServerAsyncContext {
    testing: true;
  }
}

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("async-context:create", (context) => {
    context.testing = true;
  });
});
