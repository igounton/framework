← [aidd-framework](../../../../README.md) / [aidd-orchestrator](../../README.md)

# 00 - Async-dev

Single entry point for the async-dev pipeline. Dispatches one trigger to exactly
one specialized skill (setup, run, or review).

## When to use

- The user types `/async-dev` or "async dev" without naming a phase.
- A GitHub event fires and the right downstream skill must be picked from the
  label or comment payload.
- The intent mixes phases ("set up async dev and run on issue 42").

## When NOT to use

- The user named the phase explicitly (`/setup-async-dev`, `/run-async-dev`,
  `/review-async-dev`) - invoke that skill directly.
- The downstream skill is already running and needs to call a peer; do not
  re-enter the dispatcher.

## How to invoke

```
Use skill aidd-orchestrator:00:async-dev
```

The skill reads `$ARGUMENTS`, environment, and repo state, then delegates once.

## Outputs

- `target_skill` selected by the detection matrix.
- `signals_used` list (each signal name + observed value).
- The downstream skill's full return value, surfaced unchanged.

## Technical details

See [`SKILL.md`](SKILL.md) for the detection matrix and routing rules,
[`actions/01-dispatch.md`](actions/01-dispatch.md) for the single dispatch
action.
