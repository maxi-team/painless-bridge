// Optimize enum regex:
// enum (\w+) -> const $1 =
// (\w+) = '(\w+)', -> $1: '$2',

export const EAdsFormats = {
  REWARD: 'reward',
  INTERSTITIAL: 'interstitial'
};

export const BannerAdLayoutType = {
  RESIZE: 'resize',
  OVERLAY: 'overlay'
};

export const BannerAdLocation = {
  TOP: 'top',
  BOTTOM: 'bottom'
};

export const EGrantedPermission = {
  CAMERA: 'camera',
  LOCATION: 'location',
  PHOTO: 'photo'
};

export const EGetLaunchParamsResponseLanguages = {
  RU: 'ru',
  UK: 'uk',
  UA: 'ua',
  EN: 'en',
  BE: 'be',
  KZ: 'kz',
  PT: 'pt',
  ES: 'es'
};

export const EGetLaunchParamsResponseGroupRole = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  MEMBER: 'member',
  MODER: 'moder',
  NONE: 'none'
};

export const EGetLaunchParamsResponsePlatforms = {
  DESKTOP_WEB: 'desktop_web',
  DESKTOP_WEB_MESSENGER: 'desktop_web_messenger',
  DESKTOP_APP_MESSENGER: 'desktop_app_messenger',
  MOBILE_WEB: 'mobile_web',
  MOBILE_ANDROID: 'mobile_android',
  MOBILE_ANDROID_MESSENGER: 'mobile_android_messenger',
  MOBILE_IPHONE: 'mobile_iphone',
  MOBILE_IPHONE_MESSENGER: 'mobile_iphone_messenger',
  MOBILE_IPAD: 'mobile_ipad'
};
