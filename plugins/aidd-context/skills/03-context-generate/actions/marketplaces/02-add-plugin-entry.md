# 02 - Add plugin entry

Append a plugin entry to `.claude-plugin/marketplace.json`.

## Inputs

- `marketplace_path` (required) - from `@01-init-marketplace.md`, or an existing path the user provides.
- `plugin_name` (required) - kebab-case plugin identifier, matches the plugin's own `plugin.json` `name`.
- `source` (required) - relative path (`./...`), or one of the object shapes `github` / `url` / `git-subdir` / `npm`.
- `description` (optional) - one-sentence plugin summary; falls back to the plugin's own `plugin.json` description.
- `version` (optional) - pin string. Omit to let the commit SHA drive updates.
- `category`, `tags`, `strict` (optional) - marketplace-specific fields.
- `author`, `homepage`, `repository`, `license`, `keywords`, `dependencies` (optional) - standard plugin-manifest metadata.

## Outputs

```yaml
plugin_entry: <the rendered JSON object>
plugin_count: <integer; total entries in plugins[] after append>
```

## Depends on

- `01-init-marketplace` (or an existing `.claude-plugin/marketplace.json`)

## Process

1. Load `marketplace_path`. Parse JSON; abort if invalid.
2. Verify no entry with the same `plugin_name` already exists. If yes, ask whether to replace or skip; never silently overwrite.
3. Build the entry from `@../../assets/marketplaces/plugin-entry-template.json` using only the fields the user supplied (shape rules: `@../../references/marketplace.md`). Drop any empty optional fields rather than emitting `null`.
4. For relative-path sources, verify the target directory exists under `<repo-root>` and contains `.claude-plugin/plugin.json`. For `github` / `url` / `git-subdir` / `npm` sources, no local check.
5. Append the entry to the `plugins` array. Write the file back with stable 2-space indentation.
6. Return the rendered entry and the new `plugin_count`.

## Test

The new entry is present in `marketplace_path` `plugins[]`; `claude plugin validate .` reports zero errors on the marketplace; for a relative-path source, `<repo-root>/<source>/.claude-plugin/plugin.json` resolves.
