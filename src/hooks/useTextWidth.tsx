import { useState, useEffect, useRef, useCallback } from "react";

export const useTextWidth = (
  text: string,
  font: string = "16px Geologica"
): number => {
  const [textWidth, setTextWidth] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));

  const measureTextWidth = useCallback(
    (text: string): number => {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.font = font;
        return context.measureText(text).width;
      }
      return 0;
    },
    [font]
  );

  useEffect(() => {
    setTextWidth(measureTextWidth(text));
  }, [text, measureTextWidth]);

  return textWidth;
};
