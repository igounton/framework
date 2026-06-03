---
objective: "Unify aidd-context:03-context-generate on the Model Y tool-resolution model across all 7 sub-flows."
success_condition: "Every action `## Test` in plugins/aidd-context/skills/03-context-generate/ passes, the skill's evals/scenarios.json scenarios pass, and a grep of the skill finds no silent fan-out-to-all, no skip-unsupported wording, and no stale `.claude/` hardcode in tool-agnostic actions."
iteration: 0
created_at: 2026-05-22
source_plan: aidd_docs/tasks/2026_05/2026_05_22-context-generate-multitool-plan.md
execution_vehicle: "aidd-context:03:context-generate (refactor-skill mode)"
---

# SDLC Plan — Unify `aidd-context:03-context-generate` on a tool-resolution model

This plan normalizes an already-validated, user-approved milestone plan into the SDLC
schema. It introduces no new decisions and no new scope. The source plan
(`aidd_docs/tasks/2026_05/2026_05_22-context-generate-multitool-plan.md`) remains the
authoritative record of intent; this file restructures it for execution.

## Premise

A brainstorm started from a wrong assumption ("the skill is Claude Code-centric").
Verified against the actual action files, the skill is already ~70% multi-tool:

- `references/ai-mapping.md` is a complete 5-tool matrix (paths, extensions, per-field
  frontmatter reconciliation, detailed per-tool sections). Nothing to build there.
- A single template per artifact plus the reconciliation table already render per-tool.
  No template fan-out is needed.

The real problem is three inconsistent multi-tool models across sub-flows:

| Sub-flow                  | Current model                                                  |
| ------------------------- | -------------------------------------------------------------- |
| rules / agents / commands | fan-out to every installed tool, skip unsupported              |
| hooks                     | single tool, taken as an input the user picks                  |
| skills                    | not tool-aware — writes to `<skill>/...`, no tool root         |
| plugins / marketplaces    | Claude-hardcoded — `.claude-plugin/`, `claude plugin validate` |

The objective unifies all 7 sub-flows on one model: Model Y — detect-and-propose.

## Locked decisions

These are transcribed verbatim in intent from the validated source plan. They are
immutable for this run; the implementer must not re-litigate them.

| ID                  | Decision                                                                                                                                                                                                                                                                                                                                       |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Model Y             | Detect host tool(s), propose to the user, the user confirms the target set (1..N). Replaces both the silent fan-out-to-all and the single-input models. Chosen over Model X (fan-out-to-all, skip unsupported) by the user.                                                                                                                      |
| D1 — detect/propose | Detection signals: `.claude/`, `.cursor/`, `.codex/`, `.opencode/`, `.github/copilot-instructions.md`, `CLAUDE.md`, `AGENTS.md`. The user confirms; multi-select allowed.                                                                                                                                                                        |
| D2 — block on no equivalent | When a confirmed tool has no equivalent for the requested artifact (per `ai-mapping.md`), block that tool and explain. Never skip silently. Multi-tool: block the unsupported tool, continue the supported ones.                                                                                                                          |
| D3 — always resolve path | Always resolve the path per tool, including AIDD-native artifacts (skills, plugins, marketplaces). `ai-mapping.md` already holds every path.                                                                                                                                                                                                |
| Generate-only gate  | The tool-resolution gate runs only when generating. In modify mode the tool is fixed by the existing artifact's on-disk location — skip detect/propose/D2. This closes the modify-flow gap.                                                                                                                                                      |
| Multi-tool contract | One canonical artifact is built once, then rendered once per confirmed tool — N renders of one intent, not N separate runs.                                                                                                                                                                                                                     |
| O1 — plugin × OpenCode = D2 block | OpenCode has no plugin manifest and no slot tree (a plugin is a single JS/TS module). This skill scaffolds declarative files, not code modules, so the cell is marked unsupported in `ai-mapping.md`. The block message points the user to placing skills/agents directly in `.opencode/` or publishing an npm package. Hooks × OpenCode stay supported — they already have a JS-module renderer. |

## Milestones

Seven milestones, strictly sequential: M1 → M2 → M3 → M4 → M5 → M6 → M7. Each is
sized for one implementer pass. M7 must run last because the eval scenarios it runs
are rewritten in M6.

### M1 — Shared tool-resolution reference

Dependency: none (entry milestone).

