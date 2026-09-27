# Validation

Spring · 15 min

Reject a bad body before the service runs. The field name goes back to the client.

## Flow

```mermaid
flowchart LR
  Body --> Ann[@NotBlank]
  Ann -->|fail| E400
  Ann -->|ok| Service
```

## Validation

Bean validation annotations live on the DTO. @Valid on the controller argument turns them on. A missing @Valid is a silent pass. Groups exist and you rarely need them. Custom constraints are for a rule that is not a blank check, such as a bucket id shape. Do not re-check the same blank inside the service and also in the DTO. The service checks domain rules: the bucket exists, the version matches.

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
record CreateBucket(@NotBlank String name) {}
```

## The usual miss

Validating only in the browser, or only after the database insert.

## They will ask

Who returns 400, the DTO or the database?

## Before you close the laptop

Put @NotBlank on the one create DTO.
