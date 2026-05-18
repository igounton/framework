# 01 - Capture plugin intent

Clarify what plugin the user wants before any file is touched.

## Inputs

- Free-form user request about creating a new plugin.

## Outputs

Decisions held in conversation context (not written to disk):

```yaml
plugin_name: <kebab-case, prefix-allowed (e.g. aidd-obs)>
plugin_description: <one-sentence; what capability the plugin exposes>
domain_type: tool | activity
artifact_set:
  skills: true | false
  agents: true | false
  hooks: true | false
  mcp: true | false
location: local | global
seed_skill:
  name: <kebab-case, optional>
  description: <one-sentence, optional>
```

Plus a **plugin landscape** report (existing plugins inventory + overlap alerts).

## Process

1. **Inventory plugins.** Read `.claude-plugin/plugin.json` of every installed plugin (project + global). Print a markdown table: `name`, `version`, first sentence of `description`.
2. **Ask the plugin's single purpose** in one sentence. If the purpose overlaps an existing plugin, propose merge, scope-tighten, or rename.
3. **Validate `plugin_name`** per `../../references/naming-conventions.md` (kebab-case, no spaces, prefix conventions like `aidd-` allowed when appropriate).
4. **Choose `domain_type`** (tool vs activity). Same rule as skills: tool = singular noun (`slack`); activity = action verb (`audit`).
5. **Pick `artifact_set`.** Ask which slots the plugin needs: skills (always at least one), agents (optional), hooks (optional), MCP servers (optional). Empty plugins are blocked.
6. **Surface overlaps.** Same `plugin_name` already on disk -> block. Description trigger overlap with another plugin -> ask for resolution before continuing.
7. **Optionally collect a seed skill.** If the user names one, capture `seed_skill.name` and `seed_skill.description` so action 03 can delegate to the existing `actions/skills/` flow.

## Test

The plugin-intent decisions above are stated and confirmed by the user in writing; the existing-plugins inventory was shown; every overlap was either resolved or explicitly noted "none".
