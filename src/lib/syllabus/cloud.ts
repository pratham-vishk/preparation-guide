import { topic } from "./types.ts";

export const cloudTopics = [
  topic(
    "Design",
    "cache-chat-feed",
    "Cache, chat, and feed in one sitting",
    "45 min",
    "Three designs share a spine. Learn the part that makes each one different, not three new religions.",
    `flowchart TD
  Cache[Cache: TTL and stampede]
  Chat[Chat: fanout and presence]
  Feed[Feed: push versus pull]`,
    ["Cache is freshness", "Chat is a channel per conversation", "Feed is fanout on write or read", "All three need a queue"],
    [
      "Distributed cache: cache aside, TTL, single-flight on miss. Redis in front of Postgres.",
      "Chat: a connection tier, a message log, fanout to online users, store for history. Presence is ephemeral.",
      "Feed: push to followers' inboxes when celebrities are rare. Pull or a hybrid when one account has millions of followers.",
    ],
    "The hard part of chat is not the bubble. It is ordering in a conversation and not losing a message on reconnect.",
    "Designing all three as a single database table.",
    "When does feed fanout on write fall over?",
    "Pick feed. Say push, pull, or hybrid in one sentence and why.",
  ),
  topic(
    "Design",
    "search-pay-schedule",
    "Search, payments, scheduler, logs",
    "45 min",
    "Four more nouns. Each has one trick. Say the trick first.",
    `flowchart LR
  Search[Search: index is not the database]
  Pay[Pay: idempotent charge]
  Job[Scheduler: lease]
  Logs[Logs: buffer then store]`,
    ["Index asynchronously", "Charge once", "Only one worker owns a job", "Logs are append-only"],
    [
      "Search: the database is the source. An index (inverted or a service) is built from a stream. Queries hit the index.",
      "Payments: idempotency key, ledger entries that sum, and a state machine. Never a single balance update with no history.",
      "Scheduler: a job row with a lease timestamp. A worker updates the lease. If it dies, another worker takes the expired lease.",
      "Log aggregation: agents buffer, a queue absorbs bursts, object storage keeps the bulk, an index keeps the recent window.",
    ],
    "Payment states: created, authorized, captured, failed. Illegal jumps are rejected.",
    "A cron on every pod so the job runs five times.",
    "Two API calls with the same idempotency key. How many charges?",
    "Write the payment states on a card. Carry it to one mock.",
  ),
  topic(
    "Cloud",
    "iam-vpc",
    "IAM and VPC before any service",
    "40 min",
    "Solutions Architect Associate is the credential, later. The knowledge starts with who can call what, and which network path exists. Cloud Practitioner is the wrong exam for you.",
    `flowchart TD
  User --> IAM
  IAM --> Role
  Role --> ALB
  ALB --> Private[Private subnet]
  Private --> RDS`,
    ["No long-lived keys on laptops", "Roles for services", "Database is private", "Security groups are stateful"],
    [
      "IAM user is a person. A role is what EC2, EKS, or Lambda assumes. Policies are the allow list.",
      "VPC, public subnet for the load balancer, private subnet for the app and the database.",
      "Security group on the database allows the app group on 5432 and nothing from the internet.",
    ],
    "SAA is the supporting certificate after you can draw this. Do not start with Cloud Practitioner.",
    "Opening port 22 to the world because a tutorial did.",
    "How does the pod reach S3 without an access key in the image?",
    "Draw the VPC once. Photograph it. That is this week's cloud note.",
  ),
  topic(
    "Cloud",
    "data-plane",
    "S3, RDS, queues, and cache",
    "35 min",
    "The flagship maps cleanly: bytes in S3, metadata in RDS, events on SQS or Kafka, hot state in ElastiCache.",
    `flowchart LR
  App --> RDS
  App --> S3
  App --> Queue
  App --> Cache`,
    ["S3 is objects", "RDS is Postgres", "SQS is a buffer", "ElastiCache is Redis"],
    [
      "S3: bucket, key, storage class, lifecycle, pre-signed URL. Not a filesystem you mount and forget.",
      "RDS Postgres for the source of truth. Multi-AZ is availability, not a write-scaling strategy.",
      "SQS for a simple buffer. Kafka when you need replay and several consumers. Say the difference.",
      "ElastiCache Redis for the rate limit and the cache. Same rules as the Redis topic.",
    ],
    "A pre-signed URL expires. The client uploads directly. Your API stays small.",
    "Using SQS and also expecting to rewind the stream a week later.",
    "When do you pick SQS over Kafka?",
    "Label the four boxes on the flagship diagram with the AWS name.",
  ),
  topic(
    "Cloud",
    "eks-observe",
    "EKS, images, and CloudWatch",
    "35 min",
    "EKS is Kubernetes with AWS as the cloud under it. You still need to understand pods. CloudWatch and CloudTrail tell you what the service and the account did.",
    `flowchart TD
  Code --> ECR
  ECR --> EKS
  EKS --> CW[CloudWatch]
  Account --> Trail[CloudTrail]`,
    ["Build an image", "Push to ECR", "Deploy to EKS", "Logs and a trail"],
    [
      "ECR stores the image. EKS runs it. IAM on the service account is how the pod calls AWS.",
      "CloudWatch for logs and metrics. An alarm on error rate and on disk.",
      "CloudTrail is the audit of API calls. Useful when someone changes a security group.",
    ],
    "You do not need Lambda, API Gateway, and Route53 in week one. Add them when the design needs them.",
    "Putting the AWS key in the container environment.",
    "What is the difference between CloudWatch and CloudTrail?",
    "Write the alarm you would want on the diagnostics agent: error rate and token cost.",
  ),
  topic(
    "Kubernetes",
    "docker",
    "Docker, then the cluster",
    "30 min",
    "An image is the unit you ship. If the container does not run on your laptop, Kubernetes will not save it.",
    `flowchart LR
  Jar --> Image
  Image --> Run
  Run --> Logs`,
    ["One process per container", "Config by environment", "A health URL", "Non-root user"],
    [
      "Dockerfile: build the jar, copy it, expose the port, start the process.",
      "Do not bake secrets into the image.",
      "docker compose for Postgres and the app is the local rehearsal.",
    ],
    "HEALTHCHECK or a /health route the orchestrator can call.",
    "A container that works only because it uses your laptop's files.",
    "What is in the image, and what is not?",
    "Run the Spring service in Docker before you read another Kubernetes page.",
  ),
  topic(
    "Kubernetes",
    "objects",
    "Deployment, Service, probes, HPA",
    "40 min",
    "CKAD is a hands-on exam and it is relevant later. It is not how you learn. These objects are how you learn.",
    `flowchart TD
  Deploy[Deployment] --> Pods
  Svc[Service] --> Pods
  Probe[Probes] --> Pods
  HPA --> Deploy`,
    ["Deployment keeps N pods", "Service is the stable address", "Readiness is traffic", "Liveness is restart"],
    [
      "Deployment declares the desired count and the image.",
      "Service selects pods by label. Ingress or a load balancer is the door from outside.",
      "Readiness false means leave me alone. Liveness false means restart me. Mixing them up causes outages.",
      "HPA scales on CPU or a custom metric. It does not fix a memory leak.",
    ],
    "CKAD order: Docker, these objects, ConfigMap and Secret, RBAC, volumes, Helm, then the exam.",
    "Using liveness to check a downstream dependency, so a database blip restarts every pod.",
    "Why did this pod restart, and why did it stop receiving traffic?",
    "Write a Deployment and a Service for the FastAPI chunk service. Apply it locally if you have a cluster, or kind.",
  ),
  topic(
    "Kubernetes",
    "config-helm",
    "Config, RBAC, Helm, then CKAD",
    "30 min",
    "You already touch OpenShift at work. The public skill is the same objects with names you can explain, then Helm to stop copying YAML, then CKAD as proof.",
    `flowchart LR
  YAML --> Helm
  Helm --> Cluster
  RBAC --> Helm
  Practice --> CKAD`,
    ["ConfigMap for settings", "Secret for credentials", "RBAC is least privilege", "CKAD after you can debug"],
    [
      "A ConfigMap changes the log level without a new image.",
      "A Secret is not encryption by itself. You still restrict who can get secrets.",
      "A Role that can only get and list pods in one namespace is the agent's read identity.",
      "Book CKAD when you can fix a CrashLoopBackOff without notes. Not this month.",
    ],
    "kubectl logs, describe, and get events. That is the debug loop.",
    "cluster-admin on the agent service account.",
    "The pod is CrashLoopBackOff. What do you type first?",
    "Break a probe on purpose and fix it with describe.",
  ),
  topic(
    "Python",
    "python-path",
    "Python through FastAPI",
    "30 min",
    "You do not need to become a Python developer. You need to read and write the agent service: types, tests, HTTP, and async where the HTTP library is async.",
    `flowchart LR
  Syntax --> Collections
  Collections --> Typing
  Typing --> Pytest
  Pytest --> FastAPI
  FastAPI --> Pydantic`,
    ["Functions and dicts", "Type hints", "One pytest", "One POST endpoint"],
    [
      "venv and pip. Pin requirements. Do not install into the system Python.",
      "httpx or requests for the Java API. Pydantic for the body.",
      "SQLAlchemy only if this service owns tables. Otherwise call the Java service.",
      "asyncio matters when you wait on the model and the vector store together. Not before.",
    ],
    `def retrieve(question: str) -> list[str]:
    return index.search(question, k=3)`,
    "A 40-hour syntax course before a single endpoint exists.",
    "Show a typed function and a test.",
    "This week's Python is one file: read three markdown runbooks and return the overlapping lines.",
  ),
  topic(
    "AI",
    "llm-basics",
    "Tokens, embeddings, retrieval",
    "30 min",
    "The engineering under the API. You should be able to say why a long log does not fit, and why similar vectors are not the same as a keyword match.",
    `flowchart LR
  Text --> Tokens
  Tokens --> Window[Context window]
  Text --> Embed
  Embed --> Near[Nearest chunks]`,
    ["Tokens cost money and space", "Temperature is randomness", "Embeddings are coordinates", "Retrieval is nearest chunks"],
    [
      "A context window is finite. You retrieve a few chunks instead of pasting the cluster.",
      "Temperature low for a root-cause draft. Higher only if you want variety, which you usually do not.",
      "Chunk on headings and size with overlap. Write down why you picked the size.",
    ],
    "Structured output: ask for JSON with cause, evidence, action. Validate it. If it fails, retry once.",
    "Turning the temperature up to make a diagnosis more creative.",
    "Why not send the whole log to the model?",
    "Count tokens on one synthetic log. Write the number in the README.",
  ),
  topic(
    "AI",
    "rag-pipeline",
    "Production RAG",
    "40 min",
    "The pipeline is the product. A chat box without ingestion, citations, and an eval set is the project you were told not to build.",
    `flowchart TD
  Docs --> Chunk --> Embed --> Store
  Question --> Retrieve --> Rerank --> Prompt --> LLM --> Cite
  Cite --> Eval`,
    ["Ingest offline", "Retrieve", "Rerank if you need it", "Cite", "Score 20 questions"],
    [
      "Ingestion: clean text, chunk, embed, store with the source id.",
      "Query: embed the question, fetch top K, optionally rerank, build the prompt, call the model.",
      "The answer lists chunk ids. The eval set checks those facts.",
      "Streaming is a nicer UI. It does not fix a bad index.",
    ],
    "If the index has no chunk about quota, the answer is I do not have that record.",
    "Chat with PDF as the whole portfolio.",
    "How do you measure whether retrieval got worse?",
    "Create the 20-question file before you pick a vector database.",
  ),
  topic(
    "AI",
    "agents-mcp",
    "Agents, MCP, evals, and safety",
    "40 min",
    "An agent is a loop with tools, state, and a stop condition. MCP is a way to expose tools. Neither removes the need for permissions, traces, and a test set.",
    `flowchart TD
  Goal --> Plan
  Plan --> Tool
  Tool --> State
  State --> Stop{Done or limit?}
  Stop -->|no| Plan
  Stop -->|yes| Answer`,
    ["Allow-list the tools", "Cap the steps", "Trace each call", "Eval the task not the vibe"],
    [
      "State is the messages plus tool results. Memory across sessions is a database, not a hope.",
      "Timeouts, retries on reads, no retry on an unsafe write.",
      "Prompt injection: untrusted logs are data, not instructions. The system prompt says so, and the write tool is not available to that call.",
      "MCP lets a client discover tools. Your policy still decides which tools exist for this user.",
    ],
    "Max 8 tool calls. Then the agent must answer or ask a human.",
    "An agent with a shell tool on a cluster.",
    "How do you make an agent safe enough for production?",
    "List read tools and write tools for the storage platform. Only the second list needs approval.",
  ),
  topic(
    "Go",
    "read-go",
    "Go after the offer, at reading depth",
    "20 min",
    "Apple storage and Cisco distributed roles mention Go beside Java. That is a reason to read Go, not a reason to pause Java. After the switch, one small service is enough.",
    `flowchart LR
  Now[Now Java] --> Offer
  Offer --> Read[Read Go handlers]
  Read --> Write[One small service]`,
    ["Do not context-switch this winter", "After April, read net/http", "Goroutines are the concurrency primitive", "Errors are values"],
    [
      "A handler, a struct, and an error return are the first page.",
      "You do not start with a framework tour.",
      "Storage-infrastructure posts want Linux, Kubernetes, and a language. Your storage stories plus Java already qualify you to talk. Go is the gap you close on the job.",
    ],
    "func (s *Server) GetBucket(w http.ResponseWriter, r *http.Request)",
    "Rewriting the flagship in Go in November.",
    "What will you learn in Go, and when?",
    "Add a single line to the April plan: read one Go HTTP file a week. Not before.",
  ),
];
