# aidd

> AI-Driven Development framework for {{TOOL_NAME}} (v{{VERSION}}). Structured agents, commands, rules, and skills for your AI coding assistant.

I want you to install the AIDD framework for {{TOOL_NAME}} in this project. Execute all the steps below autonomously.

## OBJECTIVE

Install the AIDD framework files for {{TOOL_NAME}} and initialize the project context.

## DONE WHEN

- Framework files are in place at the project root
- `/init` command has been run to populate `aidd_docs/memory/`
- Rules in `{{RULES_DIR}}` have been reviewed

## TODO

- [ ] Copy framework files to project root
- [ ] Run `/init` to generate project context
- [ ] Review and customize rules in `{{RULES_DIR}}`
- [ ] Configure MCP servers

## What's Included

```text
{{FILE_TREE}}
```

## Step 1: Copy framework files

Copy the contents of this directory into your project root:

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

## Step 2: Initialize project context

Run `/init` in your AI assistant to generate your project context in `aidd_docs/memory/`.

## Step 3: Customize rules

Review and customize rules in `{{RULES_DIR}}` to match your coding standards.

## Step 4: Configure MCP servers

{{#IF_CLAUDE}}
Edit `.mcp.json` at the project root to configure MCP servers.
{{/IF_CLAUDE}}
{{#IF_CURSOR}}
Edit `.cursor/mcp.json` to configure MCP servers.
{{/IF_CURSOR}}
{{#IF_COPILOT}}
Edit `.vscode/mcp.json` to configure MCP servers.
{{/IF_COPILOT}}

See [`README.md`](README.md) for the full reference (commands, agents, development flows, templates).

EXECUTE NOW: Complete the above TODO list to achieve: AIDD framework installed and initialized for {{TOOL_NAME}}.
