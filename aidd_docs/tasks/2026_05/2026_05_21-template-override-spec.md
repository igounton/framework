# Template Override

## Target

Allow aidd users to replace any skill's bundled `*-template.md` file with their own version, resolved through a cascade, without editing plugin source.

## Hard constraints

- Overridable surface is limited to `assets/*-template.md` files. Actions, references, `SKILL.md`, and frontmatter are not overridable.
- An override replaces the whole file. No partial override (slots, variables, patch, or merge).
- Resolution is a 3-level cascade, first match wins:
  1. `aidd_docs/overrides/<plugin>/<skill>/<filename>` (project)
  2. `~/.aidd/overrides/<plugin>/<skill>/<filename>` (user-global)
  3. `assets/<filename>` (bundled, fallback)
- Override directories mirror the `<plugin>/<skill>/` structure at both the project and the global level.
- No drift detection. An override applies even when the bundled template changes upstream; no hash, no version, no warning.
- The cascade-resolution instruction is duplicated inside each template-consuming skill. No shared cross-plugin reference, per the no-cross-plugin-links rule.
- User documentation lives in `aidd_docs/overrides/README.md` and is seeded by `aidd-context:02-project-init` when it scaffolds `aidd_docs/`.
- Contributor documentation: a canonical cascade block is documented in the framework contributor guide, and `aidd-context:03-context-generate` injects that block when scaffolding a skill that ships a template.
- Every already-shipped skill that consumes a `*-template.md` is retrofitted with the cascade block in this run, using the same formalism as the rest of that skill's actions.
- An override file is selected whenever it is present at a cascade path, including when the file is empty. Presence determines selection, not content.

## Non-goals

- Overriding actions, references, `SKILL.md`, or frontmatter.
- Partial override mechanisms: named slots, variable injection, patch/delta.
- Drift detection, staleness warnings, or version pinning of overrides.
- A dedicated command/skill to scaffold an override (user copies the bundled template manually).
- A shared cross-plugin resolution rule or an executable resolver script.

## Done-when

- A `*-template.md` placed at `aidd_docs/overrides/<plugin>/<skill>/` is used by that skill instead of the bundled template. Verified by running the skill and checking the output reflects the override content.
- With no project override, a file at `~/.aidd/overrides/<plugin>/<skill>/` is used. Verified the same way.
- With neither override present, the bundled `assets/<filename>` is used. Verified the same way.
- When both project and global overrides exist, the project one wins. Verified by placing both and checking the project content is the one used.
- Two skills that ship a template with the same filename (e.g. `task-template.md` in `03-prd`, `03-assert`, `08-debug`) resolve independently. Verified by overriding one and confirming the others are unaffected.
- `aidd_docs/overrides/README.md` exists after `aidd-context:02-project-init` runs, and covers the cascade order, the mirror layout, and the silent-stale behavior. Verified by file presence and content review.
- Every already-shipped skill that ships a `*-template.md` contains the cascade block. Verified by inspecting each such skill's actions.
- An empty override file placed at a cascade path is still selected over the next cascade level. Verified by placing an empty override and confirming the skill does not fall back.
- A skill scaffolded by `aidd-context:03-context-generate` that ships a template contains the cascade block in its actions. Verified by inspecting the generated action files.
- The framework contributor guide documents the canonical cascade block. Verified by file presence and content review.

## Stakeholders

- Decider: Baptiste (aidd framework maintainer)
- Owner: aidd framework maintainers
- Consumer: aidd plugin users (override templates) and contributors (author override-aware skills)

## Context

Derived from a brainstorm session (2026-05-20 / 2026-05-21). Motivated by the plugin-marketplace architecture: plugins ship skills with bundled `assets/*-template.md` files; editing those templates in place causes conflicts on plugin update. The override mechanism keeps user customization outside plugin source so it survives updates.
