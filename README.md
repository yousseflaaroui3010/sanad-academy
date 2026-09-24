# Sanad Academy

Study app for the SANAD master's defense (ENSA Fès). Start with the **Defense Path** tab: 19 nodes from the big picture to the code, each ending with gates you answer in your own words.

## Answer Coach (AI grading)

Each gate has a hidden model answer, checked against the RAG_project_ENSA code, the report and the slides. When you submit an answer (with a 1–5 confidence rating), the coach grades it: Pass / Not yet, the step where the reasoning broke, then a hint ladder (question → rule → similar example). The model answer stays hidden until you pass or reach attempt 4, which also gives a walkthrough and a fresh gate.

Grading needs a Gemini API key, in one of two places:

- **Server (recommended on Railway):** set `GEMINI_API_KEY` (and optionally `GEMINI_MODEL`) in the service variables. `server.js` exposes `POST /api/coach`, so the key never reaches the browser.
- **Browser:** click **AI grader** in the Defense Path header and paste a key. It is stored in this browser's localStorage only.

With no key, the coach falls back to an offline keyword check and says so on screen.

Progress (passed cold, watch list, due for review) is kept in this browser's localStorage.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
