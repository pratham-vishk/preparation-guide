import { backendTopics } from "./backend.ts";
import { cloudTopics } from "./cloud.ts";
import { designTopics } from "./design.ts";
import { pathTopics } from "./path.ts";
import { projectTopics } from "./project.ts";
import type { Topic } from "./types.ts";

export const topics: Topic[] = [
  ...pathTopics,
  ...backendTopics,
  ...designTopics,
  ...cloudTopics,
  ...projectTopics,
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
