# 02 - Render Report

Render the detected gap list into a structured markdown shadow report and write it next to the source artifact.

## Inputs

- `gaps[]` (required when `diff` is absent): gap objects from `01-detect`. Ignored when `diff` is supplied.
- `warnings[]` (required, may be empty): warnings from `01-detect`.
- `source_path` (required): path used to derive the output filename and directory.
- `diff` (optional): the three labeled sets from `03-diff` — `closed[]`, `still_open[]`, `newly_introduced[]`. Triggers diff mode.

## Outputs

A markdown file at `<source_dir>/<source_stem>-shadow-report.md`.

Filename rule: strip the last extension from the source filename and append `-shadow-report.md`. Examples:

| Source | Report |
| --- | --- |
| `prd.md` | `prd-shadow-report.md` |
| `feature-v2.draft.md` | `feature-v2.draft-shadow-report.md` |
| `Makefile` | `Makefile-shadow-report.md` |

The source artifact is never modified.

## Process

1. Load the skeleton from `assets/report-template.md`.
2. Derive `source_dir` and `source_stem` per the filename rule.
3. If `warnings` is non-empty, emit `## Warnings` at the top with each entry as a bullet. Otherwise omit the block.
4. Render gaps grouped by category in locked order (`references/locked-sets.json`):
   - Non-diff mode: emit one `### <category>` per category with at least one gap.
   - Diff mode: for each category, emit `#### Closed`, `#### Still Open`, `#### Newly Introduced` in that fixed order, omitting empty subsections.
5. Within any subsection, sort gaps by severity: `blocker` → `major` → `minor`.
6. Render each gap as `**[severity]** <probe>`. If `snippet` is non-empty, append a blockquote on the next line.
7. Populate header counts: total + per-severity. In diff mode, counts come from `still_open` + `newly_introduced` only.
8. Stamp `status: clean` in front matter when zero `blocker` and zero `major` entries remain in scope. Otherwise omit the `status` key entirely.
9. Write to `<source_dir>/<source_stem>-shadow-report.md`.

## Test

- Grouping: gaps spanning multiple categories produce one `### <category>` per category, in locked order.
- Sorting: within a category, `blocker` precedes `major` precedes `minor`.
- Filename: source ending in `feature-v2.draft.md` produces `feature-v2.draft-shadow-report.md`. Source `Makefile` produces `Makefile-shadow-report.md`.
- Clean: zero blocker and zero major → front matter contains `status: clean`.
- Dirty: at least one blocker or major → front matter has no `status` key.
- Warnings: non-empty `warnings` → `## Warnings` section emitted. Empty → omitted.
- No source mutation: `source_path` content and mtime unchanged after the action.
- Diff order: when a category has entries in all three subsets, output is `Closed` → `Still Open` → `Newly Introduced`.
- Diff clean: a `blocker` in `closed[]` does not block clean status; only `still_open` + `newly_introduced` count.
