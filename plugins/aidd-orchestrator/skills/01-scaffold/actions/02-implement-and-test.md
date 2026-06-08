# 02 -- Implement And Test

Bring the skeleton to life and prove it: wire each selected building block as a swappable abstraction with its smoke test, install the harness, write per-surface tests, then run the full assertive checklist green. Hard gate - the checklist is the guarantee.

## Outputs

Intent level (host stack determines language and files):

- Each **selected building block** (per `INSTALL.md`) wired as swappable abstraction - dev stub + real provider, env-flag chosen - with a smoke test (e.g. data round-trips, test email dispatches, scheduled job fires once).
- Stack's **dependencies installed**, **test runner configured**.
- A **small test set written alongside code and passing**: each block's smoke test, plus one per surface proving API routes respond and front routes navigate.
- **Assertive checklist all green** (`@../references/project-doc-spec.md`).

## Depends on

- `01-generate-architecture`

### Project doc spec

```markdown
@../references/project-doc-spec.md
````

## Process

1. For each items in "Project doc spec", make sure everything is well prepared showing a table to `USER`.
2. **Validate with the USER if necessary**.
3. Spawn an agent / group on to setup it correctly.
4. For each surface, write the minimal test proving this work.
5. Show report to `USER`.

## Test

- [ ] All checkboxes checked.
- [ ] All tests pass.
- [ ] No untested element.