# 01 - Generate rules

Generate or modify coding rules, either from user input (manual mode) or by scanning the codebase (auto mode), then write each rule once to the canonical, tool-agnostic surface `aidd_docs/rules/` and ensure every installed tool's context file references it.

## Inputs

```yaml
arguments: <rule topic to write, or "auto"/"scan" to scan the codebase and propose rules>
```

## Outputs

```yaml
mode: auto | manual
files_written:
  - { path: <target_base>aidd_docs/rules/<NN-category>/<slug>.md }
  - ...
context_files_wired:
  - { tool: <id>, path: <context file>, action: referenced | already-present }
target_scope: project_root | plugin:<plugin-name>
target_base: "" | "plugins/<plugin-name>/"
```

## Process

1. Apply the **asset-access precheck** from `@../../references/tool-resolution.md` (## Asset access precheck).

2. Apply the **target scope selection** from `@../../references/tool-resolution.md` (## Target scope selection).

3. **Detect mode.**
   - `arguments` is `auto` or `scan` -> auto mode (step 3A).
   - `arguments` is empty or absent -> manual mode (step 3B).
   - `arguments` is any other non-empty string -> manual mode (step 3B); the string is a CANDIDATE topic, not a confirmed topic. The user MUST still confirm it in step 3B.

3A. **Auto mode - scan codebase.**
   - Scan source files, configs, dependencies, and directory structure.
   - Identify patterns, conventions, tech stack usage, existing rules.
   - Propose a complete rules architecture: list categories and rule files, show groups and sub-groups per file, display the proposed file tree.
   - WAIT FOR USER APPROVAL before proceeding to step 4.

3B. **Manual mode - user-guided (BLOCKING).**
   - MUST ask the user exactly: "What is the rule topic? Provide a 1-line description (e.g. 'TypeScript naming conventions', 'React hooks structure')."
   - If `arguments` contains a candidate topic string, display it and ask the user to confirm or replace it. Do NOT use the candidate string silently.
   - WAIT for the user's answer before continuing. Do NOT invent a topic, do NOT use a generic placeholder, do NOT proceed with whatever arguments were passed without explicit user confirmation.
   - If no answer is received or the user declines, FAIL with `status: blocked_awaiting_rule_topic`.
   - After topic is confirmed: remind project context (tech stack, versions, architecture, existing rules), define categories (one file per category), look for existing rules to update, plan the new rule(s) structure (file, groups and sub-groups, display the proposed architecture).
   - WAIT FOR USER APPROVAL on the architecture before proceeding to step 4.

4. **Pick category + slug deterministically.** Apply the selection rubric in `@../../references/rule.md` (walk top to bottom, stop at first hit). The chosen category index drives the slug prefix (rules in `02-programming-languages/` start with `2-`; rules in `03-frameworks-and-libraries/` start with `3-`; etc.). State the chosen category + slug in writing before proceeding.

5. **Generate and write one canonical file.** Build one canonical rule from the user's intent using the conventions in `@../../references/rule.md` and `@../../references/ai-mapping.md` (## Rules (canonical, all tools)). Copy the canonical template `@../../assets/rules/rule-template.md`, fill the `{{placeholders}}`, and write it to `aidd_docs/rules/<NN-category>/<slug>.md`. Rules are tool-agnostic - write the file ONCE, regardless of which tools are installed. Prepend `target_base` to the write path. All paths are CWD-relative; the plugin install directory is for reading the template only - MUST NOT be used as a write target.

6. **Wire the context files.** Resolve installed tools per `@../../references/tool-resolution.md` (detect, propose, confirm 1..N). For each confirmed tool, ensure its context file (`@../../references/ai-mapping.md` quick map: `CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md`) references the canonical rules surface so the tool loads rules from there. If the reference is already present, record `already-present`; otherwise add a one-line pointer to `aidd_docs/rules/` and record `referenced`. Do not duplicate an existing pointer. (OpenCode may instead list `aidd_docs/rules/**/*.md` under `instructions:` in `opencode.json`.)

7. Apply the **write target validation** from `@../../references/tool-resolution.md` (## Write target validation).

8. **Boundaries.**
   - Be concise. Less is more.
   - If multiple examples warrant separate files, create multiple rule files (each canonical, in `aidd_docs/rules/`).

## Test

```bash
# Test: each written rule file exists under aidd_docs/rules, starts with YAML frontmatter, and respects target_scope
for path in "${files_written[@]}"; do
  test -f "$path" || exit 1
  head -1 "$path" | grep -q "^---$" || exit 1
  [[ "$path" == *"aidd_docs/rules/"* ]] || exit 1
  case "$target_scope" in
    project_root)
      [[ "$path" != plugins/* ]] || exit 1 ;;
    plugin:*)
      [[ "$path" == "$target_base"* ]] || exit 1 ;;
  esac
done
echo ok
```
