---
objective: "Extend aidd-context:05-learn with a continuous self-improvement loop: inline zero-disk session friction capture, an ephemeral per-session self-eval that prioritizes recurring observable events into candidate lessons, an auto-digest at session end plus an on-demand digest, all feeding the existing 01-scope user-validation gate so nothing persists without approval. Targets the current project only (no cross-repo). Reuse 01-scope/02-write/03-sync as the digest+write+sync engine; the only new pieces are inline capture and session self-eval."
success_condition: "Every action `## Test` in plugins/aidd-context/skills/05-learn/ passes; the skill's evals/scenarios.json scenarios pass; and a grep of the skill proves the new capture/self-eval pieces do not duplicate the 01-scope/02-write/03-sync digest+write+sync engine (no second categorize-and-write path, the self-eval action ends at candidate lessons handed to 01-scope)."
iteration: 0
created_at: 2026-05-29
execution_vehicle: "aidd-context:03:context-generate (refactor-skill mode)"
---

# SDLC Plan - Continuous self-improvement loop for `aidd-context:05-learn`

This plan extends the existing `learn` skill with a continuous learning loop
inspired by a Hermes-style capture-then-distill pattern. It adds NO second
persistence path. The existing three actions (`01-scope`, `02-write`,
`03-sync`) already are the digest, write, and sync engine. The only new pieces
are (a) an always-on inline friction-capture convention and (b) an ephemeral
per-session self-eval that turns counted observable events into prioritized
candidate lessons handed to `01-scope`.

## Premise

`learn` today is invocation-only and subjective at its core. `01-scope` step 3
asks five open questions ("what worked", "what to avoid") that depend on the
model's recollection at the moment of invocation. Two gaps follow:

- Friction that occurs mid-session (a failed test, a user correction, a tool
  retried three times) is gone by the time someone thinks to invoke `learn`.
- The trigger for a lesson is the model's subjective "this felt important",
  which drifts run to run.

The fix is a capture-then-count loop:

| Piece            | What it is                                                                                          | State        |
| ---------------- | --------------------------------------------------------------------------------------------------- | ------------ |
| Inline capture   | An always-loaded convention: the model emits a lightweight friction marker in its own output at the moment of friction. | In context, zero disk. |
| Session self-eval| A new action that reads back over the in-context transcript, counts markers by type, and emits prioritized candidate lessons. | Ephemeral, zero disk. |
| Digest + persist | The existing `01-scope` -> `02-write` -> `03-sync` flow, now fed by the candidate lessons instead of (or in addition to) the subjective five-question pass. | On disk, gated by user approval. |

## Locked decisions

These are derived from the request and confirmed against the skill's current
contract. They are immutable for this run; the implementer must not
re-litigate them.

| ID  | Decision                                                                                                                                                                                                                                  |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 - zero disk capture | Capture is an inline marker the model writes into its own conversation output. It is never written to a scratch file, never to disk, never to a sidecar store. It lives only in the conversation context and disappears with the session. |
| D2 - observable trigger | A lesson candidate is triggered by a COUNT of objective, observable events crossing a threshold - never by a single marker and never by the model's subjective "this felt important". One marker is capture only; recurrence is what promotes it to a candidate. This is the anti-drift spine. |
| D3 - no duplication | The self-eval action ends at "prioritized candidate lessons". It does NOT categorize destinations, does NOT write files, does NOT sync. It hands the candidates to `01-scope` as a structured input. `02-write` and `03-sync` are untouched. |
| D4 - two triggers | The digest runs (a) automatically at session end and (b) explicitly on demand. Both entry points converge on the same self-eval -> `01-scope` flow. The session-end trigger is a proactive in-skill offer (the skill proposes the digest when the conversation signals end of work), NOT a Stop hook. This keeps the loop multitool-safe and adds no hook to the plugin. |
| D5 - always validate | Candidate lessons are proposed; the user validates through the existing `01-scope` confirmation gate before any write. No silent persistence. |
| D6 - current project only | The loop improves the current project (the repo the work happens in). No cross-repo learning. When the AIDD framework is the current project, the framework improves itself; that is the same single-project rule, not a special case. |
| D7 - two destination scopes | A candidate lesson is routed to one of two scopes: `project` (the current repo's `aidd_docs/memory` / rules / skills, the existing destinations) or `local-user` (the invoking user's own memory). The scope is chosen during scoping and confirmed by the user. This widens `02-write`'s destination set; it does not add a new write engine. |

## Open question (explore, do not solve in this run)

