---
name: 04-wireframe
description: Produce low-fidelity wireframes from a PRD or feature description, validated with the user before save. Use when the user says "wireframe", "wireframes", "wireframe the feature", "screen layout", "low-fi mockup", "maquette fil de fer", or asks for the screens and navigation flow of a feature. Do NOT use for high-fidelity visual design, generating UI code, drafting a PRD, or writing a spec.
---

# Wireframe

Turns product requirements into low-fidelity wireframes: a screen inventory, ASCII layouts, and a navigation flow. Stays at the structure level; never visual design and never code.

## Available actions

| #   | Action      | Role                                                              | Input                                            |
| --- | ----------- | ---------------------------------------------------------------- | ------------------------------------------------ |
| 01  | `wireframe` | Parse PRD or description, draft wireframes per template, validate, save | prd_path or feature_description, user_flows (optional) |

## Default flow

Single action skill. The router dispatches to `wireframe` whenever a wireframe-generation phrase appears.

## Transversal rules

- Low fidelity only. Describe layout and structure, never visual design (colors, typography, spacing).
- Never produce executable code. No HTML, CSS, JS, or component snippets; wireframes are read, not run.
- Derive screens from the PRD user flows, information architecture, and acceptance criteria. Never invent intent; mark every gap as `TBD: <precise question>`.
- Always wait for explicit user validation before saving.
- Save path: `aidd_docs/tasks/<yyyy_mm>/<yyyy_mm_dd>-<feature_name>-wireframe.md`.
- Source of truth for structure: `@assets/wireframe-template.md`.

## References

- None.

## Assets

- `@assets/wireframe-template.md`: wireframe body template.

## External data

- None.
