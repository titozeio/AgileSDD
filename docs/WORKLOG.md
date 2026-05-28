# Worklog

Short repo-level tracking for the scaffold itself.

`templates/base/` contains the files that will be installed into a target project. This worklog is only for this repository's own progress.

Status legend:

- `[ ]` pending
- `[-]` in progress
- `[x]` done
- `[!]` blocked

## Current Goal

Keep the scaffold source and the generated scaffold output clearly separated.

## Current Focus

- [ ] Keep the installable CLI and package smoke tests working.
- [ ] Keep the packaging checks easy to run before publication.
- [ ] Keep the base templates aligned with the scaffold product.
- [ ] Avoid mixing product output with repo execution notes.

## Done

- [x] Confirmed the scaffold structure and documentation baseline.
- [x] Identified that `bin/` needed an explicit exception in `.gitignore`.
- [x] Added a repo-level worklog to keep execution notes separate from scaffold output.

## Next

- [ ] Verify the packaged CLI can scaffold a target project end to end.
- [ ] Then continue with the next product epic when the bootstrap is stable.

## Publication Checklist

- [ ] Update `package.json` metadata with the real repository, homepage, and bugs URLs.
- [ ] Run `npm test`.
- [ ] Run `npm run pack:check`.
- [ ] Run the packaged CLI smoke test.
- [ ] Confirm the tarball contents only include the expected files.
- [ ] Publish the package when the checks are green.
