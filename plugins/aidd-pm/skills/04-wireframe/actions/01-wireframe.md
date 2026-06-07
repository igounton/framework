# 01 - Wireframe

Gather context, clarify the screens, copy the template into `aidd_docs/tasks/`, then fill that copy in place and validate it with the user.

## Inputs

```yaml
feature_description: <free text>         # required; the feature to wireframe
platform: web | mobile | responsive      # optional; asked during clarify when omitted
screen_types: [<page type>]              # optional; asked during clarify when omitted
```

## Outputs

```yaml
wireframe_path: aidd_docs/tasks/<yyyy_mm>/<yyyy_mm_dd>-<feature_name>-wireframe.md
feature_name: <kebab-case slug>
```

## Process

1. **Gather context**. Load a related PRD or user stories from `aidd_docs/` when present; otherwise work from `feature_description`. Optional, never a precondition.
2. **Clarify**. Propose the screen inventory and each screen's type, confirm `platform` and the flows in scope, and iterate until the user agrees. Do not draw before the inventory is confirmed.
3. **Scaffold**. Copy `assets/wireframe-template.md` to `aidd_docs/tasks/<yyyy_mm>/<yyyy_mm_dd>-<feature_name>-wireframe.md`, creating the month directory when missing.
4. **Fill**. Edit that copy in place: one screen per agreed entry, the Mermaid flow, the states, and the responsive notes. Mark gaps as `TBD: <question>`.
5. **Validate**. Show the file, apply revisions in place, and iterate until explicit approval.
6. **Return** the structured Outputs block.

## Test

- **File saved**: `wireframe_path` exists on disk after the action completes.
- **All sections**: the file contains every section of `assets/wireframe-template.md`.
- **Filled, not just copied**: no template placeholder text (for example `[Screen name]`) remains for the in-scope screens.
- **Navigation flow**: the file contains at least one Mermaid `flowchart` block.
- **No code**: no executable code blocks (no ```html, ```css, ```js) or component markup.
