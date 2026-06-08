---
name: 01-scaffold
model: opus
description: Build a brand-new project into a running, proven skeleton. Interactively drives the design first (the stack, the architecture, and the technical building blocks the app needs, via the design layer, into an INSTALL.md), then generates the full folder and route tree (every page and API route wired with stub handlers), the selected building blocks as swappable abstractions, an installed test harness, a minimal CI pipeline, the base project docs, the AIDD context layer, and an initialized git repository - proven against a final checklist. Use when the user says scaffold the project, build a new project, initialize the project files, or build the running skeleton. Do NOT use for producing design or architecture docs only (that is the design layer's role), adding features to an existing project, or generating business logic.
---

# Scaffold

> Tell user the goal: idea -> running, proven skeleton. Design decided with them; build automated.

Run every step in order; advance only when step test passes. Flow = human-AI conversation.

| #  | Step                                   | Runs                                                   | Gate                          |
| -- | -------------------------------------- | ------------------------------------------------------ | ----------------------------- |
| 1  | Decide stack + architecture + blocks (writes `INSTALL.md` + root `README.md`) | skill: `aidd-context:01-bootstrap` | `INSTALL.md` validated by USER |
| 2  | Scan blind spots                       | skill: `aidd-refine:04-shadow-areas`                   | high-severity ↺ to 1          |
| 3  | Init repo (writes `CONTRIBUTING.md`)   | skill: `aidd-vcs:00-repo-init` (init)                  |                               |
| 4  | Generate architecture (structure + stubs) | `actions/01-generate-architecture.md`               | tree validated by the USER    |
| 5  | Implement blocks + tests, then verify  | `actions/02-implement-and-test.md`                     | checklist green ⇒ else halt   |
| 6  | Wire minimal CI                        | `actions/03-wire-ci.md`                                |                               |
| 7  | Init AIDD context (vs real code)       | skill: `aidd-context:02-project-init`                  |                               |
| 8  | Generate file-convention rule          | skill: `aidd-context:03-context-generate` (rules, topic = step-4 file conventions) | rule written (`01`/`03`) |
| 9  | First commit + publish                 | skill: `aidd-vcs:01-commit` -> `aidd-vcs:00-repo-init` (publish) | |
| 10 | Handoff (report vs checklist)          | router report (no file)                                |                               |

## Available actions

The three owned actions run as Flow steps 4 (`01`), 5 (`02`), 6 (`03`). Every other step is a delegated `skill:`.

| #  | Action                  | Role                                                                       | Input                       |
| -- | ----------------------- | -------------------------------------------------------------------------- | --------------------------- |
| 01 | `generate-architecture` | Structure tree + file conventions + every route as a navigable stub (back + front) | INSTALL.md          |
| 02 | `implement-and-test`    | Wire each selected building block (swappable abstraction + smoke test), then run the full checklist green - hard gate | generated tree + INSTALL.md |
| 03 | `wire-ci`               | Minimal CI that runs the tests                                             | verified project            |

## Resume - show what's already done

Before step 1, detect existing artifacts; present a done/remaining checklist of the flow to the human; resume interactively from the first unmet step. Never silently redo or skip.

```markdown
@references/project-doc-spec.md
```

Render as `✓` / `◻` checklist; human decides where to pick up.

## Rules

- **Interactive design; never fabricate.** Steps 1-2 invoke their skills and **wait for the human** at every question and validation - never invent the stack, architecture, or building blocks. Do not start generation until the human has validated `INSTALL.md`. If a validated `INSTALL.md` exists, confirm it with the human instead of re-asking. Only a scaffolder pipeline run with `auto` may skip the prompts.
- **Architecture 100%, business 0%.** Routes carry only minimal behavior to pass their tests - no auth, no domain logic.
- **The checklist is the guarantee.** Action `02` ends by running the full assertive checklist (`references/project-doc-spec.md`); any unchecked item halts the run - never auto-patched.
- **File conventions decided once.** Decided at step 4, applied to stubs; persisted by step 7 (casing -> memory) and step 8 (placement -> rule). Never defined twice.

## References

- `references/project-doc-spec.md` - the assertive checklist action `02` runs (rendered in `## Resume`).

Root docs are not scaffold's assets: `README.md` + `INSTALL.md` come from the design phase (`aidd-context:01-bootstrap`), `CONTRIBUTING.md` from `aidd-vcs:00-repo-init`.
