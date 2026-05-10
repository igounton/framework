# AIDD Framework Catalog

Auto-generated framework content: agents, commands, rules, skills, and templates.

> This file is automatically updated by the `scripts/summarize-markdown.mjs` script.

## Table of Contents

- [`.claude-plugin`](#claude-plugin)
- [`agents`](#agents)
- [`skills`](#skills)
  - [`skills/00-sdlc`](#skills00-sdlc)
  - [`skills/01-plan`](#skills01-plan)
  - [`skills/02-implement`](#skills02-implement)
  - [`skills/03-assert`](#skills03-assert)
  - [`skills/04-audit`](#skills04-audit)
  - [`skills/05-review`](#skills05-review)
  - [`skills/06-test`](#skills06-test)
  - [`skills/07-refactor`](#skills07-refactor)
  - [`skills/08-debug`](#skills08-debug)
  - [`skills/09-for-sure`](#skills09-for-sure)

---

### `.claude-plugin`

| File |
|------|
| [plugin.json](.claude-plugin/plugin.json) |

### `agents`

| File | Description | Model |
|------|---|---|
| [implementer.md](agents/implementer.md) | `Milestone executor. Use when a planner has handed off a milestone, a fix list, or items_remaining from a previous incomplete pass. Codes, tests, repairs. Returns what's done, what's remaining, and a completion score. Never replans, never judges.` | `sonnet` |
| [planner.md](agents/planner.md) | `Planning agent. Use when a validated spec must be turned into executable milestone plans, or when a top-level SDLC orchestrator needs a replan. Writes plans and decisions only. Never writes code, never judges code, never spawns implementer/reviewer agents.` | `opus` |
| [reviewer.md](agents/reviewer.md) | `Independent critic in fresh context. Use when an artifact (code, spec, plan, doc) needs verification against a validator (acceptance criteria, checklist file, or any explicit ruleset). Returns reviewed items, findings, completion score and quality score. Never edits the artifact, never decides what to do next.` | `opus` |

### `skills`

#### `skills/00-sdlc`

| File | Description |
|------|---|
| [SKILL.md](skills/00-sdlc/SKILL.md) | `Pure orchestrator for the full AIDD development flow. Use when a human (or Gardener) needs to take a free-form request from idea to shipped code, end-to-end. Coordinates spec generation, planning, implementation, and review by composing other skills and agents. Holds no business logic of its own — every step is delegated.` |

#### `skills/01-plan`

| File | Description |
|------|---|
| [SKILL.md](skills/01-plan/SKILL.md) | `Generate technical implementation plans, define component behaviors, and extract design details from images.` |

#### `skills/02-implement`

| File | Description |
|------|---|
| [SKILL.md](skills/02-implement/SKILL.md) | `Execute an implementation plan phase by phase via the implementer agent, iterating until 100% completeness.` |

#### `skills/03-assert`

| File | Description |
|------|---|
| [SKILL.md](skills/03-assert/SKILL.md) | `Assert features work as intended — general assertions, architecture conformance, and frontend UI validation.` |

#### `skills/04-audit`

| File | Description |
|------|---|
| [SKILL.md](skills/04-audit/SKILL.md) | `Perform deep codebase analysis to identify technical debt, dead code, and improvement opportunities.` |

#### `skills/05-review`

| File | Description |
|------|---|
| [SKILL.md](skills/05-review/SKILL.md) | `Review code quality against project rules and validate feature behavior against plan specifications.` |

#### `skills/06-test`

| File | Description |
|------|---|
| [SKILL.md](skills/06-test/SKILL.md) | `Write and iterate on tests until they pass, and validate user journeys end-to-end in the browser.` |

#### `skills/07-refactor`

| File | Description |
|------|---|
| [SKILL.md](skills/07-refactor/SKILL.md) | `Optimize code for performance and fix security vulnerabilities following OWASP guidelines.` |

#### `skills/08-debug`

| File | Description |
|------|---|
| [SKILL.md](skills/08-debug/SKILL.md) | `Reproduce and fix bugs systematically using test-driven workflow, root cause analysis, and hypothesis validation.` |

#### `skills/09-for-sure`

| File | Description |
|------|---|
| [SKILL.md](skills/09-for-sure/SKILL.md) | `Iterative agent loop that tracks attempts and retries until a success condition is met. Use when the user says "for sure", "make sure", "keep trying until", "loop until done", "don't stop until", or needs guaranteed completion of a task with explicit success criteria.` |

