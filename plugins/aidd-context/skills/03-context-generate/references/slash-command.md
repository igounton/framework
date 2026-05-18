# Slash commands

Two valid forms produce the same `/<name>` invocation:

- Flat: `<scope>/commands/<name>.md`
- Skill-based: `<scope>/skills/<name>/SKILL.md`

When both exist with the same name, the skill wins. Flat commands are right for one-shot manual triggers without supporting files; everything else uses a skill (with `actions/`, `assets/`, `references/`).

## Scopes

| Scope      | Path                                       | Audience                       |
| ---------- | ------------------------------------------ | ------------------------------ |
| Personal   | `~/.claude/commands/<name>.md`             | All projects on the user's machine. |
| Project    | `.claude/commands/<name>.md`               | This project only (commit to VCS). |
| Plugin     | `<plugin>/commands/<name>.md`              | Wherever the plugin is enabled; namespaced as `<plugin>:<name>`. |
| Enterprise | Managed settings location                  | Org-wide.                      |

Precedence (highest wins): enterprise > personal > project. Plugin commands live in their own namespace and never collide.

## Frontmatter fields

All optional unless noted. Only fields below are recognized.

| Field                      | Type                         | Notes                                                                 |
| -------------------------- | ---------------------------- | --------------------------------------------------------------------- |
| `name`                     | string (kebab-case, <=64)    | Display name. Defaults to the directory or filename.                  |
| `description`              | string                       | Strongly recommended. Drives auto-trigger. Combined with `when_to_use`, truncated at 1536 chars. |
| `when_to_use`              | string                       | Extra trigger hints. Counts toward the 1536-char cap.                 |
| `argument-hint`            | string                       | Autocomplete hint (e.g. `[issue-number]`).                            |
| `arguments`                | string (space-separated) or list | Named positional arguments enabling `$name` substitution.         |
| `disable-model-invocation` | boolean                      | `true` blocks auto-trigger; user-only via `/<name>`. Default `false`. |
| `user-invocable`           | boolean                      | `false` hides from the `/` menu; Claude-only. Default `true`.         |
| `allowed-tools`            | string (space-sep) or list   | Pre-approved tools while the command is active.                       |
| `model`                    | string                       | Override session model for this turn. `inherit` keeps active model.   |
| `effort`                   | enum                         | `low` / `medium` / `high` / `xhigh` / `max`.                          |
| `context`                  | `fork`                       | Run in a forked subagent context.                                     |
| `agent`                    | string                       | Subagent type when `context: fork`. Built-in: `Explore`, `Plan`, `general-purpose`, or any `.claude/agents/<type>`. |
| `hooks`                    | object                       | Hooks scoped to this command's lifecycle.                             |
| `paths`                    | string (comma-sep) or list   | Glob filters; auto-trigger only when working files match.             |
| `shell`                    | `bash` / `powershell`        | Shell used for `` !`...` `` injection. Default `bash`.                |

## Argument substitution

| Placeholder           | Value                                                            |
| --------------------- | ---------------------------------------------------------------- |
| `$ARGUMENTS`          | Full argument string, as typed.                                  |
| `$ARGUMENTS[N]`       | Nth argument, 0-based.                                           |
| `$N`                  | Shorthand for `$ARGUMENTS[N]`.                                   |
| `$<name>`             | Named argument from frontmatter `arguments` list.                |
| `${CLAUDE_SESSION_ID}`| Current session ID.                                              |
| `${CLAUDE_EFFORT}`    | Current effort level.                                            |
| `${CLAUDE_SKILL_DIR}` | Directory of this command/skill file.                            |

Indexed args use shell-style quoting: `/cmd "hello world" two` -> `$0` = `hello world`, `$1` = `two`. If the body lacks `$ARGUMENTS`, the runtime appends `ARGUMENTS: <value>` at the end.

## Inline shell injection

Use `` !`<command>` `` (inline) or a fenced code block opened with ` ```! ` (multi-line). The runtime executes the command before sending the prompt; output replaces the placeholder. Single pass: command output is not re-scanned for further placeholders.

Disabled by `disableSkillShellExecution: true` in settings.

## Conventions in this framework

- Single objective per command. < 10 steps. Body in English only. No markdown formatting in the rendered output.
- Description must include explicit triggers AND a `Do NOT use for...` clause.
- For commands organized by SDLC phase, place under `commands/<NN>_<phase>/<slug>.md` per the project's IDE mapping rule.
