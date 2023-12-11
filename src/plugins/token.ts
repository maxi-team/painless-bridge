import type { AnyHandler } from '../types/common.js';
import type { VKBridgeSend } from '../types/data.js';

import { USER_DENIED } from './error.js';

import { awaiters, isBridgeError, nextId } from '../utils.js';
import { invoke } from '../bridge.js';

const isScopeIdentical = (requested: string, received: string) => {
  if (requested && received && requested !== received) {
    const requestedScopes = requested.split(',');
    const receivedScopes = received.split(',');

    for (let i = requestedScopes.length; i--;) {
      if (!receivedScopes.includes(requestedScopes[i])) {
        return false;
      }
    }
  }

  return true;
};

const createTokenAwaiter = (params: Record<string, unknown>, resolve: AnyHandler, reject: AnyHandler) => {
  return (payload: Record<string, unknown>) => {
    if (isBridgeError(payload)) {
      reject(payload);

      return;
    }

    if (!payload.access_token) {
      reject(USER_DENIED);

      return;
    }

    if (!isScopeIdentical(params.scope as string, payload.scope as string)) {
      reject(USER_DENIED);

      return;
    }

    payload.scope = params.scope;

    resolve(payload);
  };
};

export const pluginToken = (send: VKBridgeSend): VKBridgeSend => {
  return (method: string, params: Record<string, unknown> = {}) => {
    if (method === 'VKWebAppGetAuthToken' || method === 'VKWebAppGetCommunityToken') {
      return new Promise<Record<string, unknown>>((resolve, reject) => {
        const safe = Object.assign({ request_id: nextId(), scope: '' }, params);

        awaiters.set(safe.request_id, createTokenAwaiter(safe, resolve as AnyHandler, reject));

        invoke(method, safe);
      });
    }

    return send(method, params);
  };
};
