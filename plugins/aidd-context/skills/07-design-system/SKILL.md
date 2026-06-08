---
name: 07-design-system
description: Initialize a project's design system through a guided, ordered playbook that routes each step to the right Impeccable command - register and color strategy, palette with accessibility validation, typography, spacing, elevation, motion, components, and the canonical DESIGN.md.
disable-model-invocation: true
---

# Skill: design-system

Guided onboarding for authoring a quality design system. It does NOT generate the system - the [Impeccable](https://impeccable.design) skill already does (palette, typography, tokens, `DESIGN.md`). It adds the missing piece: an ordered playbook that routes each step to the right Impeccable command. Impeccable executes; `DESIGN.md` stays the single source of truth.

## Transversal rules

- **One source of truth**: Impeccable's root `DESIGN.md` (+ `.impeccable/design.json`). Never write a competing design file or a copy. Point, never copy.
- **Impeccable is a declared external dependency** - naming its commands is allowed; if absent, the playbook guides install.
- Per-step criteria are inline checkboxes in the action (walked as an AI-driven todo). No assets - the skill keeps no derived copy of `DESIGN.md`.
- English-only.

## Available actions

| #   | Action                 | Role                                                        | Input              |
| --- | ---------------------- | ---------------------------------------------------------- | ------------------ |
| 01  | `create-design-system` | Walk the playbook to a quality design system via Impeccable | project (optional) |

## Default flow

Single action. It confirms Impeccable is available, then drives the playbook.
