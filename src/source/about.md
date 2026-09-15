---
title: "关于"
category: About
date: 2026-01-01 00:00:00
tags: [关于]
summary: "LLM Wiki 站点介绍。"
---

# 关于 LLM Wiki

![LLM Wiki](/images/llm-wiki.svg)

> LLM Wiki 是一个以「LLM 撰写与维护、人类阅读与提问」为核心的零后端文件驱动知识站点模板。

## 特点

- **零后端**：文章以 Markdown + YAML frontmatter 存放，无需数据库、CMS 或服务端渲染管道
- **全功能**：全文搜索、标签云、分类、多语言（简中/繁中/英文/日文/韩文）、暗色模式、KaTeX 数学公式、Mermaid 图表、代码高亮、RSS 导出
- **文件驱动**：新增一篇文章 = 在 `src/public/` 下放一个 `.md` 文件并推送，CI 自动构建发布
- **部署**：push 到 `main` 分支后，GitHub Actions 自动执行构建并发布到 GitHub Pages

## 使用方式

### 添加文章

在 `src/public/` 目录下新建一个 Markdown 文件，包含以下 frontmatter：

```markdown
---
title: "文章标题"
category: 分类名
date: 2026-01-01 00:00:00
tags: [标签1, 标签2]
summary: "列表页显示的摘要。"
---

正文内容……
```

### 修改站点信息

- 站点名称 / 简介 / 社交链接：编辑 `src/config/config.json`
- 本「关于」页面：编辑 `src/source/about.md`
- 界面文案（多语言）：编辑 `src/i18n/index.ts`
- 主题颜色：编辑 `src/index.css` 中的 `@theme` 与 `[data-theme="dark"]` 变量

## 技术栈

React 19 · Vite 6 · Tailwind CSS 4 · TypeScript 5 · KaTeX · Mermaid.js · i18next
