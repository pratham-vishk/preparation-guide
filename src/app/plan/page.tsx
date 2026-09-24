import { weekdayLabel, weeks } from "@/lib/plan";
import { patternById } from "@/lib/patterns";
import type { Weekday } from "@/lib/dates";

const order: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export default function PlanPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">About 19–20 hours a week</p>
        <h1 className="font-heading text-4xl leading-tight sm:text-5xl">
          Pattern weeks inside the September-to-January calendar.
        </h1>
        <p className="text-lg leading-relaxed">
          Weekdays are 2.5 hours: 75 minutes of DSA, 45 minutes of backend or design, 30 minutes
          of Python, AI, or cloud. Saturday is two hours each of DSA, design, and the project.
          Sunday is retrieval, project, and one Java or mock hour. Dates, phases, and the
          flagship milestones live on the syllabus. This page is the order of the patterns.
          Applications start in January 2027, while the material is still warm.
        </p>
      </header>
      <ol className="space-y-6">
        {weeks.map((week) => (
          <li key={week.n} className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-heading text-2xl">
                Week {week.n} · {week.title}
              </h2>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{week.cap}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed">{week.goal}</p>
            <p className="mt-2 text-sm text-muted-foreground">Depth: {week.depth}</p>
            {week.patterns.length > 0 && (
              <p className="mt-2 text-sm">
                {week.patterns.map((id, index) => (
                  <span key={id}>
                    {index > 0 && " · "}
                    <a href={`/patterns#${id}`} className="text-primary underline-offset-2 hover:underline">
                      {patternById.get(id)?.name}
                    </a>
                  </span>
                ))}
              </p>
            )}
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {order.map((day) => (
                <div key={day} className="rounded-xl bg-background px-3 py-2">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {weekdayLabel[day]} · {week.days[day].minutes}
                  </p>
                  <ul className="mt-1 space-y-1 text-sm leading-relaxed">
                    {week.days[day].blocks.map((block) => (
                      <li key={block.label}>
                        <span className="font-medium">{block.label}. </span>
                        {block.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
