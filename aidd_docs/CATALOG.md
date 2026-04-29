# AIDD Framework Catalog

Auto-generated framework content: agents, commands, rules, skills, and templates.

> This file is automatically updated by the `scripts/summarize-markdown.mjs` script.

## Table of Contents

- [`.claude`](#claude)
- [`.claude-plugin`](#claude-plugin)
- [`.specstory`](#specstory)
- [`agents`](#agents)
- [`aidd_docs`](#aidd_docs)
  - [`aidd_docs/memory`](#aidd_docsmemory)
  - [`aidd_docs/tasks`](#aidd_docstasks)
  - [`aidd_docs/templates`](#aidd_docstemplates)
- [`plugins`](#plugins)
  - [`plugins/aidd-context`](#pluginsaidd-context)
  - [`plugins/aidd-dev`](#pluginsaidd-dev)
  - [`plugins/aidd-pm`](#pluginsaidd-pm)
  - [`plugins/aidd-vcs`](#pluginsaidd-vcs)
- [`rules`](#rules)
  - [`rules/01-standards`](#rules01-standards)
  - [`rules/04-tooling`](#rules04-tooling)
- [`scripts`](#scripts)
  - [`scripts/schemas`](#scriptsschemas)
- [`skills`](#skills)

---

### `.claude`

No files found.
### `.claude-plugin`

| File |
|------|
| [marketplace.json](../.claude-plugin/marketplace.json) |

### `.specstory`

No files found.
### `agents`

| File | Description | Docs |
|------|---|---|
| [alexia.md](../agents/alexia.md) | `Act like the USER to autonomously end-to-end implementation without human intervention` | - |
| [claire.md](../agents/claire.md) | `Clarity challenger — challenges and questions until the request is ultra-clear` | - |
| [iris.md](../agents/iris.md) | `Frontend specialist with 3 modes - implement from Figma, verify UI conformity, validate user journeys.` | - |
| [kent.md](../agents/kent.md) | `Use this agent when explicitly asked to perform test-driven development.` | `https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes` |
| [martin.md](../agents/martin.md) | `Every time you need to run a command to ensure code is correct, still builds are that tests pass, you must call this agent.` | - |

### `aidd_docs`

| File |
|------|
| [CATALOG.md](CATALOG.md) |
| [CONTRIBUTING.md](CONTRIBUTING.md) |
| [README.md](README.md) |

#### `aidd_docs/memory`

| File |
|------|
| [build-sketch.md](memory/build-sketch.md) |
| [cli-coordination.md](memory/cli-coordination.md) |
| [command-inventory.md](memory/command-inventory.md) |
| [mcp-merge-behavior.md](memory/mcp-merge-behavior.md) |
| [phase0-confidence.md](memory/phase0-confidence.md) |
| [pilot-aidd-vcs.md](memory/pilot-aidd-vcs.md) |
| [pre-existing-hook-failures.md](memory/pre-existing-hook-failures.md) |
| [release-please-sketch.md](memory/release-please-sketch.md) |
| [sample-hooks.json](memory/sample-hooks.json) |
| [spike-bracket-paths.md](memory/spike-bracket-paths.md) |
| [template-audit.md](memory/template-audit.md) |

#### `aidd_docs/tasks`

| Group | File |
|-------|------|
| `2026_04` | [2026_04_29-#260-plugin-architecture-part-8.md](tasks/2026_04/2026_04_29-#260-plugin-architecture-part-8.md) |

#### `aidd_docs/templates`

| Group | File | Description | Argument Hint |
|-------|------|---|---|
| `-` | [AGENTS.md](templates/AGENTS.md) | `AI agent configuration and guidelines` | - |
| `aidd` | [agent.md](templates/aidd/agent.md) | `<when-this-agent-needs-to-be-called>` | - |
| `aidd` | [agents_coordination.md](templates/aidd/agents_coordination.md) | `Multi-agent coordination and workflows template` | - |
| `aidd` | [command.md](templates/aidd/command.md) | `<generated-action-oriented-description>` | `<generated-argument-hint-if-applicable>` |
| `aidd` | [master_plan.md](templates/aidd/master_plan.md) | `Parent plan template orchestrating multiple child plans with validation gates` | - |
| `aidd` | [plan.md](templates/aidd/plan.md) | `Feature implementation plan template` | - |
| `aidd` | [prompt.md](templates/aidd/prompt.md) | `Custom prompt template example` | - |
| `aidd` | [rule.md](templates/aidd/rule.md) | `< One line. Comprehensive description that provides full context and clearly indicates when this rule should be applied. Include key scenarios, impacted areas, and why following this rule is important. While being thorough, remain focused and relevant. The description should be detailed enough that the agent can confidently determine whether to apply the rule in any given situation.>` | - |
| `aidd` | [skill.md](templates/aidd/skill.md) | `<What it does - actions, capabilities>. Use when <trigger phrases, contexts, file types, user intents>.` | - |
| `aidd` | [task.md](templates/aidd/task.md) | `Task tracking system to ensure all tasks are categorized and addressed` | - |
| `dev` | [adr.md](templates/dev/adr.md) | `Architecture Decision Record template` | - |
| `dev` | [code_review.md](templates/dev/code_review.md) | `Code review checklist and scoring template` | - |
| `dev` | [decision.md](templates/dev/decision.md) | `Individual decision record template` | `<title>` |
| `dev` | [review_code.md](templates/dev/review_code.md) | `Code review checklist and scoring template` | - |
| `dev` | [review_functional.md](templates/dev/review_functional.md) | `Functional review report template` | - |
| `dev` | [tech_choice.md](templates/dev/tech_choice.md) | `Technology selection and comparison template` | - |
| `pm` | [prd.md](templates/pm/prd.md) | `Product Requirements Document template (15 sections)` | - |
| `pm` | [user_story.md](templates/pm/user_story.md) | `Template for defining user stories with estimation and acceptance criteria` | - |
| `vcs` | [branch.md](templates/vcs/branch.md) | `VCS branch naming convention template` | - |
| `vcs` | [commit.md](templates/vcs/commit.md) | `VCS commit message template` | - |
| `vcs` | [CONTRIBUTING.md](templates/vcs/CONTRIBUTING.md) | `Project contribution guidelines template` | - |
| `vcs` | [issue.md](templates/vcs/issue.md) | `VCS issue/ticket template` | - |
| `vcs` | [pull_request.md](templates/vcs/pull_request.md) | `VCS pull/merge request template` | - |
| `vcs` | [README.md](templates/vcs/README.md) | `Project README template` | - |
| `vcs` | [release.md](templates/vcs/release.md) | `VCS release notes template` | - |

### `plugins`

#### `plugins/aidd-context`

| Group | File |
|-------|------|
| `.claude-plugin` | [plugin.json](../plugins/aidd-context/.claude-plugin/plugin.json) |
| `-` | [CATALOG.md](../plugins/aidd-context/CATALOG.md) |
| `-` | [README.md](../plugins/aidd-context/README.md) |

#### `plugins/aidd-dev`

| Group | File |
|-------|------|
| `.claude-plugin` | [plugin.json](../plugins/aidd-dev/.claude-plugin/plugin.json) |
| `-` | [CATALOG.md](../plugins/aidd-dev/CATALOG.md) |
| `-` | [README.md](../plugins/aidd-dev/README.md) |

#### `plugins/aidd-pm`

| Group | File |
|-------|------|
| `.claude-plugin` | [plugin.json](../plugins/aidd-pm/.claude-plugin/plugin.json) |
| `-` | [CATALOG.md](../plugins/aidd-pm/CATALOG.md) |
| `-` | [README.md](../plugins/aidd-pm/README.md) |

#### `plugins/aidd-vcs`

| Group | File |
|-------|------|
| `.claude-plugin` | [plugin.json](../plugins/aidd-vcs/.claude-plugin/plugin.json) |
| `-` | [CATALOG.md](../plugins/aidd-vcs/CATALOG.md) |
| `-` | [README.md](../plugins/aidd-vcs/README.md) |

### `rules`

#### `rules/01-standards`

| File | Description |
|------|---|
| [1-command-structure.md](../rules/01-standards/1-command-structure.md) | `Standards for naming, organizing, and writing command files. Apply when creating or editing any command file.` |
| [1-mermaid.md](../rules/01-standards/1-mermaid.md) | `Rules for generating valid, high-quality Mermaid diagrams. Apply when creating or reviewing any Mermaid diagram (flowchart, state, ER, sequence, gantt).` |
| [1-rule-structure.md](../rules/01-standards/1-rule-structure.md) | `Standards for naming and organizing .md rule files. Apply when creating new rule files or deciding on file placement.` |
| [1-rule-writing.md](../rules/01-standards/1-rule-writing.md) | `Standards for writing .md coding rule content. Apply when creating, editing, or reviewing any rule file.` |

#### `rules/04-tooling`

| File | Description |
|------|---|
| [ide-mapping.claude.md](../rules/04-tooling/ide-mapping.claude.md) | `Claude Code file locations, syntax, frontmatter, and include patterns reference. Apply when creating or configuring Claude-specific files.` |
| [ide-mapping.codex.md](../rules/04-tooling/ide-mapping.codex.md) | `Codex CLI file locations, path mapping, and AIDD install-time @path expansion. Apply when creating or configuring Codex-specific files.` |
| [ide-mapping.copilot.md](../rules/04-tooling/ide-mapping.copilot.md) | `GitHub Copilot file locations, syntax, frontmatter, and instruction patterns reference. Apply when creating or configuring Copilot-specific files.` |
| [ide-mapping.cursor.md](../rules/04-tooling/ide-mapping.cursor.md) | `Cursor file locations, syntax, frontmatter, and rule patterns reference. Apply when creating or configuring Cursor-specific files.` |
| [ide-mapping.opencode.md](../rules/04-tooling/ide-mapping.opencode.md) | `OpenCode file locations, syntax, frontmatter, and configuration reference. Apply when creating or configuring OpenCode-specific files.` |

### `scripts`

| File |
|------|
| [aidd.sh](../scripts/aidd.sh) |
| [build-dist.sh](../scripts/build-dist.sh) |

#### `scripts/schemas`

| File |
|------|
| [hooks.schema.json](../scripts/schemas/hooks.schema.json) |
| [marketplace.schema.json](../scripts/schemas/marketplace.schema.json) |
| [plugin.schema.json](../scripts/schemas/plugin.schema.json) |

### `skills`

No files found.
