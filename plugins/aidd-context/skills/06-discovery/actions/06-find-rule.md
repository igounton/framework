# 06 - Find rule

Enumerate installed rules from the canonical, tool-agnostic surface (`aidd_docs/rules/`), recommend the best match for the user's stated intent.

## Inputs

- Free-form user intent.
- Confirmed tools from the SKILL.md tool gate.

## Outputs

A markdown table of installed rules + a recommendation block.

```text
| Rule           | Path                                                  | Purpose                          | Scope (paths)   |
| -------------- | ----------------------------------------------------- | -------------------------------- | --------------- |
| 1-mermaid      | aidd_docs/rules/01-standards/1-mermaid.md             | Mermaid generation rules         | -               |
| 3-api          | aidd_docs/rules/03-frameworks-and-libraries/3-api.md  | API conventions for TS endpoints | src/api/**/*.ts |
| ...            | ...                                                   | ...                              | ...             |

Recommendation: <best-match rule name>
Why: <one sentence>
Source: <relative path>
```

## Process

1. **Enumerate rules.** Run the `list-rules.mjs` script located at `scripts/list-rules.mjs` under the `06-discovery` skill root (resolve via the plugin install path) from the user's project root; accept a silent empty array when `aidd_docs/rules/` contains no rules.
2. **Extract metadata.** For each entry, read `path`, `name`, `description`, `paths` from the JSON output.
3. **Render the table.** Columns: `Rule | Path | Purpose | Scope (paths)`. Sort by rule name.
4. **Ask the user for intent.** `Which behavior or scope are you looking for?` Wait for an explicit reply.
5. **Match.** Score each rule against the stated intent (name + description + `paths` scope). Pick the single best match. If tied, list both.
6. **Print the recommendation block.** Rule name, one-sentence rationale, source path.
7. **Stop.** Do not edit or invoke the rule.

## Test

The output contains a non-empty rules table, followed by a recommendation block that names one rule present in the table, a one-line rationale, and the rule's source path.