Deliverables:
- New file `references/tool-resolution.md` — the single procedure every entry action calls.
- The procedure detects host tool(s) from the D1 signal set.
- The procedure proposes the detected set; the user confirms 1..N (multi-select).
- No-signal fallback: when no detection signal is present (fresh repo), fall back to
  proposing all 5 tools cold and let the user pick — never guess, never default to Claude Code.
- For each (artifact, confirmed tool): look up `ai-mapping.md`; if the cell is marked
  unsupported, block that tool with an explanation (D2) and continue the rest.
- Render is path + format, not path alone: where a tool's format diverges structurally
  (Codex agents = TOML: frontmatter → top-level keys, body → `developer_instructions`;
  OpenCode hooks = JS module), the conversion logic is named here and lives in the write
  action, driven by `ai-mapping.md`. The single-template + reconciliation-table mechanism
  covers only field-level divergence, not structural conversion.
- The reference states the generate-only rule and the modify-mode exception.
- The reference states the multi-tool rendering contract.
- Apply the O1 decision: mark plugin × OpenCode unsupported in `ai-mapping.md`.

Files touched: `references/tool-resolution.md` (new), `references/ai-mapping.md` (O1 edit only).

Acceptance criteria:
- `references/tool-resolution.md` exists and documents, in order: detect (D1 signal set),
  propose, confirm 1..N, the no-signal cold fallback to all 5 tools, the per-(artifact,tool)
  `ai-mapping.md` lookup, and the D2 block-and-continue behavior.
- The reference names the structural-conversion cases (Codex agents → TOML, OpenCode hooks
  → JS module) and states that conversion logic lives in the write action driven by `ai-mapping.md`.
- The reference states the generate-only rule, the modify-mode exception, and the
  multi-tool rendering contract (build once, render once per confirmed tool).
- `references/ai-mapping.md` marks the plugin × OpenCode cell unsupported with the O1
  rationale and a block message pointing to `.opencode/` placement or an npm package.

### M2 — Convert rules / agents / commands to Model Y

Dependency: M1.

Deliverables:
- Update `actions/rules/01-generate-rules.md`, `actions/agents/01-generate-agent.md`,
  `actions/commands/01-generate-command.md`.
- Replace "write to every installed AI tool" with the M1 gate.
- Replace skip-unsupported with block-unsupported (D2).
- Fix the stale `command_path: .claude/commands/...` hardcode in the
  `01-generate-command` Outputs block (inconsistent with its own step 8).

Files touched: `actions/rules/01-generate-rules.md`, `actions/agents/01-generate-agent.md`,
`actions/commands/01-generate-command.md`.

Acceptance criteria:
- All three actions invoke the M1 `references/tool-resolution.md` gate instead of
  fanning out to every installed tool.
- All three actions block unsupported tools (D2) rather than skipping them silently;
  no skip-unsupported wording remains in these files.
- The `01-generate-command` Outputs block no longer hardcodes `.claude/commands/...`;
  its `command_path` is resolved per tool, consistent with its own step 8.
- `## Test` in each of the three action files passes.

### M3 — Convert hooks to Model Y

Dependency: M2.

Deliverables:
- Update `actions/hooks/01-generate-hook.md`.
- Replace the single `target_tool` input with the M1 gate (1..N).
- Keep the artifact-shape branch (JSON for Claude/Cursor/Codex, TOML table for Codex,
  JS module for OpenCode) — it now loops over the confirmed tool set.
- Fold the existing Copilot project/user-scope rejection into the D2 block.

Files touched: `actions/hooks/01-generate-hook.md`.

Acceptance criteria:
- `01-generate-hook.md` no longer takes a single `target_tool` input; it calls the M1
  gate and supports 1..N confirmed tools.
- The artifact-shape branch is preserved and iterates over the confirmed tool set.
- The Copilot project/user-scope rejection is expressed as a D2 block, not a separate
  ad-hoc rejection path.
- `## Test` in `01-generate-hook.md` passes.

### M4 — Make the skills sub-flow tool-aware

Dependency: M3.

Deliverables:
- `actions/skills/01-capture-intent.md` — add the M1 gate; remove Claude-centric phrasing
  ("CLAUDE.md / rule option") in favor of tool-neutral wording.
- `actions/skills/04-draft-skill.md` — write `SKILL.md` into each confirmed tool's skills
  root per `ai-mapping.md`, not a bare `<skill>/`.
- `actions/skills/05-write-actions.md` — write action files under each confirmed tool's
  skills root.
