# Roadmap

Public direction. Intent, not commitments. Shipped reality lives in [`CHANGELOG.md`](./CHANGELOG.md).

## Now

- `aidd-orchestrator`: extend beyond `async-dev` with `agentic-orchestration` (multi-agent hand-offs) and `flow-orchestration` (branching pipelines with human gates).
- Snapshot eval pipeline: run each plugin's `evals/scenarios.json` against a pinned model on every release PR; fail when expected action drifts.
- Open the repository to external contributors (issue templates, labels, branch protection on `main`).

## Next

- Skill frontmatter extensions: `model:`, `effort:`, `allowed-tools:` per skill.
- Per-plugin `authors:` metadata surfaced in plugin README and `marketplace.json`.
- Cost transparency badges (low / medium / high) per skill, backed by eval runs.
- Cross-tool parity with [`aidd-cli`](https://github.com/ai-driven-dev/aidd-cli) (Cursor, Copilot, OpenCode).

## Later

- Native ticketing integrations in `aidd-pm` (Linear, GitHub Projects v2, Notion).
- French-translated README and core docs.
- GitHub App for write operations (replace the PAT pattern used by `aidd-orchestrator` remote mode).

## How to influence

- Open an issue with the `feat:` template.
- Thumbs-up existing issues; reaction counts feed priority.
- Discuss on [Discord](https://discord.gg/ai-driven-dev).
- Sponsored work: see [`.github/FUNDING.yml`](./.github/FUNDING.yml).
