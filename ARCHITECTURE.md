# AIDD Framework — Architecture cible (skills-first)

> Migration de l'architecture commands-first vers skills-first portable (Claude Code, Cursor, Copilot, Codex, OpenCode).
> **Ce fichier fait foi.** Toute future décision se prend en regardant l'arbre ci-dessous.

---

## Principes directeurs

1. **Skills-first** : la skill est l'atome. Plus de `commands/`, plus de `behaviors/`. Une skill = `<plugin>/skills/<name>/SKILL.md` + `actions/` + `assets/` + `evals/` + `references/` + `scripts/` (optionnel).
2. **4 plugins** : `aidd-context` (connaissance), `aidd-dev` (transformation code), `aidd-vcs` (artefacts git/release), `aidd-pm` (product management).
3. **Frontière dure framework / projet client** :
   - Framework = livré, versionné, immuable côté client.
   - Projet client = `aidd_docs/`, mutable, propre au repo.
   - `AGENTS.md` du projet = router universel (déjà standard ouvert).
4. **Tout au plus proche des skills**. Pas de `core/`. Templates, conventions, principes : chacun vit dans le plugin ou la skill qui l'utilise.
5. **Test du livrable** :
   - Connaissance générale → `aidd-context`
   - Code ou plan d'implémentation → `aidd-dev`
   - Artefact externe (commit, PR, tag, issue) → `aidd-vcs`
   - Spec produit, user story, ticket → `aidd-pm`
6. **Numérotation des actions** : locale à la skill, simple. `01-`, `02-`, `03-`. Cohérent avec `generate-skill/` actuel.
   - Quand une skill fusionne des sujets hétérogènes (ex : `context-generate` fusionne rules + agents + skills), on **sous-catégorise les actions et les assets** en sous-dossiers thématiques.
7. **Migration par étapes** :
   - **v1 = migration 1:1** : chaque commande devient UNE action numérotée dans la skill parente. Pas de fusion logique.
   - **v2 = refactoring petit à petit** : on identifie les patterns communs, on factorise.

## Structure standard d'une skill AIDD

Basée sur `skills/generate-skill/` actuel (la référence) :

```
<skill>/
├── SKILL.md             # orchestrateur
├── actions/             # actions atomiques numérotées (01-, 02-, ...)
├── assets/              # templates propres à la skill
├── evals/               # tests TDD (vide en v1)
├── references/          # docs on-demand (conventions, formats)
└── scripts/             # validateurs (optionnel — surtout pour les skills méta)
```

Les fichiers vides ne sont pas listés dans l'arbre ci-dessous (notamment `evals/scenarios.json` partout sauf pour `[1.3] context-generate` qui hérite du contenu existant).

---

## Décisions en attente

- **D1. ✅ Résolu** — agents dans `aidd-dev/agents/`. Renommage et restructuration finale plus tard.
- **D2. ✅ Résolu** — doublon command/skill challenge : la skill gagne.
- **D3. ✅ Résolu** — `challenge` + `clarity` fusionnés en `[1.5] challenge`.
- **D4. ✅ Résolu** — naming : `aidd-context / aidd-dev / aidd-vcs / aidd-pm`.
- **D5. ✅ Résolu** — `for-sure` dans `aidd-dev`.
- **D6. ✅ Résolu** — `ticket-info` dans `aidd-pm`.
- **D7. `aidd-ops`** : pas créé en v1, à réserver pour plus tard.
- **D8. ✅ Résolu** — `[4.3] prd` reste une skill.
- **D9. ✅ Résolu** — numérotation `01-` locale à la skill.
- **D10. `aidd-pm`** : marqué comme "release candidate" — à valider après v1.
- **D11. ✅ Résolu** — `auto-accept` devient une action de `[2.8] for-sure` (pas de dossier `behaviors/`).
- **D12. ✅ Résolu** — `golden-principles.md` à la racine de `aidd-context`.

---

## Architecture cible

### Côté framework

