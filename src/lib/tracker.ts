import { addDays } from "./dates";

export type Mark = "green" | "yellow" | "red" | "blue";

export type Attempt = {
  mark: Mark;
  reviews: number;
  last: string;
  next: string;
  star: boolean;
};

export type Store = {
  start: string;
  items: Record<string, Attempt>;
};

const INTERVALS = [1, 3, 7, 15, 30];

export function nextInterval(reviewsAfterMark: number) {
  return INTERVALS[Math.min(reviewsAfterMark - 1, INTERVALS.length - 1)];
}

export function markAttempt(
  previous: Attempt | undefined,
  mark: Mark,
  today: string,
): Attempt {
  const reviews = (previous?.reviews ?? 0) + 1;
  return {
    mark,
    reviews,
    last: today,
    next: addDays(today, nextInterval(reviews)),
    star: previous?.star ?? false,
  };
}

export function dueIds(store: Store, today: string) {
  return Object.entries(store.items)
    .filter(([, item]) => item.next <= today)
    .map(([id]) => id);
}
