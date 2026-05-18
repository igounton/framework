# 03 - Validate marketplace

Run the official validator and check install-time invariants before the marketplace is shared.

## Inputs

- `marketplace_path` (required) - `.claude-plugin/marketplace.json` produced by `@01-init-marketplace.md`.

## Outputs

```yaml
validation_status: pass | fail
findings:
  - path: <file>
    severity: error | warning
    rule: <rule id>
    detail: <one-line>
install_smoke:
  added: true | false
  installed_plugins:
    - <plugin_name>: ok | failed
```

## Depends on

- `01-init-marketplace`
- `02-add-plugin-entry` (at least one entry must be present, otherwise skip install smoke and surface a warning)

## Process

1. Run `claude plugin validate <repo-root>` (CLI) or `/plugin validate .` (inside Claude Code). Map every error / warning into `findings[]`. Block on any `error` severity.
2. Reserved-name check. Reload the marketplace JSON and re-confirm `name` is not on the reserved list in `@../../references/marketplace.md` (covers cases where action 02 was patched manually after init).
3. Source-shape check, per the shapes in `@../../references/marketplace.md`:
   - relative path -> directory exists, contains `.claude-plugin/plugin.json`, no `..` segments.
   - `github` -> `repo` is `owner/name` shape; `sha` (if present) is 40 hex chars.
   - `url` / `git-subdir` -> `url` is a valid git URL; `git-subdir` has a non-empty `path`.
   - `npm` -> `package` non-empty.
4. Cross-source duplicates. No two entries share `plugin_name`.
5. Local install smoke. When safe (clean working tree, user opt-in), run:
   - `claude plugin marketplace add <repo-root>`
   - `claude plugin install <first-plugin>@<marketplace_name>`
   - Record success/failure per plugin in `install_smoke.installed_plugins`.
   - Always remove the test marketplace afterwards: `claude plugin marketplace remove <marketplace_name>`.
6. Set `validation_status = pass` iff steps 1 - 4 produced no `error` findings AND (smoke skipped OR every install reported `ok`).

## Test

`validation_status == pass`; for a marketplace with at least one entry, `install_smoke.added == true` and every `installed_plugins` entry is `ok` (or the smoke step was explicitly skipped with a logged warning).
