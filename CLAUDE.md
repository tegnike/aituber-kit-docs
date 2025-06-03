# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation site for AITuberKit, built with VitePress. The documentation is available in three languages: Japanese (default), English, and Chinese.

## Common Commands

### Development
```bash
npm run docs:dev        # Start development server
npm run docs:build      # Build for production
npm run docs:preview    # Preview production build
```

## Architecture

### Directory Structure
- `/guide/` - Japanese documentation (default)
- `/en/guide/` - English documentation
- `/zh/guide/` - Chinese documentation
- `/.vitepress/` - VitePress configuration
- `/public/` - Static assets (images, favicon)

### Key Configuration Files
- `.vitepress/config.mts` - Main VitePress configuration with locale settings and navigation structure
- `tailwind.config.js` - Tailwind CSS configuration for custom styling
- `postcss.config.js` - PostCSS configuration

### Content Organization
Documentation is organized by feature areas:
- AI settings (`ai/`)
- Character settings (`character/`)
- Other advanced features (`other/`)

Each language version maintains the same directory structure for consistency.

### Multi-language Support
The site uses VitePress's i18n features with three locales configured in `.vitepress/config.mts`. When updating documentation, changes should typically be made across all language versions to maintain consistency.

Image files in the `/public/` directory are shared across all language versions, eliminating the need for language-specific image duplicates.
