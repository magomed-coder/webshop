import { useEffect, useState } from "react";

export const useIsPWA = () => {
  const [isPWA, setIsPWA] = useState(
    window.matchMedia("(display-mode: standalone)").matches
  );

  useEffect(() => {
    const updateIsPWA = () => {
      setIsPWA(window.matchMedia("(display-mode: standalone)").matches);
    };

    window.addEventListener("beforeinstallprompt", updateIsPWA);

    return () => {
      window.removeEventListener("beforeinstallprompt", updateIsPWA);
    };
  }, []);

  return isPWA;
};
