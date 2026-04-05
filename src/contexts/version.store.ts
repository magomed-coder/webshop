// stores/useAppVersionStore.ts

import { versionService } from "@/services/version.service";
import { create } from "zustand";

export interface AppVersionInfo {
  platform: "android" | "ios";
  latest_version: string;
  min_supported_version: string;
  release_notes: string;
  store_url: string | null;
  update_message: string | null;
  updated_at: string;
}

interface AppVersionState {
  versionInfo: AppVersionInfo | null;
  loading: boolean;
  error: string | null;

  checkForUpdate: (platform: "android" | "ios") => Promise<void>;
}

export const useAppVersionStore = create<AppVersionState>((set) => ({
  versionInfo: null,
  loading: false,
  error: null,
  isForceUpdateRequired: false,

  checkForUpdate: async (platform) => {
    set({ loading: true, error: null });

    try {
      const data = await versionService.checkVersion(platform);

      // Валидация (на всякий случай)
      if (data.platform !== platform) {
        console.warn("[AppVersionStore] Platform mismatch in response");
      }

      set({
        versionInfo: data,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      console.warn("[AppVersionStore] Failed to fetch version info:", err);

      const message = err.message || "Не удалось проверить обновление";
      set({ error: message, loading: false });
    }
  },
}));
