# AGENTS Constitution

This project follows a lean, docs-first SDD Agile workflow.
First of all, read and load `docs/GLOSSARY.md`.

## Roles

- AI Agents work as advisors during work in `spec`, `plan`, `tasks`, and `review`.
- AI agents may work only in `implement` for assigned tasks.
- The human developer (PM) owns final approval, especially for changes that affect scope or behavior.
  
## Non-Negotiables

- In every new chat or agent start, follow the navigation rule (at the end of this document), only after you have loaded this whole document (and any other doc you are instructed to read in this one) in your context.
- Treat docs as the source of truth.
- Keep docs minimal. If something is not needed for the current task, do not load it.
- Update documentation before changing behavior that affects the documented contract.
- Load only the minimum context required for the current work
- Open only the epic/spec files needed for the current work.
- Do not open unrelated specs, plans, or tasks.
- Prefer small, reusable skills and small, focused specs.
- Use the curated skills in `skills/` only when they match the current work.
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
- If a task requires defining business content, product scope, or domain specifics that are not already documented, pause and ask the PM instead of drafting assumptions.
- Before marking a task as ready for review, add comments to the main methods or functions when they improve readability, and add the relevant unit tests for the changed behavior.
- **Project Bootstrapping (EPIC0):** During the initialization of a new project, the agent **must not** use the pre-existing scaffold files, template files, `README.md`, or `package.json` to infer or guess the target project's business specs, architecture, or roadmap. These files are template placeholders. The agent **must** pause and run an interactive Q&A session with the PM (using `grill-me` or via chat) before editing or creating `specs/SPECS.md`, `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, or `AGENTS.md`.
- The agent may draft only when the required inputs are already present in the target project's finalized docs or explicitly provided by the PM.
- When in doubt, ask before acting.

## Task prefixes legend:

- `[ ]` pending
- `[-]` in progress
- `[!]` blocked
- `[<]` ready for review
- `[>]` review in progress
- `[x]` done


`[Tn]` (after the status, for example, [ ] [T0]) : is the id of the task. (In the example, the id would be `T0`) 
`[Blocked by]` (list of task ids) : indicates which tasks are blocking this task (if any). (For example, `[Blocked by T0]`). 

## Workflow

The default cycle (sprint) is:

`Spec -> Plan -> Tasks -> Implement -> Review`

Rules:

- Work on one epic per sprint and then one user story at a time unless the developer asks otherwise.
- If an epic, user story or task changes during execution, update docs first.
- If a task is blocked by missing information, ask the developer with a focused question.
- Act as a senior product manager / project manager during `spec`, `plan`, `tasks`, and `review` using best practices of the Agile methodology.
- Follow the rules of each phase of the workflow strictly, and step by step. DO NOT RUSH. DO NOT MAKE ASSUMPTIONS. If any rule contradict another rule, ask the PM what to do.

Spec phase:

- **STEP 1**: Check whether the current epic already exists and whether a spec draft is already in place.
  - If the epic is incomplete, report the current state to the PM and ask for the next step. 
    - If he asks you to help him finish the epic, then proceed to step 2. 
    - Otherwise just follow the PM´s instructions.
  - If the epic does not exist yet, define the epic and its user stories with the PM.
- **STEP 2**: Write user stories in the form `As a X, I want Y, so I can Z` when possible.
  - If the PM does not use that format, rewrite it when it is safe to do so.
  - If the story cannot be rewritten safely, tell the PM what is missing or unclear.
  - Use `grill-me` only when the epic still needs more clarification before the spec is ready.
- **STEP 3**: When the spec is agreed with the PM, mark the epic as `plan` in `docs/ROADMAP.md`.

Plan phase:

