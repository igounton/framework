# 01 - Wireframe

Parse the product input, draft low-fidelity wireframes per the template, validate with the user, then save the file under `aidd_docs/tasks/`.

## Inputs

```yaml
prd_path: aidd_docs/tasks/<...>-prd.md   # optional; preferred source when available
feature_description: <free text>         # required when no prd_path is given
user_flows: [<flow name or text>]        # optional; flows to anchor the screens
```

## Outputs

```yaml
wireframe_path: aidd_docs/tasks/<yyyy_mm>/<yyyy_mm_dd>-<feature_name>-wireframe.md
feature_name: <kebab-case slug>
sections_present:
  - screen-inventory
  - layouts
  - component-hierarchy
  - navigation-flow
  - states-and-annotations
  - responsive-notes
  - open-questions
```

## Process

1. **Parse input**. Read the PRD when `prd_path` is given; otherwise work from `feature_description`. Extract the screens from user flows, information architecture, and acceptance criteria.
2. **Draft**. Fill `assets/wireframe-template.md`: list every screen, draw an ASCII layout and component hierarchy per screen, express the navigation flow as a Mermaid `flowchart`, annotate empty, loading, and error states, and note responsive behavior. Mark unknowns as `TBD: <question>`.
3. **Validate**. Show the full draft to the user. Wait for explicit approval. Apply revisions and re-show on each iteration.
4. **Save**. Write the approved wireframe to `aidd_docs/tasks/<yyyy_mm>/<yyyy_mm_dd>-<feature_name>-wireframe.md`. Create the month directory when missing.
5. **Return** the structured Outputs block.

## Test

- **File saved**: `wireframe_path` exists on disk after the action completes.
- **All sections**: the file contains every heading listed in `sections_present`.
- **Navigation flow**: the file contains at least one Mermaid `flowchart` block.
- **No code**: the file has no executable code blocks (no ```html, ```css, ```js) and no component markup describing how to build the UI.
