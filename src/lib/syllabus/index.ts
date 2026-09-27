import { backendTopics } from "./backend.ts";
import { cloudTopics } from "./cloud.ts";
import { depthLessons } from "./depth.ts";
import { checklistLessons } from "./design-sheets.ts";
import { designTopics } from "./design.ts";
import { dsaTopics } from "./dsa.ts";
import { foundationTopics } from "./foundations.ts";
import { designLeaves, leafTopics, serviceLeaves } from "./leaves.ts";
import { planParts } from "./order.ts";
import { pathTopics } from "./path.ts";
import { projectTopics } from "./project.ts";
import { stackTopics } from "./stack.ts";
import type { Topic } from "./types.ts";

const sectionOrder = [
  "Path",
  "Calendar",
  "DSA",
  "Java",
  "Spring",
  "LLD",
  "SQL",
  "Distributed",
  "Linux",
  "Observability",
  "Terraform",
  "Design",
  "Cloud",
  "Kubernetes",
  "Python",
  "AI",
  "Go",
  "Project",
  "Career",
];

function withDepth(item: Topic): Topic {
  const extra = depthLessons[item.slug];
  if (!extra?.length) return item;
  return { ...item, lessons: [...(item.lessons ?? []), ...extra] };
}

function withChecklist(item: Topic): Topic {
  if (item.lessons?.some((lesson) => lesson.title === "Requirements")) return item;
  const extra = checklistLessons(item.slug);
  if (!extra) return item;
  return { ...item, lessons: [...(item.lessons ?? []), ...extra] };
}

const combined = [
  ...foundationTopics,
  ...pathTopics,
  ...projectTopics,
  ...dsaTopics,
  ...backendTopics,
  ...stackTopics,
  ...designTopics,
  ...cloudTopics,
  ...leafTopics,
  ...designLeaves,
  ...serviceLeaves,
].map(withDepth).map(withChecklist);

const bySlug = new Map<string, Topic>();
for (const item of combined) {
  if (bySlug.has(item.slug)) {
    throw new Error(`Duplicate syllabus slug: ${item.slug}`);
  }
  bySlug.set(item.slug, item);
}

export const orderedParts: { title: string; topics: Topic[] }[] = planParts.map((part) => ({
  title: part.title,
  topics: part.slugs.map((slug) => {
    const item = bySlug.get(slug);
    if (!item) throw new Error(`Missing syllabus slug: ${slug}`);
    return item;
  }),
}));

const used = new Set(planParts.flatMap((part) => part.slugs));

export const topics: Topic[] = [
  ...orderedParts.flatMap((part) => part.topics),
  ...sectionOrder.flatMap((section) =>
    combined.filter((item) => item.section === section && !used.has(item.slug)),
  ),
  ...combined.filter((item) => !used.has(item.slug) && !sectionOrder.includes(item.section)),
];

export const sections = [...new Set(topics.map((item) => item.section))];

export function topicHref(item: Topic) {
  return `/learn/${slugify(item.section)}/${item.slug}`;
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function findTopic(sectionSlug: string, topicSlug: string) {
  return topics.find(
    (item) => slugify(item.section) === sectionSlug && item.slug === topicSlug,
  );
}

export function topicsInSection(section: string) {
  return topics.filter((item) => item.section === section);
}