- **STEP 1**: Check whether `specs/EPICX/PLAN.md` already exists and check its status (`WIP` or `closed`).
  - If the plan does not exist yet, create it from the approved spec and ask the PM if he wants yo to provide a draft.
    - If he agrees, proceed to step 2.
    - Otherwise just follow the PM´s instructions.
  - If the plan is `WIP`, report the current state to the PM and ask for next steps.
    - If he agrees, proceed to step 2.
    - Otherwise just follow the PM´s instructions.
- **STEP 2**: Present the PM with a plan, order the user stories by priority, keep the plan at the user-story level; do not split into tasks yet. 
  - Use `grill-me` only when the plan still needs more clarification before it can be approved.
  - Ask the PM for approval before recording it.
- **STEP 3**: Once approved, record the user story order, dependencies, open questions, and PM approval in `specs/EPICX/PLAN.md`, mark the plan as `closed` and mark the epic as `tasks` in `docs/ROADMAP.md`.

Tasks phase:

- **STEP 1**: Check whether `specs/EPICX/TASKS.md` already exists and check its status.
    - If the tasks file does not exist yet, create it from the approved plan and ask the PM if he wants a draft.
        - If he agrees, proceed to step 2.
        - Otherwise just follow the PM´s instructions.
    - If the file exists, but is empty or the staus is not `ready` , chnage its status to `WIP`, report the current state to the PM and ask if he wants you to create the tasks.
        - If he agrees, proceed to step 2.
        - Otherwise just follow the PM´s instructions.
- **STEP 2**: Elaborate a plan splitting each approved user story into small, actionable tasks.
    - Keep every task traceable to a specific user story and avoid inventing new scope.
    - If a user story cannot be split cleanly, tell the PM what is missing or unclear.
    - Once the plan is ready, present it to the PM and ask for approval. 
        - If he agrees, proceed to step 3.
        - Otherwise just follow the PM´s instructions.
- **STEP 3**: When the task breakdown is ready and approved by the PM, record it in `specs/EPICX/TASKS.md`, mark the task file as `ready` and mark the epic as `implement` in `docs/ROADMAP.md`.

Implement phase:

- **NOTES**: 
  - A pending task is not a permission to execute; it only means the task is next in order.
  - A task is considered implemented when it is marked as `[<]`, `[>]`, or `[x]`.
  - An implemented task is not a finished or done task. It may still need to be tested and/or reviewed and approved.
  - A finished/closed task is marked as `[x]`. That means it was implemented, tested, reviewed and approved by the PM.
- **STEP 1**: Check the next task in `specs/EPICX/TASKS.md`.
    - If the next task is `[-]`, check the affected files, stop, and proceed to step 2.
    - If the next task is `[ ]`, stop and proceed to step 2.
    - If the next task is `[!]`, stop and proceed with step2-blocked. 
    - If all tasks of all user stories are implemented, ask the PM for permission to finish the implementation phase.
      - If permission is granted, mark the epic as `review` in `docs/ROADMAP.md` and proceed to the next phase.  
      - If permission is not granted, just follow the PM´s instructions and keep iterating until you are given permission to proceed to the next phase.
- **STEP 2**: Mark the task as `[-]` and try to think of a plan to implement the task. Do not execute it yet.
    - If the task depends on missing product, scope, or tech-stack decisions, ask focused questions first and do not infer the missing details.
    - If, even after clarifying everything, you find out there is something blocking the task, stop and proceed to option step2-blocked. 
    - If the PM agrees with the plan, proceed to step 3.
    - If the PM doesn´t agree with the plan, just follow the PM´s instructions and keep iterating until you are given permission to proceed with step 3.
