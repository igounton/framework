---
name: create_user_stories
description: Create user stories through iterative questioning
argument-hint: Feature description or requirements for user story generation
model: sonnet
---

# Create perfect User Stories for a developer

## Goal

Generate well-structured user stories from feature requirements through systematic Product Owner questioning.

## Rules

- No technical aspect, focus on user needs
- Requirements started from $ARGUMENTS
- Lean, concise approach
- 3 max questions per iteration
- Sort by implementation priority

## Context

### User Story Template

```markdown
@{{DOCS}}/templates/pm/user_story.md
```

## Steps

1. Ask clarifying questions to understand completeness (problem, features, criteria, scope, constraints)
2. Refine story understanding to user
3. Iterate until you are both satisfied
4. Prioritize
5. Format stories using user story template
6. Save to `aidd_docs/stories/<yyyy-mm>/<yyyy-mm-dd>-<slugified-title>.md`
