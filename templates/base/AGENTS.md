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
- Use MCP tools only when they add real value.
- Git flow is managed by developers, not agents, unless the developer explicitly asks otherwise.
- Be honest: when something is not achievable, ask the developer with a focused question or provide a similar alternative, dont try to implement it.

## Navigation Rule

Load only the minimum context required:

- Start with  `docs/ROADMAP.md`.
- Then open only the epic/spec files needed for the current task.
- Do not open unrelated specs, plans, or tasks.
- Load `skills/grill-me/SKILL.md`, `skills/zoom-out/SKILL.md`, or `skills/tdd/SKILL.md` only when the task clearly calls for them.

## Workflow

The default cycle is:

`Spec -> Plan -> Tasks -> Implement -> Tests -> Review`

Rules:

- Work on one epic and one user story at a time unless the developer asks otherwise.
- If an epic changes during execution, update docs first.
- If a task is blocked by missing information, ask the developer with a focused question.

## Roles

- Product Manager agents may work in `spec`, `plan`, `tasks`, and `review`.
- Developer agents may work only in `implement` and `tests` for assigned tasks.
- The developer owns final approval, especially for changes that affect scope or behavior.

