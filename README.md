# Angular + Ionic + NestJS Monorepo Template

A production-ready **Nx monorepo** template that combines **Angular**, **Ionic/Capacitor**, and **NestJS**.

This repository is intentionally a **skeleton**. It contains no business logic. Its only goal is to eliminate the repetitive setup work so you can start building features immediately after forking.

> **Clone → Install → Develop**

---

## Features

- Nx workspace with three independent applications:
    - `mobile` – Ionic + Angular + Capacitor (Web, Android & iOS)
    - `web` – Standalone Angular application
    - `server` – NestJS backend
- Shared tooling already configured:
    - ESLint + Prettier
    - Jest
    - Husky (Git hooks)
    - Madge (circular dependency detection)
    - standard-version (semantic releases)
- Tailwind CSS v4
- Ready-to-use npm scripts for serve, build, lint, test and mobile workflows

---

## Tech Stack

| Technology            | Purpose                          |
| --------------------- | -------------------------------- |
| **Nx**                | Monorepo management              |
| **Angular**           | Web & Mobile frontend            |
| **Ionic + Capacitor** | Mobile UI & native builds        |
| **NestJS**            | Backend / REST API               |
| **TypeScript**        | Primary language                 |
| **Tailwind CSS**      | Utility-first styling (`^4.3.3`) |
| **Jest**              | Unit testing                     |
| **ESLint + Prettier** | Code quality & formatting        |
| **Husky**             | Git hooks                        |
| **Madge**             | Circular dependency detection    |
| **standard-version**  | Versioning & changelogs          |

---

## Prerequisites

- Node.js (LTS recommended)
- npm
- Git

**Mobile development extras**

| Platform | Requirements                           |
| -------- | -------------------------------------- |
| Android  | Android Studio + SDK + device/emulator |
| iOS      | macOS + Xcode + CocoaPods + simulator  |

> iOS builds **require** macOS.

---

## Getting Started

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd <project-directory>

# 2. Install dependencies
npm install
```

> **Important:** The package name in `package.json` is currently set to `@my-angular-nest-app/source`.  
> After forking, change it to something meaningful for your project (e.g. `@your-org/your-app`).

The workspace is now ready.

---

## Development

### Start individual applications

```bash
npm run serve:server   # NestJS backend
npm run serve:web      # Angular web app
npm run serve:mobile   # Ionic app in the browser
```

### Start everything at once

```bash
npm run serve:all
```

---

## Mobile (Capacitor)

### Run in the browser (recommended during development)

```bash
npm run serve:mobile
```

### Add platforms (first time only)

```bash
npm run mobile:add:android
npm run mobile:add:ios          # requires macOS
```

### Sync after code changes

```bash
npm run mobile:sync:android
npm run mobile:sync:ios
```

### Open native IDEs

```bash
npm run mobile:open:android     # Android Studio
npm run mobile:open:ios         # Xcode
```

### Build & run on device/emulator

```bash
npm run build:mobile:android
npm run build:mobile:ios
```

---

## Build

```bash
npm run build:server
npm run build:web
npm run build:mobile
npm run build:all               # builds everything → dist/
```

---

## Code Quality

```bash
# Lint
npm run lint:server
npm run lint:web
npm run lint:mobile
npm run lint:all

# Test
npm run test:all

# Format
npm run format
npm run format:all

# Detect circular dependencies
npm run find-circular

# Visualize project graph
npm run graph
```

### Affected projects only (Nx)

```bash
npm run affected                # lint + test + build on changed projects
```

---

## Versioning & Releases

Uses [standard-version](https://github.com/conventional-changelog/standard-version).

```bash
npm run release:patch           # 1.0.0 → 1.0.1
npm run release:minor           # 1.0.0 → 1.1.0
npm run release:major           # 1.0.0 → 2.0.0
npm run release:beta            # 1.0.0 → 1.0.0-beta.0
npm run release:alpha           # 1.0.0 → 1.0.0-alpha.0
```

---

## Project Structure

```text
.
├── apps/
│   ├── mobile/          # Ionic + Angular + Capacitor
│   ├── web/             # Angular web application
│   └── server/          # NestJS backend
├── libs/                # Shared libraries (add as needed)
├── dist/                # Build output
├── .husky/              # Git hooks
├── nx.json
├── package.json
├── tsconfig.base.json
├── eslint.config.mjs
├── prettier.config.js
└── README.md
```

Create libraries under `libs/` only when you need to share real code between applications. Avoid premature abstraction.

---

## Useful Nx Commands

```bash
npx nx show projects
npx nx run <project>:<target>          # e.g. nx run mobile:build
npx nx run-many -t build
npx nx graph
npx nx report
```

---

## Recommended Workflow

1. `npm install`
2. `npm run serve:all` (or start only what you need)
3. Make changes
4. `npm run lint:all && npm run test:all && npm run find-circular`
5. `npm run format:all`
6. `npm run build:all` before releasing

---

## Contributing

Before opening a Pull Request, make sure these commands succeed:

```bash
npm run lint:all
npm run test:all
npm run find-circular
npm run format:all
npm run build:all
```

If you introduce a new dependency or change the workspace structure, explain the reason clearly in the PR.

---

## License

MIT

---

**Configure once. Reuse many times.**

Fork this repository, rename the package, and start building.
