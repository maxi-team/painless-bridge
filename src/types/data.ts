import type {
  BannerAdLayoutType,
  BannerAdLocation,
  EAdsFormats,
  EGetLaunchParamsResponseGroupRole,
  EGetLaunchParamsResponseLanguages,
  EGetLaunchParamsResponsePlatforms,
  EGrantedPermission
} from './enums.js';

/** Type of the Personal Card */
export type PersonalCardType = 'phone' | 'email' | 'address';

/** Access Permissions for User Token */
export type PersonalAuthScope =
  | 'friends'
  | 'photos'
  | 'video'
  | 'stories'
  | 'pages'
  | 'status'
  | 'notes'
  | 'wall'
  | 'docs'
  | 'groups'
  | 'stats'
  | 'market';

/** Access Permissions for Community Token */
export type CommunityAuthScope =
  | 'stories'
  | 'photos'
  | 'app_widget'
  | 'messages'
  | 'docs'
  | 'manage';

/**
 * Type of VKWebAppGetFriendsResult user
 */
export type UserGetFriendsFriend = {
  /** User id */
  id: number;
  /** User name */
  first_name: string;
  /** User surname */
  last_name: string;
  /** User sex: 0 - not specified, 1 - female, 2 - male */
  sex: 0 | 1 | 2;
  /**
   * URL of the square user's photo with 200px width.
   * https://vk.com/images/camera_200.png will be returned if the photo
   * is not set.
   */
  photo_200: string;
};

/**
 * Type of user info object
 */
export type UserInfo = {
  /** User id */
  id: number;
  /** User name */
  first_name: string;
  /** User surname */
  last_name: string;
  /** User sex: 0 - not specified, 1 - female, 2 - male */
  sex: 0 | 1 | 2;
  /** User's city */
  city: {
    /** City ID */
    id: number;
    /** City title */
    title: string;
  };
  /** User's country */
  country: {
    /** Country ID */
    id: number;
    /** Country  title */
    title: string;
  };
  /**
   * Date of Birth. It is returned in the format D.M.YYYY or D.M (if the
   * year of birth is hidden). If the date of birth is hidden entirely,
   * the field is not in the response.
   */
  bdate?: string;
  /**
   * URL of the square user's photo with 100px width.
   * https://vk.com/images/camera_100.png will be returned if the photo
   * is not set.
   */
  photo_100: string;
  /**
   * URL of the square user's photo with 200px width.
   * https://vk.com/images/camera_200.png will be returned if the photo
   * is not set.
   */
  photo_200: string;
  /**
   * URL of the square user's photo with maximum size.
   * https://vk.com/images/camera_400.png will be returned if the photo
   * is not set.
   */
  photo_max_orig?: string;
  /** User's timezone */
  timezone?: number;
};

/**
 * User's contact data from the Personal Card from
 */
export type PersonalCardData = {
  phone?: string;
  email?: string;
  address?: {
    country?: {
      id: number;
      name: string;
    };
    city?: {
      id: number;
      name: string;
    };
    specified_address?: string;
    postal_code?: string;
  };
};

/**
 * Map of VK Pay request params
 */
export type VKPayActionParamsMap = {
  /** Payment with a given amount to a user */
  'pay-to-user': {
    /** The amount of payment in rubles. The minimum value is 1 */
    amount?: number;
    /** User ID */
    user_id: number;
    /** Payment description */
    description?: string;
  };
  /** Payment with a given amount to a community */
  'pay-to-group': {
    /** The amount of payment in rubles. The minimum value is 1 */
    amount: number;
    /** Community ID */
    group_id: number;
    /** Payment description */
    description?: string;
    /** Dictionary with arbitrary parameters */
    data?: string;
  };
  /** Transferring an arbitrary amount to a user */
  'transfer-to-user': {
    user_id: number;
  };
  /** Transferring an arbitrary amount to a community */
  'transfer-to-group': {
    group_id: number;
  };
  /**
   * Payment in favor of the merchant
   * @see {@link https://vk.com/@devpay-vk-pay-how-to VK Pay How To}
   */
  'pay-to-service': {
    /**
     * Amount of payment. The minimum value is 1. The amount field is
     * involved in the formation of merchant_data for the signature of
     * the seller.
     */
    amount: number | string;
    /**
     * Description of the payment for user. The text will be shown in
     * payment dialog
     */
    description: string;
    /**
     * Merchant ID. This is your ID in the payment system, obtained after
     * the conclusion of the contract along with the seller’s private key
     */
    merchant_id: number;
    /** Version of the payment form */
    version: number;
    /** The signature of the VK app that caused the payment */
    sign: string;
    /** Service data */
    data: {
      /** Currency. Only RUB is currently supported */
      currency: 'RUB';
      /** Base64-string of data for the signature of the seller */
      merchant_data: string;
      /** SHA-1 seller sign */
      merchant_sign: string;
      /** Sales order id */
      order_id: string | number;
      /** Timestamp */
      ts: number;
      /** Cashback data */
      cashback?: {
        /** Cashback timestamp */
        pay_time: number;
        /** Cashback size */
        amount?: number;
        /** Percentage cashback size */
        amount_percent?: number;
      };
    };
  };
};

/**
 * Possible types VK Pay operations
 */
export type VKPayActionType = keyof VKPayActionParamsMap;

/**
 * VK Pay request props
 */
export type VKPayProps<ActionType extends VKPayActionType> = {
  app_id: number;
  action: ActionType;
  params: VKPayActionParamsMap[ActionType];
};

/**
 * Appearance type
 */
export type AppearanceType = 'light' | 'dark';

/**
 * Application color scheme type
 */
export type AppearanceSchemeType = 'vkcom_light' | 'vkcom_dark' | 'space_gray' | 'bright_light';

/**
 * Vibration type for Taptic Engine
 */
export type TapticVibrationPowerType = 'light' | 'medium' | 'heavy';

/**
 * Notification type for Taptic Engine
 */
export type TapticNotificationType = 'error' | 'success' | 'warning';

/** Status of showing order box */
export type OrderBoxShowingStatus = 'cancel' | 'success' | 'fail';

/**
 * Community widget type
 */
export type CommunityWidgetType =
  | 'text'
  | 'list'
  | 'table'
  | 'tiles'
  | 'compact_list'
  | 'cover_list'
  | 'match'
  | 'matches'
  | 'donation';

/**
 * Output data from code reader
 */
export type CodeReaderOutput = {
  /** Read QR code data */
  code_data: string;
};

/**
 * Selected contact data
 */
export type SelectedContact = {
  phone: string;
  first_name: string;
  last_name: string;
};

/**
 * Request result data
 */
export type RequestResult = {
  /** Operation success */
  success: boolean;
  /** `requestKey` from request */
  requestKey: string;
};

/**
 * Result data of transaction
 */
export type TransactionResult = {
  /** Payment (true — successful, false — unsuccessful). */
  status: boolean;
  /** Payment transaction identifier (for `status=true`). */
  transaction_id: string;
  /** Payment amount */
  amount: string;
  /** Additional information of the seller */
  extra?: string | null;
};

/**
 * Screen insets.
 */
export type Insets = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export type AdaptivityType = 'force_mobile' | 'force_mobile_compact' | 'adaptive';

/** Default fields for config response on all platforms */
export type DefaultUpdateConfigData = {
  /** App_id of opened app */
  app_id: string;
  /** Native app appearance */
  appearance: AppearanceType;
  /** Native app scheme */
  scheme: AppearanceSchemeType;
};

