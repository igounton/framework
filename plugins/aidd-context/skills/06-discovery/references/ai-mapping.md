# AI mapping (discovery scan paths)

Where to look for each artifact type per AI tool. Scan-only: the paths and formats the find actions read. This is discovery's own minimal map - the single source of per-tool surfaces; actions never hardcode a tool.

## AI quick map - content artifacts

| AI             | Agents                      | Commands / Prompts                            | Rules                                    | Skills                                | Context file                      |
| -------------- | --------------------------- | --------------------------------------------- | ---------------------------------------- | ------------------------------------- | --------------------------------- |
| Claude Code    | `.claude/agents/`           | `.claude/commands/`                           | `aidd_docs/rules/`                        | `.claude/skills/`                     | `CLAUDE.md`                       |
| Cursor         | `.cursor/agents/`           | `.cursor/commands/`                           | `aidd_docs/rules/`                        | `.cursor/skills/`                     | `AGENTS.md`                       |
| OpenCode       | `.opencode/agents/`         | `.opencode/commands/`                         | `aidd_docs/rules/`                        | `.opencode/skills/`                   | `AGENTS.md`                       |
| GitHub Copilot | `.github/agents/*.agent.md` | `.github/prompts/*.prompt.md`                 | `aidd_docs/rules/`                        | `.github/skills/`                     | `.github/copilot-instructions.md` |
| Codex CLI      | `.codex/agents/{name}.toml` | **Not supported**                             | `aidd_docs/rules/`                        | `.agents/skills/aidd-{name}/SKILL.md` | `AGENTS.md`                       |

> **Rules are tool-agnostic**: scan the single canonical surface `aidd_docs/rules/**/*.md` for every tool (no per-tool rules directory). `list-rules.mjs` reads only this path.

## AI quick map - hooks, plugins

| AI             | Hooks                                                                                          | Plugin manifest              |
| -------------- | ---------------------------------------------------------------------------------------------- | ---------------------------- |
| Claude Code    | `.claude/settings.json` `hooks` key OR `<plugin>/hooks/hooks.json` OR inline in skill/agent header | `.claude-plugin/plugin.json` |
| Cursor         | `.cursor/hooks.json` (project), `~/.cursor/hooks.json` (user), `<plugin>/hooks/hooks.json` (plugin) | `.cursor-plugin/plugin.json` |
| OpenCode       | JS/TS module under `.opencode/plugins/` (parse as JS, not JSON)                                | Not supported                |
| GitHub Copilot | `.github/hooks/*.json` (workspace), `~/.copilot/hooks` (user), `<plugin>/hooks.json` or `<plugin>/hooks/hooks.json` (plugin) | `plugin.json` at plugin root |
| Codex CLI      | `.codex/hooks.json` (project / user) OR `[hooks]` table in `.codex/config.toml`               | `.codex-plugin/plugin.json`  |

## MCP config per tool

| Tool           | MCP config file                                  | Servers key   |
| -------------- | ------------------------------------------------ | ------------- |
| Claude Code    | `.mcp.json` (project root)                       | `mcpServers`  |
| Cursor         | `.cursor/mcp.json`                               | `mcpServers`  |
| OpenCode       | `opencode.json`                                  | `mcp`         |
| GitHub Copilot | `.vscode/mcp.json` (VS Code); `~/.copilot/mcp-config.json` (CLI) | `servers` (VS Code); `mcpServers` (CLI) |
| Codex CLI      | `.codex/config.toml`                             | `[mcp_servers.*]` |

## Path layout per tool

Rules are tool-agnostic: one canonical Subdir layout under `aidd_docs/rules/` for every tool. Commands follow a two-layout scheme: Subdir-tools organize commands under phase subdirectories; flat-tools (GitHub Copilot) write commands directly into the surface root with a phase index as a filename prefix.

| Layout          | Surface   | Tools                                    | Example                                                            |
| --------------- | --------- | ---------------------------------------- | ----------------------------------------------------------------- |
| Subdir          | Rules     | All tools (canonical)                    | `aidd_docs/rules/02-programming-languages/2-typescript-naming.md` |
| Subdir          | Commands  | Claude Code, Cursor, OpenCode            | `<commands root>/10_maintenance/fix-issue.md`                     |
| Flat            | Commands  | GitHub Copilot                           | `.github/prompts/04-implement.prompt.md`                          |

## Plugin install locations per tool

Where to scan when enumerating installed plugins (not the plugin manifest path inside the plugin tree).

| Tool | Install location(s) |
| ---- | ------------------- |
| Claude Code    | `~/.claude/plugins/cache/` (marketplace-installed); project-local `.claude-plugin/` for plugins committed to the repo |
| Cursor         | `~/.cursor/plugins/local/<plugin>` (local symlink); marketplace install path (managed by Cursor) |
| OpenCode       | `~/.config/opencode/plugins/` (global JS/TS modules); `~/.cache/opencode/node_modules/` (npm-installed); project `.opencode/plugins/` |
| GitHub Copilot | macOS: `~/Library/Application Support/Code/agentPlugins/` ; Linux: `~/.config/Code/agentPlugins/` ; Windows: `%APPDATA%\Code\agentPlugins\` ; CLI-installed: `~/.copilot/installed-plugins/` |
| Codex CLI      | `~/.codex/plugins/cache/$MARKETPLACE/$PLUGIN/$VERSION/` |
