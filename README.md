# Nitro Server Async Context

[![npm version](https://img.shields.io/npm/v/nitro-server-async-context)](https://npmjs.com/package/nitro-server-async-context)

Provide shared async context outside of Nitro's event handler (HTTP event) lifecycle.

Useful for Cloudflare integration where `useEvent` is empty in Cloudflare Queues, Scheduled Handler, Email Workers, Tail Workers, and Cloudflare Trace.

## Usage

### Install Module

Install `nitro-server-async-context` packages as a dependency:
```sh
npm install nitro-server-async-context
pnpm install nitro-server-async-context
```

You could also use [unjs/nypm](https://nypm.unjs.io), it will automatically detect your package manager!

```sh
npx nypm@latest add nitro-server-async-context
```

### Nuxt

```typescript
// nuxt.config.ts
// via string reference
export default defineNuxtConfig({
  modules: ["nitro-server-async-context"],
  nitro: {
    experimental: {
      asyncContext: true, // async context need to be enabled to make this module work!
    },
  }
});
```

### Nitro

```typescript
// nitro.config.ts
// via string reference
export default defineNitroConfig({
  modules: ["nitro-server-async-context"],
  experimental: {
    asyncContext: true, // async context need to be enabled to make this module work!
  },
});
```

## Shared Context with Nitro Event

You can use this module to share context between Nitro event handlers and any async code running outside the HTTP request lifecycle (such as background jobs, queues, or scheduled handlers).

### 1. Providing Context

Use the `async-context:create` hook to inject shared properties into the async context. For example, you can attach database clients, configuration, or any value you want to access later:

```ts
// provide type definition on async context via module augmentation
declare module "#nitro-server-async-context" {
  interface NitroServerAsyncContext {
    drizzle: ReturnType<typeof createDrizzle>;
    example: number;
  }
}

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("async-context:create", (context) => {
    context.drizzle = createDrizzle(); // Attach your DB client or any object
    context.example = 123;             // Attach any value
  });
});
```

### 2. Accessing Context in Event Handlers

Within a Nitro event handler, you can access the shared context using `useServerAsyncContext()`. This will always match `event.context`:

```ts
export default defineEventHandler((event) => {
  // Both are the same
  console.assert(event.context === useServerAsyncContext());
  // Access your injected values
  console.assert(event.context.example === 123);
  console.debug(event.context.drizzle);
});
```

### 3. Accessing Context Outside Event Handlers

For code running outside the HTTP event lifecycle (e.g., background jobs, Cloudflare queues), wrap your handler with `wrapInAsyncContext` to ensure the context is available:

```ts
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("cloudflare:queue", wrapInAsyncContext(async (queue) => {
    const context = useServerAsyncContext();
    // Access your injected values
    console.assert(context.example === 123);
    console.debug(context.drizzle);
  }));
});
```

---

### Cloudflare Queue Example

When working with Cloudflare Queues, you can attach the queue context to your async context for easy access throughout your code:

```ts
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("cloudflare:queue", wrapInAsyncContext(async (queue) => {
    // Attach the queue context for downstream access
    const context = useServerAsyncContext();
    context.cloudflare = queue as CloudflareContext;

    // Now you can use context.cloudflare anywhere in this async context
  }));
});
```

**Tip:**  
- Always use `wrapInAsyncContext` for hooks or handlers that run outside the standard HTTP request lifecycle to ensure the async context is properly set up.
- Extend the `NitroServerAsyncContext` interface via module augmentation to add your own types for better type safety.

## Development

- Clone this repository
- Install the latest LTS version of [Node.js](https://nodejs.org/en/)
- Install dependencies using `npm install`
- Build in stub mode using `npm run prepare`
- Run Nitro playground using `npm run dev:nitro` or Nuxt playground using `npm run dev:nuxt`