- `02-design-evals`, `03-decompose-actions`, `06-validate` stay tool-agnostic (no change).

Files touched: `actions/skills/01-capture-intent.md`, `actions/skills/04-draft-skill.md`,
`actions/skills/05-write-actions.md`.

Acceptance criteria:
- `01-capture-intent.md` invokes the M1 gate and contains no Claude-centric phrasing
  (no "CLAUDE.md / rule option" wording); intent capture is tool-neutral.
- `04-draft-skill.md` writes `SKILL.md` into each confirmed tool's skills root resolved
  from `ai-mapping.md`, not a bare `<skill>/` path.
- `05-write-actions.md` writes action files under each confirmed tool's skills root.
- `02-design-evals`, `03-decompose-actions`, `06-validate` remain unchanged and tool-agnostic.
- `## Test` in `01-capture-intent.md`, `04-draft-skill.md`, and `05-write-actions.md` passes.

### M5 — Make plugins + marketplaces tool-aware

Dependency: M4.

Deliverables:
- `actions/plugins/01-capture-plugin-intent.md` — add the M1 gate; inventory plugins
  across all tools' manifest locations, not only `.claude-plugin/`.
- `actions/plugins/02-scaffold-tree.md` — resolve the manifest dir per tool from
  `ai-mapping.md` (`.claude-plugin/`, `.cursor-plugin/`, `.codex-plugin/`, `plugin.json`
  at root for Copilot). OpenCode D2-blocks (no manifest — see O1). The manifest schema
  also diverges (Codex requires `name`+`version`+`description`; Claude only `name`;
  Copilot its own set) — confirm whether the reconciliation table extends to plugin
  manifests or a per-tool manifest template variant is needed.
- `actions/plugins/04-validate.md` — per-tool validation command, not a hardcoded
  `claude plugin validate`. Sub-task: look up the cursor/opencode/copilot/codex validation
  equivalents (not currently enumerated in `ai-mapping.md`); where a tool has no validator,
  fall back to a JSON/TOML parse + required-key check.
- `actions/marketplaces/01-init-marketplace.md` — add the M1 gate. `ai-mapping.md` already
  marks marketplace unsupported for OpenCode and Copilot, so those D2-block naturally;
  Cursor and Codex resolve to their own paths.
- `actions/marketplaces/02-add-plugin-entry.md`, `actions/marketplaces/03-validate.md` —
  per-tool path and validation.

Files touched: `actions/plugins/01-capture-plugin-intent.md`,
`actions/plugins/02-scaffold-tree.md`, `actions/plugins/04-validate.md`,
`actions/marketplaces/01-init-marketplace.md`, `actions/marketplaces/02-add-plugin-entry.md`,
`actions/marketplaces/03-validate.md`.

Acceptance criteria:
- `01-capture-plugin-intent.md` invokes the M1 gate and inventories plugins across every
  tool's manifest location, not only `.claude-plugin/`.
- `02-scaffold-tree.md` resolves the manifest dir per tool from `ai-mapping.md`, D2-blocks
  OpenCode for plugins, and resolves the manifest-schema divergence (either the
  reconciliation table is extended to plugin manifests or a per-tool manifest template
  variant is used — the chosen approach is documented in the action).
- `04-validate.md` runs a per-tool validation command (no hardcoded `claude plugin
  validate`); for any tool without a validator it falls back to a JSON/TOML parse plus
  required-key check.
- `01-init-marketplace.md` invokes the M1 gate; OpenCode and Copilot D2-block for
  marketplaces; Cursor and Codex resolve to their own paths.
- `02-add-plugin-entry.md` and `03-validate.md` use per-tool paths and per-tool validation.
- `## Test` in all six action files passes.

### M6 — SKILL.md + docs + evals

Dependency: M5.

Deliverables:
- `SKILL.md` — add transversal rule R11 (tool resolution: detect → propose → confirm →
  D2 block; generate-only; modify-mode exception). Update the artifact descriptions and
  the `description` frontmatter to state the unified model. Note the gate exception in
  the "Modify flow" section. Check the ≤500-line budget (R4).
- `README.md` — update scope and the sub-flow descriptions.
- `evals/scenarios.json` — add scenarios for tool detection and the D2 block.
- `CATALOG.md` — regenerate the `03-context-generate` entry.

