# Coding Guidelines

> Those rules must be minimal because they MUST be checked after EVERY CODE GENERATION.

## Requirements to complete a feature

**A feature is really completed if ALL of the above are satisfied: if not, iterate to fix all until all are green.**

## Commands to run

### Before commit

| Order | Command | Description |
| ----- | ------- | ----------- |
| 1 | `pnpm exec commitlint --edit` | Validate commit message against conventional commit spec |

### Before push

| Order | Command | Description |
| ----- | ------- | ----------- |
| 1 | `pnpm exec lefthook run pre-push` | Run parent repo hooks (delegates to parent lefthook.yml) |
