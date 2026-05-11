# Versioning Control System (VCS) Guidelines

- Main Branch: `main`
- Platform: `github`
- CLI: `gh`
- Ticketing Tool: GitHub Issues

## Branch Naming Convention

### Format

```text
type/ticket-short-description
```

### Types

| Prefix | Usage |
| --- | --- |
| `feat/` | New feature |
| `fix/` | Bug fix |
| `docs/` | Documentation only |
| `refactor/` | Code change (no feat/fix) |
| `chore/` | Build, config, deps |
| `test/` | Add/update tests |
| `hotfix/` | Urgent production fix |

### Examples

```text
feat/plugin-architecture
fix/orchestrator-sdlc-push
docs/update-api-examples
chore/release-please-config
```

## Commit Convention

### Format

```text
type(scope): description

[optional body]

[optional footer]
```

### Types

| Type | Usage |
| --- | --- |
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code change (no feat/fix) |
| `perf` | Performance improvement |
| `test` | Add/update tests |
| `chore` | Build, config, deps |
| `style` | Formatting (no logic change) |
| `ci` | CI/CD configuration |
| `revert` | Revert previous commit |

### Description rules

- Imperative mood: "add" not "added"
- Lowercase, no period
- Max 72 chars

### Examples

```text
feat(orchestrator): per-developer Anthropic account routing
fix(orchestrator): SDLC owns push + PR
refactor(aidd-pm): restructure spec into build and refine actions
```

### Breaking Change

```text
feat(api): redesign plugin manifest format

BREAKING CHANGE: plugin.json now requires a `strict` field.
```

## Release Management

- Automated via `release-please` (GitHub Actions)
- Config: `release-please-config.json`, manifest: `.release-please-manifest.json`
- Per-plugin versioning with `include-component-in-tag: true`
- Tags format: `<plugin>-v<semver>` (e.g. `aidd-dev-v1.2.0`)
