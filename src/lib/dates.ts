export function todayISO(now = new Date()) {
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number) {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return todayISO(date);
}

export function weekdayKey(iso: string) {
  const day = new Date(`${iso}T00:00:00`).getDay();
  return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][day] as Weekday;
}

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export function weekNumber(start: string, today: string) {
  const from = new Date(`${start}T00:00:00`).getTime();
  const to = new Date(`${today}T00:00:00`).getTime();
  const diff = Math.floor((to - from) / 86_400_000);
  if (diff < 0) return 1;
  return Math.min(16, Math.floor(diff / 7) + 1);
}

export function formatDay(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}