- **STEP 2-blocked**: (this step is not mandatory, it only happens when the task is blocked)
    - Mark the task as `[!][Blocked by]`. If there is not a list of blocking tasks for this task, check if there are any existing open tasks in this epic that would help resolve the blocking dependency. 
      - If they exist, place them right above this task in priority, and mark them in the list of blocking tasks of this task (for example, if this is T2 and it is blocked by T0 and T1, then it should look like: `[!][T2][Blocked by T0, T1]`). Report the blocking issue  to the PM, and wait for his instructions. 
      - If they do not exist, then report the problem to the PM and provide him with a list of tasks that you think would help resolve the blocking issue. If he agrees to them, then create those tasks, give them priority over this one, mark them as `[ ]`, mark them in the list of blocking tasks of this task, and tell the PM that they are ready to be worked on. Wait for his instructions.
    - If there is a list of blocking tasks for this task, check their status. If they are implemented, then delete the list of blocking tasks, and check if the task is no longer blocked.
      - If it is still blocked, then go back to step 2-blocked.
      - If it is no longer blocked, mark this task as `[ ]` and proceed to step 3. 
- **STEP 3**: Implement the task. To do so, take all this into account: 
    - Make the smallest useful change for the task.
    - Add and run the necessary tests or verification checks while implementing, and fix issues before moving on.
    - If the skill `tdd` is  set as auto, invoke it to help you refine tests. This skill can also be invoked by the user manually. 
    - Once the task is done, add or update comments for new or changed methods when needed, and implement any unit tests required. Specially focusing on edge cases.
    - Once the task is done, comments added/updated, and tests implemented, ask the PM for permission to mark it as `[<]` (ready for review).
      - If you got permission, mark it as `[<]` and proceed with the next task (go back to step 1).    
      - If not, then follow the PM´s instructions.

Review phase:

- **NOTES**: The review phase is not done over indidual tasks, but over User Stories. 
- **STEP 1**: Check the next task in `specs/EPICX/TASKS.md` that is not yet marked as `[>]` or `[x]`. 
  - if there´s at least one, then proceed to step 2.
  - If there are no such tasks,look for the next task marked as `[>]`. 
    - If there is at least one, locate the US corresponding to that task and proceed to step 3.
    - If there is no such task, proceed to step 5.
- **STEP 2**: Locate the US corresponding to that task, and mark all the tasks of the US as `[>]`, and proceed to step 3.
- **STEP 3**: Check if there are still pending tasks to be implemented in the US.
  - If there are, implement them (following the same rules as in step 3 of the implementation phase), and once done, go back to step 3 of this phase.
  - If there are no such tasks, proceed to step 4.
- **STEP 4**: Ask the PM to review the US. 
  - If he gives the OK, mark all the tasks of the US as `[x]` and go back to step 1. 
  - If not, listen to the PM´s feedback, provide him with a plan to address that feedback, and give these options: a) Proceed to implement that plan asap, b) Turn the plan into separate tasks, c) Address the plan in a future sprint.
    - If a, proceed to implement the provided plan, and once done, go back to step 4.
    - If b, Turn the plan into separate tasks, include them into the US being reviewed, mark them as `[ ]` and place them right after the last task of the US. Proceed to implement them (go back to step 3). 
    - If c, mark all the tasks of the US as `[x]`, ask the PM how and when in the roadmap soes he wnat to address it. Follow their instructions, and go back to step 1.
- **STEP 5**: If all the US and their tasks are marked as `[x]`, this means the epic is finished (and the sprint too). Ask the PM for final confirmation.
  - If the PM gives the confirmation, proceed to step 6.
  - If not, follow the PM´s instructions and go back to step 1.
- **STEP 6**: Mark the current epic as `done` in `docs/ROADMAP.md`, locate the next epic.
  - If there are no epics left, ask the PM for next steps. Any new epic created as a result of that consultation should be marked as `new`. Once the new epics  are ready (you have created the needed structure and incorporated them to the roadmap in the proper place), mark the next one as `spec` and proceed with the next sprint.
  - If there is at least one epic left, mark the next one as `spec` and proceed with a new sprint with that epic.


## Navigation Rule

- Once you are finished checking all the required documents (including this one) start with `docs/ROADMAP.md`.
- Check the current status of the sprint (in the `roadmap`, locate the current epic, and its status).
- Follow the steps corresponding to that phase for that epic.

