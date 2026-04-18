# Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the blank Jekyll site with a single-page plain HTML/CSS professional presence site in a solarpunk field-notebook aesthetic.

**Architecture:** Two files only — `index.html` and `style.css`. No build step, no JavaScript, no frameworks. GitHub Pages serves `index.html` directly from the repo root.

**Tech Stack:** Plain HTML5, plain CSS3, `'Courier New', monospace` throughout.

---

### Task 1: Delete Jekyll files and scaffold the two new files

**Files:**
- Delete: `_config.yml`, `_includes/`, `_layouts/`, `_posts/`, `_sass/`, `about.md`, `css/`, `feed.xml`
- Overwrite: `index.html`
- Create: `style.css`

- [ ] **Step 1: Delete Jekyll files**

```bash
cd personal-site
rm -rf _config.yml _includes/ _layouts/ _posts/ _sass/ about.md css/ feed.xml
```

- [ ] **Step 2: Create empty index.html**

```bash
touch index.html style.css
```

- [ ] **Step 3: Verify only the right files remain**

```bash
ls
```

Expected output includes: `docs/  index.html  style.css` (plus `.git/`, `.gitignore`)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove Jekyll scaffold"
```

---

### Task 2: Write style.css

**Files:**
- Write: `style.css`

- [ ] **Step 1: Write the full stylesheet**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #1a1f18;
  color: #c8d8b0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.9;
}

.container {
  max-width: 680px;
  margin: 0 auto;
  padding: 48px 32px;
}

/* ── Header ── */

header {
  border-bottom: 1px solid #2e4028;
  padding-bottom: 16px;
  margin-bottom: 32px;
}

.name {
  color: #c8813a;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.tagline {
  color: #6a8858;
}

.links {
  display: flex;
  gap: 16px;
  margin-top: 10px;
}

.links a {
  color: #9bc960;
  text-decoration: none;
  font-size: 11px;
}

.links a:hover {
  text-decoration: underline;
}

/* ── Sections ── */

section {
  margin-bottom: 28px;
}

.section-heading {
  color: #c8813a;
  margin-bottom: 6px;
}

.body-text {
  color: #b0c898;
  max-width: 520px;
}

/* ── Two-column grid (stack, experience) ── */

.grid {
  display: grid;
  grid-template-columns: 120px 1fr;
  row-gap: 2px;
}

.grid-key {
  color: #6a8858;
}

.grid-value {
  color: #b0c898;
}

/* ── Projects ── */

.project-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-name {
  color: #9bc960;
}

.project-desc {
  color: #6a8858;
  font-size: 11px;
}

/* ── Contact ── */

.contact-email {
  color: #b0c898;
}

/* ── Footer ── */

footer {
  border-top: 1px solid #2e4028;
  padding-top: 14px;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  color: #3a5030;
  font-size: 10px;
}
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "feat: add stylesheet — solarpunk field notebook palette"
```

---

### Task 3: Write index.html

**Files:**
- Write: `index.html`

- [ ] **Step 1: Write the full HTML**

Replace `[YOUR LINKEDIN URL]` and the bio/experience/projects content with real values before pushing to production. The structure is complete and renders correctly with placeholders.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stephen Hannaway — Software Engineer</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">

    <header>
      <div class="name">stephen hannaway</div>
      <div class="tagline">software engineer · python · jpmorgan · london</div>
      <nav class="links">
        <a href="https://github.com/StephenHannaway" target="_blank" rel="noopener">github</a>
        <a href="[YOUR LINKEDIN URL]" target="_blank" rel="noopener">linkedin</a>
        <a href="mailto:stephenjameshannaway@gmail.com">email</a>
      </nav>
    </header>

    <section>
      <div class="section-heading">## about</div>
      <p class="body-text">
        Python-primary software engineer at JPMorgan. I build backend systems
        and care about clean, reliable tooling. Interested in ethical,
        sustainable technology.
      </p>
    </section>

    <section>
      <div class="section-heading">## stack</div>
      <div class="grid">
        <span class="grid-key">languages</span><span class="grid-value">python, sql, bash</span>
        <span class="grid-key">tooling</span><span class="grid-value">uv, ruff, mypy, pytest, just</span>
        <span class="grid-key">backend</span><span class="grid-value">fastapi, postgresql, redis</span>
        <span class="grid-key">infra</span><span class="grid-value">git, linux, github actions</span>
      </div>
    </section>

    <section>
      <div class="section-heading">## experience</div>
      <div class="grid">
        <span class="grid-key">2022–now</span><span class="grid-value">JPMorgan Chase &amp; Co. — software engineer</span>
      </div>
    </section>

    <section>
      <div class="section-heading">## projects</div>
      <div class="project-list">
        <div>
          <div class="project-name">HexMapper</div>
          <div class="project-desc">pygame hex map editor for TTRPGs &middot; <a href="https://github.com/StephenHannaway/HexMapper">github.com/StephenHannaway/HexMapper</a></div>
        </div>
      </div>
    </section>

    <section>
      <div class="section-heading">## contact</div>
      <div class="contact-email">
        <a href="mailto:stephenjameshannaway@gmail.com">stephenjameshannaway@gmail.com</a>
      </div>
    </section>

    <footer>
      <span>stephenhannaway.github.io</span>
      <span>plain html &middot; no frameworks &middot; no javascript</span>
    </footer>

  </div>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify it looks right**

```bash
# Windows
start index.html
```

Check: dark green background, amber headings, leaf green links, monospace throughout, no broken layout.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add index.html — single page personal site"
```

---

### Task 4: Fill in real content and push

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace placeholders with real content**

Edit `index.html`:
- Replace `[YOUR LINKEDIN URL]` with your actual LinkedIn profile URL
- Update the bio paragraph in `## about` to your own words
- Add any additional experience entries to the `## experience` grid (duplicate the `<span>` pair, one for date, one for role)
- Add any additional projects to `## projects` (duplicate the project `<div>` block)

- [ ] **Step 2: Verify in browser one more time**

```bash
start index.html
```

- [ ] **Step 3: Commit and push**

```bash
git add index.html
git commit -m "feat: add real content"
git push
```

- [ ] **Step 4: Verify live at https://stephenhannaway.github.io**

GitHub Pages may take ~60 seconds to deploy. Reload until it appears.
