import { backendTopics } from "./backend.ts";
import { cloudTopics } from "./cloud.ts";
import { depthLessons } from "./depth.ts";
import { designTopics } from "./design.ts";
import { dsaTopics } from "./dsa.ts";
import { foundationTopics } from "./foundations.ts";
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

const combined = [
  ...foundationTopics,
  ...pathTopics,
  ...projectTopics,
  ...dsaTopics,
  ...backendTopics,
  ...stackTopics,
  ...designTopics,
  ...cloudTopics,
].map(withDepth);

export const topics: Topic[] = [
  ...sectionOrder.flatMap((section) => combined.filter((item) => item.section === section)),
  ...combined.filter((item) => !sectionOrder.includes(item.section)),
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
