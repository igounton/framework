# 02 -- Publish

Create the project's remote repository on the resolved host and push to it. Outward-facing.

## Inputs

- `cwd` (optional) -- the initialized local repository (default is current dir).
- `non_interactive` (optional, default: `false`) -- skip the confirmation prompt (scaffolder / auto runs).

## Outputs

```json
{ "remote_url": "<host>/<owner>/<name>", "platform": "<resolved>", "default_branch": "main", "pushed": true }
```

## Depends on

- `01-init`

## Process

1. Resolve the host and its CLI/MCP from the VCS memory or the installed CLI - whatever the project declares, no fixed provider list.
2. Confirm before creating the remote (it may be public), unless `non_interactive`. Create as private by default.
3. Create the remote repository via the resolved host CLI and push (its repo-create + push). `01-init` already left a pushable `HEAD`. If no host CLI is available, stop and report.
4. Return the remote URL.

## Test

- [ ] Remote URL printed to the user.
