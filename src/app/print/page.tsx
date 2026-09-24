import { MermaidFigure } from "@/components/mermaid-figure";
import { topics } from "@/lib/syllabus";

export default function PrintPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 print:max-w-none">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.16em]">Pratham · preparation guide</p>
        <h1 className="font-heading text-4xl">Backend, then AI on top. September 2026 to April 2027.</h1>
        <p>
          Dell SDE II, Java and Spring in production. Study this at the office. Diagrams are
          written as Mermaid so they stay in the repo even when a slide tool is not open.
        </p>
      </header>
      {topics.map((item) => (
        <article key={`${item.section}-${item.slug}`} className="space-y-3 break-inside-avoid">
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
          <MermaidFigure chart={item.flow} />
          {item.sequence ? <MermaidFigure chart={item.sequence} /> : null}
          <ul className="list-disc pl-5 text-sm">
            {item.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-foreground p-3 text-xs text-background">
            {item.example}
          </pre>
          <p className="text-sm">
            <strong>Miss. </strong>
            {item.mistake}
          </p>
          <p className="text-sm">
            <strong>Ask. </strong>
            {item.ask}
          </p>
          <p className="text-sm">
            <strong>Do. </strong>
            {item.office}
          </p>
        </article>
      ))}
    </div>
  );
}
