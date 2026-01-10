import { ENDPOINTS } from "@/constants/main";
import api from "@/lib/api";
import {
  clearAuthTokens,
  getAccessToken,
  saveAuthTokens,
} from "@/services/tokenStorage";
import { create } from "zustand";

export const UserRole = {
  USER: "user",
  PARTNER: "partner",
  MANAGER: "manager",
  ADMIN: "admin",
} as const;

export type UserRole = keyof typeof UserRole;
export type UserRoleValue = (typeof UserRole)[UserRole];

export interface User {
  id: number;
  username: string;
  email: string;
  phone: string | null;
  role: UserRoleValue;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuth: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  changePassword: (payload: {
    old_password: string;
    new_password: string;
  }) => Promise<void>;
  changeEmail: (email: string) => Promise<void>;
  initialize: () => Promise<void>;
  // refreshAccessToken: () => Promise<string>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  // user: null,
  user: {
    id: 111,
    username: "string",
    email: "string@mail.ru",
    phone: "9000292922",
    role: UserRole.MANAGER,
  },
  isLoading: false,
  isAuth: false,
  isRefreshing: false,
  error: null,

  // Вход
  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post(ENDPOINTS.AUTH.LOGIN, {
        username,
        password,
      });
      const { access, refresh } = res.data;

      await saveAuthTokens(access, refresh);
      set({ accessToken: access, isAuth: true });
      await get().fetchUser();
    } catch (err: any) {
      set({ error: err.response?.data?.detail || "[Login failed]" });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  // Регистрация
  register: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post(ENDPOINTS.AUTH.REGISTER, {
        username,
        email,
        password,
      });
      const { access, refresh } = res.data;
      await saveAuthTokens(access, refresh);
      set({ accessToken: access, isAuth: true });
      await get().fetchUser();
    } catch (err: any) {
      set({ error: err.response?.data?.detail || "[Registration failed]" });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  // Выход
  logout: async () => {
    await clearAuthTokens();
    set({ accessToken: null, user: null, isAuth: false });
  },

  // Подгрузка данных пользователя
  fetchUser: async () => {
    try {
      const res = await api.get(ENDPOINTS.AUTH.ME);
      set({ user: res.data });
    } catch (err: any) {
      console.error("[ERROR fetchUser]", err);
    }
  },

  // Инициализация при старте приложения
  initialize: async () => {
    const token = await getAccessToken();
    if (token) {
      set({ accessToken: token });
      try {
        await get().fetchUser();
        set({ isAuth: true });
      } catch {
        await get().logout();
      }
    }
  },
  changePassword: async (payload: {
    old_password: string;
    new_password: string;
  }) => {
    const { data } = await api.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, payload);
    return data;
  },

  changeEmail: async (email: string) => {
    const { data } = await api.post(ENDPOINTS.AUTH.CHANGE_EMAIL, email);
    return data;
  },

  // Обновление токена
  // refreshAccessToken: async () => {
  //   const refreshToken = await getRefreshToken();
  //   if (!refreshToken) throw new Error("[No refresh token]");

  //   set({ isRefreshing: true });
  //   try {
  //     const res = await api.post(ENDPOINTS.AUTH.REFRESH, { refreshToken });
  //     const { access, refresh } = res.data;
  //     await saveAuthTokens(access, refresh);

  //     set({ accessToken: access, isAuth: true });
  //     return res.data.access;
  //   } catch (err) {
  //     get().logout();
  //     throw err;
  //   } finally {
  //     set({ isRefreshing: false });
  //   }
  // },
}));
