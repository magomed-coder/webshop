export const BASE_URL = "https://fav-13.ru";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/token/",
    REGISTER: "/api/register/",
    LOGOUT: "/api/logout/",
    REFRESH: "/api/token/refresh/",
    ME: "/api/me/",
    CHANGE_EMAIL: "/api/change-email/", // смена email
    CHANGE_PASSWORD: "/api/change-password/", // смена пароля
  },
  USERS: {
    LIST: "/users/",
    DETAIL: (id: number) => `/users/${id}/`,
  },
} as const;

// export async function getUserDetail(id: number) {
//   const resp = await api.get(API_ENDPOINTS.USERS.DETAIL(id));
//   return resp.data;  // объект конкретного пользователя
// }

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
