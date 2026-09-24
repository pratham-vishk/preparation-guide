import { topic } from "./types.ts";

const checklist = `flowchart TD
  R[Requirements] --> S[Scale]
  S --> API
  API --> Model[Data model]
  Model --> Arch[Architecture]
  Arch --> DB
  DB --> Cache
  Cache --> Queue
  Queue --> Consistency
  Consistency --> Failure
  Failure --> Observe
  Observe --> Security
  Security --> Tradeoffs`;

export const designTopics = [
  topic(
    "Design",
    "checklist",
    "How every design is told",
    "20 min",
    "SDE II loops at Amazon and Microsoft put HLD next to DSA. You use the same spine every time so you do not freeze on the noun they picked.",
    checklist,
    ["Clarify read and write", "One number for scale", "API then data", "Failure before you stop"],
    [
      "Functional requirements in five bullets. Non-functional: latency, availability, consistency.",
      "Back-of-envelope: QPS, storage per day, read/write ratio. Order of magnitude is enough.",
      "End on trade-offs. A design with no trade-off is a drawing.",
    ],
    "40 minutes. Talk first. Draw second. No video until you have spoken.",
    "Jumping to Kafka because it sounds senior.",
    "What did you refuse to build in v1?",
    "Run the spine on a system you already operate. Eight minutes.",
  ),
  topic(
    "Design",
    "url-shortener",
    "URL shortener",
    "40 min",
    "The classic is a key-value write with a read-heavy cache. It teaches ids, redirects, and cache.",
    `flowchart LR
  Client --> API
  API --> Cache
  Cache -->|miss| DB
  API --> Redirect`,
    ["Generate an unguessable id", "Store url by id", "Cache the hot ids", "301 versus 302"],
    [
      "Write path: hash or an id service, unique constraint, return the short url.",
      "Read path: cache then database. Redirect. Do not count analytics on the request thread.",
      "Analytics is an async event. That is your first queue in this design.",
    ],
    "GET /{id} -> 302 Location",
    "A sequential integer id that leaks volume and is easy to scrape.",
    "How do you keep one id from being issued twice?",
    "Speak it once with a cache and an analytics event.",
  ),
  topic(
    "Design",
    "rate-limiter",
    "Rate limiter",
    "40 min",
    "Apple and backend loops ask this because it is a small distributed system: counters, clocks, and failure.",
    `flowchart TD
  Req --> Gateway
  Gateway --> Redis
  Redis -->|allow| Service
  Redis -->|deny| R429[429]`,
    ["Token bucket", "Key is the client", "Redis is shared", "Fail open or closed on purpose"],
    [
      "Token bucket: capacity and refill rate. Each request takes a token.",
      "Key by user or token, not one global bucket, unless the limit is for the whole cluster.",
      "If Redis is down, fail open for a product page and fail closed for a write that spends money. Say which.",
    ],
    "INCR + EXPIRE is a crude fixed window. Mention the boundary burst.",
    "A limiter in one process memory when you have twenty pods.",
    "Two requests at the same millisecond. What happens?",
    "Put this in front of the agent tool-execution endpoint. That is the same design.",
  ),
  topic(
    "Design",
    "notification",
    "Notification system",
    "40 min",
    "Fanout, retries, and idempotent delivery. This is the Kafka design with a user-visible result.",
    `flowchart LR
  Event --> Topic
  Topic --> Email
  Topic --> Push
  Email --> Attempt
  Attempt -->|fail| Retry`,
    ["Event in", "One worker per channel", "Retry with backoff", "Do not double-send"],
    [
      "The API accepts the intent and returns. Delivery is async.",
      "Idempotency key so a retry does not email twice.",
      "Preferences and quiet hours are a filter before the provider call.",
    ],
    "notification_id unique at the provider adapter.",
    "Calling the email vendor inside the user request.",
    "The worker crashes after the vendor accepts. Did the user get two mails?",
    "Map this onto an incident notice for a bucket, with synthetic users.",
  ),
  topic(
    "Design",
    "file-storage",
    "File and object storage",
    "40 min",
    "This is the design closest to your storage background. Metadata in a database, bytes in object storage, upload in parts.",
    `flowchart LR
  Client --> API
  API --> Meta[(Postgres)]
  Client --> S3[Object store]
  API --> S3`,
    ["Metadata is not the bytes", "Multipart upload", "Checksum", "Lifecycle"],
    [
      "The API issues an upload plan. The client sends parts to object storage.",
      "Complete is a metadata transaction: all parts present, checksum matches, object becomes visible.",
      "A garbage collector deletes abandoned parts. Say the delay.",
    ],
    "HEAD for existence. GET via a short-lived signed URL.",
    "Storing the file bytes in Postgres.",
    "A part never arrives. What does the user see?",
    "Tell this design with a bucket you invent. No Dell hostnames or schemas.",
  ),
  topic(
    "Design",
    "rag-design",
    "AI chat with RAG",
    "40 min",
    "The design interview version of your RAG work. Retrieval, citations, and what you do when the model is wrong.",
    `sequenceDiagram
  participant User
  participant API
  participant Index
  participant Model
  User->>API: question
  API->>Index: retrieve
  Index-->>API: chunks
  API->>Model: question plus chunks
  Model-->>User: answer plus citations`,
    ["Ingest offline", "Retrieve before generate", "Cite the chunk", "Evaluate a fixed set"],
    [
      "Ingestion is a pipeline, not part of the user request.",
      "The prompt may only use retrieved text for factual claims. If retrieval is empty, say so.",
      "A set of questions with expected facts. Track pass rate, latency, and cost per answer.",
    ],
    "Answer: chunk 14 says the quota is 80 percent. Link the chunk.",
    "A chatbot that answers from memory with no source.",
    "How do you know the assistant is not inventing a root cause?",
    "Write 5 evaluation questions for a fake storage runbook.",
  ),
  topic(
    "Design",
    "agent-platform",
    "Agent orchestration with a human gate",
    "40 min",
    "The differentiator. An agent may suggest a change. It may not apply the change until a person approves, the tool is allow-listed, and the call is idempotent.",
    `sequenceDiagram
  participant User
  participant Agent
  participant Policy
  participant Human
  participant Tool
  User->>Agent: diagnose latency
  Agent->>Tool: read metrics
  Agent->>Human: proposed action
  Human->>Policy: approve
  Policy->>Tool: execute
  Tool-->>Agent: result`,
    ["Read tools are wider", "Write tools need approval", "Timeouts and retries", "Trace every tool call"],
    [
      "Split tools into read and write. Diagnostics are read. A config change is write.",
      "The approval record stores who, what, and the idempotency key.",
      "Prompt injection in a log line must not be able to call the write tool. The model does not hold the credential. The policy service does.",
    ],
    "Tool list: getMetrics, getLogs, proposeScale. Only proposeScale needs a human.",
    "Giving the model a kubeconfig.",
    "How do you stop an agent from looping on a tool?",
    "Draw the approval box on the flagship diagram before you write more code.",
  ),
];
