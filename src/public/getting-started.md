---
title: "Getting Started"
category: Guide
date: 2026-01-01 00:00:00
tags: [Guide, Getting Started]
summary: "Learn how to use this LLM wiki template — add articles, customize the site, and deploy with GitHub Actions."
---

# Getting Started

Welcome to **LLM Wiki** — a clean, zero-backend, file-driven wiki interface built with React 19, Vite 6, Tailwind CSS 4 and TypeScript 5.

## ✨ Features

- 📝 **File-driven content**: drop Markdown files with YAML frontmatter into `src/public/` and the site updates automatically
- 🔍 **Full-text search**: search across all articles instantly
- 🏷️ **Tag cloud & categories**: organize articles the way you like
- 🌍 **i18n**: Simplified Chinese, Traditional Chinese, English, Japanese, Korean
- 🌙 **Dark mode**: automatic + manual theme switching
- 📐 **KaTeX math**: render LaTeX formulas natively
- 📊 **Mermaid diagrams**: render flowcharts, sequence diagrams and more
- 💻 **Code highlighting**: syntax highlighting for dozens of languages
- 📡 **RSS export**: generate RSS feed on the fly

## 🚀 Quick Start

```bash
npm install
npm run dev    # start dev server at http://localhost:3000
npm run build  # production build → dist/
```

## 📁 Project Structure

```
.
├── public/               # static assets (images, favicon)
├── src/
│   ├── components/       # React components
│   ├── config/           # site configuration (config.json)
│   ├── i18n/             # internationalization
│   ├── lib/              # utility functions
│   ├── services/         # types and services
│   ├── source/           # about page content
│   ├── public/           # markdown articles (file-driven content)
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 📝 Adding an Article

Create a new Markdown file in `src/public/` with YAML frontmatter:

```markdown
---
title: "My First Article"
category: Guide
date: 2026-01-01 00:00:00
tags: [Guide, Tutorial]
summary: "A short description shown in the list."
---

Your content here...
```

The article will appear on the homepage automatically. Categories and tags are derived from frontmatter.

## ⚙️ Customizing the Site

Edit `src/config/config.json`:

```json
{
  "profile": {
    "name": "LLM Wiki",
    "bio": "A comprehensive knowledge base for large language models and AI.",
    "buyMeCoffeeUrl": "https://www.buymeacoffee.com/llmrix"
  },
  "site": {
    "title": "LLM Wiki",
    "subtitle": "Large Language Model Knowledge Base",
    "copyright": "© 2026 LLM Wiki. All Rights Reserved."
  },
  "social": {
    "github": "https://github.com/llmrix",
    "website": "https://llmrix.github.io/llmrix-page/"
  },
  "ui": {
    "postsPerPage": 10,
    "defaultTheme": "light"
  }
}
```

## 🔄 Deployment

This site deploys automatically via GitHub Actions. Any push to `main` triggers the workflow:

```yaml
on:
  push:
    branches: ["main"]
```

Build → Upload artifact → Deploy to GitHub Pages.

## 📜 License

MIT License.
