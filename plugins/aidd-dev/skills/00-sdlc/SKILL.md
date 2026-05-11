---
name: aidd-dev:00:sdlc
description: Development SDLC orchestrator that drives a code-shipping request through spec, plan, implementation, and finalize phases, adapting entry to whichever artifacts already exist. Use when the user says "dev sdlc", "sdlc", "/sdlc <request>", "ship this from idea to code", "run the full dev flow", "from request to PR", "resume the SDLC run from <spec or plan>", or when an automation needs the end-to-end engineering pipeline. Do NOT use for product-side SDLC variants (a separate orchestrator covers PM flows), ad-hoc source edits without a spec, single git operations, or pure refactors with no acceptance criteria.
---

# Dev SDLC

Development pipeline conductor: composes other skills and agents to take a request from idea to shipped code. Holds no business logic of its own.

## Available actions

| #   | Action            | Role                                                                              | Input                              |
| --- | ----------------- | --------------------------------------------------------------------------------- | ---------------------------------- |
| 01  | `spec-phase`      | Generate a draft spec, validate it, retry on findings, commit when validated      | request or prd_path, working_dir   |
| 02  | `plan-phase`      | Drive the planner to produce a validated plan from the spec, then commit          | spec_path, options                 |
| 03  | `implementation`  | Hand the plan to the planner; the planner drives the milestone-by-milestone loop  | plan_path, child_paths             |
| 04  | `finalize`        | Write the run summary, commit, and open a pull request when requested             | working_dir, phase_outputs, options |

## Default flow

Sequential by phase, but the entry point adapts to inputs. Pick first match:

- `plan_path` provided -> skip Phases 1 and 2, enter at `03 implementation`.
- `spec_path` provided (validated) -> skip Phase 1, enter at `02 plan-phase`.
- `request` or `prd_path` provided -> run all four phases from `01 spec-phase`.

Each phase runs only after the previous one returns `status: validated` or `status: done`. Any phase returning `status: blocked` halts the run and escalates to the human.

## Transversal rules

- **Conductor, not player**. Never write code, run tests, commit, or load a skill into your own context. Every action delegates to a sub-agent in fresh context. Only structured outputs (YAML) are read; produced file contents are not.
- **Skill invocation protocol**. Never call `Skill(...)` directly. Wrap every skill invocation in an `Agent` spawn with `subagent_type: general-purpose`, prompt the agent to invoke the named skill with concrete inputs and return ONLY the YAML output, then parse the YAML. Same-plugin agents (`planner`, `reviewer`, `implementer`) load their own skills internally; that already satisfies the rule.
- **Role-based dispatch**. Phases reference capabilities by role (spec generation, planning, VCS commit, VCS pull request), not by skill id. The runtime resolver picks the installed skill whose description matches the role. If no installed skill matches a required role, return `status: blocked` with the missing role recorded in `notes`. Optional roles (e.g. PR creation when `open_pr: false`) skip silently.
- **Adaptive entry**. The orchestrator detects state from inputs and starts at the earliest phase whose prerequisite is missing (see Default flow).
- **Default working directory**. Resolve `working_dir` in this exact order, picking the first match:
   1. The caller passed an explicit `working_dir` -> use it.
   2. `aidd.docs_root` set in project memory -> `<that>/tasks/<yyyy_mm>/<yyyy_mm_dd>-<feature_name>/`.
   3. `aidd_docs/` directory exists at repo root -> `aidd_docs/tasks/<yyyy_mm>/<yyyy_mm_dd>-<feature_name>/`.
   4. `docs/` directory exists at repo root -> `docs/tasks/<yyyy_mm>/<yyyy_mm_dd>-<feature_name>/`.
   5. None of the above -> return `status: blocked` with `notes: "no project-docs-root resolvable; pass working_dir explicitly"`.
  Tool-internal directories (`.claude/`, `.aidd/`, etc.) are NEVER used as a fallback.
- **Working directory threading**. The orchestrator forwards the resolved `working_dir` to every phase that needs it (`spec-phase`, `plan-phase`, `implementation`, `finalize`). Phases never derive a different working directory.
- **Feature-name derivation**. Commit messages reference `<feature-name>`. The orchestrator derives it once at start: from `spec_path` filename when present (the slug between the `<yyyy_mm_dd>-` prefix and the `-prd.md` / `-spec.md` suffix), else from a short hash of the original `request`. Pass the resolved name to every phase that builds a commit message.
- **Sub-agent output verification**. After every sub-agent spawn that returns a path, verify the path exists on disk. On missing file, retry the spawn once with the same inputs; on second failure, return `status: blocked` with the failed path in `notes`.
- **Commits are always produced**. Every phase boundary and every ticked acceptance criterion during implementation produces a commit. There is no opt-out for commit production; the audit trail is mandatory.
- **Quality threshold and retry cap** apply per phase. Defaults: `quality_threshold: 90`, `retry_cap_per_step: 3`. Beyond the cap, the mode rule decides.
- **Mode**. `options.mode` controls human interaction. Default is `auto`.
  - `auto` -> never prompt the human. On any blocked decision, validator failure beyond the retry cap, or missing capability, return `status: blocked` with the cause in `notes` and halt the run cleanly. Suited for orchestrators and unattended automation.
  - `interactive` -> on blocked decisions or retry-cap events, surface the blocker, the latest output, and the suspected cause to the human; wait for input; resume with refined inputs. Suited for first-time runs or hands-on iteration.
- **Escalation (interactive only)**. When a step exceeds the retry cap or returns `blocked`, surface the blocker to the human and wait. Never silently continue.

## References

- None.

## Assets

- None.

## External data

- None.
