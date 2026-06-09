# 07 - Init structure

Materialize the validated folder/route tree from `INSTALL.md` as real directories and reachable stubs. Structure only - no behavior.

## Inputs

- `INSTALL.md` - folder tree, architecture pattern, file conventions.

## Process

1. Create the directory tree exactly as `INSTALL.md` describes it.
2. For every route (front + back), create one reachable stub following the stack's conventions: navigation resolves, handlers respond empty. No business logic.
3. Apply naming / colocation conventions uniformly.

## Test

- [ ] Tree matches `INSTALL.md`; architecture conforms to the chosen pattern.
- [ ] Every route is reachable (front navigates, API responds).
- [ ] *(frontend)* Default pages exist: 404, 403.
- [ ] No business logic present (architecture-100% / business-0%).
