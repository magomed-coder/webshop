import { useState, useEffect } from "react";

type Callback = () => void;

interface LongPressHandlers {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
}

export function useLongPress(
  callback: Callback = () => {},
  ms: number = 300
): LongPressHandlers {
  const [startLongPress, setStartLongPress] = useState<boolean>(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      if (timerId) clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}
