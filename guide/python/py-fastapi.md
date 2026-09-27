# FastAPI

Python · 25 min

The agent service is a thin route. Phase 3.

## Flow

```mermaid
flowchart LR
  JSON --> Route --> Func
```

## FastAPI

The route parses the body and calls diagnose. It does not build the prompt inline. A health route exists. The Java service remains the writer. Python reads and proposes. Two writers to the same tables are a bug you will have to explain.

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
@app.post('/diagnose')
def diagnose(body: Question) -> Answer:
    return run(body)
```

## The usual miss

A route that opens the database, the model, and the prompt as one function.

## They will ask

Who is allowed to write a bucket?

## Before you close the laptop

Add /health and /diagnose with a fake model.
