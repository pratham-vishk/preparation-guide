import Link from "next/link";
import { orderedParts, slugify, topicHref, topics } from "@/lib/syllabus";

export default function LearnIndexPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Office copy · September 2026 to April 2027
        </p>
        <h1 className="font-heading text-4xl leading-tight sm:text-5xl">
          One backend profile, with the AI work attached to it.
        </h1>
        <p className="text-lg leading-relaxed">
          Dell SDE II, three-plus years, Java and Spring already in production. The hours go to
          retrieval, interview depth, one storage-operations project, and applications from
          January. The list is the plan in order: each DSA pattern, each Java and Spring name,
          each design with the full checklist, then AWS, Python, the agent stack, and the calendar.
        </p>
      </header>
      <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
        <aside className="space-y-2 lg:sticky lg:top-28 lg:self-start">
          {orderedParts.map((part) => (
            <a key={part.title} href={`#${slugify(part.title)}`} className="block text-sm text-primary">
              {part.title}
            </a>
          ))}
          <a href="/print" className="block pt-2 text-sm text-muted-foreground">
            Printable copy
          </a>
        </aside>
        <div className="space-y-8">
          {orderedParts.map((part) => (
            <section key={part.title} id={slugify(part.title)} className="scroll-mt-28">
              <h2 className="font-heading text-3xl">{part.title}</h2>
              <ul className="mt-3 divide-y divide-border rounded-2xl bg-card ring-1 ring-foreground/10">
                {part.topics.map((item) => (
                  <li key={item.slug}>
                    <Link href={topicHref(item)} className="flex items-baseline justify-between gap-4 px-4 py-3 hover:bg-secondary">
                      <span className="font-medium">{item.title}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{item.minutes}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {topics.length > orderedParts.reduce((sum, part) => sum + part.topics.length, 0) ? (
            <section id="appendix" className="scroll-mt-28">
              <h2 className="font-heading text-3xl">Also in the guide</h2>
              <ul className="mt-3 divide-y divide-border rounded-2xl bg-card ring-1 ring-foreground/10">
                {topics
                  .filter((item) => !orderedParts.some((part) => part.topics.includes(item)))
                  .map((item) => (
                    <li key={item.slug}>
                      <Link href={topicHref(item)} className="flex items-baseline justify-between gap-4 px-4 py-3 hover:bg-secondary">
                        <span className="font-medium">{item.title}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">{item.section}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