```
aidd-framework/
│
└── plugins/
    │
    ├── aidd/                              nouveau plugin d'orchestration globale (ex-`core/`) --- IGNORE (pas de core dans v2)
      /sdlc # qui va piloter (auto-implementer) # je pense que c'est dans le aidd-dev, utilise generate_skill --- 100% orechstration, agent dédié ?
    ├── aidd-context/                              🧠 produit de la connaissance
    │   ├── .claude-plugin/
    │   │   └── plugin.json
    │   └── skills/
    │       │
    │       ├── [1.1] project-init/                ← commands/01_onboard/init.md
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   └── 01-init.md                 ← commands/01_onboard/init.md
    │       │   ├── assets/
    │       │   │   ├── golden-principles.md
    │       │   │   ├── AGENTS.md
    │       │   │   ├── memory/                    ← copiés à <projet>/aidd_docs/memory/
    │       │   │   │   ├── architecture.md        ← aidd_docs/templates/aidd/memory/architecture.md
    │       │   │   │   ├── codebase_map.md        ← aidd_docs/templates/aidd/memory/codebase_map.md
    │       │   │   │   ├── coding_assertions.md   ← aidd_docs/templates/aidd/memory/coding_assertions.md
    │       │   │   │   ├── deployment.md          ← aidd_docs/templates/aidd/memory/deployment.md
    │       │   │   │   ├── project_brief.md       ← aidd_docs/templates/aidd/memory/project_brief.md
    │       │   │   │   ├── testing.md             ← aidd_docs/templates/aidd/memory/testing.md
    │       │   │   │   ├── vcs.md                 ← aidd_docs/templates/aidd/memory/vcs.md
    │       │   │   │   └── internal/
    │       │   │   │       ├── api_docs.md
    │       │   │   │       ├── backend_communication.md
    │       │   │   │       ├── browsing.md
    │       │   │   │       ├── database.md
    │       │   │   │       ├── design.md
    │       │   │   │       └── forms.md
    │       │   │   └── rules-skeletons/           (NEW — squelettes vides à remplir)
    │       │   │       ├── architecture.md
    │       │   │       ├── standards.md
    │       │   │       ├── languages.md
    │       │   │       ├── frameworks.md
    │       │   │       ├── tooling.md
    │       │   │       ├── testing.md
    │       │   │       ├── design-patterns.md
    │       │   │       ├── quality.md
    │       │   │       └── domain.md              ← aidd_docs/templates/domain/.gitkeep
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [1.2] architecture-generate/       ← commands/01_onboard/generate_architecture.md
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   └── 01-generate-architecture.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [1.3] context-generate/            ← FUSION : generate_rules + generate_agent
    │       │   ├── SKILL.md                          + generate_skill + skills/generate-skill/
    │       │   ├── actions/                          (sous-catégorisation thématique — fusion lourde)
    │       │   │   ├── rules/
    │       │   │   │   └── 01-generate-rules.md   ← commands/01_onboard/generate_rules.md
    │       │   │   ├── agents/
    │       │   │   │   └── 01-generate-agent.md   ← commands/01_onboard/generate_agent.md
    │       │   │   └── skills/
    │       │   │       ├── 01-capture-intent.md   ← skills/generate-skill/actions/01-capture-intent.md
    │       │   │       ├── 02-design-evals.md     ← skills/generate-skill/actions/02-design-evals.md
    │       │   │       ├── 03-decompose.md        ← skills/generate-skill/actions/03-decompose-actions.md
    │       │   │       ├── 04-draft.md            ← skills/generate-skill/actions/04-draft-skill.md
    │       │   │       ├── 05-write.md            ← skills/generate-skill/actions/05-write-actions.md
    │       │   │       └── 06-validate.md         ← skills/generate-skill/actions/06-validate.md
    │       │   ├── assets/                           (sous-catégorisation thématique)
    │       │   │   ├── rules/
    │       │   │   │   └── rule-template.md       ← aidd_docs/templates/aidd/rule.md
    │       │   │   ├── agents/
    │       │   │   │   └── agent-template.md      ← aidd_docs/templates/aidd/agent.md
    │       │   │   └── skills/
    │       │   │       ├── skill-template.md      ← skills/generate-skill/assets/skill-template.md
    │       │   │       ├── action-template.md     ← skills/generate-skill/assets/action-template.md
    │       │   │       └── evals-template.md      ← skills/generate-skill/assets/evals-template.md
    │       │   ├── evals/
    │       │   │   └── scenarios.json             ← skills/generate-skill/evals/scenarios.json
    │       │   ├── references/
    │       │   │   ├── naming-conventions.md      ← skills/generate-skill/references/naming-conventions.md
    │       │   │   ├── skill-vs-command.md        ← skills/generate-skill/references/skill-vs-command.md
    │       │   │   ├── skill-structure.md         ← rules/01-standards/1-command-structure.md
    │       │   │   ├── rule-structure.md          ← rules/01-standards/1-rule-structure.md
    │       │   │   ├── rule-writing.md            ← rules/01-standards/1-rule-writing.md
    │       │   │   └── agents-coordination.md     ← aidd_docs/templates/aidd/agents_coordination.md
    │       │   └── scripts/
    │       │       ├── validate-actions.js        ← skills/generate-skill/scripts/validate-actions.js
    │       │       ├── validate-all.js            ← skills/generate-skill/scripts/validate-all.js
    │       │       ├── validate-evals.js          ← skills/generate-skill/scripts/validate-evals.js
    │       │       └── validate-skill-md.js       ← skills/generate-skill/scripts/validate-skill-md.js
    │       │
    │       ├── [1.4] brainstorm/                  ← commands/02_context/brainstorm.md
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   └── 01-brainstorm.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [1.5] challenge/                   ← FUSION : skills/challenge/ + skills/clarity/
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   ├── 01-challenge.md            ← skills/challenge/SKILL.md
    │       │   │   └── 02-clarity.md              ← skills/clarity/SKILL.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [1.6] mermaid/                     ← commands/07_documentation/mermaid.md
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   └── 01-mermaid.md
    │       │   ├── evals/
    │       │   └── references/
    │       │       └── mermaid-conventions.md     ← rules/01-standards/1-mermaid.md
    │       │
    │       └── [1.7] learn/                       ← commands/07_documentation/learn.md
    │           ├── SKILL.md
    │           ├── actions/
    │           │   └── 01-learn.md
    │           ├── assets/
    │           │   └── install-template.md        ← aidd_docs/templates/docs/INSTALL.md
    │           ├── evals/
    │           └── references/
    │
    ├── aidd-dev/                                  🛠️ transforme l'idée en code
    │   ├── .claude-plugin/
    │   │   └── plugin.json
    │   ├── agents/                                ← framework/agents/* (renommage à venir)
    │   │   ├── alexia.md
    │   │   ├── claire.md
    │   │   ├── iris.md
    │   │   ├── kent.md
    │   │   └── martin.md
    │   └── skills/
    │       │
    │       ├── [2.1] plan/                        ← commands/03_plan/plan.md
    │       │   ├── SKILL.md                          (image_extract_details + components_behavior SUPPRIMÉS)
    │       │   ├── actions/
    │       │   │   └── 01-plan.md                 ← commands/03_plan/plan.md
    │       │   ├── assets/
    │       │   │   ├── plan-template.md           ← aidd_docs/templates/aidd/plan.md
    │       │   │   ├── master-plan-template.md    ← aidd_docs/templates/aidd/master_plan.md
    │       │   │   ├── spec-template.md           ← aidd_docs/templates/aidd/spec.md
    │       │   │   ├── adr-template.md            ← aidd_docs/templates/dev/adr.md
    │       │   │   ├── decision-template.md       ← aidd_docs/templates/dev/decision.md
    │       │   │   └── tech-choice-template.md    ← aidd_docs/templates/dev/tech_choice.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [2.2] implement/                   ← FUSION : implement + implement_from_design
    │       │   ├── SKILL.md                          + aidd-auto-implement + run_projection
    │       │   ├── actions/
    │       │   │   ├── 01-implement.md            ← commands/04_code/implement.md
    │       │   │   ├── 02-implement-from-design.md ← commands/04_code/implement_from_design.md
    │       │   │   ├── 03-auto-implement.md       ← skills/aidd-auto-implement/SKILL.md
    │       │   │   └── 04-projection.md           ← commands/04_code/run_projection.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [2.3] assert/                      ← FUSION : assert + assert_architecture
    │       │   ├── SKILL.md                          + assert_frontend
    │       │   ├── actions/
    │       │   │   ├── 01-assert.md               ← commands/04_code/assert.md
    │       │   │   ├── 02-assert-architecture.md  ← commands/04_code/assert_architecture.md
    │       │   │   └── 03-assert-frontend.md      ← commands/04_code/assert_frontend.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [2.4] review/                      ← FUSION : review_code + review_functional
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   ├── 01-review-code.md          ← commands/05_review/review_code.md
    │       │   │   └── 02-review-functional.md    ← commands/05_review/review_functional.md
    │       │   ├── assets/
    │       │   │   ├── code-review-template.md    ← aidd_docs/templates/dev/code_review.md
    │       │   │   └── review-template.md         ← aidd_docs/templates/dev/review_code.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [2.5] test/                        ← FUSION : test + test_journey
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   ├── 01-test.md                 ← commands/06_tests/test.md
    │       │   │   └── 02-test-journey.md         ← commands/06_tests/test_journey.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [2.6] refactor/                    ← FUSION : audit + performance + security
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   ├── 01-audit.md                ← commands/09_refactor/audit.md
    │       │   │   ├── 02-performance.md          ← commands/09_refactor/performance.md
    │       │   │   └── 03-security.md             ← commands/09_refactor/security_refactor.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [2.7] debug/                       ← FUSION : debug + reproduce ⭐
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   ├── 01-reproduce.md            ← commands/10_maintenance/reproduce.md
    │       │   │   └── 02-debug.md                ← commands/10_maintenance/debug.md
    │           │   └── 03-reflect-issue.md       ← commands/10_maintenance/reflect_issue.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [2.8] for-sure/                    ← FUSION : skills/for-sure/ + auto_accept
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   ├── 01-init-tracking.md        ← skills/for-sure/sub-actions/01-init-tracking.md
    │       │   │   ├── 02-auto-accept.md          ← commands/00_behavior/auto_accept.md
    │       │   │   └── 03-autonomous-loop.md      ← skills/for-sure/sub-actions/02-autonomous-loop.md
    │       │   ├── assets/
    │       │   │   └── tracking-template.md       ← skills/for-sure/references/tracking-template.md
    │       │   ├── evals/
    │       │   └── references/
    │
    ├── aidd-vcs/                                  🚢 produit les artefacts externes
    │   ├── .claude-plugin/
    │   │   └── plugin.json
    │   └── skills/
    │       │
    │       ├── [3.1] commit/                      ← commands/08_deploy/commit.md
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   └── 01-commit.md
    │       │   ├── assets/
    │       │   │   └── commit-template.md         ← aidd_docs/templates/vcs/commit.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [3.2] pull-request/                ← commands/08_deploy/create_request.md
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   └── 01-create-pull-request.md
    │       │   ├── assets/
    │       │   │   ├── pr-template.md             ← aidd_docs/templates/vcs/pull_request.md
    │       │   │   ├── branch-template.md         ← aidd_docs/templates/vcs/branch.md
    │       │   │   ├── contributing-template.md   ← aidd_docs/templates/vcs/CONTRIBUTING.md
    │       │   │   └── readme-template.md         ← aidd_docs/templates/vcs/README.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       ├── [3.3] release-tag/                 ← commands/08_deploy/tag.md
    │       │   ├── SKILL.md
    │       │   ├── actions/
    │       │   │   └── 01-tag.md
    │       │   ├── assets/
    │       │   │   └── release-template.md        ← aidd_docs/templates/vcs/release.md
    │       │   ├── evals/
    │       │   └── references/
    │       │
    │       └── [3.4] issue-create/                ← commands/10_maintenance/new_issue.md
    │           ├── SKILL.md
    │           ├── actions/
    │           │   └── 01-new-issue.md
    │           ├── assets/
    │           │   └── issue-template.md          ← aidd_docs/templates/vcs/issue.md
    │           ├── evals/
    │           └── references/
    │
    └── aidd-pm/                                   📋 product management (release candidate)
        ├── .claude-plugin/
        │   └── plugin.json
        └── skills/
            │
            ├── [4.1] ticket-info/                 ← commands/02_context/ticket_info.md
            │   ├── SKILL.md
            │   ├── actions/
            │   │   └── 01-ticket-info.md
            │   ├── evals/
            │   └── references/
            │
            ├── [4.2] user-stories-create/         ← commands/02_context/create_user_stories.md
            │   ├── SKILL.md
            │   ├── actions/
            │   │   └── 01-create-user-stories.md
            │   ├── assets/
            │   │   └── user-story-template.md     ← aidd_docs/templates/pm/user_story.md
            │   ├── evals/
            │   └── references/
            │
            └── [4.3] prd/                         (specs PRD + templates de gestion projet)
                ├── SKILL.md
                ├── actions/
                │   └── 01-prd.md
                ├── assets/
                │   ├── prd-template.md            ← aidd_docs/templates/pm/prd.md
                │   ├── status-template.md         ← aidd_docs/templates/aidd/status.md
                │   └── task-template.md           ← aidd_docs/templates/aidd/task.md
                ├── evals/
                └── references/
```

