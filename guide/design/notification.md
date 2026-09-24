# Notification system

Design · 40 min

Fanout, retries, and idempotent delivery. This is the Kafka design with a user-visible result.

## Flow

```mermaid
flowchart LR
  Event --> Topic
  Topic --> Email
  Topic --> Push
  Email --> Attempt
  Attempt -->|fail| Retry
```

## Walk it

A request writes a notification row and an outbox row. Workers send email, push, or webhook. Each send has a provider id so retries do not double-send. A dead letter holds addresses that bounce. Fanout to many devices is a queue, not a loop in the request. Idempotency is the provider key plus the notification id.

## Play this

1. Event in
2. One worker per channel
3. Retry with backoff
4. Do not double-send

## Steps

- The API accepts the intent and returns. Delivery is async.
- Idempotency key so a retry does not email twice.
- Preferences and quiet hours are a filter before the provider call.

## Example

```text
notification_id unique at the provider adapter.
```

## The usual miss

Calling the email vendor inside the user request.

## They will ask

The worker crashes after the vendor accepts. Did the user get two mails?

## Before you close the laptop

Map this onto an incident notice for a bucket, with synthetic users.
