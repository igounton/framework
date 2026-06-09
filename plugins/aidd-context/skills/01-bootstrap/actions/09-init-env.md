# 09 - Init env

Environment and secrets. Enumerate every variable the project needs and wire config loading. No secret values committed.

## Inputs

- `INSTALL.md` - building blocks and providers that require configuration / secrets.

## Process

1. Derive the required env keys from `INSTALL.md` (each block's provider, the database, the runtime).
2. Write `.env.example` listing every key with a placeholder - never a real value.
3. Wire config loading so the app reads from the environment.

## Test

- [ ] `.env.example` lists every required key.
- [ ] App reads its config from the environment.
- [ ] No secret value committed.
