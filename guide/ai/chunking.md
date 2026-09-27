# Chunking

AI · 20 min

Chunk so a retrieved piece can stand alone. Write down the size and why.

## Flow

```mermaid
flowchart LR
  Doc --> Split --> Overlap --> Chunks
```

## Chunking

Split on paragraphs for incidents. A fixed window with overlap is the fallback when paragraphs are huge. Too small and the cause is in the next chunk. Too large and the window fills with one incident. Overlap of a sentence is enough. Store the incident id on every chunk. This choice goes in the README.

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
paragraph split, 10 percent overlap, incident id on each chunk
```

## The usual miss

One chunk per file, or one sentence with no id.

## They will ask

Why this size?

## Before you close the laptop

Write the rule in the README before you embed.
