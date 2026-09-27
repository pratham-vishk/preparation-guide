# Route 53

Cloud · 10 min

Route 53 maps the name to the load balancer.

## Flow

```mermaid
flowchart LR
  Name --> Alias --> ALB
```

## Route 53

An alias record to the ALB, not a stale IP. Health checks matter when you have two regions. You have one. TTL is the speed of a change. The name is how you demo. It is not the architecture.

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
alias A to the ALB
```

## The usual miss

An A record to an instance that autoscaling replaced.

## They will ask

What does the name point at?

## Before you close the laptop

Write the record type.
