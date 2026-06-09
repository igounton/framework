← [aidd-framework](../../../../README.md) / [aidd-context](../../README.md)

# 01 - Bootstrap

Technical architect **and** builder for a new project. **Design** (actions 01-06): walk a 24-item checklist, propose 2-3 candidate stacks, audit each via parallel agents, and produce a validated project-root `INSTALL.md` + `README.md`. **Build** (actions 07-14): materialize that validated `INSTALL.md` into a running, proven skeleton through atomic, stack-agnostic `init-*` actions. Architecture-100% / business-0% - never writes business logic (per the firewall in `docs/ARCHITECTURE.md`).

## When to use

- Starting a brand-new project and choosing a stack.
- Deciding the architecture pattern (monolith vs microservices vs serverless).
- Standing up the running skeleton from a fresh idea.

## When NOT to use

- Editing an existing project's stack (the audit is too heavy for one swap-out).
- Database schema design or detailed data modeling.
- Writing business logic (auth, domain rules, features).

## How to invoke

```
Use skill aidd-context:01-bootstrap
```

### Design phase → validated `INSTALL.md`

1. `gather-needs` - Q&A across the 24-item checklist plus selected building blocks.
2. `propose-candidates` - derive 2-3 candidate stacks, render a comparison table.
3. `audit-candidates` - parallel agents validate each candidate; if all fail, loop back to `02`/`01`.
4. `pick-and-design` - user picks the winning stack.
5. `decide-architecture` - fact-checked top-3 patterns, human-picked, plus a Mermaid module diagram.
6. `write-install-md` - produce the project-root `INSTALL.md` + `README.md`.

### Build phase → running skeleton

No build action runs until `INSTALL.md` is validated; conditional actions skip per `INSTALL.md`.

7. `init-structure` - folder tree + reachable route stubs.
8. `init-dependencies` - dependency manager + building blocks (swappable) + boot.
9. `init-env` - `.env.example` + config loading.
10. `init-database` - engine + baseline migration + seed fixtures + round-trip *(conditional)*.
11. `init-quality-gate` - typecheck + format + lint + commit-linter + pre-commit (one gate).
12. `init-tests` - runner + unit + e2e + coverage *(delegated)*.
13. `init-containers` - container ups & downs cleanly *(conditional)*.
14. `init-design-system` - design system *(front-only, delegated)*.
15. `init-ci` - pipeline runs the quality gate + tests, green on the server *(conditional)*.

## Outputs

- A validated project-root `INSTALL.md` + `README.md`, then a running skeleton proven by each build action's gate.

## Prerequisites

- A clear (or loosely-formed) product idea to discuss.
- A working directory.

## Technical details

See [`SKILL.md`](SKILL.md) for the action contract, [`actions/`](actions/) for each step, `references/stack-heuristics.md`, and `assets/`. The Mermaid diagram (action 05) renders via the sibling `04-mermaid` skill; `init-tests` and `init-design-system` delegate to the capability that owns them, discovered by description.