/** Config response for native platforms */
export type MobileUpdateConfigData = DefaultUpdateConfigData & {
  /** Client type */
  app: 'vkclient' | 'vkme';
  /** Safe area insets. iOS only */
  insets?: Insets;
};

/** Config response for m.vk.com and vk.com */
export type SharedUpdateConfigData = DefaultUpdateConfigData & {
  /** window.innerWidth of the parent window */
  viewport_width: number;
  /** window.innerHeight of the parent window */
  viewport_height: number;
  /** Server API host for direct requests. */
  api_host: string;
  /** Adaptivity type. */
  adaptivity?: AdaptivityType;
};

/** Config response for m.vk.com (mobile browser) */
export type MVKUpdateConfigData = SharedUpdateConfigData;

/** Config response for vk.com (full web) */
export type VKUpdateConfigData = SharedUpdateConfigData & {
  /** Is app opened in layer */
  is_layer: boolean;
};

/** Update config data */
export type ParentConfigData = MobileUpdateConfigData | MVKUpdateConfigData | VKUpdateConfigData;

export type WidgetPreviewRequestOptions = {
  /** Widget type */
  type: CommunityWidgetType;
  /** Community ID */
  group_id: number;
  /**
   * Widget code
   * @see {@link https://vk.com/dev/execute Execute method}
   */
  code: string;
};

export type VKWebAppLibverifyOnFailedCode =
  | 'GENERAL_ERROR'
  | 'UNSUPPORTED_NUMBER'
  | 'INCORRECT_PHONE_NUMBER'
  | 'INCORRECT_SMS_CODE'
  | 'RATELIMIT'
  | 'NETWORK_ERROR'
  | 'NO_NETWORK';

/**
 * App close status
 */
export type AppCloseStatus = 'success' | 'failed';

export type CommunityTokenRequestOptions = {
  app_id: number;
  group_id: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  scope: CommunityAuthScope | (string & {});
};

export type MessageRequestOptions = {
  /** Receiver ID (user, community, chat) */
  peer_id: number;
  /** Message text */
  message: string;
  /** List of attaches */
  attachment?: string;
  /** Geographic latitude of a point, specified in degrees (from -90 to 90). */
  lat?: number;
  /** Geographic longitude of a point, specified in degrees (from -180 to 180). */
  lng?: number;
};

export type ShowNativeAdsRequest = {
  ad_format: EAdsFormats;
  use_waterfall?: boolean;
};

export type CheckNativeAdsRequest = {
  ad_format: EAdsFormats;
  use_waterfall?: boolean;
};

export type ShowBannerAdRequest = {
  banner_location: BannerAdLocation;
  layout_type?: BannerAdLayoutType;
  can_close?: boolean;
};

export type OrderRequestOptions = {
  /** Always `item` */
  type: 'item';
  /**
   * Name of product. Will be transmitted in the notification of receipt
   * of product information
   */
  item: string;
};

export type RequestForRequestOptions = {
  /** User Id */
  uid: number;
  /** Request test */
  message: string;
  /**
   * Optional parameter. Custom string to track conversion. It is passed
   * in the application launch parameters in case of launch from the
   * request.
   */
  requestKey?: string;
};

export type WallPostRequestOptions = {
  /**
   * ID of the user or community on whose wall the post is to be
   * published
   */
  owner_id?: number;
  /**
   * `true` - the post posted on behalf of the community will have a
   * signature added (the name of the user who posted the post)
   * `false` - the signature will not be added. The parameter is taken
   * into account only when publishing on the community wall and
   * specifying the from_group parameter. By default, the signature is
   * not added
   */
  signed?: boolean;
  /** Latitude, specified in degrees (from -90 to 90) */
  lat?: number;
  /** Longitude, specified in degrees (from -180 to 180) */
  long?: number;
  /** The place ID where the user is marked */
  place_id?: number;
  /**
   * `true` - post will be available to friends only
   * `false` - post will be available to all users (default)
   */
  friends_only?: boolean;
  /**
   * List of services or websites the update will be exported to, if the user has so requested.
   * Sample values: 'twitter', 'facebook'
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  services?: 'twitter' | 'facebook' | (string & {});
  /** Publication date (in Unix time). If used, posting will be delayed until the set time */
  publish_date?: number;
  /**
   * `true` - post comments will be closed
   * `false` - permission to leave post comments will be up to user's settings (default)
   */
  close_comments?: boolean;
  /** Source of the post. Internal and external links supported */
  copyright?: string;
} & (
  | {
    message?: string;
    attachments: string;
  }
  | {
    message: string;
    attachments?: string;
  }
);

/**
 * Result data user in Share
 */
export type ShareUserInfo = {
  /** User id */
  id: number;
  /** User name */
  first_name: string;
  /** User surname */
  last_name: string;
  /** User sex: 0 - not specified, 1 - female, 2 - male */
  sex: 0 | 1 | 2;
  /** User profile photo */
  photo: string;
};

/**
 * Result data of link share
 */
export type LinkShareResult =
  | { type: 'message'; users: ShareUserInfo[] }
  | { type: 'post'; post_id: string }
  | { type: 'story'; story_id: string }
  | { type: 'qr' | 'link' | 'other' };

export type StoryObjectTransform = {
  /** Rotation, from 0 to 359 deg. Counterclockwise rotation. */
  rotation?: number;
  /**
   * The desired width of the sticker relative to the screen is (0, 1), the
   * height will be calculated taking into account maintaining the aspect ratio
   * of the content.
   */
  relation_width?: number;
  /** From -1 to 1 of screen with */
  translation_x?: number;
  /** From -1 to 1 of screen height */
  translation_y?: number;
  /** Gravity. Default: center. */
  gravity?:
  | 'left_top'
  | 'left_center'
  | 'left_bottom'
  | 'center_top'
  | 'center'
  | 'center_bottom'
  | 'right_top'
  | 'right_center'
  | 'right_bottom';
};

export type StoryActionHashtag = {
  /** Hashtag text */
  hashtag: string;
  /** Hashtag style. Default: `blue_gradient` */
  style?: 'transparent' | 'blue_gradient';
};

export type StoryActionMention = {
  /**
   * Text in mention format:
   * for users: "[id123|name]"
   * for communities: "[club123|name]"
   */
  mention: string;
  /** Mention style. Default: `red_gradient` */
  style?: 'transparent' | 'red_gradient';
};

export type StoryActionPlace = {
  /** Place id */
  place_id: number;
  /** Place name */
  title: string;
  /** Category id */
  category_id?: number;
  /** Style */
  style?: 'transparent' | 'blue' | 'green' | 'white';
};

/**
 * Story action link
 */
export type StoryActionLink = {
  /** Content link */
  link: string;
  /**
   * The value of the string that will be displayed on the client when
   * clicking on the tooltip.
   */
  tooltip_text_key:
  | 'tooltip_open_post'
  | 'tooltip_open_photo'
  | 'tooltip_open_page'
  | 'tooltip_open_default';
};

export type StoryActionTime = {
  /** Time style. Default: `date` */
  style?: 'black' | 'white' | 'green' | 'text' | 'date';
  /** Timestamp in milliseconds */
  timestamp_ms?: number;
  /**
   * Date (`timestamp_ms` alternative) in format:
   * `yyyy:MM:dd HH:mm:ss`
   * (this format is chosen to unify dates from exif fields https://vk.cc/9NrgMr) */
  date?: string;
  /** Top sticker title, meaning only for date style */
  title?: string;
};

