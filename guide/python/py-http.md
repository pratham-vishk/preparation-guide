# requests and httpx

Python · 20 min

The agent calls the Java API. That call is a client with a timeout.

## Flow

```mermaid
flowchart LR
  Agent --> Client --> Java
```

## requests and httpx

requests is enough for a script. httpx is the one to keep if you will go async. Always pass a timeout. Raise on a bad status. Send the request id header. A retry belongs only on a GET. The diagnose tool that reads metrics is a GET.

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
httpx.get(url, timeout=2.0, headers={'X-Request-Id': rid})
```

## The usual miss

A client with no timeout.

## They will ask

Which verb may retry?

## Before you close the laptop

Call /health from a script.
