# Repository Guidelines

## ⚠️ 중요: 모든 답변은 반드시 한국어로 작성할 것 (All responses must be in KOREAN)
## Project Structure & Module Organization
- Root HTML entry points live at `index.html`, `ko/index.html`, and `en/index.html`; locale-specific pages nest under `ko/` and `en/` (e.g., `ko/research/projects/*`).
- Shared styling, scripts, and imagery reside in `assets/` (`assets/css`, `assets/js`, `assets/images`).
- Playwright-based utility scripts for manual or automated checks sit alongside the root (`mobile_test.js`, `korean_page_test.js`, `simple_mobile_test.js`).
- Process and roadmap documentation is tracked in `README.md`, `CLAUDE.md`, and `project_plan.md`.

## Build, Test, and Development Commands
- `npm install`: fetch the sole dev dependency (`@playwright/test`) before running tests locally.
- `npm test`: invoke the Playwright test runner; extend with `.spec.ts` files under a future `tests/` directory if needed.
- `npm run dev` / `npm start`: launch a static preview via `python3 -m http.server 8080` for quick inspection at `http://localhost:8080`.
- For XAMPP users, mirror changes into `/Applications/XAMPP/xamppfiles/htdocs/mvr` as described in `README.md` before browser testing.

## Coding Style & Naming Conventions
- Follow the existing 4-space indentation in HTML, CSS, and JavaScript files; keep inline `<style>` blocks tightly scoped or move styles into `assets/css`.
- Name locale assets with clear prefixes (`ko-`, `en-`) and use kebab-case for filenames (e.g., `critical.css`, `performance-optimizer.js`).
- Favor semantic class names (`.nav-menu`, `.mobile-menu-toggle`) and ARIA attributes for accessibility; update both languages when adjusting navigation labels.

## Testing Guidelines
- Prefer Playwright for UI validation; place new specs under `tests/` with the pattern `feature-name.spec.ts`.
- When adding scripts, guard UI selectors with resilient locators (`data-testid`, ARIA labels) to keep tests stable.
- Capture before/after screenshots through Playwright’s `page.screenshot` API when modifying responsive layouts or navigation.

## Commit & Pull Request Guidelines
- Match the existing Conventional-Emoji style: `<emoji> concise summary` (e.g., `⚡ 성능 개선: Critical CSS 분리`).
- Reference locale or section touched in the subject, and keep body text focused on impact, testing, and roll-back notes when relevant.
- Pull requests should include: a short problem statement, bullet list of changes, test evidence (`npm test` output or screenshots), and links to related issues or roadmap items in `project_plan.md`.

## Agent-Specific Notes
- Large edits should be staged in sections to respect the 18 KB per-file limit noted in `CLAUDE.md`.
- Avoid editing generated docs (`README.md`, `CLAUDE.md`, `project_plan.md`) without also updating the workflow description they contain.
- When touching `assets/js/performance-optimizer.js`, profile on low-power devices or note fallbacks for `performanceMode === 'low'`.
