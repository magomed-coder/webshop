import { useEffect } from "react";

/**
 * Хук динамически добавляет/удаляет параметр interactive-widget=resizes-content
 * в мета-тег viewport при монтировании и размонтировании компонента.
 *
 * Это может быть полезно при необходимости учитывать поведение клавиатуры
 * на мобильных устройствах (например, корректное изменение высоты окна).
 */
export function useKeyboardViewport() {
  useEffect(() => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) return;

    const baseContent =
      metaViewport.getAttribute("content") ??
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";

    const updateViewport = (add: boolean) => {
      const newContent = add
        ? `${baseContent}, interactive-widget=resizes-content`
        : baseContent.replace(", interactive-widget=resizes-content", "");

      if (metaViewport.getAttribute("content") !== newContent) {
        metaViewport.setAttribute("content", newContent);
      }
    };

    updateViewport(true);

    return () => {
      updateViewport(false);
    };
  }, []);
}
