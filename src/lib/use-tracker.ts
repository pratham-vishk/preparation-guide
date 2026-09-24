"use client";

import { useEffect, useState } from "react";
import { todayISO } from "./dates";
import { markAttempt, type Attempt, type Mark, type Store } from "./tracker";

const KEY = "switch-desk-v1";

const stableStore: Store = { start: "2026-01-01", items: {} };

export function useTracker() {
  const [today, setToday] = useState("");
  const [ready, setReady] = useState(false);
  const [store, setStore] = useState<Store>(stableStore);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const now = todayISO();
    setToday(now);
    let next: Store = { start: now, items: {} };
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Store;
        if (parsed.start && parsed.items) next = parsed;
      } catch {
        // Keep a fresh desk if the saved blob is unreadable.
      }
    }
    setStore(next);
    setHydrated(true);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(store));
  }, [store, hydrated]);

  function setStart(start: string) {
    setStore((current) => (current ? { ...current, start } : current));
  }

  function mark(id: string, mark: Mark) {
    const now = todayISO();
    setToday(now);
    setStore((current) => {
      const previous = current.items[id];
      return {
        ...current,
        items: { ...current.items, [id]: markAttempt(previous, mark, now) },
      };
    });
  }

  function toggleStar(id: string) {
    setStore((current) => {
      if (!current) return current;
      const now = todayISO();
      const previous = current.items[id];
      const next: Attempt = previous
        ? { ...previous, star: !previous.star }
        : {
            mark: "blue",
            reviews: 0,
            last: now,
            next: now,
            star: true,
          };
      return { ...current, items: { ...current.items, [id]: next } };
    });
  }

  return { store, today, ready, setStart, mark, toggleStar };
}
