import { topic } from "./types.ts";

export const stackTopics = [
  topic(
    "Java",
    "streams-generics",
    "Streams, generics, Optional, immutability",
    "40 min",
    "This is the Java you use and then fail to explain. The questions are small and they sort people who only remember syntax.",
    `flowchart LR
  Source --> Filter --> Map --> Collect
  Type[Generic type] --> Erase[Erased at runtime]
  Value --> Optional`,
    ["Streams are pipelines, not loops with style", "Type erasure is real", "Optional is a return type", "A record is the immutable carrier"],
    [
      "A stream does not run until a terminal operation. map and filter are lazy. A stream is used once.",
      "Generics erase to Object. You cannot new T() or check instanceof T. A wildcard ? extends is for reading, ? super is for writing.",
      "Optional.ofNullable at a boundary. Do not pass Optional into fields and collections.",
      "equals and hashCode stay a pair. A record gives you both, and an immutable value.",
    ],
    `List<String> names = items.stream()
    .map(Item::name)
    .filter(name -> !name.isBlank())
    .toList();`,
    "Using Optional.get() because the IDE suggested it.",
    "Why can two objects be equal and land in different HashMap buckets?",
    "Rewrite one loop in the project as a stream, then say what the terminal operation is.",
    undefined,
    [
      {
        title: "Streams",
        body: "Intermediate operations build a pipeline. The terminal operation pulls values. forEach is a terminal that gives you nothing back. Collect or toList is the one you want. Parallel streams on a small list, or on a stream that touches JDBC, are a performance bug. Say: I keep streams sequential unless I have measured a CPU-bound pure function.",
      },
      {
        title: "Generics and Optional",
        body: "List<String> is List at runtime. That is why a raw list can be polluted. PECS: producer extends, consumer super. Optional expresses a missing return. orElse throws away a costly default because it evaluates the argument. orElseGet takes a supplier. Empty optionals in a field hide the real model. Use a nullable only at the edge, and Optional as the return.",
      },
      {
        title: "equals, hashCode, immutability",
        body: "If equals says two keys are the same, hashCode must match, or HashMap loses the entry. Mutable keys change the bucket after insertion. Prefer a record for a key or a request. Defensive copy a list you store. Immutability is how you stop a caller from changing the event you already published.",
      },
    ],
  ),
  topic(
    "Java",
    "jvm-gc",
    "JVM, stack, heap, and GC",
    "30 min",
    "You need a clear story, not a collector catalog. Interviewers ask where an object lives and what a pause is.",
    `flowchart TD
  Thread --> Stack[Stack frames]
  New[new] --> Heap
  Heap --> Young[Young generation]
  Young --> Old[Old generation]
  Old --> Pause[A pause while GC runs]`,
    ["Stack is the frame", "Heap is the objects", "GC reclaims unreachable objects", "A pause is latency"],
    [
      "Local variables and calls live on the stack. Objects and arrays live on the heap.",
      "A leak in a server is usually a collection that grows: a static map, a listener, an unbounded queue.",
      "Generational GC collects young garbage often. A long-lived cache belongs in a bounded structure with eviction, not in the hope that GC will save you.",
      "You look at a heap dump or at least at live set and pause time before you change flags.",
    ],
    `OutOfMemoryError: Java heap space
First question: which collection grew?
Second: is the cache bounded?`,
    "Adding -Xmx until the box dies, without finding the collection.",
    "Where does a HashMap entry live, and what makes it unreachable?",
    "Name one structure in the project that must have a max size.",
    undefined,
    [
      {
        title: "The story in four sentences",
        body: "Each thread has a stack. new allocates on the heap. When no thread can reach an object, GC can reclaim it. A stop-the-world pause freezes application threads so the collector can move or mark memory, and that pause shows up as latency. Modern collectors shorten the pause. They do not make an unbounded cache correct.",
      },
      {
        title: "What you refuse to pretend",
        body: "You do not tune G1 versus ZGC from memory in an interview. You say what you would measure: allocation rate, pause time, and the dominator in a heap dump. For this project the bounded structures are the rate-limit map, the agent session in Redis, and the Kafka consumer's in-flight count.",
      },
    ],
  ),
  topic(
    "Spring",
    "rest-errors",
    "REST, validation, and one error shape",
    "35 min",
    "A senior backend answer includes the status code, the body, and what the client can retry. Annotations are the implementation.",
    `flowchart TD
  Req[Request] --> Valid[Bean validation]
  Valid -->|fail| E400[400 problem]
  Valid --> Method
  Method -->|not found| E404
  Method -->|conflict| E409
  Method -->|bug| E500`,
    ["Validate at the boundary", "One error JSON", "409 for an idempotency conflict", "Do not leak stack traces"],
    [
      "Controller methods take a DTO. Bean validation annotations reject a blank bucket id before the service runs.",
      "A @ControllerAdvice maps exceptions to a problem body: code, message, request id. The client never sees a stack.",
      "POST that creates is 201 with a location, or 200 on an idempotent replay. A bad id is 404. A version clash is 409.",
      "Pagination is limit and cursor, not an unbounded list.",
    ],
    `{
  "code": "bucket_not_found",
  "message": "No bucket b1",
  "requestId": "9f2c"
}`,
    "Returning 200 with {success:false} for every failure.",
    "The same idempotency key arrives with a different body. What status?",
    "Add one @ControllerAdvice to the project and one test that expects 400.",
    undefined,
    [
      {
        title: "The contract",
        body: "Resources are nouns. GET is safe. PUT replaces. POST creates or starts a command. A command that must not run twice takes an Idempotency-Key header. Validation errors are 400 with the field name. Authentication is 401. Authorization is 403. You already know the words. The interview is whether the API you design uses them consistently.",
      },
      {
        title: "Exceptions",
        body: "The service throws a domain exception. The advice translates it. A catch that logs and returns null hides the failure from the client and from the metric. Checked exceptions in a Spring service are usually noise. A transaction rolls back on a runtime exception. Say that when they ask what happens if the handler throws.",
      },
    ],
  ),
  topic(
    "Spring",
    "testing",
    "Tests that protect the interview story",
    "30 min",
    "The tests worth writing are the ones you will mention: idempotency, the outbox commit, and the N+1 you already fixed.",
    `flowchart LR
  Unit[Pure function] --> Slice[Web or data slice]
  Slice --> IT[One integration test]
  IT --> CI[Runs on every push]`,
    ["Test the behavior you claim", "One database test for the outbox", "Mock the agent, not the transaction", "A red test before the fix"],
    [
      "A unit test covers the token bucket math with a fake clock.",
      "A data test starts Postgres, writes the business row and the outbox row, and asserts both exist or neither does.",
      "A web test sends the same Idempotency-Key twice and asserts one row.",
      "Do not mock the repository and then claim you tested the transaction.",
    ],
    `@Test
void replayDoesNotCreateASecondBucket() {
    api.create(key, body);
    api.create(key, body);
    assertEquals(1, buckets.count());
}`,
    "A hundred controller tests that only check 200.",
    "Which test would fail if the outbox write left the transaction?",
    "Add that one test name to the README, even before it passes.",
    undefined,
    [
      {
        title: "The pyramid for this project",
        body: "Most tests are plain JUnit on pure code: refill math, partition-key choice, prompt assembly. A few tests use the database because the bug lives in the transaction. One test calls the agent with a fake model so the eval set runs without a bill. CI runs them. A test you cannot run on the laptop is a demo, not a test.",
      },
      {
        title: "What interviewers listen for",
        body: "They ask how you knew the fix worked. The answer is a failing test that reproduced the duplicate, then the constraint or the idempotency lookup that made it pass. That story beats a coverage percentage.",
      },
    ],
  ),
  topic(
    "Cloud",
    "compute",
    "EC2, ALB, autoscaling, ECS, EKS",
    "35 min",
    "Compute is where the process runs. You pick it after you know the network, not before.",
    `flowchart LR
  User --> ALB
  ALB --> Task[Task or pod]
  ASG[Auto Scaling] --> Task
  Task --> RDS`,
    ["ALB checks health", "Scale on a signal", "ECS is tasks", "EKS is Kubernetes"],
    [
      "EC2 is a virtual machine. You patch it. A private subnet holds the app. A public subnet holds the load balancer.",
      "An ALB routes HTTP and checks a health path. Unhealthy targets leave rotation.",
      "Auto Scaling adds instances from a signal: CPU, request count, or queue depth. Queue depth is the honest signal for workers.",
      "ECS runs containers without you managing the control plane. EKS is Kubernetes. Use EKS if the interview story is the Kubernetes one you are already learning. Do not run both for the project.",
    ],
    `Health check: GET /actuator/health
Unhealthy for three checks, then the target is out.
The pod or task restarts. The ALB does not send it traffic until it is healthy.`,
    "Scaling on CPU while the bottleneck is a full connection pool.",
    "Why would you scale the consumer on queue lag instead of CPU?",
    "Write the health path and the one metric that should add a worker.",
    undefined,
    [
      {
        title: "The path of a request",
        body: "DNS names the ALB. The ALB is in public subnets. The target is a pod or task in private subnets. The security group on the target allows the app port only from the ALB's security group. The target calls RDS on 5432, and RDS allows that security group. If you can draw those four boxes, you can answer most of the compute section of an SAA-style question.",
      },
      {
        title: "ECS or EKS",
        body: "ECS is the smaller operational surface. EKS is the one that matches CKAD and your OpenShift work. Pick EKS for the flagship so the story stays one story. Say the trade: you operate more of Kubernetes, and you keep the skills the backend roles asked for.",
      },
    ],
  ),
  topic(
    "Cloud",
    "integration",
    "SQS, SNS, Lambda, API Gateway",
    "30 min",
    "AWS messaging is the managed version of the event story. Kafka remains the project log. SQS is the simpler queue when you do not need replay.",
    `flowchart LR
  API[API Gateway] --> Lambda
  Lambda --> SQS
  SNS --> SQS
  SQS --> Worker`,
    ["SQS is a queue", "SNS is fanout", "Lambda is a small function", "API Gateway is the front door"],
    [
      "SQS: at-least-once, visibility timeout, dead-letter queue. The handler is idempotent. A message returns if you do not delete it.",
      "SNS: one publish, many subscribers. Use it to fan out. Use SQS behind a subscriber when that subscriber must buffer.",
      "Lambda fits a short transform. A long agent loop does not belong in a 15-minute function with a cold start you have not measured.",
      "API Gateway terminates HTTP and can authorize. For the project, the ALB in front of Spring is enough until you have a reason.",
    ],
    `Visibility timeout 30s.
Handler finishes in 5s and deletes.
If the handler dies, the message reappears.
The second run sees the idempotency key.`,
    "Using Lambda because the diagram looked modern.",
    "SQS delivered the same message twice. What in your code makes that safe?",
    "On paper, which project event is Kafka and which could be SQS, and why.",
    undefined,
    [
      {
        title: "When SQS is the right box",
        body: "You need a buffer and a worker, you do not need to replay a year of events, and you do not need order across a key for the long term. Object-created notifications can land on SQS. The diagnostics stream that you want to replay belongs on Kafka. Say that distinction. It is the senior answer.",
      },
      {
        title: "Lambda limits",
        body: "A function is stateless, time-boxed, and billed in memory-time. It is a good fit for a thumbnail or a webhook ack. The agent that calls tools, waits for a human, and writes an audit row is a service. Put it in the FastAPI process you already planned.",
      },
    ],
  ),
  topic(
    "Cloud",
    "security-edge",
    "KMS, secrets, ECR, Route 53",
    "25 min",
    "The security half of AWS is who can call, where the secret lives, and how the image got there.",
    `flowchart LR
  DNS[Route 53] --> ALB
  ECR --> Cluster
  Secret[Secrets Manager] --> Pod
  KMS --> Secret`,
    ["IAM role on the pod", "Secrets are not env files in git", "ECR holds the image", "KMS wraps the key"],
    [
      "A pod uses an IAM role. Long-lived access keys on a laptop are for the experiment, then they go away.",
      "Secrets Manager or SSM holds the database password. The manifest references the secret. The git repo does not.",
      "ECR stores the image. The cluster pulls it. Scan it. Pin the tag you deployed.",
      "KMS encrypts S3, RDS, and the secret. Rotation is a feature you can name.",
      "Route 53 maps the name to the load balancer. A health check removes a bad region later, not in version one.",
    ],
    `The repo contains a secret name.
The cluster injects the value.
git log never shows the password.`,
    "Committing an AWS key because the demo was on Friday.",
    "How does the pod reach S3 without an access key in the image?",
    "Check the project for a password in a file. Move the name into a note, not the value.",
    undefined,
    [
      {
        title: "Identity",
        body: "IAM decides. A policy allows s3:GetObject on one bucket. The pod assumes a role through the cluster's identity mechanism. A human uses a role too. Root is not a daily login. CloudTrail records the calls. That is the security story that pairs with the agent: the tool the agent can call is a role with a short list of actions, not an admin key.",
      },
      {
        title: "Images and names",
        body: "You build a jar, then an image, then you push to ECR. The Deployment pins the digest or the tag you just pushed. Route 53 is only the name the laptop uses to reach the ALB. None of these require the Cloud Practitioner exam.",
      },
    ],
  ),
  topic(
    "Python",
    "syntax-collections",
    "Python syntax and collections",
    "30 min",
    "Phase 1, inside the 30-minute block. You need to read and write the agent without translating every line from Java in your head.",
    `flowchart LR
  Types[int str list dict] --> Func[Functions]
  Func --> Class[A small class]
  Class --> Venv[venv and pip]`,
    ["Indentation is syntax", "list, dict, set", "A function can return several values", "venv keeps the agent separate"],
    [
      "Lists are ordered. Dicts keep insertion order. Sets are for membership. A tuple is a fixed record.",
      "def ask(bucket: str) -> str is the shape. Type hints are for you and the tools. They are not enforced at runtime unless you add that.",
      "python -m venv .venv and pip install -r requirements.txt. The system Python stays alone.",
      "Classes exist. You do not need a class for every function. A dataclass carries a tool result.",
    ],
    `def allow(client: str, now: float) -> bool:
    bucket = buckets.get(client)
    return bucket is not None and bucket.tokens > 0`,
    "Installing packages into the global interpreter and then wondering why the laptop and CI differ.",
    "What is the difference between a list and a tuple here?",
    "Create the agent folder, a venv, and a function that returns a fake diagnosis.",
    undefined,
    [
      {
        title: "The differences that bite a Java developer",
        body: "There is no compile step that saves you. None is not a null you can call methods on. A default argument that is a list is shared across calls. Use None and create the list inside the function. Integer division is not the Java division you remember: 7 / 2 is 3.5, 7 // 2 is 3. Imports are files. if __name__ == '__main__' is how a script stays importable.",
      },
      {
        title: "What phase 1 includes",
        body: "Syntax, collections, functions, a class, venv, pip, typing, and requests or httpx calling your Java health endpoint. pytest comes as soon as the function exists. That is the whole month. FastAPI waits until the Java API exists to call.",
      },
    ],
  ),
  topic(
    "Python",
    "fastapi-data",
    "FastAPI, Pydantic, SQLAlchemy",
    "40 min",
    "The agent service is a small Python web app. This is phase 3, after you can call HTTP from a script.",
    `flowchart LR
  Body[JSON body] --> Pyd[Pydantic]
  Pyd --> Route[FastAPI route]
  Route --> Tool[Tool call]
  Route --> DB[SQLAlchemy session]`,
    ["Pydantic validates the body", "The route stays thin", "A session opens and closes", "pytest hits the route"],
    [
      "A Pydantic model is the request and the response. Validation errors return 422.",
      "The route calls a function. The function calls tools. The route does not embed a prompt the size of a file.",
      "SQLAlchemy session is a unit of work. Close it. Do not keep a global session.",
      "Async is for the HTTP client that is async. Do not mark every function async out of habit.",
    ],
    `@app.post("/diagnose")
def diagnose(body: Question) -> Answer:
    evidence = tools.metrics(body.bucket_id)
    return Answer(text=draft(evidence), evidence=evidence)`,
    "A route that opens a model client, a database, and a prompt, all inline.",
    "Where is the prompt, and how do you test the route without paying for a model?",
    "Add the diagnose route with a fake model and one pytest.",
    undefined,
    [
      {
        title: "The shape of the service",
        body: "FastAPI gives you HTTP and documentation. Pydantic gives you types at the boundary. SQLAlchemy is only there if the agent reads Postgres itself. It can also call the Java API and stay free of a second schema. Prefer calling Java for writes. Python may read for retrieval. Two writers to the same tables will produce a bug you will have to explain in the interview.",
      },
      {
        title: "Async and tests",
        body: "httpx.AsyncClient is worth async. A CPU-bound loop is not. pytest with TestClient calls the route in-process. The fake model returns a fixed answer so the test checks that evidence ids are passed through. That test is part of the eval story.",
      },
    ],
  ),
  topic(
    "Design",
    "distributed-cache",
    "Distributed cache",
    "40 min",
    "Cache is a design on its own because freshness, stampedes, and failure are the whole question.",
    `flowchart TD
  Client --> App
  App --> Cache{Hit?}
  Cache -->|yes| Client
  Cache -->|no| DB
  DB --> Fill[Fill cache]
  Fill --> Client`,
    ["Cache aside", "TTL matches the tolerance", "Single-flight on a miss", "Redis down has a decision"],
    [
      "Requirements: read-heavy bucket metadata, 5 minutes of staleness is acceptable, writes are rare.",
      "Scale: state the read QPS and the row size. The cache holds the hot set, not the whole table.",
      "API stays the same. The cache is invisible to the caller.",
      "Data: key is bucket id. Value is the metadata JSON. TTL 60 seconds.",
      "Failure: on Redis timeout, read the database. Latency rises. Correctness holds. A stampede uses a lock or single-flight so one request fills the key.",
    ],
    `Key: bucket:{id}
TTL: 60s
Miss: one filler, others wait or hit the database
Invalidate on write, TTL as the backstop`,
    "Caching the write path and serving a stale capacity number as if it were live.",
    "A hot key expires and a thousand requests miss together. What do you do?",
    "Say the TTL for bucket metadata and why that number.",
    undefined,
    [
      {
        title: "Walk the checklist",
        body: "Requirements and the staleness you will accept come first. Scale is the hot key, not the average key. The API does not change. The data model is the key and the TTL. Architecture is cache-aside in front of Postgres. Consistency is eventual within the TTL, plus an explicit delete on update. Observability is hit ratio and fill latency. Security is a cache that does not hold raw credentials. The trade-off is freshness against database load.",
      },
    ],
  ),
  topic(
    "Design",
    "chat",
    "Chat",
    "40 min",
    "Chat is a log plus a connection tier. The hard part is order inside a conversation and a client that reconnects.",
    `flowchart LR
  Client --> Gateway[Connection gateway]
  Gateway --> Log[Message log]
  Log --> Fanout
  Fanout --> Online[Online members]
  Log --> History[(History)]`,
    ["A channel is a partition", "Store then fanout", "Presence is ephemeral", "Reconnect sends the last seen id"],
    [
      "Send, receive, history, typing if you have time. One conversation, then groups.",
      "Scale: messages per second, not concurrent sockets alone. A socket is a connection. The log is the product.",
      "API: send(conversationId, clientMsgId, body). History by cursor.",
      "The conversation id is the partition key so one conversation stays ordered.",
      "On reconnect the client sends the last message id. The server replays after that id.",
    ],
    `clientMsgId makes send idempotent.
The server stores the message, then fans it out.
A crash after store and before fanout is repaired by the client catch-up.`,
    "Keeping history only in the memory of the gateway.",
    "Two devices send, one socket drops. What does the client send on reconnect?",
    "Draw the log and the last-seen id. Stop there.",
    undefined,
    [
      {
        title: "What makes it different from a cache",
        body: "A cache can drop data. A chat log cannot. Presence and typing are the cache-like parts: they expire. Messages are the database. Fanout to online users is best-effort on top of the log. Read receipts can wait. Say what you cut.",
      },
    ],
  ),
  topic(
    "Design",
    "news-feed",
    "News feed",
    "35 min",
    "The trick is fanout. Push the post to followers when followers are few. Pull, or mix, when one account has millions.",
    `flowchart TD
  Post --> Choice{Celebrity?}
  Choice -->|no| Push[Write follower inboxes]
  Choice -->|yes| Pull[Followers read the celebrity at read time]
  Push --> Inbox
  Pull --> Inbox`,
    ["Fanout on write for normal users", "Fanout on read for celebrities", "The feed is a ranked inbox", "The post store is the source"],
    [
      "Requirements: home feed, follow, post. Ranking can be recency in version one.",
      "Scale: follows are uneven. Design for the heavy followee.",
      "Post is stored once. Inbox rows are post ids, not copies of the text.",
      "A hybrid: push to the first N followers, pull the rest at read time.",
    ],
    `Normal user: on post, enqueue fanout, workers append the id to follower inboxes.
Celebrity: skip the fanout. At read, merge the celebrity's recent posts into the inbox.`,
    "Copying the full post into every follower's row.",
    "When does fanout on write fall over?",
    "Say hybrid in one sentence with the threshold you invented, and call it an assumption.",
    undefined,
    [
      {
        title: "Checklist in short",
        body: "The queue is the fanout work. The cache is the rendered page of the inbox. Consistency is eventual: a post appears within seconds. Failure of a fanout worker retries. A poison post goes to a dead letter so one bad body does not block the worker. Observability is fanout lag.",
      },
    ],
  ),
  topic(
    "Design",
    "search",
    "Search",
    "30 min",
    "The database is the source of truth. The index is a derived store built from a stream.",
    `flowchart LR
  DB[(Source)] --> Event
  Event --> Indexer
  Indexer --> Index[(Inverted index)]
  Query --> Index`,
    ["Index is not the database", "Build from the event stream", "Queries hit the index", "Rebuild is possible"],
    [
      "Requirements: keyword search over object names and synthetic incident notes.",
      "The write path updates Postgres and emits an event. The indexer updates the inverted index.",
      "Search can be stale by the lag of the indexer. Say the lag.",
      "A full rebuild from the database exists, because indexes corrupt.",
    ],
    `Document: incident 41, tokens [disk, latency, bucket].
Query "latency" returns the document id, then the API loads the row.`,
    "Searching with LIKE on the primary table at millions of rows.",
    "The indexer is an hour behind. What does the user see?",
    "Name the event that updates the index in the project.",
    undefined,
    [
      {
        title: "The trick to say first",
        body: "Search is a second store. It can be wrong for a while. The source cannot. Tokens, inverted lists, and a rank function are enough. You do not need to implement a search engine. You need to say what is authoritative.",
      },
    ],
  ),
  topic(
    "Design",
    "payments",
    "Payments",
    "40 min",
    "A payment is a state machine and a ledger. The idempotency key is the part you already understand from orders.",
    `flowchart LR
  Created --> Authorized --> Captured
  Created --> Failed
  Authorized --> Failed`,
    ["Idempotency key", "Ledger entries that sum", "Illegal state jumps fail", "The provider call is at-least-once"],
    [
      "Requirements: charge once, refund once, show a history.",
      "Scale: write QPS is smaller than read. Correctness dominates.",
      "API: POST /charges with Idempotency-Key. Same key and same body returns the same charge. Same key and a different body returns 409.",
      "Data: a charge row and ledger lines. The balance is the sum, or a cached sum you can rebuild.",
      "The provider timeout uses the same key on the retry so the provider does not capture twice.",
    ],
    `States: created, authorized, captured, failed, refunded.
captured to created is rejected.
Two ledger lines: debit the payer, credit the merchant.`,
    "Updating a single balance column with no history.",
    "The provider timed out. You retry. How many captures occur?",
    "Draw the states. This is also the shape of a safe tool call.",
    undefined,
    [
      {
        title: "Why this design shows up",
        body: "It tests idempotency, money, and honesty about failure. You do not need to have worked at a bank. You need the state machine and the key. Connect it to the safe executor: a tool call that changes capacity is a state machine with a human approval edge.",
      },
    ],
  ),
  topic(
    "Design",
    "scheduler-logs",
    "Job scheduler, logs, and metrics",
    "35 min",
    "Three operational designs. Each has one trick: a lease, a buffer, and a time series.",
    `flowchart TD
  Job[Job row plus lease] --> Worker
  AgentL[Log agent] --> Queue
  Queue --> Store[Object storage]
  Scrape[Metrics scrape] --> TS[(Time series)]`,
    ["One owner via a lease", "Logs are buffered", "Metrics are aggregated", "All three tolerate a dead worker"],
    [
      "Scheduler: a job has a run_at and a lease_until. A worker updates the lease in a transaction. If it dies, the lease expires. The handler is idempotent because the lease can expire early.",
      "Logs: agents batch lines, a queue absorbs a burst, object storage keeps the bulk, an index keeps the recent window for the RCA agent.",
      "Metrics: counters and histograms, scraped or pushed. Retention is short at high resolution and long at low resolution. The capacity agent reads this store.",
    ],
    `UPDATE job SET lease_until = now() + interval '30 seconds'
WHERE id = ? AND lease_until < now()`,
    "A cron on every pod.",
    "Two workers run the same job. What prevents a double side effect?",
    "Write the lease condition. It is the scheduler.",
    undefined,
    [
      {
        title: "Logs versus metrics",
        body: "A log line is an event with a high amount of detail and a request id. A metric is a number you can alert on. You do not grep logs to page someone, and you do not put the request id into a metric label. The diagnostics agent is allowed to read both. The page is a metric.",
      },
    ],
  ),
  topic(
    "Design",
    "ride-booking",
    "Ride booking",
    "30 min",
    "The trick is matching under contention. Two riders must not take the same driver.",
    `flowchart LR
  Rider --> Match
  Driver --> Loc[Location updates]
  Loc --> Match
  Match --> Offer
  Offer --> Trip`,
    ["Location is a hot write", "Match is a short transaction", "One driver, one offer", "The trip is a state machine"],
    [
      "Requirements: request a ride, match a nearby driver, complete the trip.",
      "Location updates are frequent and lossy. The latest point matters. A cache or a specialized store holds them.",
      "Matching locks the driver row, or uses a conditional update: status = free. The loser retries with the next driver.",
      "States: requested, matched, started, completed, cancelled.",
    ],
    `UPDATE driver SET status = 'offered'
WHERE id = ? AND status = 'free'`,
    "Finding the nearest driver with a full table scan and then hoping the update wins.",
    "Two matchers pick the same driver. Who gets the trip?",
    "Say the conditional update. That sentence is the design.",
    undefined,
    [
      {
        title: "What to cut",
        body: "Pricing, maps, and surge can be a single sentence: a price is computed and stored on the trip at match time. Spend the minutes on the race. This design is practice for any exclusive allocation, including a capacity reservation on a cluster.",
      },
    ],
  ),
];
