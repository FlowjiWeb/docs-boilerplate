---
title: Theme architecture
description: Custom theme structure for Website 1
---

## Directory structure

```
wp-content/themes/website-1/
├── assets/
│   ├── src/          ← source JS and SCSS
│   └── dist/         ← compiled, committed to repo
├── inc/
│   ├── blocks/       ← custom Gutenberg block registrations
│   ├── cpt/          ← custom post type definitions
│   └── helpers.php   ← shared utility functions
├── templates/        ← full-page templates
├── parts/            ← reusable template parts
├── functions.php
└── style.css
```

## Build pipeline

Assets are compiled with **Vite**. Always commit the `dist/` folder — the server does not run a build step.

```bash
npm run dev     # watch mode
npm run build   # production build (minified, hashed filenames)
```

## Custom Gutenberg blocks

Blocks live in `inc/blocks/`. Each block is registered server-side in PHP with a matching `block.json`. Block editor scripts are compiled into `assets/dist/blocks.js`.

To add a new block:
1. Create a folder in `inc/blocks/your-block-name/`
2. Add `block.json`, `render.php`, and register it in `inc/blocks/index.php`
3. Add the editor script to `assets/src/blocks/your-block-name.js`

## Template hierarchy

Standard WordPress hierarchy applies. Custom page templates are declared in `templates/` with the `Template Name:` file header.