Anti-regression: how to retire a lesson that later proves degrading. The
proposed minimal, symmetric direction - do NOT build a rollback engine - is:
when `02-write` persists a lesson it records provenance plus the justifying
event count; a later session whose self-eval counts contradicting events above
the same threshold proposes a REVERSAL candidate, which flows through the exact
same `01-scope` validation gate. No automatic deletion, no new machinery,
symmetric to the forward path. This stays an open question for a follow-up;
this run only reserves the provenance field so a future reversal is possible.

## Observable-event taxonomy (the anti-drift spine)

The self-eval counts only objective, transcript-derivable events. These are the
countable types and the default per-candidate threshold. The taxonomy lives in
a reference so it is the single source of truth for both the capture convention
and the self-eval.

| Event type           | Observable signal (re-derivable from transcript)                          | Default threshold |
| -------------------- | -------------------------------------------------------------------------- | ----------------- |
| `test-failed`        | A test or check command exited non-zero, then was re-run.                  | 2 occurrences     |
| `user-correction`    | User rejected or corrected the model's output ("non", "pas ca", "redo it"). | 2 occurrences     |
| `tool-retry`         | The same tool or command was retried after a failure on the same target.   | 3 occurrences     |
| `revert`             | A change was undone or rolled back.                                        | 2 occurrences     |
| `tool-error`         | A tool returned an error result.                                           | 3 occurrences     |
| `repeated-lookup`    | The same fact or file was looked up repeatedly because it was not captured. | 3 occurrences     |

A marker is one tagged occurrence. A candidate lesson is promoted only when a
type's count crosses its threshold within the session. Counts are re-derivable
from the transcript, so the trigger is auditable and disk-free.

## Architecture projection

Modify:
- `plugins/aidd-context/skills/05-learn/SKILL.md` - add the two new actions to the table, state the auto + on-demand triggers, add a transversal rule for the capture convention and the count-based trigger, point to the new references. Stays a pure router (R1) under 500 lines (R4).
- `plugins/aidd-context/skills/05-learn/actions/01-scope.md` - accept the structured candidate lessons from the self-eval as an input that augments or replaces the subjective five-question pass; add the `project` vs `local-user` scope choice to the categorize + confirm steps.
- `plugins/aidd-context/skills/05-learn/actions/02-write.md` - widen the destination set to route `local-user`-scoped items to user memory; record lesson provenance (justifying event count) so a future reversal is possible.
- `plugins/aidd-context/skills/05-learn/evals/scenarios.json` - add scenarios for the on-demand digest trigger and for a non-recurring friction that must NOT promote to a candidate (anti-drift negative case).
- `plugins/aidd-context/skills/05-learn/README.md` - document the loop, the two triggers, and the two scopes.
- `plugins/aidd-context/CATALOG.md` - regenerate the `05-learn` entry with the new actions and references.

Create:
- `plugins/aidd-context/skills/05-learn/actions/00-capture.md` - the inline capture convention spec (how a marker is emitted, marker shape, that it is zero-disk and in-context only). Numbered 00 because it is the always-on substrate the loop reads.
- `plugins/aidd-context/skills/05-learn/actions/04-session-eval.md` - the ephemeral self-eval: read transcript, count markers by taxonomy type, apply thresholds, emit prioritized candidate lessons, hand to `01-scope`.
- `plugins/aidd-context/skills/05-learn/references/event-taxonomy.md` - the observable-event taxonomy and thresholds (single source of truth for capture + self-eval).
- `plugins/aidd-context/skills/05-learn/references/capture-convention.md` - the always-loaded marker convention referenced by the capture action and surfaced into normal work.

Delete:
- none.

## Applicable rules

| Tool   | Name                          | Path                                                                                     | Why it applies                                                                                  |
| ------ | ----------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| claude | skill-authoring R1            | `plugins/aidd-context/skills/03-context-generate/references/skill-authoring.md`          | SKILL.md must stay a pure router; the new logic lives in actions and references, not the router. |
| claude | skill-authoring R4            | same as above                                                                            | SKILL.md must stay under 500 lines; push detail into the two new references.                     |
| claude | skill-authoring R6            | same as above                                                                            | Zero duplication: the taxonomy and capture convention live once in `references/`, not inline in two actions. |
| claude | skill-authoring R8            | same as above                                                                            | Every new action needs a `## Test`: a concrete check on the produced candidate list or persisted file. |
| claude | skill-authoring R9            | same as above                                                                            | `learn` is auto-invocable, so `evals/scenarios.json` must keep at least 3 `{prompt, expect_action}` and cover the new triggers. |
| claude | skill-authoring R10           | same as above                                                                            | All new action and reference files are English only.                                            |
| claude | command-structure             | `.claude/rules/01-standards/1-command-structure.md`                                       | Action files: single objective, fewer than 10 steps, English, no markdown-formatted output blocks. |
| claude | ide-mapping                   | `.claude/rules/04-tooling/ide-mapping.md`                                                 | Skill files live under `skills/<name>/`, actions numbered `NN-<slug>.md`, references under `references/`. |

