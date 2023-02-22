import {
  DEFAULT_EASE_FACTOR,
  ONE_DAY_IN_MS,
  ONE_MINUTE_IN_MS,
} from "@/mocks/lib/constants";

import { scheduleCard } from "./schedule-card";

const newCard = {
  id: 1,
  front: "question",
  back: "answer",
  deck_id: 1,
  created_at: 1677063948012,
  ease_factor: DEFAULT_EASE_FACTOR,
  interval: ONE_MINUTE_IN_MS,
  answered_at: 0,
  phase: "learn" as const,
  steps: 0,
};

const learnPhaseCard = {
  id: 1,
  front: "question",
  back: "answer",
  deck_id: 1,
  created_at: 1677063948012,
  ease_factor: 2.5,
  interval: 60000,
  answered_at: 0,
  phase: "learn" as const,
  steps: 1,
};

const learnPhaseStepsLimitCard = {
  id: 1,
  front: "question",
  back: "answer",
  deck_id: 1,
  created_at: 1677063948012,
  ease_factor: 2.5,
  interval: 60000,
  answered_at: 0,
  phase: "learn" as const,
  steps: 3,
};

const reviewPhaseCard = {
  id: 1,
  front: "question",
  back: "answer",
  deck_id: 1,
  created_at: 1677063948012,
  ease_factor: 2.5,
  interval: ONE_DAY_IN_MS,
  answered_at: 0,
  phase: "review" as const,
  steps: 3,
};

