import { useEffect, useRef } from "react";

export const useOutsideClick = (
  callback: () => void,
  options: {
    useCapture?: boolean;
  } = {}
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { useCapture = false } = options;

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const isDownloadLink = target.closest("a[download]");
      if (isDownloadLink) return;

      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, useCapture);

    return () => {
      document.removeEventListener("click", handleClick, useCapture);
    };
  }, [ref, useCapture, callback]);

  return ref;
};
