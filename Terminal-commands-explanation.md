# Terminal Commands Explanation

## What We Did in the Terminal

### 1. **`npm init -y`**

Created a new Node.js project with default settings.

- Generated `package.json` file with basic project metadata
- The `-y` flag skipped all the interactive questions and used defaults
- Result: A project named "powerapps" with version "1.0.0" and entry point "index.js"

**Output:**

```json
{
  "name": "powerapps",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

---

### 2. **`npm i -D typescript`**

Installed TypeScript as a development dependency.

- `npm i` = `npm install`
- `-D` = `--save-dev` (saves it to `devDependencies` in package.json)
- Installed TypeScript so you can compile `.ts` files to `.js`
- Added 1 new package (typescript) and updated 2 others (likely dependencies of typescript)
- **Found 0 vulnerabilities** - good news! ✅

**What it does:**

- Downloads TypeScript compiler from npm registry
- Saves it in `node_modules/` folder
- Adds entry to `package.json` under `devDependencies`

---

### 3. **`npx tsc --init`**

Created a TypeScript configuration file.

- `npx` runs the TypeScript compiler without globally installing it
- `tsc` = TypeScript Compiler
- `--init` flag creates a new `tsconfig.json` file
- Result: **`tsconfig.json`** created with default compiler options

**What it does:**

- Creates `tsconfig.json` with ~100 compiler options (most commented out)
- Sets up default compilation rules for your TypeScript project
- Allows you to customize how TypeScript compiles your code

---

## Project Structure After Setup

```
PowerApps/
├── package.json          ← Project metadata & dependencies
├── package-lock.json     ← Locked versions of dependencies
├── tsconfig.json         ← TypeScript compiler settings
├── node_modules/         ← Installed packages (typescript)
│   └── typescript/
└── src/
    └── index.ts          ← Your TypeScript code
```

---

## What You Can Do Now

### Compile TypeScript to JavaScript

```bash
npx tsc
```

This will:

- Read your `tsconfig.json` settings
- Find all `.ts` files in your project
- Compile them to `.js` files
- Place output according to your config (default: same directory)

### Watch Mode (Auto-compile on save)

```bash
npx tsc --watch
```

or

```bash
npx tsc -w
```

### Compile a Specific File

```bash
npx tsc src/index.ts
```

---

## Setting Up npm Scripts

To streamline your development workflow, update the `scripts` section in `package.json`:

```json
{
  "scripts": {
    "dev": "npx tsc",
    "start": "node dist/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### Script Explanations

#### `"dev": "npx tsc"`

**Purpose:** Compile TypeScript to JavaScript

**Usage:**

```bash
npm run dev
```

**What it does:**

- Runs the TypeScript compiler
- Reads your `tsconfig.json` settings
- Compiles all `.ts` files in your project
- Outputs JavaScript files to the `dist/` directory (based on your config)

**When to use:** During development, after making changes to TypeScript files

---

#### `"start": "node dist/index.js"`

**Purpose:** Run the compiled JavaScript application

**Usage:**

```bash
npm start
```

**What it does:**

- Executes the compiled JavaScript file using Node.js
- Looks for `dist/index.js` (the output of your TypeScript compilation)
- Starts your application

**When to use:** After compiling with `npm run dev`, to run your application

---

### Typical Development Workflow

1. **Write TypeScript code** in `src/index.ts`
2. **Compile it:**
   ```bash
   npm run dev
   ```
3. **Run the compiled code:**
   ```bash
   npm start
   ```

### Combined Workflow (Optional Enhancement)

You can create additional scripts for convenience:

```json
{
  "scripts": {
    "dev": "npx tsc",
    "start": "node dist/index.js",
    "build": "npx tsc",
    "dev:watch": "npx tsc --watch",
    "dev:run": "npm run dev && npm start"
  }
}
```

- **`build`**: Same as `dev`, but semantically clearer for production builds
- **`dev:watch`**: Auto-compile on file changes
- **`dev:run`**: Compile and run in one command

---

## Key Concepts

### npm vs npx

- **`npm`**: Package manager - installs packages
- **`npx`**: Package runner - executes packages without permanent installation

### Development Dependencies (-D)

- Used only during development (building, testing, compiling)
- Not needed in production
- TypeScript is a dev dependency because you ship compiled JavaScript, not TypeScript

### tsconfig.json

- Controls how TypeScript compiles your code
- Common options:
  - `target`: Which JavaScript version to output (ES5, ES6, etc.)
  - `module`: Module system (CommonJS, ES6, etc.)
  - `strict`: Enable all strict type-checking options
  - `outDir`: Where to put compiled JavaScript
  - `rootDir`: Where your TypeScript source files are

---

## Summary

You've successfully set up a complete TypeScript development environment! 🎉

**What was created:**

1. ✅ Node.js project (`package.json`)
2. ✅ TypeScript installed (`node_modules/typescript`)
3. ✅ TypeScript configuration (`tsconfig.json`)

**What you can do:**

- Write TypeScript code in `.ts` files
- Compile to JavaScript with `npm run dev`
- Run the compiled JavaScript with `npm start`
- Or use `npx tsc` and `node dist/index.js` directly
