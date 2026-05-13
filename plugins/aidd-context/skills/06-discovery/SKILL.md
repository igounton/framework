---
name: aidd-context:06:discovery
description: Enumerate installed surfaces of the AI tool (skills, agents, commands, plugins, MCP servers) and recommend the best match for the user's stated intent. Use when the user asks "what's available?", "which skill/agent/command/plugin handles X?", "what MCPs are connected?", or wants a cross-plugin overview before picking a flow. Do NOT use for picking a specific item inside one plugin (the plugin's own onboard handles that), creating a new surface, or executing a recommended item (this skill only points; the user invokes).
---

# Skill: discovery

Scans installed surfaces of the AI tool and guides the user to the most relevant item for their current intent.

## Rules

- List only what is actually installed; never invent.
- Describe each item's purpose in one line.
- Recommend a single best match; mention alternatives only if very close.
- Do not invoke the recommended item; return its invocation path and stop.

## Available actions

| #   | Action          | Role                                              | Input              |
| --- | --------------- | ------------------------------------------------- | ------------------ |
| 01  | `find-skill`    | List skills, recommend the best match             | user intent        |
| 02  | `find-agent`    | List agents, recommend the best match             | user intent        |
| 03  | `find-command`  | List slash commands, recommend the best match     | user intent        |
| 04  | `find-plugin`   | List enabled plugins, recommend the best match    | user intent        |
| 05  | `find-mcp`      | List connected MCP servers, recommend the best one| user intent        |

## Default flow

Pick the action that matches the user's question:

- "what skills..." → `01-find-skill`
- "what agents..." → `02-find-agent`
- "what commands..." → `03-find-command`
- "what plugins..." / "what's installed at a high level" → `04-find-plugin`
- "what MCPs..." / "what external systems..." → `05-find-mcp`

If the user's question is ambiguous, ask one clarifying question before picking the action.
