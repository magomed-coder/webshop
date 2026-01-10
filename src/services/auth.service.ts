import { ENDPOINTS } from "@/constants/main";
import { api } from "@/lib/api";

export const AuthService = {
  // AUTH
  register: async (payload: {
    username: string;
    email: string;
    password: string;
  }) => await api.post(ENDPOINTS.AUTH.REGISTER, payload),

  login: (payload: { username: string; password: string }) =>
    api.post(ENDPOINTS.AUTH.LOGIN, payload),

  refresh: (refresh: string) => api.post(ENDPOINTS.AUTH.REFRESH, { refresh }),

  logout: () => api.post(ENDPOINTS.AUTH.LOGOUT),

  // EMAIL / OTP
  verifyEmail: (payload: { email: string; code: string }) =>
    api.post(ENDPOINTS.AUTH.VERIFY_EMAIL, payload),

  resendCode: (email: string) =>
    api.post(ENDPOINTS.AUTH.RESEND_CODE, { email }),

  // USER
  me: () => api.get(ENDPOINTS.AUTH.ME),

  changeEmail: (email: string) =>
    api.post(ENDPOINTS.AUTH.CHANGE_EMAIL, { email }),

  changePassword: (payload: { old_password: string; new_password: string }) =>
    api.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, payload),
};
