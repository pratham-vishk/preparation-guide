# CI and CD

Cloud · 20 min

CI runs the tests. CD deploys the image you pinned. Phase 3, after the app runs locally.

## Flow

```mermaid
flowchart LR
  Push --> Test --> Image --> Deploy
```

## CI and CD

On every push: unit tests, the idempotency test, the outbox test. Then build the image and push it to ECR with the sha. Deploy by changing the pin. A main branch that deploys itself is fine for this repo. A production approval is the human gate you already designed for the agent, applied to deploys.

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
test, then image tagged with the sha
```

## The usual miss

Deploying a laptop build by SSH.

## They will ask

What must be green before the image is pushed?

## Before you close the laptop

Write the three steps.
