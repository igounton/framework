# Plan — Unify `aidd-context:03-context-generate` on a tool-resolution model

Date: 2026-05-22
Source: validated brainstorm (`aidd-refine:01:brainstorm`), user-approved.
Execution vehicle: `aidd-context:03:context-generate` (refactor-skill mode).

## Premise correction

The brainstorm started from a wrong assumption ("the skill is Claude Code-centric").
Verified against the actual action files, the skill is **already ~70% multi-tool**:

- `references/ai-mapping.md` is a complete 5-tool matrix (paths, extensions,
  per-field frontmatter reconciliation, detailed per-tool sections). **Nothing to build.**
- Single template per artifact + the reconciliation table already render per-tool.
  **No template fan-out needed.**

The real problem is **three inconsistent multi-tool models** across sub-flows:

| Sub-flow              | Current model                                                  |
| --------------------- | -------------------------------------------------------------- |
| rules / agents / commands | fan-out to **every** installed tool, **skip** unsupported  |
| hooks                 | **single** tool, taken as an input the user picks              |
| skills                | **not tool-aware** — writes to `<skill>/...`, no tool root      |
| plugins / marketplaces| **Claude-hardcoded** — `.claude-plugin/`, `claude plugin validate` |

## Goal

Unify all 7 sub-flows on one model: **Model Y — detect-and-propose**.

## Locked decisions (from brainstorm, taken with the corrected premise)

- **Model Y.** Detect host tool(s), propose to the user, the user confirms the
  target set (1..N). Replaces both the silent fan-out-to-all and the single-input
  models. Chosen over Model X (fan-out-to-all, skip unsupported) by the user.
- **D1 — detect and propose.** Detection signals: `.claude/`, `.cursor/`,
  `.codex/`, `.opencode/`, `.github/copilot-instructions.md`, `CLAUDE.md`,
  `AGENTS.md`. The user confirms; multi-select allowed.
- **D2 — block on no equivalent.** When a confirmed tool has no equivalent for the
  requested artifact (per `ai-mapping.md`), block that tool and explain. Never
  skip silently. Multi-tool: block the unsupported tool, continue the supported ones.
- **D3 — always resolve the path per tool**, including AIDD-native artifacts
  (skills, plugins, marketplaces). `ai-mapping.md` already holds every path.
- **Generate-mode only.** The tool-resolution gate runs only when generating. In
  modify mode the tool is fixed by the existing artifact's on-disk location —
  skip detect/propose/D2. (Closes the modify-flow gap.)
- **Multi-tool contract.** One canonical artifact is built once, then rendered
  once per confirmed tool — N renders of one intent, not N separate runs.
- **O1 resolved — plugin × OpenCode is a D2 block.** OpenCode has no plugin
  manifest and no slot tree (a plugin is a single JS/TS module). This skill
  scaffolds declarative files, not code modules, so the cell is marked
  unsupported in `ai-mapping.md`. The block message points the user to placing
  skills/agents directly in `.opencode/` or publishing an npm package. (Hooks ×
  OpenCode stay supported — they already have a JS-module renderer.)

## Milestones

### M1 — Shared tool-resolution reference (`references/tool-resolution.md`, new)
The single procedure every entry action calls:
- Detect host tool(s) from the D1 signal set.
- Propose the detected set; the user confirms 1..N (multi-select).
- **No-signal fallback.** When no detection signal is present (fresh repo),
  fall back to proposing all 5 tools cold and let the user pick — never guess,
  never default to Claude Code.
- For each (artifact, confirmed tool): look up `ai-mapping.md`. If the cell is
  marked unsupported, block that tool with an explanation (D2); continue the rest.
- **Render is path + format, not path alone.** Where a tool's format diverges
  structurally (Codex agents = TOML: frontmatter → top-level keys, body →
  `developer_instructions`; OpenCode hooks = JS module), the conversion logic is
  named here and lives in the write action, driven by `ai-mapping.md`. The
  single-template + reconciliation-table mechanism covers only field-level
  divergence, not structural conversion.
- State the generate-only rule and the modify-mode exception.
- State the multi-tool rendering contract.
- Apply the O1 decision: mark plugin × OpenCode unsupported in `ai-mapping.md`.

### M2 — Convert rules / agents / commands to Y
- `actions/rules/01-generate-rules.md`, `actions/agents/01-generate-agent.md`,
  `actions/commands/01-generate-command.md`.
