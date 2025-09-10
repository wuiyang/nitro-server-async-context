/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NitroServerAsyncContext } from "#custom-server-async-context";

import { useNitroApp } from "nitropack/runtime";

import { executeServerAsyncContextInternal } from "./internal/als-context";

export async function runInAsyncContext<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): Promise<Awaited<ReturnType<T>>> {
  const nitro = useNitroApp();
  return executeServerAsyncContextInternal(
    await nitro.hooks.callHook("async-context:create", {} as NitroServerAsyncContext),
    () => fn(...args),
  );
}

export function wrapInAsyncContext<T extends (...args: any[]) => any>(fn: T): T {
  return (function (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> {
    return runInAsyncContext(fn, ...args);
  }) as T;
}
