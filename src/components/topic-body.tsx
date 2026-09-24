import { MermaidFigure } from "@/components/mermaid-figure";
import type { Topic } from "@/lib/syllabus/types";

export function TopicBody({ item }: { item: Topic }) {
  return (
    <>
      <section className="space-y-3">
        <h2 className="font-heading text-2xl">Figure</h2>
        <MermaidFigure chart={item.flow} />
      </section>
      {item.sequence ? (
        <section className="space-y-3">
          <h2 className="font-heading text-2xl">Sequence</h2>
          <MermaidFigure chart={item.sequence} />
        </section>
      ) : null}
      {item.lessons?.map((lesson) => (
        <section key={lesson.title} className="space-y-2">
          <h2 className="font-heading text-2xl">{lesson.title}</h2>
          {lesson.body.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
          {lesson.code ? (
            <pre className="overflow-x-auto rounded-xl bg-foreground p-4 text-xs leading-relaxed text-background">
              <code>{lesson.code}</code>
            </pre>
          ) : null}
        </section>
      ))}
      <section className="space-y-2">
        <h2 className="font-heading text-2xl">Do it in this order</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
          {item.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
      <section className="space-y-2">
        <h2 className="font-heading text-2xl">Worked example</h2>
        <pre className="overflow-x-auto rounded-xl bg-foreground p-4 text-xs leading-relaxed text-background">
          <code>{item.example}</code>
        </pre>
      </section>
      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
          <h2 className="font-heading text-xl">The usual miss</h2>
          <p className="mt-2 text-sm leading-relaxed">{item.mistake}</p>
        </div>
        <div className="rounded-2xl bg-card p-4 ring-1 ring-foreground/10">
          <h2 className="font-heading text-xl">They will ask</h2>
          <p className="mt-2 text-sm leading-relaxed">{item.ask}</p>
        </div>
      </section>
      <section className="rounded-2xl border border-dashed border-foreground/20 p-4">
        <h2 className="font-heading text-xl">Before you close the laptop</h2>
        <p className="mt-2 text-sm leading-relaxed">{item.office}</p>
      </section>
    </>
  );
}
