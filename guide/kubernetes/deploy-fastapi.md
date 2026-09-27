# Deploy the FastAPI service

Kubernetes · 20 min

The agent image is a second Deployment. It calls Java by Service name.

## Flow

```mermaid
flowchart LR
  Image --> Deployment
  Deployment --> Svc[Java Service DNS]
```

## Deploy the FastAPI service

The URL is http://api:8080 inside the cluster, not localhost. The agent has no database password if it uses the API. Probes hit /health. This deploy happens after the Java Service exists.

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
http://api:8080/health
```

## The usual miss

localhost in the agent config.

## They will ask

What name does the agent call?

## Before you close the laptop

Write the URL.
