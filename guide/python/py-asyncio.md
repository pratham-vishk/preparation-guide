# asyncio

Python · 20 min

async is for waiting on the network. It is not a faster for-loop.

## Flow

```mermaid
flowchart LR
  Await[await HTTP] --> Other[other work can run]
```

## asyncio

async def and await the httpx call. Do not run a blocking requests call inside an async function. CPU work does not speed up because you marked it async. The diagnose route can stay synchronous until two calls must overlap. Then gather them.

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
async with httpx.AsyncClient() as client:
    r = await client.get(url, timeout=2.0)
```

## The usual miss

async on every function, including a sort.

## They will ask

What is worth awaiting?

## Before you close the laptop

Await one GET. Leave the rest sync.
