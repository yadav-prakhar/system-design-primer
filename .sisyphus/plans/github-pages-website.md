# System Design Primer GitHub Pages Website

## TL;DR

> **Quick Summary**: Transform the 1800+ line System Design Primer README into a multi-page GitHub Pages website with full-text search, code highlighting, diagram lightbox, and progress tracking. Technical/brutalist aesthetic with monospace typography.
> 
> **Deliverables**:
> - Multi-page static website (15-20 pages)
> - 4 interactive features (search, highlighting, lightbox, progress)
> - Mobile-responsive brutalist design
> - Light/dark theme toggle
> - Deployed to GitHub Pages
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Setup → Content extraction → Feature implementation → Integration

---

## Context

### Original Request
"Plan to make a github pages website out of the content of this repo. this repo is a detailed study resource for studying system design."

### Interview Summary
**Key Discussions**:
- **Aesthetic**: Technical/Brutalist with monospace-heavy typography (JetBrains Mono/Fira Code)
- **Navigation**: Per-topic pages (granular split from README headers)
- **Theme**: Light mode primary with dark mode toggle
- **Features**: Full-text search (Fuse.js), code highlighting (Prism.js), diagram lightbox, progress tracking (LocalStorage)
- **Tech**: Plain HTML/CSS/JS, no build step
- **Content**: Preserve README structure as-is

**Research Findings**:
- README.md is 1839 lines with clear header hierarchy (h2/h3)
- Content organized into: Topics (DNS, CDN, DB, Cache, etc.), Solutions (Pastebin, Twitter, etc.), Resources
- Images folder contains PNG architecture diagrams
- Solutions folder contains detailed implementations
- No existing build tools or frameworks

### Metis Review
**Identified Gaps** (addressed):
- **Page split strategy**: Auto-resolved - use h2 headers as page boundaries
- **Progress definition**: Auto-resolved - scroll-to-bottom + manual "mark complete" toggle
- **Mobile scope**: Auto-resolved - mobile is first-class concern with breakpoints
- **Performance budgets**: Auto-resolved - lazy load search index, highlight visible code only
- **Browser support**: Auto-resolved - last 2 versions of Chrome, Firefox, Safari, Edge

**Guardrails Applied**:
- NO server-side components
- NO authentication/database
- NO multi-language infrastructure
- NO social features/comments
- NO video embedding beyond basic support
- Stay within GitHub Pages 1GB limit

---

## Work Objectives

### Core Objective
Create a production-ready, multi-page GitHub Pages website that transforms the System Design Primer README into an interactive study resource with search, highlighting, diagrams, and progress tracking.

### Concrete Deliverables
- 15-20 HTML pages (one per major topic)
- CSS stylesheet with brutalist aesthetic (monospace-heavy, light theme primary)
- 4 JavaScript modules (search, highlighting, lightbox, progress)
- Image assets organized for lightbox display
- Deployed to GitHub Pages at `{username}.github.io/system-design-primer/`

### Definition of Done
- [ ] All 15-20 pages load correctly with content extracted from README
- [ ] Search returns relevant results within 300ms
- [ ] Code blocks have syntax highlighting for Python, SQL, JavaScript
- [ ] Diagram lightbox opens/closes correctly on all images
- [ ] Progress persists across page reloads (LocalStorage)
- [ ] Dark mode toggle works and persists preference
- [ ] Mobile-responsive at 3 breakpoints (mobile, tablet, desktop)
- [ ] Deployed to GitHub Pages with working URL

### Must Have
- Multi-page structure with per-topic pages
- Full-text search across all content
- Code syntax highlighting (Python, SQL, JS minimum)
- Diagram lightbox with click-to-enlarge
- Progress tracking with LocalStorage
- Light/dark theme toggle
- Mobile-responsive design
- Brutalist aesthetic with monospace typography

### Must NOT Have (Guardrails)
- Server-side components (no Node.js, Python, PHP backends)
- User authentication or accounts
- Database-backed features
- Multi-language/i18n infrastructure
- Social features (comments, forums, sharing buttons)
- Video embedding infrastructure beyond basic iframe
- Advertising or monetization
- Payment/subscription features
- Interactive quizzes with scoring
- Email newsletter infrastructure
- WebSocket/real-time features
- Service worker for offline support

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (static HTML/CSS/JS project)
- **Automated tests**: None (manual QA with browser automation)
- **Framework**: N/A
- **QA Method**: Playwright browser automation for all features

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright - Navigate, interact, assert DOM, screenshot
- **Static files**: Use Bash (curl) - Verify file existence, content checks
- **JavaScript**: Use Playwright - Test search, lightbox, theme toggle, progress

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately - scaffolding + design system):
├── Task 1: Project structure + GitHub Pages setup [quick]
├── Task 2: Design system tokens (CSS variables, typography) [quick]
├── Task 3: Base HTML layout + navigation skeleton [quick]
└── Task 4: Content extraction script (README → HTML pages) [unspecified-high]

Wave 2 (After Wave 1 - core pages):
├── Task 5: Home page with topic overview [visual-engineering]
├── Task 6: Topic pages (DNS, CDN, Load Balancer, Database, Cache) [unspecified-high]
├── Task 7: Solutions pages (Pastebin, Twitter, Web Crawler, etc.) [unspecified-high]
└── Task 8: Resources page (Anki cards, diagrams) [quick]

Wave 3 (After Wave 2 - interactive features):
├── Task 9: Search feature (Fuse.js integration) [unspecified-high]
├── Task 10: Code syntax highlighting (Prism.js) [quick]
├── Task 11: Diagram lightbox viewer [visual-engineering]
└── Task 12: Progress tracking (LocalStorage) [unspecified-high]

