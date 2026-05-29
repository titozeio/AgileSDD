# AGENTS Constitution

This project follows a lean, docs-first SDD Agile workflow.

## Non-Negotiables

- Read `docs/ROADMAP.md` first in every new chat or agent start.
- Treat docs as the source of truth.
- Keep docs minimal. If something is not needed for the current task, do not load it.
- Update documentation before changing behavior that affects the documented contract.
- Prefer small, reusable skills and small, focused specs.
- Use MCP tools only when they add real value.
- Git flow is managed by developers, not agents, unless the developer explicitly asks otherwise.
- Be honest: when something is not achievable, ask the developer with a focused question or provide a similar alternative, dont try to implement it.

## Navigation Rule

Load only the minimum context required:

- Start with  `docs/ROADMAP.md`.
- Then open only the epic/spec files needed for the current task.
- Do not open unrelated specs, plans, or tasks.

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