export type StoryActionGeo = {
  /** Place id */
  place_id: number;
  /** Place name */
  text: string;
  /** Category id */
  category_id?: number;
  /** Sticker style. Default: `blue`*/
  style?: 'blue' | 'green' | 'white' | 'transparent';
};

export type StoryActionQuestion = {
  /** Question text */
  question: string;
  /** Button text */
  button: string;
};

export type StoryActionText = {
  /**
   * The text may contain mentions/hashtags in the formats specified with
   * the corresponding objects
   */
  text: string;
  /** Text style */
  style?: 'classic' | 'cursive' | 'marker' | 'italics' | 'typewriter' | 'poster' | 'retro';
  /** Background/border style. Default: `none` */
  background_style?: 'none' | 'alpha' | 'solid' | 'sticker' | 'neon';
  /** Horizontal alignment */
  alignment?: 'center' | 'left' | 'right';
  /** HEX color */
  selection_color?: string;
};

export type StoryActionEmoji = {
  emoji: string;
};

export type StoryActionSticker = {
  /** Sticker id */
  sticker_id: number;
  /** Sticker url */
  url?: string;
  /** JSON sticker url */
  animation_url?: string;
  /** Sticker pack id */
  pack_id?: number;
};

export type StoryActionMarketItem = {
  /** Product name */
  title: string;
  /** Product id in VK Market */
  product_id?: number;
  /** Owner id of product in VK Market */
  owner_id?: number;
  /** Aliexpress product link */
  link?: string;
};

/**
 * Story action type
 */
export type StoryAction =
  | StoryActionHashtag
  | StoryActionMention
  | StoryActionPlace
  | StoryActionLink
  | StoryActionTime
  | StoryActionGeo
  | StoryActionQuestion
  | StoryActionText
  | StoryActionEmoji
  | StoryActionSticker
  | StoryActionMarketItem;

export type StoryClickableZoneOrigin = {
  x: number;
  y: number;
};

export type StoryClickableZone = {
  /** Action type */
  action_type: 'hashtag' | 'mention' | 'link' | 'place' | 'question' | 'market_item';
  /** Action data */
  action: StoryAction;
  /**
   * Clickable area border on the sticker. The points should be located
   * clockwise, forming a closed square.
   */
  clickable_area?: StoryClickableZoneOrigin[];
};

export type StoryRenderableSticker = (
  | {
    /** Content url */
    url: string;
  }
  | {
    /** Base64 string with BLOB */
    blob: string;
  }
) & {
  /** Story type */
  content_type: 'image' | 'gif' | 'video';
  /** Object transform */
  transform?: StoryObjectTransform;
  /** Clickable zones */
  clickable_zones?: StoryClickableZone[];
  /** Content width */
  original_width?: number;
  /** Content height */
  original_height?: number;
  /** Whether the sticker can be removed from the screen, `true` by default */
  can_delete?: boolean;
};

export type StoryNativeSticker = {
  /** Story action type */
  action_type:
  | 'text'
  | 'hashtag'
  | 'mention'
  | 'time'
  | 'place'
  | 'question'
  | 'emoji'
  | 'sticker'
  | 'market_item';
  /** Story action */
  action: StoryAction;
  /** Object transform */
  transform?: StoryObjectTransform;
  /** Whether the sticker can be removed from the screen, `true` by default */
  can_delete?: boolean;
};

/**
 * Sticker container
 */
export type StickerContainer =
  | {
    sticker_type: 'renderable';
    sticker: StoryRenderableSticker;
  }
  | {
    sticker_type: 'native';
    sticker: StoryNativeSticker;
  };

/** Link text for moving from a story (community stories only) */
export type StoryButtonText =
  | 'learn_more' // «Подробнее» (default)
  | 'to_store' // «В магазин»
  | 'vote' // «Голосовать»
  | 'more' // «Ещё»
  | 'book' // «Забронировать»
  | 'order' // «Заказать»
  | 'enroll' // «Записаться»
  | 'fill' // «Заполнить»
  | 'signup' // «Зарегистрироваться»
  | 'buy' // «Купить»
  | 'ticket' // «Купить билет»
  | 'write' // «Написать»
  | 'open' // «Открыть»
  | 'view' // «Посмотреть»
  | 'go_to' // «Перейти»
  | 'contact' // «Связаться»
  | 'watch' // «Смотреть»
  | 'play' // «Слушать»
  | 'install' // «Установить»
  | 'read'; // «Читать»

export type StoryAttachment = {
  /** Button text key (см. link_text в stories.getVideoUploadServer) */
  text: string;
  /** Attach type */
  type: 'url' | 'audio' | 'video' | 'photo';
  /** Content url */
  url?: string;
  /** Owner id */
  owner_id?: number;
  /** Object id */
  id?: number;
  /** Access key for the attachment */
  access_key?: string;
};

export type ShowStoryBoxOptions = {
  /** Story type */
  background_type: 'image' | 'video' | 'none';
  /** Camera type (only for `background_type: none`). Default: `back` */
  camera_type?: 'back' | 'front';
  /** Link to an image or video (should follow a direct link to mp4) */
  url?: string;
  /** Base64 string with BLOB (supported only for image) */
  blob?: string;
  /** Lock to move the photo */
  locked?: boolean;
  /** Story attachment object */
  attachment?: StoryAttachment;
  /** Array of sticker objects */
  stickers?: StickerContainer[];
};

/**
 * Params of method for subscribing to a story updates
 */
export type SubscribeStoryAppOptions = {
  /** Story owner id */
  story_owner_id: number;
  /** Story id */
  story_id: number;
  /** Clickable sticker id */
  sticker_id: number;
  /** Private stories access key */
  access_key?: string;
};

/**
 * Group info
 */
export type GroupInfo = {
  id: number;
  name: string;
  screen_name: string;
  is_closed: number;
  type: string;
  is_member: number;
  description: string;
  photo_50: string;
  photo_100: string;
  photo_200: string;
};

/*
 * Options for request to adding a user to an audience with a retargeting pixel
 */
export type RetargetingPixelOptions = {
  /** Pixel code, e.g. `VK-RTRG-447253-dUuM` */
  pixel_code: string;
  /** Event id, pixel rule */
  event?: string;
  /** ID of the retargeting group to which the current user should be added */
  target_group_id?: number;
  /** ID of the price list */
  price_list_id?: number;
  /** Type of product event */
  products_event?: string;
  /** Product params */
  products_params?: string;
};

/**
 * Type for params field in OKWebAppCallAPIMethod
 */
export type OKCallApiParams = {
  application_key: string;
  access_token: string;
  format?: string;

  [key: string]: any;
};

/**
 * Type for VKWebAppCheckAllowedScopes method results
 */
export type VKWebAppCheckAllowedScopesResponseEntry = {
  scope: string;
  allowed: boolean;
};

type ActionSheetSlide = {
  media: ActionSheetSlideMedia;
  title: string;
  subtitle: string;
};

type ActionSheetSlideMedia = (
  | {
    /** Content url */
    url: string;
  }
  | {
    /** Base64 string with BLOB */
    blob: string;
  }
) & {
  /** Media type */
  type: 'image' | 'gif' | 'video';
};

export type ShowSlidesSheetResponse = {
  result: true;
} & (
  | {
    action: 'confirm' | 'cancel';
  }
  | {
    action: 'reject';
    slide_index: number;
  }
);

