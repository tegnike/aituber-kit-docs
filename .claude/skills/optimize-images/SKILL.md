---
name: optimize-images
description: "Optimize images in a web project by converting PNG/JPG to WebP format with resizing. Use this skill whenever the user mentions image optimization, page load speed, image compression, converting images to WebP, reducing image file sizes, or asks about large images slowing down their site. Also trigger when the user asks to audit or check image sizes in public/ or static asset directories."
---

# Image Optimization Skill

Convert PNG/JPG images in a web project to WebP format, resize oversized images, update all references in source files, and remove the originals — resulting in dramatically smaller file sizes (typically 80-95% reduction) with no visible quality loss.

## When to use

- User wants to optimize images for faster page loads
- User has large PNG/JPG screenshots or assets in a documentation site or web app
- User asks about image file sizes or slow-loading pages due to images

## Workflow

### 1. Audit current images

Scan the project's static asset directories (commonly `public/`, `static/`, `assets/`) for image files. Report:
- Total number of images and combined size
- Top offenders sorted by file size
- Image dimensions (flag anything wider than 1280px as oversized)
- Format breakdown (PNG vs JPG vs WebP vs SVG)

Present a clear summary table so the user can see the current state before making changes.

### 2. Decide what to convert

Not every image should be converted. Apply these guidelines:

**Convert to WebP:**
- Screenshots, photos, UI captures — these benefit most
- Any PNG/JPG larger than ~50KB

**Keep as PNG:**
- Logos and favicons (small files where universal compatibility matters)
- OGP/social sharing images (`ogp.png`, `og-image.png`, etc.) — many social platforms don't support WebP yet
- SVG files (already vector, no benefit from WebP conversion)
- Images referenced by external services (e.g., Buy Me A Coffee badges)

**Keep original format if:**
- The file is already very small (under ~30KB) — the savings aren't worth the effort
- The image is used in a context requiring exact format (e.g., `.ico` favicons)

Present the conversion plan to the user and get confirmation before proceeding.

### 3. Check available tools

Look for conversion tools in this order:
1. `cwebp` (from libwebp) — lightweight, purpose-built, preferred
2. `convert` (from ImageMagick) — widely available fallback
3. `sharp` via Node.js — if neither CLI tool is available
4. `ffmpeg` — last resort

If none are available, suggest installation: `brew install webp` (macOS) or `apt install webp` (Linux).

### 4. Convert images

For each image being converted:
- If width > 1280px: resize to 1280px width (maintaining aspect ratio) during conversion
- Quality setting: 85 (good balance of size vs quality for screenshots)
- Output to the same directory with `.webp` extension

**cwebp example:**
```bash
# With resize (width > 1280)
cwebp -q 85 -resize 1280 0 input.png -o output.webp

# Without resize (width <= 1280)
cwebp -q 85 input.png -o output.webp
```

The 1280px threshold works well because most documentation sites and web apps display content at 800px or less — 1280px provides crisp rendering on high-DPI screens without being wasteful.

### 5. Update references

Search all source files for references to the converted images and update the extensions. Be precise about what to replace:

**Replace:** References that point to the converted image files (e.g., `/images/screenshot.png` → `/images/screenshot.webp`)

**Do NOT replace:**
- External URLs (e.g., `https://example.com/badge.png`)
- Code examples that mention filenames as documentation (e.g., directory tree listings showing `closed.png`)
- Environment variable examples (e.g., `BACKGROUND_IMAGE_PATH=/bg.png`)
- References to images that were intentionally kept as PNG

Use a targeted regex like `/images/[a-zA-Z0-9_-]+\.png` scoped to the project's image directory path, rather than a broad `.png` → `.webp` replacement.

File types to search: `.md`, `.mdx`, `.tsx`, `.jsx`, `.ts`, `.js`, `.vue`, `.astro`, `.html`, `.css`, `.mts`, `.mjs`

### 6. Remove originals

Delete the old PNG/JPG files that were successfully converted.

### 7. Verify

- Run the project's build command to ensure nothing is broken
- Report a before/after comparison table showing:
  - Per-file size changes (biggest savings highlighted)
  - Total size reduction (absolute and percentage)

## Size threshold reference

A rough guide for expected WebP sizes after conversion from PNG screenshots:
- Simple UI screenshots (few colors, lots of flat areas): 20-50KB
- Complex UI with photos/gradients: 50-100KB
- Full-screen application screenshots: 60-80KB

If a converted WebP file is unexpectedly large (>200KB for a screenshot), the source image may benefit from additional resizing or the quality parameter can be lowered to 80.