### Côté projet client (après `project-init`)

```
<projet-client>/
│
├── AGENTS.md                                       (router universel — déjà standard ouvert)
│
└── aidd_docs/                                       (copié depuis aidd-context/skills/[1.1] project-init/assets/)
    │
    ├── memory/
    │   ├── architecture.md
    │   ├── codebase_map.md
    │   ├── coding_assertions.md
    │   ├── deployment.md
    │   ├── project_brief.md
    │   ├── testing.md
    │   ├── vcs.md
    │   └── internal/
    │       ├── api_docs.md
    │       ├── backend_communication.md
    │       ├── browsing.md
    │       ├── database.md
    │       ├── design.md
    │       └── forms.md
    │
    ├── rules/                                       (squelettes à remplir par 1.3 context-generate)
    │   ├── architecture.md
    │   ├── standards.md
    │   ├── languages.md
    │   ├── frameworks.md
    │   ├── tooling.md
    │   ├── testing.md
    │   ├── design-patterns.md
    │   ├── quality.md
    │   └── domain.md
    │
    └── tasks/                                       (vide au départ)
```

---

## Récap skills numérotées

**aidd-context** (7 skills) :
1.1 project-init · 1.2 architecture-generate · 1.3 context-generate · 1.4 brainstorm · 1.5 challenge (+ clarity) · 1.6 mermaid · 1.7 learn