export type ShowSlidesSheetRequest = {
  slides: ActionSheetSlide[];
};

// eslint-disable-next-line @typescript-eslint/ban-types
type TranslationLanguage = 'ru' | 'en' | 'es' | 'pt' | (string & {});

export type TranslateResponse = {
  result: {
    texts: string[];
    source_lang: TranslationLanguage;
  };
};

export type TranslateRequest = {
  texts: string[];
  translation_language: TranslationLanguage;
};

export type CallStartResponse = {
  result: true;
  join_link: string;
};

export type CallJoinRequest = {
  join_link: string;
};

export type CallJoinResponse = {
  result: true;
};

export type CallGetStatusResponse = {
  result: true;
  is_active: boolean;
};

export type CallLeftResponse = {
  reason: string;
};

export type CallFinishedResponse = {
  result: true;
};

export type GetGrantedPermissionsResponse = {
  permissions: EGrantedPermission[];
};

export type CreateHashRequest = {
  payload?: string;
};

export type CreateHashResponse = {
  ts: number;
  hash: string;
  payload?: string;
};

export type ChangeFragmentResponse = {
  location: string;
};

export type GetLaunchParamsResponse = {
  vk_user_id: number;
  vk_app_id: number;
  vk_is_app_user: 0 | 1;
  vk_are_notifications_enabled: 0 | 1;
  vk_language: EGetLaunchParamsResponseLanguages;
  vk_ref: string;
  vk_access_token_settings: string;
  vk_group_id?: number;
  vk_viewer_group_role?: EGetLaunchParamsResponseGroupRole;
  vk_platform: EGetLaunchParamsResponsePlatforms;
  vk_is_favorite: 0 | 1;
  vk_ts: number;
  sign: string;
};

export type ConversionHitRequest = {
  pixel_code: string;
  conversion_event: string;
  conversion_value: number;
};

export type ConversionHitResponse = {
  result: true;
};

export type VKWebAppShowBannerAdResponse = {
  result: boolean;
  banner_width: number;
  banner_height: number;
  banner_location: BannerAdLocation;
  layout_type: BannerAdLayoutType;
};

export type VKWebAppCheckBannerAdResponse = VKWebAppShowBannerAdResponse;
export type VKWebAppHideBannerAdResponse = VKWebAppShowBannerAdResponse;
export type VKWebAppBannerAdUpdatedResponse = VKWebAppShowBannerAdResponse;
export type VKWebAppBannerAdClosedByUserResponse = Omit<VKWebAppShowBannerAdResponse, 'result'>;

export type VKWebAppShowOrderBoxResponse = {
  status: OrderBoxShowingStatus;
  order_id: string;
};

export type ScrollTopResponse = {
  scrollTop: number;
};

export type ShowSubscriptionBoxRequest = {
  action: 'create' | 'resume' | 'cancel';
  item?: string;
  subscription_id?: string;
};

export type ShowSubscriptionBoxResponse = {
  success: boolean;
  subscriptionId: string;
};

/**
 * Map of types of request props of VK Bridge methods
 */
export type RequestPropsMap = {
  VKWebAppInit: Record<string, unknown>;
  VKWebAppAddToCommunity: Record<string, unknown>;
  VKWebAppAddToHomeScreen: Record<string, unknown>;
  VKWebAppAddToHomeScreenInfo: Record<string, unknown>;
  VKWebAppAllowMessagesFromGroup: { group_id: number; key?: string };
  VKWebAppAllowNotifications: Record<string, unknown>;
  OKWebAppCallAPIMethod: { method: string; params: OKCallApiParams };
  VKWebAppCallAPIMethod: {
    method: string;
    params: Record<'access_token' | 'v', string> & Record<string, string | number>;
  };
  VKWebAppCopyText: { text: string };
  VKWebAppCreateHash: CreateHashRequest;
  VKWebAppDownloadFile: { url: string; filename: string };
  // eslint-disable-next-line @typescript-eslint/ban-types
  VKWebAppGetAuthToken: { app_id: number; scope: PersonalAuthScope | (string & {}) };
  VKWebAppClose: { status: AppCloseStatus; payload?: any };
  VKWebAppOpenApp: { app_id: number; location?: string };
  VKWebAppDenyNotifications: Record<string, unknown>;
  VKWebAppFlashGetInfo: Record<string, unknown>;
  VKWebAppFlashSetLevel: { level: number };
  VKWebAppGetClientVersion: Record<string, unknown>;
  VKWebAppGetCommunityToken: CommunityTokenRequestOptions;
  VKWebAppGetConfig: Record<string, unknown>;
  VKWebAppGetLaunchParams: Record<string, unknown>;
  VKWebAppAudioPause: Record<string, unknown>;
  VKWebAppGetEmail: Record<string, unknown>;
  VKWebAppGetFriends: { multi?: boolean };
  VKWebAppGetGeodata: Record<string, unknown>;
  VKWebAppGetGrantedPermissions: Record<string, unknown>;
  VKWebAppGetPersonalCard: { type: PersonalCardType[] };
  VKWebAppGetPhoneNumber: Record<string, unknown>;
  VKWebAppGetUserInfo: { user_id?: number };
  VKWebAppJoinGroup: { group_id: number };
  VKWebAppLeaveGroup: { group_id: number };
  VKWebAppAddToMenu: Record<string, unknown>;
  VKWebAppOpenCodeReader: Record<string, unknown>;
  VKWebAppOpenContacts: Record<string, unknown>;
  VKWebAppOpenPayForm: VKPayProps<VKPayActionType>;
  VKWebAppOpenQR: Record<string, unknown>;
  VKWebAppResizeWindow: { width: number; height?: number };
  VKWebAppScroll: { top: number; speed?: number };
  VKWebAppSendToClient: { fragment?: string };
  VKWebAppSetLocation: { location: string; replace_state?: boolean };
  VKWebAppSetViewSettings: {
    status_bar_style: AppearanceType;
    /** Android only */
    // eslint-disable-next-line @typescript-eslint/ban-types
    action_bar_color?: 'none' | (string & {});
    /** Android only */
    navigation_bar_color?: string;
  };
  VKWebAppShare: { link?: string };
  VKWebAppShowCommunityWidgetPreviewBox: WidgetPreviewRequestOptions;
  VKWebAppShowImages: { images: string[]; start_index?: number };
  VKWebAppShowInviteBox: Record<string, unknown>;
  VKWebAppShowLeaderBoardBox: { user_result: number };
  VKWebAppShowMessageBox: MessageRequestOptions;
  VKWebAppCheckBannerAd: Record<string, unknown>;
  VKWebAppHideBannerAd: Record<string, unknown>;
  VKWebAppShowBannerAd: ShowBannerAdRequest;
  VKWebAppShowNativeAds: ShowNativeAdsRequest;
  VKWebAppCheckNativeAds: CheckNativeAdsRequest;
  VKWebAppShowOrderBox: OrderRequestOptions;
  VKWebAppShowRequestBox: RequestForRequestOptions;
  VKWebAppShowWallPostBox: WallPostRequestOptions;
  VKWebAppShowSubscriptionBox: ShowSubscriptionBoxRequest;
  VKWebAppOpenWallPost: { post_id: number; owner_id: number };
  VKWebAppStorageGet: { keys: string[] };
  VKWebAppStorageGetKeys: { count: number; offset: number };
  VKWebAppStorageSet: { key: string; value: string };
  VKWebAppTapticImpactOccurred: { style: TapticVibrationPowerType };
  VKWebAppTapticNotificationOccurred: { type: TapticNotificationType };
  VKWebAppTapticSelectionChanged: Record<string, unknown>;
  VKWebAppAddToFavorites: Record<string, unknown>;
  VKWebAppSendPayload: { group_id: number; payload: any };
  VKWebAppDisableSwipeBack: Record<string, unknown>;
  VKWebAppEnableSwipeBack: Record<string, unknown>;
  VKWebAppSetSwipeSettings: { history: boolean };
  VKWebAppShowStoryBox: ShowStoryBoxOptions;
  VKWebAppAccelerometerStart: { refresh_rate?: string };
  VKWebAppAccelerometerStop: Record<string, unknown>;
  VKWebAppGyroscopeStart: Record<string, unknown>;
  VKWebAppGyroscopeStop: Record<string, unknown>;
  VKWebAppDeviceMotionStart: Record<string, unknown>;
  VKWebAppDeviceMotionStop: Record<string, unknown>;
  VKWebAppSubscribeStoryApp: SubscribeStoryAppOptions;
  VKWebAppGetGroupInfo: { group_id: number };
  VKWebAppLibverifyRequest: { phone: string };
  VKWebAppLibverifyCheck: { code: string };
  VKWebAppRetargetingPixel: RetargetingPixelOptions;
  VKWebAppCheckAllowedScopes: { scopes: string };
  VKWebAppConversionHit: ConversionHitRequest;
  VKWebAppCheckSurvey: Record<string, unknown>;
  VKWebAppShowSurvey: Record<string, unknown>;
  VKWebAppScrollTop: Record<string, unknown>;
  VKWebAppScrollTopStart: Record<string, unknown>;
  VKWebAppScrollTopStop: Record<string, unknown>;
  VKWebAppShowSlidesSheet: ShowSlidesSheetRequest;
  VKWebAppTranslate: TranslateRequest;
  VKWebAppCallStart: Record<string, unknown>;
  VKWebAppCallJoin: CallJoinRequest;
  VKWebAppCallGetStatus: Record<string, unknown>;
  VKWebAppRecommend: Record<string, unknown>;
};