- Replace "write to every installed AI tool" with the M1 gate.
- Replace skip-unsupported with block-unsupported (D2).
- Fix the stale `command_path: .claude/commands/...` hardcode in the
  `01-generate-command` Outputs block (inconsistent with its own step 8).

### M3 — Convert hooks to Y
- `actions/hooks/01-generate-hook.md`.
- Replace the single `target_tool` input with the M1 gate (1..N).
- Keep the artifact-shape branch (JSON for Claude/Cursor/Codex, TOML table for
  Codex, JS module for OpenCode) — it now loops over the confirmed tool set.
- Fold the existing Copilot project/user-scope rejection into the D2 block.

### M4 — Make the skills sub-flow tool-aware
- `actions/skills/01-capture-intent.md` — add the M1 gate; remove Claude-centric
  phrasing ("CLAUDE.md / rule option") in favor of tool-neutral wording.
- `actions/skills/04-draft-skill.md` — write `SKILL.md` into each confirmed
  tool's skills root per `ai-mapping.md`, not a bare `<skill>/`.
- `actions/skills/05-write-actions.md` — write action files under each confirmed
  tool's skills root.
- `02-design-evals`, `03-decompose-actions`, `06-validate` stay tool-agnostic.

### M5 — Make plugins + marketplaces tool-aware
- `actions/plugins/01-capture-plugin-intent.md` — add the M1 gate; inventory
  plugins across all tools' manifest locations, not only `.claude-plugin/`.
- `actions/plugins/02-scaffold-tree.md` — resolve the manifest dir per tool from
  `ai-mapping.md` (`.claude-plugin/`, `.cursor-plugin/`, `.codex-plugin/`,
  `plugin.json` at root for Copilot). OpenCode: D2-blocks (no manifest — see
  Locked decisions). Manifest **schema** also
  diverges (Codex requires `name`+`version`+`description`; Claude only `name`;
  Copilot its own set) — confirm whether the reconciliation table extends to
  plugin manifests or a per-tool manifest template variant is needed.
- `actions/plugins/04-validate.md` — per-tool validation command, not a hardcoded
  `claude plugin validate`. Sub-task: look up the cursor/opencode/copilot/codex
  validation equivalents (not currently enumerated in `ai-mapping.md`); where a
  tool has no validator, fall back to a JSON/TOML parse + required-key check.
- `actions/marketplaces/01-init-marketplace.md` — add the M1 gate. `ai-mapping.md`
  already marks marketplace unsupported for OpenCode and Copilot → those D2-block
  naturally; Cursor and Codex resolve to their own paths.
- `actions/marketplaces/02-add-plugin-entry.md`, `03-validate.md` — per-tool path
  and validation.

### M6 — SKILL.md + docs + evals
- `SKILL.md` — add transversal rule R11 (tool resolution: detect → propose →
  confirm → D2 block; generate-only; modify-mode exception). Update the artifact
  descriptions and the `description` frontmatter to state the unified model.
  Note the gate exception in the "Modify flow" section. Check the ≤500-line budget (R4).
- `README.md` — update scope and the sub-flow descriptions.
- `evals/scenarios.json` — add scenarios for tool detection and the D2 block.
- `CATALOG.md` — regenerate the `03-context-generate` entry.

### M7 — Validate
- Order: after M6 (eval scenarios must be rewritten before they run).
- Run each action's `## Test`.
- Run the eval scenarios.
- `grep` the skill: no remaining "every installed tool" silent fan-out, no
  skip-unsupported wording, no stale `.claude/` hardcode in tool-agnostic actions.

## Open questions

None. O1 (plugin × OpenCode) resolved — D2 block, see Locked decisions.

## Risks / constraints

- **`ai-mapping.md` staleness** — tool docs change. It is the single source of
  truth; never hard-code paths in actions. Consider adding a source URL +
  verification date per tool section (optional, not blocking).
- **R4 budget** — `SKILL.md` ≤ 500 lines; R11 + unified-model wording may push it.
  Mitigation: the procedure lives in `references/tool-resolution.md`; `SKILL.md`
  stays a pure router (R1).
- **Disk duplication** — Model Y with N tools writes N copies of skills/plugins.
  Inherent and accepted; it is what multi-tool output means.
- **Overlap with `02-project-init`** — its `mapping-ai-context-file.md` covers the
  context file only; this skill's `ai-mapping.md` covers the 7 artifacts. Keep
  separate, do not merge.

## Files touched

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
