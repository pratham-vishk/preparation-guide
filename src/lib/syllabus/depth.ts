import type { Lesson } from "./types.ts";

export const depthLessons: Record<string, Lesson[]> = {
  hashmap: [
    {
      title: "What you say",
      body: "A HashMap is an array of buckets. The key's hash selects the bucket. Inside the bucket, equals finds the entry. A bad hashCode puts everything in one bucket and the map becomes a list. When the load grows, the table resizes and rehashes. ConcurrentHashMap does not lock the whole map for a read. A plain HashMap is not safe for two writers.",
      code: `public final class Key {
    private final String id;
    public boolean equals(Object other) {
        return other instanceof Key key && id.equals(key.id);
    }
    public int hashCode() { return id.hashCode(); }
}`,
    },
    {
      title: "equals and the bucket",
      body: "Equal keys must share a hashCode, or the lookup looks in the wrong bucket and returns null. Mutable keys move buckets after insertion. Use an immutable key. TreeMap is ordered and logarithmic. HashMap is expected constant time and unordered. Say which one you picked and the cost.",
    },
  ],
  collections: [
    {
      title: "The choice",
      body: "ArrayList for indexed reads. LinkedList almost never in interview code. HashSet for membership. TreeSet when you need order. ArrayDeque as a stack or queue. PriorityQueue as a heap. ConcurrentHashMap when two threads share the map. Name the operation you do most, then the structure.",
    },
  ],
  concurrency: [
    {
      title: "Where the work runs",
      body: "A thread pool has a bound. An unbounded queue in front of a pool will eat the heap. CompletableFuture.supplyAsync uses the common pool unless you pass an executor. Do not block that pool on JDBC. Compose with thenCompose, handle the exception with exceptionally, and time out. A Future you never cancel is a leak of attention. Your Dell async work is this paragraph with a real pool size and a real failure.",
      code: `CompletableFuture
    .supplyAsync(() -> load(bucket), ioPool)
    .orTimeout(2, TimeUnit.SECONDS)
    .exceptionally(error -> fallback(bucket));`,
    },
  ],
  jmm: [
    {
      title: "Visibility and exclusion",
      body: "volatile makes a write visible to a later read. It does not make a check-then-act atomic. synchronized or a Lock gives exclusion. AtomicInteger gives an atomic increment. A deadlock needs two locks and two orders. Take locks in one global order, or do not take two. Say the race in a sentence: two threads read the tokens, both decrement, the bucket goes negative.",
    },
  ],
  ioc: [
    {
      title: "The proxy",
      body: "Spring builds the objects and injects them. @Transactional works because a proxy wraps the bean. A call from inside the same class does not pass the proxy, so the transaction annotation is ignored. The bean lifecycle is construction, dependency injection, init, use, destroy. Auto-configuration creates beans when a class is on the classpath and you did not define your own.",
    },
  ],
  transactions: [
    {
      title: "Propagation and isolation",
      body: "REQUIRED joins the current transaction or starts one. REQUIRES_NEW suspends the current one. A failure in the inner new transaction does not, by itself, roll back the outer one. Default isolation on Postgres is read committed. A lost update needs a version or a lock. Rollback happens on a runtime exception. A checked exception needs rollbackFor. Say the boundary: the business row and the outbox row share one transaction.",
    },
  ],
  jpa: [
    {
      title: "The queries you did not write",
      body: "A lazy list inside a loop issues one select per parent. That is N+1. Fix it with a fetch join or a batch. Eager on everything loads the graph. Optimistic locking throws on a version mismatch. Pessimistic locking holds the row. Open-session-in-view hides the N+1 until serialization. Turn SQL logging on for the test and count the selects.",
    },
  ],
  "kafka-why": [
    {
      title: "The decision",
      body: "Use Kafka when several consumers need the same fact, when a slow consumer must not stop the writer, or when you may replay. Use REST when the caller needs the answer in this request. Ordering is per key. The key is bucket id if one bucket's events must stay ordered. Retention lets the RCA agent read yesterday. A topic is not a command bus for a synchronous user click.",
    },
  ],
  "kafka-failure": [
    {
      title: "The crash",
      body: "The consumer writes the database, then crashes before commit. The message is delivered again. The handler sees the idempotency key and skips. That is at-least-once. Committing before the work loses the message. A poison payload goes to a dead-letter topic after a small number of tries. A down dependency uses backoff, not an infinite loop. Offset order is the order you commit, so do not commit a later offset and skip a failed earlier one unless you have recorded the skip.",
    },
  ],
  outbox: [
    {
      title: "One transaction",
      body: "The service inserts the business row and an outbox row in one database transaction. A relay reads unpublished outbox rows and sends them to Kafka, then marks them sent. If the process dies after commit and before send, the row is still there and the relay retries. Kafka can still duplicate, so the consumer stays idempotent. This is the project milestone for 25 October.",
    },
  ],
  redis: [
    {
      title: "Three uses, one rule",
      body: "Cache: bucket metadata with a TTL, cache-aside, delete on write. Rate limit: a counter or a token field with a TTL. Agent session: a short-lived JSON blob keyed by the conversation, not the system of record. Eviction can drop any of these. Postgres still has the bucket. A lock in Redis needs a token and an expiry so a dead owner does not hold it forever. Persistence is optional. Do not describe Redis as the ledger.",
    },
  ],
  "security-observability": [
    {
      title: "Who calls, and what you do when the next hop is sick",
      body: "JWT is a signed claim. Validate the signature, the expiry, and the audience. OAuth is how the token was issued. The resource server checks the token. It does not ask the user for a password. Resilience: a timeout, a small retry on idempotent calls, a circuit breaker when the dependency is failing fast, and a fallback you can explain. Actuator opens health and metrics. The correlation id ties the log to the trace.",
    },
  ],
  "iam-vpc": [
    {
      title: "Draw this before SAA",
      body: "A VPC. Public subnets for the load balancer. Private subnets for the tasks and the database. A NAT gateway if private tasks call the internet. Security groups are stateful allow-lists. IAM policies allow the task role to read one bucket and one secret. Nothing else. Cloud Practitioner does not teach this at the depth a backend loop expects. SAA is the credential after you can draw it from memory.",
    },
  ],
  "data-plane": [
    {
      title: "Which store",
      body: "S3 holds bytes: synthetic objects, log batches. It is durable and the request pays per call. RDS Postgres holds metadata and the outbox, with transactions. DynamoDB is for a key-value access pattern with a scale you can explain. Do not add it beside Postgres without a reason. ElastiCache is Redis. SQS is the simple queue. The project uses Kafka for the replayable log and can use SQS where replay does not matter.",
    },
  ],
  "eks-observe": [
    {
      title: "What you deploy",
      body: "The image is in ECR. EKS runs the Deployment. CloudWatch holds logs and metrics. CloudTrail holds API calls such as who changed a security group. Alarms fire on error rate and on disk. The agent reads the same metrics. You can describe this without having the production account on day one. A local cluster plus a diagram is an honest version of the story until the apply happens.",
    },
  ],
  docker: [
    {
      title: "The image",
      body: "A Dockerfile copies the jar or the venv and sets the user, the port, and the command. The image runs on your laptop with the same env the cluster will use. A health check is in the app, not only in Docker. Compose brings up Postgres, Kafka, Redis, and the two apps for the November milestone. If it does not run here, Kubernetes will not repair the image.",
    },
  ],
  objects: [
    {
      title: "What you debug",
      body: "A Deployment keeps replicas. A Service selects pods by label and maps a port. A probe failure restarts the container or removes it from the Service. Readiness false means the pod is up and should not receive traffic. Liveness false means restart it. HPA adds pods from CPU or from a custom metric such as queue lag. CrashLoopBackOff means you read the previous log, not that you delete the pod in a loop.",
    },
  ],
  "config-helm": [
    {
      title: "Then the exam",
      body: "ConfigMap is config. Secret is a credential, still not a place for a committed password in git. RBAC limits what the agent service account can do. A volume holds a scratch disk if you need one. Helm templates the manifests so the laptop and the cluster differ by values. CKAD is a timed performance exam over these objects. Book it after you can fix a crashing pod without notes.",
    },
  ],
  "python-path": [
    {
      title: "The sequence",
      body: "Syntax, collections, functions, classes, venv, pip, typing, requests. Then pytest, httpx, asyncio where the client is async, FastAPI, Pydantic, and SQLAlchemy only if Python reads the database. Docker last in this list so the image wraps a service that already runs. The detailed lessons are Syntax and collections, and FastAPI, Pydantic, SQLAlchemy.",
    },
  ],
  "llm-basics": [
    {
      title: "The words you must own",
      body: "Tokens are the model's units, not words. The context window is the budget for the prompt, the retrieved text, and the answer. Temperature and sampling change variety, not truth. Embeddings place texts in a vector space. Similarity is not a keyword match and not a citation. Structured output is a schema you validate. Tool calling is the model asking your code to run a function you defined. Streaming is how tokens arrive. A long log is chunked because it does not fit.",
    },
  ],
  "rag-pipeline": [
    {
      title: "The pipeline",
      body: "Ingest synthetic incidents. Chunk on paragraph or a fixed size with overlap, and write down why. Embed the chunks. Store them in a vector index with the incident id. Retrieve more than you need, rerank, then put the winners in the prompt with ids. The model answers with those ids as citations. The eval set is questions with expected ids. A wrong citation fails the test. This is the December milestone: ten questions, a score in the README.",
    },
  ],
  "agents-mcp": [
    {
      title: "A safe agent",
      body: "An agent is a loop: state, a model, tools, a stop. Tools are allow-listed. A tool that changes the cluster requires a human approval, a timeout, a retry policy, and an idempotency key. MCP is a protocol for exposing those tools. It does not grant judgment. Traces show each tool call. Evals include a case where the tool should not be called. Prompt injection and data leakage are in the threat list: the incident text is untrusted, and the tool cannot read secrets it does not need.",
    },
  ],
  "url-shortener": [
    {
      title: "Walk it",
      body: "Create returns a short id. Read redirects. The id is random or a counter encoded in base 62. Reads dominate, so a cache sits in front. The database is the source. A collision retries. Analytics are an async event, not a write on the redirect path. Estimate: reads per second, row size, cache hit ratio. That estimate is a practice, and you say the assumptions.",
    },
  ],
  "rate-limiter": [
    {
      title: "Walk it",
      body: "Token bucket: tokens refill with time, a request takes one. Sliding window counts requests in the last N seconds. Store the counter in Redis so every app instance sees it. The key is the client. Failure of Redis is a product decision: fail open to keep the site up, or fail closed to keep a limit. Say which, for this API. The LLD lesson is the same limiter as classes.",
    },
  ],
  notification: [
    {
      title: "Walk it",
      body: "A request writes a notification row and an outbox row. Workers send email, push, or webhook. Each send has a provider id so retries do not double-send. A dead letter holds addresses that bounce. Fanout to many devices is a queue, not a loop in the request. Idempotency is the provider key plus the notification id.",
    },
  ],
  "file-storage": [
    {
      title: "Walk it",
      body: "Bytes go to object storage in parts. Metadata and the part list go to Postgres. Complete assembles the object. A presigned URL lets the client upload without proxying the bytes through your app. This is the flagship's storage, synthetic. Dedup and encryption are sentences if time remains. The metadata write and the event use the outbox.",
    },
  ],
  "rag-design": [
    {
      title: "Walk it",
      body: "The design answer is the pipeline plus failure: the model can be down, the retrieval can be empty, the citation can be wrong. Empty retrieval returns 'I do not have that' rather than a fluent guess. The eval set is part of the design, not a follow-up. Cost is a metric: tokens in, tokens out.",
    },
  ],
  "agent-platform": [
    {
      title: "Walk it",
      body: "An orchestrator holds state. Specialist agents read logs, metrics, or config. A tool executor checks an allow-list and a human approval for anything that mutates. Every call has a timeout and a trace id. The platform is the project. In a design interview you draw the gate before you draw a second model.",
    },
  ],
  "read-go": [
    {
      title: "What reading Go means",
      body: "After the offer, read a small service: package main, an HTTP handler, error returns instead of exceptions, goroutines, and a context cancellation. You can write a health endpoint. You do not start a Go curriculum in October. Java remains the language you solve the medium in.",
      code: `func health(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    _, _ = w.Write([]byte("ok"))
}`,
    },
  ],
  flagship: [
    {
      title: "What the README must show",
      body: "A stranger can run the synthetic cluster with Compose. The Java service owns buckets, events, and the outbox. The Python service answers a latency question with evidence ids. A mutation is proposed, approved, executed, and checked. The eval score is a number. No Dell data, no Dell code, no customer names.",
    },
  ],
  "debugger-agent": [
    {
      title: "The procedure",
      body: "Question: why is bucket latency high? Collect the latency metric, the slow request ids, the traces, and the recent error logs. Correlate on bucket id and time. Name a likely cause and the evidence. Recommend an action. Do not take the action. If the evidence is thin, say so. The eval asks for the evidence ids, not for a poetic root cause.",
    },
  ],
  "capacity-agent": [
    {
      title: "The forecast you can defend",
      body: "Read used bytes over time. Fit a simple trend. State the assumption: the last seven days continue. Answer whether the series crosses 80 percent inside the horizon. Recommend a scale step. A fake history in the repo is enough. A learned model is not required. The interview line is the assumption, not the library.",
    },
  ],
  "rca-agent": [
    {
      title: "Retrieval with a job",
      body: "Input is an incident id. Load its logs. Retrieve similar synthetic incidents and postmortems. Answer with a suspected cause, a fix, and the ids you used. A missing citation fails the eval. Similar PRs, if you include them, are public or synthetic patches, not internal diffs.",
    },
  ],
  "safe-executor": [
    {
      title: "The gate",
      body: "The model proposes a tool call. The API stores the proposal as pending. A person approves. The executor runs the allow-listed tool with a timeout and an idempotency key. A verifier reads the metric or the config and records whether the change happened. A second approval does not double-apply. Denial is a recorded state. This is the January milestone.",
    },
  ],
};
