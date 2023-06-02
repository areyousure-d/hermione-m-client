export type SpritesMap = {
  common:
    | "check"
    | "edit"
    | "exclamation-circle"
    | "info-circle"
    | "moon"
    | "settings"
    | "sun-high"
    | "trash"
    | "x";
};

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  common: [
    "check",
    "edit",
    "exclamation-circle",
    "info-circle",
    "moon",
    "settings",
    "sun-high",
    "trash",
    "x",
  ],
};
