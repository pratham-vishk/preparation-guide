# Generics

Java · 20 min

Generics are a compile-time check. The JVM sees Object.

## Flow

```mermaid
flowchart LR
  Src["List of String"] --> Compiler
  Compiler --> Erase["List at runtime"]
```

## Generics

Type erasure removes the parameter. You cannot new T(), and you cannot instanceof T. A raw List accepts anything and pollutes a parameterized one. PECS: a producer extends, so you read a List<? extends Number>. A consumer super, so you write a List<? super Integer>. Do not fight the compiler with an unchecked cast unless you own the invariant. In interviews, erasure explains why a generic array is awkward and why the Class token exists.

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
void copy(List<? extends Number> in, List<? super Number> out) {
    out.add(in.get(0));
}
```

## The usual miss

A cast to T because the warning was noisy.

## They will ask

Why is T gone at runtime?

## Before you close the laptop

Say extends versus super with one read and one write.
