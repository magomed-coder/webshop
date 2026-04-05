// services/version.service.ts
import { ENDPOINTS } from "@/constants/main";
import type { AppVersionInfo } from "@/contexts/version.store";
import { api } from "@/lib/api";

/**
 * Проверяет актуальную версию приложения для указанной платформы
 * @param platform — "android" | "ios"
 * @returns AppVersionInfo
 */
const checkVersion = async (
  platform: "android" | "ios",
): Promise<AppVersionInfo> => {
  try {
    const response = await api.get<AppVersionInfo>(ENDPOINTS.APP_VERSION, {
      params: { platform },
    });

    return response.data;
  } catch (error: any) {
    console.warn(
      `[versionService] Failed to check ${platform} version:`,
      error,
    );
    throw error.response?.data || { message: "Ошибка проверки версии" };
  }
};

export const versionService = {
  checkVersion,
};
