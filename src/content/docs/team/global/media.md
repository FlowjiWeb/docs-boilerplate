---
title: Media guidelines
description: Image sizes, formats, and file naming for ENV_NAME
---

## Formats

| Use case | Format | Why |
|---|---|---|
| Photos | JPG | Smaller file size |
| Graphics, logos, icons | PNG or SVG | Transparent backgrounds |
| Animations | GIF or WebP | Use WebP where possible |
| Never | BMP, TIFF | Too large for web |

## Size limits

- **Maximum upload size**: 10 MB per file
- **Target image file size**: under 500 KB after compression
- Use [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com) to compress before uploading

## Recommended dimensions

| Location | Width |
|---|---|
| Hero / banner | 1920 px |
| Blog post featured image | 1200 px |
| Team member photo | 600 × 600 px (square) |
| Logo | SVG preferred, or PNG at 2× size |

WordPress generates multiple sizes automatically from the original — always upload the largest version you have.

## File naming

- Use lowercase, hyphens only — no spaces, no underscores, no accented characters
- Be descriptive: `team-photo-jane-doe.jpg`, not `IMG_4821.jpg`
- Include a year for time-sensitive assets: `annual-report-2025.pdf`

## Uploading

1. **Media → Add New** in the WordPress admin
2. Drag and drop or click **Select Files**
3. Once uploaded, fill in the **Alt text** field — this is required for accessibility

## Alt text

Alt text describes the image for screen readers and search engines. Keep it short and descriptive:

- Good: `"Team photo at the 2025 annual retreat"`
- Bad: `"image1"` or leaving it blank
- Decorative images (dividers, backgrounds): leave alt text empty and check **Mark as decorative**