Wave 4 (After Wave 3 - polish + deploy):
├── Task 13: Dark/light theme toggle [quick]
├── Task 14: Mobile responsive design [visual-engineering]
├── Task 15: GitHub Pages deployment [quick]
└── Task 16: Final integration + cross-browser testing [unspecified-high]

Critical Path: Task 1 → Task 4 → Task 5 → Task 9 → Task 15 → Task 16
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 4 (Wave 1 & 3)
```

### Dependency Matrix

- **1-4**: No dependencies (can all start immediately)
- **5**: Depends on 2, 3 (design system + layout)
- **6-8**: Depend on 4 (content extraction)
- **9-12**: Depend on 5, 6 (pages exist)
- **13**: Depends on 2 (design tokens)
- **14**: Depends on 5, 6, 7 (pages exist)
- **15**: Depends on all previous tasks
- **16**: Depends on 15 (deployed)

### Agent Dispatch Summary

- **Wave 1**: 4 tasks - T1-T3 → `quick`, T4 → `unspecified-high`
- **Wave 2**: 4 tasks - T5 → `visual-engineering`, T6-T7 → `unspecified-high`, T8 → `quick`
- **Wave 3**: 4 tasks - T9 → `unspecified-high`, T10 → `quick`, T11 → `visual-engineering`, T12 → `unspecified-high`
- **Wave 4**: 4 tasks - T13 → `quick`, T14 → `visual-engineering`, T15 → `quick`, T16 → `unspecified-high`

---

## TODOs

- [x] 1. **Project Structure + GitHub Pages Setup**

  **What to do**:
  - Create `docs/` folder for GitHub Pages content
  - Set up directory structure: `docs/`, `docs/assets/css/`, `docs/assets/js/`, `docs/assets/images/`
  - Create `.nojekyll` file to disable Jekyll processing
  - Create initial `index.html` placeholder
  - Configure GitHub Pages to serve from `docs/` folder

  **Must NOT do**:
  - Create any build scripts (must be plain HTML/CSS/JS)
  - Add package.json or npm dependencies

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple scaffolding task, no complex logic
  - **Skills**: []
    - No special skills needed for basic file structure

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: Tasks 5-16 (all subsequent tasks)
  - **Blocked By**: None

  **References**:
  - GitHub Pages docs: `https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site` - Publishing from docs folder
  - Existing repo structure: `README.md`, `images/`, `solutions/` - Understand current organization

  **Acceptance Criteria**:
  - [ ] `docs/` folder exists with subdirectories
  - [ ] `.nojekyll` file exists in `docs/`
  - [ ] `docs/index.html` exists with basic HTML5 structure

  **QA Scenarios**:
  ```
  Scenario: Verify project structure exists
    Tool: Bash
    Steps:
      1. ls -la docs/
      2. ls -la docs/assets/
    Expected Result: docs/, docs/assets/css/, docs/assets/js/, docs/assets/images/ directories exist
    Evidence: .sisyphus/evidence/task-01-structure.txt
  ```

  **Commit**: YES
  - Message: `feat: add project scaffolding for GitHub Pages`
  - Files: `docs/`, `.nojekyll`

---

- [x] 2. **Design System Tokens (CSS Variables, Typography)**

  **What to do**:
  - Create `docs/assets/css/variables.css` with CSS custom properties
  - Define color tokens: light theme colors, dark theme colors
  - Define typography scale: monospace font stack (JetBrains Mono or Fira Code)
  - Define spacing scale: 4px base unit (4, 8, 12, 16, 24, 32, 48, 64)
  - Define border styles: raw, unpolished edges for brutalist aesthetic
  - Create `docs/assets/css/reset.css` with modern CSS reset

  **Must NOT do**:
  - Use Inter, Roboto, Arial, or system fonts
  - Use purple gradients or generic AI aesthetics
  - Add smooth border-radius (brutalist = sharp edges)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: CSS design tokens, straightforward styling
  - **Skills**: [`frontend-design`]
    - Typography and color palette decisions need design sense

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4)
  - **Blocks**: Tasks 5-16 (design decisions)
  - **Blocked By**: None

  **References**:
  - Modern CSS reset: `https://piccalil.li/blog/a-modern-css-reset/` - Minimal reset
  - Monospace fonts: `https://fonts.google.com/specimen/JetBrains+Mono` - Primary font option
  - Fira Code: `https://github.com/tonsky/FiraCode` - Alternative monospace

  **Acceptance Criteria**:
  - [ ] `variables.css` defines at least 20 color tokens
  - [ ] `variables.css` defines typography scale with monospace font
  - [ ] `reset.css` includes box-sizing, margin reset, font inheritance

  **QA Scenarios**:
  ```
  Scenario: Verify CSS variables exist
    Tool: Bash
    Steps:
      1. grep --count "^--" docs/assets/css/variables.css
    Expected Result: At least 20 CSS custom properties defined
    Evidence: .sisyphus/evidence/task-02-variables.txt
  ```

  **Commit**: NO (groups with Task 3)

---

