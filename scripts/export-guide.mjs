import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { topics, sections, topicsInSection, slugify } from "../src/lib/syllabus/index.ts";


const root = path.resolve("guide");
await mkdir(root, { recursive: true });

function body(item) {
  const sequence = item.sequence
    ? `\n## Sequence\n\n\`\`\`mermaid\n${item.sequence}\n\`\`\`\n`
    : "";
  return `# ${item.title}

${item.section} · ${item.minutes}

${item.why}

## Flow

\`\`\`mermaid
${item.flow}
\`\`\`
${sequence}
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

One profile: Java backend and distributed systems, with Python and agents on a single storage-operations project.

Open the running desk for the animated figures. These files are the same lessons, readable in the repo.

`;

for (const section of sections) {
  const dir = path.join(root, slugify(section));
  await mkdir(dir, { recursive: true });
  index += `\n## ${section}\n\n`;
  for (const item of topicsInSection(section)) {
    const file = path.join(dir, `${item.slug}.md`);
    await writeFile(file, body(item));
    index += `- [${item.title}](${slugify(section)}/${item.slug}.md)\n`;
  }
}

await writeFile(path.join(root, "README.md"), index);
console.log(`wrote ${topics.length} topics`);
