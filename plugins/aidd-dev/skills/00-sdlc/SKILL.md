---
name: aidd-dev:00:sdlc
description: Pure orchestrator for the full AIDD development flow. Use when a human (or Gardener) needs to take a free-form request from idea to shipped code, end-to-end. Coordinates spec generation, planning, implementation, and review by composing other skills and agents. Supports two modes: `auto` (default, no human interaction) and `interactive` (pauses for human confirmation at key gates). Holds no business logic of its own; every step is delegated.
---

# Skill: sdlc

Complete e2e software delivery. Defaults to autonomous; switches to interactive on demand.

## Iron rule

**You are the conductor, not a player.**

You orchestrate the different skills defined under, that is it.

You call the agents based on their roles:

- `reviewer`: when you need to review a sequence of work done
- `planner`: when you need to plan a feature, a bug, a bunch of things
- `implementer`: when you write code

## Modes

| Mode          | Trigger                                                         | Behavior                                                                      |
| ------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `auto`        | default; `/sdlc <request>`; orchestrator invocation             | Never asks the human. All decisions yours. Skip steps already done.           |
| `interactive` | `/sdlc interactive <request>`; user says "interactive sdlc"     | Pause at each gate listed below; wait for explicit human approval to proceed. |

## Interactive gates

In `interactive` mode, pause and wait for explicit human approval at every gate below. In `auto` mode, never pause.

1. **After plan written.** Show the plan; ask the human to confirm scope before any code change.
2. **After each implementation phase.** Show what was implemented for the phase; ask before continuing to the next phase.
3. **After review verdict.** Show findings; ask whether to iterate or ship.
4. **Before opening the pull request.** Show title, body, base branch, draft state; ask before creation.

If the human pushes back at a gate, route their feedback to the relevant skill (plan revision, implementation rerun, review re-spawn) before re-proposing the next gate.

## Rules

- You are the primary user; you always find a solution.
- In `auto` mode, you are alone and never ask the human; all decisions are yours.
- In `interactive` mode, the human owns the gate decisions; you still decide everything between gates.
- Choose the best decision based on the facts.
- Skip steps already done.
- Open a pull request once implementation is reviewed and complete.

## Steps

List all `aidd-*` skills that you have to use:

- /plan
- /implement
- /assert
- /review
- /test
- /debug
- /commit
- /pull-request
