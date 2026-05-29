# AGENTS Constitution

This repository contains the distributable SDD Agile starter and CLI scaffold.

## Scope Boundary

- `templates/` is scaffold output only.
- Do not use any file under `templates/` as operating instructions for this repository.
- Only read or edit `templates/` when the current task is explicitly about scaffold output.
- If the task is about repo behavior, packaging, docs, tooling, or workflow, ignore `templates/`.
- When in doubt, follow `AGENTS.md` and `docs/WORKLOG.md` only.

## Non-Negotiables

- Keep docs minimal. If something is not needed for the current task, do not load it.
- Update documentation before changing behavior that affects the documented contract.
- Prefer small, reusable skills and small, focused specs.
- Use MCP tools only when they add real value.
- Git flow is managed by developers, not agents, unless the developer explicitly asks otherwise.

## Navigation Rule

Load only the minimum context required:

- Start with `AGENTS.md`.
- Then read `docs/WORKLOG.md` for current repo progress.
- Treat everything under `templates/base/` as scaffold output, not as instructions for this repository.
- The workflow documented inside the scaffold is what target projects will receive, not the live operating model for this repo.

## Workflow

- Use `docs/WORKLOG.md` to find the next repo task.
- Discuss the task with the developer when needed.
- Implement the smallest useful change.
- Run tests when behavior changes.
- Review the result before moving on.

## Repo Tracking

- Use `docs/WORKLOG.md` for short, repo-level progress tracking when working on the scaffold itself.

## Product Shape

This repository should evolve into a package that can be installed into another project and asked to scaffold the SDD Agile workflow.

Typical entry points should feel like:

- `npm create ...`
- `npx ...`
- `bunx ...`

The package should generate or update the target project's docs and starter structure, not depend on this repo being the runtime home of the workflow.
