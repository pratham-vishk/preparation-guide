# Security, resilience, actuator

Spring · 30 min

JWT and OAuth answer who is calling. Resilience answers what you do when the next service is sick. Actuator and traces answer what happened.

## Flow

```mermaid
flowchart LR
  Caller --> Auth
  Auth --> Limit
  Limit --> Service
  Service --> Trace
```

## Who calls, and what you do when the next hop is sick

JWT is a signed claim. Validate the signature, the expiry, and the audience. OAuth is how the token was issued. The resource server checks the token. It does not ask the user for a password. Resilience: a timeout, a small retry on idempotent calls, a circuit breaker when the dependency is failing fast, and a fallback you can explain. Actuator opens health and metrics. The correlation id ties the log to the trace.

## Play this

1. Authenticate then authorize
2. Timeout every remote call
3. Retry only idempotent calls
4. A trace id crosses the agent

## Steps

- Spring Security: filter authenticates, method or route rules authorize.
- Resilience4j or a simple policy: timeout, small retry with jitter, circuit breaker when the dependency is down.
- Micrometer plus actuator. A correlation id from the HTTP request lands in the Kafka header and the agent log.

## Example

```text
Do not retry a payment POST unless the idempotency key makes the retry safe.
```

## The usual miss

Logging the full prompt and the customer's object listing.

## They will ask

Which calls are safe to retry?

## Before you close the laptop

Add one correlation id to the story you will tell about DefectIQ-style RAG. No internal data.
