# PHPTRAVELS Playwright Flakiness Analysis

The suite runs against the public demo at `https://phptravels.net`, so availability, latency, redirects, rate limits, content changes, and demo resets can affect outcomes. Fully parallel execution can also allow stateful flows to interfere.

## Recommended Fix

1. Add a controlled test environment with deterministic fixtures for inventory, suppliers, demo notices, authentication, and booking responses.
2. Disable parallel execution for tests that mutate shared remote state.
3. Freeze test dates through fixed fixtures.
4. Prefer stable roles, labels, and test IDs over broad page assertions.
5. Keep live smoke tests separate from deterministic regression tests.
6. Add npm scripts for supported test commands.
