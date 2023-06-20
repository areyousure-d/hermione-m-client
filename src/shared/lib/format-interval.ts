export const MINUTE_IN_MILLISECONDS = 60 * 1000;
export const HOUR_IN_MILLISECONDS = 60 * MINUTE_IN_MILLISECONDS;
export const DAY_IN_MILLISECONDS = 24 * HOUR_IN_MILLISECONDS;
export const MONTH_IN_MILLISECONDS = 30 * DAY_IN_MILLISECONDS;

export const formatDuration = (intervalMilliseconds: number) => {
  let milliseconds = intervalMilliseconds;

  const months = Math.floor(milliseconds / MONTH_IN_MILLISECONDS);
  milliseconds %= MONTH_IN_MILLISECONDS;
  const days = Math.floor(milliseconds / DAY_IN_MILLISECONDS);
  milliseconds %= DAY_IN_MILLISECONDS;
  const hours = Math.floor(milliseconds / HOUR_IN_MILLISECONDS);
  milliseconds %= HOUR_IN_MILLISECONDS;
  const minutes = Math.floor(milliseconds / MINUTE_IN_MILLISECONDS);

  const parts = [];

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "month" : "months"}`);
  }
  if (days > 0) {
    parts.push(`${days} ${days === 1 ? "day" : "days"}`);
  }
  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  }

  if (parts.length === 0) {
    return "0 minutes";
  }
  if (parts.length === 1) {
    return parts[0];
  }
  if (parts.length === 2) {
    return `${parts[0]} and ${parts[1]}`;
  }

  const lastPart = parts.pop();
  return `${parts.join(", ")} and ${lastPart}`;
};
