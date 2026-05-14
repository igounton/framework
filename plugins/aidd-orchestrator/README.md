# aidd-orchestrator

Orchestration plugin for the AI-Driven Development framework.

Composes capabilities into deterministic, auditable flows. Each skill is one orchestration brick; several use cases coexist inside the same plugin.

## Skills

### Use case: `async-dev`

| Bracket ID | Skill | Description |
|------------|-------|-------------|
| [6.1] | [setup-async-dev](skills/01-setup-async-dev/README.md) | Bootstrap the async-dev pipeline in a target repo (workflow, scripts, labels, secrets). |
| [6.2] | [run-async-dev](skills/02-run-async-dev/README.md) | Drive the implementation of a labelled issue into a pull request via the loaded SDLC capability. |
| [6.3] | [review-async-dev](skills/03-review-async-dev/README.md) | Drive the review-and-fix loop on the resulting PR until stop conditions trigger. |

Each skill has its own README covering when to use, how to invoke, prerequisites, and outputs.

### Roadmap

| Use case | Direction |
|----------|-----------|
| `agentic-orchestration` | Multi-agent coordination - sub-agents, hand-offs, supervision. |
| `flow-orchestration` | Conditional / branching pipelines - human gates, fallbacks, retries. |

## Install

See the [framework quick start](../../README.md#quick-start).
