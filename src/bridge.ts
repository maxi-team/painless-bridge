import type { AnyHandler } from './types/common.js';
import type { VKBridgeEvent, VKBridgeSend, VKBridgeSubscribeHandler, VKBridgeSupports, VKBridgeUnknownEvent } from './types/data.js';

import { assertSupport, awaiters, isBridgeError, isBridgeEvent, nextId } from './utils.js';
import { painless } from './painless.js';
import { context } from './context.js';

/** Android VK Bridge interface. */
const android = context.AndroidBridge;

/** IOS VK Bridge interface. */
const ios = context.webkit && context.webkit.messageHandlers;

/** ReactNative Webview Interface. */
const rn = context.ReactNativeWebView;

/** Native VK Bridge interface. */
const native = android || ios;

/** CustomEvent name. */
const custom = 'VKWebAppEvent';

/** WebSDK methods */
const methods: string[] = [];

/** WebSDK target */
let target = '';

/**
 * Checks if a method is supported on runtime platform.
 *
 * @param method Method (event) name to check.
 * @returns Result of checking.
 */
const supports: VKBridgeSupports = (() => {
  if (native) {
    return (method: string) => {
      return method in native;
    };
  }

  return (method: string) => {
    return methods.length === 0 ? typeof method === 'string' : methods.includes(method);
  };
})();

const handlers: VKBridgeSubscribeHandler[] = [];
const emit = (event: VKBridgeEvent) => {
  if (!isBridgeEvent(event)) {
    return;
  }

  const { type, data } = (event as VKBridgeUnknownEvent).detail;

  if (type === 'VKWebAppSettings') {
    target = (data.frameId as string) || (data.webFrameId as string) || target;
  }

  if (type === 'SetSupportedHandlers') {
    methods.push.apply(methods, data.supportedHandlers as string[]);
  }

  const id = data.request_id as string;

  const awaiter = awaiters.get(id);

  if (awaiter != null) {
    awaiter(data);
    awaiters.delete(id);
  }

  handlers.slice(0).forEach((handler) => {
    handler(event);
  });
};

// Subscribe to events
if (native) {
  context.addEventListener(custom, emit as unknown as EventListener);
} else if (rn) {
  context.document.addEventListener(custom, (event) => {
    const detail: Record<string, unknown> = {};

    if ('data' in event) {
      const cast = event as MessageEvent<unknown>;

      try {
        Object.assign(detail, typeof cast.data === 'string' ? JSON.parse(cast.data) : cast.data);
      } catch {
        // Ignore
      }
    }

    emit({ detail: detail as any });
  });
} else {
  context.addEventListener('message', (event) => {
    emit({ detail: event.data });
  });
}

/**
 * Adds an event listener. It will be called any time a data is received.
 *
 * @param listener A callback to be invoked on every event receive.
 */
const subscribe = (listener: VKBridgeSubscribeHandler) => {
  handlers.push(listener);
};

/**
 * Removes an event listener which has been subscribed for event listening.
 *
 * @param listener A callback to unsubscribe.
 */
const unsubscribe = (listener: VKBridgeSubscribeHandler) => {
  const index = handlers.indexOf(listener);

  if (index !== -1) {
    handlers.splice(index, 1);
  }
};

/** Sends events through runtime interface. */
export const invoke = (() => {
  if (android) {
    return (method: string, params: Record<string, unknown>) => {
      assertSupport(method);
      android[method](JSON.stringify(params));
    };
  }

  if (ios) {
    return (method: string, params: Record<string, unknown>) => {
      assertSupport(method);
      ios[method].postMessage(params);
    };
  }

  if (rn) {
    return (handler: string, params: Record<string, unknown>) => {
      rn.postMessage(JSON.stringify({
        handler,
        params
      }));
    };
  }

  return (handler: string, params: Record<string, unknown>) => {
    context.parent.postMessage({
      type: 'vk-connect',
      frameId: target,
      webFrameId: target,
      handler,
      params
    }, '*');
  };
})();

const createAwaiter = (resolve: AnyHandler, reject: AnyHandler) => {
  return (payload: Record<string, unknown>) => {
    if (isBridgeError(payload)) {
      reject(payload);

      return;
    }

    resolve(payload);
  };
};

const send: VKBridgeSend = (method: string, params: Record<string, unknown> = {}) => {
  return new Promise<Record<string, unknown>>((resolve, reject) => {
    const safe = Object.assign({ request_id: nextId() }, params);

    awaiters.set(safe.request_id, createAwaiter(resolve as AnyHandler, reject));

    invoke(method, safe);
  });
};

/**
 * Checks whether the runtime is a WebView.
 *
 * @returns Result of checking.
 */
const isWebView = () => {
  return !!native;
};

/**
 * Checks whether the runtime is a WebView-like.
 *
 * @returns Result of checking.
 */
const isWebViewLike = () => {
  return !!native || !!rn;
};

/**
 * Checks whether the runtime is a ReactNative.
 *
 * @returns Result of checking.
 */
const isReactNative = () => {
  return !!rn;
};

/**
 * Checks whether the runtime is an iframe.
 *
 * @returns Result of checking.
 */
const isIframe = () => {
  return context.parent !== context;
};

/**
 * Checks whether the runtime is embedded.
 *
 * @returns Result of checking.
 */
const isEmbedded = () => {
  return isWebView() || isIframe();
};

/**
 * Checks whether the runtime is embedded-like.
 *
 * @returns Result of checking.
 */
const isEmbeddedLike = () => {
  return isWebViewLike() || isIframe();
};

/**
 * Checks whether the runtime is standalone.
 *
 * @returns Result of checking.
 */
const isStandalone = () => {
  return !isEmbedded();
};

/**
 * Checks whether the runtime is standalone.
 *
 * @returns Result of checking.
 */
const isStandaloneLike = () => {
  return !isEmbeddedLike();
};

/**
 * Sends an event to the runtime env. In the case of Android/iOS application
 * env is the application itself. In the case of the browser, the parent
 * frame in which the event handlers is located.
 *
 * @param method The method (event) name to send
 * @param props Method properties
 */
const painlessSend = painless(send);

/**
 * @deprecated Use send instead.
 */
const sendPromise = painlessSend;

/**
 * @deprecated There is not a single situation where it would be necessary.
 */
const createBridge = () => {
  return {
    send: painlessSend,
    sendPromise: painlessSend,
    subscribe,
    unsubscribe,
    supports,
    isWebView,
    isIframe,
    isEmbedded,
    isStandalone
  };
};

/**
 * @deprecated Use imports instead.
 */
const bridge = createBridge();

export {
  bridge,
  createBridge,
  isEmbedded,
  isEmbeddedLike,
  isIframe,
  isReactNative,
  isStandalone,
  isStandaloneLike,
  isWebView,
  isWebViewLike,
  painlessSend as send,
  sendPromise,
  subscribe,
  supports,
  unsubscribe
};
