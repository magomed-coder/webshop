// hooks/useReferral.ts
import { STORAGE_KEYS } from "constants/main";
import { useLocation } from "react-router-dom";

export const useReferral = () => {
  const location = useLocation();

  const getCode = (): string | undefined => {
    const fromState = (location.state as { referralCode?: string } | null)
      ?.referralCode;
    if (fromState) {
      localStorage.setItem(STORAGE_KEYS.REFERRAL_CODE, fromState);
      return fromState;
    }
    return localStorage.getItem(STORAGE_KEYS.REFERRAL_CODE) || undefined;
  };

  const code = getCode();

  const clear = () => {
    localStorage.removeItem(STORAGE_KEYS.REFERRAL_CODE);
  };

  return { code, clear };
};
