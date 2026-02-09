# {{TOOL_NAME}} — AIDD Framework v{{VERSION}}

AI-Driven Development (AIDD) is a methodology and framework that gives your AI coding assistant structured agents, commands, rules, and skills to build high-quality software faster.

## What's Included

```text
{{FILE_TREE}}
```

## Installation

1. Copy the contents of this directory into your project root:

{{#IF_CLAUDE}}
   ```bash
   cp -r .claude/ CLAUDE.md .mcp.json aidd_docs/ .aidd/ /path/to/your/project/
   ```
{{/IF_CLAUDE}}
{{#IF_CURSOR}}
   ```bash
   cp -r .cursor/ AGENTS.md aidd_docs/ .aidd/ /path/to/your/project/
   ```
{{/IF_CURSOR}}
{{#IF_COPILOT}}
   ```bash
   cp -r .github/ .vscode/ aidd_docs/ .aidd/ /path/to/your/project/
   ```
{{/IF_COPILOT}}

2. Run `/init` in your AI assistant to generate your project context in `aidd_docs/memory/`.

3. Customize rules in `{{RULES_DIR}}` to match your coding standards.

{{#IF_CLAUDE}}
4. Edit `.mcp.json` at the project root to configure MCP servers.
{{/IF_CLAUDE}}
{{#IF_CURSOR}}
4. Edit `.cursor/mcp.json` to configure MCP servers.
{{/IF_CURSOR}}
{{#IF_COPILOT}}
4. Edit `.vscode/mcp.json` to configure MCP servers.
{{/IF_COPILOT}}

See [`aidd_docs/README.md`](aidd_docs/README.md) for the full reference (commands, agents, development flows, templates).
