---
name: code-review
description: Code review checklist and scoring template
argument-hint: N/A
---

# Code Review for onboard-rescope (aidd-context:00-onboard)

Widens `aidd-context:00-onboard` from a single-plugin guided tour to a
project-wide AIDD onboarding hub: silent detection, three-line briefing,
hub menu, SDLC sub-menu, category resolution. Diff scope: `git diff` working
tree, 9 files, +308 / -184.

- Statuts: Changes requested (2 medium, 5 low)
- Confidence: High

---

- [Main expected Changes](#main-expected-changes)
- [Scoring](#scoring)
- [Code Quality Checklist](#code-quality-checklist)
- [Final Review](#final-review)

## Main expected Changes

- [x] SKILL.md / README.md / CATALOG.md re-scoped to project-wide hub
- [x] `01-detect-state` made silent, three signal groups added
- [x] `02-recommend-next` renders briefing + hub menu + SDLC sub-menu
- [x] `03-execute-or-handoff` adds briefing / swap actions
- [x] `state-matrix.md` rewritten as hub + journey + category resolution
- [x] `evals/scenarios.json` re-prompted to project-wide intent

## Scoring

Files: 9. Findings: 7 (0 critical, 0 high, 2 medium, 5 low).

### Findings

- [🟡] **Doc inaccuracy** `README.md` "## The AIDD journey" — the 8-leg line
  (`bootstrap → context-setup → refine → ... → ship`) is captioned "Reached
  through hub option 3". False: the SDLC sub-menu (option 3) exposes only legs
  `refine`..`ship` (6 of 8). `bootstrap` and `context-setup` are reached via
  hub option 2 (Memory bank). Fix: split the caption, or note that the first
  two legs are reached through option 2.

- [🟡] **Wrong asset path** `actions/01-detect-state.md:29` — the
  `memory_files_filled` heuristic compares each memory file against
  `assets/templates/memory/<scope>/<name>.md`. Verified layout: top-level
  templates (`vcs.md`, `architecture.md`, `coding-assertions.md`,
  `codebase-map.md`, `testing.md`, `project-brief.md`, `deployment.md`) sit
  flat at `templates/memory/<name>.md` with no `<scope>/` segment; only
  `backend/` and `frontend/` files are nested. The `<scope>/` pattern resolves
  to non-existent paths for 7 of 8 files, so the heuristic silently fails and
  `memory_state` can misclassify. Fix: drop `<scope>/` or document the
  flat-plus-two-subfolders layout explicitly.

- [🟡] **Dead signal** `actions/01-detect-state.md:16` — `memory_files_count`
  is probed (Group A) but never consumed: `memory_state` derives from
  `memory_files_filled` + dir presence only, and the `briefing` in action 03
  never prints a count. Either feed it into the briefing or drop it.

- [🟡] **Under-described option** `README.md` "## The hub menu" option 4 —
  "List every installed surface - hand off to the discovery skill." The actual
  route (`02` step 4) resolves discovery and renders the full skill menu
  (run / explain / handoff / swap / stop). "hand off" understates it; the user
  can also run it in-session. Fix: "open the discovery skill".

- [🟡] **Arrow style inconsistency** `README.md` uses Unicode `→` (journey
  line, "When NOT to use" bullets) while `SKILL.md` and all `actions/*.md` use
  ASCII `->`. Pick one across the skill folder. (Low: no rule broken; em-dash
  rule is respected — all separators are ASCII hyphen.)

- [🟡] **Wording mismatch** `actions/03-execute-or-handoff.md:20` — the
  outputs table says `run` ends by asking the user "to confirm the result in
  one word", but step 3 prints `Reply ok / not ok / explain` where "not ok"
  is two words. Align the two lines.

- [🟡] **Tool-agnostic claim vs hardcoded probe** `actions/01-detect-state.md`
  — narrative says "the AI tool" generically, but the context-block probe
  greps a fixed list `CLAUDE.md AGENTS.md .github/copilot-instructions.md`.
  Acceptable pragmatically; note the limitation or treat the list as the
  documented support set.

## Code Quality Checklist

### Potentially Unnecessary Elements

- [x] `memory_files_count` collected but unused (see findings)

### Standards Compliance

- [x] Naming conventions followed
- [x] Coding rules ok — no em-dash (`—`/U+2014) in the diff, ASCII hyphen
      throughout; CATALOG.md description kept in sync with SKILL.md
- [x] No-cross-plugin-link rule respected — the category-resolution design
      names categories by function, never a foreign skill or plugin id; the
      old "separate cross-plugin onboard owns that scope" line was removed

### Architecture

- [x] Design patterns respected — silent-detect / render / execute loop is
      coherent; category indirection cleanly decouples onboard from the
      installed plugin set
- [x] Proper separation of concerns — 01 probes, 02 renders/routes, 03 acts

### Code Health

- [x] Functions and files sizes — action files stay small and focused
- [x] No magic numbers/strings
- [x] Internal consistency — one doc inaccuracy and one wording mismatch
      (see findings); menu option counts (hub 5, SDLC 7, skill 5) consistent
      across SKILL / actions / matrix

### Security

- [x] N/A — markdown skill definitions, no executable surface; detect-state
      probes are read-only `test`/`ls`/`grep`

### Error management

- [x] Free-text-at-menu re-render fallback specified for every menu

### Performance

- [x] N/A

### Frontend specific

- [x] N/A

### Backend specific

- [x] N/A

## Final Review

- **Score**: 8.5 / 10 — solid re-scope, the hub/category design is clean and
  rule-compliant. Two medium findings are real and worth fixing before merge.
- **Feedback**: The category-resolution mechanism correctly solves the
  cross-plugin-link constraint. The wrong template path (`<scope>/`) is the
  highest-value fix — it silently degrades `memory_state` detection. The
  README journey caption misleads on how the first two legs are reached.
- **Follow-up Actions**:
  1. Fix the `<scope>/` template path in `01-detect-state.md`.
  2. Correct the "## The AIDD journey" caption in `README.md`.
  3. Resolve the 5 low findings (dead signal, option 4 wording, arrow style,
     one-word/two-word mismatch, tool-agnostic note).
- **Additional Notes**: Branch `feat/onboard-rescope` has no commits vs
  `main` — all changes are uncommitted working-tree edits; review ran on the
  working tree.
