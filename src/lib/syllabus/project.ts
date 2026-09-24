import { topic } from "./types.ts";

export const projectTopics = [
  topic(
    "Project",
    "flagship",
    "AI-native object storage operations",
    "45 min",
    "One project replaces the certificate pile. It is an operations console for a fake object store: Java services own metadata and events, a Python agent reads them, and a human approves anything that changes the cluster.",
    `flowchart TD
  User --> Agent
  Agent --> Orch[Orchestrator]
  Orch --> Diag[Diagnostics]
  Orch --> Cap[Capacity]
  Orch --> Cfg[Config]
  Diag --> Logs
  Cap --> Metrics
  Cfg --> State
  Orch --> Tools
  Tools --> APIs[Java APIs]
  APIs --> Store[Synthetic object store]`,
    ["Synthetic data only", "Java owns the system of record", "Python owns the agent loop", "Writes wait for a human"],
    [
      "Do not copy Dell code, schemas, hostnames, or customer data. Invent buckets, latency series, and runbooks.",
      "Services: metadata API in Spring Boot, event outbox, a worker, Postgres, Redis for the rate limit and session.",
      "The README has a diagram, how to run it, and an eval score.",
    ],
    "Question the demo must answer: why is bucket latency high, using only the synthetic series.",
    "A chat box with no tools and no score.",
    "What can the agent do without a person, and what can it not?",
    "Create the repo and the architecture page. No model call yet.",
  ),
  topic(
    "Project",
    "debugger-agent",
    "Diagnostics agent",
    "40 min",
    "The first agent answers a latency question by reading metrics, logs, and traces, then naming a likely cause with the evidence attached.",
    `sequenceDiagram
  participant Op as Operator
  participant Agent
  participant Metrics
  participant Logs
  Op->>Agent: why is latency high
  Agent->>Metrics: last hour
  Agent->>Logs: error sample
  Agent-->>Op: cause plus evidence`,
    ["Read tools only", "Correlate time", "Cite the series", "Refuse if evidence is thin"],
    [
      "Tools: getLatency, getErrorRate, getRecentLogs. All read-only.",
      "The answer template: observation, likely cause, what would disprove it.",
      "Eval: ten scripted incidents with an expected cause label.",
    ],
    "Cause: retry storm. Evidence: error rate up, then latency up, same minute.",
    "A confident cause with no series id.",
    "What would make you discard this hypothesis?",
    "Seed three fake incidents and write the expected labels.",
  ),
  topic(
    "Project",
    "capacity-agent",
    "Capacity agent",
    "30 min",
    "The second agent forecasts whether a cluster crosses a threshold. It is a query and a sentence, not a research model.",
    `flowchart LR
  History --> Slope
  Slope --> Forecast
  Forecast --> Advice`,
    ["Use the stored series", "State the assumption", "Recommend, do not resize", "Show the date it crosses"],
    [
      "A linear or seasonal baseline is enough. Say the assumption.",
      "The tool returns the series. The model writes the sentence. The number comes from your code, not from the model’s imagination.",
      "If the series is shorter than two weeks, the agent says the forecast is weak.",
    ],
    "At the current slope, 80 percent full on day 40. Assumption: no new tenant.",
    "Letting the model invent the percentage.",
    "Where is the number computed?",
    "Implement the forecast in plain code. The model only explains it.",
  ),
  topic(
    "Project",
    "rca-agent",
    "Incident RCA with retrieval",
    "40 min",
    "The third agent takes an incident id, pulls logs, and retrieves similar synthetic incidents and postmortems. That is RAG with a job to do.",
    `flowchart TD
  ID[Incident id] --> Logs
  ID --> Similar[Similar incidents]
  Logs --> Draft
  Similar --> Draft
  Draft --> Cite`,
    ["Fetch by id", "Retrieve similar text", "Draft with citations", "No fix is applied"],
    [
      "The corpus is synthetic postmortems you write. Twenty is enough.",
      "Similar means embedding or keyword overlap. Record which you used.",
      "The output is a draft for a human. It is not a merged pull request.",
    ],
    "Similar to incident 12: disk saturation. Your logs show the same queue time.",
    "Training a model on Dell tickets.",
    "What is in the corpus, and what is forbidden to be in it?",
    "Write five fake postmortems. They are the index.",
  ),
  topic(
    "Project",
    "safe-executor",
    "Safe executor",
    "35 min",
    "The fourth piece is the gate. The agent proposes. A person approves. A tool runs. A check verifies. The trace is the audit.",
    `sequenceDiagram
  participant Agent
  participant Human
  participant Gate
  participant API
  Agent->>Human: propose scale
  Human->>Gate: approve
  Gate->>API: idempotent call
  API-->>Gate: new state
  Gate-->>Human: verified`,
    ["Proposal is data", "Approval is a record", "Tool is allow-listed", "Verify after"],
    [
      "The proposal is a JSON document: action, target, reason, evidence ids.",
      "Approve stores the user id. The Java API checks that row before it mutates.",
      "Idempotency key so a double click does not scale twice.",
      "Verification reads the new state and attaches it to the trace.",
    ],
    "POST /actions with Idempotency-Key. 200 on replay returns the same result.",
    "The model calling kubectl with a string it composed.",
    "Who is allowed to approve, and where is that enforced?",
    "Implement the approval table in Java before the agent can ask for it.",
  ),
  topic(
    "Project",
    "milestones",
    "Milestones through January",
    "15 min",
    "The project grows with the phases. It is not a December surprise.",
    `flowchart LR
  Oct[Oct API and outbox] --> Nov[Nov Kafka and Redis]
  Nov --> Dec[Dec RAG and read tools]
  Dec --> Jan[Jan approval and eval]`,
    ["October is the Java spine", "November adds the bus and cache", "December adds retrieval", "January adds the gate and the score"],
    [
      "By 25 Oct: Spring service, Postgres, one idempotent POST, README run steps.",
      "By 25 Nov: outbox, a consumer, Redis rate limit, Docker compose.",
      "By 20 Dec: FastAPI retrieval over the fake postmortems, ten eval questions.",
      "By 15 Jan: approval gate, twenty eval questions, a number in the README, a diagram you can redraw.",
    ],
    "Deploy to Kubernetes when compose is boring. AWS labels on the diagram can wait until the objects exist locally.",
    "A Kubernetes cluster in October with no API.",
    "What is true in the repo on 25 November?",
    "Put the four dates in the README now, unchecked.",
  ),
  topic(
    "Career",
    "certs-bits",
    "SAA, CKAD, and BITS on the side",
    "20 min",
    "Two credentials earn a place: AWS Solutions Architect Associate after you can draw the VPC, and CKAD after you can debug a pod. BITS M.Tech AI and ML is a degree for the next two years, including marriage and a job, not the thing that gets you the January interview.",
    `flowchart TD
  Now[Now project and DSA] --> SAA
  SAA --> CKAD
  Degree[BITS if the batch is open] --> Long[Long-term depth]
  Degree -.->|does not replace| Now`,
    ["SAA after a real diagram", "CKAD after CrashLoop practice", "AI-901 optional", "BITS is parallel"],
    [
      "Skip Cloud Practitioner, AI-900, LangChain badges, and Python completion certificates.",
      "AI-901 replaced the English AI-900 exam in 2026. It is still optional.",
      "AWS Generative AI Developer Professional is the later GenAI credential, after Bedrock or an equivalent pipeline is something you operated.",
      "BITS WILP M.Tech AI and ML lists agentic systems, LLMs, cloud-native AI, and a dissertation. Public pages have quoted about ₹3.34 lakh across four semesters and have shown conflicting 2026 deadlines. It does not place you. If you join the October batch, confirm the date and the fee on the BITS site before you pay. It runs beside the job. It does not eat the 2.5 hours.",
    ],
    "If the degree load collides with a mock week, the mock wins.",
    "Enrolling and then skipping DSA because the degree feels like progress.",
    "What does BITS not do for the April switch?",
    "Email or check the BITS page for the live deadline. Do it once, then decide.",
  ),
  topic(
    "Career",
    "linkedin",
    "One post, a short list of people",
    "15 min",
    "Networking is a weekly quota, not a persona. One technical post and a handful of real conversations beat a daily influencer schedule.",
    `flowchart LR
  Build --> Post
  Post --> People
  People --> Referral`,
    ["One post a week", "Five engineers", "Two recruiters", "Two people at target companies"],
    [
      "Post from the work you did that week: an idempotent consumer, a probe you broke, a RAG eval number.",
      "No Dell internals. The synthetic platform is the public story.",
      "Ask for a referral only after a specific conversation, not as the first message.",
    ],
    "This week I made a consumer safe to run twice. Here is the key, and here is the test.",
    "Posting motivation quotes.",
    "Who did you talk to, and about which system?",
    "Draft the first post from the outbox sketch. Four sentences.",
  ),
  topic(
    "DSA",
    "retention",
    "Five passes, or it did not happen",
    "15 min",
    "You have forgotten solved problems because you never had to retrieve them. The pass is the study. The checklist’s 342 rows are variations of about 40 shapes. Master the shape, then 120 to 150 representatives, not every row.",
    `flowchart LR
  P1[Pass 1 identify] --> P2[Pass 2 next-day rewrite]
  P2 --> P3[Pass 3 day 3]
  P3 --> P4[Pass 4 day 7]
  P4 --> P5[Pass 5 day 15 to 30]`,
    ["Name the pattern first", "Close the video", "Rewrite on an empty file", "Red comes back sooner"],
    [
      "Pass 1: if you cannot name the pattern, read the lecture, then code.",
      "Pass 2 the next day with no video.",
      "The Patterns page stores the mark and the next date: day 1, 3, 7, 15, 30.",
      "Sliding window’s many checklist titles are one loop. Expand, update, shrink, answer.",
    ],
    "Green: solved alone. Yellow: hint. Red: solution. Blue: pattern yes, code no.",
    "A tick mark the night you watched the editorial.",
    "Which pass is this problem on?",
    "Pick one red problem and schedule only its rewrite tonight.",
  ),
  topic(
    "DSA",
    "january-cut",
    "What January needs, and what waits",
    "10 min",
    "By January you can be handed a medium in the core set and start. Advanced string algorithms and exotic graph theorems are not equally important.",
    `flowchart TD
  Must[Arrays through basic DP] --> Jan[January loops]
  Later[MCM Trie KMP Kosaraju] --> After[After the loop]`,
    ["Core patterns are the job", "One DP family done deeply", "MCM is one problem if time", "KMP is LPS once"],
    [
      "Must: arrays, hash, prefix sums, two pointers, sliding window, binary search, lists, stack, monotonic stack, intervals, greedy, trees, BST, heap, BFS/DFS, topo, Dijkstra, basic DP.",
      "Later: MCM, trie depth, KMP and Z as a specialty, Kosaraju, bridges, articulation points.",
      "The live pattern pages cover the must-set with Java templates.",
    ],
    "Basic DP means stairs, robber, grid, subset, coins, one stock shape, one LIS, one LCS. Not every variant.",
    "Spending December on Kosaraju while house robber is shaky.",
    "Name the pattern for a medium in under a minute.",
    "Open the drill and do ten prompts. The misses are the only new DSA.",
  ),
];
