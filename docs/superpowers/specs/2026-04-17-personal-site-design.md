# Personal Site Design

**Date:** 2026-04-17  
**URL:** stephenhannaway.github.io  
**Repo:** github.com/StephenHannaway/StephenHannaway.github.io

---

## Goal

A professional presence site — visible to recruiters and potential employers. Single page, no JavaScript, no frameworks.

---

## Aesthetic

**Field notebook meets solarpunk.** Monospace typography, markdown-flavoured section headings, solarpunk colour palette. Reads like a well-structured README. The content is the design — no hero section, no decorative chrome beyond the palette itself.

Not a reskinned standard portfolio. No nav bar, no cards, no hero image, no animations.

### Palette

| Role | Value |
|---|---|
| Background | `#1a1f18` (dark forest green) |
| Primary text | `#c8d8b0` (warm leaf) |
| Body text | `#b0c898` |
| Muted / metadata | `#6a8858` |
| Accent 1 (headings, name) | `#c8813a` (amber/copper) |
| Accent 2 (links, project names) | `#9bc960` (bright leaf green) |
| Divider lines | `#2e4028` |
| Footer text | `#3a5030` |

### Typography

- **Font:** `'Courier New', monospace` — single font throughout
- **Base size:** 12px, line-height 1.9
- **Section headings:** `## section` styled in amber (`#c8813a`)
- **No bold headings beyond the name** — hierarchy through colour, not weight

---

## Structure

Single `index.html` + single `style.css`. No subdirectories, no build step.

### Sections (top to bottom)

1. **Header** — name, role/location, inline links (github, linkedin, email). Separated from body by a bottom border.
2. **## about** — 2–3 sentence bio paragraph.
3. **## stack** — two-column key/value grid: languages, tooling, backend, infra.
4. **## experience** — two-column key/value: date range + company/role.
5. **## projects** — list of projects, each with name (leaf green) and one-line description + repo link (muted).
6. **## contact** — email address.
7. **Footer** — URL on left, "plain html · no frameworks · no javascript" on right. Muted, separated by top border.

### Layout

- `max-width: 680px`, centred, with generous padding.
- Two-column grids for stack/experience use `grid-template-columns: 120px 1fr`.
- No responsive breakpoints needed at this scale — single column at all sizes.

---

## Content placeholders

Content to be filled in by Stephen before launch:

- **Bio:** 2–3 sentences — what he does, where, what he cares about
- **Stack:** confirm entries (currently: python/sql/bash · uv/ruff/mypy/pytest/just · fastapi/postgresql/redis · git/linux/github actions)
- **Experience:** dates, companies, roles
- **Projects:** HexMapper confirmed; add any others
- **Email:** stephenjameshannaway@gmail.com (confirmed)
- **GitHub:** github.com/StephenHannaway (confirmed)
- **LinkedIn:** URL to add

---

## Files

```
personal_site/
├── index.html
└── style.css
```

Existing Jekyll files (`_config.yml`, `_layouts/`, `_posts/`, etc.) to be deleted.

---

## Non-goals

- No JavaScript
- No CSS frameworks
- No responsive breakpoints (single column works at all widths)
- No blog
- No dark/light mode toggle
- No animations or transitions
