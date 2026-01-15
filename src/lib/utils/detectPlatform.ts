type Platform = "ios" | "android" | "other";

export const detectPlatform = (): Platform => {
  if (typeof window === "undefined") return "other";

  console.log(navigator.userAgent);

  const ua = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) {
    return "ios";
  }

  if (/android/.test(ua)) {
    return "android";
  }

  return "other";
};