- [x] 3. **Base HTML Layout + Navigation Skeleton**

  **What to do**:
  - Create `docs/assets/css/layout.css` with grid-based layout
  - Define page structure: header, sidebar navigation, main content, footer
  - Create navigation HTML component with topic links
  - Add skip-link for accessibility
  - Implement raw, structured grid aesthetic (no decorative flourishes)
  - Create placeholder structure for: search input, theme toggle, progress indicator

  **Must NOT do**:
  - Add smooth animations or hover effects (yet)
  - Use flexbox for main layout (grid is more brutalist)
  - Add rounded corners or shadows

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: HTML structure and basic CSS grid layout
  - **Skills**: [`frontend-design`]
    - Layout decisions need design sense

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: Tasks 5-16 (layout structure)
  - **Blocked By**: Task 2 (design tokens)

  **References**:
  - CSS Grid guide: `https://css-tricks.com/snippets/css/complete-guide-grid/` - Grid layout patterns
  - Skip link pattern: `https://webaim.org/techniques/skipnav/` - Accessibility

  **Acceptance Criteria**:
  - [ ] `layout.css` defines grid with header, sidebar, main, footer
  - [ ] Navigation HTML includes links to all topics
  - [ ] Skip-link exists in HTML

  **QA Scenarios**:
  ```
  Scenario: Verify layout structure
    Tool: Bash
    Steps:
      1. grep "grid-template" docs/assets/css/layout.css
    Expected Result: Grid template found with areas for header, sidebar, main
    Evidence: .sisyphus/evidence/task-03-layout.txt
  ```

  **Commit**: YES (with Task 2)
  - Message: `feat: add design system and base layout`
  - Files: `docs/assets/css/`

---

- [x] 4. **Content Extraction Script (README → HTML Pages)**

  **What to do**:
  - Create Node.js or Python script to parse README.md
  - Extract sections by h2 headers as page boundaries
  - Generate HTML files for each major topic:
    - `index.html` (home with topic overview)
    - `dns.html` (Domain Name System)
    - `cdn.html` (Content Delivery Network)
    - `load-balancer.html` (Load Balancer)
    - `database.html` (Database - RDBMS & NoSQL)
    - `cache.html` (Cache)
    - `asynchronism.html` (Asynchronism)
    - `communication.html` (Communication - TCP/UDP/HTTP)
    - `security.html` (Security)
    - `appendix.html` (Powers of two, latency numbers)
    - `solutions.html` (Index of solutions)
    - `solutions/pastebin.html`
    - `solutions/twitter.html`
    - `solutions/web-crawler.html`
    - `solutions/mint.html`
    - `solutions/social-graph.html`
    - `solutions/query-cache.html`
    - `solutions/sales-rank.html`
    - `solutions/scaling-aws.html`
    - `resources.html` (Anki, flashcards, links)
  - Convert Markdown to HTML (preserve code blocks, images, links)
  - Copy images to `docs/assets/images/`
  - Update image paths in generated HTML

  **Must NOT do**:
  - Reorganize content (preserve README structure exactly)
  - Add new content not in README
  - Remove any existing content

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Complex parsing and transformation logic, needs careful handling
  - **Skills**: []
    - No frontend skills needed, this is data transformation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3)
  - **Blocks**: Tasks 6-8 (need generated pages)
  - **Blocked By**: Task 1 (project structure)

  **References**:
  - README.md: Lines 89-1839 - Full content to extract
  - Markdown-to-HTML: `https://marked.js.org/` or `https://github.com/showdownjs/showdown` - JavaScript libraries
  - Python alternative: `https://pypi.org/project/markdown/` - If using Python
  - Header structure: Look for `## ` (h2) as section delimiters

  **Acceptance Criteria**:
  - [ ] Script runs without errors
  - [ ] Generates 15-20 HTML files in `docs/`
  - [ ] All code blocks preserved with correct syntax
  - [ ] All images copied to `docs/assets/images/`
  - [ ] Image paths updated in HTML to reference new location

  **QA Scenarios**:
  ```
  Scenario: Verify pages generated
    Tool: Bash
    Steps:
      1. ls -1 docs/*.html | wc -l
    Expected Result: At least 10 HTML files in docs/
    Evidence: .sisyphus/evidence/task-04-pages.txt

  Scenario: Verify images copied
    Tool: Bash
    Steps:
      1. ls -1 docs/assets/images/ | wc -l
    Expected Result: At least 10 images copied
    Evidence: .sisyphus/evidence/task-04-images.txt

  Scenario: Verify code blocks preserved
    Tool: Bash
    Steps:
      1. grep -r "<code>" docs/*.html | wc -l
    Expected Result: At least 50 code blocks found
    Evidence: .sisyphus/evidence/task-04-code.txt
  ```

  **Commit**: YES
  - Message: `feat: extract README content to HTML pages`
  - Files: `docs/*.html`, `docs/assets/images/`, extraction script

---

- [x] 5. **Home Page with Topic Overview**

  **What to do**:
  - Design `index.html` as landing page with brutalist aesthetic
  - Include hero section with site title and tagline
  - Create topic grid with links to all major sections
  - Add visual hierarchy: large monospace headers, exposed grid structure
  - Include brief description of each topic category
  - Add search bar placeholder (prominent, center-top)
  - Add theme toggle in header
  - Ensure raw, unpolished aesthetic (no gradients, no shadows)

  **Must NOT do**:
  - Add decorative images or hero illustrations
  - Use rounded corners or soft shadows
  - Add generic "AI slop" hero sections

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Landing page design needs visual design decisions
  - **Skills**: [`frontend-design`]
    - Critical for brutalist aesthetic execution

  **Parallelization**:
  - **Can Run In Parallel**: NO (depends on design system)
  - **Parallel Group**: Wave 2 (sequential with Tasks 6, 7, 8)
  - **Blocks**: Tasks 9-12 (need home page for navigation)
  - **Blocked By**: Tasks 2, 3, 4

  **References**:
  - Brutalist design examples: `https://brutalistwebsites.com/` - Visual inspiration
  - README.md lines 5-17: Site title and motivation
  - Design tokens from Task 2: Use CSS variables for consistency

  **Acceptance Criteria**:
  - [ ] Home page loads and displays topic grid
  - [ ] All topic links work and navigate to correct pages
  - [ ] Search bar visible in header
  - [ ] Theme toggle visible and styled

  **QA Scenarios**:
  ```
  Scenario: Home page displays correctly
    Tool: Playwright
    Steps:
      1. Navigate to file:///path/to/docs/index.html
      2. Wait for page load
      3. Screenshot full page
    Expected Result: Page renders with topic grid, search bar, theme toggle
    Evidence: .sisyphus/evidence/task-05-homepage.png

  Scenario: Topic links navigate correctly
    Tool: Playwright
    Steps:
      1. Click first topic link in grid
      2. Verify URL changes to topic page
      3. Verify topic content visible
    Expected Result: Navigation works, topic page loads
    Evidence: .sisyphus/evidence/task-05-navigation.png
  ```

  **Commit**: YES
  - Message: `feat: add home page with topic grid`
  - Files: `docs/index.html`

