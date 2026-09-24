"use client";

import { useEffect, useState } from "react";

export function BeatPlayer({ beats }: { beats: string[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % beats.length);
    }, 1400);
    return () => window.clearInterval(timer);
  }, [playing, beats.length]);

  return (
    <div className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Play the flow</p>
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="rounded-full bg-secondary px-3 py-1 text-xs"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <ol className="mt-3 space-y-2">
        {beats.map((beat, beatIndex) => (
          <li
            key={beat}
            className={
              beatIndex === index
                ? "rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground transition-colors"
                : "rounded-xl px-3 py-2 text-sm text-muted-foreground"
            }
          >
            <span className="mr-2 font-mono text-xs">{String(beatIndex + 1).padStart(2, "0")}</span>
            {beat}
          </li>
        ))}
      </ol>
    </div>
  );
}
