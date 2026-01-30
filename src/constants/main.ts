export const BASE_URL = "https://shareandearn.tech";
export const WEB_BASE_URL = "https://magomed-coder-webshop-9491.twc1.net";

export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/register/",
    VERIFY_EMAIL: "/api/verify-email/",
    RESEND_CODE: "/api/resend-code/",
    LOGIN: "/api/login/",
    REFRESH: "/api/refresh/",

    // нет
    LOGOUT: "/api/logout/",
    ME: "/api/me/",
    CHANGE_EMAIL: "/api/change-email/", // смена email
    CHANGE_PASSWORD: "/api/change-password/", // смена пароля
  },

  CATALOG: {
    CATEGORIES: "/api/categories/",
    CATEGORY_DETAIL: (id: number) => `/api/categories/${id}/`,

    PRODUCTS: "/api/products/",
    PRODUCT_DETAIL: (id: number) => `/api/products/${id}/`,
  },

  REFERRALS: {
    SHARE_LINKS: "/api/ref/share-links/",
    SHARE_LINK_ORDERS: (id: number) => `/api/ref/share-links/${id}/orders/`,
    ORDERS: "/api/ref/orders/",
    PUBLIC_REDIRECT: (code: string) => `/api/ref/r/${code}/`,
  },

  ORDERS: {
    CREATE: "/api/orders/",
  },

  // нет
  APP_VERSION: "/api/app-version/",
} as const;

export const STORAGE_KEYS = {
  AUTH: {
    ACCESS: "access_token",
    REFRESH: "refresh_token",
  },
  REFERRAL_CODE: "referral_code",
} as const;

// /** список доступных локаций */
// export const LOCATIONS: OptionItem[] = [
export const LOCATIONS: any[] = [
  { key: "chechnya", label: "Чеченская Республика" },
  { key: "dagestan", label: "Республика Дагестан" },
  { key: "ingushetia", label: "Республика Ингушетия" },
];

export const SUPPORT_EMAIL = "shareearn@mail.ru";

// export const APP_STORE_URL = "https://apps.apple.com/app/idXXXXXXXXX";
export const APP_STORE_URL =
  "https://apps.apple.com/ru/app/share-earn/id6757867380";

export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=your.app.id";
