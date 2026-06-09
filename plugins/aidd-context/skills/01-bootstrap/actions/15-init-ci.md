# 15 - Init CI

Wire continuous integration: a minimal pipeline that runs the project's quality gate and tests, green on the server. Conditional - skip when the project declares no CI platform.

## Inputs

- The CI platform (from `INSTALL.md` / the project's VCS docs).
- A repository with a remote, the quality gate (`11`), and the tests (`12`).

## Process

1. Resolve the CI platform; never assume one.
2. Emit a minimal pipeline that runs the quality gate and the tests.
3. Commit, push, and confirm the run is green on the server.

## Test

- [ ] CI config committed.
- [ ] Pipeline is green on the server.
