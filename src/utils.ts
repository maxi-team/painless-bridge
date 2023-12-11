import type { ErrorData, VKBridgeEvent } from './types/data.js';
import type { AnyHandler } from './types/common.js';

import { supports } from './bridge.js';
import { UNSUPPORTED_PLATFORM } from './plugins/error.js';

// Generate unique ids
let counter = 0;

const hash = (value: number, start: number, end: number) => value.toString(32).slice(start, end);

export const nextId = () =>
  `${++counter}-${hash(Date.now(), 5, 9)}-${hash(Math.random(), 2, 6)}`;

// For internal use only
export const awaiters = new Map<string, AnyHandler>();

// For internal use only
const isObject = (obj?: unknown): obj is Record<string, unknown> => {
  return typeof obj === 'object' && obj != null;
};

/** Checks if event is ErrorData */
export const isBridgeError = (payload?: unknown): payload is ErrorData => {
  return isObject(payload) && isObject(payload.error_data);
};

/** Checks if event is VKBridgeEvent */
export const isBridgeEvent = (event?: unknown): event is VKBridgeEvent => {
  return isObject(event) && isObject(event.detail) && isObject(event.detail.data);
};

/** Checks if method is  */
export const assertSupport = (method: string): void | never => {
  if (!supports(method)) {
    throw UNSUPPORTED_PLATFORM;
  }
};
