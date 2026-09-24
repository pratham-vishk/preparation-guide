# Search

Design · 30 min

The database is the source of truth. The index is a derived store built from a stream.

## Flow

```mermaid
flowchart LR
  DB[(Source)] --> Event
  Event --> Indexer
  Indexer --> Index[(Inverted index)]
  Query --> Index
```

## The trick to say first

Search is a second store. It can be wrong for a while. The source cannot. Tokens, inverted lists, and a rank function are enough. You do not need to implement a search engine. You need to say what is authoritative.

## Play this

1. Index is not the database
2. Build from the event stream
3. Queries hit the index
4. Rebuild is possible

## Steps

- Requirements: keyword search over object names and synthetic incident notes.
- The write path updates Postgres and emits an event. The indexer updates the inverted index.
- Search can be stale by the lag of the indexer. Say the lag.
- A full rebuild from the database exists, because indexes corrupt.

## Example

```text
Document: incident 41, tokens [disk, latency, bucket].
Query "latency" returns the document id, then the API loads the row.
```

## The usual miss

Searching with LIKE on the primary table at millions of rows.

## They will ask

The indexer is an hour behind. What does the user see?

## Before you close the laptop

Name the event that updates the index in the project.
