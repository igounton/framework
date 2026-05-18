---
name: aidd-orchestrator:00:async-dev
description: Pure dispatcher for the async-dev pipeline. Use when the user says "async dev", "/async-dev", "claude on issues", or when the entry point is ambiguous (e.g. "set up async dev and run on issue 42"). Detects intent (setup vs run vs review) from `$ARGUMENTS`, trigger source (env, label, PR comment), and repo state, then delegates to the matching specialized skill. Holds no business logic; every step is delegated. Do NOT use when the user explicitly names setup, run, or review (invoke the matching skill directly), or for plain status checks on the async pipeline.
---

# Async-dev

Single entry point for the async-dev pipeline. Routes one human or automated trigger to exactly one downstream skill.

## Iron rule

**You are the dispatcher, not a doer.**

You inspect the trigger and the repo, pick one downstream skill, then delegate. You never edit files, call `gh`, or run CI yourself.

## Downstream targets

| Target skill                              | Domain                                         |
| ----------------------------------------- | ---------------------------------------------- |
| `aidd-orchestrator:01:setup-async-dev`    | First-time install or major config rotation    |
| `aidd-orchestrator:02:run-async-dev`      | One pipeline cycle on a ready issue            |
| `aidd-orchestrator:03:review-async-dev`   | Review-fix loop on an open PR                  |

## Actions

| #   | Action     | Role                                                          |
| --- | ---------- | ------------------------------------------------------------- |
| 01  | `dispatch` | Detect signals, pick target skill, invoke once, return result |

Files: `actions/01-dispatch.md`.

## Detection matrix

| Signal                                                                                          | Route                       |
| ----------------------------------------------------------------------------------------------- | --------------------------- |
| Missing `.github/workflows/aidd-async.yml` AND missing `.claude/aidd-orchestrator.json`         | `setup-async-dev`           |
| `$ARGUMENTS` contains `setup`, `install`, `configure`, `bootstrap`                              | `setup-async-dev`           |
| Issue labeled `to-implement`, or `$ARGUMENTS` contains `run`, `implement`, `process`, an issue id | `run-async-dev`             |
| Issue labeled `to-review`, PR comment `@claude /review`, or `$ARGUMENTS` contains `review`, `iterate`, a PR id | `review-async-dev`          |
| `GITHUB_EVENT_NAME=issues` + label payload                                                       | derive from label name      |
| `GITHUB_EVENT_NAME=issue_comment` + comment body                                                 | parse comment for `/review` |

Tie-break: most-specific signal wins (PR number > label > free-text keyword > config absence).

## Rules

- Exactly one downstream skill is invoked per dispatch. If two signals tie, ask the human (interactive) or pick the most-specific (auto).
- Never inline the downstream skill's logic. Delegate by name.
- Never re-dispatch from the downstream skill. Each downstream skill is allowed to invoke peer skills, but not this dispatcher (no recursion).
- If no signal matches, list the three downstream skills with one-line triggers and ask the human which to run.
- If the repo state contradicts the requested intent (e.g. user says "run" but config absent), surface the conflict before delegating; never silently switch.

## References

- `aidd-orchestrator:01:setup-async-dev`
- `aidd-orchestrator:02:run-async-dev`
- `aidd-orchestrator:03:review-async-dev`

## Assets

- None.