---

- [x] 6. **Topic Pages (DNS, CDN, Load Balancer, Database, Cache)**

  **What to do**:
  - Apply layout template to all generated topic pages
  - Add sidebar navigation showing all topics (highlight current)
  - Structure content with clear visual hierarchy
  - Add progress indicator in sidebar (checkbox per section)
  - Ensure code blocks have proper styling (waiting for highlighting)
  - Add image lightbox trigger class to all diagram images
  - Maintain brutalist aesthetic: monospace headers, grid alignment, raw edges

  **Must NOT do**:
  - Reorganize content from extraction
  - Add new sections not in README
  - Apply smooth animations (subtle only)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multiple pages to update, needs consistency
  - **Skills**: [`frontend-design`]
    - Visual hierarchy and layout decisions

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (with Tasks 5, 7, 8)
  - **Blocks**: Tasks 9-12 (need styled pages)
  - **Blocked By**: Task 4 (generated pages)

  **References**:
  - Generated HTML files: `docs/dns.html`, `docs/cdn.html`, etc.
  - Layout template from Task 3: Apply consistent structure
  - README.md original sections: Match content to source

  **Acceptance Criteria**:
  - [ ] All 8 topic pages have consistent layout
  - [ ] Sidebar navigation shows on all pages
  - [ ] Current topic highlighted in sidebar
  - [ ] Progress checkboxes visible in sidebar

  **QA Scenarios**:
  ```
  Scenario: Topic page layout consistent
    Tool: Playwright
    Steps:
      1. Navigate to docs/dns.html
      2. Verify sidebar exists
      3. Verify main content area exists
      4. Verify progress checkboxes visible
    Expected Result: Layout matches home page structure
    Evidence: .sisyphus/evidence/task-06-dns-layout.png

  Scenario: Sidebar navigation works
    Tool: Playwright
    Steps:
      1. Click "CDN" link in sidebar
      2. Verify URL is cdn.html
      3. Verify CDN content visible
    Expected Result: Navigation works, correct page loads
    Evidence: .sisyphus/evidence/task-06-sidebar-nav.png
  ```

  **Commit**: YES
  - Message: `feat: style all topic pages with layout`
  - Files: `docs/*.html` (all topic pages)

---

- [x] 7. **Solutions Pages (Pastebin, Twitter, Web Crawler, etc.)**

  **What to do**:
  - Apply layout template to solutions pages
  - Create solutions index page (`solutions.html`) with cards for each solution
  - Add solution navigation in sidebar (separate from topics)
  - Ensure code examples are properly formatted
  - Add back-link to main topics where relevant
  - Style architecture diagrams for lightbox
  - Include solution metadata (difficulty, concepts covered)

  **Must NOT do**:
  - Reorganize solution content
  - Add solutions not in README
  - Remove any existing solution details

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multiple solution pages, needs consistency
  - **Skills**: [`frontend-design`]
    - Card layout and visual hierarchy

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 8)
  - **Blocks**: Tasks 9-12 (need styled pages)
  - **Blocked By**: Task 4 (generated pages)

  **References**:
  - Solutions folder: `solutions/system_design/` - Original solution files
  - README.md solutions section: Lines 320-450 - Solution descriptions
  - Layout template: Same as topic pages

  **Acceptance Criteria**:
  - [ ] Solutions index page exists with cards for 8 solutions
  - [ ] Each solution page has consistent layout
  - [ ] Sidebar includes solution navigation
  - [ ] All architecture diagrams have lightbox class

  **QA Scenarios**:
  ```
  Scenario: Solutions index page displays
    Tool: Playwright
    Steps:
      1. Navigate to docs/solutions.html
      2. Verify 8 solution cards visible
      3. Click first card
    Expected Result: Index displays, navigation works
    Evidence: .sisyphus/evidence/task-07-solutions-index.png

  Scenario: Solution page loads correctly
    Tool: Playwright
    Steps:
      1. Navigate to docs/solutions/pastebin.html
      2. Verify architecture diagram exists
      3. Verify code examples visible
    Expected Result: Solution page renders with all content
    Evidence: .sisyphus/evidence/task-07-pastebin.png
  ```

  **Commit**: YES
  - Message: `feat: style solutions pages with cards`
  - Files: `docs/solutions.html`, `docs/solutions/*.html`

---

