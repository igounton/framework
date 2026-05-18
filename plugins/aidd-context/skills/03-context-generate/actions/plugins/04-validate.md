# 04 - Validate

Verify the new plugin loads cleanly and matches the framework's conventions
before declaring success.

## Inputs

- `plugin_name` from action 01.

## Outputs

```yaml
validation_status: pass | fail
findings:
  - path: <file>
    severity: error | warning
    rule: <rule id>
    detail: <one-line>
```

## Depends on

- `02-scaffold-tree`

## Process

1. **Schema check.** Run `claude plugin validate <plugins-root>/<plugin_name>`. Required field per the manifest: `name` only (full field reference: `@../../references/plugin-manifest.md`). Any error-severity finding fails this step.
2. **Name parity.** `plugin.json` `name` matches the directory name and matches the `<plugin>` segment used in every nested skill frontmatter `name:`.
3. **Artifact-set parity.** For each slot enabled in `artifact_set`, at least one artifact file exists (or a `.gitkeep` is present and intentional). For each slot disabled, the corresponding subdir is absent.
4. **Seed-skill structure.** If a seed skill was created, run `@../skills/06-validate.md` against `<plugins-root>/<plugin_name>/skills/01-<seed_skill.name>/`; any `❌` row downgrades `validation_status` to `fail`.
5. **Plugin reload smoke.** When the host runtime supports it, invoke the user-facing plugin reload (e.g. `/reload-plugins`) and confirm the new plugin appears in the load report. Otherwise skip with a warning.

## Test

`validation_status == pass` AND every required field check, name parity check, and artifact-set parity check returned no `error`-level finding. The plugin reloads in the host runtime (or the smoke step is explicitly skipped with a logged warning).
