export type Lesson = {
  title: string;
  body: string;
  code?: string;
};

export type Topic = {
  section: string;
  slug: string;
  title: string;
  minutes: string;
  why: string;
  flow: string;
  sequence?: string;
  beats: string[];
  steps: string[];
  example: string;
  mistake: string;
  ask: string;
  office: string;
  lessons?: Lesson[];
};

export function topic(
  section: string,
  slug: string,
  title: string,
  minutes: string,
  why: string,
  flow: string,
  beats: string[],
  steps: string[],
  example: string,
  mistake: string,
  ask: string,
  office: string,
  sequence?: string,
  lessons?: Lesson[],
): Topic {
  return {
    section,
    slug,
    title,
    minutes,
    why,
    flow,
    beats,
    steps,
    example,
    mistake,
    ask,
    office,
    sequence,
    lessons,
  };
}
