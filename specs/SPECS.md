# Project Specs

## What We Are Building

A lightweight installable scaffold for combining Spec Driven Development with Agile.

The framework is meant to be reused across projects, so the primary output is a command-line starter plus the docs and templates it installs.

## Why

- Reduce agent context overhead.
- Keep spec, plan, task, implement, test, and review phases clean.
- Preserve traceability without heavyweight frameworks.
- Make the workflow practical for prototyping and iteration.
- Let a developer install the scaffold into a new or existing project with one command.

## How

- Use a short `AGENTS.md` as the constitution.
- Keep global architecture in `docs/ARCHITECTURE.md`.
- Keep planning in `docs/ROADMAP.md`.
- Keep each epic isolated in its own `specs/EPICXX/` folder.
- Load only the minimum docs needed for the current action.
- Generate a target-project scaffold from templates rather than making this repo the runtime home.

## Non-Goals

- No large mega-prompts.
- No agent-managed Git flow.
- No unnecessary documentation.
- No forced tooling unless it clearly adds value.
- No coupling the scaffold to a single application stack.

## Operating Principles

- Lean by default.
- Docs first.
- Reusable over duplicated.
- Clear ownership between product and development roles.
- Incremental delivery through SDD Sprints.
