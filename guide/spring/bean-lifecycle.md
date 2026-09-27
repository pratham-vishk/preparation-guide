# Bean lifecycle

Spring · 20 min

Construction, injection, init, use, destroy. The proxy is already around the object before you call it.

## Flow

```mermaid
flowchart LR
  New --> Inject --> Init --> Use --> Destroy
```

## Bean lifecycle

Constructor injection makes the dependency mandatory and the field final. Field injection hides a missing bean until runtime. @PostConstruct runs after injection. DisposableBean or @PreDestroy runs on shutdown. A prototype bean is a new instance per lookup. A singleton is the default and is shared, so it must be thread-safe or hold no request state. Lazy initialization delays creation. It does not fix a cycle you should break.

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
public BucketService(BucketRepository repo) {
    this.repo = repo;
}
```

## The usual miss

Request data stored on a singleton service.

## They will ask

When does @PostConstruct run relative to the constructor?

## Before you close the laptop

Name one bean that must not keep request state.
