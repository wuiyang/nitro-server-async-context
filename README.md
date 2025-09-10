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

## Development

- Clone this repository
- Install the latest LTS version of [Node.js](https://nodejs.org/en/)
- Install dependencies using `npm install`
- Build in stub mode using `npm run prepare`
- Run Nitro playground using `npm run dev:nitro` or Nuxt playground using `npm run dev:nuxt`
