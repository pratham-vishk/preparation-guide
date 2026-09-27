# Embeddings

AI · 20 min

An embedding is a vector for a text. Nearby vectors are similar in the space the model learned, which is not the same as a keyword match.

## Flow

```mermaid
flowchart LR
  Chunk --> Model --> Vector
```

## Embeddings

You embed chunks, not whole incidents, when the incident is long. The same model embeds the query. Mixing models makes distances meaningless. Normalize if the index expects it. Store the incident id with the vector. The vector is not the document.

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
vector plus incident id
```

## The usual miss

Comparing vectors from two models.

## They will ask

What do you store beside the vector?

## Before you close the laptop

Write the pair: id and vector.
