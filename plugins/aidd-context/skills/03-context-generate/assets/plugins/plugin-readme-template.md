# {{plugin_name}}

{{plugin_description}}

## Capabilities

<List the skills, agents, and hooks shipped by this plugin once they exist.>

## Install

```bash
claude plugin install {{plugin_name}}
```

## Layout

- `.claude-plugin/plugin.json` - plugin manifest.
- `skills/` - one folder per skill (each with `SKILL.md`, `actions/`, optional `assets/`, `references/`, `evals/`).
- `agents/` - flat agent files (optional).
- `hooks/` - hook scripts and `hooks.json` (optional).
