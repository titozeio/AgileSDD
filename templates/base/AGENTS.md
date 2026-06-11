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

- Start with `docs/ROADMAP.md`.
- Use `docs/GLOSSARY.md` for shared shorthand like `PM`, `US`, and `epic`.
- Then open only the epic/spec files needed for the current task.
- Do not open unrelated specs, plans, or tasks.
- Load `skills/grill-me/SKILL.md`, `skills/zoom-out/SKILL.md`, or `skills/tdd/SKILL.md` only when the task clearly calls for them.

## Workflow

The default cycle (sprint) is:

`Spec -> Plan -> Tasks -> Implement -> Review`

Rules:

- Work on one epic per sprint and then one user story at a time unless the developer asks otherwise.
- If an epic, user story or task changes during execution, update docs first.
- If a task is blocked by missing information, ask the developer with a focused question.
- Act as a senior product manager / project manager during `spec`, `plan`, `tasks`, and `review` using best practices of the Agile methodology.

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

- Check whether `specs/EPICXX/PLAN.md` already exists and check its status (`WIP` or `closed`).
- If the plan does not exist yet, create it from the approved spec and ask the PM if he wants a draft.
- If the plan is `WIP`, report the current state to the PM and ask for next steps.
- Keep the plan at the user-story level; do not split into tasks yet.
- Record the user story order, dependencies, open questions, and PM approval.
- Use `grill-me` only when the plan still needs more clarification before it can be approved.
- When the plan is approved, mark it as `closed` and mark the epic as `tasks` in `docs/ROADMAP.md`.

Tasks phase:

- Check whether `specs/EPICXX/TASKS.md` already exists and check its status (`WIP` or `closed`).
- If the tasks file does not exist yet, create it from the approved plan and ask the PM if he wants a draft.
- If the tasks file is `WIP`, report the current state to the PM and ask for the next step.
- Split each approved user story into small, actionable tasks that can be tracked independently.
- Keep every task traceable to a specific user story and avoid inventing new scope.
- If a user story cannot be split cleanly, tell the PM what is missing or unclear.
- When the task breakdown is ready, mark it as `closed` and mark the epic as `implement` in `docs/ROADMAP.md`.

Implement phase:

- Check the next task in `specs/EPICXX/TASKS.md`.
- If the next task is `WIP` or `blocked`, ask the PM for next steps.
- If the next task is `pending`, provide a short implementation plan to the PM, refine it until approved, then execute it.
- Make the smallest useful change for the task.
- Add and run the necessary tests or verification checks while implementing, and fix issues before moving on.
- If the skill `tdd` is  set as auto, invoke it to help you refine tests. This skill can also be invoked by the user manually. 
- Once implemented, add or update comments for new or changed methods when needed.
- Once the task is done and verified, ask the PM for permission to mark it as `[T]` (tests passed).
- Once a task is marked as `[T]`, proceed with the next task.
- Once all the tasks of a user story are marked as `[T]`, move to the first task of the next user story.
- When all tasks of all user stories are finished, ask the PM for permission to finish the implementation phase.
- If permission is granted, mark the epic as `review` in `docs/ROADMAP.md` and proceed to the next phase.

Review phase:

- Check the next task in `specs/EPICXX/TASKS.md` that is still marked as `[T]`.
- Ask the PM to do a human/manual review of the task. Mark it as `[R]`.
- Make any changes or fixes required by the PM until the task is approved. Then mark it as `[x]` done.
- When all tasks are marked as `[x]`, the implementation and review cycle is finished.
- Ask the PM if the epic can be closed. When confirmation is granted, mark the epic as `done` in `docs/ROADMAP.md`.
- Locate the next epic, mark it as `spec` and proceed with a new sprint with that epic.
- If there are no epics left, ask the PM for next steps. Any new epic created as a result of that consultation should be marked as `new`.
- Once the first newly created epic is ready, mark it as `spec` and proceed with the next sprint.

Blocked tasks:

- If at any point during implementation or review a task cannot move forward because of a blocker, consult with the PM about marking it as `[!]` blocked.
- If that happens, locate the task that is blocking it and give it the highest priority to be solved next.
- If the blocking issue has no task associated in this epic, create it and give it the highest priority.
- If a blocked task prevents progress in the current phase, return to `implement` after the blocker is resolved.

## Roles

- Product Manager agents may work in `spec`, `plan`, `tasks`, and `review`.
- Developer agents may work only in `implement` for assigned tasks.
- The developer owns final approval, especially for changes that affect scope or behavior.
