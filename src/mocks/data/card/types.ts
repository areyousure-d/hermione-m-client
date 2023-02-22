export type Card = {
  id: number;
  front: string;
  back: string;
  deck_id: number;
  created_at: number;
  answered_at: number;
  ease_factor: number;
  interval: number;
  phase: "learn" | "review";
  steps: number;
};

export const Rating = {
  again: 1,
  hard: 2,
  good: 3,
  easy: 4,
} as const;
