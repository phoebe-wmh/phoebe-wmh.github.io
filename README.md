# llmrix-page

A clean, zero-backend, file-driven wiki interface designed for Large Language Model (LLM) knowledge management and article publishing. Simply drop Markdown files with YAML frontmatter into the repository, and get a fully-featured, searchable knowledge site without managing databases, CMS backends, or complex server pipelines.

React 19 · Vite 6 · Tailwind CSS 4 · TypeScript 5 · KaTeX · Mermaid.js · i18next

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

---

This repository is a GitHub Pages deployment of the [llmrix-page](https://github.com/llmrix-inc/llmrix-page) template (React + Vite file-driven wiki). Articles live in `src/public/` as Markdown files with YAML frontmatter; the site is auto-built and published to GitHub Pages by the workflow in `.github/workflows/deploy.yml` on every push to `main`.

## Quick start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # output to dist/
```

## Adding articles

Place a `.md` file in `src/public/` with frontmatter:

```markdown
---
title: "Article Title"
category: Guide
date: 2026-01-01 00:00:00
tags: [Tag1, Tag2]
summary: "Short description shown in the list."
---

Content here...
```

The About page is driven by `src/source/about.md`. Site name, bio and social links live in `src/config/config.json`.

## Deploy

Any push to `main` triggers `.github/workflows/deploy.yml`, which runs `npm install && npm run build` and publishes `dist/` to GitHub Pages.