## Milestones

Five milestones, strictly sequential: M1 -> M2 -> M3 -> M4 -> M5. M5 runs last
because the eval scenarios it runs are rewritten in M4.

### M1 - Event taxonomy and capture convention (the substrate)

Dependency: none (entry milestone).

Deliverables:
- New `references/event-taxonomy.md` - the countable event types, their
  observable signals, and per-type thresholds (the table in this plan).
- New `references/capture-convention.md` - the inline marker convention: how
  the model emits a friction marker in its own output, the marker shape, and
  the hard rule that it is in-context only (zero disk, no scratch file).
- New `actions/00-capture.md` - thin action that points to
  `capture-convention.md`; states that capture is always-on during normal work
  and that one marker is capture only, never a lesson trigger (D2).

Acceptance criteria:
- `references/event-taxonomy.md` enumerates every event type with an observable
  transcript-derivable signal and a numeric threshold.
- `references/capture-convention.md` defines the marker shape and states the
  zero-disk, in-context-only rule (D1) explicitly.
- `actions/00-capture.md` references both files, states that capture is
  always-on, and states that a single marker never promotes to a candidate (D2).
- `actions/00-capture.md` has a `## Test` (R8).

### M2 - Session self-eval action

Dependency: M1.

Deliverables:
- New `actions/04-session-eval.md`:
  - Reads back over the in-context transcript.
  - Counts markers by the M1 taxonomy types.
  - Applies the per-type thresholds; promotes only types whose count crosses
    the threshold to candidate lessons (D2).
  - Emits a prioritized candidate list (highest count first) with, per
    candidate, the justifying event count.
  - Ends by handing the candidate list to `01-scope` as a structured input
    (D3) - it does NOT categorize destinations, write files, or sync.

Acceptance criteria:
- `actions/04-session-eval.md` counts by the M1 taxonomy and applies thresholds
  from `references/event-taxonomy.md` (no inline duplicate thresholds, R6).
- The action's stated output is a prioritized candidate list with a per-item
  event count; it explicitly stops at handing candidates to `01-scope` (D3).
- The action contains no categorize-destination step and no write or sync step
  (proven by grep in M5).
- `actions/04-session-eval.md` has a `## Test` checking that a sub-threshold
  friction yields zero candidates and an above-threshold one yields a candidate.

### M3 - Wire 01-scope and 02-write to the loop

Dependency: M2.

Deliverables:
- Update `actions/01-scope.md`:
  - Accept the candidate lessons from `04-session-eval` as an input that
    augments or replaces the subjective five-question auto-analyze (step 3).
  - When candidates carry event counts, the worth-learning check uses the count
    as the objective signal rather than the subjective score (D2).
  - Add the `project` vs `local-user` scope choice to the categorize step and
    surface it in the confirmation plan (D7).
  - Keep the explicit user-approval gate (D5).
- Update `actions/02-write.md`:
  - Widen the destination set: `local-user`-scoped items route to user memory;
    `project`-scoped items keep the existing memory / decisions / rules / skills
    destinations.
  - Record lesson provenance (justifying event count) on persisted items so a
    future reversal candidate is possible (Open question reservation).

Acceptance criteria:
- `01-scope.md` documents the candidate-list input and uses event counts as the
  objective trigger when present; the subjective five-question pass remains as
  the fallback for direct invocation with no candidate list.
- `01-scope.md` confirmation plan shows a scope (`project` | `local-user`) per
  item; the user-approval gate is unchanged (D5).
- `02-write.md` routes `local-user` items to user memory and `project` items to
  the existing destinations; persisted items carry a provenance field with the
  event count.
- `## Test` in `01-scope.md` and `02-write.md` passes.

### M4 - Triggers, SKILL.md, docs, evals

Dependency: M3.

Deliverables:
- Update `SKILL.md`:
  - Add `00-capture` and `04-session-eval` to the action table.
  - State the two digest triggers (D4): automatic at session end, and explicit
    on demand. Both converge on `04-session-eval` -> `01-scope` -> `02-write`
    -> `03-sync`.
  - Add a transversal rule: capture is always-on and zero-disk (D1); a lesson
    candidate is triggered by a counted event crossing a threshold, never by a
    single marker (D2).
  - Add a transversal rule: the current project is the only learning target
    (D6); destination scope is `project` or `local-user` (D7).
  - Point to the two new references. Stay a pure router (R1) under 500 lines (R4).
  - Session-end trigger mechanism is LOCKED (D4): the skill proactively offers
    the digest on session-wrap signals. No Stop hook, no `hooks.json` change.
    Document this in SKILL.md as the single trigger mechanism.
