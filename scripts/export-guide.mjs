import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { topics, orderedParts, slugify } from "../src/lib/syllabus/index.ts";


const root = path.resolve("guide");
await mkdir(root, { recursive: true });

function body(item) {
  const sequence = item.sequence
    ? `\n## Sequence\n\n\`\`\`mermaid\n${item.sequence}\n\`\`\`\n`
    : "";
  const lessons = (item.lessons ?? [])
    .map((lesson) => {
      const code = lesson.code ? `\n\n\`\`\`text\n${lesson.code}\n\`\`\`\n` : "\n";
      return `## ${lesson.title}\n\n${lesson.body}${code}`;
    })
    .join("\n");
  return `# ${item.title}

${item.section} · ${item.minutes}

${item.why}

## Flow

\`\`\`mermaid
${item.flow}
\`\`\`
${sequence}
${lessons}
## Play this

${item.beats.map((beat, index) => `${index + 1}. ${beat}`).join("\n")}

## Steps

${item.steps.map((step) => `- ${step}`).join("\n")}

## Example

\`\`\`text
${item.example}
\`\`\`

## The usual miss

${item.mistake}

## They will ask

${item.ask}

## Before you close the laptop

${item.office}
`;
}

let index = `# Preparation guide

The full study guide for one profile: Java backend and distributed systems, with Python and agents on a single storage-operations project.

Each file is a lesson: the idea, a figure, the template or the design, the mistake, and the interview question. Open the running desk for the animated figures.

`;

for (const item of topics) {
  const dir = path.join(root, slugify(item.section));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, `${item.slug}.md`), body(item));
}

for (const part of orderedParts) {
  index += `\n## ${part.title}\n\n`;
  for (const item of part.topics) {
    index += `- [${item.title}](${slugify(item.section)}/${item.slug}.md)\n`;
  }
}

const extra = topics.filter((item) => !orderedParts.some((part) => part.topics.includes(item)));
if (extra.length) {
  index += `\n## Also in the guide\n\n`;
  for (const item of extra) {
    index += `- [${item.title}](${slugify(item.section)}/${item.slug}.md)\n`;
  }
}

await writeFile(path.join(root, "README.md"), index);
console.log(`wrote ${topics.length} topics`);
