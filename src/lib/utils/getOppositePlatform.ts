export const getOppositePlatform = (platform: "ios" | "android") => {
  return platform === "ios" ? "android" : "ios";
};
