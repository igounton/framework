:robot: I have created a release *beep* *boop*
---


<details><summary>4.0.0</summary>

## [4.0.0](https://github.com/ai-driven-dev/aidd-framework/compare/v3.9.1...v4.0.0) (2026-05-19)


### Features

* **aidd-context:** add 00-onboard skill (state-aware guided loop) ([4f3d0fa](https://github.com/ai-driven-dev/aidd-framework/commit/4f3d0fa19f1104cdfd2f9f8442965182f403f181))
* **aidd-context:** add 01-bootstrap skill for SaaS architecture imagination ([4643594](https://github.com/ai-driven-dev/aidd-framework/commit/4643594163686a92bc02211770a7906e3d07c99f))
* **aidd-context:** extend 06-discovery with rule, hook, and memory finders ([3ad5661](https://github.com/ai-driven-dev/aidd-framework/commit/3ad56614eabdb2313b3e4951c7daa724b7a816cb))
* **aidd-context:** extend context-generate with plugins, commands, hooks, marketplaces; add async-dev router ([d409bab](https://github.com/ai-driven-dev/aidd-framework/commit/d409babb029aca89355c4d7bc9d21d007ff012a2))
* **aidd-context:** implement interactive brainstorming skill with structured actions for clarifying feature requests ([edba00c](https://github.com/ai-driven-dev/aidd-framework/commit/edba00c65f4323bfbf046ad24805841a263dd424))
* **aidd-context:** migrate commands to numbered actions ([324357a](https://github.com/ai-driven-dev/aidd-framework/commit/324357a8acef153b929fe6d1c85dff262bb041f8))
* **aidd-dev:** add 02-implement skill, renumber downstream skills ([16fa5d6](https://github.com/ai-driven-dev/aidd-framework/commit/16fa5d61cac55f5e8223cb55ce9e213dfcb7fdb6))
* **aidd-dev:** add interactive mode to 00-sdlc orchestrator ([8f9e245](https://github.com/ai-driven-dev/aidd-framework/commit/8f9e245cf390f16906516e9a1ea4a5d77fdef2f7))
* **aidd-dev:** centralize agents ([7f77514](https://github.com/ai-driven-dev/aidd-framework/commit/7f7751407972c63accbf352b1a44f5ba89269757))
* **aidd-dev:** enhance pre-flight checklist with user input markers for unresolved dependencies ([a8f41c6](https://github.com/ai-driven-dev/aidd-framework/commit/a8f41c645c3eb3a7aaad171a2d16062a85be1a5c))
* **aidd-dev:** migrate commands to numbered actions ([8ef0f8e](https://github.com/ai-driven-dev/aidd-framework/commit/8ef0f8ed4349f77702d5f07704085382ce831e2a))
* **aidd-dev:** scan rules and project files modifications in plan template ([0509421](https://github.com/ai-driven-dev/aidd-framework/commit/05094211fc6f79cd033c08a3409d3b494e3fd8ce))
* **aidd-orchestrator:** action 08 prints inline how-to-generate guides per secret ([ac64f33](https://github.com/ai-driven-dev/aidd-framework/commit/ac64f3386ee1932fff6c2cec3620d7eccddeb1c4))
* **aidd-orchestrator:** add async orchestration plugin ([58b7318](https://github.com/ai-driven-dev/aidd-framework/commit/58b7318c2d349248dc489614df3fa45c2748ce21))
* **aidd-orchestrator:** add local-mode poll script + drop default agent ([5253065](https://github.com/ai-driven-dev/aidd-framework/commit/52530651f9d199ce40d51a8295be3712cc6a20fa))
* **aidd-orchestrator:** branch enforcement, comment passthrough, skip routing ([4d3acc8](https://github.com/ai-driven-dev/aidd-framework/commit/4d3acc85713aa9f7a45c80db9ae2e571d76c69bb))
* **aidd-orchestrator:** branch enforcement, comment passthrough, skip routing ([3a5cec0](https://github.com/ai-driven-dev/aidd-framework/commit/3a5cec08dbed819472de85c933ab021ee0854855))
* **aidd-orchestrator:** clean v1.0.0  to-X / claude/Y label split, drop superflu ([26851ec](https://github.com/ai-driven-dev/aidd-framework/commit/26851ec9384871ec0049d6c7dfc5efe011ff4a2a))
* **aidd-orchestrator:** drop OS cron, route local scheduling via Claude Code ([1b6ec12](https://github.com/ai-driven-dev/aidd-framework/commit/1b6ec12f711a1a3b06bed9f5c180003c153ef21b))
* **aidd-orchestrator:** local daemon path bypasses Claude Code Tasks quota ([2d573f3](https://github.com/ai-driven-dev/aidd-framework/commit/2d573f31b394b0431c52b52e6883c37f17cf2282))
* **aidd-orchestrator:** per-developer Anthropic account routing in remote mode ([837857d](https://github.com/ai-driven-dev/aidd-framework/commit/837857dd84bebcbd9f46e48ea45715bfa96caa00))
* **aidd-orchestrator:** setup skill goes end-to-end (5 new actions) ([9d4628c](https://github.com/ai-driven-dev/aidd-framework/commit/9d4628cd29795ae74a9989b749184319ea03e6ad))
* **aidd-orchestrator:** smoke test uses a throwaway issue, never the user's backlog ([84596ac](https://github.com/ai-driven-dev/aidd-framework/commit/84596ac2584e0c8f6393462332dbbb4c70e609ae))
* **aidd-pm:** scaffold RC skills with actions ([22fc883](https://github.com/ai-driven-dev/aidd-framework/commit/22fc88365631718e76e893e41e8789c1bb5da599))
* **aidd-refine:** add shadow-areas gap analyzer skill + evals CI ([0a731ad](https://github.com/ai-driven-dev/aidd-framework/commit/0a731adce448786520701a64d69ed0af24994087))
* **aidd-vcs:** add plugin with 4 VCS skills (commit, pull-request, release-tag, issue-create) ([84234de](https://github.com/ai-driven-dev/aidd-framework/commit/84234de00feace9933555914c991130238b83c2d))
* **aidd-vcs:** support /commit push inline argument ([ee4dda6](https://github.com/ai-driven-dev/aidd-framework/commit/ee4dda615150ae0d700a8ea872969ea93f3af1c0))
* async-dev router + context-generate determinism tightening ([#128](https://github.com/ai-driven-dev/aidd-framework/issues/128)) ([213a82e](https://github.com/ai-driven-dev/aidd-framework/commit/213a82efbfc85aa4bed5de33b1079fba29ec4fac))
* enhance auto-implement skill with detailed orchestration rules and process steps ([c7b991b](https://github.com/ai-driven-dev/aidd-framework/commit/c7b991b3f5cc7b0f7d41206f18a4a94121878903))
* **framework:** delete legacy commands/ directory ([dac60bb](https://github.com/ai-driven-dev/aidd-framework/commit/dac60bbb7c953abadf19f0cb239987c81c006376))
* **framework:** migrate 5 pre-refactored skills into plugins ([da2987c](https://github.com/ai-driven-dev/aidd-framework/commit/da2987c7c281d3b087e6c09f5079decf7e066bd2))
* **framework:** refactor to marketplace plugin architecture and skills ([27128a9](https://github.com/ai-driven-dev/aidd-framework/commit/27128a96314904b7b57b0bc419e4d29b7a7edaf0))
* **framework:** relocate templates and conventions into skill assets ([6920182](https://github.com/ai-driven-dev/aidd-framework/commit/692018202f84cd6f5d885f5737f305f77f79ac5f))
* **framework:** scaffold 4-plugin marketplace catalog ([7be5466](https://github.com/ai-driven-dev/aidd-framework/commit/7be5466ae78f432a5477a6f35d23cbff56b7f2df))
* **framework:** split MCP and SessionStart hook into plugins ([527f9b8](https://github.com/ai-driven-dev/aidd-framework/commit/527f9b8c13ea1c7e45b277218569e6881559cadc))
* **framework:** update build script for plugin layout and regenerate catalogs ([ea18188](https://github.com/ai-driven-dev/aidd-framework/commit/ea1818850a6c9d8b39de2aa5bae2b6ecf6741ddd))
* new generate_skills ([d288e9f](https://github.com/ai-driven-dev/aidd-framework/commit/d288e9ff2240deb26ea6b7faa9e6fa0e36b814a6))
* new status and spec templates from openai long running task ([4ed3947](https://github.com/ai-driven-dev/aidd-framework/commit/4ed3947aef46b00d47c6d1bde47cc526f7ad5bcd))
* **orchestrator:** add github_write_auth dimension to setup skill and workflow ([897754b](https://github.com/ai-driven-dev/aidd-framework/commit/897754b20717383b612ea0480e83c3f2d6736639))
* **plugin:** publish aidd framework as Claude Code plugin ([c913480](https://github.com/ai-driven-dev/aidd-framework/commit/c91348083d5734f4163ca55dbcf46265b8ceb76d))
* update agent descriptions for clarity and role specificity in CATALOG and agent files ([eabaf0f](https://github.com/ai-driven-dev/aidd-framework/commit/eabaf0f27e7764fb6f16f8d30f1ebf98cdc62dfa))
* update ARCHITECTURE.md with new project structure and decisions for skills organization ([e8f6442](https://github.com/ai-driven-dev/aidd-framework/commit/e8f6442b40dd4e7e221e53b82025bc02def650ac))
* update CATALOG.md with new actions, assets, and references for generate-skill ([07d3d3e](https://github.com/ai-driven-dev/aidd-framework/commit/07d3d3ec75b207c6e7fc474a049250fe528bf63b))


### Bug Fixes

* **aidd-context:** correct hooks.json format for Claude Code and Copilot ([f66ca72](https://github.com/ai-driven-dev/aidd-framework/commit/f66ca7247ea7b135b6792781ff978055b747392b))
* **aidd-context:** rename skill frontmatter name from generate-skill to context-generate ([805cf6f](https://github.com/ai-driven-dev/aidd-framework/commit/805cf6f8b8897ce2283679d991041345d2192f12))
* **aidd-context:** repair @-paths, generalize mermaid reference, delegate frontmatter to references ([1ff4a04](https://github.com/ai-driven-dev/aidd-framework/commit/1ff4a04c0f1fedbfbcc7db6a362c08f787e34815))
* **aidd-context:** replace placeholder with generic path pattern in copilot rule example ([e22b358](https://github.com/ai-driven-dev/aidd-framework/commit/e22b358c39a30ad6a0b38246b469bee41f2573cf))
* **aidd-dev:** enforce skill-in-agent rule  orchestrator never loads skills directly ([8957d1d](https://github.com/ai-driven-dev/aidd-framework/commit/8957d1dc4e2844128eb8ea8ceb68c27cbe41af28))
* **aidd-orchestrator:** action 07 detects project/user scope before prompting ([d84b514](https://github.com/ai-driven-dev/aidd-framework/commit/d84b514e757b405210315e5927361bf201fd40ee))
* **aidd-orchestrator:** action 07 skips when plugins already loaded (project or user scope) ([e9739bb](https://github.com/ai-driven-dev/aidd-framework/commit/e9739bbdeafc358ad57994ac989ca1160bcb1130))
* **aidd-orchestrator:** cosmetic  run_id fallback + dedup review summary ([2734e05](https://github.com/ai-driven-dev/aidd-framework/commit/2734e05ce37bf2f0546c9a542a64f18d5e0e8768))
* **aidd-orchestrator:** delegate-sdlc owns push + PR creation; SDLC writes code only ([fcfdac4](https://github.com/ai-driven-dev/aidd-framework/commit/fcfdac4f4d72729b28b86cb28849cb61a8a6343f))
* **aidd-orchestrator:** forbid leaking action 06 internals into SDLC prompt ([5243f31](https://github.com/ai-driven-dev/aidd-framework/commit/5243f31640c64e79102332167a0a4e3d37b2b826))
* **aidd-orchestrator:** forbid leaking action 06 internals into SDLC prompt ([f933193](https://github.com/ai-driven-dev/aidd-framework/commit/f933193b63e54c40eaac18aac0ed8ae4708f9718))
* **aidd-orchestrator:** iter-1 review never stops on human comment; delegate enforces no-push-to-main ([35753a4](https://github.com/ai-driven-dev/aidd-framework/commit/35753a441da96113805ddd3976476a100c52dd13))
* **aidd-orchestrator:** make audit + finalize self-verifying ([8972d86](https://github.com/ai-driven-dev/aidd-framework/commit/8972d8676c6087ad1ff766c3a83bc9f36862b165))
* **aidd-orchestrator:** outcome decided by observation, not by the agent ([4273e0e](https://github.com/ai-driven-dev/aidd-framework/commit/4273e0e704f26e1228d0dfdf00a857c3164e4c3c))
* **aidd-orchestrator:** scheduling defaults to Desktop (1min min); cloud routine min 1h ([6005096](https://github.com/ai-driven-dev/aidd-framework/commit/6005096ff007d568a2f68862811cc4259f156291))
* **aidd-orchestrator:** sdlc owns push + PR; orchestrator dictates the contract and verifies ([840c248](https://github.com/ai-driven-dev/aidd-framework/commit/840c2489eaf63cb822f9f3ab5db06fabcaaebf13))
* **aidd-orchestrator:** self-verifying audit + finalize ([8f45f13](https://github.com/ai-driven-dev/aidd-framework/commit/8f45f13abbe08dccc63666794efa25d22697f334))
* **aidd-orchestrator:** skip audit push when no PR; drop orphan .json on main ([9e9dca4](https://github.com/ai-driven-dev/aidd-framework/commit/9e9dca4e5d3645ddf592fc97b1129c034feb8870))
* **aidd-orchestrator:** unbreak workflow YAML (alias parsing on marker bodies) ([243f234](https://github.com/ai-driven-dev/aidd-framework/commit/243f234f02322658b17d96330d5dd6f06d927892))
* **aidd-orchestrator:** YAML post-step observes reality when agent forgets ([e24d6a6](https://github.com/ai-driven-dev/aidd-framework/commit/e24d6a66ca4c17083daa5a4dec69f3160bfb10d4))
* **aidd-orchestrator:** YAML post-step observes reality when agent forgets ([c3a3405](https://github.com/ai-driven-dev/aidd-framework/commit/c3a3405fc9b894aa015096e81d4623d0a16ec5c1))
* **ci:** unblock failing workflows (evals validator + codeql gate + commit SHAs) ([8f76a43](https://github.com/ai-driven-dev/aidd-framework/commit/8f76a43956a2fae66cc968e7203fc176aa0f4722))
* **framework:** accept short plugin scopes and marketplace in commitlint enum ([cd477f6](https://github.com/ai-driven-dev/aidd-framework/commit/cd477f6e43d6f80957ee31ac58400d9620bb24c8))
* **framework:** add version field to catalog entries ([c64a2cb](https://github.com/ai-driven-dev/aidd-framework/commit/c64a2cba8dbd7fcf58269a7bf3e8e7571062e895))
* **framework:** add version field to each plugin catalog entry ([26888af](https://github.com/ai-driven-dev/aidd-framework/commit/26888af05038d656f6c1c311e736d452224b3462))
* **framework:** correct slash command naming in docs ([adad60a](https://github.com/ai-driven-dev/aidd-framework/commit/adad60aacaa120f3abf55100625bed7a3a87a50a))
* **framework:** namespace frontmatter for relocated skills ([ea220a1](https://github.com/ai-driven-dev/aidd-framework/commit/ea220a19667da43cbe88c0dca87913b1d1c381cb))
* **framework:** repair broken @-paths, stale skill ref, and Ressources typo across plugins ([558bb34](https://github.com/ai-driven-dev/aidd-framework/commit/558bb347a6358240556e6c27d0ec09ff4b443bc0))
* **framework:** repair internal broken markdown links ([8ae9dc1](https://github.com/ai-driven-dev/aidd-framework/commit/8ae9dc1ae729ab65c512661a9e0ec6fb8dc618ed))
* **framework:** replace relative plugin links with absolute GitHub URLs in aidd_docs/README.md ([d171001](https://github.com/ai-driven-dev/aidd-framework/commit/d171001bfae5177ae5c67aff681787261a1df8b9))
* **framework:** wire SDLC contracts  namespace, plan paths, commit modes, validator semantics ([f5f14e0](https://github.com/ai-driven-dev/aidd-framework/commit/f5f14e01c6bb4a8c7952b6241b89a50816f636a6))
* **orchestrator:** enforce SDLC delegation + persist audit log on PR branch ([8f5ed79](https://github.com/ai-driven-dev/aidd-framework/commit/8f5ed799b9b00126331d0673e27b3460984e4cae))
* **plugin:** scope aidd plugin to skills only + fix YAML frontmatter ([3779e6e](https://github.com/ai-driven-dev/aidd-framework/commit/3779e6e63333cb093eda54d106079c2d318f37df))
* update flowchart direction in README for improved clarity ([563bf6c](https://github.com/ai-driven-dev/aidd-framework/commit/563bf6c884fdf29294e884848708efce4d1ad4dd))


### Miscellaneous

* **aidd-context:** refresh stale async-dev refs in project-init template and routing evals ([13a424c](https://github.com/ai-driven-dev/aidd-framework/commit/13a424cbad77b1afde7f8867e867ad1e2068f443))
* **aidd-refine:** clean up shadow-areas evals and catalog ([f577db6](https://github.com/ai-driven-dev/aidd-framework/commit/f577db65837b9e59617526f4dd055d3f7147bef7))
* **ci:** SHA-pin every external action and add CodeQL workflow ([66d5fcf](https://github.com/ai-driven-dev/aidd-framework/commit/66d5fcf99776df2885a84b2ef70943ff63099748))
* **commitlint:** scope-enum back as warning with broader list ([da0b9ec](https://github.com/ai-driven-dev/aidd-framework/commit/da0b9ec34a2923c68a6bff889d7ec36ca0aec70e))
* **deps:** bundle all open Dependabot upgrades ([eb40257](https://github.com/ai-driven-dev/aidd-framework/commit/eb402572bee04b0f2d39392b43cf6083ee057315))
* **deps:** bundle all open Dependabot upgrades ([3bc18de](https://github.com/ai-driven-dev/aidd-framework/commit/3bc18de02a925b0851819911da8d12242c9884d5))
* **framework:** add aidd-refine and aidd-orchestrator to commitlint scope-enum ([6416e1a](https://github.com/ai-driven-dev/aidd-framework/commit/6416e1a4d38c0a64574d00992241a166bc82c9cb))
* **framework:** add OSS standard files (LICENSE, SECURITY, CoC, PR template) ([7cd0a69](https://github.com/ai-driven-dev/aidd-framework/commit/7cd0a6996a7df026d409ce07661489a1c550437e))
* **framework:** adopt release-please monorepo with per-plugin versioning ([9706606](https://github.com/ai-driven-dev/aidd-framework/commit/9706606207f1474033fb9b73ce089636362616c9))
* **framework:** align release tarball flow with v5 framework layout ([a5601f7](https://github.com/ai-driven-dev/aidd-framework/commit/a5601f71328a2034ec2096603dcb42266f7adc6b))
* **framework:** bulk alignment  evals everywhere, em-dash purge, audit template, stale refs fixed ([0dfd79d](https://github.com/ai-driven-dev/aidd-framework/commit/0dfd79dac5ce7f15194b4aa9b58b5dd61fdf14b6))
* **framework:** bump aidd-pm to 1.0.0 and apply audit fixes ([97573bc](https://github.com/ai-driven-dev/aidd-framework/commit/97573bcf1b7624f6cf1acaa62791b9cdbe1b237b))
* **framework:** bump marketplace to 4.0.0 and refresh aidd-dev SDLC docs ([073a4a6](https://github.com/ai-driven-dev/aidd-framework/commit/073a4a617f08841d950ae0d5ebd3b45fdcbb0f93))
* **framework:** disable body-max-line-length, keep scope-enum strict ([4a6a22f](https://github.com/ai-driven-dev/aidd-framework/commit/4a6a22f07bdeac150038ad7201a5b31d4a8359e4))
* **framework:** disable proposed MCP servers by default ([785293b](https://github.com/ai-driven-dev/aidd-framework/commit/785293b45eea542712031e326c18ac7454068cbf))
* **framework:** disable scope-enum to unblock CI on existing commits ([5ed4947](https://github.com/ai-driven-dev/aidd-framework/commit/5ed4947fc01ba687c8040357679129412d875271))
* **framework:** disable subject-case to unblock CI ([4889ce5](https://github.com/ai-driven-dev/aidd-framework/commit/4889ce5572cb996f869814287e1a3a79b12464a4))
* **framework:** downgrade scope-enum to warning and disable body-max-line-length ([157a8e1](https://github.com/ai-driven-dev/aidd-framework/commit/157a8e1891367a4c16d000c43eb2731eb0ab5c9a))
* **framework:** drop auto-generated CATALOG.md ([6004359](https://github.com/ai-driven-dev/aidd-framework/commit/60043597f682e2da5a9ced5713bf2fe799f0539a))
* **framework:** drop scope-enum whitelist, keep classic conventional rules ([189963f](https://github.com/ai-driven-dev/aidd-framework/commit/189963f89e31340c0b5965751fddba1d09e210c6))
* **framework:** drop skills.json aggregator ([671fef8](https://github.com/ai-driven-dev/aidd-framework/commit/671fef8cdd8a6ec2af022e7fa73dd454b9adb7eb))
* **framework:** merge feat/plugin-content-tool-agnostic ([11cce19](https://github.com/ai-driven-dev/aidd-framework/commit/11cce1963826a1ed3e28837b9ccee8ed11fe2229))
* **framework:** merge feat/readme-wow into main ([8f42cfc](https://github.com/ai-driven-dev/aidd-framework/commit/8f42cfc067dd973d0d689593a59da0582f2168e6))
* **framework:** merge origin/feat/plugin-architecture ([0082b4c](https://github.com/ai-driven-dev/aidd-framework/commit/0082b4cc7916fca6e3060362a0ce762c155a0e19))
* **framework:** prune stale tracked files and tighten ROADMAP ([33975d6](https://github.com/ai-driven-dev/aidd-framework/commit/33975d63b8bdda1249214433663298266be71959))
* **framework:** raise header-max-length to 120 and downgrade to warning ([4bccb58](https://github.com/ai-driven-dev/aidd-framework/commit/4bccb58db4f8729105e388af327e07200cb9b0c6))
* **framework:** regenerate aidd-dev CATALOG.md after merge ([0639dc0](https://github.com/ai-driven-dev/aidd-framework/commit/0639dc0c5f8372ad6a238961cbf64ac3b2756ded))
* **framework:** regenerate plugin catalogs after aidd-context audit ([7b5907a](https://github.com/ai-driven-dev/aidd-framework/commit/7b5907ac00bc661b7ce0bd66f335d6980badfa31))
* **framework:** regenerate plugin catalogs after audit sweep ([448b111](https://github.com/ai-driven-dev/aidd-framework/commit/448b111662335197c9e4e415db391fc4e8d5c79f))
* **framework:** release as 4.0.0 ([5b0fc9d](https://github.com/ai-driven-dev/aidd-framework/commit/5b0fc9d9116e37abe7ef5dbb5d06438f607475e8))
* **framework:** remove $schema ref from marketplace.json  CLI owns validation ([ae78847](https://github.com/ai-driven-dev/aidd-framework/commit/ae78847d9f5cd30cb57dc77812b2596dbc6f9429))
* **framework:** remove PostToolUse hook from hooks configuration ([0b1eb66](https://github.com/ai-driven-dev/aidd-framework/commit/0b1eb664adf74d3d552c23e5da69def8fc9dbbb8))
* **framework:** restore strict commitlint rules after history rewrite ([220e249](https://github.com/ai-driven-dev/aidd-framework/commit/220e2492b372c3e574dce40c9a170e3c8034c5d0))
* **framework:** roll back root version to 3.9.1 for release-please cut ([a2535e7](https://github.com/ai-driven-dev/aidd-framework/commit/a2535e7478941d09aac9e33baaffc13f1345fdec))
* **framework:** self-host summarize-markdown.mjs for per-plugin CATALOG ([ee62862](https://github.com/ai-driven-dev/aidd-framework/commit/ee6286237d3b1b97ebaf67aa68f8152015d61e90))
* **framework:** tighten standalone lefthook checks + schema validation ([749dc5c](https://github.com/ai-driven-dev/aidd-framework/commit/749dc5c206f8642ec7166ae1d95a6bc44744ccdd))
* **framework:** trigger ci recheck after history rewrite ([391760e](https://github.com/ai-driven-dev/aidd-framework/commit/391760e19eb69fe80e098c3aefc3c527cda2169a))
* **framework:** unify version management across marketplace and plugins via release-please ([85d97eb](https://github.com/ai-driven-dev/aidd-framework/commit/85d97eb130d809515c51700554e94adebab0eee6))
* **framework:** verify build-dist.sh against beta.23 + add verification report ([1222e99](https://github.com/ai-driven-dev/aidd-framework/commit/1222e996c12c814465941721cf34439778003a4d))
* **framework:** wave 1 audit fixes (schemas, gitignore, dependabot, links) ([4bcb670](https://github.com/ai-driven-dev/aidd-framework/commit/4bcb67069cd7af57f2a73fb55e19d89a583e2e7d))
* **framework:** wave 5 OSS hygiene on main (evals CI + doctor + labels + scrub routing) ([8a4c409](https://github.com/ai-driven-dev/aidd-framework/commit/8a4c4097edbb7fd866186fbdbf8c74c76b8b7c23))
* **governance:** commit main branch protection ruleset + document policy ([160c457](https://github.com/ai-driven-dev/aidd-framework/commit/160c457c8076e2db45b4fb021850fa45d998d4f7))
* **orchestrator:** drop empty orphan audit unknown-20260514T082959Z ([17f0b48](https://github.com/ai-driven-dev/aidd-framework/commit/17f0b48484906030f28d023b0348f9814495b497))
* **orchestrator:** record async run audit ([12a7e68](https://github.com/ai-driven-dev/aidd-framework/commit/12a7e68b9f4ebe29d51efe4c9ae3af8513c4b12e))
* **orchestrator:** record async run audit auto-20260514T155557Z-i81 ([68119d2](https://github.com/ai-driven-dev/aidd-framework/commit/68119d235c6d7aaa0512e4ff5271331d834bba6b))
* **orchestrator:** record async run audit unknown-20260514T082959Z ([cffd669](https://github.com/ai-driven-dev/aidd-framework/commit/cffd6693db89a151d93615287b9ab0969a5f277c))
* refresh stale references to deleted async-dev skills + three-artifact context-generate ([4697d19](https://github.com/ai-driven-dev/aidd-framework/commit/4697d198e9f45a1c983da362d9c08f6162f1dd9b))
* **release-please:** pin each plugin to release-as 1.0.0 for the v4 marketplace release ([7d0f154](https://github.com/ai-driven-dev/aidd-framework/commit/7d0f154f1d444700539ffef1b1067c3c0db6c90e))
* **release-please:** pin plugins to release-as 1.0.0 for v4 marketplace cut ([e58021d](https://github.com/ai-driven-dev/aidd-framework/commit/e58021d63790bd739f7ddcee206eaed1633eb6fc))
* **release-please:** register orchestrator + refine and bump root to 4.0.0 ([86fed82](https://github.com/ai-driven-dev/aidd-framework/commit/86fed82de2dd973d20e02db0d1d2809266c08568))
* **release-please:** ship aidd-pm as 1.0.0 stable ([624c20f](https://github.com/ai-driven-dev/aidd-framework/commit/624c20f413642bdea04d654cd0c2a78d6af8a7b5))
* **release-please:** ship aidd-pm as 1.0.0 stable (not RC) ([d7e962a](https://github.com/ai-driven-dev/aidd-framework/commit/d7e962a8469ba8386f23d9d66436ad4f17b9e4d3))
* strip obsolete config/, aidd_docs/, and build-dist.sh ([c381602](https://github.com/ai-driven-dev/aidd-framework/commit/c381602801b42cd43b5bb35c487f8d3df2fc3788))


### Documentation

* **aidd-context:** fix [1.3] skill name to match SKILL.md frontmatter (generate-skill) ([9d4192b](https://github.com/ai-driven-dev/aidd-framework/commit/9d4192b682d9fc0c786fef2b10d7062db95dbc2b))
* **aidd-context:** refresh descriptions to cover all seven generated artifacts ([8cbb5a2](https://github.com/ai-driven-dev/aidd-framework/commit/8cbb5a2d6d5b5e5f51aa125cf2066f1322b987fd))
* **aidd-context:** refresh descriptions to cover the seven generated artifacts ([b1bef44](https://github.com/ai-driven-dev/aidd-framework/commit/b1bef44b87d6e02d071b75ce513dfbf0f881a547))
* **aidd-dev:** drop stale reference to 05-ship precondition in SDLC rule ([69853d7](https://github.com/ai-driven-dev/aidd-framework/commit/69853d70d51e4e36713306d92c52e30268909392))
* **aidd-orchestrator:** rewrite README with full local + remote coverage ([ac3b47e](https://github.com/ai-driven-dev/aidd-framework/commit/ac3b47ebe33cdaa58b036750df7142c271300339))
* **aidd-pm:** sync CATALOG.md with current skill state ([44a398e](https://github.com/ai-driven-dev/aidd-framework/commit/44a398e558b20d80e0654a74cfeed58b8e6684c4))
* **contributing:** document commit scope to release-please mapping ([01dc226](https://github.com/ai-driven-dev/aidd-framework/commit/01dc2263f33acb0b94699a62a2e184a82211bd08))
* **contributing:** point at validate.yml after evals.yml consolidation ([6e10a3b](https://github.com/ai-driven-dev/aidd-framework/commit/6e10a3ba1392b151f8dbdf4047960b293bd87a95))
* **framework:** add agents count to stats line ([e35c7fa](https://github.com/ai-driven-dev/aidd-framework/commit/e35c7fa0a80a3ab725a635ed7996d86b1cba98ae))
* **framework:** add AIDD logo asset ([34d1253](https://github.com/ai-driven-dev/aidd-framework/commit/34d12531ec44ac7076a5d43d9b3fe09b0df2f5f7))
* **framework:** add ARCHITECTURE.md  source of truth for plugin structure ([6135b11](https://github.com/ai-driven-dev/aidd-framework/commit/6135b117b4cb6b2d0275a0160fae889a7a6d91f9))
* **framework:** add badges, contributors mosaic, and demo-gif placeholder ([0726cbe](https://github.com/ai-driven-dev/aidd-framework/commit/0726cbef381813c67d0caa0c8220037e21e518d9))
* **framework:** add FAQ, Architecture, Create Plugin guides; clean broken refs ([d9a3c24](https://github.com/ai-driven-dev/aidd-framework/commit/d9a3c2466843a64c90865a50373e6302fc1ae334))
* **framework:** add founder blog link to credit line ([7ad6c53](https://github.com/ai-driven-dev/aidd-framework/commit/7ad6c535ec9c7a395b375333d3c495c007140516))
* **framework:** add GOVERNANCE, ROADMAP, and skills.json aggregator ([e770862](https://github.com/ai-driven-dev/aidd-framework/commit/e770862b30176dc9c3f6f6e0dc5aa655a970b5b4))
* **framework:** add Made in France badge and footer signature ([a0d70b3](https://github.com/ai-driven-dev/aidd-framework/commit/a0d70b3826109e9181a3892fcc33e87f8c3a1d19))
* **framework:** add maintainer release playbook ([e80415a](https://github.com/ai-driven-dev/aidd-framework/commit/e80415a0eef76337ccba5bce73f0489b24a9573c))
* **framework:** add maintainer release playbook ([b74fe5b](https://github.com/ai-driven-dev/aidd-framework/commit/b74fe5bbe445d3c84888cb0abac264a3c31265ec))
* **framework:** add per-plugin CATALOG.md (auto-generated) ([d613282](https://github.com/ai-driven-dev/aidd-framework/commit/d61328242639bb77909055019629b1da3891bffc))
* **framework:** add v3 to v4 upgrade guide ([63a9419](https://github.com/ai-driven-dev/aidd-framework/commit/63a94198d07920b6977aba04e3b154f9aac47eff))
* **framework:** add v3 to v4 upgrade guide ([594f8db](https://github.com/ai-driven-dev/aidd-framework/commit/594f8db9adac7ca42f5adb32658ce222318a3821))
* **framework:** clarify onboard skill scope in Quick start ([af8d6ef](https://github.com/ai-driven-dev/aidd-framework/commit/af8d6eff97a67c41866d5a3565f12f12ae09f06c))
* **framework:** document prerequisites for users and contributors ([074c76c](https://github.com/ai-driven-dev/aidd-framework/commit/074c76c27f5dc4f550dd3a6d75b3a39f0d16e25c))
* **framework:** drop contributors section, add 4 static badges ([9875a73](https://github.com/ai-driven-dev/aidd-framework/commit/9875a738acb3247bb7b61f34f8e7b58c62d7f99a))
* **framework:** drop evals badge and quick-start mermaid ([fb042b4](https://github.com/ai-driven-dev/aidd-framework/commit/fb042b46803e013eaff5c4535040848f9502d027))
* **framework:** drop orphan aidd_docs/CATALOG.md ([c0bb1e2](https://github.com/ai-driven-dev/aidd-framework/commit/c0bb1e2642d16bd219a2e74b1e206b11474362dc))
* **framework:** explicit positioning vs claude-plugins-official ([dc395b2](https://github.com/ai-driven-dev/aidd-framework/commit/dc395b25b7580ba980f131dac52fead23f560ca2))
* **framework:** fix YouTube link and credit Alex Soyes as founder ([16449f1](https://github.com/ai-driven-dev/aidd-framework/commit/16449f1834787946ad7eb68c980247fd4a04a1f1))
* **framework:** keep only static badges and link contributors graph while repo is private ([a60b09f](https://github.com/ai-driven-dev/aidd-framework/commit/a60b09fdb791c5b5ca16ef847217f4803518fb15))
* **framework:** reframe AI-Driven Dev section as community + flow + tools ([e64d323](https://github.com/ai-driven-dev/aidd-framework/commit/e64d323add84772b5ac71e2f3daeee227a1b56e8))
* **framework:** replace founder YouTube link with GitHub, LinkedIn, X ([34076ed](https://github.com/ai-driven-dev/aidd-framework/commit/34076ed1fba7769b8b204a66b8b90425f7113a11))
* **framework:** rewrite for plugin marketplace model ([9529d4c](https://github.com/ai-driven-dev/aidd-framework/commit/9529d4cbc8fef430354300e2bfcd8bff526c67a2))
* **framework:** rewrite ROADMAP around user-stated direction ([bc581d6](https://github.com/ai-driven-dev/aidd-framework/commit/bc581d6da7a14c3788c39352e73e0f5a9d9100ba))
* **framework:** rewrite top-level README for OSS readiness ([f8eb385](https://github.com/ai-driven-dev/aidd-framework/commit/f8eb385f9d720a2b54772c9d30826990ee91c02a))
* **framework:** scaffold aidd_docs and replace ARCHITECTURE.md ([3a91267](https://github.com/ai-driven-dev/aidd-framework/commit/3a9126772bbe07bdba23c2b11c14d14588f5d80b))
* **framework:** sync READMEs and CATALOGs with current skills ([16c9372](https://github.com/ai-driven-dev/aidd-framework/commit/16c937268b27a6e80f4077da4989003be5d9d186))
* **framework:** update CATALOG.md ([d921bfd](https://github.com/ai-driven-dev/aidd-framework/commit/d921bfd6f68f81946e172cc49cc7969cf20ce276))
* **framework:** update feature request template and contributing guidelines ([1592df3](https://github.com/ai-driven-dev/aidd-framework/commit/1592df36e5c3ebad2943ca624a6c07c5da1d5d00))
* **framework:** wow README hero, plugin grid, quick-start Mermaid ([bcbd00c](https://github.com/ai-driven-dev/aidd-framework/commit/bcbd00cd3fd01f259750e4d28cb34890a9711677))
* **orchestrator:** add async-dev lifecycle state diagram to run skill README ([ac4c867](https://github.com/ai-driven-dev/aidd-framework/commit/ac4c8672159549ef8d4e85141f8beabe75c36271))
* **orchestrator:** align README with sibling plugin pattern + add to framework catalog ([7c62edd](https://github.com/ai-driven-dev/aidd-framework/commit/7c62edde873b94e046a94517833100eec35feddc))
* **orchestrator:** restructure plugin and per-skill READMEs ([cb841de](https://github.com/ai-driven-dev/aidd-framework/commit/cb841def85c91905d137820ac3e9467d217f5da4))
* phase 1 critical audit fixes (skill invocations, catalog, templates) ([5b5342b](https://github.com/ai-driven-dev/aidd-framework/commit/5b5342b890ae0be4eb8302fd36e5a4d8882b9cbb))
* phase 2 high-severity audit fixes (security, lefthook, accuracy) ([95f29c3](https://github.com/ai-driven-dev/aidd-framework/commit/95f29c33c6a523166eaf09e0293000ee356a27dd))
* phase 3 medium/low audit fixes (OSS scaffolding, UX, accuracy) ([5e43650](https://github.com/ai-driven-dev/aidd-framework/commit/5e436502d7632b377f73129cfb73d312c3eea9ce))
* propagate per-skill README pattern across all plugins ([4427e3e](https://github.com/ai-driven-dev/aidd-framework/commit/4427e3ee7c096d03f7d7b30d418f3484e9d0541a))
* **readme:** bump skill count 32 to 33 ([87d2324](https://github.com/ai-driven-dev/aidd-framework/commit/87d232406536e02a1ffaf2f33e3a7ea9901c4ea2))
* **readme:** bump skill count 32 to 33 ([14a724a](https://github.com/ai-driven-dev/aidd-framework/commit/14a724ac5bc229ba8675aaade32636ae32af30de))
* scrub cross-plugin references from skill READMEs ([9c23973](https://github.com/ai-driven-dev/aidd-framework/commit/9c2397396c16a80a04f66991a2ae6bd92dcce5d0))


### Refactoring

* **aidd-context:** align audit fixes across 04-mermaid, 01-bootstrap, 02-project-init, 03-context-generate, 05-learn ([8f69261](https://github.com/ai-driven-dev/aidd-framework/commit/8f692619beb1e90b3154134d4cb0c7cc795036db))
* **aidd-context:** cross-tool prompts, .gitkeep enforcement, plugin-based README, CONTRIBUTING ([04e74c6](https://github.com/ai-driven-dev/aidd-framework/commit/04e74c605bbd574fd87a5b58ebab1d366b043b34))
* **aidd-context:** merge 09-generate-skill into 03-context-generate with skills/ subfolder ([e9aa546](https://github.com/ai-driven-dev/aidd-framework/commit/e9aa546051620f7300c8a751e0b098a25e566217))
* **aidd-context:** remove architecture-generate skill and renumber project-init to 02 ([1e80beb](https://github.com/ai-driven-dev/aidd-framework/commit/1e80bebfbbee2dfb0f3314cba46a0f8155bcc7f1))
* **aidd-context:** restructure project init ([da90ed8](https://github.com/ai-driven-dev/aidd-framework/commit/da90ed8ac6c53aff7d1fae6d49477f4b1089a029))
* **aidd-dev:** restructure 00-sdlc as router with 5 atomic actions ([b9653b7](https://github.com/ai-driven-dev/aidd-framework/commit/b9653b75f8ba37e7c8fc1088ec393ce71e90d75d))
* **aidd-dev:** rewrite SDLC as pure orchestrator with role-based agents ([dbc6edd](https://github.com/ai-driven-dev/aidd-framework/commit/dbc6edd360256154a14a82fb206b301b77684822))
* **aidd-orchestrator:** observe-reality + YAML-owned lifecycle ([5b64b4a](https://github.com/ai-driven-dev/aidd-framework/commit/5b64b4aef9cb77898244ca8c81d539bc46473760))
* **aidd-orchestrator:** observe-reality verification + YAML-owned lifecycle ([d193b99](https://github.com/ai-driven-dev/aidd-framework/commit/d193b9935a5a8d318c6432aa1d587793c9d7114f))
* **aidd-pm:** restructure spec into build and refine actions, sync plugin docs ([107241e](https://github.com/ai-driven-dev/aidd-framework/commit/107241e76e444d6afeef8d767ed1501c972ef338))
* **aidd-vcs:** rewrite skills to canonical template with tool-agnostic process ([661f73b](https://github.com/ai-driven-dev/aidd-framework/commit/661f73b8825514cb3d0b8a734981f8c9d98054b0))
* **framework:** align sdlc orchestrator and sub-skills around alex baseline ([92535cd](https://github.com/ai-driven-dev/aidd-framework/commit/92535cdf285effeee4cba9027dd7fd6a88c8c737))
* **framework:** canonical action shape, model-A rules, plugin audit sweep ([29ef579](https://github.com/ai-driven-dev/aidd-framework/commit/29ef579a683302c28f23de383acc1912ebcfe01e))
* **framework:** canonical template for aidd-pm skills + tighter SKILL.md descriptions ([0ea9b80](https://github.com/ai-driven-dev/aidd-framework/commit/0ea9b8021320778e64fb1c3806eb59eabfb6130c))
* **framework:** extract meta-cognition skills into dedicated plugin ([2bf0b6e](https://github.com/ai-driven-dev/aidd-framework/commit/2bf0b6e5e8cb2d300808332cbe68af626d72009f))
* **framework:** make content tool-agnostic and self-contained ([84165a9](https://github.com/ai-driven-dev/aidd-framework/commit/84165a917c9c36b6bca10599e9f4699908bd79ba))
* **framework:** move ide-mapping rules to aidd-context plugin ([791ac84](https://github.com/ai-driven-dev/aidd-framework/commit/791ac849e94e53bff674e3b6b295b1e351337b3f))
* **framework:** remove embedded skill content for distribution-mode migration ([ee43a32](https://github.com/ai-driven-dev/aidd-framework/commit/ee43a323505791ffb7d41395539c7bc665e8a6c5))
* **framework:** rename skill folders from [X.X] to NN-name format ([c8968bc](https://github.com/ai-driven-dev/aidd-framework/commit/c8968bc79dd7f24976392a6bce0c7f30c35b2ede))
* **framework:** unify plan/status/tracking into living plan template ([180c504](https://github.com/ai-driven-dev/aidd-framework/commit/180c5047750f5aaf6093c425cec9ce6657ca3ad9))
* generate_skill ([4a8e9bb](https://github.com/ai-driven-dev/aidd-framework/commit/4a8e9bb2adff0a7aca2933c5384dfa1cda7670b5))
* **plugin:** rename aidd-async-dev to aidd-orchestrator ([4cb0f71](https://github.com/ai-driven-dev/aidd-framework/commit/4cb0f71d1beaf6d991d71a4d73405b3a3357c6c3))
* **plugin:** suffix skill names with -async-dev for self-documentation ([c19a5a4](https://github.com/ai-driven-dev/aidd-framework/commit/c19a5a4c5ade09f129158defb3899e63d2598a6b))
</details>

<details><summary>aidd-context: 1.0.0</summary>

## [1.0.0](https://github.com/ai-driven-dev/aidd-framework/compare/aidd-context-v1.0.0...aidd-context-v1.0.0) (2026-05-19)


### Features

* **aidd-context:** add 00-onboard skill (state-aware guided loop) ([4f3d0fa](https://github.com/ai-driven-dev/aidd-framework/commit/4f3d0fa19f1104cdfd2f9f8442965182f403f181))
* **aidd-context:** add 01-bootstrap skill for SaaS architecture imagination ([4643594](https://github.com/ai-driven-dev/aidd-framework/commit/4643594163686a92bc02211770a7906e3d07c99f))
* **aidd-context:** extend 06-discovery with rule, hook, and memory finders ([3ad5661](https://github.com/ai-driven-dev/aidd-framework/commit/3ad56614eabdb2313b3e4951c7daa724b7a816cb))
* **aidd-context:** extend context-generate with plugins, commands, hooks, marketplaces; add async-dev router ([d409bab](https://github.com/ai-driven-dev/aidd-framework/commit/d409babb029aca89355c4d7bc9d21d007ff012a2))
* **aidd-context:** implement interactive brainstorming skill with structured actions for clarifying feature requests ([edba00c](https://github.com/ai-driven-dev/aidd-framework/commit/edba00c65f4323bfbf046ad24805841a263dd424))
* **aidd-context:** migrate commands to numbered actions ([324357a](https://github.com/ai-driven-dev/aidd-framework/commit/324357a8acef153b929fe6d1c85dff262bb041f8))
* **aidd-dev:** add 02-implement skill, renumber downstream skills ([16fa5d6](https://github.com/ai-driven-dev/aidd-framework/commit/16fa5d61cac55f5e8223cb55ce9e213dfcb7fdb6))
* **aidd-dev:** scan rules and project files modifications in plan template ([0509421](https://github.com/ai-driven-dev/aidd-framework/commit/05094211fc6f79cd033c08a3409d3b494e3fd8ce))
* async-dev router + context-generate determinism tightening ([#128](https://github.com/ai-driven-dev/aidd-framework/issues/128)) ([213a82e](https://github.com/ai-driven-dev/aidd-framework/commit/213a82efbfc85aa4bed5de33b1079fba29ec4fac))
* **framework:** delete legacy commands/ directory ([dac60bb](https://github.com/ai-driven-dev/aidd-framework/commit/dac60bbb7c953abadf19f0cb239987c81c006376))
* **framework:** migrate 5 pre-refactored skills into plugins ([da2987c](https://github.com/ai-driven-dev/aidd-framework/commit/da2987c7c281d3b087e6c09f5079decf7e066bd2))
* **framework:** refactor to marketplace plugin architecture and skills ([27128a9](https://github.com/ai-driven-dev/aidd-framework/commit/27128a96314904b7b57b0bc419e4d29b7a7edaf0))
* **framework:** relocate templates and conventions into skill assets ([6920182](https://github.com/ai-driven-dev/aidd-framework/commit/692018202f84cd6f5d885f5737f305f77f79ac5f))
* **framework:** scaffold 4-plugin marketplace catalog ([7be5466](https://github.com/ai-driven-dev/aidd-framework/commit/7be5466ae78f432a5477a6f35d23cbff56b7f2df))
* **framework:** split MCP and SessionStart hook into plugins ([527f9b8](https://github.com/ai-driven-dev/aidd-framework/commit/527f9b8c13ea1c7e45b277218569e6881559cadc))
* **framework:** update build script for plugin layout and regenerate catalogs ([ea18188](https://github.com/ai-driven-dev/aidd-framework/commit/ea1818850a6c9d8b39de2aa5bae2b6ecf6741ddd))


### Bug Fixes

* **aidd-context:** correct hooks.json format for Claude Code and Copilot ([f66ca72](https://github.com/ai-driven-dev/aidd-framework/commit/f66ca7247ea7b135b6792781ff978055b747392b))
* **aidd-context:** rename skill frontmatter name from generate-skill to context-generate ([805cf6f](https://github.com/ai-driven-dev/aidd-framework/commit/805cf6f8b8897ce2283679d991041345d2192f12))
* **aidd-context:** repair @-paths, generalize mermaid reference, delegate frontmatter to references ([1ff4a04](https://github.com/ai-driven-dev/aidd-framework/commit/1ff4a04c0f1fedbfbcc7db6a362c08f787e34815))
* **aidd-context:** replace placeholder with generic path pattern in copilot rule example ([e22b358](https://github.com/ai-driven-dev/aidd-framework/commit/e22b358c39a30ad6a0b38246b469bee41f2573cf))
* **framework:** correct slash command naming in docs ([adad60a](https://github.com/ai-driven-dev/aidd-framework/commit/adad60aacaa120f3abf55100625bed7a3a87a50a))
* **framework:** namespace frontmatter for relocated skills ([ea220a1](https://github.com/ai-driven-dev/aidd-framework/commit/ea220a19667da43cbe88c0dca87913b1d1c381cb))
* **framework:** repair broken @-paths, stale skill ref, and Ressources typo across plugins ([558bb34](https://github.com/ai-driven-dev/aidd-framework/commit/558bb347a6358240556e6c27d0ec09ff4b443bc0))
* **framework:** repair internal broken markdown links ([8ae9dc1](https://github.com/ai-driven-dev/aidd-framework/commit/8ae9dc1ae729ab65c512661a9e0ec6fb8dc618ed))


### Miscellaneous

* **aidd-context:** refresh stale async-dev refs in project-init template and routing evals ([13a424c](https://github.com/ai-driven-dev/aidd-framework/commit/13a424cbad77b1afde7f8867e867ad1e2068f443))
* **ci:** SHA-pin every external action and add CodeQL workflow ([66d5fcf](https://github.com/ai-driven-dev/aidd-framework/commit/66d5fcf99776df2885a84b2ef70943ff63099748))
* **framework:** adopt release-please monorepo with per-plugin versioning ([9706606](https://github.com/ai-driven-dev/aidd-framework/commit/9706606207f1474033fb9b73ce089636362616c9))
* **framework:** bulk alignment  evals everywhere, em-dash purge, audit template, stale refs fixed ([0dfd79d](https://github.com/ai-driven-dev/aidd-framework/commit/0dfd79dac5ce7f15194b4aa9b58b5dd61fdf14b6))
* **framework:** bump aidd-pm to 1.0.0 and apply audit fixes ([97573bc](https://github.com/ai-driven-dev/aidd-framework/commit/97573bcf1b7624f6cf1acaa62791b9cdbe1b237b))
* **framework:** bump marketplace to 4.0.0 and refresh aidd-dev SDLC docs ([073a4a6](https://github.com/ai-driven-dev/aidd-framework/commit/073a4a617f08841d950ae0d5ebd3b45fdcbb0f93))
* **framework:** merge feat/plugin-content-tool-agnostic ([11cce19](https://github.com/ai-driven-dev/aidd-framework/commit/11cce1963826a1ed3e28837b9ccee8ed11fe2229))
* **framework:** merge origin/feat/plugin-architecture ([0082b4c](https://github.com/ai-driven-dev/aidd-framework/commit/0082b4cc7916fca6e3060362a0ce762c155a0e19))
* **framework:** regenerate plugin catalogs after aidd-context audit ([7b5907a](https://github.com/ai-driven-dev/aidd-framework/commit/7b5907ac00bc661b7ce0bd66f335d6980badfa31))
* **framework:** regenerate plugin catalogs after audit sweep ([448b111](https://github.com/ai-driven-dev/aidd-framework/commit/448b111662335197c9e4e415db391fc4e8d5c79f))
* **framework:** release as 4.0.0 ([5b0fc9d](https://github.com/ai-driven-dev/aidd-framework/commit/5b0fc9d9116e37abe7ef5dbb5d06438f607475e8))
* **framework:** remove PostToolUse hook from hooks configuration ([0b1eb66](https://github.com/ai-driven-dev/aidd-framework/commit/0b1eb664adf74d3d552c23e5da69def8fc9dbbb8))
* **framework:** roll back root version to 3.9.1 for release-please cut ([a2535e7](https://github.com/ai-driven-dev/aidd-framework/commit/a2535e7478941d09aac9e33baaffc13f1345fdec))
* **framework:** self-host summarize-markdown.mjs for per-plugin CATALOG ([ee62862](https://github.com/ai-driven-dev/aidd-framework/commit/ee6286237d3b1b97ebaf67aa68f8152015d61e90))
* **framework:** trigger ci recheck after history rewrite ([391760e](https://github.com/ai-driven-dev/aidd-framework/commit/391760e19eb69fe80e098c3aefc3c527cda2169a))
* **framework:** wave 1 audit fixes (schemas, gitignore, dependabot, links) ([4bcb670](https://github.com/ai-driven-dev/aidd-framework/commit/4bcb67069cd7af57f2a73fb55e19d89a583e2e7d))
* refresh stale references to deleted async-dev skills + three-artifact context-generate ([4697d19](https://github.com/ai-driven-dev/aidd-framework/commit/4697d198e9f45a1c983da362d9c08f6162f1dd9b))


### Documentation

* **aidd-context:** fix [1.3] skill name to match SKILL.md frontmatter (generate-skill) ([9d4192b](https://github.com/ai-driven-dev/aidd-framework/commit/9d4192b682d9fc0c786fef2b10d7062db95dbc2b))
* **aidd-context:** refresh descriptions to cover all seven generated artifacts ([8cbb5a2](https://github.com/ai-driven-dev/aidd-framework/commit/8cbb5a2d6d5b5e5f51aa125cf2066f1322b987fd))
* **aidd-context:** refresh descriptions to cover the seven generated artifacts ([b1bef44](https://github.com/ai-driven-dev/aidd-framework/commit/b1bef44b87d6e02d071b75ce513dfbf0f881a547))
* **framework:** add per-plugin CATALOG.md (auto-generated) ([d613282](https://github.com/ai-driven-dev/aidd-framework/commit/d61328242639bb77909055019629b1da3891bffc))
* **framework:** rewrite for plugin marketplace model ([9529d4c](https://github.com/ai-driven-dev/aidd-framework/commit/9529d4cbc8fef430354300e2bfcd8bff526c67a2))
* **framework:** update feature request template and contributing guidelines ([1592df3](https://github.com/ai-driven-dev/aidd-framework/commit/1592df36e5c3ebad2943ca624a6c07c5da1d5d00))
* phase 1 critical audit fixes (skill invocations, catalog, templates) ([5b5342b](https://github.com/ai-driven-dev/aidd-framework/commit/5b5342b890ae0be4eb8302fd36e5a4d8882b9cbb))
* phase 2 high-severity audit fixes (security, lefthook, accuracy) ([95f29c3](https://github.com/ai-driven-dev/aidd-framework/commit/95f29c33c6a523166eaf09e0293000ee356a27dd))
* phase 3 medium/low audit fixes (OSS scaffolding, UX, accuracy) ([5e43650](https://github.com/ai-driven-dev/aidd-framework/commit/5e436502d7632b377f73129cfb73d312c3eea9ce))
* propagate per-skill README pattern across all plugins ([4427e3e](https://github.com/ai-driven-dev/aidd-framework/commit/4427e3ee7c096d03f7d7b30d418f3484e9d0541a))


### Refactoring

* **aidd-context:** align audit fixes across 04-mermaid, 01-bootstrap, 02-project-init, 03-context-generate, 05-learn ([8f69261](https://github.com/ai-driven-dev/aidd-framework/commit/8f692619beb1e90b3154134d4cb0c7cc795036db))
* **aidd-context:** cross-tool prompts, .gitkeep enforcement, plugin-based README, CONTRIBUTING ([04e74c6](https://github.com/ai-driven-dev/aidd-framework/commit/04e74c605bbd574fd87a5b58ebab1d366b043b34))
* **aidd-context:** merge 09-generate-skill into 03-context-generate with skills/ subfolder ([e9aa546](https://github.com/ai-driven-dev/aidd-framework/commit/e9aa546051620f7300c8a751e0b098a25e566217))
* **aidd-context:** remove architecture-generate skill and renumber project-init to 02 ([1e80beb](https://github.com/ai-driven-dev/aidd-framework/commit/1e80bebfbbee2dfb0f3314cba46a0f8155bcc7f1))
* **aidd-context:** restructure project init ([da90ed8](https://github.com/ai-driven-dev/aidd-framework/commit/da90ed8ac6c53aff7d1fae6d49477f4b1089a029))
* **aidd-dev:** rewrite SDLC as pure orchestrator with role-based agents ([dbc6edd](https://github.com/ai-driven-dev/aidd-framework/commit/dbc6edd360256154a14a82fb206b301b77684822))
* **framework:** align sdlc orchestrator and sub-skills around alex baseline ([92535cd](https://github.com/ai-driven-dev/aidd-framework/commit/92535cdf285effeee4cba9027dd7fd6a88c8c737))
* **framework:** canonical action shape, model-A rules, plugin audit sweep ([29ef579](https://github.com/ai-driven-dev/aidd-framework/commit/29ef579a683302c28f23de383acc1912ebcfe01e))
* **framework:** extract meta-cognition skills into dedicated plugin ([2bf0b6e](https://github.com/ai-driven-dev/aidd-framework/commit/2bf0b6e5e8cb2d300808332cbe68af626d72009f))
* **framework:** make content tool-agnostic and self-contained ([84165a9](https://github.com/ai-driven-dev/aidd-framework/commit/84165a917c9c36b6bca10599e9f4699908bd79ba))
* **framework:** move ide-mapping rules to aidd-context plugin ([791ac84](https://github.com/ai-driven-dev/aidd-framework/commit/791ac849e94e53bff674e3b6b295b1e351337b3f))
* **framework:** remove embedded skill content for distribution-mode migration ([ee43a32](https://github.com/ai-driven-dev/aidd-framework/commit/ee43a323505791ffb7d41395539c7bc665e8a6c5))
* **framework:** rename skill folders from [X.X] to NN-name format ([c8968bc](https://github.com/ai-driven-dev/aidd-framework/commit/c8968bc79dd7f24976392a6bce0c7f30c35b2ede))
* **framework:** unify plan/status/tracking into living plan template ([180c504](https://github.com/ai-driven-dev/aidd-framework/commit/180c5047750f5aaf6093c425cec9ce6657ca3ad9))
</details>

<details><summary>aidd-dev: 1.0.0</summary>

## [1.0.0](https://github.com/ai-driven-dev/aidd-framework/compare/aidd-dev-v1.0.0...aidd-dev-v1.0.0) (2026-05-19)


### Features

* **aidd-dev:** add 02-implement skill, renumber downstream skills ([16fa5d6](https://github.com/ai-driven-dev/aidd-framework/commit/16fa5d61cac55f5e8223cb55ce9e213dfcb7fdb6))
* **aidd-dev:** add interactive mode to 00-sdlc orchestrator ([8f9e245](https://github.com/ai-driven-dev/aidd-framework/commit/8f9e245cf390f16906516e9a1ea4a5d77fdef2f7))
* **aidd-dev:** centralize agents ([7f77514](https://github.com/ai-driven-dev/aidd-framework/commit/7f7751407972c63accbf352b1a44f5ba89269757))
* **aidd-dev:** enhance pre-flight checklist with user input markers for unresolved dependencies ([a8f41c6](https://github.com/ai-driven-dev/aidd-framework/commit/a8f41c645c3eb3a7aaad171a2d16062a85be1a5c))
* **aidd-dev:** migrate commands to numbered actions ([8ef0f8e](https://github.com/ai-driven-dev/aidd-framework/commit/8ef0f8ed4349f77702d5f07704085382ce831e2a))
* **aidd-dev:** scan rules and project files modifications in plan template ([0509421](https://github.com/ai-driven-dev/aidd-framework/commit/05094211fc6f79cd033c08a3409d3b494e3fd8ce))
* **aidd-orchestrator:** branch enforcement, comment passthrough, skip routing ([4d3acc8](https://github.com/ai-driven-dev/aidd-framework/commit/4d3acc85713aa9f7a45c80db9ae2e571d76c69bb))
* **aidd-orchestrator:** branch enforcement, comment passthrough, skip routing ([3a5cec0](https://github.com/ai-driven-dev/aidd-framework/commit/3a5cec08dbed819472de85c933ab021ee0854855))
* **framework:** delete legacy commands/ directory ([dac60bb](https://github.com/ai-driven-dev/aidd-framework/commit/dac60bbb7c953abadf19f0cb239987c81c006376))
* **framework:** migrate 5 pre-refactored skills into plugins ([da2987c](https://github.com/ai-driven-dev/aidd-framework/commit/da2987c7c281d3b087e6c09f5079decf7e066bd2))
* **framework:** refactor to marketplace plugin architecture and skills ([27128a9](https://github.com/ai-driven-dev/aidd-framework/commit/27128a96314904b7b57b0bc419e4d29b7a7edaf0))
* **framework:** relocate templates and conventions into skill assets ([6920182](https://github.com/ai-driven-dev/aidd-framework/commit/692018202f84cd6f5d885f5737f305f77f79ac5f))
* **framework:** scaffold 4-plugin marketplace catalog ([7be5466](https://github.com/ai-driven-dev/aidd-framework/commit/7be5466ae78f432a5477a6f35d23cbff56b7f2df))
* **framework:** split MCP and SessionStart hook into plugins ([527f9b8](https://github.com/ai-driven-dev/aidd-framework/commit/527f9b8c13ea1c7e45b277218569e6881559cadc))
* **framework:** update build script for plugin layout and regenerate catalogs ([ea18188](https://github.com/ai-driven-dev/aidd-framework/commit/ea1818850a6c9d8b39de2aa5bae2b6ecf6741ddd))
* update agent descriptions for clarity and role specificity in CATALOG and agent files ([eabaf0f](https://github.com/ai-driven-dev/aidd-framework/commit/eabaf0f27e7764fb6f16f8d30f1ebf98cdc62dfa))


### Bug Fixes

* **aidd-dev:** enforce skill-in-agent rule  orchestrator never loads skills directly ([8957d1d](https://github.com/ai-driven-dev/aidd-framework/commit/8957d1dc4e2844128eb8ea8ceb68c27cbe41af28))
* **framework:** correct slash command naming in docs ([adad60a](https://github.com/ai-driven-dev/aidd-framework/commit/adad60aacaa120f3abf55100625bed7a3a87a50a))
* **framework:** repair broken @-paths, stale skill ref, and Ressources typo across plugins ([558bb34](https://github.com/ai-driven-dev/aidd-framework/commit/558bb347a6358240556e6c27d0ec09ff4b443bc0))
* **framework:** wire SDLC contracts  namespace, plan paths, commit modes, validator semantics ([f5f14e0](https://github.com/ai-driven-dev/aidd-framework/commit/f5f14e01c6bb4a8c7952b6241b89a50816f636a6))


### Miscellaneous

* **ci:** SHA-pin every external action and add CodeQL workflow ([66d5fcf](https://github.com/ai-driven-dev/aidd-framework/commit/66d5fcf99776df2885a84b2ef70943ff63099748))
* **framework:** adopt release-please monorepo with per-plugin versioning ([9706606](https://github.com/ai-driven-dev/aidd-framework/commit/9706606207f1474033fb9b73ce089636362616c9))
* **framework:** bulk alignment  evals everywhere, em-dash purge, audit template, stale refs fixed ([0dfd79d](https://github.com/ai-driven-dev/aidd-framework/commit/0dfd79dac5ce7f15194b4aa9b58b5dd61fdf14b6))
* **framework:** bump aidd-pm to 1.0.0 and apply audit fixes ([97573bc](https://github.com/ai-driven-dev/aidd-framework/commit/97573bcf1b7624f6cf1acaa62791b9cdbe1b237b))
* **framework:** bump marketplace to 4.0.0 and refresh aidd-dev SDLC docs ([073a4a6](https://github.com/ai-driven-dev/aidd-framework/commit/073a4a617f08841d950ae0d5ebd3b45fdcbb0f93))
* **framework:** disable proposed MCP servers by default ([785293b](https://github.com/ai-driven-dev/aidd-framework/commit/785293b45eea542712031e326c18ac7454068cbf))
* **framework:** merge feat/plugin-content-tool-agnostic ([11cce19](https://github.com/ai-driven-dev/aidd-framework/commit/11cce1963826a1ed3e28837b9ccee8ed11fe2229))
* **framework:** merge origin/feat/plugin-architecture ([0082b4c](https://github.com/ai-driven-dev/aidd-framework/commit/0082b4cc7916fca6e3060362a0ce762c155a0e19))
* **framework:** regenerate aidd-dev CATALOG.md after merge ([0639dc0](https://github.com/ai-driven-dev/aidd-framework/commit/0639dc0c5f8372ad6a238961cbf64ac3b2756ded))
* **framework:** regenerate plugin catalogs after aidd-context audit ([7b5907a](https://github.com/ai-driven-dev/aidd-framework/commit/7b5907ac00bc661b7ce0bd66f335d6980badfa31))
* **framework:** regenerate plugin catalogs after audit sweep ([448b111](https://github.com/ai-driven-dev/aidd-framework/commit/448b111662335197c9e4e415db391fc4e8d5c79f))
* **framework:** release as 4.0.0 ([5b0fc9d](https://github.com/ai-driven-dev/aidd-framework/commit/5b0fc9d9116e37abe7ef5dbb5d06438f607475e8))
* **framework:** self-host summarize-markdown.mjs for per-plugin CATALOG ([ee62862](https://github.com/ai-driven-dev/aidd-framework/commit/ee6286237d3b1b97ebaf67aa68f8152015d61e90))
* **framework:** trigger ci recheck after history rewrite ([391760e](https://github.com/ai-driven-dev/aidd-framework/commit/391760e19eb69fe80e098c3aefc3c527cda2169a))
* **framework:** wave 1 audit fixes (schemas, gitignore, dependabot, links) ([4bcb670](https://github.com/ai-driven-dev/aidd-framework/commit/4bcb67069cd7af57f2a73fb55e19d89a583e2e7d))


### Documentation

* **aidd-dev:** drop stale reference to 05-ship precondition in SDLC rule ([69853d7](https://github.com/ai-driven-dev/aidd-framework/commit/69853d70d51e4e36713306d92c52e30268909392))
* **framework:** add per-plugin CATALOG.md (auto-generated) ([d613282](https://github.com/ai-driven-dev/aidd-framework/commit/d61328242639bb77909055019629b1da3891bffc))
* **framework:** rewrite for plugin marketplace model ([9529d4c](https://github.com/ai-driven-dev/aidd-framework/commit/9529d4cbc8fef430354300e2bfcd8bff526c67a2))
* **framework:** sync READMEs and CATALOGs with current skills ([16c9372](https://github.com/ai-driven-dev/aidd-framework/commit/16c937268b27a6e80f4077da4989003be5d9d186))
* phase 1 critical audit fixes (skill invocations, catalog, templates) ([5b5342b](https://github.com/ai-driven-dev/aidd-framework/commit/5b5342b890ae0be4eb8302fd36e5a4d8882b9cbb))
* phase 3 medium/low audit fixes (OSS scaffolding, UX, accuracy) ([5e43650](https://github.com/ai-driven-dev/aidd-framework/commit/5e436502d7632b377f73129cfb73d312c3eea9ce))
* propagate per-skill README pattern across all plugins ([4427e3e](https://github.com/ai-driven-dev/aidd-framework/commit/4427e3ee7c096d03f7d7b30d418f3484e9d0541a))
* scrub cross-plugin references from skill READMEs ([9c23973](https://github.com/ai-driven-dev/aidd-framework/commit/9c2397396c16a80a04f66991a2ae6bd92dcce5d0))


### Refactoring

* **aidd-context:** restructure project init ([da90ed8](https://github.com/ai-driven-dev/aidd-framework/commit/da90ed8ac6c53aff7d1fae6d49477f4b1089a029))
* **aidd-dev:** restructure 00-sdlc as router with 5 atomic actions ([b9653b7](https://github.com/ai-driven-dev/aidd-framework/commit/b9653b75f8ba37e7c8fc1088ec393ce71e90d75d))
* **aidd-dev:** rewrite SDLC as pure orchestrator with role-based agents ([dbc6edd](https://github.com/ai-driven-dev/aidd-framework/commit/dbc6edd360256154a14a82fb206b301b77684822))
* **aidd-orchestrator:** observe-reality + YAML-owned lifecycle ([5b64b4a](https://github.com/ai-driven-dev/aidd-framework/commit/5b64b4aef9cb77898244ca8c81d539bc46473760))
* **aidd-orchestrator:** observe-reality verification + YAML-owned lifecycle ([d193b99](https://github.com/ai-driven-dev/aidd-framework/commit/d193b9935a5a8d318c6432aa1d587793c9d7114f))
* **framework:** align sdlc orchestrator and sub-skills around alex baseline ([92535cd](https://github.com/ai-driven-dev/aidd-framework/commit/92535cdf285effeee4cba9027dd7fd6a88c8c737))
* **framework:** canonical action shape, model-A rules, plugin audit sweep ([29ef579](https://github.com/ai-driven-dev/aidd-framework/commit/29ef579a683302c28f23de383acc1912ebcfe01e))
* **framework:** make content tool-agnostic and self-contained ([84165a9](https://github.com/ai-driven-dev/aidd-framework/commit/84165a917c9c36b6bca10599e9f4699908bd79ba))
* **framework:** remove embedded skill content for distribution-mode migration ([ee43a32](https://github.com/ai-driven-dev/aidd-framework/commit/ee43a323505791ffb7d41395539c7bc665e8a6c5))
* **framework:** rename skill folders from [X.X] to NN-name format ([c8968bc](https://github.com/ai-driven-dev/aidd-framework/commit/c8968bc79dd7f24976392a6bce0c7f30c35b2ede))
* **framework:** unify plan/status/tracking into living plan template ([180c504](https://github.com/ai-driven-dev/aidd-framework/commit/180c5047750f5aaf6093c425cec9ce6657ca3ad9))
</details>

<details><summary>aidd-vcs: 1.0.0</summary>

## [1.0.0](https://github.com/ai-driven-dev/aidd-framework/compare/aidd-vcs-v1.0.0...aidd-vcs-v1.0.0) (2026-05-19)


### Features

* **aidd-vcs:** add plugin with 4 VCS skills (commit, pull-request, release-tag, issue-create) ([84234de](https://github.com/ai-driven-dev/aidd-framework/commit/84234de00feace9933555914c991130238b83c2d))
* **aidd-vcs:** support /commit push inline argument ([ee4dda6](https://github.com/ai-driven-dev/aidd-framework/commit/ee4dda615150ae0d700a8ea872969ea93f3af1c0))
* **framework:** refactor to marketplace plugin architecture and skills ([27128a9](https://github.com/ai-driven-dev/aidd-framework/commit/27128a96314904b7b57b0bc419e4d29b7a7edaf0))
* **framework:** scaffold 4-plugin marketplace catalog ([7be5466](https://github.com/ai-driven-dev/aidd-framework/commit/7be5466ae78f432a5477a6f35d23cbff56b7f2df))
* **framework:** update build script for plugin layout and regenerate catalogs ([ea18188](https://github.com/ai-driven-dev/aidd-framework/commit/ea1818850a6c9d8b39de2aa5bae2b6ecf6741ddd))


### Bug Fixes

* **framework:** correct slash command naming in docs ([adad60a](https://github.com/ai-driven-dev/aidd-framework/commit/adad60aacaa120f3abf55100625bed7a3a87a50a))
* **framework:** wire SDLC contracts  namespace, plan paths, commit modes, validator semantics ([f5f14e0](https://github.com/ai-driven-dev/aidd-framework/commit/f5f14e01c6bb4a8c7952b6241b89a50816f636a6))


### Miscellaneous

* **ci:** SHA-pin every external action and add CodeQL workflow ([66d5fcf](https://github.com/ai-driven-dev/aidd-framework/commit/66d5fcf99776df2885a84b2ef70943ff63099748))
* **framework:** adopt release-please monorepo with per-plugin versioning ([9706606](https://github.com/ai-driven-dev/aidd-framework/commit/9706606207f1474033fb9b73ce089636362616c9))
* **framework:** bump aidd-pm to 1.0.0 and apply audit fixes ([97573bc](https://github.com/ai-driven-dev/aidd-framework/commit/97573bcf1b7624f6cf1acaa62791b9cdbe1b237b))
* **framework:** merge feat/plugin-content-tool-agnostic ([11cce19](https://github.com/ai-driven-dev/aidd-framework/commit/11cce1963826a1ed3e28837b9ccee8ed11fe2229))
* **framework:** release as 4.0.0 ([5b0fc9d](https://github.com/ai-driven-dev/aidd-framework/commit/5b0fc9d9116e37abe7ef5dbb5d06438f607475e8))
* **framework:** self-host summarize-markdown.mjs for per-plugin CATALOG ([ee62862](https://github.com/ai-driven-dev/aidd-framework/commit/ee6286237d3b1b97ebaf67aa68f8152015d61e90))
* **framework:** trigger ci recheck after history rewrite ([391760e](https://github.com/ai-driven-dev/aidd-framework/commit/391760e19eb69fe80e098c3aefc3c527cda2169a))
* **framework:** wave 1 audit fixes (schemas, gitignore, dependabot, links) ([4bcb670](https://github.com/ai-driven-dev/aidd-framework/commit/4bcb67069cd7af57f2a73fb55e19d89a583e2e7d))


### Documentation

* **framework:** add per-plugin CATALOG.md (auto-generated) ([d613282](https://github.com/ai-driven-dev/aidd-framework/commit/d61328242639bb77909055019629b1da3891bffc))
* **framework:** rewrite for plugin marketplace model ([9529d4c](https://github.com/ai-driven-dev/aidd-framework/commit/9529d4cbc8fef430354300e2bfcd8bff526c67a2))
* **framework:** sync READMEs and CATALOGs with current skills ([16c9372](https://github.com/ai-driven-dev/aidd-framework/commit/16c937268b27a6e80f4077da4989003be5d9d186))
* phase 1 critical audit fixes (skill invocations, catalog, templates) ([5b5342b](https://github.com/ai-driven-dev/aidd-framework/commit/5b5342b890ae0be4eb8302fd36e5a4d8882b9cbb))
* phase 3 medium/low audit fixes (OSS scaffolding, UX, accuracy) ([5e43650](https://github.com/ai-driven-dev/aidd-framework/commit/5e436502d7632b377f73129cfb73d312c3eea9ce))
* propagate per-skill README pattern across all plugins ([4427e3e](https://github.com/ai-driven-dev/aidd-framework/commit/4427e3ee7c096d03f7d7b30d418f3484e9d0541a))


### Refactoring

* **aidd-context:** restructure project init ([da90ed8](https://github.com/ai-driven-dev/aidd-framework/commit/da90ed8ac6c53aff7d1fae6d49477f4b1089a029))
* **aidd-vcs:** rewrite skills to canonical template with tool-agnostic process ([661f73b](https://github.com/ai-driven-dev/aidd-framework/commit/661f73b8825514cb3d0b8a734981f8c9d98054b0))
* **framework:** canonical template for aidd-pm skills + tighter SKILL.md descriptions ([0ea9b80](https://github.com/ai-driven-dev/aidd-framework/commit/0ea9b8021320778e64fb1c3806eb59eabfb6130c))
* **framework:** make content tool-agnostic and self-contained ([84165a9](https://github.com/ai-driven-dev/aidd-framework/commit/84165a917c9c36b6bca10599e9f4699908bd79ba))
* **framework:** remove embedded skill content for distribution-mode migration ([ee43a32](https://github.com/ai-driven-dev/aidd-framework/commit/ee43a323505791ffb7d41395539c7bc665e8a6c5))
* **framework:** rename skill folders from [X.X] to NN-name format ([c8968bc](https://github.com/ai-driven-dev/aidd-framework/commit/c8968bc79dd7f24976392a6bce0c7f30c35b2ede))
</details>

<details><summary>aidd-pm: 1.0.0</summary>

## [1.0.0](https://github.com/ai-driven-dev/aidd-framework/compare/aidd-pm-v1.0.0...aidd-pm-v1.0.0) (2026-05-19)


### Features

* **aidd-pm:** scaffold RC skills with actions ([22fc883](https://github.com/ai-driven-dev/aidd-framework/commit/22fc88365631718e76e893e41e8789c1bb5da599))
* **framework:** refactor to marketplace plugin architecture and skills ([27128a9](https://github.com/ai-driven-dev/aidd-framework/commit/27128a96314904b7b57b0bc419e4d29b7a7edaf0))
* **framework:** relocate templates and conventions into skill assets ([6920182](https://github.com/ai-driven-dev/aidd-framework/commit/692018202f84cd6f5d885f5737f305f77f79ac5f))
* **framework:** scaffold 4-plugin marketplace catalog ([7be5466](https://github.com/ai-driven-dev/aidd-framework/commit/7be5466ae78f432a5477a6f35d23cbff56b7f2df))
* **framework:** split MCP and SessionStart hook into plugins ([527f9b8](https://github.com/ai-driven-dev/aidd-framework/commit/527f9b8c13ea1c7e45b277218569e6881559cadc))
* **framework:** update build script for plugin layout and regenerate catalogs ([ea18188](https://github.com/ai-driven-dev/aidd-framework/commit/ea1818850a6c9d8b39de2aa5bae2b6ecf6741ddd))


### Bug Fixes

* **framework:** correct slash command naming in docs ([adad60a](https://github.com/ai-driven-dev/aidd-framework/commit/adad60aacaa120f3abf55100625bed7a3a87a50a))
* **framework:** namespace frontmatter for relocated skills ([ea220a1](https://github.com/ai-driven-dev/aidd-framework/commit/ea220a19667da43cbe88c0dca87913b1d1c381cb))
* **framework:** wire SDLC contracts  namespace, plan paths, commit modes, validator semantics ([f5f14e0](https://github.com/ai-driven-dev/aidd-framework/commit/f5f14e01c6bb4a8c7952b6241b89a50816f636a6))


### Miscellaneous

* **ci:** SHA-pin every external action and add CodeQL workflow ([66d5fcf](https://github.com/ai-driven-dev/aidd-framework/commit/66d5fcf99776df2885a84b2ef70943ff63099748))
* **framework:** adopt release-please monorepo with per-plugin versioning ([9706606](https://github.com/ai-driven-dev/aidd-framework/commit/9706606207f1474033fb9b73ce089636362616c9))
* **framework:** bulk alignment  evals everywhere, em-dash purge, audit template, stale refs fixed ([0dfd79d](https://github.com/ai-driven-dev/aidd-framework/commit/0dfd79dac5ce7f15194b4aa9b58b5dd61fdf14b6))
* **framework:** bump aidd-pm to 1.0.0 and apply audit fixes ([97573bc](https://github.com/ai-driven-dev/aidd-framework/commit/97573bcf1b7624f6cf1acaa62791b9cdbe1b237b))
* **framework:** disable proposed MCP servers by default ([785293b](https://github.com/ai-driven-dev/aidd-framework/commit/785293b45eea542712031e326c18ac7454068cbf))
* **framework:** merge feat/plugin-content-tool-agnostic ([11cce19](https://github.com/ai-driven-dev/aidd-framework/commit/11cce1963826a1ed3e28837b9ccee8ed11fe2229))
* **framework:** merge origin/feat/plugin-architecture ([0082b4c](https://github.com/ai-driven-dev/aidd-framework/commit/0082b4cc7916fca6e3060362a0ce762c155a0e19))
* **framework:** regenerate plugin catalogs after audit sweep ([448b111](https://github.com/ai-driven-dev/aidd-framework/commit/448b111662335197c9e4e415db391fc4e8d5c79f))
* **framework:** release as 4.0.0 ([5b0fc9d](https://github.com/ai-driven-dev/aidd-framework/commit/5b0fc9d9116e37abe7ef5dbb5d06438f607475e8))
* **framework:** self-host summarize-markdown.mjs for per-plugin CATALOG ([ee62862](https://github.com/ai-driven-dev/aidd-framework/commit/ee6286237d3b1b97ebaf67aa68f8152015d61e90))
* **framework:** trigger ci recheck after history rewrite ([391760e](https://github.com/ai-driven-dev/aidd-framework/commit/391760e19eb69fe80e098c3aefc3c527cda2169a))
* **framework:** wave 1 audit fixes (schemas, gitignore, dependabot, links) ([4bcb670](https://github.com/ai-driven-dev/aidd-framework/commit/4bcb67069cd7af57f2a73fb55e19d89a583e2e7d))


### Documentation

* **aidd-pm:** sync CATALOG.md with current skill state ([44a398e](https://github.com/ai-driven-dev/aidd-framework/commit/44a398e558b20d80e0654a74cfeed58b8e6684c4))
* **framework:** add per-plugin CATALOG.md (auto-generated) ([d613282](https://github.com/ai-driven-dev/aidd-framework/commit/d61328242639bb77909055019629b1da3891bffc))
* **framework:** rewrite for plugin marketplace model ([9529d4c](https://github.com/ai-driven-dev/aidd-framework/commit/9529d4cbc8fef430354300e2bfcd8bff526c67a2))
* **framework:** sync READMEs and CATALOGs with current skills ([16c9372](https://github.com/ai-driven-dev/aidd-framework/commit/16c937268b27a6e80f4077da4989003be5d9d186))
* phase 1 critical audit fixes (skill invocations, catalog, templates) ([5b5342b](https://github.com/ai-driven-dev/aidd-framework/commit/5b5342b890ae0be4eb8302fd36e5a4d8882b9cbb))
* phase 2 high-severity audit fixes (security, lefthook, accuracy) ([95f29c3](https://github.com/ai-driven-dev/aidd-framework/commit/95f29c33c6a523166eaf09e0293000ee356a27dd))
* phase 3 medium/low audit fixes (OSS scaffolding, UX, accuracy) ([5e43650](https://github.com/ai-driven-dev/aidd-framework/commit/5e436502d7632b377f73129cfb73d312c3eea9ce))
* propagate per-skill README pattern across all plugins ([4427e3e](https://github.com/ai-driven-dev/aidd-framework/commit/4427e3ee7c096d03f7d7b30d418f3484e9d0541a))
* scrub cross-plugin references from skill READMEs ([9c23973](https://github.com/ai-driven-dev/aidd-framework/commit/9c2397396c16a80a04f66991a2ae6bd92dcce5d0))


### Refactoring

* **aidd-context:** restructure project init ([da90ed8](https://github.com/ai-driven-dev/aidd-framework/commit/da90ed8ac6c53aff7d1fae6d49477f4b1089a029))
* **aidd-dev:** rewrite SDLC as pure orchestrator with role-based agents ([dbc6edd](https://github.com/ai-driven-dev/aidd-framework/commit/dbc6edd360256154a14a82fb206b301b77684822))
* **aidd-pm:** restructure spec into build and refine actions, sync plugin docs ([107241e](https://github.com/ai-driven-dev/aidd-framework/commit/107241e76e444d6afeef8d767ed1501c972ef338))
* **framework:** align sdlc orchestrator and sub-skills around alex baseline ([92535cd](https://github.com/ai-driven-dev/aidd-framework/commit/92535cdf285effeee4cba9027dd7fd6a88c8c737))
* **framework:** canonical action shape, model-A rules, plugin audit sweep ([29ef579](https://github.com/ai-driven-dev/aidd-framework/commit/29ef579a683302c28f23de383acc1912ebcfe01e))
* **framework:** canonical template for aidd-pm skills + tighter SKILL.md descriptions ([0ea9b80](https://github.com/ai-driven-dev/aidd-framework/commit/0ea9b8021320778e64fb1c3806eb59eabfb6130c))
* **framework:** make content tool-agnostic and self-contained ([84165a9](https://github.com/ai-driven-dev/aidd-framework/commit/84165a917c9c36b6bca10599e9f4699908bd79ba))
* **framework:** remove embedded skill content for distribution-mode migration ([ee43a32](https://github.com/ai-driven-dev/aidd-framework/commit/ee43a323505791ffb7d41395539c7bc665e8a6c5))
* **framework:** rename skill folders from [X.X] to NN-name format ([c8968bc](https://github.com/ai-driven-dev/aidd-framework/commit/c8968bc79dd7f24976392a6bce0c7f30c35b2ede))
</details>

<details><summary>aidd-orchestrator: 1.0.0</summary>

## [1.0.0](https://github.com/ai-driven-dev/aidd-framework/compare/aidd-orchestrator-v1.0.0...aidd-orchestrator-v1.0.0) (2026-05-19)


### Features

* **aidd-context:** extend context-generate with plugins, commands, hooks, marketplaces; add async-dev router ([d409bab](https://github.com/ai-driven-dev/aidd-framework/commit/d409babb029aca89355c4d7bc9d21d007ff012a2))
* **aidd-orchestrator:** action 08 prints inline how-to-generate guides per secret ([ac64f33](https://github.com/ai-driven-dev/aidd-framework/commit/ac64f3386ee1932fff6c2cec3620d7eccddeb1c4))
* **aidd-orchestrator:** branch enforcement, comment passthrough, skip routing ([4d3acc8](https://github.com/ai-driven-dev/aidd-framework/commit/4d3acc85713aa9f7a45c80db9ae2e571d76c69bb))
* **aidd-orchestrator:** branch enforcement, comment passthrough, skip routing ([3a5cec0](https://github.com/ai-driven-dev/aidd-framework/commit/3a5cec08dbed819472de85c933ab021ee0854855))
* **aidd-orchestrator:** drop OS cron, route local scheduling via Claude Code ([1b6ec12](https://github.com/ai-driven-dev/aidd-framework/commit/1b6ec12f711a1a3b06bed9f5c180003c153ef21b))
* **aidd-orchestrator:** local daemon path bypasses Claude Code Tasks quota ([2d573f3](https://github.com/ai-driven-dev/aidd-framework/commit/2d573f31b394b0431c52b52e6883c37f17cf2282))
* **aidd-orchestrator:** per-developer Anthropic account routing in remote mode ([837857d](https://github.com/ai-driven-dev/aidd-framework/commit/837857dd84bebcbd9f46e48ea45715bfa96caa00))
* **aidd-orchestrator:** setup skill goes end-to-end (5 new actions) ([9d4628c](https://github.com/ai-driven-dev/aidd-framework/commit/9d4628cd29795ae74a9989b749184319ea03e6ad))
* **aidd-orchestrator:** smoke test uses a throwaway issue, never the user's backlog ([84596ac](https://github.com/ai-driven-dev/aidd-framework/commit/84596ac2584e0c8f6393462332dbbb4c70e609ae))
* async-dev router + context-generate determinism tightening ([#128](https://github.com/ai-driven-dev/aidd-framework/issues/128)) ([213a82e](https://github.com/ai-driven-dev/aidd-framework/commit/213a82efbfc85aa4bed5de33b1079fba29ec4fac))
* **framework:** refactor to marketplace plugin architecture and skills ([27128a9](https://github.com/ai-driven-dev/aidd-framework/commit/27128a96314904b7b57b0bc419e4d29b7a7edaf0))
* **orchestrator:** add github_write_auth dimension to setup skill and workflow ([897754b](https://github.com/ai-driven-dev/aidd-framework/commit/897754b20717383b612ea0480e83c3f2d6736639))


### Bug Fixes

* **aidd-orchestrator:** action 07 detects project/user scope before prompting ([d84b514](https://github.com/ai-driven-dev/aidd-framework/commit/d84b514e757b405210315e5927361bf201fd40ee))
* **aidd-orchestrator:** action 07 skips when plugins already loaded (project or user scope) ([e9739bb](https://github.com/ai-driven-dev/aidd-framework/commit/e9739bbdeafc358ad57994ac989ca1160bcb1130))
* **aidd-orchestrator:** cosmetic  run_id fallback + dedup review summary ([2734e05](https://github.com/ai-driven-dev/aidd-framework/commit/2734e05ce37bf2f0546c9a542a64f18d5e0e8768))
* **aidd-orchestrator:** delegate-sdlc owns push + PR creation; SDLC writes code only ([fcfdac4](https://github.com/ai-driven-dev/aidd-framework/commit/fcfdac4f4d72729b28b86cb28849cb61a8a6343f))
* **aidd-orchestrator:** forbid leaking action 06 internals into SDLC prompt ([5243f31](https://github.com/ai-driven-dev/aidd-framework/commit/5243f31640c64e79102332167a0a4e3d37b2b826))
* **aidd-orchestrator:** forbid leaking action 06 internals into SDLC prompt ([f933193](https://github.com/ai-driven-dev/aidd-framework/commit/f933193b63e54c40eaac18aac0ed8ae4708f9718))
* **aidd-orchestrator:** iter-1 review never stops on human comment; delegate enforces no-push-to-main ([35753a4](https://github.com/ai-driven-dev/aidd-framework/commit/35753a441da96113805ddd3976476a100c52dd13))
* **aidd-orchestrator:** make audit + finalize self-verifying ([8972d86](https://github.com/ai-driven-dev/aidd-framework/commit/8972d8676c6087ad1ff766c3a83bc9f36862b165))
* **aidd-orchestrator:** outcome decided by observation, not by the agent ([4273e0e](https://github.com/ai-driven-dev/aidd-framework/commit/4273e0e704f26e1228d0dfdf00a857c3164e4c3c))
* **aidd-orchestrator:** scheduling defaults to Desktop (1min min); cloud routine min 1h ([6005096](https://github.com/ai-driven-dev/aidd-framework/commit/6005096ff007d568a2f68862811cc4259f156291))
* **aidd-orchestrator:** sdlc owns push + PR; orchestrator dictates the contract and verifies ([840c248](https://github.com/ai-driven-dev/aidd-framework/commit/840c2489eaf63cb822f9f3ab5db06fabcaaebf13))
* **aidd-orchestrator:** self-verifying audit + finalize ([8f45f13](https://github.com/ai-driven-dev/aidd-framework/commit/8f45f13abbe08dccc63666794efa25d22697f334))
* **aidd-orchestrator:** skip audit push when no PR; drop orphan .json on main ([9e9dca4](https://github.com/ai-driven-dev/aidd-framework/commit/9e9dca4e5d3645ddf592fc97b1129c034feb8870))
* **aidd-orchestrator:** unbreak workflow YAML (alias parsing on marker bodies) ([243f234](https://github.com/ai-driven-dev/aidd-framework/commit/243f234f02322658b17d96330d5dd6f06d927892))
* **aidd-orchestrator:** YAML post-step observes reality when agent forgets ([e24d6a6](https://github.com/ai-driven-dev/aidd-framework/commit/e24d6a66ca4c17083daa5a4dec69f3160bfb10d4))
* **aidd-orchestrator:** YAML post-step observes reality when agent forgets ([c3a3405](https://github.com/ai-driven-dev/aidd-framework/commit/c3a3405fc9b894aa015096e81d4623d0a16ec5c1))
* **framework:** correct slash command naming in docs ([adad60a](https://github.com/ai-driven-dev/aidd-framework/commit/adad60aacaa120f3abf55100625bed7a3a87a50a))
* **orchestrator:** enforce SDLC delegation + persist audit log on PR branch ([8f5ed79](https://github.com/ai-driven-dev/aidd-framework/commit/8f5ed799b9b00126331d0673e27b3460984e4cae))


### Miscellaneous

* **ci:** SHA-pin every external action and add CodeQL workflow ([66d5fcf](https://github.com/ai-driven-dev/aidd-framework/commit/66d5fcf99776df2885a84b2ef70943ff63099748))
* **framework:** bulk alignment  evals everywhere, em-dash purge, audit template, stale refs fixed ([0dfd79d](https://github.com/ai-driven-dev/aidd-framework/commit/0dfd79dac5ce7f15194b4aa9b58b5dd61fdf14b6))
* **framework:** bump aidd-pm to 1.0.0 and apply audit fixes ([97573bc](https://github.com/ai-driven-dev/aidd-framework/commit/97573bcf1b7624f6cf1acaa62791b9cdbe1b237b))
* **framework:** regenerate plugin catalogs after audit sweep ([448b111](https://github.com/ai-driven-dev/aidd-framework/commit/448b111662335197c9e4e415db391fc4e8d5c79f))
* **framework:** release as 4.0.0 ([5b0fc9d](https://github.com/ai-driven-dev/aidd-framework/commit/5b0fc9d9116e37abe7ef5dbb5d06438f607475e8))
* **framework:** self-host summarize-markdown.mjs for per-plugin CATALOG ([ee62862](https://github.com/ai-driven-dev/aidd-framework/commit/ee6286237d3b1b97ebaf67aa68f8152015d61e90))
* **framework:** trigger ci recheck after history rewrite ([391760e](https://github.com/ai-driven-dev/aidd-framework/commit/391760e19eb69fe80e098c3aefc3c527cda2169a))


### Documentation

* **aidd-context:** refresh descriptions to cover all seven generated artifacts ([8cbb5a2](https://github.com/ai-driven-dev/aidd-framework/commit/8cbb5a2d6d5b5e5f51aa125cf2066f1322b987fd))
* **aidd-context:** refresh descriptions to cover the seven generated artifacts ([b1bef44](https://github.com/ai-driven-dev/aidd-framework/commit/b1bef44b87d6e02d071b75ce513dfbf0f881a547))
* **aidd-orchestrator:** rewrite README with full local + remote coverage ([ac3b47e](https://github.com/ai-driven-dev/aidd-framework/commit/ac3b47ebe33cdaa58b036750df7142c271300339))
* **framework:** add per-plugin CATALOG.md (auto-generated) ([d613282](https://github.com/ai-driven-dev/aidd-framework/commit/d61328242639bb77909055019629b1da3891bffc))
* **orchestrator:** add async-dev lifecycle state diagram to run skill README ([ac4c867](https://github.com/ai-driven-dev/aidd-framework/commit/ac4c8672159549ef8d4e85141f8beabe75c36271))
* **orchestrator:** align README with sibling plugin pattern + add to framework catalog ([7c62edd](https://github.com/ai-driven-dev/aidd-framework/commit/7c62edde873b94e046a94517833100eec35feddc))
* **orchestrator:** restructure plugin and per-skill READMEs ([cb841de](https://github.com/ai-driven-dev/aidd-framework/commit/cb841def85c91905d137820ac3e9467d217f5da4))
* phase 1 critical audit fixes (skill invocations, catalog, templates) ([5b5342b](https://github.com/ai-driven-dev/aidd-framework/commit/5b5342b890ae0be4eb8302fd36e5a4d8882b9cbb))
* phase 2 high-severity audit fixes (security, lefthook, accuracy) ([95f29c3](https://github.com/ai-driven-dev/aidd-framework/commit/95f29c33c6a523166eaf09e0293000ee356a27dd))
* phase 3 medium/low audit fixes (OSS scaffolding, UX, accuracy) ([5e43650](https://github.com/ai-driven-dev/aidd-framework/commit/5e436502d7632b377f73129cfb73d312c3eea9ce))
* propagate per-skill README pattern across all plugins ([4427e3e](https://github.com/ai-driven-dev/aidd-framework/commit/4427e3ee7c096d03f7d7b30d418f3484e9d0541a))


### Refactoring

* **aidd-orchestrator:** observe-reality + YAML-owned lifecycle ([5b64b4a](https://github.com/ai-driven-dev/aidd-framework/commit/5b64b4aef9cb77898244ca8c81d539bc46473760))
* **aidd-orchestrator:** observe-reality verification + YAML-owned lifecycle ([d193b99](https://github.com/ai-driven-dev/aidd-framework/commit/d193b9935a5a8d318c6432aa1d587793c9d7114f))
* **framework:** canonical action shape, model-A rules, plugin audit sweep ([29ef579](https://github.com/ai-driven-dev/aidd-framework/commit/29ef579a683302c28f23de383acc1912ebcfe01e))
* **plugin:** rename aidd-async-dev to aidd-orchestrator ([4cb0f71](https://github.com/ai-driven-dev/aidd-framework/commit/4cb0f71d1beaf6d991d71a4d73405b3a3357c6c3))
* **plugin:** suffix skill names with -async-dev for self-documentation ([c19a5a4](https://github.com/ai-driven-dev/aidd-framework/commit/c19a5a4c5ade09f129158defb3899e63d2598a6b))
</details>

<details><summary>aidd-refine: 1.0.0</summary>

## [1.0.0](https://github.com/ai-driven-dev/aidd-framework/compare/aidd-refine-v1.0.0...aidd-refine-v1.0.0) (2026-05-19)


### Features

* **aidd-refine:** add shadow-areas gap analyzer skill + evals CI ([0a731ad](https://github.com/ai-driven-dev/aidd-framework/commit/0a731adce448786520701a64d69ed0af24994087))
* **framework:** refactor to marketplace plugin architecture and skills ([27128a9](https://github.com/ai-driven-dev/aidd-framework/commit/27128a96314904b7b57b0bc419e4d29b7a7edaf0))


### Bug Fixes

* **framework:** correct slash command naming in docs ([adad60a](https://github.com/ai-driven-dev/aidd-framework/commit/adad60aacaa120f3abf55100625bed7a3a87a50a))


### Miscellaneous

* **aidd-refine:** clean up shadow-areas evals and catalog ([f577db6](https://github.com/ai-driven-dev/aidd-framework/commit/f577db65837b9e59617526f4dd055d3f7147bef7))
* **ci:** SHA-pin every external action and add CodeQL workflow ([66d5fcf](https://github.com/ai-driven-dev/aidd-framework/commit/66d5fcf99776df2885a84b2ef70943ff63099748))
* **framework:** bump aidd-pm to 1.0.0 and apply audit fixes ([97573bc](https://github.com/ai-driven-dev/aidd-framework/commit/97573bcf1b7624f6cf1acaa62791b9cdbe1b237b))
* **framework:** merge feat/readme-wow into main ([8f42cfc](https://github.com/ai-driven-dev/aidd-framework/commit/8f42cfc067dd973d0d689593a59da0582f2168e6))
* **framework:** regenerate plugin catalogs after audit sweep ([448b111](https://github.com/ai-driven-dev/aidd-framework/commit/448b111662335197c9e4e415db391fc4e8d5c79f))
* **framework:** release as 4.0.0 ([5b0fc9d](https://github.com/ai-driven-dev/aidd-framework/commit/5b0fc9d9116e37abe7ef5dbb5d06438f607475e8))
* **framework:** self-host summarize-markdown.mjs for per-plugin CATALOG ([ee62862](https://github.com/ai-driven-dev/aidd-framework/commit/ee6286237d3b1b97ebaf67aa68f8152015d61e90))
* **framework:** trigger ci recheck after history rewrite ([391760e](https://github.com/ai-driven-dev/aidd-framework/commit/391760e19eb69fe80e098c3aefc3c527cda2169a))


### Documentation

* **framework:** add per-plugin CATALOG.md (auto-generated) ([d613282](https://github.com/ai-driven-dev/aidd-framework/commit/d61328242639bb77909055019629b1da3891bffc))
* phase 1 critical audit fixes (skill invocations, catalog, templates) ([5b5342b](https://github.com/ai-driven-dev/aidd-framework/commit/5b5342b890ae0be4eb8302fd36e5a4d8882b9cbb))
* phase 2 high-severity audit fixes (security, lefthook, accuracy) ([95f29c3](https://github.com/ai-driven-dev/aidd-framework/commit/95f29c33c6a523166eaf09e0293000ee356a27dd))
* phase 3 medium/low audit fixes (OSS scaffolding, UX, accuracy) ([5e43650](https://github.com/ai-driven-dev/aidd-framework/commit/5e436502d7632b377f73129cfb73d312c3eea9ce))
* propagate per-skill README pattern across all plugins ([4427e3e](https://github.com/ai-driven-dev/aidd-framework/commit/4427e3ee7c096d03f7d7b30d418f3484e9d0541a))


### Refactoring

* **framework:** canonical action shape, model-A rules, plugin audit sweep ([29ef579](https://github.com/ai-driven-dev/aidd-framework/commit/29ef579a683302c28f23de383acc1912ebcfe01e))
* **framework:** extract meta-cognition skills into dedicated plugin ([2bf0b6e](https://github.com/ai-driven-dev/aidd-framework/commit/2bf0b6e5e8cb2d300808332cbe68af626d72009f))
</details>

---
This PR was generated with [Release Please](https://github.com/googleapis/release-please). See [documentation](https://github.com/googleapis/release-please#release-please).