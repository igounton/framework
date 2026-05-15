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

### Source of truth

The repo's `commitlint.config.cjs` enforces the format and lists the encouraged scopes (read it before composing a commit message). The summary below mirrors that file; if the two disagree, the config wins.

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
| `build` | Build system or external deps |

### Scopes

Scope is optional. When provided, it MUST be kebab-case (enforced by `scope-case`). A whitelist of encouraged scopes lives in `commitlint.config.cjs` (`scope-enum`) at the `warning` level: an unknown scope produces a warning but does NOT block the commit. Use a known scope whenever it fits; introduce a new one only when no existing scope describes the change.

Encouraged scopes (kept in sync with `commitlint.config.cjs`):

- **Plugin (long form)**: `aidd-context`, `aidd-dev`, `aidd-vcs`, `aidd-pm`, `aidd-refine`, `aidd-orchestrator`
- **Plugin (short form)**: `context`, `dev`, `vcs`, `pm`, `refine`, `orchestrator`
- **Root**: `framework`, `marketplace` (these bump `marketplace.json` via release-please)
- **Tooling**: `release-please`, `ci`, `deps`, `lefthook`, `commitlint`, `contributing`, `docs`, `security`, `test`

### Description rules

- Imperative mood: "add" not "added"
- Lowercase, no period
- Max 72 chars

### Examples

```text
feat(orchestrator): per-developer Anthropic account routing
fix(orchestrator): SDLC owns push + PR
refactor(aidd-pm): restructure spec into build and refine actions
chore(release-please): register orchestrator and refine packages
ci(framework): drop version.txt from tarball step
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
