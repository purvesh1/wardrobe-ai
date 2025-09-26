# Repository Guidelines

## Project Structure & Module Organization
Wardrobe AI is a Vite + React TypeScript SPA anchored by `App.tsx` and bootstrapped in `index.tsx`. UI primitives live under `components/` (with shared variants in `components/ui/`), cross-cutting helpers in `lib/` and `src/lib/`, and domain types in `types.ts`. API integrations reside in `services/`, where `geminiService.ts` handles outfit analysis and `shoppingService.ts` maps Google Custom Search responses. Global styling and Tailwind tokens sit in `src/index.css`, `tailwind.config.js`, and `postcss.config.js`.

## Build, Test, and Development Commands
- `npm install` — hydrate dependencies before any run.
- `npm run dev` — start the Vite dev server on all interfaces (`--host`) for local device testing.
- `npm run build` — create the optimized production bundle in `dist/`.
- `npm run preview` — serve the built assets to validate deploy artefacts.

## Coding Style & Naming Conventions
Codebase uses TypeScript with React function components and hooks. Favour PascalCase for components (`components/Header.tsx`), camelCase for functions and vars (`services/analyzeOutfit`). Keep indentation at two spaces, single quotes except when interpolating Tailwind classes, and organise imports as external → aliases → local relative. Reuse the `cn` helper from `lib/utils.ts` for className composition and prefer default exports only for top-level components.

## Testing Guidelines
No automated test runner is wired yet; introduce `vitest` when adding coverage. Co-locate spec files as `*.test.ts[x]` beside the source, mock network calls to Gemini and Google APIs, and gate regressions by running `vitest run` (add a script before committing). Until then, manual smoke-test new flows via `npm run dev` and capture findings in the PR.

## Commit & Pull Request Guidelines
History is minimal (`initial Commit`), so set a precedent: concise, imperative subject lines under 72 chars, optional scope (e.g., `feat: add shopping results grid`). Each PR should include: a summary of intent, screenshots or clips for UI changes, reproduction steps for bug fixes, and links to tracking issues. Confirm lint/build output and note any follow-up work.

## Security & Configuration Tips
Secrets for Google Custom Search live in `secrets.ts`; keep real credentials out of version control and prefer `.env.local` with `VITE_`-prefixed keys for long-term storage. `services/geminiService.ts` currently reads `process.env.API_KEY`; align environment naming before shipping and document required keys in the PR description.
