"use client";

import { useMemo, useState } from "react";
import { MarkButtons } from "@/components/mark-buttons";
import { formatDay } from "@/lib/dates";
import { patterns } from "@/lib/patterns";
import { useTracker } from "@/lib/use-tracker";

export default function PatternsPage() {
  const { store, mark, toggleStar } = useTracker();
  const [phase, setPhase] = useState("All");
  const phases = useMemo(
    () => ["All", ...Array.from(new Set(patterns.map((pattern) => pattern.phase)))],
    [],
  );
  const visible = patterns.filter((pattern) => phase === "All" || pattern.phase === phase);

  return (
    <div className="space-y-6">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {patterns.length} patterns · {patterns.reduce((sum, pattern) => sum + pattern.problems.length, 0)} must-do problems
        </p>
        <h1 className="font-heading text-4xl leading-tight sm:text-5xl">
          Learn the shape. Solve two or three. Retrieve them on a schedule.
        </h1>
        <p className="text-lg leading-relaxed">
          These stand in for the long TUF+ checklist. The checklist repeats the same shapes.
          Mark a problem by how it felt, not by whether the sample passed. Star the ones you
          would want in an interview. Reviews are stored in this browser only.
        </p>
      </header>
      <div className="flex gap-2 overflow-x-auto">
        {phases.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPhase(item)}
            className={
              item === phase
                ? "shrink-0 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground"
                : "shrink-0 rounded-full bg-secondary px-3 py-1 text-sm"
            }
          >
            {item}
          </button>
        ))}
      </div>
      <div className="space-y-5">
        {visible.map((pattern) => (
          <article id={pattern.id} key={pattern.id} className="scroll-mt-28 rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-heading text-3xl">{pattern.name}</h2>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{pattern.phase}</p>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed">{pattern.intuition}</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div>
                <h3 className="text-xs uppercase tracking-wide text-muted-foreground">You are in this pattern when</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                  {pattern.recognize.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <h3 className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">Mistakes that waste the rep</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                  {pattern.mistakes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <pre className="overflow-x-auto rounded-xl bg-foreground px-4 py-3 text-xs leading-relaxed text-background">
                <code>{pattern.template}</code>
              </pre>
            </div>
            <ul className="mt-4 space-y-3">
              {pattern.problems.map((problem) => {
                const attempt = store?.items[problem.id];
                return (
                  <li key={problem.id} className="rounded-xl bg-background px-3 py-3">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="font-medium">
                          {problem.name}{" "}
                          <span className="text-xs font-normal uppercase tracking-wide text-muted-foreground">
                            {problem.difficulty}
                          </span>
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{problem.note}</p>
                        {attempt && attempt.reviews > 0 && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Review {attempt.reviews} · next {formatDay(attempt.next)}
                            {attempt.star ? " · starred" : ""}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <MarkButtons
                          value={attempt?.reviews ? attempt.mark : undefined}
                          onChange={(value) => mark(problem.id, value)}
                        />
                        <button
                          type="button"
                          onClick={() => toggleStar(problem.id)}
                          className="text-xs text-muted-foreground"
                        >
                          {attempt?.star ? "Unstar" : "Star for interviews"}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
