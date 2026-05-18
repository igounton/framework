# Skill anatomy

What lives inside a Claude Code skill folder, and what each piece is for.

## Folder layout

```
<skill-name>/
  SKILL.md            (required) - router file; frontmatter + body
  actions/            (optional) - one .md per action: ## Inputs, ## Outputs, ## Process, ## Test
  assets/             (optional) - templates and other files actions COPY / INJECT via @<path>
  references/         (optional) - documents actions READ when they need the knowledge
  scripts/            (optional) - skill-local executables called from actions
  evals/              (optional) - auto-trigger probes; required when auto-invocation is on
  README.md           (optional) - human-facing summary; never loaded into the model context
```

A skill is identified by its directory name. The minimum is one `SKILL.md`.

## `SKILL.md`

The router. Contains a YAML frontmatter block and a markdown body.

Frontmatter fields - see `references/slash-command.md` for the full table (skills and commands share the same frontmatter schema). The most relevant for skills:

- `name` (string, kebab-case, <=64 chars) - falls back to the folder name.
- `description` (recommended) - drives auto-invocation. Must include explicit triggers AND a "Do NOT use" clause.
- `disable-model-invocation` (boolean) - `true` makes the skill user-only.
- `allowed-tools` - pre-approved tools while the skill runs.
- `context: fork` + `agent` - run in an isolated subagent context.

Body conventions in this framework:

- Pure router. No business logic. Describe the action table, the default flow, transversal rules, references, and assets.
- Hard cap: 500 lines. Split into references when exceeded.
- Action table maps `#` + slug to role + input.
- `Default flow` line states the canonical order (e.g. `01 -> 02 -> 03`).
- Self-skips and side-flows are stated explicitly.

## `actions/`

One file per action, numbered when sequence matters: `01-<slug>.md`, `02-<slug>.md`, ...

Each action file has exactly these four sections:

- `## Inputs` - bullet list of named fields with type + one-line description. Mark `(required)` / `(optional)`.
- `## Outputs` - concrete artifact example (code block, table, or YAML shape).
- `## Process` - numbered imperative steps. Reference templates via `@<path>`. Steps that consult a reference cite it via `@<path>` only on the step that needs it.
- `## Test` - one sentence describing how to verify the action's intent: a command to run, a check on the produced artifact, or an observable side-effect.

Optional `## Depends on` section between Outputs and Process when the action requires upstream slugs.

Tests must be real-execution: status 200, artifact written, MCP responding, file on disk. Never a mocked `*.test.js`.

## `assets/`

Files actions COPY or INJECT. Templates, fixed JSON snippets, ID tables. Referenced from actions via `@<path>` so the resolver inlines them at runtime.

Asset paths are stable; never inline asset content inside an action.

## `references/`

Documents actions READ when they need the knowledge. Schemas, cheatsheets, naming conventions, glossary entries. One-level deep: a reference must not chain to another reference.

Cited from action `## Process` steps via `@<path>` only when that step needs the knowledge. Plain mentions belong in SKILL.md's `## References` catalog.

## `scripts/`

Skill-local executables invoked from action `## Process` steps. Never inline `curl`/`fetch` calls in an action body - put them in a script and call it via `node scripts/<slug>.js`, `bash scripts/<slug>.sh`, etc.

Skill secrets (`.env`, `.env.local`) live inside the skill folder, never at repo root, always gitignored.

## `evals/scenarios.json`

Required for auto-trigger skills (`disable-model-invocation: false`, the default). Minimum 3 entries:

```json
[
  { "prompt": "<realistic user message>", "expect_action": "<slug or null>" }
]
```

`expect_action: null` means the skill must NOT trigger for that prompt. Use both positive and negative cases.

Manual-only skills (`disable-model-invocation: true`) skip evals.

## Naming

Tool skills - singular noun matching the tool (`slack`, `notion`).
Activity skills - action verb (`review`, `audit`, `commit`).
Slugs are kebab-case throughout. Action filenames are `<NN>-<slug>.md`; the slug used elsewhere strips the `<NN>-` prefix.

See `references/naming-conventions.md` for the hard constraints.
