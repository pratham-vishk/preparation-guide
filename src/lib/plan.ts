import type { Weekday } from "./dates";

export type DayPlan = {
  minutes: string;
  blocks: { label: string; text: string }[];
};

export type WeekPlan = {
  n: number;
  title: string;
  goal: string;
  patterns: string[];
  depth: string;
  cap: string;
  days: Record<Weekday, DayPlan>;
};

const weekday = (
  dsa: string,
  depth: string,
): DayPlan => ({
  minutes: "1h 45m",
  blocks: [
    { label: "Retrieve", text: "20 min. Blank-rewrite yesterday's problem. If you cannot, that problem is still red. Do not start a new one." },
    { label: "DSA", text: dsa },
    { label: "Depth", text: depth },
  ],
});

const weekendBuild = (text: string): DayPlan => ({
  minutes: "2h 30m",
  blocks: [
    { label: "Build", text },
    { label: "Stop", text: "No new DSA topic on Saturday. One bug fixed and written down beats three tutorials." },
  ],
});

const sunday = (text: string): DayPlan => ({
  minutes: "60m",
  blocks: [
    { label: "Revision only", text },
    { label: "No new input", text: "No YouTube, no new list, no certificate lecture. Reopen red and yellow cards. Mark the next review date." },
  ],
});

