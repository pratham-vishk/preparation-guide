import { TopicBody } from "@/components/topic-body";
import { topics } from "@/lib/syllabus";

export default function PrintPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 print:max-w-none">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.16em]">Pratham · preparation guide</p>
        <h1 className="font-heading text-4xl">The preparation guide. September 2026 to April 2027.</h1>
        <p>
          This is the study text, not only the calendar. Each skill from the target stack has a
          lesson: the idea, the Java or the design, the mistake, and the question. Dell SDE II,
          Java and Spring in production.
        </p>
      </header>
      {topics.map((item) => (
        <article key={`${item.section}-${item.slug}`} className="space-y-3 break-before-page">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {item.section} · {item.minutes}
          </p>
          <h2 className="font-heading text-3xl">{item.title}</h2>
          <p>{item.why}</p>
          <ol className="list-decimal pl-5 text-sm">
            {item.beats.map((beat) => (
              <li key={beat}>{beat}</li>
            ))}
          </ol>
          <TopicBody item={item} />
        </article>
      ))}
    </div>
  );
}
