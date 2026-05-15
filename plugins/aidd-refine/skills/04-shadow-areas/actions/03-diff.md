# 03 - Diff

Load the prior shadow report, compare it against the freshly detected gaps, and classify each gap as closed, still open, or newly introduced.

## Inputs

- `current_gaps[]` (required): gap objects from `01-detect` for the current run.
- `source_path` (required): path used to derive the prior report location, applying the filename rule from `02-render-report`.

## Outputs

Three labeled sets, passed to `02-render-report`:

- `closed[]`: gaps present in the prior report but absent from `current_gaps`.
- `still_open[]`: gaps present in both runs.
- `newly_introduced[]`: gaps present in `current_gaps` but absent from the prior report.

Each entry carries `category`, `severity`, and `probe`. `closed` entries carry the prior probe; `still_open` and `newly_introduced` carry the current probe.

## Process

1. Derive prior report path from `source_path` using the filename rule of `02-render-report`.
2. If the prior report does not exist: emit `closed = []`, `still_open = []`, `newly_introduced = current_gaps`. Stop. This is the expected first-run behavior.
3. Parse the prior report:
   - Locate `## Gaps by Category` and walk `### <category>` subsections.
   - Each line matching `**[severity]** <probe>` is a gap; an immediately following blockquote line is its `snippet`.
   - Diff-mode subsections (`Closed` / `Still Open` / `Newly Introduced`) are parsed identically.
4. Build identity keys: `(category, normalized_snippet)`. Probe wording is NOT part of the key. Snippet-less gaps fall back to `(category, severity)`. This matches `01-detect`'s dedup rule so identity is consistent between runs.
5. Compute the three sets by set difference / intersection on identity keys.
6. Pass `closed`, `still_open`, `newly_introduced` to `02-render-report`.

## Test

- No change between runs → `closed = []`, all gaps in `still_open`, `newly_introduced = []`.
- A prior gap whose source anchor is removed → appears in `closed`, not in `still_open`.
- A new gap not in the prior report → appears in `newly_introduced`, not in `still_open`.
- First run (no prior report) → `closed = []`, `still_open = []`, all current gaps in `newly_introduced`. No error.
- Probe wording change with same category + snippet → classified as `still_open` (probe wording is not part of identity).
- Snippet-less gaps with identical `(category, severity)` across runs → classified as `still_open`.
