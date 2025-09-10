import type { ExecutionContext, MessageBatch } from "@cloudflare/workers-types";

export interface CloudflareEnv {}

export interface CloudflareContext {
  env: CloudflareEnv;
  context: ExecutionContext;
}

declare module "#nitro-server-async-context" {
  interface NitroServerAsyncContext {
    cloudflare: CloudflareContext;
  }
}

export interface CloudflareQueueHookArgs<T> {
  batch: MessageBatch<T>;
  env: unknown;
  context: ExecutionContext;
}

export interface CloudflareQueueConsumerNames {
}

export type CloudflareSpecificQueue = {
  [TKey in keyof CloudflareQueueConsumerNames as `cloudflare:queue:${TKey}`]: (
    queue: CloudflareQueueHookArgs<CloudflareQueueConsumerNames[TKey]>
  ) => Promise<void> | void;
};

declare module "nitropack" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface NitroRuntimeHooks extends CloudflareSpecificQueue {
  }
}

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook("cloudflare:queue", wrapInAsyncContext(async (queue) => {
    // supply async context
    useServerAsyncContext().cloudflare = queue as CloudflareContext;
    await nitro.hooks.callHook(`cloudflare:queue:${queue.batch.queue as keyof CloudflareQueueConsumerNames}`, queue as never);
  }));
});
