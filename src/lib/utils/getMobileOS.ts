export const getMobileOS = (): "ios" | "android" => {
  if (typeof navigator === "undefined") return "android";

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

  if (/android/i.test(ua)) return "android";
  // if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) return "ios";
  if (/iPad|iPhone|iPod/.test(ua) && !("MSStream" in window)) return "ios";

  return "android";
};
