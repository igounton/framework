# Plugin manifest (`plugin.json`)

Lives at `<plugin>/.claude-plugin/plugin.json`. Validated by `claude plugin validate <dir>`.

## Required

- `name` (string, min 1) - unique plugin identifier; kebab-case is the convention.

## Optional metadata

| Field         | Type             | Notes                                                                       |
| ------------- | ---------------- | --------------------------------------------------------------------------- |
| `version`     | string           | Semver (`1.2.3`). Pin per release; bump on every release or omit to use the commit SHA. |
| `description` | string           | Short user-facing summary.                                                  |
| `author`      | object           | `name` required; `email`, `url` optional.                                   |
| `homepage`    | string (URI)     | Plugin homepage or docs.                                                    |
| `repository`  | string           | Source repo URL.                                                            |
| `license`     | string           | SPDX identifier (`MIT`, `Apache-2.0`).                                      |
| `keywords`    | array of strings | Discovery tags.                                                             |
| `dependencies`| array            | Each item is either `<plugin-name>[@<marketplace>][@^<range>]` or `{ name, marketplace? }`. |

## Optional component slots

Each slot accepts a path (relative, starts with `./`), an array of paths, or an inline object.

| Slot           | Notes                                                                                  |
| -------------- | -------------------------------------------------------------------------------------- |
| `skills`       | Path(s) to skill directories containing `<name>/SKILL.md`.                             |
| `commands`     | Path(s) to flat `.md` command files OR a name -> metadata map (`source`, `content`, `description`, `argumentHint`, `model`, `allowedTools`). |
| `agents`       | Path(s) to `.md` agent files.                                                          |
| `hooks`        | Path to a `.json` file OR object keyed by hook event (`PreToolUse`, `PostToolUse`, ...). |
| `mcpServers`   | Path, object map (`stdio` / `sse` / `http` / `ws`), or array.                          |
| `lspServers`   | Path or object map; each server needs `command` + `extensionToLanguage`.               |
| `monitors`     | Path or array of `{ name, command, description, when }`.                               |
| `outputStyles` | Path(s).                                                                               |
| `themes`       | Path(s).                                                                               |
| `channels`     | Array of `{ server, displayName?, userConfig? }`.                                      |
| `settings`     | Object merged into Claude Code settings while plugin is enabled.                       |
| `userConfig`   | Object keyed by var name; each value: `{ type, title, description, required?, default?, multiple?, sensitive?, min?, max? }`. `type` enum: `string` / `number` / `boolean` / `directory` / `file`. |

## Hook events (when defining `hooks` inline)

`PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`, `Notification`, `UserPromptSubmit`, `UserPromptExpansion`, `SessionStart`, `SessionEnd`, `Stop`, `StopFailure`, `SubagentStart`, `SubagentStop`, `PreCompact`, `PostCompact`, `PermissionRequest`, `PermissionDenied`, `Setup`, `TeammateIdle`, `TaskCreated`, `TaskCompleted`, `Elicitation`, `ElicitationResult`, `ConfigChange`, `WorktreeCreate`, `WorktreeRemove`, `InstructionsLoaded`, `CwdChanged`, `FileChanged`.

## Hook handler shapes

Inline hooks per event: array of `{ matcher?, hooks: [...] }`. Each handler is one of:

- `{ type: "command", command, if?, shell? (bash|powershell), timeout?, statusMessage?, once?, async?, asyncRewake? }`
- `{ type: "prompt", prompt, if?, timeout?, model?, statusMessage?, once? }`
- `{ type: "agent", prompt, if?, timeout?, model?, statusMessage?, once? }`
- `{ type: "http", url, if?, timeout?, headers?, allowedEnvVars?, statusMessage?, once? }`
- `{ type: "mcp_tool", server, tool, input?, if?, timeout?, statusMessage?, once? }`

## Path constraints

- Component-slot paths must start with `./`.
- `hooks` as a path must end in `.json`.
- `agents` as a path must end in `.md`.
- `mcpServers` / `lspServers` / `monitors` as a path must end in `.json` (except MCPB files for `mcpServers`).