- [x] 8. **Resources Page (Anki, Flashcards, Links)**

  **What to do**:
  - Create `resources.html` with resource categories
  - Add Anki flashcard download links
  - Include company engineering blogs links (from README)
  - Add additional system design resources section
  - Style as card-based layout with external links
  - Add icons for resource types (PDF, deck, link)

  **Must NOT do**:
  - Add resources not in README
  - Remove any existing resource links

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single page with links, straightforward
  - **Skills**: [`frontend-design`]
    - Card layout styling

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 7)
  - **Blocks**: Tasks 9-12 (need styled page)
  - **Blocked By**: Task 4 (generated pages)

  **References**:
  - README.md resources section: Lines 46-73 - Anki decks
  - README.md blogs section: Lines 1700-1750 - Company engineering blogs
  - Resources folder: `resources/flash_cards/` - Anki deck files

  **Acceptance Criteria**:
  - [ ] Resources page exists with 3 sections
  - [ ] Anki deck download links work
  - [ ] Engineering blogs links open in new tab
  - [ ] External links have proper rel attributes

  **QA Scenarios**:
  ```
  Scenario: Resources page loads
    Tool: Playwright
    Steps:
      1. Navigate to docs/resources.html
      2. Verify Anki section visible
      3. Verify engineering blogs section visible
    Expected Result: Page renders with all resource sections
    Evidence: .sisyphus/evidence/task-08-resources.png

  Scenario: External links open correctly
    Tool: Playwright
    Steps:
      1. Right-click engineering blog link
      2. Verify target="_blank" attribute
    Expected Result: Links open in new tab
    Evidence: .sisyphus/evidence/task-08-links.txt
  ```

  **Commit**: YES
  - Message: `feat: add resources page with links`
  - Files: `docs/resources.html`

---

- [x] 9. **Search Feature (Fuse.js Integration)**

  **What to do**:
  - Add Fuse.js library via CDN to all pages
  - Create `docs/assets/js/search.js` module
  - Build search index from all page content (scrape at build time or lazy-load JSON)
  - Implement search input with debounced input handler
  - Create search results dropdown with highlighted matches
  - Add keyboard shortcut: Cmd/Ctrl+K to focus search
  - Add "no results" state
  - Lazy-load search index on first interaction (not on page load)

  **Must NOT do**:
  - Load search index on initial page load (performance)
  - Add server-side search (must be client-side only)
  - Index external links or non-content elements

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: JavaScript logic with performance considerations
  - **Skills**: []
    - No special skills needed for search logic

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (with Tasks 10, 11, 12)
  - **Blocks**: Task 16 (final integration)
  - **Blocked By**: Tasks 5-8 (pages must exist)

  **References**:
  - Fuse.js: `https://fusejs.io/` - Client-side search library
  - Search UI patterns: `https://www.nngroup.com/articles/autocomplete-design/` - UX best practices

  **Acceptance Criteria**:
  - [ ] Search input exists in header on all pages
  - [ ] Typing "cache" returns at least 3 results
  - [ ] Results show page title and snippet with highlight
  - [ ] Clicking result navigates to correct page
  - [ ] Cmd+K focuses search input
  - [ ] Search index loads only on first search interaction

  **QA Scenarios**:
  ```
  Scenario: Search returns results
    Tool: Playwright
    Steps:
      1. Navigate to docs/index.html
      2. Click search input
      3. Type "cache"
      4. Wait for results dropdown
    Expected Result: At least 3 results appear within 300ms
    Evidence: .sisyphus/evidence/task-09-search-results.png

  Scenario: Search keyboard shortcut works
    Tool: Playwright
    Steps:
      1. Navigate to docs/index.html
      2. Press Cmd+K (Mac) or Ctrl+K (Windows)
    Expected Result: Search input is focused
    Evidence: .sisyphus/evidence/task-09-search-shortcut.png

  Scenario: Search lazy loads index
    Tool: Playwright
    Steps:
      1. Navigate to docs/index.html
      2. Check network requests before search
      3. Click search input, type query
      4. Check network requests after search
    Expected Result: Search index JSON loaded only after first interaction
    Evidence: .sisyphus/evidence/task-09-search-lazy.txt
  ```

  **Commit**: YES
  - Message: `feat: add full-text search with Fuse.js`
  - Files: `docs/assets/js/search.js`

---

- [x] 10. **Code Syntax Highlighting (Prism.js)**

  **What to do**:
  - Add Prism.js library via CDN
  - Include language support: Python, SQL, JavaScript, Bash, JSON
  - Create `docs/assets/css/prism-theme.css` with brutalist theme (high contrast, monospace)
  - Add automatic highlighting to all `<code>` blocks
  - Ensure highlighting only runs on visible code blocks (intersection observer)
  - Test on large code blocks for performance

  **Must NOT do**:
  - Highlight code on scroll (performance issue)
  - Add line numbers (not in spec)
  - Add copy button (not in spec)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Library integration, straightforward
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (with Tasks 9, 11, 12)
  - **Blocks**: Task 16 (final integration)
  - **Blocked By**: Tasks 6-7 (pages with code blocks)

  **References**:
  - Prism.js: `https://prismjs.com/` - Syntax highlighter
  - Custom themes: `https://prismjs.com/examples.html` - Theme examples
  - Code blocks in README: Various sections have Python, SQL examples

  **Acceptance Criteria**:
  - [ ] All code blocks have syntax highlighting
  - [ ] Python code highlighted correctly
  - [ ] SQL code highlighted correctly
  - [ ] JavaScript code highlighted correctly
  - [ ] Theme matches brutalist aesthetic (high contrast)

  **QA Scenarios**:
  ```
  Scenario: Code blocks highlighted
    Tool: Playwright
    Steps:
      1. Navigate to docs/database.html
      2. Find code block
      3. Check for .token class elements
    Expected Result: Code block has syntax highlighting applied
    Evidence: .sisyphus/evidence/task-10-highlighting.png

  Scenario: Python code highlighted correctly
    Tool: Playwright
    Steps:
      1. Navigate to docs/cache.html (has Python example)
      2. Find Python code block
      3. Check for .token.keyword class
    Expected Result: Python keywords highlighted
    Evidence: .sisyphus/evidence/task-10-python.png
  ```

  **Commit**: YES
  - Message: `feat: add code syntax highlighting with Prism.js`
  - Files: `docs/assets/css/prism-theme.css`, all HTML files (CDN includes)

---

