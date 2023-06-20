import {
  DAY_IN_MILLISECONDS,
  formatDuration,
  HOUR_IN_MILLISECONDS,
  MINUTE_IN_MILLISECONDS,
  MONTH_IN_MILLISECONDS,
} from "./format-interval";

describe("formatInterval", () => {
  test("should format minutes", () => {
    expect(formatDuration(0)).toBe("0 minutes");
    expect(formatDuration(MINUTE_IN_MILLISECONDS)).toBe("1 minute");
    expect(formatDuration(MINUTE_IN_MILLISECONDS * 10)).toBe("10 minutes");
    expect(formatDuration(MINUTE_IN_MILLISECONDS * 59)).toBe("59 minutes");
  });

  test("should format hours", () => {
    expect(formatDuration(HOUR_IN_MILLISECONDS)).toBe("1 hour");
    expect(formatDuration(HOUR_IN_MILLISECONDS * 10)).toBe("10 hours");
    expect(formatDuration(HOUR_IN_MILLISECONDS * 23)).toBe("23 hours");
  });

  test("should format days", () => {
    expect(formatDuration(DAY_IN_MILLISECONDS)).toBe("1 day");
    expect(formatDuration(DAY_IN_MILLISECONDS * 10)).toBe("10 days");
    expect(formatDuration(DAY_IN_MILLISECONDS * 29)).toBe("29 days");
  });

  test("should format months", () => {
    expect(formatDuration(MONTH_IN_MILLISECONDS)).toBe("1 month");
    expect(formatDuration(MONTH_IN_MILLISECONDS * 10)).toBe("10 months");
    expect(formatDuration(MONTH_IN_MILLISECONDS * 29)).toBe("29 months");
  });

  test("should format combined durations", () => {
    expect(
      formatDuration(
        MONTH_IN_MILLISECONDS * 5 +
          DAY_IN_MILLISECONDS * 4 +
          HOUR_IN_MILLISECONDS * 3 +
          MINUTE_IN_MILLISECONDS * 2
      )
    ).toBe("5 months, 4 days, 3 hours and 2 minutes");
    expect(
      formatDuration(
        MONTH_IN_MILLISECONDS * 5 +
          DAY_IN_MILLISECONDS * 0 +
          HOUR_IN_MILLISECONDS * 3 +
          MINUTE_IN_MILLISECONDS * 2
      )
    ).toBe("5 months, 3 hours and 2 minutes");
    expect(
      formatDuration(
        MONTH_IN_MILLISECONDS * 5 +
          DAY_IN_MILLISECONDS * 0 +
          HOUR_IN_MILLISECONDS * 3 +
          MINUTE_IN_MILLISECONDS * 0
      )
    ).toBe("5 months and 3 hours");
    expect(
      formatDuration(
        MONTH_IN_MILLISECONDS * 0 +
          DAY_IN_MILLISECONDS * 0 +
          HOUR_IN_MILLISECONDS * 3 +
          Number(MINUTE_IN_MILLISECONDS)
      )
    ).toBe("3 hours and 1 minute");
  });
});
