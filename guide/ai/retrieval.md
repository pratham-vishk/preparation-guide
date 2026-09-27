# Retrieval

AI · 15 min

Retrieval returns ids and text. It does not answer the user.

## Flow

```mermaid
flowchart LR
  Query --> Index --> Hits
```

## Retrieval

Filter by time or bucket if the question has them. Return the chunk and the incident id. The next step decides what enters the prompt. A retrieval bug is a wrong id, and the eval catches it. Log the ids for every call.

## Play this

1. Name it
2. Say the rule
3. Tie it to the project or a problem
4. One sentence from memory tomorrow

## Steps

- Read the rule once.
- Write the example from a blank file.
- Say the interview answer out loud.

## Example

```text
hits: [{id, text, score}]
```

## The usual miss

Sending the raw vector store response to the user.

## They will ask

What do you log?

## Before you close the laptop

Log ids for one query.
