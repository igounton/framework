# 01 - Detect

Parse the source artifact and extract a structured list of gaps, each classified by category, severity, and direct-question probe.

## Inputs

- `source` (required): file path OR inline markdown text.
  - Accept absolute paths and relative paths inside the working directory.
  - Reject paths outside the working directory and filenames matching `*-shadow-report.md`.

## Outputs

Two arrays:

1. `gaps[]`: each entry has `category`, `severity`, `probe`, and optional `snippet`.
   - `category` ∈ the 7 locked categories in `references/locked-sets.json`.
   - `severity` ∈ `{blocker, major, minor}` (see `references/severity-rubric.md`).
   - `probe`: direct question ending with `?` (see `references/probe-style.md`).
   - `snippet`: quoted excerpt from the source when traceable.

2. `warnings[]`: top-of-report notes that are not gap entries (e.g. non-markdown source).

## Process

1. Load locked sets from `references/locked-sets.json` and category definitions from `references/categories.md`.
2. Validate the source. Reject per the rules in Inputs.
3. Edge cases:
   - Empty source → emit one blocker gap `{category: "missing acceptance criterion", probe: "What content should this artifact contain?"}` and stop.
   - Non-markdown source → append warning `"Source is not markdown; gap attribution may be imprecise."` and continue.
4. Scan content for each of the 7 categories in their locked order. Emit one gap per distinct issue found, assigning severity per the rubric and drafting probes per the style rules.
5. Deduplicate by `(category, normalized_snippet)`. Snippet-less gaps fall back to `(category, severity)`.
6. Return `gaps` and `warnings`. Sorting is done by `02-render-report`.

## Test

- Outside-tree relative path → error and empty `gaps`.
- Filename matching `*-shadow-report.md` → error and empty `gaps`.
- Empty source → exactly one blocker gap (`missing acceptance criterion`).
- Non-markdown source → one entry in `warnings`, scanning continues.
- Every emitted gap has `category` and `severity` in the locked set and `probe` ending with `?`.
- A duplicated gap (same `category` + normalized `snippet`) appears once in the output.
