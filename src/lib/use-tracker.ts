"use client";

import { useEffect, useState } from "react";
import { todayISO } from "./dates";
import { markAttempt, type Attempt, type Mark, type Store } from "./tracker";

const KEY = "switch-desk-v1";

function emptyStore(): Store {
  return { start: todayISO(), items: {} };
}

export function useTracker() {
  const today = todayISO();
  const [store, setStore] = useState<Store>(() => emptyStore());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Store;
        if (parsed.start && parsed.items) setStore(parsed);
      } catch {
        // Keep the empty desk if the saved blob is unreadable.
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(store));
  }, [store, hydrated]);

  function setStart(start: string) {
    setStore((current) => (current ? { ...current, start } : current));
  }

  function mark(id: string, mark: Mark) {
    setStore((current) => {
      if (!current) return current;
      const previous = current.items[id];
      return {
        ...current,
        items: { ...current.items, [id]: markAttempt(previous, mark, today) },
      };
    });
  }

  function toggleStar(id: string) {
    setStore((current) => {
      if (!current) return current;
      const previous = current.items[id];
      const next: Attempt = previous
        ? { ...previous, star: !previous.star }
        : {
            mark: "blue",
            reviews: 0,
            last: today,
            next: today,
            star: true,
          };
      return { ...current, items: { ...current.items, [id]: next } };
    });
  }

  return { store, today, setStart, mark, toggleStar };
}
