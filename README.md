# TypeScript Revision Workspace

This repository is a personal “revision” / tutorial playground for
TypeScript.  
Each numbered folder (`S1. …`, `S2. …`, …) contains notes and small
examples that illustrate a particular part of the language.  
The final folder, `S11. React and TS`, adds a minimal React + Vite
project to demonstrate how TypeScript is used in a real application.

> **Goal:** have one place to review core TS concepts and
> experiment with code while slowly building up to a React + TS
> application.

---

## 📁 Folder structure

```
S1. Basics/
S2. TS Compiler Journey/
S3. TS Folder Steup/
S4. Type inference VS Annotation/
S5. Type System & Narrowing/
   ├── any & unknown.md
   ├── implements.md
   ├── never.md
   ├── union.md
   ├── Type Narrowing.md
   ├── Type & Interface.md
   ├── Type Assertion.md
S6. Objects/
S7. Data Types/
   ├── Arrays.md
   ├── Enum.md
   ├── Tuples.md
S8. OOP/
S9. Interface & Generics/
   ├── Interface.md
   ├── generics.md
S10. Web Requests/
S11. React and TS/
   ├── src/            ← small Vite/React app
   ├── package.json
   ├── tsconfig*.json
   └── …others
```

Each `.md` file is self‑contained; read them in order or jump to the
concept you want to refresh.

---

## 🚀 Running the examples

### Sections 1–10 (plain TypeScript)

These are mostly Markdown notes and tiny `*.ts` snippets.  
To compile the small project in **`S3. TS Folder Steup`**:

```bash
cd "S3. TS Folder Steup"
npm install          # installs TypeScript
npm run dev          # runs `npx tsc` per package.json
npm start            # node dist/index.js
```

The tsconfig in that folder (`/src/index.ts`) shows the basic
`rootDir`/`outDir` setup used throughout the repo.

You can `npx tsc -p <folder>` from any other section to try out the
code there, or open the Markdown files in your editor and copy snippets
into a scratch file.

### Section 11 – React + TypeScript

This is a tiny Vite‑powered React app demonstrating:

- function components with typed props,
- hooks (`useState`, `useEffect`, custom `useFetch`),
- generic interfaces, `PropsWithChildren`, etc.

To run it:

```bash
cd "S11. React and TS"
npm install
npm run dev         # starts Vite dev server
# open http://localhost:5173 in your browser
npm run build       # production build
npm run preview     # preview build locally
```

You can inspect `src/` for examples of interfaces, generics, and a
simple `useFetch` hook.

---

## 🔍 Topics covered

- **S1** – Why TypeScript? basic syntax & annotations
- **S2** – What happens inside the TS compiler
- **S3** – Project setup, tsconfig, npm scripts
- **S4** – Inference vs. annotation
- **S5** – Type system & narrowing (`any`/`unknown`, unions, type
  guards, `never`, `implements`, type assertions, etc.)
- **S6** – Objects, structural typing, utility types
- **S7** – Data types (arrays, tuples, enums, readonly, union arrays)
- **S8** – OOP (classes, modifiers, getters/setters, inheritance,
  abstract, composition)
- **S9** – Interfaces & generics (generic functions, constraints,
  default params, interface merging/extends)
- **S10** – Web requests (Axios vs fetch, `.d.ts` files, typing API
  responses)
- **S11** – React + TS (components, hooks, props, project
  structure)

---

## 🧠 Notes

- All Markdown files include explanatory comments and examples; they’re
  meant to be read, edited, and executed in a small sandbox.
- The React project is intentionally minimal—feel free to fork it and
  extend it as you practice.
- This repo is **not** a production application; it’s a learning
  resource. Feel free to copy any sections into other projects.

---

## 📦 License

Feel free to use and adapt the examples however you like.

---

Happy revising!  
Mayank Bhai
