# 06 -- Write Audit

Persist the run record on the PR branch, finalize the Check Run, transition the issue labels, post the completion marker.

## Inputs

- `run_record` -- merged data from `03-acquire-lock` and `05-delegate-sdlc`
- `config` -- parsed `.claude/aidd-orchestrator.json`

## Outputs

```json
{
  "audit_path": "aidd_docs/async-runs/2026_05/2026-05-07T10-12-31Z-i42.json",
  "audit_commit_url": "https://github.com/org/repo/commit/<sha>",
  "check_run_id": 9876543210,
  "labels_after": ["claude/awaiting-review"],
  "completion_marker_url": "https://github.com/org/repo/pull/<pr>#issuecomment-..."
}
```

## Depends on

- `05-delegate-sdlc`

## Process

1. Compose `audit_path = config.audit.log_dir + "/" + YYYY_MM + "/" + run_id + ".json"`. Build the run record JSON: trigger, issue, lock timestamps, SDLC outcome, `delegated_via_skill`, errors, plugin version.
2. Push the audit file to the PR branch via the Contents API (no `git checkout`):
   ```bash
   SHA=$(gh api "repos/$GITHUB_REPOSITORY/contents/$audit_path?ref=$branch" --jq .sha 2>/dev/null || echo "")
   PAYLOAD=$(jq -n --arg msg "chore(orchestrator): record async run audit $run_id" \
     --arg content "$(printf '%s' "$AUDIT_JSON" | base64 | tr -d '\n')" \
     --arg branch "$branch" --arg sha "$SHA" \
     '{message:$msg, content:$content, branch:$branch} + (if $sha == "" then {} else {sha:$sha} end)')
   audit_commit_url=$(gh api -X PUT "repos/$GITHUB_REPOSITORY/contents/$audit_path" --input - <<< "$PAYLOAD" --jq .commit.html_url)
   ```
3. If `config.audit.github_check_run`: create or update Check Run `aidd-async/<run_id>`. Capture `check_run_id` and set a final `conclusion` (`success` / `failure` / `action_required`).
4. Transition labels: remove `config.labels.working`; on success add `config.labels.awaiting_review`, on failure add `config.labels.blocked` and post the error on the issue. Capture `labels_after` from the API response.
5. Post the completion marker (single PR comment, idempotent via the HTML token):
   ```
   <!-- aidd-orchestrator:run-complete run_id=<run_id> -->
   ✅ Async run complete. Audit: <audit_commit_url>.
   ```
   Capture `completion_marker_url`. The agent uses this as its sole exit signal.
6. Run the Test section. Exit only when every assertion prints `OK`.

## Test

```bash
gh api "repos/$GITHUB_REPOSITORY/contents/$audit_path?ref=$branch" --jq .sha >/dev/null \
  && echo "OK audit_file" || echo "FAIL audit_file"

gh api "repos/$GITHUB_REPOSITORY/check-runs/$check_run_id" --jq .conclusion \
  | grep -Eq '^(success|neutral|failure|action_required)$' \
  && echo "OK check_run" || echo "FAIL check_run"

gh api "repos/$GITHUB_REPOSITORY/issues/$issue_number" --jq '[.labels[].name]' \
  | jq -e 'contains(["claude/awaiting-review"]) and (contains(["claude/working"]) | not)' >/dev/null \
  && echo "OK labels" || echo "FAIL labels"

gh api "repos/$GITHUB_REPOSITORY/issues/$pr_number/comments" \
  --jq "[.[] | select(.body | contains(\"aidd-orchestrator:run-complete run_id=$run_id\"))] | length" \
  | grep -q '^1$' && echo "OK marker" || echo "FAIL marker"
```

On failure mode (`delegated_via_skill == false` or SDLC errored): assertion 3 expects `claude/blocked` instead of `claude/awaiting-review`.
