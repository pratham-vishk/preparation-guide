# Redis as cache, lock, and agent memory

Spring · 25 min

Redis is the fast state: rate-limit counters, a cache in front of bucket metadata, and a short-lived agent session. It is not your source of truth.

## Flow

```mermaid
flowchart LR
  Request --> Redis
  Redis -->|miss| Postgres
  Postgres --> Redis
```

## Play this

1. Cache has a TTL
2. Source of truth stays in Postgres
3. Stampede is a real bug
4. Session state expires

## Steps

- Cache aside: read cache, on miss read the database, fill the cache.
- Set a TTL. Invalidate on write when stale data would be wrong, such as a quota.
- A single-flight lock or a short lease stops a hundred misses from hammering Postgres.

## Example

```text
SET bucket:42 meta EX 30
```

## The usual miss

Caching a permission decision with no TTL.

## They will ask

What is wrong if Redis is empty after a restart?

## Before you close the laptop

Name three keys the flagship project would store, and the TTL for each.
