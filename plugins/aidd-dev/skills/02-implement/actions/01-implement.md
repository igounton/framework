# 01 - Implement

Code the whole feature based on the implementation plan, phase by phase, sequentially, until every acceptance criterion is satisfied.

## Inputs

```yaml
plan: <path to or content of the implementation plan, passed via $ARGUMENTS>
branch: <branch name>     # optional; created when the plan specifies one
```

## Outputs

```yaml
phases_completed: <int>
acceptance_satisfied: true
notes:
  - <plan amendments marked with 🤖>
```

## Process

1. **Branch.** Create a new branch if the plan specifies one (`git checkout -b <branch>`).
2. **Phase loop.** For each phase listed in the plan, in order:
   - Spawn the `implementer` agent via the `Task` tool, passing the phase scope and acceptance criteria.
   - Wait for the agent's structured output. If `completion_score < 100`, re-spawn with `items_remaining` until the phase reaches 100 %.
3. **Frontend render.** If the design (`01-plan:02-design`) produced a render delegation prompt, launch the `implementer` with it **as-is**. The prompt is self-contained - it names whatever design tool, verification, and loop to run, and carries its success condition. Don't inspect or re-specify its contents; just pass it through. Don't ship the visual on iteration count alone.
4. **Plan amendments.** If a phase is incorrect, incomplete, or blocked by missing information, amend the plan directly. Mark every change with 🤖 and a brief rationale.
5. **Boundaries.** Never format code. Never run dev mode. Follow project rules already loaded in context.
6. **Verify the feature.** Run validation commands, tests, and any manual checks required to confirm the feature works end to end.

## Test

After the loop terminates: every phase in the plan has its acceptance criteria checked off, validation commands exit zero, and no plan section is left in a `TBD` or `BLOCKED` state.