/**
 * Map of types of response data of VK Bridge methods
 */
export type ReceiveDataMap = {
  VKWebAppInit: { result: true };
  VKWebAppAddToCommunity: { group_id: number };
  VKWebAppAddToHomeScreen: { result: true };
  VKWebAppAddToHomeScreenInfo: { is_feature_supported: boolean; is_added_to_home_screen: boolean };
  VKWebAppAllowMessagesFromGroup: { result: true };
  VKWebAppAllowNotifications: { result: true };
  OKWebAppCallAPIMethod: { response: any };
  VKWebAppCallAPIMethod: { response: any };
  VKWebAppCopyText: { result: true };
  VKWebAppCreateHash: CreateHashResponse;
  VKWebAppDownloadFile: { result: true };
  VKWebAppGetAuthToken: { access_token: string; scope: string };
  VKWebAppClose: { payload: any };
  VKWebAppOpenApp: { result: true };
  VKWebAppDenyNotifications: { result: true };
  VKWebAppFlashGetInfo: { is_available: boolean; level: number };
  VKWebAppFlashSetLevel: { result: true };
  VKWebAppGetClientVersion: { platform: string; version: string };
  VKWebAppGetEmail: { email: string; sign: string };
  VKWebAppGetFriends: { users: UserGetFriendsFriend[] };
  VKWebAppGetGeodata:
  | { available: 0 }
  | { available: 1; lat: number; long: number; accuracy: number };
  VKWebAppGetGrantedPermissions: GetGrantedPermissionsResponse;
  VKWebAppGetPersonalCard: PersonalCardData;
  VKWebAppGetPhoneNumber: { phone_number: string; sign: string; is_verified: boolean };
  VKWebAppGetUserInfo: UserInfo;
  VKWebAppJoinGroup: { result: true };
  VKWebAppLeaveGroup: { result: true };
  VKWebAppAddToMenu: { result: true };
  VKWebAppOpenCodeReader: CodeReaderOutput;
  VKWebAppOpenQR: CodeReaderOutput;
  VKWebAppOpenContacts: SelectedContact;
  VKWebAppOpenPayForm: TransactionResult | { result: TransactionResult };
  VKWebAppResizeWindow: { width: number; height: number };
  VKWebAppScroll: { top: number; height: number };
  VKWebAppSendToClient: { result: true };
  VKWebAppSetLocation: { result: true };
  VKWebAppSetViewSettings: { result: true };
  VKWebAppShare: LinkShareResult[];
  VKWebAppShowCommunityWidgetPreviewBox: { result: true };
  VKWebAppShowImages: { result: true };
  VKWebAppShowInviteBox: { success: true };
  VKWebAppShowLeaderBoardBox: { success: boolean };
  VKWebAppShowMessageBox: { result: true };
  VKWebAppCheckBannerAd: VKWebAppCheckBannerAdResponse;
  VKWebAppHideBannerAd: VKWebAppHideBannerAdResponse;
  VKWebAppShowBannerAd: VKWebAppShowBannerAdResponse;
  VKWebAppBannerAdUpdated: VKWebAppBannerAdUpdatedResponse;
  VKWebAppBannerAdClosedByUser: VKWebAppBannerAdClosedByUserResponse;
  VKWebAppShowNativeAds: { result: true };
  VKWebAppCheckNativeAds: { result: boolean };
  VKWebAppShowOrderBox: VKWebAppShowOrderBoxResponse;
  VKWebAppShowRequestBox: RequestResult;
  VKWebAppShowWallPostBox: { post_id: number | string };
  VKWebAppShowSubscriptionBox: ShowSubscriptionBoxResponse;
  VKWebAppOpenWallPost: { result: true };
  VKWebAppStorageGet: { keys: Array<{ key: string; value: string }> };
  VKWebAppStorageGetKeys: { keys: string[] };
  VKWebAppStorageSet: { result: true };
  VKWebAppTapticImpactOccurred: { result: true };
  VKWebAppTapticNotificationOccurred: { result: true };
  VKWebAppTapticSelectionChanged: { result: true };
  VKWebAppAddToFavorites: { result: true };
  VKWebAppSendPayload: { result: true };
  VKWebAppGetCommunityToken: { access_token: string; scope: string };
  VKWebAppAudioPause: { result: true };
  VKWebAppAudioPaused: { position: number; type: string; id: string };
  VKWebAppAudioStopped: Record<string, unknown>; // Always empty
  VKWebAppAudioTrackChanged: { type: string; id: string };
  VKWebAppAudioUnpaused: { type: string; id: string };
  VKWebAppInitAds: { init: 'true' | 'false' };
  VKWebAppLoadAds: { load: 'true' | 'false' };
  VKWebAppUpdateConfig: ParentConfigData;
  VKWebAppGetConfig: ParentConfigData;
  VKWebAppGetLaunchParams: GetLaunchParamsResponse;
  VKWebAppUpdateInsets: { insets: Insets };
  VKWebAppViewHide: Record<string, unknown>; // Always empty
  VKWebAppViewRestore: Record<string, unknown>; // Always empty
  VKWebAppDisableSwipeBack: { result: true };
  VKWebAppEnableSwipeBack: { result: true };
  VKWebAppSetSwipeSettings: { result: true };
  VKWebAppShowStoryBox: { result: true };
  VKWebAppAccelerometerStart: { result: true };
  VKWebAppAccelerometerStop: { result: true };
  VKWebAppGyroscopeStart: { result: true };
  VKWebAppGyroscopeStop: { result: true };
  VKWebAppAccelerometerChanged: { x: string; y: string; z: string };
  VKWebAppGyroscopeChanged: { x: string; y: string; z: string };
  VKWebAppDeviceMotionStart: { result: true };
  VKWebAppDeviceMotionChanged: { alpha: string; beta: string; gamma: string };
  VKWebAppDeviceMotionStop: { result: true };
  VKWebAppLocationChanged: { location: string };
  VKWebAppSubscribeStoryApp: { access_key: string };
  VKWebAppGetGroupInfo: GroupInfo;
  VKWebAppLibverifyOnConfirmed: { validate_session: string; validate_token: string };
  VKWebAppLibverifyOnFailed: { code: VKWebAppLibverifyOnFailedCode };
  VKWebAppRetargetingPixel: { result: true };
  VKWebAppCheckAllowedScopes: { result: VKWebAppCheckAllowedScopesResponseEntry[] };
  VKWebAppChangeFragment: ChangeFragmentResponse;
  VKWebAppConversionHit: ConversionHitResponse;
  VKWebAppCheckSurvey: { result: boolean };
  VKWebAppShowSurvey: { result: boolean };
  VKWebAppScrollTop: ScrollTopResponse;
  VKWebAppScrollTopStart: { result: true };
  VKWebAppScrollTopStop: { result: true };
  VKWebAppShowSlidesSheet: ShowSlidesSheetResponse;
  VKWebAppTranslate: TranslateResponse;
  VKWebAppCallStart: CallStartResponse;
  VKWebAppCallJoin: CallJoinResponse;
  VKWebAppCallGetStatus: CallGetStatusResponse;
  VKWebAppCallLeft: CallLeftResponse;
  VKWebAppCallFinished: CallFinishedResponse;
  VKWebAppRecommend: { result: true };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type VKBridgeUnknownMethod = (string & {});

export type VKBridgeMethodParams<M extends keyof RequestPropsMap> =
  string extends keyof RequestPropsMap[M] ?
    [params: RequestPropsMap[M] | undefined] | [] :
    [params: RequestPropsMap[M]];

export type VKBridgeMethodResult<M extends keyof ReceiveDataMap | VKBridgeUnknownMethod> =
  M extends keyof ReceiveDataMap ?
    ReceiveDataMap[M] :
    Record<string, unknown>;

export type VKBridgeSend = {
  <M extends keyof RequestPropsMap>(method: M, ...params: VKBridgeMethodParams<M>): Promise<VKBridgeMethodResult<M>>;
  (method: VKBridgeUnknownMethod, params?: Record<string, unknown>): Promise<Record<string, unknown>>;
};

export type VKBridgeSupports = (
  method: keyof RequestPropsMap | VKBridgeUnknownMethod
) => boolean;

/**
 * Client error data.
 */
export type ErrorDataClientError = {
  error_code: number;
  error_reason: string;
  error_description?: string;
};

/**
 * API error data.
 */
export type ErrorDataAPIError = {
  error_code: number;
  error_msg: string;
  request_params: string[];
};

/**
 * Auth error data.
 */
export type ErrorDataAuthError = {
  error_code: number;
  error_reason: string;
  error_description?: string[];
};

/**
 * Stated type of error data
 */
export type ErrorData = {
  error_type: 'client_error';
  error_data: ErrorDataClientError;
  request_id?: string;
} | {
  error_type: 'api_error';
  error_data: ErrorDataAPIError;
  request_id?: string;
} | {
  error_type: 'auth_error';
  error_data: ErrorDataAuthError;
  request_id?: string;
};

/**
 * Real type of error data
 */
export type ErrorDataFullSpec = {
  error_type: string;
  error_data: {
    error?: string;
    error_msg?: string;
    error_code?: number;
    error_domain?: string;
    error_description?: string | string[];
    error_text?: string;
    request_params?: Array<Record<string, unknown>> | string[];
    error_reason?: string | {
      code?: number;
      error_code?: number;
      error_msg?: string;
      error_text?: string;
      request_params?: Array<Record<string, unknown>> | string[];
    } & Partial<ErrorDataFullSpec>;
  };
};

type FlatMap<T> = {
  [Key in keyof T]: T[Key];
} & (
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
);

type EventReceiveNames<
  T extends keyof RequestPropsMap,
  R extends string,
  F extends string
> = {
  [Name in T]: { result: R; failed: F };
};

export type ReceiveEventMap = FlatMap<(
  EventReceiveNames<
  'VKWebAppInit',
  'VKWebAppInitResult',
  'VKWebAppInitFailed'
  > &
  EventReceiveNames<
  'VKWebAppAddToCommunity',
  'VKWebAppAddToCommunityResult',
  'VKWebAppAddToCommunityFailed'
  > &
  EventReceiveNames<
  'VKWebAppAddToHomeScreen',
  'VKWebAppAddToHomeScreenResult',
  'VKWebAppAddToHomeScreenFailed'
  > &
  EventReceiveNames<
  'VKWebAppAddToHomeScreenInfo',
  'VKWebAppAddToHomeScreenInfoResult',
  'VKWebAppAddToHomeScreenInfoFailed'
  > &
  EventReceiveNames<
  'VKWebAppAllowMessagesFromGroup',
  'VKWebAppAllowMessagesFromGroupResult',
  'VKWebAppAllowMessagesFromGroupFailed'
  > &
  EventReceiveNames<
  'VKWebAppAllowNotifications',
  'VKWebAppAllowNotificationsResult',
  'VKWebAppAllowNotificationsFailed'
  > &
  EventReceiveNames<
  'OKWebAppCallAPIMethod',
  'OKWebAppCallAPIMethodResult',
  'OKWebAppCallAPIMethodFailed'
  > &
  EventReceiveNames<
  'VKWebAppCallAPIMethod',
  'VKWebAppCallAPIMethodResult',
  'VKWebAppCallAPIMethodFailed'
  > &
  EventReceiveNames<'VKWebAppCopyText', 'VKWebAppCopyTextResult', 'VKWebAppCopyTextFailed'> &
  EventReceiveNames<'VKWebAppCreateHash', 'VKWebAppCreateHashResult', 'VKWebAppCreateHashFailed'> &
  EventReceiveNames<
  'VKWebAppDownloadFile',
  'VKWebAppDownloadFileResult',
  'VKWebAppDownloadFileFailed'
  > &

  // NOTE: Different request/response events
  EventReceiveNames<
  'VKWebAppGetAuthToken',
  'VKWebAppAccessTokenReceived',
  'VKWebAppAccessTokenFailed'
  > &
  EventReceiveNames<'VKWebAppClose', 'VKWebAppCloseResult', 'VKWebAppCloseFailed'> &
  EventReceiveNames<'VKWebAppOpenApp', 'VKWebAppOpenAppResult', 'VKWebAppOpenAppFailed'> &
  EventReceiveNames<
  'VKWebAppDenyNotifications',
  'VKWebAppDenyNotificationsResult',
  'VKWebAppDenyNotificationsFailed'
  > &
  EventReceiveNames<
  'VKWebAppFlashGetInfo',
  'VKWebAppFlashGetInfoResult',
  'VKWebAppFlashGetInfoFailed'
  > &
  EventReceiveNames<
  'VKWebAppFlashSetLevel',
  'VKWebAppFlashSetLevelResult',
  'VKWebAppFlashSetLevelFailed'
  > &
  EventReceiveNames<
  'VKWebAppGetClientVersion',
  'VKWebAppGetClientVersionResult',
  'VKWebAppGetClientVersionFailed'
  > &
  EventReceiveNames<
  'VKWebAppGetCommunityToken',
  'VKWebAppGetCommunityTokenResult',
  'VKWebAppGetCommunityTokenFailed'
  > &
  EventReceiveNames<'VKWebAppGetConfig', 'VKWebAppGetConfigResult', 'VKWebAppGetConfigFailed'> &
  EventReceiveNames<
  'VKWebAppGetLaunchParams',
  'VKWebAppGetLaunchParamsResult',
  'VKWebAppGetLaunchParamsFailed'
  > &
  EventReceiveNames<'VKWebAppAudioPause', 'VKWebAppAudioPauseResult', 'VKWebAppAudioPauseFailed'> &
  EventReceiveNames<'VKWebAppGetEmail', 'VKWebAppGetEmailResult', 'VKWebAppGetEmailFailed'> &
  EventReceiveNames<'VKWebAppGetFriends', 'VKWebAppGetFriendsResult', 'VKWebAppGetFriendsFailed'> &
  EventReceiveNames<'VKWebAppGetGeodata', 'VKWebAppGetGeodataResult', 'VKWebAppGetGeodataFailed'> &
  EventReceiveNames<
  'VKWebAppGetGrantedPermissions',
  'VKWebAppGetGrantedPermissionsResult',
  'VKWebAppGetGrantedPermissionsFailed'
  > &
  EventReceiveNames<
  'VKWebAppGetPersonalCard',
  'VKWebAppGetPersonalCardResult',
  'VKWebAppGetPersonalCardFailed'
  > &
  EventReceiveNames<
  'VKWebAppGetPhoneNumber',
  'VKWebAppGetPhoneNumberResult',
  'VKWebAppGetPhoneNumberFailed'
  > &
  EventReceiveNames<
  'VKWebAppGetUserInfo',
  'VKWebAppGetUserInfoResult',
  'VKWebAppGetUserInfoFailed'
  > &
  EventReceiveNames<'VKWebAppJoinGroup', 'VKWebAppJoinGroupResult', 'VKWebAppJoinGroupFailed'> &
  EventReceiveNames<'VKWebAppLeaveGroup', 'VKWebAppLeaveGroupResult', 'VKWebAppLeaveGroupFailed'> &
  EventReceiveNames<'VKWebAppAddToMenu', 'VKWebAppAddToMenuResult', 'VKWebAppAddToMenuFailed'> &
  EventReceiveNames<
  'VKWebAppOpenCodeReader',
  'VKWebAppOpenCodeReaderResult',
  'VKWebAppOpenCodeReaderFailed'
  > &
  EventReceiveNames<
  'VKWebAppOpenContacts',
  'VKWebAppOpenContactsResult',
  'VKWebAppOpenContactsFailed'
  > &
  EventReceiveNames<
  'VKWebAppOpenPayForm',
  'VKWebAppOpenPayFormResult',
  'VKWebAppOpenPayFormFailed'
  > &
  EventReceiveNames<'VKWebAppOpenQR', 'VKWebAppOpenQRResult', 'VKWebAppOpenQRFailed'> &
  EventReceiveNames<
  'VKWebAppResizeWindow',
  'VKWebAppResizeWindowResult',
  'VKWebAppResizeWindowFailed'
  > &
  EventReceiveNames<'VKWebAppScroll', 'VKWebAppScrollResult', 'VKWebAppScrollFailed'> &
  EventReceiveNames<
  'VKWebAppSendToClient',
  'VKWebAppSendToClientResult',
  'VKWebAppSendToClientFailed'
  > &
  EventReceiveNames<
  'VKWebAppSetLocation',
  'VKWebAppSetLocationResult',
  'VKWebAppSetLocationFailed'
  > &
  EventReceiveNames<
  'VKWebAppSetViewSettings',
  'VKWebAppSetViewSettingsResult',
  'VKWebAppSetViewSettingsFailed'
  > &
  EventReceiveNames<'VKWebAppShare', 'VKWebAppShareResult', 'VKWebAppShareFailed'> &
  EventReceiveNames<
  'VKWebAppShowCommunityWidgetPreviewBox',
  'VKWebAppShowCommunityWidgetPreviewBoxResult',
  'VKWebAppShowCommunityWidgetPreviewBoxFailed'
  > &
  EventReceiveNames<'VKWebAppShowImages', 'VKWebAppShowImagesResult', 'VKWebAppShowImagesFailed'> &
  EventReceiveNames<
  'VKWebAppShowInviteBox',
  'VKWebAppShowInviteBoxResult',
  'VKWebAppShowInviteBoxFailed'
  > &
  EventReceiveNames<
  'VKWebAppShowLeaderBoardBox',
  'VKWebAppShowLeaderBoardBoxResult',
  'VKWebAppShowLeaderBoardBoxFailed'
  > &
  EventReceiveNames<
  'VKWebAppShowMessageBox',
  'VKWebAppShowMessageBoxResult',
  'VKWebAppShowMessageBoxFailed'
  > &
  EventReceiveNames<
  'VKWebAppCheckBannerAd',
  'VKWebAppCheckBannerAdResult',
  'VKWebAppCheckBannerAdFailed'
  > &
  EventReceiveNames<
  'VKWebAppHideBannerAd',
  'VKWebAppHideBannerAdResult',
  'VKWebAppHideBannerAdFailed'
  > &
  EventReceiveNames<
  'VKWebAppShowBannerAd',
  'VKWebAppShowBannerAdResult',
  'VKWebAppShowBannerAdFailed'
  > &
  EventReceiveNames<
  'VKWebAppShowNativeAds',
  'VKWebAppShowNativeAdsResult',
  'VKWebAppShowNativeAdsFailed'
  > &
  EventReceiveNames<
  'VKWebAppCheckNativeAds',
  'VKWebAppCheckNativeAdsResult',
  'VKWebAppCheckNativeAdsFailed'
  > &
  EventReceiveNames<
  'VKWebAppShowOrderBox',
  'VKWebAppShowOrderBoxResult',
  'VKWebAppShowOrderBoxFailed'
  > &
  EventReceiveNames<
  'VKWebAppShowRequestBox',
  'VKWebAppShowRequestBoxResult',
  'VKWebAppShowRequestBoxFailed'
  > &
  EventReceiveNames<
  'VKWebAppShowWallPostBox',
  'VKWebAppShowWallPostBoxResult',
  'VKWebAppShowWallPostBoxFailed'
  > &
  EventReceiveNames<
  'VKWebAppShowSubscriptionBox',
  'VKWebAppShowSubscriptionBoxResult',
  'VKWebAppShowSubscriptionBoxFailed'
  > &
  EventReceiveNames<
  'VKWebAppOpenWallPost',
  'VKWebAppOpenWallPostResult',
  'VKWebAppOpenWallPostFailed'
  > &
  EventReceiveNames<'VKWebAppStorageGet', 'VKWebAppStorageGetResult', 'VKWebAppStorageGetFailed'> &
  EventReceiveNames<
  'VKWebAppStorageGetKeys',
  'VKWebAppStorageGetKeysResult',
  'VKWebAppStorageGetKeysFailed'
  > &
  EventReceiveNames<'VKWebAppStorageSet', 'VKWebAppStorageSetResult', 'VKWebAppStorageSetFailed'> &
  EventReceiveNames<
  'VKWebAppTapticImpactOccurred',
  'VKWebAppTapticImpactOccurredResult',
  'VKWebAppTapticImpactOccurredFailed'
  > &
  EventReceiveNames<
  'VKWebAppTapticNotificationOccurred',
  'VKWebAppTapticNotificationOccurredResult',
  'VKWebAppTapticNotificationOccurredFailed'
  > &
  EventReceiveNames<
  'VKWebAppTapticSelectionChanged',
  'VKWebAppTapticSelectionChangedResult',
  'VKWebAppTapticSelectionChangedFailed'
  > &
  EventReceiveNames<
  'VKWebAppAddToFavorites',
  'VKWebAppAddToFavoritesResult',
  'VKWebAppAddToFavoritesFailed'
  > &
  EventReceiveNames<
  'VKWebAppSendPayload',
  'VKWebAppSendPayloadResult',
  'VKWebAppSendPayloadFailed'
  > &
  EventReceiveNames<
  'VKWebAppDisableSwipeBack',
  'VKWebAppDisableSwipeBackResult',
  'VKWebAppDisableSwipeBackFailed'
  > &
  EventReceiveNames<
  'VKWebAppEnableSwipeBack',
  'VKWebAppEnableSwipeBackResult',
  'VKWebAppEnableSwipeBackFailed'
  > &
  EventReceiveNames<
  'VKWebAppSetSwipeSettings',
  'VKWebAppSetSwipeSettingsResult',
  'VKWebAppSetSwipeSettingsFailed'
  > &
  EventReceiveNames<
  'VKWebAppShowStoryBox',
  'VKWebAppShowStoryBoxResult',
  'VKWebAppShowStoryBoxFailed'
  > &
  EventReceiveNames<
  'VKWebAppAccelerometerStart',
  'VKWebAppAccelerometerStartResult',
  'VKWebAppAccelerometerStartFailed'
  > &
  EventReceiveNames<
  'VKWebAppAccelerometerStop',
  'VKWebAppAccelerometerStopResult',
  'VKWebAppAccelerometerStopFailed'
  > &
  EventReceiveNames<
  'VKWebAppGyroscopeStart',
  'VKWebAppGyroscopeStartResult',
  'VKWebAppGyroscopeStartFailed'
  > &
  EventReceiveNames<
  'VKWebAppGyroscopeStop',
  'VKWebAppGyroscopeStopResult',
  'VKWebAppGyroscopeStopFailed'
  > &
  EventReceiveNames<
  'VKWebAppDeviceMotionStart',
  'VKWebAppDeviceMotionStartResult',
  'VKWebAppDeviceMotionStartFailed'
  > &
  EventReceiveNames<
  'VKWebAppDeviceMotionStop',
  'VKWebAppDeviceMotionStopResult',
  'VKWebAppDeviceMotionStopFailed'
  > &
  EventReceiveNames<
  'VKWebAppSubscribeStoryApp',
  'VKWebAppSubscribeStoryAppResult',
  'VKWebAppSubscribeStoryAppFailed'
  > &
  EventReceiveNames<
  'VKWebAppGetGroupInfo',
  'VKWebAppGetGroupInfoResult',
  'VKWebAppGetGroupInfoFailed'
  > &
  EventReceiveNames<
  'VKWebAppRetargetingPixel',
  'VKWebAppRetargetingPixelResult',
  'VKWebAppRetargetingPixelFailed'
  > &
  EventReceiveNames<
  'VKWebAppCheckAllowedScopes',
  'VKWebAppCheckAllowedScopesResult',
  'VKWebAppCheckAllowedScopesFailed'
  > &
  EventReceiveNames<
  'VKWebAppCheckSurvey',
  'VKWebAppCheckSurveyResult',
  'VKWebAppCheckSurveyFailed'
  > &
  EventReceiveNames<'VKWebAppShowSurvey', 'VKWebAppShowSurveyResult', 'VKWebAppShowSurveyFailed'> &
  EventReceiveNames<
  'VKWebAppConversionHit',
  'VKWebAppConversionHitResult',
  'VKWebAppConversionHitFailed'
  > &
  EventReceiveNames<'VKWebAppScrollTop', 'VKWebAppScrollTopResult', 'VKWebAppScrollTopFailed'> &
  EventReceiveNames<
  'VKWebAppScrollTopStart',
  'VKWebAppScrollTopStartResult',
  'VKWebAppScrollTopStop'
  > &
  EventReceiveNames<
  'VKWebAppScrollTopStop',
  'VKWebAppScrollTopStopResult',
  'VKWebAppScrollTopStopFailed'
  > &
  EventReceiveNames<
  'VKWebAppShowSlidesSheet',
  'VKWebAppShowSlidesSheetResult',
  'VKWebAppShowSlidesSheetFailed'
  > &
  EventReceiveNames<'VKWebAppTranslate', 'VKWebAppTranslateResult', 'VKWebAppTranslateFailed'> &
  EventReceiveNames<'VKWebAppCallStart', 'VKWebAppCallStartResult', 'VKWebAppCallStartFailed'> &
  EventReceiveNames<'VKWebAppCallJoin', 'VKWebAppCallJoinResult', 'VKWebAppCallJoinFailed'> &
  EventReceiveNames<
  'VKWebAppCallGetStatus',
  'VKWebAppCallGetStatusResult',
  'VKWebAppCallGetStatusFailed'
  > &
  EventReceiveNames<'VKWebAppRecommend', 'VKWebAppRecommendResult', 'VKWebAppRecommendFailed'>
)>;

type CombineReceiveEventMap<Union> = (
  Union extends unknown
    ? (distributedUnion: Union) => void
    : never
) extends ((mergedIntersection: infer Intersection) => void)
  ? FlatMap<Intersection & Union>
  : never;

type ReceiveEventMapType = Exclude<keyof ReceiveDataMap, keyof ReceiveEventMap>;
type ReceiveDataMapType = Exclude<keyof ReceiveEventMap, ReceiveEventMapType>;

type ReceiveEventMapDetail = {
  [T in ReceiveEventMapType]: {
    detail: {
      type: T;
      data: FlatMap<ReceiveDataMap[T]>;
    };
  }
};

type ReceiveDataMapDetail = {
  [T in ReceiveDataMapType]: {
    [TT in ReceiveEventMap[T]['result']]: {
      detail: {
        type: TT;
        data: FlatMap<ReceiveDataMap[T] & {
          request_id?: string | undefined;
        }>;
      };
    }
  } & {
    [TT in ReceiveEventMap[T]['failed']]: {
      detail: {
        type: TT;
        data: ErrorData;
      };
    }
  }
}[ReceiveDataMapType];

type ReceiveEventDataMap = CombineReceiveEventMap<ReceiveEventMapDetail | ReceiveDataMapDetail>;

export type VKBridgeEvent = ReceiveEventDataMap[keyof ReceiveEventDataMap];

export type VKBridgeUnknownEvent = {
  detail: {
    type: VKBridgeUnknownMethod;
    data: Record<string, unknown>;
  };
};

export type VKBridgeSubscribeHandler = (event: VKBridgeEvent) => void;