- Update `README.md` - document the loop, the two triggers, the two scopes, and
  the anti-drift count rule.
- Update `evals/scenarios.json`:
  - Add a scenario for the explicit on-demand digest trigger.
  - Add a NEGATIVE scenario: a one-off friction that must NOT promote to a
    candidate (anti-drift assertion).
  - Keep at least 3 entries (R9).
- Regenerate the `05-learn` entry in `plugins/aidd-context/CATALOG.md`.

Acceptance criteria:
- `SKILL.md` lists all five actions, states both triggers (D4), the always-on
  zero-disk capture rule (D1), the count-based trigger rule (D2), the
  current-project-only rule (D6), and the two destination scopes (D7).
- `SKILL.md` states the session-end trigger as a proactive in-skill offer (D4);
  no `hooks.json` change is made.
- `SKILL.md` stays a pure router (R1) under 500 lines (R4).
- `README.md` reflects the loop, triggers, scopes, and anti-drift rule.
- `evals/scenarios.json` includes the on-demand digest scenario and the
  anti-drift negative scenario, with at least 3 entries total.
- The `05-learn` entry in `CATALOG.md` is regenerated with the two new actions
  and two new references.

### M5 - Validate

Dependency: M4 (eval scenarios must be rewritten before they run).

Deliverables:
- Run each action's `## Test`.
- Run the eval scenarios.
- `grep` the skill to prove no duplication of the digest+write+sync engine:
  `04-session-eval` contains no categorize-destination, no file write, and no
  sync step; there is exactly one categorize path (`01-scope`), one write path
  (`02-write`), one sync path (`03-sync`).

Files touched: none (validation only; may surface fixes routed back to earlier
milestones).

Acceptance criteria:
- Every `## Test` across `plugins/aidd-context/skills/05-learn/actions/` passes.
- All `evals/scenarios.json` scenarios pass, including the anti-drift negative
  scenario.
- A grep proves the new pieces do not duplicate the engine: the self-eval action
  has no write/sync/categorize-destination logic, and the engine paths remain
  single (one `01-scope`, one `02-write`, one `03-sync`).
- This milestone's outcome equals the plan-level `success_condition`.

## Rules / constraints

| Constraint                        | Detail / mitigation                                                                                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No duplication of `learn` (D3)    | The self-eval ends at candidate lessons. The categorize, write, and sync logic stays in `01-scope` / `02-write` / `03-sync`. Enforced by the M5 grep.          |
| Zero disk for capture (D1)        | Capture is an inline conversation marker. No scratch file, no sidecar store. The only disk write is the final, user-approved `02-write`.                        |
| Anti-drift trigger (D2)           | A candidate requires a counted event crossing a threshold, not a subjective note. The taxonomy and thresholds live once in `references/event-taxonomy.md`.      |
| R4 budget                         | `SKILL.md` <= 500 lines. The capture convention and taxonomy live in references; SKILL.md stays a pure router.                                                  |
| Current project only (D6)         | No cross-repo learning. The framework improving itself when worked on in its own repo is the same single-project rule, not a separate mode.                     |
| Proactive offer, no hook (D4)     | The session-end digest is a proactive in-skill offer on session-wrap signals, not a Stop hook. Multitool-safe, adds no hook. Persistence stays in `02-write`. |

## Files touched (whole plan)

- `plugins/aidd-context/skills/05-learn/SKILL.md`
- `plugins/aidd-context/skills/05-learn/README.md`
- `plugins/aidd-context/skills/05-learn/actions/00-capture.md` (new)
- `plugins/aidd-context/skills/05-learn/actions/01-scope.md`
- `plugins/aidd-context/skills/05-learn/actions/02-write.md`
- `plugins/aidd-context/skills/05-learn/actions/04-session-eval.md` (new)
- `plugins/aidd-context/skills/05-learn/references/event-taxonomy.md` (new)
- `plugins/aidd-context/skills/05-learn/references/capture-convention.md` (new)
- `plugins/aidd-context/skills/05-learn/evals/scenarios.json`
- `plugins/aidd-context/CATALOG.md`

## Confidence

9 / 10.

Reasons (✓):
- The load-bearing mechanism (inline marker capture, transcript-derived count,
  threshold-promoted candidate handed to the existing scope gate) satisfies
  every stated constraint at once: zero disk, in-context, no duplication,
  observable-event trigger.
- The no-duplication boundary is concrete and grep-checkable: the new action
  stops at candidate lessons; the three existing actions stay the only engine.
- The anti-drift spine is a concrete taxonomy with thresholds, not a word.
- The applicable rules and files-touched are verified against the real skill
  layout and the real skill-authoring rules (R1-R10).

Risks (✗):
- The anti-regression reversal is an open question, not solved this run; only
  the provenance field is reserved.
