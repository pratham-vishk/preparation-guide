# Transactions, propagation, isolation

Spring · 40 min

This is SDE II territory. You should say what is atomic, what isolation you need, and what a nested call does.

## Flow

```mermaid
flowchart TD
  Required --> Join[Join or start]
  RequiresNew --> Suspend[Suspend and start another]
  ReadCommitted --> NoDirty[No dirty reads]
  Repeatable --> Stable[Stable rows]
```

## Play this

1. Name the boundary
2. Name propagation
3. Name isolation
4. Say what rolls back

## Steps

- REQUIRED joins the current transaction. REQUIRES_NEW commits the inner work even if the outer rolls back. That is how you persist an audit row.
- Default rollback is runtime exceptions. Checked exceptions need rollbackFor.
- Isolation: read committed is the usual Postgres setting. Repeatable read stops a row changing under you. Phantom rows are a different problem.

## Example

```text
The outbox insert and the order insert share one transaction. The Kafka send does not.
```

## The usual miss

A long transaction that calls an external API.

## They will ask

When do you want REQUIRES_NEW?

## Before you close the laptop

Write the two methods for order plus outbox and mark which transaction they share.
