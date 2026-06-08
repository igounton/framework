# 03 -- Wire CI

Emit minimal CI pipeline running tests, for project's chosen CI platform. No platform assumed.

## Outputs

The URL of the working CI.

## Depends on

### Project doc spec

```markdown
@../references/project-doc-spec.md
````

## Process

1. Resolve CI platform from `INSTALL.md`. 
2. Read "Project doc spec".
3. Configure everything correctly.

## Test

- [ ] CI is passing green.