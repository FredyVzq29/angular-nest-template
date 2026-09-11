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

### Option 1: Fork this repository (recommended)

1. Click the **Fork** button at the top right of this page.
2. Clone **your fork**:

```bash
git clone https://github.com/YOUR-USERNAME/angular-nest-template.git
cd angular-nest-template
```

### Option 2: Clone directly

```bash
git clone https://github.com/FredyVzq29/angular-nest-template.git
cd angular-nest-template
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

## Generating New Code

This is an Nx workspace, so new apps and libraries are always created with `nx generate` (`nx g` for short) rather than by hand. Everything below has been run and verified against this exact setup.

> ⚠️ **Syntax note:** the target directory is the **first positional argument**. Running `nx g @nx/angular:application my-app` (name only, no path) fails with `Schema does not support positional arguments`. Always pass `apps/<name>` (or `libs/<name>`) first.

### New Application

**Angular app** (same shape as `web`):

```bash
npx nx g @nx/angular:application apps/<name> \
  --name=<name> \
  --style=scss \
  --routing=true \
  --standalone=true \
  --bundler=esbuild \
  --unitTestRunner=jest \
  --e2eTestRunner=none
```

**NestJS app** (same shape as `server`):

```bash
npx nx g @nx/nest:application apps/<name> --name=<name>
```

After generating a new **Angular** app, two manual steps are needed (known quirks of this Nx/Angular version, already applied to `web` and `mobile`):

1. **Give it a fixed port** in `apps/<name>/project.json`, under the `serve` target's `options`, so it doesn't collide with the other apps when running `npm run serve:all` (`web` uses `4200`, `mobile` uses `4201` — pick the next free one).
2. **Fix the test config**: in `apps/<name>/tsconfig.spec.json`, change
    ```diff
    - "moduleResolution": "node10"
    + "moduleResolution": "bundler"
    ```
    Without this, `nx test <name>` (and your editor's type-checker) fail with `Cannot find module '@angular/core/testing'`.

If it's an Ionic app like `mobile`, also run:

```bash
npm i -D @nxext/ionic-angular @nxext/capacitor
npx nx g @nxext/ionic-angular:configuration <name> --capacitor=true
```

### New Library

Nx organizes libraries by **type** — name and structure it around what it actually does:

| Type          | Purpose                                     | Example in this repo  |
| ------------- | ------------------------------------------- | --------------------- |
| `data-access` | Services, API calls, state                  | `angular-data-access` |
| `feature`     | Smart components tied to a business feature | `feature-auth`        |
| `ui`          | Dumb / presentational components            | `ui-buttons`          |
| `util`        | Framework-agnostic helpers, pure functions  | `util-date`           |

**Angular library** — for code shared between `web` and `mobile` (components, Angular services, pipes, directives):

```bash
npx nx g @nx/angular:library libs/<name> --name=<name> --standalone=true --unitTestRunner=jest
```

**Plain TypeScript library** — for code with no Angular dependency, shareable even with `server` (types, pure utils, DTOs):

```bash
npx nx g @nx/js:library libs/<name> --name=<name> --unitTestRunner=jest --bundler=none
```

#### Options you'll actually use

| Flag               | What it does                                                                          | Default                       | Notes                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `--name`           | Library name; also used to derive the import path                                     | —                             | Required                                                                                                               |
| `--directory`      | Where it's placed (`libs/<name>`)                                                     | —                             | Passed as the first positional argument above                                                                          |
| `--standalone`     | _(Angular only)_ Standalone components instead of an NgModule                         | `true`                        | Keep `true` — this repo doesn't use NgModules anywhere                                                                 |
| `--buildable`      | _(Angular only)_ Gives the library its own `build` target, compiled independently     | `false`                       | Leave off for internal-only libs — simpler and faster. Turn on only if you need to build or version the lib on its own |
| `--publishable`    | Prepares the library to be published to npm                                           | `false`                       | Not needed for internal libs                                                                                           |
| `--importPath`     | Overrides the auto-generated import path                                              | `@my-angular-nest-app/<name>` | Only set this if you need a different scope/name than the auto-generated one                                           |
| `--unitTestRunner` | `jest` \| `none` (Angular libs also accept `vitest-angular`)                          | `jest`                        | Keep `jest` for consistency with the rest of the repo                                                                  |
| `--bundler`        | _(`@nx/js:library` only)_ `none` \| `tsc` \| `swc` \| `esbuild` \| `rollup` \| `vite` | `tsc`                         | Use `none` for an internal-only, non-buildable lib                                                                     |
| `--tags`           | Free-text tags, comma-separated (e.g. `scope:shared,type:data-access`)                | —                             | Useful later if you set up `@nx/enforce-module-boundaries` lint rules to restrict who can import what                  |

The import path and the path mapping in `tsconfig.base.json` are set up automatically — no manual editing needed.

#### After generating an Angular library

`@nx/angular:library` scaffolds a demo **component** by default, even for a services-only library. If you're building something like `angular-data-access`, clean that up and add a real service instead:

```bash
rm -rf libs/<name>/src/lib/<name>
npx nx g @nx/angular:service <service-name> --project=<name> --no-interactive
```

Export it from the library's barrel file:

```ts
// libs/<name>/src/index.ts
export * from './lib/<service-name>';
```

Apply the same test-config fix as with apps, in `libs/<name>/tsconfig.spec.json`:

```diff
- "moduleResolution": "node10"
+ "moduleResolution": "bundler"
```

Then use it from any app with the generated import path:

```ts
import { inject } from '@angular/core';
import { YourService } from '@my-angular-nest-app/<name>';

export class SomeComponent {
    private readonly yourService = inject(YourService);
}
```

If the service injects `HttpClient`, make sure the consuming app has `provideHttpClient()` in its providers (`app.config.ts` for `web`, the `bootstrapApplication` providers array in `main.ts` for `mobile`).

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

Happy coding! 🚀
