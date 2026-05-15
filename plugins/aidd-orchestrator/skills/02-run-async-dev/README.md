← [aidd-framework](../../../../README.md) / [aidd-orchestrator](../../README.md)

# 02 - Run async-dev

Drives one async-dev cycle: locks a ready issue, delegates the implementation
to the loaded SDLC capability, opens a pull request, and writes an audit
record. The skill never implements code itself - it coordinates.

## Lifecycle

```mermaid
---
title: async-dev lifecycle
---
stateDiagram-v2
  state "backlog (no label)" as Backlog
  state "ready (to-implement)" as Ready
  state "working (claude/working)" as Working
  state "awaiting review (claude/awaiting-review)" as Awaiting
  state "review requested (to-review)" as ReviewRequested
  state "fixing (claude/working)" as Fixing
  state "blocked (claude/blocked)" as Blocked
  state "closed (issue closed via merged PR)" as Closed

  [*] --> Backlog
  Backlog --> Ready: human labels to-implement
  Ready --> Working: orchestrator acquires lock
  Working --> Awaiting: PR opened
  Working --> Blocked: run fails or dependency missing
  Awaiting --> ReviewRequested: human labels to-review
  ReviewRequested --> Fixing: orchestrator acquires lock
  Fixing --> Awaiting: fix commits pushed and summary posted
  Fixing --> Blocked: max iterations or human reviewer mid-loop
  Awaiting --> Closed: human merges PR
  Blocked --> Ready: human resolves and re-labels to-implement
  Closed --> [*]
```

Humans only touch the `to-*` labels. Claude only touches the `claude/*` labels. The split is enforced by the workflow's dispatch step.

## When to use

- A fresh GitHub issue carries `to-implement` (or the equivalent `@claude
  /implement` mention) and you want the pipeline to pick it up.
- A poll script / cron / mention surfaces a new ready issue.

## When NOT to use

- For the post-PR review-and-fix loop → use `03-review-async-dev`.
- To configure the workflow, labels, or secrets → use `01-setup-async-dev`.
- To dispatch multiple issues at once → invoke once per issue; the lock keeps
  parallel runs from colliding.

## How to invoke

```
Use skill aidd-orchestrator:02:run-async-dev on issue #<N>
```

The skill walks 6 atomic actions:

1. `poll-ready` - list ready issues.
2. `resolve-deps` - filter out blocked ones.
3. `acquire-lock` - swap `to-implement` → `claude/working`.
4. `check-sdlc` - discover the SDLC capability by description.
5. `delegate-sdlc` - invoke that capability via the `Skill` tool with a
   single free-text `request` plus any human comments. No branch name, no
   `Closes #N`, no PR-title format - the SDLC owns those decisions so it
   runs identically whether called by the orchestrator or by a human.
6. `write-audit` - emit `$RUNNER_TEMP/run-result.json` and exit.

## Outputs

This skill emits one artifact: `$RUNNER_TEMP/run-result.json`.

Everything else (audit log persistence under `aidd_docs/async-runs/`, the
GitHub Check Run, the label transition to `claude/awaiting-review` or
`claude/blocked`, the completion marker) is owned by the workflow's
post-job step, which reads `run-result.json` after the skill exits. Branch
name and pull-request body shape are owned by the SDLC that action 05
delegated to.

## Prerequisites

- `01-setup-async-dev` has already run on the repo.
- The required secrets are present (Anthropic + GitHub write).
- An SDLC capability is loaded (the run aborts to `claude/blocked` otherwise).

## Failure semantics

Any failure between actions 03 and 06 swaps the lock for `claude/blocked` and
posts the cause on the issue. The audit record carries the error details.
The most common cause is a write token that lacks the `workflows` scope when
the issue touches `.github/workflows/**`.

## Technical details

See [`SKILL.md`](SKILL.md) for the action contract and [`actions/`](actions/)
for each step. The delegation contract enforced by action 05 is the
non-bypassable core of this skill - the orchestrator MUST call the SDLC via
the `Skill` tool, never inline its own edits.