export const weeks: WeekPlan[] = [
  {
    n: 1,
    title: "Hashing, from a blank file",
    goal: "Two Sum, Group Anagrams, and prefix sums are retrievable without the editorial.",
    patterns: ["hashing", "prefix-hash"],
    depth: "HashMap, equals/hashCode, and one measured story from Dell.",
    cap: "At most 6 new problems. Retrieval counts more than the count.",
    days: {
      mon: weekday("Two Sum from scratch. Then say, out loud, why the map is updated after the check.", "Write equals and hashCode for a small class. Break a HashSet on purpose by omitting hashCode."),
      tue: weekday("Group Anagrams. Use a 26-count key, not only a sorted string.", "List three Dell tasks from the last quarter. Attach a number to each: latency, volume, errors, or time saved. If you have no number, instrument something this week."),
      wed: weekday("Longest Consecutive Sequence. Only start a run when the number minus one is absent.", "Read your own recent PR. Note one bug you would catch now."),
      thu: weekday("Subarray Sum Equals K. Draw prefix 0 on paper first.", "Spring: explain dependency injection in six sentences, without slides."),
      fri: weekday("Contiguous Array. Map 0 to -1. Same prefix map as yesterday.", "Write the Dell story in STAR form: situation, what you did, the number, what you would redo."),
      sat: weekendBuild("Set up the order-service repo. Spring Boot, Java 21, Postgres in Docker, one POST /orders that validates and saves. README with the run command."),
      sun: sunday("Rewrite Two Sum and Subarray Sum Equals K from empty files."),
    },
  },
  {
    n: 2,
    title: "Two pointers",
    goal: "You sort, then you know which pointer moves, including duplicates.",
    patterns: ["two-pointers"],
    depth: "Complexity talk: why O(n log n) from the sort dominates the scan.",
    cap: "3 new problems. 3Sum until duplicates are boring.",
    days: {
      mon: weekday("Two Sum II. Do not use a HashMap.", "Time and space for yesterday's solutions, written next to the code."),
      tue: weekday("3Sum. Sort, fix i, skip duplicates on all three indexes.", "SQL: write the orders query you would need for 'count by status today' with an index in mind."),
      wed: weekday("Container With Most Water. Move the shorter side. Explain why.", "Postgres: clustered vs non-clustered is the wrong debate. Know what an index avoids."),
      thu: weekday("Blank 3Sum again. Then 4Sum only if 3Sum was clean. Otherwise stop.", "Transactions: dirty read, and why @Transactional on a private method does nothing."),
      fri: weekday("One mixed set: Two Sum unsorted vs Two Sum II. Say the pattern before coding.", "Finish the STAR story. Read it in 90 seconds."),
      sat: weekendBuild("Add idempotency to POST /orders. A client key returns the same order instead of charging twice. Test it with two identical requests."),
      sun: sunday("3Sum and Container from blank files. Mark yellow if you peeked at a duplicate-skip."),
    },
  },
  {
    n: 3,
    title: "Sliding window",
    goal: "At-most-K is one template. Exactly-K is a subtraction, not a new life.",
    patterns: ["sliding-window"],
    depth: "Speak the window invariant before the loop.",
    cap: "3 new problems. Minimum Window is the hard one, once.",
    days: {
      mon: weekday("Longest Substring Without Repeating Characters.", "Write the invariant in a comment before code: 'window has unique chars'."),
      tue: weekday("Max Consecutive Ones III. At most K zeros.", "Same invariant sentence for at-most-K."),
      wed: weekday("Minimum Window Substring. Need and have counts. Shrink while valid.", "REST: idempotent GET vs non-idempotent POST. Status codes you actually use."),
      thu: weekday("Derive exactly-K from at-most. Use Binary Subarrays With Sum or Subarrays with K Different Integers, one of them.", "Logging and correlation ids. How you would trace one order across services."),
      fri: weekday("Redo Longest Substring from blank. No video.", "If Wednesday's hard problem is still fog, redo the shrink condition on paper only."),
      sat: weekendBuild("Outbox table: order save and outbox insert in one transaction. A scheduler marks events sent. You may log 'sent' instead of running Kafka yet."),
      sun: sunday("Redraw the at-most-K window on paper for a new string you invent."),
    },
  },
  {
    n: 4,
    title: "Binary search, both kinds",
    goal: "Index search and answer search feel like different tools.",
    patterns: ["binary-search", "binary-search-answer"],
    depth: "Bounds. Say low and high out loud.",
    cap: "5 new problems across the week, not per day.",
    days: {
      mon: weekday("Plain binary search, then lower bound. Inclusive range.", "Write three tests: target present, absent, and duplicates."),
      tue: weekday("Search in Rotated Sorted Array. Which half is sorted?", "Off-by-one notes in a single page you keep."),
      thu: weekday("Find First and Last Position.", "System design page: requirements, API, data, bottlenecks. Start a rate limiter outline."),
      wed: weekday("Koko Eating Bananas. The check is hours at speed mid.", "Finish the rate limiter sketch: token bucket, where it sits, what you store in Redis."),
      fri: weekday("Capacity To Ship Packages, or Split Array Largest Sum if ship was easy.", "Explain book allocation as the same check function with different nouns."),
      sat: weekendBuild("Rate-limit POST /orders. In-memory token bucket is enough. Document the key: client id, not global."),
      sun: sunday("Koko and rotated search from blank files."),
    },
  },
  {
    n: 5,
    title: "Lists",
    goal: "Reverse, middle, and cycle entrance without a map.",
    patterns: ["fast-slow", "reverse-list", "matrix"],
    depth: "Draw pointers. Boxes and arrows, not just code.",
    cap: "Matrix is three problems, then leave it. Lists matter more.",
    days: {
      mon: weekday("Reverse Linked List ten times, then Middle, then Cycle.", "Draw the three pointers."),
      tue: weekday("Cycle II. Meeting point is not the entrance.", "Explain Floyd in one minute."),
      wed: weekday("Palindrome Linked List by reversing the second half.", "Restore the list. Mention that in the interview."),
      thu: weekday("Reverse Nodes in k-Group. Count k first.", "If it breaks, stop after 40 minutes and write what broke. Retry Friday."),
      fri: weekday("Spiral Matrix and Rotate Image. Set Matrix Zeroes if those two are clean.", "API errors for the order service: 400, 409 on idempotency conflict, 429 on limit."),
      sat: weekendBuild("Tests for idempotency, validation, and rate limit. A README section called 'what fails'."),
      sun: sunday("Reverse list and Cycle II from blank. Skip matrix if lists are shaky."),
    },
  },
  {
    n: 6,
    title: "Stacks and intervals",
    goal: "Next greater is a stack. Overlaps are a sort plus one pass.",
    patterns: ["stack-queue", "monotonic-stack", "intervals"],
    depth: "Deque, not java.util.Stack.",
    cap: "Histogram is the one hard. Rain water can wait if histogram is alive.",
    days: {
      mon: weekday("Valid Parentheses and Min Stack.", "ArrayDeque push/pop. Know why Stack is a legacy class."),
      tue: weekday("Daily Temperatures. Store indexes.", "Distance is i - j, so values alone are not enough."),
      wed: weekday("Largest Rectangle in Histogram. Sentinel zero.", "Walk a tiny histogram on paper."),
      thu: weekday("Merge Intervals and Insert Interval.", "Touching endpoints: decide overlap from the problem statement, not from memory."),
      fri: weekday("Non-overlapping Intervals. Sort by end this time.", "Greedy sentence: keep the meeting that frees the room first."),
      sat: weekendBuild("Docker Compose for the app and Postgres. One command boots both. Health endpoint."),
      sun: sunday("Daily Temperatures and Merge Intervals from blank."),
    },
  },
  {
    n: 7,
    title: "Greedy, bits, recursion",
    goal: "You can tell greedy apart from DP before you code.",
    patterns: ["greedy", "bit-xor", "backtracking"],
    depth: "If the local choice might be wrong later, stop and call it DP.",
    cap: "N-Queens once. Do not add Sudoku unless N-Queens is clean.",
    days: {
      mon: weekday("Jump Game and Jump Game II. Different questions.", "Say the greedy choice in one sentence before coding II."),
      tue: weekday("Gas Station.", "Total gas versus the point the tank went negative."),
      wed: weekday("Single Number, Missing Number, Single Number II.", "II is bit counts, not XOR."),
      thu: weekday("Combination Sum. Copy the path.", "Undo is the whole algorithm."),
      fri: weekday("Permutations, then N-Queens if permutations undoes cleanly.", "Design: continue the rate limiter. Where state lives with many servers."),
      sat: weekendBuild("Write the design note for the order service: sync write, outbox, worker, retry, dead letter. One page."),
      sun: sunday("Jump Game II and Combination Sum from blank."),
    },
  },
  {
    n: 8,
    title: "Trees",
    goal: "DFS returns a summary. BFS snapshots a level. BST means inorder.",
    patterns: ["tree-dfs", "tree-bfs", "bst"],
    depth: "Do not build a list of the whole tree when a number is enough.",
    cap: "Nine problems exist here. Do six well.",
    days: {
      mon: weekday("Diameter. Return height, store diameter outside.", "Say that sentence before typing."),
      tue: weekday("LCA of a binary tree. Path Sum III if LCA is calm.", "Prefix on the way down, remove on the way up."),
      wed: weekday("Level order and right view.", "Snapshot the queue size."),
      thu: weekday("Maximum width. Indexes. Use long.", "Heap-style indexes, and why the left edge is not column 0 after skew."),
      fri: weekday("Validate BST with bounds, Kth smallest, LCA of a BST.", "BST LCA is a comparison, not the general-tree version."),
      sat: weekendBuild("System design drill, 45 min on a timer: design a rate limiter. Talk, then compare with your notes. No video until after you talk."),
      sun: sunday("Diameter and Validate BST from blank."),
    },
  },
  {
    n: 9,
    title: "Heaps, then graphs",
    goal: "Top K is a small heap. A grid is a graph.",
    patterns: ["heap", "graph-traversal"],
    depth: "Java PriorityQueue is a min-heap.",
    cap: "Median of a stream only after top K is dull.",
    days: {
      mon: weekday("Kth Largest. Heap of size k.", "Also know the name QuickSelect."),
      tue: weekday("Top K Frequent.", "Bucket sort as the follow-up, one pass through the explanation."),
      wed: weekday("Find Median from Data Stream, or redo Top K if Tuesday was messy.", "Balance rule: left heap size is equal or one larger."),
      thu: weekday("Number of Islands. Mark on entry.", "4 directions. Write the bounds check once."),
      fri: weekday("Rotting Oranges. Multi-source BFS.", "The minute is the layer, not a timestamp you invent per orange."),
      sat: weekendBuild("Design drill: notification service. Fanout, retry, idempotent consumer. Tie it back to your outbox."),
      sun: sunday("Islands and Kth Largest from blank."),
    },
  },
  {
    n: 10,
    title: "Cycles, topo, shortest path",
    goal: "You pick BFS, Dijkstra, or Bellman from the constraint, not from mood.",
    patterns: ["cycle-bipartite", "topo", "shortest-path"],
    depth: "State the edge direction before building the list.",
    cap: "Floyd-Warshall is a ten-minute read, not a problem set.",
    days: {
      mon: weekday("Course Schedule. Three colors.", "A boolean visited array is the bug."),
      tue: weekday("Is Graph Bipartite.", "Odd cycle."),
      wed: weekday("Course Schedule II. Kahn.", "If the order is shorter than n, there is a cycle."),
      thu: weekday("Shortest Path in Binary Matrix. BFS.", "Say why Dijkstra is the wrong first tool."),
      fri: weekday("Network Delay Time. Then Cheapest Flights if Dijkstra was clean.", "Stale heap entries: skip when the popped distance is worse than dist[node]."),
      sat: weekendBuild("Kafka or a real broker if Docker is calm. Consumer group, at-least-once, retry, a dead-letter topic. If Kafka eats the day, keep the outbox and write the failure modes instead."),
      sun: sunday("Course Schedule II and Network Delay from blank, or the BFS maze if Dijkstra is the weak one."),
    },
  },
  {
    n: 11,
    title: "DSU and MST, then DP starts",
    goal: "Union by root. Kruskal is sort plus union. DP state fits in one sentence.",
    patterns: ["dsu", "mst", "dp-1d"],
    depth: "DP begins only after the sentence exists.",
    cap: "One MST problem is enough. Do not collect spanning-tree variants.",
    days: {
      mon: weekday("Number of Provinces with DSU.", "Path compression."),
      tue: weekday("Redundant Connection and Accounts Merge. Accounts can spill to Wednesday.", "Union emails, not names."),
      wed: weekday("Min Cost to Connect All Points.", "Stop at n-1 edges."),
      thu: weekday("Climbing Stairs. State sentence, then code, then the two-variable form.", "No knapsack yet."),
      fri: weekday("House Robber and House Robber II.", "Circle means two linear runs."),
      sat: weekendBuild("Project 1 freeze. README: architecture, idempotency, outbox, how to run, what you would measure. Tag it v1."),
      sun: sunday("House Robber and a DSU union from blank."),
    },
  },
  {
    n: 12,
    title: "Knapsack and grids",
    goal: "Downward loop means use once. Upward loop means coins may repeat.",
    patterns: ["grid-dp", "knapsack"],
    depth: "Partition and coins are the same family.",
    cap: "Six problems. If a seventh appears in a blog, ignore it.",
    days: {
      mon: weekday("Unique Paths, then Minimum Path Sum.", "Fill order: cells you depend on already exist."),
      tue: weekday("Triangle, bottom-up.", "Space: one row."),
      wed: weekday("Partition Equal Subset Sum. Total even, target half, loop down.", "Draw a capacity of 7."),
      thu: weekday("Coin Change, fewest coins. Unbounded, loop up.", "This is not the combinations count."),
      fri: weekday("Target Sum or Coin Change II, whichever matches the hole.", "Write '0/1 or unbounded' at the top of the file."),
      sat: weekendBuild("Project 2 skeleton. A folder of 15 fake runbook pages. An endpoint that returns the top 3 chunks for a question, even if the rank is keyword overlap for now."),
      sun: sunday("Partition and Coin Change from blank. Direction of the loop is the test."),
    },
  },
  {
    n: 13,
    title: "Stocks, LIS, LCS",
    goal: "You recognize the family. You do not finish every variant in the checklist.",
    patterns: ["stock-dp", "lis", "lcs"],
    depth: "One hard rebuild beats five editorial reads.",
    cap: "Nine names, six solves. Leave the rest labeled 'same pattern'.",
    days: {
      mon: weekday("Stock I and Stock II.", "II is every rise, or hold/cash."),
      tue: weekday("Stock with cooldown.", "Third state."),
      wed: weekday("LIS O(n^2), then tails array if the square version is yours.", "Divisible subset only if LIS is calm."),
      thu: weekday("Longest Common Subsequence. Rebuild one LCS on paper.", "Index is i-1."),
      fri: weekday("Delete Operation for Two Strings. Supersequence only if the table feels friendly.", "m + n - 2*LCS."),
      sat: weekendBuild("Python weekend, tightly scoped: functions, dicts, list comprehensions, reading the runbook files. No certification module."),
      sun: sunday("LIS and LCS from blank. Cooldown if stocks were the miss."),
    },
  },
  {
    n: 14,
    title: "Strings, one partition, Python service",
    goal: "Edit distance is yours. MCM is one problem. The copilot calls your Java API.",
    patterns: ["string-dp", "mcm", "trie"],
    depth: "FastAPI is a wrapper, not a new career.",
    cap: "Wildcard matching and regex matching are optional and easy to sink in. Skip them if edit distance is not blank-clean.",
    days: {
      mon: weekday("Longest Palindromic Subsequence.", "LCS with the reverse."),
      tue: weekday("Edit Distance, including the empty-string base.", "Three operations, named."),
      wed: weekday("Burst Balloons, one serious attempt. Stop at 45 minutes if the recurrence is not written.", "Padded 1s."),
      thu: weekday("Implement Trie.", "Insert and startsWith."),
      fri: weekday("Maximum XOR, or Word Search II if you want the board version.", "Opposite bit."),
      sat: weekendBuild("FastAPI service: retrieve chunks, call an LLM if you have a key, otherwise a stub that quotes the chunk. One tool: GET order status from the Java service."),
      sun: sunday("Edit Distance from blank. Trie insert from blank."),
    },
  },
  {
    n: 15,
    title: "Recognition and the story",
    goal: "A random prompt gets a pattern name in 30 seconds, then a shape of the code.",
    patterns: ["string-algo", "sieve"],
    depth: "Resume, five stories, three designs.",
    cap: "KMP once. Sieve once. Then drills, not new families.",
    days: {
      mon: weekday("LPS and strStr via KMP.", "Mismatch does not always move i."),
      tue: weekday("Count Primes. Trailing zeroes as the second math problem.", "Stop math there."),
      wed: weekday("Drill day. Ten prompts from the drill page. Name the pattern. Code only two.", "No new pattern."),
      thu: weekday("Redo the two you missed yesterday from blank.", "Resume: Dell bullets with numbers. Link both repos. One line on the copilot eval, even if the score is honest and low."),
      fri: weekday("Mixed redo of one red from each phase you still have.", "Five STAR stories, 90 seconds each, said aloud."),
      sat: weekendBuild("Eval set: 20 questions, expected snippet or order id, pass/fail. Write the score in the README. Fix one failure."),
      sun: sunday("Drill again, ten prompts. Patterns you miss become next week's only DSA."),
    },
  },
  {
    n: 16,
    title: "Apply while the material is warm",
    goal: "Eight applications out. Interviews replace new syllabi.",
    patterns: [],
    depth: "Company list from the market page. SWE III / SDE II first.",
    cap: "Zero new patterns. Gaps found in mocks only.",
    days: {
      mon: weekday("One timed medium, 35 minutes, from a pattern you marked red.", "Apply to two companies. Tailor three resume lines, not the whole story."),
      tue: weekday("Timed medium, different pattern.", "Apply to two more. Ask one person for a referral where you actually know them."),
      wed: weekday("Design on a timer: rate limiter or ticket queue, 40 minutes.", "Apply to two more."),
      thu: weekday("Java round: concurrency question you choose, coded small. ConcurrentHashMap or a bounded buffer.", "Apply to two more. Eight is the week's floor."),
      fri: weekday("Redo any interview miss the same day. That is the whole DSA block.", "Mock with a friend or a recording. Listen for the pattern name arriving late."),
      sat: weekendBuild("Patch the project only if an interview exposed a hole. Otherwise rest the build and reread the design page."),
      sun: sunday("Due cards only. Sleep. The loop is the practice now."),
    },
  },
];

export const weekdayLabel: Record<Weekday, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};
