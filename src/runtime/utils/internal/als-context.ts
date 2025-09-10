import type { NitroServerAsyncContext } from "#nitro-server-async-context";

import { AsyncLocalStorage } from "node:async_hooks";
import { createContext } from "unctx";

/** internal usage only, used when executing backend code outside of request event */
const asyncServerContextStorage = createContext<NitroServerAsyncContext>({
  asyncContext: true,
  AsyncLocalStorage,
});

export const useServerAsyncContextInternal = asyncServerContextStorage.use;
export const executeServerAsyncContextInternal = asyncServerContextStorage.callAsync;
