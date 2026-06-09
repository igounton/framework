# 02 - Design

Describe a frontend page's design before code - its components and their behavior, the dumb/smart split, the render decision - then write the **delegation prompt** that tells the implementer how to build it.

This action describes and delegates. It writes no code, and (running under the `planner`) it does **not** spawn the implementer - the implementation side launches it with the prompt written here.

## Input

The page or feature to design (free text). Nothing else.

## Output

The page, **described**: what it is, its components and their behavior, the dumb/smart split. Plus a bullet list (or small table) of the elements covered, and the delegation prompt for the implementer.

## Process

1. **Describe the page.** Purpose, sections, components. Per component, its behavior (states + transitions) - the SMART layer, owned in-house.
2. **Dumb/smart split.** Mark the **presentational (dumb)** components - props in, UI out, no data/logic/routing/state. Their visual is delegated to the design tool; its `shape` defines the visual behaviors (one line, not re-specified here).
3. **Render decision.** Ask the user once: see the page rendered, or not?
4. **Write the delegation prompt** for the implementer. It must:
   - Build the smart layer in-house per the behaviors above.
   - Author each dumb component's visual by calling the design tool with quotes: `Use skill "impeccable" with "shape <component> - dumb/presentational, props only, tokens from DESIGN.md"`.
   - If render was requested, run under `/goal` (`aidd-dev:09-for-sure`): loop build ↔ `Use skill "impeccable" with "critique <page>"` until **zero P0**, then explicit user OK.
5. **Present** the description + element list + delegation prompt. Wait for an explicit OK before exiting.

## Test

The page is described with its components and their behavior; the dumb components are marked; the render decision is recorded; and a delegation prompt exists that builds the smart layer in-house and delegates each dumb visual to the design tool via quoted skill calls.
