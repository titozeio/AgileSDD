---
name: tdd
description: Build or change code using a red-green-refactor loop.
---

# TDD

Use when implementing a feature or fix where tests can express the desired behavior.

## Flow

- Write the smallest failing test against the public interface.
- Make it pass with the least code.
- Refactor while keeping the test green.
- Prefer integration-style tests over implementation details.

## Keep It Lean

- Test behavior, not internals.
- One vertical slice at a time.
- End with the regression test that protects the fix.
