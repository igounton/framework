# aidd-orchestrator catalog

Auto-generated index of skills, agents, references and assets shipped by the `aidd-orchestrator` plugin.

> This file is automatically updated by the `scripts/summarize-markdown.js` script.

## Table of Contents

- [`.claude-plugin`](#claude-plugin)
- [`skills`](#skills)
  - [`skills/00-async-dev`](#skills00-async-dev)
  - [`skills/01-scaffold`](#skills01-scaffold)

---

### `.claude-plugin`

| File |
|------|
| [plugin.json](.claude-plugin/plugin.json) |

### `skills`

#### `skills/00-async-dev`

| Group | File | Description |
|-------|------|---|
| `evals` | [scenarios.json](skills/00-async-dev/evals/scenarios.json) | - |
| `-` | [README.md](skills/00-async-dev/README.md) | - |
| `references` | [routing.md](skills/00-async-dev/references/routing.md) | - |
| `-` | [SKILL.md](skills/00-async-dev/SKILL.md) | `Single entry point for the async-dev pipeline (setup, run, review). Hybrid router decides which sub-flow to execute from $ARGUMENTS keyword (`setup` / `run` / `review`), trigger source (label `to-implement` / `to-review`, comment `@claude /implement` / `/review`), repo state (workflow + config presence, PR linked to issue), or natural-language intent. Use when the user says "set up async dev", "run async dev on issue #N", "address review on PR #N", "/async-dev", "claude on issues", or when triggered by a webhook with the matching labels or comments. Do NOT use for plain status checks on the async pipeline or for SDLC orchestration unrelated to issue/PR automation.` |

#### `skills/01-scaffold`

| Group | File | Description |
|-------|------|---|
| `actions` | [01-generate-architecture.md](skills/01-scaffold/actions/01-generate-architecture.md) | - |
| `actions` | [02-implement-and-test.md](skills/01-scaffold/actions/02-implement-and-test.md) | - |
| `actions` | [03-wire-ci.md](skills/01-scaffold/actions/03-wire-ci.md) | - |
| `evals` | [scenarios.json](skills/01-scaffold/evals/scenarios.json) | - |
| `-` | [README.md](skills/01-scaffold/README.md) | - |
| `references` | [project-doc-spec.md](skills/01-scaffold/references/project-doc-spec.md) | - |
| `-` | [SKILL.md](skills/01-scaffold/SKILL.md) | `Build a brand-new project into a running, proven skeleton. Interactively drives the design first (the stack, the architecture, and the technical building blocks the app needs, via the design layer, into an INSTALL.md), then generates the full folder and route tree (every page and API route wired with stub handlers), the selected building blocks as swappable abstractions, an installed test harness, a minimal CI pipeline, the base project docs, the AIDD context layer, and an initialized git repository - proven against a final checklist. Use when the user says scaffold the project, build a new project, initialize the project files, or build the running skeleton. Do NOT use for producing design or architecture docs only (that is the design layer's role), adding features to an existing project, or generating business logic.` |

