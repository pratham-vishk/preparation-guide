import { topic } from "./types.ts";

export const foundationTopics = [
  topic(
    "Path",
    "skill-map",
    "Every skill in the target stack, with a slot",
    "25 min",
    "The job posts share one stack. Each row below has a weight, a phase, and a lesson in this guide. Nothing in the stack is a separate career.",
    `flowchart LR
  DSA --> Profile[One profile]
  Java --> Profile
  Spring --> Profile
  Design --> Profile
  SQL --> Profile
  Dist[Distributed systems] --> Profile
  AWS --> Profile
  K8s --> Profile
  Python --> Profile
  AI --> Profile`,
    ["Very high skills are the interview", "High skills are the project", "Go and certificates support", "One profile receives all of it"],
    [
      "Very high, January: DSA, Java, Spring, HLD, LLD, distributed systems, SQL, AWS, Kafka, GenAI on the project.",
      "High: Docker, Kubernetes, Redis, Linux and networking, observability. They are practiced by deploying the same project.",
      "Secondary: Python from phase 1. Go is read-only until after the offer. Terraform is one module, not a course.",
      "Supporting: SAA after you can draw a VPC, CKAD after you can debug a pod, LinkedIn once a week. BITS is parallel and does not replace this list.",
    ],
    `DSA                         20%   weekday 75 min, Patterns tab
Java + Spring               20%   weekday 45 min
System design               20%   Saturday 2 hours
Cloud + K8s + Docker        15%   weekday 30 min, then the project
Python + GenAI              15%   same 30 min block, phases 1 then 3
Project                      5%   threaded: Kafka, Redis, K8s, AWS land here
Certificates                 5%   SAA, later CKAD, later GenAI professional`,
    "Studying the list top to bottom as twelve courses.",
    "Which three skills are you weak at, and which phase owns them?",
    "Write the three weak skills on a card. They are the only 30-minute blocks this week.",
    undefined,
    [
      {
        title: "DSA — very high",
        body: "Phase 1 through January. About 40 patterns and 120 to 150 problems, five passes. The DSA section of this guide is the set: recognition, a Java template, and the representative problems. January stops at basic DP. MCM, trie, KMP, and Kosaraju wait.",
      },
      {
        title: "Java — very high",
        body: "You already write it. The gap is interview depth: HashMap, collections choice, equals and hashCode, streams, generics, immutability, executors, CompletableFuture, volatile, locks, and a plain JVM story. Lessons are in the Java section. Say them from the Dell async work, with a failure mode.",
      },
      {
        title: "Spring Boot — very high",
        body: "IoC and the proxy, transactions and propagation, JPA and N+1, REST with validation and a single error shape, Kafka with crash and idempotency, outbox, Redis, security, resilience, tests, actuator. The 45-minute block in phase 2 is this list, one topic a day.",
      },
      {
        title: "System design HLD — very high",
        body: "Same checklist every time: requirements, scale, API, data model, architecture, database, cache, queue, consistency, failure, observability, security, trade-off. Phase 2 owns URL shortener, rate limiter, notification, file storage. Phase 4 owns five to eight full designs, including cache, chat, feed, search, payments, scheduler, logs, and the RAG agent.",
      },
      {
        title: "LLD, OOP, and design patterns — very high",
        body: "A 45-minute class design shows up next to HLD in SDE II loops. You need SOLID in one sentence each, and Strategy, Factory, Observer, Decorator, Adapter as tools you pick, not a poster. The LLD lesson is a rate limiter drawn as classes.",
      },
      {
        title: "Distributed systems — very high",
        body: "This is the language of your Kafka and storage work: replication, partitions, timeouts, retries, idempotency, ordering, and what a crash repeats. The distributed-systems lesson is the theory. The Kafka lessons are the concrete system.",
      },
      {
        title: "SQL and database internals — very high",
        body: "Indexes, EXPLAIN, isolation, MVCC, and deadlocks. JPA is how you meet the database. The SQL lesson is what the database is doing under the repository.",
      },
      {
        title: "AWS — very high",
        body: "Solutions Architect Associate level, not Cloud Practitioner. IAM and VPC first, then EC2, ALB, autoscaling, S3, RDS, DynamoDB, ElastiCache, SQS, SNS, Lambda, ECS, EKS, CloudWatch, CloudTrail, API Gateway, ECR, Secrets Manager, KMS, Route 53. Phase 3. Then deploy the project: EKS, S3, RDS, ElastiCache, SQS, CloudWatch, IAM.",
      },
      {
        title: "Docker and Kubernetes — high",
        body: "Order is fixed: image on the laptop, Deployment, Service, probes, HPA, ConfigMap, Secret, RBAC, volumes, Helm, then CKAD. CKAD does not replace that order. You already touch OpenShift. The public proof is the same objects on the flagship.",
      },
      {
        title: "Kafka — high",
        body: "Why a log instead of REST, delivery, consumer crash, duplicates, ordering, retry, DLQ, outbox. Phase 2, and the project publishes object events through the outbox by 25 November.",
      },
      {
        title: "Redis — high",
        body: "Cache, rate-limit counter, and short-lived agent session. Not the source of truth. Eviction and a stampede belong in the same answer.",
      },
      {
        title: "Linux and networking — high",
        body: "Enough to debug a pod and an API: process, port, DNS, TCP timeout versus connection refused, HTTP, and the commands you actually run. One lesson, used every time a deploy fails.",
      },
      {
        title: "Observability and reliability — high",
        body: "Logs, metrics, traces, a correlation id, and one alert that a human can act on. The diagnostics agent is this skill with a model in front of it.",
      },
      {
        title: "Python — secondary, start now",
        body: "Phase 1 is syntax, collections, functions, OOP, venv, pip, typing, requests. Then pytest, httpx, asyncio, FastAPI, Pydantic, SQLAlchemy, Docker. You are building the agent service, not collecting a Python certificate.",
      },
      {
        title: "Go — tertiary",
        body: "Apple storage and Cisco distributed roles mention Go beside Java. Read it. Write a small main after the offer. Do not pause Java to become a beginner in three languages.",
      },
      {
        title: "GenAI, RAG, agents, MCP, evals — the differentiator",
        body: "Phase 3: tokens, embeddings, chunking, retrieval, rerank, citations, tool calling, FastAPI. Phase 4: the four agents, human approval, traces, and an eval score in the README. MCP is how a tool is exposed. It is not a personality.",
      },
      {
        title: "Terraform, certificates, LinkedIn, BITS",
        body: "Terraform is one module that describes the network you already drew. Certificates are SAA, then CKAD, then a GenAI professional exam when the project is real. AI-901 and AWS AI Practitioner are optional. LinkedIn is one technical post a week and a short list of people. BITS M.Tech AI and ML is a parallel degree if the batch, fee, and hours fit. It does not sit in the January plan.",
      },
    ],
  ),
  topic(
    "LLD",
    "oop-patterns",
    "LLD: classes, SOLID, and five patterns",
    "45 min",
    "HLD picks the boxes. LLD picks the classes inside one box. SDE II loops ask for both. You already use these patterns inside Spring. Name them.",
    `flowchart TD
  Need[What changes?] --> Strategy
  Need --> Factory
  Event[Something happened] --> Observer
  Wrap[Add behavior] --> Decorator
  Foreign[Wrong interface] --> Adapter`,
    ["One reason to change per class", "Strategy when the algorithm changes", "Factory when construction is messy", "Observer when others must hear an event"],
    [
      "SOLID in one line each. Single responsibility: one reason to change. Open/closed: new behavior by new code. Liskov: a subtype can stand in. Interface segregation: small interfaces. Dependency inversion: depend on the interface the caller owns.",
      "In a 45-minute LLD, spend 10 minutes on the nouns and the operations, 25 on classes and the one tricky method, 10 on concurrency or failure.",
      "Prefer composition. A class that implements five interfaces is usually three classes.",
    ],
    `interface RateLimit {
    boolean allow(String client);
}
class TokenBucket implements RateLimit {
    public boolean allow(String client) { return true; }
}
class Limiter {
    private final RateLimit policy;
    Limiter(RateLimit policy) { this.policy = policy; }
}`,
    "Drawing a UML poster and never writing the method that races.",
    "Design a rate limiter. Which class owns the counters?",
    "Write the four class names for a token bucket and the one method that must be atomic.",
    undefined,
    [
      {
        title: "How to run the 45 minutes",
        body: "Clarify the operations, not every future feature. Parking lot: park, unpark, find a spot. Rate limiter: allow or deny for a key. Name the entities, the relationships, and the one method that can go wrong under two threads. Then write that method. Mention the lock or the atomic only where the shared state lives.",
      },
      {
        title: "The five patterns you will actually use",
        body: "Strategy: the limit algorithm is TokenBucket or SlidingWindow, chosen at construction. Factory: building a notifier for email or push without a switch in the caller. Observer: an object event notifies the audit log and the agent. Decorator: timing or retries wrap a repository. Adapter: the Python agent speaks HTTP, the Java client speaks your interface. Singleton is usually the wrong answer. Spring already scopes beans.",
      },
      {
        title: "A shape that interviews accept",
        body: "RateLimiter depends on a Clock and a Store. Store is in-memory for the interview and Redis in production. Clock is injectable so a test can move time. allow(key) reads the bucket, refills from elapsed time, and decrements. The store update is atomic. Say what happens when Redis is down: fail open or fail closed, and why you picked it.",
      },
    ],
  ),
  topic(
    "SQL",
    "indexes-isolation",
    "Indexes, plans, and isolation",
    "45 min",
    "JPA hides the database until a page gets slow. The interview asks what the database did, not which annotation you used.",
    `flowchart TD
  Q[Query] --> Plan[EXPLAIN]
  Plan --> Index[Index seek or scan]
  Index --> Rows[Rows]
  TX[Transaction] --> MVCC[MVCC snapshot]
  MVCC --> Lock[Row lock if you write]`,
    ["Filter columns want an index", "Leftmost prefix of a composite index", "Read committed is the usual start", "A deadlock is a lock cycle"],
    [
      "A B+ tree index supports equality and range. A column in a function often cannot use it.",
      "Composite index (bucket_id, created_at) serves WHERE bucket_id = ? ORDER BY created_at. It does not serve a predicate on created_at alone.",
      "EXPLAIN the slow repository method. Look for Seq Scan on a large table and for rows removed after the index.",
      "Isolation: read committed stops dirty reads. Repeatable read keeps a snapshot. Serializable refuses anomalies. Postgres uses MVCC, so readers do not block writers.",
    ],
    `EXPLAIN SELECT * FROM object_event
WHERE bucket_id = 'b1'
ORDER BY created_at DESC
LIMIT 20;`,
    "Indexing every column and calling it tuned.",
    "Why is this query a sequential scan?",
    "Run EXPLAIN on the hottest query in the project and write one sentence about the plan.",
    undefined,
    [
      {
        title: "What an index is",
        body: "The heap stores rows. An index stores ordered keys plus pointers. A seek is cheap. A scan reads the table. A covering index holds every column the query needs, so the heap is not visited. Cardinality matters: an index on a boolean is rarely useful. Write the predicate first, then the index that matches its left prefix.",
      },
      {
        title: "Transactions you must be able to say",
        body: "A transaction is atomic on commit or rollback. Lost update: two transactions read a balance and both write. Fix it with a version column (optimistic) or SELECT FOR UPDATE (pessimistic). Deadlock: A locks row 1 and wants row 2, B does the opposite. The database kills one. Retry the killed transaction. Phantom: a second read sees new rows. Isolation level or a constraint decides whether you care.",
      },
      {
        title: "How this meets JPA",
        body: "Lazy associations plus a loop are the N+1. Fetch join or a batch size fixes it. An open session in the view hides the cost until the serializer runs. Optimistic lock is @Version. A failed version check is a retry, not a 500 you swallow. The SQL lesson is the reason the annotation exists.",
      },
    ],
  ),
  topic(
    "Distributed",
    "failure-and-delivery",
    "Replication, partitions, and delivery",
    "45 min",
    "Distributed systems is the reason Kafka, retries, and idempotency exist. You already run pieces of this at Dell. The interview wants the failure story.",
    `flowchart TD
  Client --> API
  API --> DB[(Primary)]
  DB --> Replica
  API --> Log[Event log]
  Log --> Worker
  Worker --> DB`,
    ["A timeout is not a no", "A retry repeats the side effect", "Idempotency makes the retry safe", "A partition key is an ordering choice"],
    [
      "Replication: a primary takes writes, replicas serve reads or stand by. Lag means a read-your-write can miss the write. Route that read to the primary.",
      "A network partition means a node cannot see another. Timeouts, retries, and a decision about availability follow. CAP is a reminder, not a design.",
      "At-least-once delivery plus an idempotent handler is the practical choice. Exactly-once is a careful composition of the log and the database, which is what the outbox approaches.",
      "Backpressure: if the consumer is slower than the producer, the lag grows. Scale consumers, or slow the producer. Do not let the heap be the queue.",
    ],
    `Idempotency-Key: 9f2c
First call: create the row, publish, return 201.
Second call: find the row, return 200.
No second object.`,
    "Retrying a non-idempotent POST and hoping the cloud is kind.",
    "The consumer crashes after the database write and before the offset commit. What happens?",
    "Add the idempotency key to one project endpoint and the test that calls it twice.",
    undefined,
    [
      {
        title: "The failure you should narrate",
        body: "The client timed out. The server may have committed. The client retries. Without a key, you have two orders. With a key stored in the same transaction as the order, the second call finds the first and returns it. That is the whole distributed-systems answer for a write API. Say the timeout value and what you do when the dependency is down: a bounded retry, then an error the caller can see.",
      },
      {
        title: "Ordering and partitions",
        body: "Kafka orders inside a partition. The key decides the partition. Bucket id keeps one bucket's events ordered. A random key spreads load and loses order. Consumers in a group split partitions. You do not get global order unless you accept one partition and its throughput ceiling. Say that trade out loud.",
      },
      {
        title: "Clocks and leases",
        body: "Machine clocks drift. A lease with a timeout is how a scheduler gives one worker a job. If the worker dies, the lease expires and another worker takes it. If the worker is slow and the lease expires while it is still working, two workers can run the job. The job handler must be idempotent too. This is the job-scheduler design in one paragraph.",
      },
    ],
  ),
  topic(
    "Linux",
    "ports-and-tcp",
    "Processes, DNS, and TCP",
    "30 min",
    "Cloud and Kubernetes debugging is Linux with extra YAML. You need to tell a refused connection from a timeout, and a process from a container.",
    `flowchart LR
  Name[DNS name] --> IP
  IP --> SYN[TCP handshake]
  SYN --> Port[Port on the process]
  Port --> HTTP`,
    ["Connection refused: nothing listens", "Timeout: a filter or a route dropped you", "DNS failure: the name never became an IP", "A container has its own network namespace"],
    [
      "A process has a pid, file descriptors, and ports. A container is a process with namespaces. A pod is one or more containers that share a network namespace.",
      "curl -v shows DNS, the TCP connect, and the HTTP status. ss -lntp shows who listens.",
      "HTTP keep-alive reuses the TCP connection. A load balancer idle timeout that is shorter than the client's is a classic stuck-connection bug.",
    ],
    `curl -v http://127.0.0.1:8080/health
# refused: the process is down
# timeout: security group, network policy, or the wrong subnet
# 500: the process is up and the bug is in the app`,
    "Restarting the pod before you know whether the port is open.",
    "The service exists and the pod is Running. The client times out. Where do you look?",
    "Break the project on purpose: stop Postgres and write down the exact client error.",
    undefined,
    [
      {
        title: "The three errors",
        body: "Connection refused means the SYN reached a host and no socket accepted it. The process is down, or you used the wrong port. Timeout means packets vanished: security group, NACL, network policy, a route, or a firewall. Name or service not known means DNS. Read the error before you change a manifest. In Kubernetes, the Service's targetPort must match the container port, and the pod's labels must match the Service selector.",
      },
      {
        title: "What you run",
        body: "Inside a debug container or on the laptop: curl, dig or getent hosts, ss, and the application log. On AWS, the security group is a stateful firewall on the instance. The VPC route table must have a path. Say those two names when a cloud deploy times out. You do not need to become a kernel engineer before the switch.",
      },
    ],
  ),
  topic(
    "Observability",
    "logs-metrics-traces",
    "Logs, metrics, traces",
    "30 min",
    "Reliability work is how you notice the bucket latency before the user writes the ticket. The diagnostics agent reads the same three signals.",
    `flowchart LR
  Req[Request id] --> Log
  Req --> Metric
  Req --> Trace
  Log --> Agent
  Metric --> Agent
  Trace --> Agent`,
    ["One correlation id", "RED: rate, errors, duration", "A log is an event, not a novel", "An alert needs an action"],
    [
      "Logs: structured, with the request id and the bucket id. High-cardinality data stays out of metric labels.",
      "Metrics: request rate, error rate, latency histogram. A gauge for disk used. Alert on the symptom the user feels, and on saturation before the disk fills.",
      "Traces: spans across the API, the database, and the agent tool call. The trace is how you prove the latency is in the database and not in the model.",
    ],
    `requestId=9f2c bucketId=b1 latencyMs=840 dbMs=790
The story is the database, not the model.`,
    "Logging the entire object on every request and calling it observability.",
    "Latency is high. Which signal do you open first, and what would change your mind?",
    "Put a request id on the project API log line and on the Kafka event.",
    undefined,
    [
      {
        title: "How you debug with the three",
        body: "Start with the metric: is error rate or latency up, and since when? Pick one slow request id from the log. Open its trace. The widest span is the suspect. Then read the log lines for that id only. This is also the diagnostics agent's procedure. If you can do it by hand, you can tell the agent to do it and then check the citation.",
      },
      {
        title: "What you page a human for",
        body: "Page on user-visible failure and on a disk or error budget that will run out. Do not page on a single log line. The capacity agent forecasts the 80 percent mark so the page happens before the cluster is full. Actuator on Spring exposes health and metrics. CloudWatch or Prometheus scrapes them. The tool is secondary to the three signals.",
      },
    ],
  ),
  topic(
    "Terraform",
    "one-module",
    "One Terraform module after the diagram",
    "30 min",
    "Infrastructure as code is how the VPC you drew stays the VPC you deployed. It is useful. It is not a certification and not phase 1.",
    `flowchart LR
  Draw[VPC diagram] --> HCL[One module]
  HCL --> Plan[terraform plan]
  Plan --> Apply[Apply in a personal account]
  Apply --> State[Remote state later]`,
    ["Resources match the diagram", "Plan before apply", "State is the source of what exists", "Secrets stay out of the file"],
    [
      "A resource block declares an VPC, a subnet, a security group, or an S3 bucket.",
      "terraform plan is the diff. Read it. Apply only what you meant.",
      "State maps the config to real ids. Lose the state and Terraform will try to create duplicates. For a real account, state lives in a remote bucket with a lock.",
      "Do this in phase 3, after IAM and VPC make sense. One module for the project network is enough.",
    ],
    `resource "aws_s3_bucket" "objects" {
  bucket = "prep-object-events-demo"
}`,
    "Starting a 40-hour Terraform course before the first VPC is drawn.",
    "What does terraform plan tell you that the AWS console does not?",
    "Write the three resources the project needs. Do not apply them until the IAM lesson is done.",
    undefined,
    [
      {
        title: "What you are declaring",
        body: "The module for this project is small: a VPC public and private subnet story you can explain, a security group that allows the app port from the load balancer only, an S3 bucket for synthetic objects, and an RDS subnet group. Names match the diagram in the cloud lessons. If a resource is in the file and you cannot say why, delete it from the file.",
      },
      {
        title: "State and drift",
        body: "Terraform state is a JSON map from your names to AWS ids. Two people applying without a lock will fight. A console click that Terraform does not know about is drift. Import or abandon it. None of this is required to pass a Java loop in January. It is required the week you deploy the project for real and want to talk about it.",
      },
    ],
  ),
];
