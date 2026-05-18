# 01 - Generate hook

Generate a Claude Code hook entry (one event + one matcher + one or more handlers) and write it to the matching scope's hooks file.

## Inputs

- `hook_request` (required) - free-form description of what to react to (event), under what condition (matcher / `if`), and what should happen (handler).

## Outputs

```yaml
hook_path: <scope-specific path to the hooks file>
event: <one of the supported event names>
matcher: <string; "*" if not narrowed>
handler_type: command | http | prompt | agent | mcp_tool
quality_score: 1-10
```

## Process

1. **Clarify.** Ask the user until the following are unambiguous (event, matcher, handler type, blocking expectation, scope). Use the spec in `@../../references/hook.md` as the source of truth for events, handler fields, and exit-code semantics.
2. **Pick scope and resolve `hook_path`:**
   - Plugin scope -> `<plugin>/hooks/hooks.json` (file is the hooks object itself).
   - Project scope -> `.claude/settings.json` (hooks live under the top-level `hooks` key).
   - Personal scope -> `~/.claude/settings.json` (same nesting as project).
   - Skill / agent scope -> `hooks:` block in the component's frontmatter.
3. **Validate the event name** against the table in `@../../references/hook.md`. Block on typo.
4. **Build the handler object** with only the fields the user supplied, plus the required fields for the chosen handler type per `@../../references/hook.md`. Drop empty optional fields.
5. **Build the matcher entry** `{ "matcher": <value or "*">, "hooks": [<handler>] }`.
6. **Read the existing hooks file** (if present). Merge:
   - If the `event` key exists: append the new matcher entry to its array (or merge into an existing matcher with identical `matcher` + `if` values).
   - If absent: add the key.
   - If the file does not exist: copy `@../../assets/hooks/hooks-template.json`, substitute placeholders, then strip the template comments.
7. **Confirm with the user** by printing the diff before write. Wait for written approval.
8. **Score 1-10** on event-handler fit, matcher specificity, and blocking-mode appropriateness (e.g. never expect `PostToolUse` exit code 2 to undo a tool call).
9. **Save** to `hook_path`.

## Test

`hook_path` exists and parses as JSON (or as YAML when the scope was a frontmatter `hooks:` block); the rendered entry has the required fields for its `handler_type`; the chosen `event` is one of the event names listed in `@../../references/hook.md`; `quality_score >= 8`.
