# Third-party licenses

The AI-Driven Dev framework ships as prompt content (skills, agents, rules, commands, MCP configs, hooks, and templates) and carries no bundled runtime dependencies. The tooling used to
**develop, validate, and release** it is listed below with its license. None of
these are redistributed inside the release bundle (`plugins/`, `.claude-plugin/`);
they are developer-time only.

## Development dependencies (npm)

| Package | License | Purpose |
| ------- | ------- | ------- |
| [`lefthook`](https://github.com/evilmartians/lefthook) | MIT | Git hooks runner (pre-commit validation). |
| [`@commitlint/cli`](https://github.com/conventional-changelog/commitlint) | MIT | Conventional-commit message linting. |
| [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint) | MIT | Conventional-commit ruleset. |

## External tools invoked by hooks (not bundled)

These are expected on the contributor's machine and are not distributed with the
project. They keep their own licenses.

| Tool | License | Purpose |
| ---- | ------- | ------- |
| [`jq`](https://github.com/jqlang/jq) | MIT | JSON validity checks in pre-commit. |
| [`python3`](https://www.python.org/) | PSF | YAML validity checks in pre-commit. |
| [`check-jsonschema`](https://github.com/python-jsonschema/check-jsonschema) (via `pipx`) | Apache-2.0 | JSON-Schema validation of plugin/marketplace/settings files. |
| [`release-please`](https://github.com/googleapis/release-please) | Apache-2.0 | Automated releases (runs in CI). |

## Acknowledgements

This project targets [Claude Code](https://www.anthropic.com/) and the Anthropic
plugin marketplace model, and uses the
[Contributor Covenant](https://www.contributor-covenant.org/) for its Code of
Conduct and [SchemaStore](https://www.schemastore.org/) schemas for validation.
These are referenced, not redistributed.

> If you add a dependency that is redistributed in the release artifact, add it
> here with its license before merging.
