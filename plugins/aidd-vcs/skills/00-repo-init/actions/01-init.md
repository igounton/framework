# 01 -- Init

Initialize a fresh local git repository and set its default branch.

## Inputs

- `cwd` (optional) -- absolute path of the directory to initialize (default is current dir).
- `default_branch` (optional) -- overrides the resolved branch.
- `remote_url` (optional) -- added as `origin` if given.

## Outputs

```json
{ "repo_root": "<cwd>", "default_branch": "main", "platform": "<resolved>", "cli": "<resolved>", "remote": "<url or null>", "created": true }
```

## Rules

If `cwd` is already a git work tree, skip, return `created: false`, and report.

## Process

1. Resolve the default branch and provider from the project's VCS memory (if existing); otherwise detect the provider from the installed VCS CLI on PATH. `main` if nothing resolves. An explicit `default_branch` overrides.
2. `git init -b <default_branch> <cwd>`.
3. Create an initial bootstrap commit so `HEAD` exists: `git -C <cwd> commit --allow-empty -m "chore: initialize repository"`. The project's real first commit (staged content) stays the commit skill's job.
4. If `remote_url` is given, `git -C <cwd> remote add origin <remote_url>`.

## Test

`git -C <cwd> rev-parse --is-inside-work-tree` prints `true`, `git -C <cwd> symbolic-ref --short HEAD` equals the resolved branch, and `git -C <cwd> rev-list --count HEAD` prints `1` (the initial commit).
