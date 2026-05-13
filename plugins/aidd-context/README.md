# aidd-context

Knowledge production plugin for the AI-Driven Development framework.

Covers project bootstrap, project initialisation, context generation, Mermaid diagrams, learning, discovery, and a state-aware onboarding loop.

## Skills

| Bracket ID | Skill          | Description                                                                                                                                                     |
| ---------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1.0]      | onboard        | Detect the project's aidd-context state and guide the user to ONE next aidd-context action through a state -> recommend -> execute loop.                       |
| [1.1]      | bootstrap      | Imagine and validate the technical architecture of a new SaaS through interactive Q&A, candidate-stack comparison, multi-agent audit, and an INSTALL.md output. |
| [1.2]      | project-init   | Initialize project memory bank and scaffold the rules directory structure.                                                                                      |
| [1.3]      | generate-skill | Generate and maintain router-based Claude Code skills.                                                                                                          |
| [1.4]      | mermaid        | Generate high-quality Mermaid diagrams from markdown content using a structured plan-validate workflow.                                                         |
| [1.5]      | learn          | Capture and store learnings from recently implemented features into memory bank, decisions, or coding rules.                                                    |
| [1.6]      | discovery      | Help users discover installed skills and find the right one for their use case.                                                                                 |

## Onboarding

New to aidd-context, or unsure what to run next? Invoke `aidd-context:00:onboard`. The skill:

1. Probes the filesystem (no questions) to snapshot what already exists - `aidd_docs/`, memory bank, rules skeleton, the `<aidd_project_memory>` block in your AI context file.
2. Picks ONE next aidd-context skill from the state matrix and presents a 5-option numbered menu (run / explain / handoff / swap / stop).
3. Loops back to detection after each execution so the recommendation always reflects current state.

The onboard skill is scoped to aidd-context only. Cross-plugin global walkthroughs live elsewhere in the framework.
