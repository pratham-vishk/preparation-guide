import { topic } from "./types.ts";

export const pathTopics = [
  topic(
    "Path",
    "one-profile",
    "One profile, not ten careers",
    "20 min",
    "You are a Dell SDE II with 3+ years, Java, Spring Boot, microservices, Kafka, async work, Kubernetes/OpenShift, Docker, and already-shipped agent and RAG work. The switch is interview depth on that base, plus Python and AWS practiced on one project. You are not restarting as an AI fresher.",
    `flowchart LR
  A[Java backend] --> B[Cloud-native]
  B --> C[AI backend]
  C --> D[FDE later]
  X[Ten parallel careers] -.->|discard| A`,
    [
      "Keep the Dell and TCS backend story",
      "Add Python only where the agent project needs it",
      "Treat Go as reading ability",
      "Apply as a backend engineer who ships AI",
    ],
    [
      "Write one sentence you can say in an interview: Senior backend engineer, Java and Spring, distributed systems, with production-style RAG and agents.",
      "Put FDE in a second folder. Do not make it the January application identity.",
      "Do not describe Dell proprietary data or internal source in a public repo. Rebuild the shape with synthetic metrics.",
    ],
    `Primary: Java
Secondary: Python
Tertiary: Go, enough to read a service and change a handler`,
    "Throwing away three years to become a LangChain beginner.",
    "Walk me through the profile you want in April 2027.",
    "Say the one-sentence profile out loud once. Pin it at the top of the desk.",
  ),
  topic(
    "Path",
    "tracks",
    "Four tracks, one weight",
    "15 min",
    "Track A is the job you apply for. Track B is the differentiator already started at Dell. Track C is FDE if a posting fits. Track D is Go and storage infrastructure later, which matches object-storage work, not this winter.",
    `flowchart TD
  A[Track A Backend] --> Offer
  B[Track B AI backend] --> Offer
  C[Track C FDE] --> Later
  D[Track D Go and storage] --> Later`,
    ["Backend loop pays the 40-50 target", "AI work makes the resume specific", "FDE needs customer discovery", "Go waits until after the offer"],
    [
      "January applications: backend and AI-platform roles, SDE II / SWE III / senior only where the years match.",
      "One FDE application is allowed after the flagship README can explain a safe tool call. It is not the whole pipeline.",
    ],
    "Atlassian remote-India roles and some India FDE posts exist. US-level pay for India WFH is not the default. Comp follows entity, level, and geo.",
    "Applying only to FDE titles because the tweets are loud.",
    "Which track gets 70 percent of this week?",
    "Mark Track A and Track B as the only open tabs this month.",
  ),
  topic(
    "Path",
    "do-not-study",
    "What stays closed until the offer",
    "10 min",
    "The failure mode is a stack of courses and no interviews. React, deep learning research, ten frameworks, CKA plus CKAD together, KMP as a lifestyle, and random hards do not move a Java SDE II loop.",
    `flowchart LR
  Courses[Course shopping] --> Freeze
  Execution[DSA Java Design Project] --> Interviews`,
    ["Close the extra tabs", "One project", "Two credentials later", "January is for applications"],
    [
      "Skip AWS Cloud Practitioner. It is aimed at people new to cloud.",
      "Skip AI-900. The current fundamentals exam people mean is AI-901, and even that is optional next to a RAG project.",
      "Skip LangChain certificates, Python completion badges, and a Docker beginner badge.",
    ],
    "Do: AWS Solutions Architect Associate after you can draw a VPC. CKAD after you have deployed the project. AWS Generative AI Developer Professional only after the agents are real.",
    "Buying the next Udemy bundle because the last one felt unfinished.",
    "Name three things you will not study before January.",
    "Write the skip list on paper and leave it in the laptop sleeve.",
  ),
  topic(
    "Path",
    "weights",
    "Where the hours go",
    "10 min",
    "About 19 to 20 hours a week. DSA, Java/Spring, and system design take 20 percent each. Cloud and Kubernetes 15. Python and GenAI 15. The project is threaded through those hours, not a fifth full-time job. Certificates are 5 percent.",
    `flowchart LR
  DSA[DSA 20] --> Week
  Java[Java Spring 20] --> Week
  Design[Design 20] --> Week
  Cloud[Cloud K8s 15] --> Week
  AI[Python GenAI 15] --> Week
  Paper[Certs 5] --> Week`,
    ["75 minutes DSA on weekdays", "45 minutes backend or design", "30 minutes Python, AI, or cloud", "Saturday is the long build"],
    [
      "Weekday total is 2.5 hours, then stop.",
      "Saturday: 2 hours DSA, 2 hours design, 2 hours project.",
      "Sunday: 1.5 hours retrieval, 2 hours project, 1 hour Java or a mock.",
    ],
    "A weekday that becomes six hours dies by Wednesday. The cap is the method.",
    "Adding a night session because the morning felt short.",
    "What do you stop doing at minute 150 on a Wednesday?",
    "Set a repeating timer for 75, 45, and 30. When it rings, stand up.",
  ),
  topic(
    "Path",
    "languages",
    "Java primary, Python secondary, Go later",
    "20 min",
    "Postings are polyglot. Google India lists Java, Go, or Python. Apple Bengaluru pairs Spring with Kubernetes, Kafka, and Go or Python. Salesforce and Cisco do the same. Java is not dying in your target set. You already have the production years.",
    `flowchart TD
  J[Java interviews and services] --> Strength
  P[Python FastAPI and agents] --> Strength
  G[Go read and small edits] --> AfterOffer`,
    ["Solve DSA in Java", "Write the agent API in Python", "Read one Go file a week after December", "Do not split practice three ways"],
    [
      "Every blank rewrite this month is Java.",
      "Python starts with the types and tests the flagship service needs, not a 40-hour syntax course.",
      "Go becomes a weekend reader in 2027: a small HTTP handler, goroutines at a conceptual level, and the storage-service style Apple posts describe.",
    ],
    `// Java stays the interview language
CompletableFuture<Report> report = diagnostics.collect(bucket);`,
    "Being slightly able to start a main method in three languages and fluent in none.",
    "Which language do you code the medium in?",
    "Open one old PR and explain one CompletableFuture you wrote, without the IDE.",
  ),
  topic(
    "Calendar",
    "phase-1",
    "25 Sep to 25 Oct — retrieval and Python syntax",
    "2.5 hr",
    "Phase 1 rebuilds the patterns you forget: arrays, hashing, two pointers, sliding window, binary search, linked lists. Java side is collections, HashMap, equality, streams, and concurrency vocabulary. Python is syntax through requests.",
    `flowchart LR
  A[Pattern name] --> B[Template]
  B --> C[Two problems]
  C --> D[Rewrite tomorrow]`,
    ["Identify the pattern before coding", "Rewrite yesterday with the file empty", "One Python function, not a course module", "Stop at 2.5 hours"],
    [
      "Use the Patterns page. Two or three problems per shape.",
      "Sliding window is one machine: expand right, update state, shrink left, record the answer. Fruit baskets and minimum window are variations.",
      "HashMap: buckets, equals and hashCode, and what happens on collision. Say it once from memory.",
    ],
    "A green mark means you rewrote it alone. A red mark comes back. Day 1, 3, 7, 15, 30.",
    "Watching the solution and ticking completed.",
    "Is this a new pattern or a variation?",
    "Tonight: Two Sum from a blank file, then say which line updates the map.",
  ),
  topic(
    "Calendar",
    "phase-2",
    "26 Oct to 25 Nov — core structures and four designs",
    "2.5 hr",
    "Stacks, monotonic stacks, intervals, greedy, trees, BST, heaps. Spring moves from annotations you use to transactions, JPA, Redis, and Kafka failure. Designs: URL shortener, rate limiter, notification service, file storage.",
    `flowchart TD
  R[Requirements] --> N[Numbers]
  N --> API
  API --> Data
  Data --> Failures`,
    ["One design, 40 minutes, no video first", "Kafka question is why, not the dependency", "Tree DFS returns a summary", "Heap of size K"],
    [
      "Transaction propagation and isolation. Know why a private self-call skips the proxy.",
      "N+1: one query becomes one per row. Fix with a fetch join or a batch, and say the cost.",
      "Rate limiter: token bucket, where the counters live, what happens when Redis is down.",
    ],
    "Design out loud before drawing. The picture is the notes, not the thinking.",
    "Starting the video at minute zero.",
    "Where does the rate-limit state live with twenty servers?",
    "Speak a rate limiter for 10 minutes into a voice note. Listen once.",
  ),
  topic(
    "Calendar",
    "phase-3",
    "26 Nov to 20 Dec — graphs, cloud, RAG",
    "2.5 hr",
    "Graphs through Dijkstra and basic DP. Cloud is IAM, VPC, a real deploy path, Docker, and Kubernetes objects you can debug. AI is tokens, embeddings, a RAG pipeline, and one tool call.",
    `flowchart LR
  Doc --> Chunks --> Vectors --> Retrieve --> Answer
  Retrieve --> Cite`,
    ["BFS is unweighted distance", "Dijkstra is non-negative weights", "VPC before EKS", "RAG cites or it is a demo"],
    [
      "Basic DP only: climbing stairs, house robber, subset sum, coin change, one grid. Advanced MCM waits.",
      "Deploy the order or diagnostics service in Docker. Then the same image behind a Kubernetes Deployment and Service.",
      "Python FastAPI endpoint that returns chunks for a question. Keyword overlap is allowed on day one. Embeddings replace it the next week.",
    ],
    "January interviews do not require Kosaraju, bridges, or a perfect Z-algorithm. Those stay in the later pile.",
    "Starting EKS before you can explain a subnet.",
    "Why is this graph BFS and not Dijkstra?",
    "Draw your VPC on paper: two subnets, one load balancer, one database not on the public internet.",
  ),
  topic(
    "Calendar",
    "phase-4",
    "21 Dec to 15 Jan — mocks, not new syllabi",
    "2.5 hr",
    "Mixed retrieval. Five to eight full designs. The flagship README is the project story. Mocks cover Java, Spring, DSA, LLD, HLD, the project, and a behavioral story with a number.",
    `flowchart TD
  Mock --> Miss
  Miss --> SameDayRewrite
  SameDayRewrite --> NextMock`,
    ["No new pattern family", "Rewrite the miss the same day", "Project demo in 8 minutes", "Resume matches what you can draw"],
    [
      "Resume line: backend, distributed systems, AI, cloud. Each bullet has a number you can defend.",
      "Behavioral set: five STAR stories, 90 seconds, including one agent you shipped and one incident.",
      "Selective applications start in January. Referrals where you actually know the person.",
    ],
    "You joined Dell in April 2026. The one-year mark is April 2027. January is for loops that can land an offer around that window, not for a surprise resignation in October.",
    "Waiting until you feel 100 percent ready.",
    "What did yesterday’s mock miss, and did you rewrite it?",
    "Book one mock with a friend or a recording. Listen for the pattern name arriving late.",
  ),
  topic(
    "Calendar",
    "apply-window",
    "January apply, April switch",
    "15 min",
    "September through October is foundation. November is depth. December is interview shape. January opens the resume, referrals, and selective applications. February and March are loops. April is the switch window after the Dell year.",
    `flowchart LR
  Sep[Sep Oct foundation] --> Nov[Nov depth]
  Nov --> Dec[Dec mocks]
  Dec --> Jan[Jan applications]
  Jan --> Mar[Feb Mar loops]
  Mar --> Apr[Apr switch]`,
    ["Eight serious applications, not eighty", "Referral before a cold form when you can", "40-50 is a target, not a promise", "One year at Dell stays intact"],
    [
      "Target list: Walmart SWE III or senior if the years fit, Apple Java/Spring and storage-infrastructure where Go is a plus not a wall, Microsoft 61/62, Atlassian remote-India backend, Adobe, Salesforce, Intuit, Cisco Java/Go roles.",
      "Compensation on the posting is often hidden. One India FDE post has listed about 35-45 LPA base plus bonus. Product-company medians for strong SDE II sit around your target and move. Negotiate with a number, do not assume a US remote salary.",
    ],
    "Foreign company plus India WFH plus US pay is a special case. Ask which entity employs you and how equity is geo-adjusted.",
    "Mass applying in October with no retrieval habit.",
    "What is the date you send the first eight applications?",
    "Put 15 January on the calendar as resume freeze, not as a feelings check.",
  ),
];
