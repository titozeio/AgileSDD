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

None

## Priority Plan

None

## TODO Tasks

- [x] Run a final end-to-end npm installation check against the published `0.2.0` release.
- [x] Review the current scaffold docs set and identify the minimum improvements for new projects.

- [ ] Multi-agents approach for AgileSDD
- [ ] Revisit whether additional skills should be added later, keeping the scaffold lean.

## Tasks Done

- [x] Implement the install-time skill picker with `none` / `manual` / `auto` modes and `--no-skills`.
- [x] Define and document the `auto` policies for `grill-me` and `zoom-out`.
- [x] Define the manual trigger and stop condition for `grill-me` during `spec` and `plan`.
- [x] Define the manual trigger and stop condition for `zoom-out` before `implement`.
- [x] Define the manual trigger for `tdd` with `/tdd`.
- [x] Confirmed the upstream `mattpocock/skills` repo uses the MIT license.
- [x] Added a scaffolded `README.md` so the installed project also carries the skills credit note.
- [x] Added setup notes for the recommended skills bundle and its manual triggers.
- [x] Incorporate useful skills well known in the communtiy to the template folder (trying to follow the lean phyloshophy above all else).
- [x] Define which skills are core, optional, or omitted for the lean scaffold.
- [x] Decide the minimal install-time setup for opting into skills.
- [x] Confirmed the scaffold structure and documentation baseline.
- [x] Identified that `bin/` needed an explicit exception in `.gitignore`.
- [x] Added a repo-level worklog to keep execution notes separate from scaffold output.
- [x] Keep the installable CLI and package smoke tests working.
- [x] Keep the packaging checks easy to run before publication.
- [x] Keep the base templates aligned with the scaffold product.
- [x] Avoid mixing product output with repo execution notes.
- [x] Added a minimal curated skills bundle to the scaffold with recursive template copying.
- [x] Agreed that skills should be opt-in at install time rather than forced by default.
- [x] Agreed that `grill-me` and `zoom-out` support `none` / `manual` / `auto`, while `tdd` supports `none` / `manual`.
- [x] Added install-time prompts and generated skill metadata to reflect the selected modes.



