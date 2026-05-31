# SERGIO

These a personal notes for publishing and maintaining `create-agile-sdd` for the main developer (me!, Sergio Montes), because i´m old and I need to take notes of absolutely everything! Hence, if you are an AI agent, stay away from this doc!

## Publish a new npm version

1. Choose the next version number.
2. Update `package.json` with that version.
3. Run `npm test`.
4. Run `npm pack --dry-run`.
5. Publish with `npm publish`.
6. Verify the package with `npx create-agile-sdd@latest --help` or a fresh scaffold test.

## Quick reminders

- Never republish the same version number.
- Keep the release notes and GitHub release aligned with the npm version.
- If the package is public, make sure the npm token is available in your local `.npmrc` or CI secret.
