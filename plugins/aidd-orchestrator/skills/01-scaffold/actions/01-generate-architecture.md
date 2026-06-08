# 01 -- Generate Architecture

Produce the architecture:

- folder/route tree
- navigable stub skeleton covering every route, back and front. 
- Structure and stubs only - no behavior, no tests.

## Inputs

- `install_md` (required) -- chosen stack, architecture pattern, selected building blocks.

## Outputs

A validated **tree** (the structure), the **file conventions** governing it, plus a reachable stub per route. Expressed at structure level - the host stack determines concrete files and language.

```
<project>/
  <source-root>/...
```

Conventions every generated file follows, derived from the stack's idioms (`INSTALL.md`):

- **Naming** - casing and suffixes for files and folders (how routes, handlers, components are cased and named).
- **Tests** - where test files live and how named (colocated vs dedicated dir, the test suffix).
- **Colocation** - where a route's companions (component, handler, types, helpers) sit relative to the route.

## Depends on

- the router's design phase (provides `INSTALL.md`: stack, pattern, building blocks)

## Process

1. Establish the **route surface** (app's pages and API endpoints) with the USER, derived from purpose and building blocks in `INSTALL.md`. Derive folder tree from the architecture pattern, and **file conventions** (naming, tests, colocation) from the stack's idioms. 
   > Present route surface, tree, and conventions for inspection. Keep tree at structure level - no language, path, or tool assumptions; conventions follow the stack.
2. **Validate the tree and conventions with the USER**.
3. Once approved, create a reachable stub for every page route and every API route (back and front), following agreed conventions uniformly: navigation resolves, handlers empty. No behavior.
4. Add rule using `context-generate` skill for the architecture + naming convention.
5. Be sure everything is up-to-date (`README`, `CONTRIBUTING`, `INSTALL.md`)

## Test

- [ ] File tree is done
- [ ] Naming convention is defined and applied
- [ ] Rules are created (in `01-standards`, `03-frameworks-and-libraries`)
- [ ] Docs is updated (`README`, `CONTRIBUTING`, `INSTALL.md`)