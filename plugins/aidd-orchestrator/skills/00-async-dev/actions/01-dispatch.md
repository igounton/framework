# 01 - Dispatch

Inspect signals, pick one downstream skill, invoke it, return its result unchanged.

## Inputs

- `$ARGUMENTS` (optional) - free-form intent the human typed after `/async-dev`.
- Environment (optional, present in CI):
  - `GITHUB_EVENT_NAME` - `issues`, `issue_comment`, `workflow_dispatch`, `schedule`.
  - `GITHUB_EVENT_PATH` - JSON payload (label name, comment body, issue/PR number).
- Repo state:
  - `.github/workflows/aidd-async.yml` presence.
  - `.claude/aidd-orchestrator.json` presence.

## Outputs

```yaml
target_skill: aidd-orchestrator:01:setup-async-dev | :02:run-async-dev | :03:review-async-dev
signals_used:
  - <signal name>: <observed value>
delegate_result: <verbatim return from the invoked skill>
```

## Process

1. **Collect signals.** Check repo files, read `$ARGUMENTS`, parse `GITHUB_EVENT_PATH` JSON if present. Build a `signals` map; do not score yet.
2. **Apply detection matrix** from `../SKILL.md`. Walk from most specific to least specific:
   1. Explicit issue/PR id in `$ARGUMENTS` or event payload.
   2. Label name (`to-implement` -> run, `to-review` -> review).
   3. PR comment body matching `@claude /review`.
   4. Free-text keyword (`setup|install|configure|bootstrap` -> setup, `run|implement|process` -> run, `review|iterate` -> review).
   5. Config absence -> setup.
3. **Resolve conflicts.** If two signals point to different skills, list them and either ask the human (interactive) or pick the most specific (auto). Never silently switch.
4. **Sanity check repo state.** If target is `run` or `review` but `.claude/aidd-orchestrator.json` is missing, abort with a single-line message telling the human to run setup first. Do not invoke the run/review skill on a broken repo.
5. **Invoke once.** Call the matching skill by exact `name:` slug. Pass `$ARGUMENTS` through verbatim plus any signal context the downstream skill needs (issue id, PR id, event name).
6. **Return.** Surface `target_skill`, `signals_used`, and the downstream skill's full return value. Do not summarize, do not rewrite, do not loop.

## Test

Given a synthetic environment for each row of the detection matrix in `../SKILL.md`, action 01 invokes the expected downstream skill exactly once and surfaces the matched signal. Mocked invocation is acceptable for the test (the downstream skill's own tests verify behavior end-to-end).
