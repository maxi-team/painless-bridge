import type { VKBridgeSend } from './types/data.js';

import { pluginError } from './plugins/error.js';
import { pluginStorage } from './plugins/storage.js';
import { pluginToken } from './plugins/token.js';

export const painless = (send: VKBridgeSend): VKBridgeSend => {
  /* eslint-disable sonarjs/prefer-immediate-return */

  // Order is important

  // JSONP is sometimes not the best option
  // const withJSONP = pluginJSONP(send);
  const withStorage = pluginStorage(send);
  const withToken = pluginToken(withStorage);
  const withError = pluginError(withToken);

  return withError;
};
