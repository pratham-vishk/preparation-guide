import Link from "next/link";
import { notFound } from "next/navigation";
import { BeatPlayer } from "@/components/beat-player";
import { TopicBody } from "@/components/topic-body";
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
      <TopicBody item={item} />
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