- [x] 11. **Diagram Lightbox Viewer**

  **What to do**:
  - Create `docs/assets/js/lightbox.js` module
  - Add click handler to all diagram images
  - Create modal overlay with dark background
  - Display full-size image in modal
  - Add close button (X) and click-outside-to-close
  - Add keyboard support: Escape to close
  - Add loading state for large images
  - Include image caption from alt text
  - Add subtle fade transition (not jarring, fits brutalist aesthetic)

  **Must NOT do**:
  - Add zoom/pan functionality (not in spec)
  - Add gallery navigation (not in spec)
  - Preload all full-size images (performance)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Modal UI design with accessibility considerations
  - **Skills**: [`frontend-design`]
    - Modal design and transitions

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (with Tasks 9, 10, 12)
  - **Blocks**: Task 16 (final integration)
  - **Blocked By**: Tasks 6-7 (pages with diagrams)

  **References**:
  - Lightbox patterns: `https://uxdesign.cc/designing-the-perfect-lightbox-8e5a06959e3c` - UX guidelines
  - Diagram images: `docs/assets/images/` - All PNG diagrams
  - Accessibility: `https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html` - Keyboard support

  **Acceptance Criteria**:
  - [ ] Clicking diagram image opens lightbox modal
  - [ ] Full-size image loads in modal
  - [ ] Clicking X or outside modal closes it
  - [ ] Pressing Escape closes modal
  - [ ] Loading spinner shows for slow images
  - [ ] Image caption displays from alt text

  **QA Scenarios**:
  ```
  Scenario: Lightbox opens on click
    Tool: Playwright
    Steps:
      1. Navigate to docs/dns.html
      2. Find first diagram image
      3. Click image
      4. Wait for modal to appear
    Expected Result: Modal opens with full-size image
    Evidence: .sisyphus/evidence/task-11-lightbox-open.png

  Scenario: Lightbox closes with Escape key
    Tool: Playwright
    Steps:
      1. Open lightbox (click diagram)
      2. Press Escape key
      3. Check modal is closed
    Expected Result: Modal closes, returns to page
    Evidence: .sisyphus/evidence/task-11-lightbox-close.png

  Scenario: Lightbox handles missing image
    Tool: Playwright
    Steps:
      1. Simulate broken image link
      2. Click image
      3. Verify error state shown
    Expected Result: Graceful error, no broken UI
    Evidence: .sisyphus/evidence/task-11-lightbox-error.png
  ```

  **Commit**: YES
  - Message: `feat: add diagram lightbox viewer`
  - Files: `docs/assets/js/lightbox.js`, `docs/assets/css/lightbox.css`

---

- [x] 12. **Progress Tracking (LocalStorage)**

  **What to do**:
  - Create `docs/assets/js/progress.js` module
  - Add checkbox for each topic section in sidebar
  - Track completion in LocalStorage: `{ topicId: { sectionId: boolean } }`
  - Mark section "complete" when:
    - User scrolls to bottom of section, AND
    - User clicks checkbox to confirm
  - Display overall progress percentage in header
  - Add progress bar on home page showing completion
  - Handle LocalStorage unavailable gracefully (private browsing)
  - Add "reset all progress" button in settings

  **Must NOT do**:
  - Send progress data to any external server
  - Rely on progress for core functionality (graceful degradation)
  - Track across devices (LocalStorage is browser-local)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: State management with edge cases
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (with Tasks 9, 10, 11)
  - **Blocks**: Task 16 (final integration)
  - **Blocked By**: Tasks 5-6 (pages and sidebar checkboxes)

  **References**:
  - LocalStorage API: `https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API` - Browser API
  - Progress UI patterns: `https://www.nngroup.com/articles/progress-indicators/` - UX guidelines

  **Acceptance Criteria**:
  - [ ] Each topic has progress checkboxes in sidebar
  - [ ] Checking a box persists to LocalStorage
  - [ ] Progress percentage displays in header
  - [ ] Progress bar on home page shows overall completion
  - [ ] Reset button clears all progress
  - [ ] Works in Chrome, Firefox, Safari

  **QA Scenarios**:
  ```
  Scenario: Progress persists across reload
    Tool: Playwright
    Steps:
      1. Navigate to docs/dns.html
      2. Click first section checkbox
      3. Reload page
      4. Check checkbox state
    Expected Result: Checkbox remains checked after reload
    Evidence: .sisyphus/evidence/task-12-progress-persist.png

  Scenario: Progress bar updates on home page
    Tool: Playwright
    Steps:
      1. Navigate to docs/dns.html
      2. Click checkbox
      3. Navigate to docs/index.html
      4. Check progress bar
    Expected Result: Progress bar shows increased percentage
    Evidence: .sisyphus/evidence/task-12-progress-bar.png

  Scenario: Graceful degradation when LocalStorage blocked
    Tool: Playwright
    Steps:
      1. Set browser context to block LocalStorage
      2. Navigate to docs/dns.html
      3. Try to click checkbox
    Expected Result: Checkbox works but shows warning, no console errors
    Evidence: .sisyphus/evidence/task-12-progress-nostorage.png
  ```

  **Commit**: YES
  - Message: `feat: add progress tracking with LocalStorage`
  - Files: `docs/assets/js/progress.js`, `docs/assets/css/progress.css`

---

