---
name: 01-bootstrap
description: Imagine, validate, then stand up a new project. First designs the technical architecture through interactive Q&A, candidate-stack comparison, and multi-agent audit into a validated `INSTALL.md` + `README.md`; then materializes that `INSTALL.md` into a running, proven skeleton via atomic `init-*` actions (structure, dependencies, env, database, quality gate, tests, containers, design system). Stack-agnostic - every build action reads `INSTALL.md` and names no technology. Architecture-100% / business-0%: never writes business logic. Use when starting a new project, choosing a stack, or standing up the running skeleton. Do NOT use to add features to an existing project or to write business logic.
---

# Bootstrap

Technical architect **and** builder for a new project. Two phases. **Design** (01-06): walk a 24-item checklist, propose 2-3 candidate stacks, audit each, produce a validated `INSTALL.md` + `README.md`. **Build** (07-14): materialize that validated `INSTALL.md` into a running, proven skeleton through atomic, stack-agnostic `init-*` actions. Architecture-100% / business-0% - never writes business logic (per the firewall in `docs/ARCHITECTURE.md`).

## Available actions

**Design phase** - produces the validated `INSTALL.md` (docs only):

| #   | Action                | Role                                                           | Input              |
| --- | --------------------- | -------------------------------------------------------------- | ------------------ |
| 01  | `gather-needs`        | Q&A across the 24-item checklist                               | user intent        |
| 02  | `propose-candidates`  | Derive 2-3 candidate stacks, render comparison table           | filled checklist   |
| 03  | `audit-candidates`    | Spawn parallel agents to validate each candidate, emit verdict | candidates table   |
| 04  | `pick-and-design`     | User picks winning stack; fill block-4 stack choices           | audit report       |
| 05  | `decide-architecture` | Fact-checked top-3 architecture patterns, human-picked; Mermaid module diagram | chosen stack + needs |
| 06  | `write-install-md`    | Produce `INSTALL.md` + project-root `README.md`                | design + decisions |

**Build phase** - materializes the validated `INSTALL.md` into a running skeleton. Each action reads `INSTALL.md`, names no technology, has its own gate:

| #   | Action               | Role                                                                  | Delegate          |
| --- | -------------------- | --------------------------------------------------------------------- | ----------------- |
| 07  | `init-structure`     | Folder tree + reachable route stubs from `INSTALL.md`                 | owns              |
| 08  | `init-dependencies`  | Dependency manager + building blocks (swappable) + boot               | owns              |
| 09  | `init-env`           | `.env.example` + config loading                                       | owns              |
| 10  | `init-database`      | Engine + baseline migration + fixtures + round-trip *(conditional)*   | owns              |
| 11  | `init-quality-gate`  | typecheck + format + lint + commit-linter + pre-commit (one gate)     | owns              |
| 12  | `init-tests`         | Runner + 1 unit + 1 e2e + coverage                                    | testing capability |
| 13  | `init-containers`    | Container/compose ups & downs clean *(conditional)*                   | owns              |
| 14  | `init-design-system` | Design system *(front-only, conditional)*                             | design-system capability |
| 15  | `init-ci`            | Pipeline runs the quality gate + tests, green on the server *(conditional)* | owns              |

## Default flow

**Design** `01 → 02 → 03 → 04 → 05 → 06`, then **Build** `07 → 08 → 09 → 10 → 11 → 12 → 13 → 14 → 15`. Sequential. Audit (03) is a gate: if every candidate returns `❌`, loop back to 02 (revise candidates) or 01 (revisit needs). Architecture decision (05) is a human-validation gate on a fact-checked top-3. **No build action runs until `INSTALL.md` is validated** (end of 06). Conditional build actions (10, 13, 14, 15) skip when the project does not call for them. Each build action advances only when its own `## Test` gate is green.

## Transversal rules

- **Design before build; never fabricate.** No build action (07+) runs until the human has validated `INSTALL.md`. The design phase invents nothing - it waits for the human at every checklist and gate.
- **Architecture-100% / business-0%.** The build phase materializes a *validated* `INSTALL.md` - structure, building blocks, tooling, smoke tests - but never business logic (auth, domain rules, real features). Per the firewall in `docs/ARCHITECTURE.md`.
- **Stack-agnostic build.** Every `init-*` action reads `INSTALL.md` and names no technology of its own. The chosen tools come from `INSTALL.md`, not from the action prompt.
- **Delegate, don't reinvent.** `init-tests` and `init-design-system` delegate to the capability that owns them (discovered by description, never a hardcoded plugin name).
- **Anti-sycophancy.** When user stack preference conflicts with needs (e.g. wants Mongo for heavily relational data), challenge before accepting: surface audit concerns, ask for mitigation plan.
- **Recommend opinionated, not encyclopedic.** Each action proposes 2-3 options max, never a long catalog. User leaves with a concrete decision, not a research paper.
- **Stop on full checklist.** Action 01 keeps asking until the 18 user-input items (blocks 1-3) are filled - plus selected building blocks; the 6 derived items (block 4) are filled across actions 02, 04, 05 (architecture pattern).
- **Apply heuristics from `@references/stack-heuristics.md`** when proposing candidates.

## References

- `@references/stack-heuristics.md` - input → recommended-stack-family heuristics

## Assets

- `@assets/checklist.md` - the 24-item checklist (4 blocks)
- `@assets/INSTALL.md` - the `INSTALL.md` skeleton (technologies, why chosen, how to install)
- `@assets/README.md` - the project-root `README.md` template

## External data

- `aidd-context/skills/04-mermaid/SKILL.md` - invoked from action 05 to render the architecture diagram
