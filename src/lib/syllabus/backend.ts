import { topic } from "./types.ts";

export const backendTopics = [
  topic(
    "Java",
    "hashmap",
    "HashMap internals",
    "45 min",
    "Interviewers use HashMap to see if you know the structure you call every day. Buckets, hash spreading, equals versus hashCode, and resize are the whole answer.",
    `flowchart TD
  Key --> Hash
  Hash --> Bucket
  Bucket --> Equals
  Equals --> Value
  Load[Load factor] --> Resize`,
    ["Compute hash", "Pick a bucket", "Walk equals", "Resize when full"],
    [
      "hashCode chooses the bucket. equals decides if the key is the one you want.",
      "If you override equals you override hashCode. Otherwise a HashSet silently keeps duplicates.",
      "Java 8 turns a long collision chain into a tree. You should know that the chain is not always a linked list.",
    ],
    `class Key {
  final String id;
  @Override public int hashCode() { return id.hashCode(); }
  @Override public boolean equals(Object o) {
    return o instanceof Key k && id.equals(k.id);
  }
}`,
    "Using the array index as identity and skipping equals.",
    "What breaks if hashCode changes while the key sits in the map?",
    "Break a HashSet on purpose by deleting hashCode. Put the class back.",
  ),
  topic(
    "Java",
    "collections",
    "Collections you must choose out loud",
    "30 min",
    "The question is rarely the syntax. It is why this collection, and what it costs.",
    `flowchart TD
  Need{Need?}
  Need -->|key lookup| HashMap
  Need -->|sorted keys| TreeMap
  Need -->|order of arrival| LinkedHashMap
  Need -->|concurrent map| CHM
  Need -->|deque| ArrayDeque`,
    ["Name the operation", "Name the cost", "Reject java.util.Stack", "ArrayDeque for stack and queue"],
    [
      "HashMap is expected O(1) and unordered. TreeMap is O(log n) and sorted.",
      "ConcurrentHashMap allows concurrent readers and segmented updates. It is not a lock around the whole map.",
      "Optional is for a return value that might be absent. It is not a field type on an entity.",
    ],
    "Stack is a legacy synchronized Vector. Say ArrayDeque.",
    "Picking a List and scanning it when a map was the point.",
    "When would you refuse a HashMap?",
    "Write three method signatures and name the collection in the margin before any code.",
  ),
  topic(
    "Java",
    "concurrency",
    "Executors, futures, and CompletableFuture",
    "45 min",
    "Your resume already mentions asynchronous work. The interview will ask what runs where, what happens on failure, and how you avoid blocking the common pool.",
    `sequenceDiagram
  participant API
  participant Pool
  participant Task
  API->>Pool: submit
  Pool->>Task: run
  Task-->>API: complete or exception`,
    ["Do not new Thread in a request", "Name the pool", "Handle the exception", "Do not block on the common pool"],
    [
      "ExecutorService owns the threads. Future is the handle. CompletableFuture composes them.",
      "supplyAsync on the common pool is fine for CPU work that is short. Blocking IO needs your own pool.",
      "exceptionally or handle, or the exception disappears until someone joins.",
    ],
    `CompletableFuture<String> body = CompletableFuture
  .supplyAsync(this::readLogs, ioPool)
  .exceptionally(error -> "logs unavailable");`,
    "Calling get() on the thread that is supposed to stay free.",
    "What happens if the callable throws?",
    "Draw the pool you would use for log collection versus the pool for a CPU score.",
  ),
  topic(
    "Java",
    "jmm",
    "volatile, locks, atomics, deadlock",
    "40 min",
    "You need the vocabulary of visibility and exclusion. You do not need to recite the Java Memory Model chapter.",
    `flowchart TD
  Race[Two threads one variable] --> Fix{Fix}
  Fix -->|visibility| Volatile
  Fix -->|read-modify-write| Atomic
  Fix -->|several fields| Lock`,
    ["volatile is visibility", "Atomic is a single variable update", "Lock guards a block", "Deadlock is lock order"],
    [
      "volatile does not make count++ safe. The increment is three steps.",
      "synchronized or ReentrantLock gives exclusion. Always take locks in the same order.",
      "A deadlock story: thread A holds lock 1 and wants lock 2, thread B holds lock 2 and wants lock 1.",
    ],
    "AtomicLong for a counter. A lock when two fields must change together.",
    "Sprinkling volatile on a compound action and calling it thread-safe.",
    "Give a race that volatile does not fix.",
    "Write a 6-line deadlock on paper, then the lock-order fix.",
  ),
  topic(
    "Spring",
    "ioc",
    "IoC, beans, and the proxy",
    "30 min",
    "Spring creates the objects and injects them. Transactions, security, and async work through proxies. If you call a proxied method from inside the same class, the proxy is skipped.",
    `sequenceDiagram
  participant Client
  participant Proxy
  participant Bean
  Client->>Proxy: public call
  Proxy->>Bean: advice then method
  Note over Bean: this.method skips the proxy`,
    ["Container builds the bean", "Proxy wraps cross-cutting work", "Self-invocation skips it", "Constructor injection is the default"],
    [
      "Prefer constructor injection. The bean is immutable and tests can pass fakes.",
      "Bean lifecycle in one breath: construct, inject, aware callbacks, init, use, destroy.",
      "Auto-configuration is conditional beans. You override them by declaring your own.",
    ],
    "@Transactional on a private method or a self-call does nothing useful.",
    "Field injection because it is fewer lines.",
    "Why did this @Transactional not roll back?",
    "Point at one service in your Dell work and say which calls go through the proxy.",
  ),
  topic(
    "Spring",
    "transactions",
    "Transactions, propagation, isolation",
    "40 min",
    "This is SDE II territory. You should say what is atomic, what isolation you need, and what a nested call does.",
    `flowchart TD
  Required --> Join[Join or start]
  RequiresNew --> Suspend[Suspend and start another]
  ReadCommitted --> NoDirty[No dirty reads]
  Repeatable --> Stable[Stable rows]`,
    ["Name the boundary", "Name propagation", "Name isolation", "Say what rolls back"],
    [
      "REQUIRED joins the current transaction. REQUIRES_NEW commits the inner work even if the outer rolls back. That is how you persist an audit row.",
      "Default rollback is runtime exceptions. Checked exceptions need rollbackFor.",
      "Isolation: read committed is the usual Postgres setting. Repeatable read stops a row changing under you. Phantom rows are a different problem.",
    ],
    "The outbox insert and the order insert share one transaction. The Kafka send does not.",
    "A long transaction that calls an external API.",
    "When do you want REQUIRES_NEW?",
    "Write the two methods for order plus outbox and mark which transaction they share.",
  ),
  topic(
    "Spring",
    "jpa",
    "JPA, N+1, locking",
    "35 min",
    "Hibernate will happily issue a query per row. You should notice it before production does.",
    `sequenceDiagram
  participant App
  participant DB
  App->>DB: select orders
  loop each order
    App->>DB: select customer
  end`,
    ["One query becomes N", "Fetch join or batch", "Lazy is a loaded graph", "Version column for optimistic lock"],
    [
      "N+1 shows up when you touch a lazy association in a loop.",
      "Optimistic lock: a version column, conflict becomes an exception, the client retries. Pessimistic lock holds a database lock. Use it rarely.",
      "Eager everything is not the fix. You load the graph you need for this request.",
    ],
    "@Version on the aggregate that two agents might update.",
    "Open-session-in-view hiding the N+1 until a loader disappears.",
    "How do you detect N+1 locally?",
    "Turn on SQL logging for one repository test and count the selects.",
  ),
  topic(
    "Spring",
    "kafka-why",
    "Why Kafka, not another REST call",
    "30 min",
    "REST couples the caller to the callee being up. A log of events lets the diagnostics agent, the capacity agent, and the audit trail each consume at their own speed.",
    `flowchart LR
  API[Order API] --> Topic
  Topic --> Diagnostics
  Topic --> Capacity
  Topic --> Audit`,
    ["Producer commits the fact", "Consumers are independent", "Replay is possible", "REST was the wrong coupling"],
    [
      "Use Kafka when more than one downstream cares, when you need a buffer, or when you must replay.",
      "Do not use Kafka for a request that needs the answer in the same HTTP call.",
      "Ordering is per partition key. Choose the key on purpose, such as bucket id.",
    ],
    "Key = bucketId so one bucket's events stay ordered.",
    "A topic with a random key and a later complaint that events arrived out of order.",
    "Why not just call the agent over HTTP?",
    "Name one Dell flow that is a fact other systems observe, and one that must stay a request.",
  ),
  topic(
    "Spring",
    "kafka-failure",
    "Consumer crash, duplicates, retries, DLQ",
    "40 min",
    "This is the senior part of your Kafka story. Delivery, crashes, and duplicates are one design.",
    `sequenceDiagram
  participant P as Producer
  participant K as Kafka
  participant C as Consumer
  participant D as DLQ
  P->>K: send
  K->>C: deliver
  alt success
    C->>K: commit offset
  else poison
    C->>D: dead letter
    C->>K: commit offset
  end`,
    ["At least once is the default", "Crash before commit redelivers", "Handler is idempotent", "Poison goes to DLQ"],
    [
      "If the process dies after the side effect and before the offset commit, the message comes back. Your handler must tolerate that.",
      "Idempotency key on the event. The second delivery finds the row and returns.",
      "Retries with backoff for a down dependency. A DLQ when the payload itself is bad. Do not retry forever.",
    ],
    "Store processed event ids. On duplicate, ack and skip.",
    "Committing the offset before the work, then losing the crash window's events.",
    "The consumer dies after writing the database and before commit. What do you do?",
    "Add an idempotency key to the project event on paper. Three lines.",
  ),
  topic(
    "Spring",
    "outbox",
    "Outbox",
    "25 min",
    "You cannot commit a database row and a Kafka send as one transaction without a pattern. The outbox is that pattern.",
    `flowchart TD
  TX[One DB transaction] --> Row[Business row]
  TX --> Out[Outbox row]
  Relay[Relay] --> Out
  Relay --> Kafka`,
    ["Same transaction", "Relay reads the outbox", "Mark sent", "Kafka is outside the transaction"],
    [
      "Insert the business row and the outbox row together.",
      "A worker publishes and then marks the outbox sent. If it crashes, it publishes again. Consumers stay idempotent.",
      "This is the story that connects your order API and your agents.",
    ],
    "outbox(event_id, type, payload, sent_at)",
    "Publishing to Kafka inside the transaction and hoping both commit.",
    "What is atomic in the outbox pattern, and what is not?",
    "Sketch the table and the worker loop in the flagship README.",
  ),
  topic(
    "Spring",
    "redis",
    "Redis as cache, lock, and agent memory",
    "25 min",
    "Redis is the fast state: rate-limit counters, a cache in front of bucket metadata, and a short-lived agent session. It is not your source of truth.",
    `flowchart LR
  Request --> Redis
  Redis -->|miss| Postgres
  Postgres --> Redis`,
    ["Cache has a TTL", "Source of truth stays in Postgres", "Stampede is a real bug", "Session state expires"],
    [
      "Cache aside: read cache, on miss read the database, fill the cache.",
      "Set a TTL. Invalidate on write when stale data would be wrong, such as a quota.",
      "A single-flight lock or a short lease stops a hundred misses from hammering Postgres.",
    ],
    "SET bucket:42 meta EX 30",
    "Caching a permission decision with no TTL.",
    "What is wrong if Redis is empty after a restart?",
    "Name three keys the flagship project would store, and the TTL for each.",
  ),
  topic(
    "Spring",
    "security-observability",
    "Security, resilience, actuator",
    "30 min",
    "JWT and OAuth answer who is calling. Resilience answers what you do when the next service is sick. Actuator and traces answer what happened.",
    `flowchart LR
  Caller --> Auth
  Auth --> Limit
  Limit --> Service
  Service --> Trace`,
    ["Authenticate then authorize", "Timeout every remote call", "Retry only idempotent calls", "A trace id crosses the agent"],
    [
      "Spring Security: filter authenticates, method or route rules authorize.",
      "Resilience4j or a simple policy: timeout, small retry with jitter, circuit breaker when the dependency is down.",
      "Micrometer plus actuator. A correlation id from the HTTP request lands in the Kafka header and the agent log.",
    ],
    "Do not retry a payment POST unless the idempotency key makes the retry safe.",
    "Logging the full prompt and the customer's object listing.",
    "Which calls are safe to retry?",
    "Add one correlation id to the story you will tell about DefectIQ-style RAG. No internal data.",
  ),
];
