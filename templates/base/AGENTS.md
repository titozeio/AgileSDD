# AGENTS Constitution

This project follows a lean, docs-first SDD Agile workflow.

## Non-Negotiables

- Read `docs/ROADMAP.md` first in every new chat or agent start.
- Treat docs as the source of truth.
- Keep docs minimal. If something is not needed for the current task, do not load it.
- Update documentation before changing behavior that affects the documented contract.
- Prefer small, reusable skills and small, focused specs.
- Use the curated skills in `skills/` only when they match the current task.
- If `skills/README.md` exists, read it before individual skill files.
- `auto` skills may be used proactively when the task clearly matches their policy.
- `manual` skills should only be loaded when the user asks for them or when the task clearly calls for them.
- `/grillme` is the manual trigger for the clarification skill.
- If the user asks to close `spec` or `plan`, stop using `grill-me` for that artifact.
- `/zoomout` is the manual trigger for the pre-implementation consistency review.
- If the user asks to move on to `implement`, stop using `zoom-out` for that artifact.
- `/tdd` is the manual trigger for the test-driven implementation skill.
- Use MCP tools only when they add real value.
- Git flow is managed by developers, not agents, unless the developer explicitly asks otherwise.
- Be honest: when something is not achievable, ask the developer with a focused question or provide a similar alternative, dont try to implement it.

## Navigation Rule

Load only the minimum context required:

- Start with  `docs/ROADMAP.md`.
- Use `docs/GLOSSARY.md` for shared shorthand like `PM`, `US`, and `epic`.
- Then open only the epic/spec files needed for the current task.
- Do not open unrelated specs, plans, or tasks.
- Load `skills/grill-me/SKILL.md`, `skills/zoom-out/SKILL.md`, or `skills/tdd/SKILL.md` only when the task clearly calls for them.

## Workflow

The default cycle (sprint) is:

`Spec -> Plan -> Tasks -> Implement -> Tests -> Review`

Rules:

- Work on one epic per sprint and then one user story at a time unless the developer asks otherwise.
- If an epic, user story or task changes during execution, update docs first.
- If a task is blocked by missing information, ask the developer with a focused question.

Spec phase:

- Check whether the current epic already exists and whether a spec draft is already in place.
- If the epic is incomplete, report the current state to the PM and ask for the next step.
- If the epic does not exist yet, define the epic and its user stories with the PM.
- Write user stories in the form `As a X, I want Y, so I can Z` when possible.
- If the PM does not use that format, rewrite it when it is safe to do so.
- If the story cannot be rewritten safely, tell the PM what is missing or unclear.
- Use `grill-me` only when the epic still needs more clarification before the spec is ready.
- When the spec is agreed with the PM, mark the epic as `plan` in `docs/ROADMAP.md`.

Plan phase:

- Check whether `specs/EPICXX/PLAN.md` already exists and chek it´s status (`WIP` or `closed`)
- If the plan is `WIP`, report the current state to the PM and ask for the next step.
- If the plan does not exist yet, create it from the approved spec.
- Keep the plan at the user-story level; do not split into tasks yet.
- Record the user story order, dependencies, open questions, and PM approval.
- Use `grill-me` only when the plan still needs more clarification before it can be approved.
- When the plan is approved, mark it as `closed` and mark the epic´s status as `tasks` in `docs/ROADMAP.md`.

## Roles

- Product Manager agents may work in `spec`, `plan`, `tasks`, and `review`.
- Developer agents may work only in `implement` and `tests` for assigned tasks.
- The developer owns final approval, especially for changes that affect scope or behavior.
