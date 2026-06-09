# 10 - Init database

Stand up the database: connection, migration tool, a baseline migration, seed fixtures, and a proven round-trip. Conditional - skip when `INSTALL.md` declares no database.

## Inputs

- `INSTALL.md` - database engine and migration tool.

## Process

1. Configure the connection from the environment (see `09-init-env`).
2. Set up the migration tool declared in `INSTALL.md`.
3. Create and run a baseline migration.
4. Add seed **fixtures** (minimal sample data) behind a repeatable, idempotent load command.
5. Prove a round-trip: load the fixtures, then connect and query them back.

## Test

- [ ] Baseline migration runs.
- [ ] Fixtures load idempotently (re-running the loader is safe).
- [ ] Connection round-trips: a query returns the seeded data.
