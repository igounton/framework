# AI-Driven Dev Framework (AIDD)

A plugin marketplace for AI-driven development. Install focused skill sets into your AI coding assistant.

---

## Plugins

| Plugin | Skills | Purpose |
|--------|--------|---------|
| [aidd-context](plugins/aidd-context/README.md) | 8 | Project init, architecture, brainstorming, diagrams, discovery |
| [aidd-dev](plugins/aidd-dev/README.md) | 9 | SDLC loop — plan, assert, review, test, refactor, debug |
| [aidd-vcs](plugins/aidd-vcs/README.md) | 4 | Commits, pull/merge requests, release tags, issue creation |
| [aidd-pm](plugins/aidd-pm/README.md) | 3 | Ticket info, user stories, PRD (release candidate) |

---

## Install

```bash
# Install a single plugin
aidd plugin add aidd-dev --tool claude

# Install all recommended plugins
aidd plugin add --recommended --tool claude
```

Supported tools: `claude`, `cursor`, `copilot`, `opencode`.

---

## Documentation

Full documentation, flow guide, and skill catalog: [aidd_docs/README.md](aidd_docs/README.md)

Skills catalog: [aidd_docs/CATALOG.md](aidd_docs/CATALOG.md)

Contributing: [CONTRIBUTING.md](./CONTRIBUTING.md)

← [Back to main repo](https://github.com/ai-driven-dev/aidd/blob/main/README.md)