describe("scheduleCard", () => {
  test("for new card, phase learn, rating again", () => {
    const scheduledCard = scheduleCard({ card: newCard, rating: "again" });
    expect(scheduledCard.ease_factor).toBe(DEFAULT_EASE_FACTOR);
    expect(scheduledCard.interval).toBe(scheduledCard.interval);
    expect(scheduledCard.phase).toBe("learn");
  });

  test("new card, phase learn, rating hard", () => {
    const scheduledCard = scheduleCard({ card: newCard, rating: "hard" });
    expect(scheduledCard.ease_factor).toBe(DEFAULT_EASE_FACTOR);
    expect(scheduledCard.interval).toBe(scheduledCard.interval);
    expect(scheduledCard.phase).toBe("learn");
  });

  test("new card, phase learn, rating good", () => {
    const scheduledCard = scheduleCard({ card: newCard, rating: "good" });
    expect(scheduledCard.ease_factor).toBe(DEFAULT_EASE_FACTOR);
    expect(scheduledCard.interval).toBe(scheduledCard.interval);
    expect(scheduledCard.phase).toBe("learn");
  });

  test("new card, phase learn, rating easy", () => {
    const scheduledCard = scheduleCard({ card: newCard, rating: "easy" });
    expect(scheduledCard.ease_factor).toBe(DEFAULT_EASE_FACTOR);
    expect(scheduledCard.interval).toBe(scheduledCard.interval);
    expect(scheduledCard.phase).toBe("learn");
  });

  test("phase learn, steps < steps limit, rating again", () => {
    const scheduledCard = scheduleCard({
      card: learnPhaseCard,
      rating: "again",
    });
    expect(scheduledCard.ease_factor).toBe(DEFAULT_EASE_FACTOR);
    expect(scheduledCard.interval).toBe(learnPhaseCard.interval);
    expect(scheduledCard.phase).toBe("learn");
    expect(scheduledCard.steps).toBe(0);
  });
  test("phase learn, steps < steps limit, rating hard", () => {
    const scheduledCard = scheduleCard({
      card: learnPhaseCard,
      rating: "hard",
    });
    expect(scheduledCard.ease_factor).toBe(DEFAULT_EASE_FACTOR);
    expect(scheduledCard.interval).toBe(learnPhaseCard.interval);
    expect(scheduledCard.phase).toBe("learn");
    expect(scheduledCard.steps).toBe(0);
  });
  test("phase learn, steps < steps limit, rating good", () => {
    const scheduledCard = scheduleCard({
      card: learnPhaseCard,
      rating: "good",
    });
    expect(scheduledCard.ease_factor).toBe(DEFAULT_EASE_FACTOR);
    expect(scheduledCard.interval).toBe(learnPhaseCard.interval);
    expect(scheduledCard.phase).toBe("learn");
    expect(scheduledCard.steps).toBe(learnPhaseCard.steps + 1);
  });
  test("phase learn, steps < steps limit, rating easy", () => {
    const scheduledCard = scheduleCard({
      card: learnPhaseCard,
      rating: "easy",
    });
    expect(scheduledCard.ease_factor).toBe(DEFAULT_EASE_FACTOR);
    expect(scheduledCard.interval).toBe(learnPhaseCard.interval);
    expect(scheduledCard.phase).toBe("learn");
    expect(scheduledCard.steps).toBe(learnPhaseCard.steps + 1);
  });

  test("phase learn, steps >= steps limit, rating again", () => {
    const scheduledCard = scheduleCard({
      card: learnPhaseStepsLimitCard,
      rating: "again",
    });
    expect(scheduledCard.ease_factor).toBe(DEFAULT_EASE_FACTOR);
    expect(scheduledCard.interval).toBe(learnPhaseStepsLimitCard.interval);
    expect(scheduledCard.phase).toBe("learn");
    expect(scheduledCard.steps).toBe(0);
  });
  test("phase learn, steps >= steps limit, rating hard", () => {
    const scheduledCard = scheduleCard({
      card: learnPhaseStepsLimitCard,
      rating: "hard",
    });
    expect(scheduledCard.ease_factor).toBe(DEFAULT_EASE_FACTOR);
    expect(scheduledCard.interval).toBe(learnPhaseStepsLimitCard.interval);
    expect(scheduledCard.phase).toBe("learn");
    expect(scheduledCard.steps).toBe(0);
  });
  test("phase learn, steps >= steps limit, rating good", () => {
    const scheduledCard = scheduleCard({
      card: learnPhaseStepsLimitCard,
      rating: "good",
    });
    expect(scheduledCard.ease_factor).toBe(DEFAULT_EASE_FACTOR);
    expect(scheduledCard.interval).toBe(ONE_DAY_IN_MS);
    expect(scheduledCard.phase).toBe("review");
    expect(scheduledCard.steps).toBe(0);
  });
  test("phase learn, steps >= steps limit, rating easy", () => {
    const scheduledCard = scheduleCard({
      card: learnPhaseStepsLimitCard,
      rating: "easy",
    });
    expect(scheduledCard.ease_factor).toBe(DEFAULT_EASE_FACTOR);
    expect(scheduledCard.interval).toBe(ONE_DAY_IN_MS);
    expect(scheduledCard.phase).toBe("review");
    expect(scheduledCard.steps).toBe(0);
  });

  test("phase review, rating again", () => {
    const scheduledCard = scheduleCard({
      card: reviewPhaseCard,
      rating: "again",
    });
    expect(scheduledCard.ease_factor).toBe(reviewPhaseCard.ease_factor - 0.2);
    expect(scheduledCard.phase).toBe("learn");
    expect(scheduledCard.interval).toBe(reviewPhaseCard.interval);
    expect(scheduledCard.steps).toBe(0);
  });
  test("phase review, rating hard", () => {
    const scheduledCard = scheduleCard({
      card: reviewPhaseCard,
      rating: "hard",
    });
    expect(scheduledCard.ease_factor).toBe(reviewPhaseCard.ease_factor - 0.15);
    expect(scheduledCard.phase).toBe("review");
    expect(scheduledCard.interval).toBe(reviewPhaseCard.interval * 1.2);
    expect(scheduledCard.steps).toBe(0);
  });
  test("phase review, rating good", () => {
    const scheduledCard = scheduleCard({
      card: reviewPhaseCard,
      rating: "good",
    });
    expect(scheduledCard.ease_factor).toBe(reviewPhaseCard.ease_factor);
    expect(scheduledCard.phase).toBe("review");
    expect(scheduledCard.interval).toBe(
      reviewPhaseCard.interval * reviewPhaseCard.ease_factor
    );
    expect(scheduledCard.steps).toBe(0);
  });
  test("phase review, rating easy", () => {
    const scheduledCard = scheduleCard({
      card: reviewPhaseCard,
      rating: "easy",
    });
    expect(scheduledCard.ease_factor).toBe(reviewPhaseCard.ease_factor + 0.15);
    expect(scheduledCard.phase).toBe("review");
    expect(scheduledCard.interval).toBe(
      reviewPhaseCard.interval * reviewPhaseCard.ease_factor * 1.3
    );
    expect(scheduledCard.steps).toBe(0);
  });
});
