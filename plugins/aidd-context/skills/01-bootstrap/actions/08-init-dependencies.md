# 08 - Init dependencies

Set up the chosen dependency manager, wire each building block, install, and prove the app boots. Reads `INSTALL.md`; names no technology of its own.

## Inputs

- `INSTALL.md` - dependency manager, stack, building blocks (with env flags).

## Process

1. Initialize the dependency manager declared in `INSTALL.md`.
2. Add the stack plus each building block as a **swappable abstraction** - dev stub + real provider, chosen by env flag.
3. Install dependencies.
4. Boot the app.

## Test

- [ ] Dependencies install clean.
- [ ] App boots.
- [ ] Each building block resolves through its abstraction (stub by default).
