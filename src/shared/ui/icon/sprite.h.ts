export type SpritesMap = {
  common:
    | "arrow-left"
    | "check"
    | "edit"
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
    "arrow-left",
    "check",
    "edit",
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
