← [aidd-framework](../../../../README.md) / [aidd-pm](../../README.md)

# 04 - Wireframe

Turns product requirements into low-fidelity wireframes: a screen inventory,
ASCII layouts with component hierarchies, and a Mermaid navigation flow.
Stays at the structure level; never visual design and never code.

## When to use

- "wireframe", "wireframes", "wireframe the feature".
- "screen layout", "low-fi mockup", "maquette fil de fer".
- When you need to lay out the screens and navigation of a feature, with or
  without an existing PRD.
- At any stage, including a legacy project with no product docs, to capture
  or redesign existing screens.

## When NOT to use

- For high-fidelity visual design (colors, typography, polished mockups).
- To generate UI code (HTML, CSS, components) - that belongs to your dev
  capability.
- To draft a PRD → use `03-prd`.
- To write a spec → use `05-spec`.

## How to invoke

```
Use skill aidd-pm:04-wireframe for <feature to wireframe>
```

The skill proposes a screen inventory for you to confirm or challenge, then
drafts and saves the wireframe. See [`SKILL.md`](SKILL.md) for the contract.

## Outputs

- A wireframe file under `aidd_docs/tasks/`, built from
  [`assets/wireframe-template.md`](assets/wireframe-template.md).
- No executable code and no tracker mutations.

## Prerequisites

- A feature to wireframe.
- Write access to `aidd_docs/tasks/` in the current repo.

## Technical details

See [`SKILL.md`](SKILL.md) for the action contract,
[`actions/01-wireframe.md`](actions/01-wireframe.md) for the single atomic
action, [`assets/wireframe-template.md`](assets/wireframe-template.md) for
the wireframe structure, and
[`assets/wireframe-validator.yml`](assets/wireframe-validator.yml) for the
checklist a caller's reviewer uses to validate the result.
