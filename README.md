# AgileSDD

<a href="https://www.npmjs.com/" target="_blank"><img alt="npm" src="https://img.shields.io/badge/npm-package-CB3837?logo=npm&logoColor=white"/></a>
<a href="https://nodejs.org/" target="_blank"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white"/></a>
<a href="https://bun.sh/" target="_blank"><img alt="Bun" src="https://img.shields.io/badge/Bun-compatible-F9F1D9?logo=bun&logoColor=000000"/></a>
<a href="./AGENTS.md"><img alt="Docs-first" src="https://img.shields.io/badge/Docs--first-Lean%20workflow-1f2937?style=flat-square"/></a>

AgileSDD is a lean, installable starter for building software with a hybrid of Agile and Spec Driven Development.

The goal is not to force a heavy framework into every project. The goal is to give a developer a small, opinionated bootstrap that can be installed into a new or existing repo and immediately establish:

- a short `AGENTS.md` constitution
- lightweight architecture and roadmap docs
- a spec structure split by epic
- a repeatable `Spec -> Plan -> Tasks -> Implement -> Tests -> Review` loop

## Philosophy

AgileSDD is built around a few simple ideas:

- Keep context small. Agents should load only the docs they need.
- Keep docs as the source of truth. If something changes, the docs change first.
- Keep prompts and skills small. Reuse pieces, do not build mega-prompts.
- Keep the flow practical. The framework should help prototyping, not slow it down.
- Keep ownership clear. Developers manage Git flow and final approvals.

In short, AgileSDD is a "lean constitution + docs + workflow" approach to agent-assisted development.

## What It Installs

When published, this package will act like a create-style CLI that scaffolds the workflow into a target project.

Expected entry points:

- `npm create agile-sdd@latest <target-dir>`
- `npx create-agile-sdd <target-dir>`
- `bunx create-agile-sdd <target-dir>`
- `npx create-agile-sdd --yes <target-dir>`

For local development:

- `node .\bin\create-agile-sdd.cjs <target-dir>`

It generates the baseline docs and structure needed to start working with SDD Agile inside the destination project.

Behavior:

- If you run it in a terminal without enough information, it prompts for the missing target directory.
- If the target project already exists, it does not overwrite files unless you pass `--force`.
- Use `--yes` to skip confirmation prompts in automation-friendly runs.

## Core Docs

- `AGENTS.md`: the constitution for agents
- `docs/WORKLOG.md`: short repo-level execution tracking
- `templates/base/`: the default scaffold output installed into a target project

## Why This Exists

Most spec-driven frameworks are either too heavy, too verbose, or too eager to turn every project into a ritual. AgileSDD tries to stay useful when the project is still forming, when you want fast prototyping, and when you want agents to stay helpful instead of noisy while still feeling in control.

The target is a system that feels close to how a good product team actually works:

- a product-minded spec phase
- a planning phase that turns ideas into user stories
- a task phase that stays small and actionable
- an implementation and testing loop with room for review and correction

## Current Status

This repository is the scaffold product itself. The next step is to keep the CLI and templates aligned, then publish the package for use in other projects.