- [x] 13. **Dark/Light Theme Toggle**

  **What to do**:
  - Create `docs/assets/js/theme.js` module
  - Add theme toggle button in header
  - Define dark theme colors in CSS variables
  - On first visit: respect `prefers-color-scheme` system setting
  - On toggle: save preference to LocalStorage
  - On subsequent visits: use saved preference
  - Apply theme immediately on page load (prevent FOUC - flash of unstyled content)
  - Add transition: subtle opacity fade (not jarring)

  **Must NOT do**:
  - Add theme per-page override (global only)
  - Use CSS transitions on all elements (performance)
  - Flash wrong theme on initial load

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple toggle with CSS variable swap
  - **Skills**: [`frontend-design`]
    - Dark theme color design

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (with Tasks 14, 15, 16)
  - **Blocks**: Task 16 (final integration)
  - **Blocked By**: Task 2 (design tokens)

  **References**:
  - CSS custom properties: `variables.css` from Task 2
  - prefers-color-scheme: `https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme`
  - Theme toggle patterns: `https://web.dev/prefers-color-scheme/` - Best practices

  **Acceptance Criteria**:
  - [ ] Theme toggle button exists in header
  - [ ] Clicking toggle switches between light and dark
  - [ ] Preference persists to LocalStorage
  - [ ] On reload, correct theme applied immediately
  - [ ] System preference respected on first visit

  **QA Scenarios**:
  ```
  Scenario: Theme toggle works
    Tool: Playwright
    Steps:
      1. Navigate to docs/index.html
      2. Click theme toggle button
      3. Check body class or data attribute
    Expected Result: Theme switches to dark/light
    Evidence: .sisyphus/evidence/task-13-theme-toggle.png

  Scenario: Theme persists across reload
    Tool: Playwright
    Steps:
      1. Click theme toggle to set dark mode
      2. Reload page
      3. Check theme state
    Expected Result: Page loads in dark mode
    Evidence: .sisyphus/evidence/task-13-theme-persist.png

  Scenario: System preference respected
    Tool: Playwright
    Steps:
      1. Clear LocalStorage
      2. Set browser to prefer dark color scheme
      3. Navigate to docs/index.html
      4. Check theme
    Expected Result: Page loads in dark mode
    Evidence: .sisyphus/evidence/task-13-theme-system.png
  ```

  **Commit**: YES
  - Message: `feat: add dark/light theme toggle`
  - Files: `docs/assets/js/theme.js`, `docs/assets/css/theme.css`

---

- [x] 14. **Mobile Responsive Design**

  **What to do**:
  - Add viewport meta tag to all pages
  - Create `docs/assets/css/mobile.css` with responsive styles
  - Implement 3 breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop)
  - Mobile layout:
    - Sidebar becomes hamburger menu
    - Single-column content
    - Search in header bar
    - Theme toggle visible
  - Tablet layout:
    - Collapsed sidebar
    - Two-column grid for topic cards
  - Ensure monospace text is readable at 16px minimum
  - Test touch targets are 44px minimum

  **Must NOT do**:
  - Hide features on mobile (all must work)
  - Use tiny text (below 16px)
  - Make touch targets smaller than 44px

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Responsive layout requires design decisions
  - **Skills**: [`frontend-design`]
    - Critical for mobile UX

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (with Tasks 13, 15, 16)
  - **Blocks**: Task 16 (final integration)
  - **Blocked By**: Tasks 5-8 (pages exist)

  **References**:
  - Responsive design: `https://web.dev/responsive-web-design-basics/` - Best practices
  - Mobile breakpoints: `https://getbootstrap.com/docs/5.0/layout/breakpoints/` - Common breakpoints
  - Touch targets: `https://web.dev/accessible-tap-targets/` - Accessibility guidelines

  **Acceptance Criteria**:
  - [ ] Pages render correctly at 375px width
  - [ ] Sidebar collapses to hamburger menu on mobile
  - [ ] All features work on mobile (search, lightbox, progress)
  - [ ] Text is readable at 16px minimum
  - [ ] Touch targets are 44px minimum

  **QA Scenarios**:
  ```
  Scenario: Mobile layout renders correctly
    Tool: Playwright
    Steps:
      1. Set viewport to 375x667 (iPhone SE)
      2. Navigate to docs/index.html
      3. Screenshot full page
    Expected Result: Single-column layout, hamburger menu visible
    Evidence: .sisyphus/evidence/task-14-mobile-layout.png

  Scenario: Hamburger menu works on mobile
    Tool: Playwright
    Steps:
      1. Set viewport to 375px
      2. Navigate to docs/index.html
      3. Click hamburger menu
      4. Verify sidebar navigation appears
    Expected Result: Sidebar opens, all navigation links visible
    Evidence: .sisyphus/evidence/task-14-hamburger.png

  Scenario: Lightbox works on mobile
    Tool: Playwright
    Steps:
      1. Set viewport to 375px
      2. Navigate to docs/dns.html
      3. Click diagram image
    Expected Result: Lightbox opens, image fits screen
    Evidence: .sisyphus/evidence/task-14-mobile-lightbox.png
  ```

  **Commit**: YES
  - Message: `feat: add mobile responsive design`
  - Files: `docs/assets/css/mobile.css`, all HTML files (viewport meta)

---

