# Docker, then the cluster

Kubernetes · 30 min

An image is the unit you ship. If the container does not run on your laptop, Kubernetes will not save it.

## Flow

```mermaid
flowchart LR
  Jar --> Image
  Image --> Run
  Run --> Logs
```

## The image

A Dockerfile copies the jar or the venv and sets the user, the port, and the command. The image runs on your laptop with the same env the cluster will use. A health check is in the app, not only in Docker. Compose brings up Postgres, Kafka, Redis, and the two apps for the November milestone. If it does not run here, Kubernetes will not repair the image.

## Play this

1. One process per container
2. Config by environment
3. A health URL
4. Non-root user

## Steps

- Dockerfile: build the jar, copy it, expose the port, start the process.
- Do not bake secrets into the image.
- docker compose for Postgres and the app is the local rehearsal.

## Example

```text
HEALTHCHECK or a /health route the orchestrator can call.
```

## The usual miss

A container that works only because it uses your laptop's files.

## They will ask

What is in the image, and what is not?

## Before you close the laptop

Run the Spring service in Docker before you read another Kubernetes page.
