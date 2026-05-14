# 04 -- Finalize

Tag the audit record, post the structured summary, update the Check Run, transition labels, drop the completion marker.

## Inputs

- `pr_number`
- `stop_reason` -- one of `max_iterations`, `blocked_label`, `human_reviewer`, `no_comments`
- `iteration_log` -- entries from `03-fix-iteration`; may be empty when `stop_reason == "no_comments"`
- `trigger_comment_id` (optional)
- `run_id`

## Outputs

```json
{
  "audit_path": "aidd_docs/async-runs/2026_05/2026-05-07T10-12-31Z-i42.json",
  "audit_commit_url": "https://github.com/org/repo/commit/<sha>",
  "check_run_conclusion": "neutral",
  "summary_comment_url": "https://github.com/org/repo/pull/<pr>#issuecomment-...",
  "labels_after": ["claude/awaiting-review"],
  "completion_marker_url": "https://github.com/org/repo/pull/<pr>#issuecomment-..."
}
```

## Depends on

- `02-detect-stop` (when `decision == "stop"`)

## Process

1. Read the existing audit JSON via the Contents API. Append `{ "loop_closed_at": "<ISO8601>", "stop_reason": "<reason>", "iterations": iteration_log }`. Push the update with `gh api -X PUT` (pass the prior `sha`). Capture `audit_commit_url`.
2. Update Check Run `aidd-async/<run_id>`: `success` for `human_reviewer` (tests passed) or `no_comments`; `neutral` for `max_iterations`; `action_required` for `blocked_label`.
3. Render the summary body from the template below. When `stop_reason == "no_comments"` and `iteration_log` is empty, show only the header row plus `_no fix iterations on this loop_`.
4. Post the summary as a single PR comment: `summary_comment_url=$(gh pr comment $pr_number --body-file -)`. Always post, including on `no_comments`.
5. If `trigger_comment_id` set: remove the prior `eyes` reaction; add the final one (`+1` for `human_reviewer` / `no_comments`, `confused` for `max_iterations`, `-1` for `blocked_label`).
6. Transition labels on the linked issue:
   ```bash
   issue_number=$(gh pr view $pr_number --json closingIssuesReferences --jq '.closingIssuesReferences[0].number')
   gh api -X DELETE "repos/$GITHUB_REPOSITORY/issues/$issue_number/labels/$(printf '%s' "$WORKING" | jq -sRr @uri)" || true
   case "$stop_reason" in
     blocked_label) NEW="$BLOCKED" ;;
     *)             NEW="$AWAITING" ;;
   esac
   gh api -X POST "repos/$GITHUB_REPOSITORY/issues/$issue_number/labels" -f "labels[]=$NEW"
   ```
7. Post the completion marker (single PR comment, idempotent):
   ```
   <!-- aidd-orchestrator:review-complete run_id=<run_id> -->
   ✅ Async review complete (`<stop_reason>`). Summary: <summary_comment_url>.
   ```
   Capture `completion_marker_url`. The agent uses this as its sole exit signal.
8. Run the Test section. Exit only when every assertion prints `OK`.

## Summary template

```markdown
## Async review summary

**Stop reason** -- `<stop_reason>` (`<one-line plain English explanation>`)
**Iterations** -- `<count>` of `<max_iterations>` allowed
**Last commit** -- [`<short_sha>`](<commit_url>)
**Tests** -- `<pass>/<total>` passing on the last iteration

### Iterations

| # | Comments addressed | Commit | Tests |
| - | ------------------ | ------ | ----- |
| 1 | <count> ([list](#)) | [`<sha>`](<url>) | `<pass>/<total>` |
| 2 | <count> ([list](#)) | [`<sha>`](<url>) | `<pass>/<total>` |

### Comments addressed in iteration <last>

- [`path:line`](<comment_url>) -- "<original comment body, truncated to 80 chars>" -> <one-line fix summary>

### Next step

- `human_reviewer` -- A reviewer commented since the last automated push. Re-trigger with `<retry mention>` / `<retry label>` once comments are addressed.
- `max_iterations` -- Hit `<max_iterations>` without convergence. Human review required before retry.
- `blocked_label` -- `<blocked label>` is set. Remove it to allow another retry.
- `no_comments` -- Nothing actionable to address. Re-trigger with a concrete inline review comment.

---
*Audit log: `<audit_path>`.*
```

Stay under ~30 lines on a typical PR. Truncate quoted bodies to 80 characters with `...`.

## Test

```bash
gh api "repos/$GITHUB_REPOSITORY/contents/$audit_path?ref=$branch" --jq .content \
  | base64 -d | jq -e '.loop_closed_at and .stop_reason' >/dev/null \
  && echo "OK audit_closed" || echo "FAIL audit_closed"

gh api "repos/$GITHUB_REPOSITORY/check-runs/$check_run_id" --jq .conclusion \
  | grep -Eq '^(success|neutral|failure|action_required)$' \
  && echo "OK check_run" || echo "FAIL check_run"

gh api "repos/$GITHUB_REPOSITORY/issues/$pr_number/comments" \
  --jq "[.[] | select(.body | startswith(\"## Async review summary\"))] | length" \
  | grep -q '^[1-9]' && echo "OK summary" || echo "FAIL summary"

gh api "repos/$GITHUB_REPOSITORY/issues/$issue_number" --jq '[.labels[].name]' \
  | jq -e --arg sr "$stop_reason" '
      if $sr == "blocked_label"
      then contains(["claude/blocked"]) and (contains(["claude/working"]) | not)
      else contains(["claude/awaiting-review"]) and (contains(["claude/working"]) | not)
      end' >/dev/null \
  && echo "OK labels" || echo "FAIL labels"

gh api "repos/$GITHUB_REPOSITORY/issues/$pr_number/comments" \
  --jq "[.[] | select(.body | contains(\"aidd-orchestrator:review-complete run_id=$run_id\"))] | length" \
  | grep -q '^1$' && echo "OK marker" || echo "FAIL marker"
```

`no_comments` variant: assertion 3 still passes (summary contains the `_no fix iterations on this loop_` note); the `Iterations` table has only its header row.
