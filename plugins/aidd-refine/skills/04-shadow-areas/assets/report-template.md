---
source: <source_path>
generated_at: <generated_at>
# status: clean
---

# Shadow Areas Report

Source: `<source_path>`
Generated: `<generated_at>`

Total gaps: <total_count> | Blocker: <blocker_count> | Major: <major_count> | Minor: <minor_count>

---

## Warnings

- <warning text>

---

## Gaps by Category

### unstated assumption

No gaps in this category.

### ambiguous term

No gaps in this category.

### missing edge case

No gaps in this category.

### missing actor

No gaps in this category.

### missing failure mode

No gaps in this category.

### missing acceptance criterion

No gaps in this category.

### missing dependency

No gaps in this category.

<!-- DIFF-MODE EXAMPLE (rendered only when 03-diff output is passed to 02-render-report)

When `diff` is supplied the flat list per category is replaced by three named subsections.
Empty subsections are omitted. Category headings with zero entries across all three subsets are also omitted.

### unstated assumption

#### Closed

**[major]** Is the retry limit configurable by the caller?
> retry_limit = env.get("RETRY_LIMIT", 3)

#### Still Open

**[blocker]** What happens when the upstream service returns 429 with no Retry-After header?

#### Newly Introduced

**[minor]** Does the default timeout apply to streaming responses or only to connection establishment?

END DIFF-MODE EXAMPLE -->
