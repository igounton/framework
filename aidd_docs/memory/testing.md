# Testing Guidelines

## Tools and Frameworks

- **Playwright MCP**: browser automation available via `.playwright-mcp/` config — used for manual or AI-driven UI testing on downstream projects
- **Evals** (`evals/scenarios.json`): per-skill JSON scenarios that verify routing logic (which action a skill dispatches to for a given input)

## Testing Strategy

- No unit test runner configured at framework level
- Skills are tested via eval scenarios; router behavior must be covered by `evals/scenarios.json` for every auto-trigger skill
- Framework correctness validated by running actual skills against a real project (integration)

## Test Execution Process

- Evals: evaluated by the AI tool's eval runner or manually reviewed
- `scripts/build-dist-verification.md` documents how to verify the build output

## Mocking and Stubbing

Not applicable — the framework has no runtime; all logic is markdown interpreted by an LLM.