- [x] 15. **GitHub Pages Deployment**

  **What to do**:
  - Push `docs/` folder to GitHub repository
  - Configure GitHub Pages settings:
    - Source: Deploy from branch
    - Branch: main (or master)
    - Folder: /docs
  - Verify deployment URL works: `https://{username}.github.io/system-design-primer/`
  - Add CNAME file if custom domain is configured
  - Ensure HTTPS is enforced (GitHub Pages default)
  - Test all pages load from deployed URL
  - Verify all assets (CSS, JS, images) load correctly

  **Must NOT do**:
  - Deploy from root folder (must be /docs)
  - Disable HTTPS
  - Use custom domain without user confirmation

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Configuration and deployment
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (with Tasks 13, 14, 16)
  - **Blocks**: Task 16 (needs deployed URL)
  - **Blocked By**: All previous tasks (complete site)

  **References**:
  - GitHub Pages docs: `https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site` - Configuration guide
  - Repository: Already git initialized

  **Acceptance Criteria**:
  - [ ] Site deployed to GitHub Pages
  - [ ] URL `https://{username}.github.io/system-design-primer/` returns 200 OK
  - [ ] All pages load from deployed URL
  - [ ] All assets load (no 404s)
  - [ ] HTTPS enforced

  **QA Scenarios**:
  ```
  Scenario: Site deployed and accessible
    Tool: Bash
    Steps:
      1. curl -I https://{username}.github.io/system-design-primer/
    Expected Result: HTTP 200 OK response
    Evidence: .sisyphus/evidence/task-15-deploy.txt

  Scenario: All pages load without 404s
    Tool: Bash
    Steps:
      1. curl -I https://{username}.github.io/system-design-primer/dns.html
      2. curl -I https://{username}.github.io/system-design-primer/cache.html
      3. curl -I https://{username}.github.io/system-design-primer/solutions/pastebin.html
    Expected Result: All return 200 OK
    Evidence: .sisyphus/evidence/task-15-pages.txt

  Scenario: Assets load correctly
    Tool: Bash
    Steps:
      1. curl -I https://{username}.github.io/system-design-primer/assets/css/style.css
      2. curl -I https://{username}.github.io/system-design-primer/assets/js/search.js
    Expected Result: All assets return 200 OK
    Evidence: .sisyphus/evidence/task-15-assets.txt
  ```

  **Commit**: YES
  - Message: `deploy: configure GitHub Pages deployment`
  - Files: `.nojekyll`, deployment configuration

---

- [x] 16. **Final Integration + Cross-Browser Testing**

  **What to do**:
  - Test all features work together on deployed site
  - Test on Chrome (latest)
  - Test on Firefox (latest)
  - Test on Safari (latest)
  - Test on Edge (latest)
  - Test on mobile Chrome (Android)
  - Test on mobile Safari (iOS)
  - Verify all 4 features work:
    - Search returns results
    - Code highlighting applied
    - Lightbox opens/closes
    - Progress persists
  - Verify theme toggle works
  - Verify navigation works between all pages
  - Check for console errors
  - Test performance: First Contentful Paint < 3s
  - Fix any issues found

  **Must NOT do**:
  - Skip any browser testing
  - Ignore console errors
  - Accept performance > 5s load time

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Comprehensive testing with potential fixes
  - **Skills**: []
    - No special skills needed

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (final task)
  - **Blocks**: None
  - **Blocked By**: Task 15 (deployed site)

  **References**:
  - Deployed site: `https://{username}.github.io/system-design-primer/`
  - Browser testing checklist: Manual testing plan

  **Acceptance Criteria**:
  - [ ] Site works on Chrome, Firefox, Safari, Edge (latest versions)
  - [ ] Site works on mobile Chrome and Safari
  - [ ] All 4 features work correctly
  - [ ] Theme toggle works
  - [ ] Navigation works between all pages
  - [ ] No console errors in any browser
  - [ ] First Contentful Paint < 3s

  **QA Scenarios**:
  ```
  Scenario: All features work on Chrome
    Tool: Playwright (Chrome)
    Steps:
      1. Navigate to deployed site
      2. Test search (type "cache", verify results)
      3. Test lightbox (click image, verify opens)
      4. Test progress (click checkbox, verify persists)
      5. Test theme toggle (click, verify switches)
    Expected Result: All features work without errors
    Evidence: .sisyphus/evidence/task-16-chrome.png

  Scenario: All features work on Firefox
    Tool: Playwright (Firefox)
    Steps:
      1. Repeat same tests as Chrome
    Expected Result: All features work without errors
    Evidence: .sisyphus/evidence/task-16-firefox.png

  Scenario: All features work on Safari
    Tool: Playwright (WebKit)
    Steps:
      1. Repeat same tests as Chrome
    Expected Result: All features work without errors
    Evidence: .sisyphus/evidence/task-16-safari.png

  Scenario: Mobile features work
    Tool: Playwright (Mobile Chrome)
    Steps:
      1. Set viewport to 375x667
      2. Test all 4 features
      3. Test hamburger menu
    Expected Result: All features work on mobile
    Evidence: .sisyphus/evidence/task-16-mobile.png

  Scenario: Performance acceptable
    Tool: Playwright
    Steps:
      1. Navigate to deployed site
      2. Measure First Contentful Paint
    Expected Result: FCP < 3000ms
    Evidence: .sisyphus/evidence/task-16-performance.txt
  ```

  **Commit**: YES (if fixes needed)
  - Message: `fix: resolve cross-browser issues`
  - Files: Any files with fixes

---

## Final Verification Wave (MANDATORY)

- [x] F1. **Plan Compliance Audit** — `oracle`
- [x] F2. **Code Quality Review** — `unspecified-high`
- [x] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
- [x] F4. **Scope Fidelity Check** — `deep`

---

## Commit Strategy

- **Wave 1 Complete**: `feat: add project scaffolding and design system`
- **Wave 2 Complete**: `feat: add all content pages`
- **Wave 3 Complete**: `feat: add interactive features (search, highlight, lightbox, progress)`
- **Wave 4 Complete**: `feat: add theme toggle, mobile responsive, deploy to GitHub Pages`

---

## Success Criteria

### Verification Commands
```bash
# Check all pages exist
ls -la docs/*.html | wc -l  # Expected: 15-20 files

# Check CSS/JS files exist
ls -la docs/assets/css/style.css docs/assets/js/*.js

# Verify deployment
curl -I https://{username}.github.io/system-design-primer/  # Expected: 200 OK
```

### Final Checklist
- [ ] All pages load without errors
- [ ] Search works across all content
- [ ] Code highlighting applied to all code blocks
- [ ] Lightbox works on all diagram images
- [ ] Progress tracking persists and displays correctly
- [ ] Theme toggle works and persists preference
- [ ] Mobile layout is usable at 375px width
- [ ] Deployed to GitHub Pages successfully
