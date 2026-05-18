# 01 - Generate command

Generate a flat slash command file (one `.md`, frontmatter + body) and save it to the project's commands location.

## Inputs

- `command_request` (required) - free-form description of the command's purpose, expected arguments, allowed tools, and whether Claude can auto-invoke it.

## Outputs

```yaml
command_path: .claude/commands/<command-name>.md
name_proposals:
  - <short slug 1>
  - <short slug 2>
  - <short slug 3>
quality_score: 1-10
```

## Process

1. **Clarify.** Ask the user until the command's purpose, arguments, `disable-model-invocation` setting, `allowed-tools`, and target model are unambiguous. Field constraints and argument substitution rules: `@../../references/slash-command.md`.
2. **Decide command vs skill.** Flat command files are right for one-shot manual triggers without supporting files; if the command needs `actions/`, `assets/`, or `references/`, redirect the user to the skill-generation flow under `@../skills/01-capture-intent.md` instead.
3. **Fill the template** at `@../../assets/commands/command-template.md`. Required frontmatter: `description`. Recommended: `argument-hint`, `model`, `allowed-tools`, `disable-model-invocation` (default `false`). Reserved placeholder: `$ARGUMENTS` (plus `$0`, `$1`, `$ARGUMENTS[N]`, named-arg `$name`).
4. **Honor framework convention** at `@../../../../rules/01-standards/1-command-structure.md`: kebab-case slug, single objective, < 10 steps, English only, no markdown formatting in the rendered output. Place SDLC-phase commands under the phase subfolder (`commands/04_code/<slug>.md`) when applicable.
5. **Review.** Score the generated command 1-10 on clarity, single-objective focus, and trigger specificity. Boundaries:
   - Frontmatter `description` must include trigger phrases AND a "Do NOT use" clause.
   - Body uses `` !`<command>` `` only for read-only shell injection; mutating commands belong inside the body's instructions, not in dynamic context.
6. **Wait for user confirmation** before writing.
7. **Propose 3 first names** for the command. Each must be short kebab-case and reflect the single objective.
8. **Save** the rendered file to the matching location for every installed AI tool per `@../../references/ai-mapping.md`. Skip tools whose commands surface is marked "not supported".

## Test

`command_path` exists; the file's YAML frontmatter parses (between two `---` lines, valid key/value pairs); `description` is non-empty and contains both trigger phrases and a "Do NOT use" clause; the body contains at least one of `$ARGUMENTS`, `$0` ... `$N`, `$ARGUMENTS[N]`, or a `$name` substitution declared in the `arguments` frontmatter list whenever the command takes arguments (vacuous when it does not); `quality_score >= 8`.
