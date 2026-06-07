---
name: 00-repo-init
description: Use when USER wants to initialize a repository or manually ask for skill: `00-repo-init`.
---

# Repo Init

Initializes a project's repository - locally and, on request, on the remote host. Resolves the VCS config (default branch + provider) from the project's VCS memory, runs `git init`, and can create the remote repository and push, returning its URL.

## Available actions

| #   | Action    | Role                                                                | Input                          |
| --- | --------- | ------------------------------------------------------------------- | ------------------------------ |
| 01  | `init`    | Resolve VCS config, `git init`, set the default branch (local only)  | cwd, default_branch, remote_url |
| 02  | `publish` | Create the remote repo on the resolved host and push; return its URL | cwd, non_interactive            |

## Default flow

The intent is to `01-init` then `02-publish`.

## Transversal rules

- **Idempotent locally:** if the target is already a git work tree, `init` does nothing and reports.
- **`init` makes one bootstrap initial commit** (`--allow-empty`) so `HEAD` exists and is pushable; the project's real first commit (staged content) stays the commit skill's job.
- **`publish` is outward-facing:** confirm before creating the remote unless `non_interactive` is set.
- **Provider is open.** Resolve the host and its CLI from the VCS memory (see External data) when present, else from the installed VCS CLI; never restrict to a fixed list. `main` is the default-branch fallback.

## External data

### Project VSC config

Read by the actions when present; pointed to, never copied.

```markdown
@aidd_docs/memory/vcs.md
```
