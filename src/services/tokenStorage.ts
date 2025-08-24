// src/utils/authStorage.ts
import { STORAGE_KEYS } from "constants/main";

export const saveRefreshToken = (token: string) =>
  sessionStorage.setItem(STORAGE_KEYS.AUTH.REFRESH, token);

export const getRefreshToken = () =>
  sessionStorage.getItem(STORAGE_KEYS.AUTH.REFRESH);

export const removeRefreshToken = () =>
  sessionStorage.removeItem(STORAGE_KEYS.AUTH.REFRESH);

export const saveAccessToken = (token: string) =>
  sessionStorage.setItem(STORAGE_KEYS.AUTH.ACCESS, token);

export const getAccessToken = () =>
  sessionStorage.getItem(STORAGE_KEYS.AUTH.ACCESS);

export const removeAccessToken = () =>
  sessionStorage.removeItem(STORAGE_KEYS.AUTH.ACCESS);

export const clearAuthTokens = () => {
  sessionStorage.removeItem(STORAGE_KEYS.AUTH.ACCESS);
  sessionStorage.removeItem(STORAGE_KEYS.AUTH.REFRESH);
};

export const saveAuthTokens = (accessToken: string, refreshToken: string) => {
  sessionStorage.setItem(STORAGE_KEYS.AUTH.ACCESS, accessToken);
  sessionStorage.setItem(STORAGE_KEYS.AUTH.REFRESH, refreshToken);
};
