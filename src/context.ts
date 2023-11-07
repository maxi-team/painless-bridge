import type { VKBridgeContext } from './types/common.js';

const fallback: Record<string, unknown> = {};
const noop = () => { /* noop */ };

fallback.postMessage = noop;
fallback.addEventListener = noop;
fallback.parent = fallback;
fallback.document = fallback;

export const context = (typeof window !== 'undefined' ? window : fallback) as unknown as VKBridgeContext;
