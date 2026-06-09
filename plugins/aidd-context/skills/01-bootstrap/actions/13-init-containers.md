# 13 - Init containers

Make the project's runtime reproducible: a container/compose definition that ups and downs cleanly. Conditional - skip when `INSTALL.md` declares no container/runtime.

## Inputs

- `INSTALL.md` - container / runtime choice and the datastores it needs.

## Process

1. Write the container / compose definition from `INSTALL.md` (app + its datastores).
2. Bring it up.
3. Prove the app responds.
4. Bring it down cleanly.

## Test

- [ ] Up: app responds.
- [ ] Down: clean teardown, no orphaned container/volume.
