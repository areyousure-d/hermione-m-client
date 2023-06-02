export type SpritesMap = {
  common:
    | "check"
    | "edit"
    | "exclamation-circle"
    | "info-circle"
    | "logout"
    | "moon"
    | "settings"
    | "sun-high"
    | "trash"
    | "user-circle"
    | "user"
    | "x";
};

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  common: [
    "check",
    "edit",
    "exclamation-circle",
    "info-circle",
    "logout",
    "moon",
    "settings",
    "sun-high",
    "trash",
    "user-circle",
    "user",
    "x",
  ],
};
