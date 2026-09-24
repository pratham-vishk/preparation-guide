import Link from "next/link";
import { notFound } from "next/navigation";
import { BeatPlayer } from "@/components/beat-player";
import { MermaidFigure } from "@/components/mermaid-figure";
import { findTopic, slugify, topicHref, topics } from "@/lib/syllabus";

export function generateStaticParams() {
  return topics.map((item) => ({
    section: slugify(item.section),
    slug: item.slug,
  }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const item = findTopic(section, slug);
  if (!item) notFound();
  const index = topics.indexOf(item);
  const previous = topics[index - 1];
  const next = topics[index + 1];

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <Link href="/learn" className="text-primary">
            {item.section}
          </Link>
          {" · "}
          {item.minutes}
        </p>
        <h1 className="font-heading text-4xl leading-tight sm:text-5xl">{item.title}</h1>
        <p className="text-lg leading-relaxed">{item.why}</p>
      </header>
      <BeatPlayer beats={item.beats} />
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
      <section className="space-y-2">
        <h2 className="font-heading text-2xl">Steps</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
          {item.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
      <section className="space-y-2">
        <h2 className="font-heading text-2xl">Example</h2>
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
      <nav className="flex justify-between gap-4 text-sm">
        {previous ? (
          <Link href={topicHref(previous)} className="text-primary">
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={topicHref(next)} className="text-primary">
            {next.title}
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
