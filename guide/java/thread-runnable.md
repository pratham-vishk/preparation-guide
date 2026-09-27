# Thread and Runnable

Java · 15 min

A Thread is the expensive object. Runnable is the work. You almost never call new Thread in a service.

## Flow

```mermaid
flowchart LR
  Work[Runnable] --> Pool
  Pool --> Thread
```

## Thread and Runnable

Runnable has run and no result. Starting a raw thread per request will exhaust the machine. The name of the thread matters in a log. A daemon thread dies with the JVM and is wrong for a job that must finish. Interrupting a thread sets a flag. The task must notice it. In Spring, the pool is the bean. This page exists so you can say why you do not new Thread.

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
Runnable job = () -> handle(event);
executor.execute(job);
```

## The usual miss

new Thread inside a controller.

## They will ask

What does Runnable not give you?

## Before you close the laptop

Point at the pool the project should use instead.
