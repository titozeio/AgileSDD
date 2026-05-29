# Worklog

Short repo-level tracking for the scaffold itself.

`templates/base/` contains the files that will be installed into a target project. This worklog is only for this repository's own progress.
Do not use `templates/` as instructions for repo work; only use it when the task is explicitly about scaffold output.

Status legend:

- `[ ]` pending
- `[-]` in progress
- `[x]` done
- `[!]` blocked

## Current Goal

Turn the scaffold's default `AGENTS.md` and docs into a better starting point for new projects.

## Next steps

- [ ] Multi-agents approach for AgileSDD
- [ ] Check if we could add commands (for example "/AgileSDDNext") for agents in the projects with scaffolded code.

## TODO Tasks

- [ ] Review the current scaffold docs set and identify the minimum improvements for new projects.
- [ ] Draft a better default `AGENTS.md` for scaffolded projects.
- [ ] Improve the default docs in the scaffold so the first run feels clearer and more useful.
- [ ] Keep the docs set minimal while making it easier for new projects to start.
- [ ] Verify the updated scaffold still produces a clean starter layout.

## Tasks Done

- [x] Confirmed the scaffold structure and documentation baseline.
- [x] Identified that `bin/` needed an explicit exception in `.gitignore`.
- [x] Added a repo-level worklog to keep execution notes separate from scaffold output.
- [x] Keep the installable CLI and package smoke tests working.
- [x] Keep the packaging checks easy to run before publication.
- [x] Keep the base templates aligned with the scaffold product.
- [x] Avoid mixing product output with repo execution notes.



