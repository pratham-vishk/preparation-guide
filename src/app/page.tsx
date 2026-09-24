"use client";

import Link from "next/link";
import { useMemo } from "react";
import { MarkButtons, markHint } from "@/components/mark-buttons";
import { formatDay, weekdayKey, weekNumber } from "@/lib/dates";
import { weekdayLabel, weeks } from "@/lib/plan";
import { problemById } from "@/lib/patterns";
import { dueIds } from "@/lib/tracker";
import { useTracker } from "@/lib/use-tracker";

export default function TodayPage() {
  const { store, today, setStart, mark } = useTracker();

  const view = useMemo(() => {
    if (!store) return null;
    const week = weeks[weekNumber(store.start, today) - 1];
    const day = week.days[weekdayKey(today)];
    const due = dueIds(store, today)
      .map((id) => problemById.get(id))
      .filter((problem) => problem !== undefined);
    const solved = Object.values(store.items).filter((item) => item.reviews > 0);
    return { week, day, due, solved: solved.length };
  }, [store, today]);

  if (!store || !view) {
    return <p className="text-sm text-muted-foreground">Opening the desk…</p>;
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Week {view.week.n} of 16 · {formatDay(today)}
          </p>
          <h1 className="font-heading text-4xl leading-tight sm:text-5xl">
            {view.week.title}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed">{view.week.goal}</p>
          <p className="text-sm text-muted-foreground">{view.week.cap}</p>
        </div>
        <div className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
          <p className="text-sm font-medium">Start date</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The week number follows this date. Move it if you are starting late. It does not erase marks.
          </p>
          <label className="mt-3 block text-xs text-muted-foreground" htmlFor="start-date">
            Plan start
          </label>
          <input
            id="start-date"
            type="date"
            value={store.start}
            onChange={(event) => setStart(event.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <p className="mt-3 text-sm">
            {view.solved} problems marked · {view.due.length} due today
          </p>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {view.day.blocks.map((block) => (
          <article key={block.label} className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {weekdayLabel[weekdayKey(today)]} · {view.day.minutes}
            </p>
            <h2 className="mt-2 font-heading text-2xl">{block.label}</h2>
            <p className="mt-2 text-sm leading-relaxed">{block.text}</p>
          </article>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-heading text-3xl">Due for retrieval</h2>
          <Link href="/patterns" className="text-sm text-primary">
            All patterns
          </Link>
        </div>
        {view.due.length === 0 ? (
          <p className="rounded-2xl bg-secondary px-4 py-3 text-sm leading-relaxed">
            Nothing is due. Forgetting starts when a problem is solved once and never rewritten.
            Mark today&apos;s problem on the Patterns page before you close the laptop. The next
            review lands on day 1, then 3, 7, 15, and 30.
          </p>
        ) : (
          <ul className="space-y-2">
            {view.due.map((problem) => {
              const attempt = store.items[problem.id];
              return (
                <li
                  key={problem.id}
                  className="flex flex-col gap-3 rounded-2xl bg-card p-4 ring-1 ring-foreground/10 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{problem.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {problem.pattern.name} · {markHint[attempt.mark]} · review {attempt.reviews} · was due {formatDay(attempt.next)}
                    </p>
                  </div>
                  <MarkButtons value={attempt.mark} onChange={(value) => mark(problem.id, value)} />
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-dashed border-foreground/20 p-4">
          <h2 className="font-heading text-2xl">What 16 weeks can do</h2>
          <p className="mt-2 text-sm leading-relaxed">
            You can become interview-ready for a Java SDE II / SWE III loop: pattern recognition,
            blank rewrites, one production-shaped Spring service, one small agent on top of it,
            and applications actually sent. You cannot also finish 342 checklist rows, six
            certificates, Python as a second career, and a BITS semester in the same evenings.
          </p>
        </article>
        <article className="rounded-2xl border border-dashed border-foreground/20 p-4">
          <h2 className="font-heading text-2xl">The rule that fixes forgetting</h2>
          <p className="mt-2 text-sm leading-relaxed">
            A problem is not done when the editor accepts it. It is done when you can rewrite it
            three days later from an empty file. Green means you did that alone. Red means you
            read a solution, so it comes back sooner in the queue, not never.
          </p>
        </article>
      </section>
    </div>
  );
}
