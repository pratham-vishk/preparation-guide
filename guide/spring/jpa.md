# JPA, N+1, locking

Spring · 35 min

Hibernate will happily issue a query per row. You should notice it before production does.

## Flow

```mermaid
sequenceDiagram
  participant App
  participant DB
  App->>DB: select orders
  loop each order
    App->>DB: select customer
  end
```

## Play this

1. One query becomes N
2. Fetch join or batch
3. Lazy is a loaded graph
4. Version column for optimistic lock

## Steps

- N+1 shows up when you touch a lazy association in a loop.
- Optimistic lock: a version column, conflict becomes an exception, the client retries. Pessimistic lock holds a database lock. Use it rarely.
- Eager everything is not the fix. You load the graph you need for this request.

## Example

```text
@Version on the aggregate that two agents might update.
```

## The usual miss

Open-session-in-view hiding the N+1 until a loader disappears.

## They will ask

How do you detect N+1 locally?

## Before you close the laptop

Turn on SQL logging for one repository test and count the selects.
