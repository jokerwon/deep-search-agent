# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the agent entrypoints: `index.ts` exports the packaged surface, `agent.ts` contains `DeepSearchAgent`, and `config.ts` loads env-aware settings via `@next/env`.
- `test/` stores Vitest suites (`agent.test.ts`, `exports.test.ts`, `index.test.ts`) that mirror the modules they cover; add new specs alongside related files using the `<name>.test.ts` pattern.
- `dist/` is generated output from `pnpm build`; do not edit it manually. Root-level configs such as `tsconfig.json`, `tsdown.config.ts`, and `eslint.config.js` govern compilation, bundling, and linting.

## Build, Test, and Development Commands
- `pnpm install` syncs workspace dependencies (CI uses the committed `pnpm-lock.yaml`).
- `pnpm dev` runs `tsdown --watch` for incremental builds while editing.
- `pnpm build` emits production artifacts to `dist/` via tsdown + TypeScript.
- `pnpm start` executes `src/index.ts` through `tsx` for quick smoke tests.
- `pnpm test` launches Vitest; append `--runInBand` or `--watch` as needed.
- `pnpm lint` and `pnpm typecheck` keep ESLint and `tsc` clean before pushing.

## Coding Style & Naming Conventions
- TypeScript modules in `src/` follow ES module syntax, 2-space indentation, and `camelCase` functions, `PascalCase` types/classes, and kebab-case filenames (e.g., `deep-search.ts`).
- ESLint inherits `@antfu/eslint-config`; fix issues with `pnpm lint --fix`. Keep imports sorted and avoid unused exports so bundling remains tree-shakeable.
- Prefer small, composable functions and keep configuration objects strongly typed via shared interfaces in `src/config.ts`.

## Testing Guidelines
- Write Vitest suites per feature under `test/`, mirroring filenames to clarify coverage. Use `describe` blocks for modules and `it` statements for behaviors.
- Target high-value branches: agent initialization, configuration fallbacks, and any async integrations. Aim for meaningful assertions rather than broad snapshots.
- Run `pnpm test --coverage` locally when touching core agent logic to ensure no regressions before opening a PR.

## Commit & Pull Request Guidelines
- Follow short, imperative commit subjects (e.g., `agent: validate api key`) and include a concise body if context matters. Lint-staged + simple-git-hooks rerun `pnpm install` and ESLint, so keep commits passing locally.
- For PRs, summarize intent, list key changes, reference related issues, and attach CLI output when proving fixes (e.g., vitest or build logs). Screenshots or sample commands help reviewers reproduce results quickly.

## Security & Configuration Tips
- `loadConfig()` reads `API_KEY` via `@next/env`; store secrets in `.env.local` (not committed) and never echo them in logs.
- Validate external inputs before wiring them into `DeepSearchAgent`, and scrub credentials from debug traces or error messages to keep the package publish-ready.
