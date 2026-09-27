# News feed

Design · 35 min

The trick is fanout. Push the post to followers when followers are few. Pull, or mix, when one account has millions.

## Flow

```mermaid
flowchart TD
  Post --> Choice{Celebrity?}
  Choice -->|no| Push[Write follower inboxes]
  Choice -->|yes| Pull[Followers read the celebrity at read time]
  Push --> Inbox
  Pull --> Inbox
```

## Checklist in short

The queue is the fanout work. The cache is the rendered page of the inbox. Consistency is eventual: a post appears within seconds. Failure of a fanout worker retries. A poison post goes to a dead letter so one bad body does not block the worker. Observability is fanout lag.

## Requirements

Show a home feed. Ranking can be recency in version one.

## Scale estimation

Follows are uneven. Design for a celebrity.

## API

Post, follow, get feed by cursor.

## Data model

Post stored once. Inbox rows are ids.

## High-level architecture

Write the post. A worker fans it out, or the read merges celebrities.

## DB

Post table is the source. Inboxes are derived.

## Caching

The rendered page.

## Queue

The fanout work.

## Consistency

Eventual within seconds.

## Failure handling

A failed fanout retries. A poison post is dead-lettered.

## Observability

Fanout lag.

## Security

A user sees posts they are allowed to see. Block lists are a filter.

## Trade-offs

Pure push falls over on a celebrity. Hybrid is the trade.

## Play this

1. Fanout on write for normal users
2. Fanout on read for celebrities
3. The feed is a ranked inbox
4. The post store is the source

## Steps

- Requirements: home feed, follow, post. Ranking can be recency in version one.
- Scale: follows are uneven. Design for the heavy followee.
- Post is stored once. Inbox rows are post ids, not copies of the text.
- A hybrid: push to the first N followers, pull the rest at read time.

## Example

```text
Normal user: on post, enqueue fanout, workers append the id to follower inboxes.
Celebrity: skip the fanout. At read, merge the celebrity's recent posts into the inbox.
```

## The usual miss

Copying the full post into every follower's row.

## They will ask

When does fanout on write fall over?

## Before you close the laptop

Say hybrid in one sentence with the threshold you invented, and call it an assumption.
