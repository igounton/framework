# Roadmap

Public direction for the AI-Driven Dev Framework. Items here are intent, not commitments; reality is set by what ships in `CHANGELOG.md`.

## Now (in progress)

- **`aidd-orchestrator` use case maturity.** `async-dev` is stable; the next two use cases on the orchestrator roadmap are `agentic-orchestration` (multi-agent hand-offs) and `flow-orchestration` (branching pipelines with human gates).
- **Schema-validated CI.** `lefthook` already validates marketplace, plugin, and settings JSON locally; lifting the same check into a GitHub Actions workflow so external contributors get the same gate without installing pipx.
- **Per-plugin release tagging.** `release-please` configured for `aidd-context`, `aidd-dev`, `aidd-vcs`, `aidd-pm`, `aidd-orchestrator`, `aidd-refine`. Tag format: `aidd-<plugin>-vX.Y.Z`.

## Next (planned)

- **Skill frontmatter extensions.** Standardise optional `model:`, `effort:`, and `allowed-tools:` keys per skill so cost and safety surfaces become machine-parseable.
- **`skills.json` aggregator.** Single repo-root JSON file listing every skill across every plugin, with description, version, model tier, and eval count. Stable URL for third-party indexes to consume.
- **Author and ownership metadata.** Plugin-level `authors:` array surfaced in plugin README and `marketplace.json` so end users can see who owns what.
- **Snapshot evaluation pipeline.** Run each plugin's `evals/scenarios.json` against a pinned model on every release-please PR; fail when the expected action drifts.
- **Demo asciinema cast** in the root README hero.

## Later (intent)

- **Native `aidd-pm` ticketing integrations** beyond Jira (Linear, GitHub Projects v2, Notion).
- **Cost transparency badges** ("low / medium / high" tier per skill) backed by snapshot evals.
- **Cross-tool runtime parity.** The [`aidd-cli`](https://github.com/ai-driven-dev/aidd-cli) project packages skills for Cursor, GitHub Copilot, OpenCode; align the test surface so the same scenarios pass on every tool.
- **Localisation.** A French-translated README + selected docs for the French-speaking community.
- **GitHub App for write operations** (replacing the PAT pattern used by `aidd-orchestrator` in remote mode) so commits get bot attribution and finer-grained scopes.

## Done (recent highlights)

- Multi-plugin marketplace with 6 plugins and 31 skills, all with per-skill README and populated `evals/scenarios.json`.
- Marketplace schema validation in pre-commit.
- Async-dev orchestration pipeline (label an issue, get a PR), including review loop.
- OSS scaffolding: LICENSE, SECURITY, CoC, CONTRIBUTING, PR template, issue templates, CODEOWNERS, FUNDING, dependabot.

## How to influence the roadmap

- Open an issue with the `feat:` template describing the use case.
- Drop a thumbs-up on existing issues; we use reaction counts as a coarse priority signal.
- Join the [Discord](https://discord.gg/ai-driven-dev) for design discussions.
- For sponsored work, see [`.github/FUNDING.yml`](./.github/FUNDING.yml).
