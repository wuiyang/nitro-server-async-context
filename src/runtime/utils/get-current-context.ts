import type { NitroServerAsyncContext } from "#custom-server-async-context";

import { useEvent } from "nitropack/runtime";

import { useServerAsyncContextInternal } from "./internal/als-context";

/** get current server context from event (in request lifecycle) or in async context (outside of request lifecycle) */
export function useServerAsyncContext(): NitroServerAsyncContext {
  try {
    const event = useEvent();
    return event.context;
  } catch {
    return useServerAsyncContextInternal();
  }
}
