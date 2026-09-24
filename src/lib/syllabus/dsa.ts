import { patterns } from "../patterns.ts";
import { topic, type Topic } from "./types.ts";

const january = new Set([
  "hashing",
  "prefix-hash",
  "two-pointers",
  "sliding-window",
  "binary-search",
  "binary-search-answer",
  "matrix",
  "fast-slow",
  "reverse-list",
  "stack-queue",
  "monotonic-stack",
  "intervals",
  "greedy",
  "tree-dfs",
  "tree-bfs",
  "bst",
  "heap",
  "graph-traversal",
  "cycle-bipartite",
  "topo",
  "shortest-path",
  "dp-1d",
  "grid-dp",
  "knapsack",
]);

const ifGreen = new Set(["bit-xor", "backtracking", "dsu", "mst", "stock-dp", "lis", "lcs"]);

function when(id: string) {
  if (january.has(id)) return "January";
  if (ifGreen.has(id)) return "After the January core is green";
  return "After January";
}

export const dsaTopics: Topic[] = patterns.map((pattern) => {
  const slot = when(pattern.id);
  return topic(
    "DSA",
    pattern.id,
    pattern.name,
    slot === "January" ? "75 min" : "one evening",
    `${slot}. ${pattern.intuition}`,
    `flowchart TD
  See[Read the prompt] --> Name[Name the pattern]
  Name --> Skeleton[Write the Java skeleton]
  Skeleton --> Vary[Solve the representative problems]
  Vary --> Blank[Rewrite one tomorrow from a blank file]`,
    [
      "Name it before coding",
      "Write the skeleton from memory",
      "Solve the listed problems",
      "Blank rewrite the next day",
    ],
    [
      `Recognition: ${pattern.recognize.join(" ")}`,
      "If you cannot name it in a minute, this is pass 1: read one solution, then code it yourself.",
      "Pass 2 is the next day, empty file, no video. Pass 3 is day 3, pass 4 is day 7, pass 5 is day 15 to 30.",
      "Mark the attempt on the Patterns tab. Green means the rewrite worked alone.",
    ],
    pattern.template,
    pattern.mistakes[0] ?? "Treating each problem as a new invention.",
    `Walk ${pattern.problems[0]?.name ?? "the first problem"} and say why this pattern fits.`,
    `Rewrite ${pattern.problems[0]?.name ?? "the first problem"} tomorrow before any new pattern.`,
    undefined,
    [
      {
        title: "How to recognize it",
        body: pattern.recognize
          .map((line) => line)
          .join(" ")
          .concat(
            " Two of these in the prompt is enough. Say the pattern name out loud, then open the editor.",
          ),
      },
      {
        title: "The idea",
        body: pattern.intuition,
      },
      {
        title: "Java template",
        body: "Type this from memory. Only the condition inside the loop changes between problems in this family.",
        code: pattern.template,
      },
      {
        title: "Problems that count",
        body: pattern.problems
          .map((problem) => `${problem.name} (${problem.difficulty}). ${problem.note}`)
          .join("\n\n"),
      },
      {
        title: "Mistakes that make you blank in the interview",
        body: pattern.mistakes.join(" "),
      },
      {
        title: "When this sits in the calendar",
        body:
          slot === "January"
            ? "This is in the January must-set. It belongs in the 75-minute DSA block on weekdays. Do not add a new pattern on a day the previous rewrite failed."
            : slot === "After the January core is green"
              ? "Do this only after the January patterns rewrite cleanly. One evening, one problem. It is not equal in weight to sliding window or basic DP."
              : "Leave this until after January interviews are underway. MCM, trie depth, KMP, Z, and the exotic graph algorithms are real, and they are the wrong use of December.",
      },
    ],
  );
});
