# AGENTS Constitution

This repository contains the distributable SDD Agile starter and CLI scaffold.

## Non-Negotiables

- Read `AGENTS.md` and `docs/ROADMAP.md` first in every new chat or agent start.
- Treat docs as the source of truth.
- Keep docs minimal. If something is not needed for the current task, do not load it.
- Update documentation before changing behavior that affects the documented contract.
- Prefer small, reusable skills and small, focused specs.
- Use MCP tools only when they add real value.
- Git flow is managed by developers, not agents, unless the developer explicitly asks otherwise.

## Navigation Rule

Load only the minimum context required:

- Start with `AGENTS.md`.
- Then inspect `docs/ROADMAP.md`.
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

## Product Shape

This repository should evolve into a package that can be installed into another project and asked to scaffold the SDD Agile workflow.

Typical entry points should feel like:

- `npm create ...`
- `npx ...`
- `bunx ...`

The package should generate or update the target project's docs and starter structure, not depend on this repo being the runtime home of the workflow.

## EPIC00 Bootstrap Rule

If `docs/ROADMAP.md` starts at `EPIC00`, the project is still bootstrapping.

In that case, complete the foundation first:

- `AGENTS.md`
- `docs/ARCHITECTURE.md`
- `specs/SPECS.md`
- `docs/ROADMAP.md`

Only after that should normal epic work continue.
