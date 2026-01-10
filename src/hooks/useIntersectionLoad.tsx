import { useEffect, useCallback, type MutableRefObject, useRef } from "react";

interface UseIntersectionLoadProps {
  targetRef: MutableRefObject<HTMLDivElement | null>;
  parentRef?: MutableRefObject<HTMLDivElement | null>;
  loadMore: () => void;
  isLoading: boolean;
}

export const useIntersectionLoad = ({
  targetRef,
  parentRef,
  loadMore,
  isLoading,
}: UseIntersectionLoadProps): void => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && !isLoading) {
        loadMore();
      }
    },

    [isLoading, loadMore]
  );

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: parentRef?.current || null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(observerCallback, options);

    if (observerRef.current && targetRef.current) {
      const currentObserver = observerRef.current;
      currentObserver.observe(targetRef.current);

      return () => {
        if (currentObserver) {
          currentObserver.disconnect();
        }
      };
    }
  }, [observerCallback, parentRef, targetRef]);
};
