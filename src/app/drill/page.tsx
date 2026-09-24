"use client";

import { useMemo, useState } from "react";
import { drills, patternById } from "@/lib/patterns";

export default function DrillPage() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const order = useMemo(() => drills.map((_, i) => i), []);
  const drill = drills[order[index] ?? 0];
  const pattern = patternById.get(drill.patternId);

  function next(correct: boolean) {
    if (correct) setHits((value) => value + 1);
    else setMisses((value) => value + 1);
    setShow(false);
    setIndex((value) => (value + 1) % drills.length);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Level 3 · {hits} named · {misses} missed
        </p>
        <h1 className="font-heading text-4xl leading-tight">Name the pattern before you think about code.</h1>
        <p className="leading-relaxed">
          Say the name, then reveal. A miss means that pattern goes on tonight&apos;s rewrite list.
          Do ten of these in week 15, and again whenever a random LeetCode tab makes you freeze.
        </p>
      </header>
      <article className="rounded-2xl bg-card p-6 ring-1 ring-foreground/10">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Prompt {index + 1} of {drills.length}</p>
        <p className="mt-3 font-heading text-3xl leading-snug">{drill.prompt}</p>
        {show && pattern && (
          <div className="mt-5 space-y-2 border-t border-border pt-4">
            <p className="text-lg font-medium">{pattern.name}</p>
            <p className="text-sm leading-relaxed">{drill.why}</p>
            <p className="text-sm text-muted-foreground">{pattern.intuition}</p>
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          {!show ? (
            <button
              type="button"
              onClick={() => setShow(true)}
              className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
            >
              I have a name
            </button>
          ) : (
            <>
              <button type="button" onClick={() => next(true)} className="rounded-full bg-emerald-800 px-4 py-2 text-sm text-white">
                I had it
              </button>
              <button type="button" onClick={() => next(false)} className="rounded-full bg-red-800 px-4 py-2 text-sm text-white">
                I missed it
              </button>
            </>
          )}
        </div>
      </article>
    </div>
  );
}