**aidd-dev** (9 skills) :
2.1 plan · 2.2 implement · 2.3 assert · 2.4 review · 2.5 test · 2.6 refactor · 2.7 debug · 2.8 for-sure (+ auto-accept) · 2.9 issue-reflect

**aidd-vcs** (4 skills) :
3.1 commit · 3.2 pull-request · 3.3 release-tag · 3.4 issue-create

**aidd-pm** (3 skills) :
4.1 ticket-info · 4.2 user-stories-create · 4.3 prd

**Total : 23 skills** dans 4 plugins.

---

## Plan de migration v1 → v2

### v1 (cette migration)

- [ ] Créer la structure `aidd-framework/plugins/` avec les 4 plugins vides
- [ ] Pour chaque skill numérotée [X.Y], créer le squelette : `SKILL.md` + `actions/` + dossiers vides `evals/`, `references/`, `assets/` (selon besoin)
- [ ] Migrer **chaque commande** comme **1 action** dans la skill cible (1:1, contenu copié)
- [ ] Copier les templates métier au plus proche : `aidd_docs/templates/{aidd,dev,vcs,pm,docs}/` → `<skill>/assets/`
- [ ] Copier les templates de mémoire dans `aidd-context/skills/[1.1] project-init/assets/memory/`
- [ ] Copier les conventions au plus proche : skill-structure, rule-structure, rule-writing, agents-coordination → `aidd-context/skills/[1.3] context-generate/references/`
- [ ] Copier `golden-principles.md` à la racine de `aidd-context`
- [ ] Copier les agents existants dans `aidd-dev/agents/` (renommage v2)
- [ ] Migrer `auto_accept.md` comme action `02-auto-accept.md` dans `[2.8] for-sure`
- [ ] Étendre `scripts/sync-dist.js` pour générer `dist/{claude,cursor,copilot}/` depuis la nouvelle structure plugins
- [ ] Trancher D7 (aidd-ops) et D10 (aidd-pm RC)

### v2 (refactoring petit à petit, après v1 stable)

- [ ] Identifier les patterns communs entre actions d'une même skill → factoriser
- [ ] Introduire des routeurs si besoin pour les skills multi-actions
- [ ] Écrire les `evals/scenarios.json` réels pour chaque skill
- [ ] Renommer/restructurer les agents (`alexia`, `claire`, `iris`, `kent`, `martin`)
- [ ] Réserver/créer le plugin `aidd-ops` selon usage
