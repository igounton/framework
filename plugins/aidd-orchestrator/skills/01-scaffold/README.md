← [aidd-orchestrator](../../README.md)

# 01-scaffold

Builds a brand-new project into a running, proven skeleton. Drives the design with you (stack, architecture, technical building blocks), then generates the full folder + route tree (every page and API route wired with stub handlers), each selected building block as a swappable abstraction, an installed test harness, a minimal CI pipeline, the project docs, the AIDD context layer, and an initialized git repository. Architecture generated per project (not copied from a template), proven against a final checklist.

> Status: experimental.

## When to use

- Starting a new project you want actually built and running - walks you through the design (stack, architecture, building blocks) then produces a green skeleton to start coding on.

## When NOT to use

- Producing only design or architecture docs (use the design layer on its own).
- Adding features or business logic to an existing project.
- Editing context documentation or memory files directly.

## How to invoke

`aidd-orchestrator:01-scaffold`, or say "scaffold a new project" / "build the running skeleton".

## Outputs

- A running project tree (routes wired, each selected building block as a swappable abstraction, green tests, minimal CI).
- `INSTALL.md` (technologies, why, how to install) + root `README.md` / `CONTRIBUTING.md` + the initialized AIDD context layer.
- An initialized git repository with a conventional initial commit (and a remote on request).

## Prerequisites

- Design + finalization capabilities reachable for delegation (stack-and-architecture, blind-spot scan, test, assertion, project-init, repo-init, commit).

## Technical details

Sequential router: delegated design + finalization, owned greenfield generation, checklist-based verification. See [SKILL.md](SKILL.md).