Files touched: `SKILL.md`, `README.md`, `evals/scenarios.json`,
`plugins/aidd-context/CATALOG.md`.

Acceptance criteria:
- `SKILL.md` contains transversal rule R11 covering the detect → propose → confirm → D2
  block sequence, the generate-only scope, and the modify-mode exception.
- `SKILL.md` artifact descriptions and the `description` frontmatter state the unified
  Model Y; the "Modify flow" section notes the gate exception.
- `SKILL.md` stays within the ≤500-line budget (R4) and remains a pure router (R1);
  the procedure itself lives in `references/tool-resolution.md`.
- `README.md` scope and sub-flow descriptions reflect the unified model.
- `evals/scenarios.json` includes scenarios for tool detection and for the D2 block.
- The `03-context-generate` entry in `plugins/aidd-context/CATALOG.md` is regenerated.

### M7 — Validate

Dependency: M6 (eval scenarios must be rewritten before they run).

Deliverables:
- Run each action's `## Test`.
- Run the eval scenarios.
- `grep` the skill: no remaining "every installed tool" silent fan-out, no
  skip-unsupported wording, no stale `.claude/` hardcode in tool-agnostic actions.

Files touched: none (validation only; may surface fixes routed back to earlier milestones).

Acceptance criteria:
- Every `## Test` across `plugins/aidd-context/skills/03-context-generate/actions/` passes.
- All `evals/scenarios.json` scenarios pass.
- A grep of the skill finds no silent fan-out-to-all wording, no skip-unsupported wording,
  and no stale `.claude/` hardcode in tool-agnostic actions.
- This milestone's outcome equals the plan-level `success_condition`.

## Rules / constraints

| Constraint                          | Detail / mitigation                                                                                                                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ai-mapping.md` staleness           | Tool docs change. `ai-mapping.md` is the single source of truth; never hard-code paths in actions. Optionally add a source URL + verification date per tool section (optional, not blocking).                        |
| R4 budget                           | `SKILL.md` ≤ 500 lines; R11 + unified-model wording may push it. Mitigation: the procedure lives in `references/tool-resolution.md`; `SKILL.md` stays a pure router (R1).                                            |
| Disk duplication                    | Model Y with N tools writes N copies of skills/plugins. Inherent and accepted; it is what multi-tool output means.                                                                                                  |
| Overlap with `02-project-init`      | `02-project-init`'s `mapping-ai-context-file.md` covers the context file only; this skill's `ai-mapping.md` covers the 7 artifacts. Keep separate, do not merge.                                                     |

## Files touched (whole plan)

- `plugins/aidd-context/skills/03-context-generate/SKILL.md`
- `plugins/aidd-context/skills/03-context-generate/README.md`
- `plugins/aidd-context/skills/03-context-generate/references/tool-resolution.md` (new)
- `plugins/aidd-context/skills/03-context-generate/references/ai-mapping.md` (O1 edit only)
- `plugins/aidd-context/skills/03-context-generate/actions/skills/01-capture-intent.md`
- `plugins/aidd-context/skills/03-context-generate/actions/skills/04-draft-skill.md`
- `plugins/aidd-context/skills/03-context-generate/actions/skills/05-write-actions.md`
- `plugins/aidd-context/skills/03-context-generate/actions/agents/01-generate-agent.md`
- `plugins/aidd-context/skills/03-context-generate/actions/rules/01-generate-rules.md`
- `plugins/aidd-context/skills/03-context-generate/actions/commands/01-generate-command.md`
- `plugins/aidd-context/skills/03-context-generate/actions/hooks/01-generate-hook.md`
- `plugins/aidd-context/skills/03-context-generate/actions/plugins/01-capture-plugin-intent.md`
- `plugins/aidd-context/skills/03-context-generate/actions/plugins/02-scaffold-tree.md`
- `plugins/aidd-context/skills/03-context-generate/actions/plugins/04-validate.md`
- `plugins/aidd-context/skills/03-context-generate/actions/marketplaces/01-init-marketplace.md`
- `plugins/aidd-context/skills/03-context-generate/actions/marketplaces/02-add-plugin-entry.md`
- `plugins/aidd-context/skills/03-context-generate/actions/marketplaces/03-validate.md`
- `plugins/aidd-context/skills/03-context-generate/evals/scenarios.json`
- `plugins/aidd-context/CATALOG.md`

## Open questions

None. O1 (plugin × OpenCode) is resolved as a D2 block — see Locked decisions.
