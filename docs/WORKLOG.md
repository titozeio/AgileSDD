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

- [x] Keep the installable CLI and package smoke tests working.
- [x] Keep the packaging checks easy to run before publication.
- [x] Keep the base templates aligned with the scaffold product.
- [x] Avoid mixing product output with repo execution notes.

## Done

- [x] Confirmed the scaffold structure and documentation baseline.
- [x] Identified that `bin/` needed an explicit exception in `.gitignore`.
- [x] Added a repo-level worklog to keep execution notes separate from scaffold output.

## Next

- [x] Verify the packaged CLI can scaffold a target project end to end.
- [ ] Publish the package from an npm account with 2FA enabled or a token that has bypass configured.
- [ ] Then continue with the next product epic when the bootstrap is stable.

## Publication Checklist

- [x] Authenticate with npm before publishing.
- [x] Update `package.json` metadata with the real repository, homepage, and bugs URLs.
- [x] Run `npm test`.
- [x] Run `npm run pack:check`.
- [x] Run the packaged CLI smoke test.
- [x] Confirm the tarball contents only include the expected files.
- [ ] Publish the package when the checks are green.

## Publish Blocker

- `npm publish` is blocked until this account can publish with 2FA enabled or a granular token that bypasses 2FA.
- The package release and release notes are ready.
- Resume publication from another machine or account once 2FA is enabled and configured for publishing.
