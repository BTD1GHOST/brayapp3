# Premium Self-Improvement PWA

A React, Vite, Tailwind CSS self-improvement dashboard.

## Requirements

- Node.js 20.19.0 or newer
- npm

If you use `nvm`, run:

```sh
nvm use
```

## Local Development

```sh
npm ci
npm run dev
```

## Production Build

```sh
npm run typecheck
npm run build
npm run preview
```

The production files are generated in `dist/`.

## GitHub Pages Deployment

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.
After pushing to GitHub, enable Pages in the repository settings and choose **GitHub Actions** as the source.

Every push to `main` will install dependencies, type-check the app, build it, and publish the `docs/` folder.

If you are not using GitHub Actions, go to **Settings > Pages**, set the source to **Deploy from a branch**, choose the `main` branch, and choose the `/docs` folder.

## Manual GitHub Upload

If you use GitHub's browser upload, upload only the repository files:

- `.github/`
- `docs/`
- `src/`
- `.gitignore`
- `.nvmrc`
- `README.md`
- `index.html`
- `package-lock.json`
- `package.json`
- `tsconfig.json`
- `vite.config.ts`

Do not upload `node_modules/`, `dist/`, or `.git/`. Those folders are generated locally and make the upload much larger than GitHub's browser upload limit.
