# Plan — Re-scope `aidd-context:00-onboard`

Date: 2026-05-22
Source: validated brainstorm (`aidd-refine:01:brainstorm`), user-approved.
Execution vehicle: `aidd-context:03:context-generate` (refactor-skill mode).

## Goal

Turn `aidd-context:00-onboard` from a tour scoped strictly to the 6 aidd-context
skills into AIDD-wide project onboarding: it inspects the current project, detects
which AIDD plugins are installed, and proposes an interactive guided journey
adapted to that context.

## Locked decisions (from brainstorm)

- Lives in the `aidd-context` plugin. Single onboard. Today's narrow behavior is replaced.
- Recommends across all installed AIDD plugins; never an uninstalled one.
- Output: interactive, high-level guided journey with options.
- Serves: "next step", "current project state", "global AIDD context".
- Audience: human dev, AI agent, user picking a skill.

## Design decision (new, not a brainstorm question)

- **Journey vs one-step.** `02-recommend-next` renders the full ordered journey
  read-only (for context), but execution still walks ONE step at a time
  interactively. Keeps today's anti-overwhelm discipline; adds the path view.
- **Cross-plugin rule reconciliation.** Project rule forbids hard-naming foreign
  plugin artifacts in plugin files. So the state-matrix maps project state to a
  skill *category* (e.g. "spec skill", "commit skill"), resolved at runtime
  against actually-installed skills. No foreign skill id is ever hard-coded.
- **Detection method.** Reuse the native plugin/skill discovery pattern already
  used by `06-discovery/04-find-plugin.md` step 1. Do not invent a new probe.

## Milestones

### M1 — Detection rewrite (`actions/01-detect-state.md`)
- Keep filesystem probes (aidd_docs, memory bank, context block, install.md, empty-repo).
- Add project-context probes: has source code, detected stack, SDLC-phase signals
  (see Open question O1 — the core engine, must be resolved here).
- Add installed-AIDD-plugin + skill enumeration via native discovery.
- New snapshot block covering all three signal groups.

### M2 — State-matrix rewrite (`assets/state-matrix.md`)
- Full rewrite. Define the AIDD journey backbone (context -> spec -> plan ->
  implement -> review -> ship), expressed as skill *categories*.
- Map detected project SDLC phase -> next category.
- Category-based only; no foreign skill names.

### M3 — Recommendation rewrite (`actions/02-recommend-next.md`)
- Render the full journey path (read-only) + the ONE next step.
- Resolve category -> installed skill at runtime; skip categories with no installed skill.
- Keep the numbered menu (run / explain / handoff / swap / stop).

### M4 — Execution rewrite (`actions/03-execute-or-handoff.md`)
- Drop the hard-coded 6-skill allowlist.
- Validate the chosen skill against the actually-installed skill set.

### M5 — Docs + meta
- `SKILL.md`: rewrite the `description`/triggers as a routing deliverable, not text
  editing — onboard's activation depends on it. Keep surviving old triggers
  ("guide me through aidd-context") alongside new project-onboarding triggers
  ("onboard me to this project", "what should I work on next"). Remove the
  "strictly aidd-context skills" transversal rule and the phantom "separate
  cross-plugin onboard owns that scope" carve-out; add new transversal rules for
  cross-plugin + journey behavior.
- `README.md`: rewrite scope and when-to-use; remove the phantom carve-out.
- `evals/scenarios.json`: replace plugin-tour prompts with project-onboarding intent prompts.
- `CATALOG.md`: regenerate the `00-onboard` entry; remove phantom-onboard mentions.

### M6 — Validate
- Order: runs after M5 (eval scenarios must be rewritten before they are run).
- Run each action's `## Test`.
- Run the eval scenarios.
- `grep` the skill: no hard-named foreign skill, no "cross-plugin onboard" phantom string.

## Open questions (resolve during M1/M2, not before handoff)

### O1 — SDLC-phase detection heuristics (core engine)
The signal that decides which journey leg is recommended. Get it wrong and every
recommendation is wrong.
- Candidate signals: spec/plan docs in `aidd_docs/`, source code presence, test
  presence, branch name, open PR linked to an issue.
- False-positive modes: code + no spec can mean mid-implement, a team that skips
  specs, or a pre-AIDD repo. Branch/PR state is noisy.
- Decision: when phase signals are ambiguous, fall back to the Stage 2 intent ask
  (today's `row 4 = ask` pattern) rather than guessing.

### O2 — aidd-context installed alone (most common bootstrap case)
New user installs only `aidd-context`, runs onboard. No `aidd-dev`/`aidd-pm`/etc.
The journey backbone maps to no installed skills past memory bootstrap.
- Required behavior: run the narrowed aidd-context-only path (today's behavior
  survives here as one branch, NOT deleted) AND surface that installing more AIDD
  plugins unlocks the rest of the journey.
- Note: this contradicts a naive reading of "today's narrow behavior is replaced"
  — it is replaced as the *default*, but remains the valid path when it is the
  only installed surface.

## Risks / constraints

- Plugin detection is AI-tool-dependent — mitigated by reusing discovery's proven pattern.
- Overlap with `06-discovery` — keep distinct: discovery = single pointer, onboard
  = journey. Do not merge.
- Scope creep — onboard recommends and guides; it must NOT execute a whole SDLC
  (orchestrator skills already own that). Hard boundary.

## Files touched

- `plugins/aidd-context/skills/00-onboard/SKILL.md`
- `plugins/aidd-context/skills/00-onboard/README.md`
- `plugins/aidd-context/skills/00-onboard/actions/01-detect-state.md`
- `plugins/aidd-context/skills/00-onboard/actions/02-recommend-next.md`
- `plugins/aidd-context/skills/00-onboard/actions/03-execute-or-handoff.md`
- `plugins/aidd-context/skills/00-onboard/assets/state-matrix.md`
- `plugins/aidd-context/skills/00-onboard/evals/scenarios.json`
- `plugins/aidd-context/CATALOG.md`
