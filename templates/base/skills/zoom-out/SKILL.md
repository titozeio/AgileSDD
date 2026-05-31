---
name: zoom-out
description: Step back and re-evaluate scope, architecture, or direction before committing.
mode: {{skillMode}}
---

# Zoom Out

Use when the work feels too local, the design is unstable, or a change could ripple across the scaffold.

## Flow

- Summarize the higher-level problem.
- List a few viable approaches.
- Call out long-term maintainability and context cost.
- Recommend the smallest option if uncertainty remains.

## Auto Policy

- Use automatically when the change may affect architecture, shared abstractions, or multiple files or specs.
- Use automatically when the task feels locally optimized but may not fit the wider product shape.
- Use automatically when the scope or design is still unstable and a higher-level view would reduce rework.
- Do not use automatically for tightly scoped fixes, mechanical edits, or when the current spec already settles the tradeoff.

## Keep It Lean

- Do not overexplore.
- Prefer decision support over exhaustive analysis.
- Return to the concrete task once the direction is clear.
