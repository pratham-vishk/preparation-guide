# venv and pip

Python · 15 min

The agent has its own environment. The system Python stays alone.

## Flow

```mermaid
flowchart LR
  Venv --> Pip --> Freeze[requirements.txt]
```

## venv and pip

python -m venv .venv. Activate. pip install. pip freeze into requirements.txt. CI builds from that file. A global pip install is how the laptop and the container disagree.

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
python -m venv .venv
```

## The usual miss

Installing fastapi into the system interpreter.

## They will ask

What file does CI install from?

## Before you close the laptop

Create the venv in the agent folder.
