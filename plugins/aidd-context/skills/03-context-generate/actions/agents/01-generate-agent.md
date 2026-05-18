# 01 - Generate agent

Generate a specialized agent file tailored to user requirements, validated with the user before write, and saved to every installed AI tool's native agents location.

## Inputs

```yaml
agent_request: <free-form description of the agent's purpose, tools, and instructions>
mode: interactive | auto   # optional, default interactive
```

## Outputs

```yaml
agent_path: <tool-specific agents location>/<generated-agent-name>.<ext>
name_proposals:
  - <short catchy name 1>
  - <short catchy name 2>
  - <short catchy name 3>
quality_score: 1-10
```

## Process

1. **Gather requirements.** Ask the user clarifying questions until the agent template is fillable. Iterate until the agent's purpose, tools, inputs, and instructions are unambiguous.
2. **Fill the template** at `@../../assets/agents/agent-template.md`. Apply the coordination conventions in `@../../references/agents-coordination.md`.
3. **Review.** Score the generated agent 1-10 on clarity and completeness. Inputs and outputs MUST be ultra concise and precise.
4. **Wait for user confirmation** before finalizing. In `mode = auto` (called from an upstream skill that has already validated inputs), skip the gate and continue.
5. **Propose 3 first names** for the agent. Each name must be short and catchy, making sense with the agent's purpose (word game, acronym, etc.).
6. **Save.** Write the completed agent file to every installed AI tool's native agents location using its path, naming, and extension conventions from `@../../references/ai-mapping.md`. Skip tools whose agents surface is marked "not supported". Indexing the new file (catalog, docs page, README section, etc.) is the host's responsibility, not this action's.

## Test

The agent file exists at `agent_path` in every installed tool's agents location (skipping unsupported surfaces); the file matches the structure of `@../../assets/agents/agent-template.md`; `quality_score >= 8`.
