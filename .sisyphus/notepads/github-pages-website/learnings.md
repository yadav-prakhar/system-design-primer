### Task 03: Layout + navigation skeleton

- CSS Grid main wrapper via `grid-template-areas` cleanly separates header/sidebar/main/footer.
- A simple skip-link (`.skip-link` positioned off-screen, shown on focus) is enough for basic accessibility without JS.
- Keeping layout purely structural (borders, no rounding/shadows) matches the brutalist requirement.

Open questions:
- Current evidence file contains both grep outputs and header text; keep it simple for future tasks.

### Task 04: Content Extraction Script

**Key findings:**

1. **README contains raw HTML img tags**, not just markdown images. The script must handle both:
   - `<img src="images/foo.png">` (raw HTML)
   - `![Alt](images/foo.png)` (markdown images)

2. **Image path conversion** must happen BEFORE paragraph processing:
   - Paragraph processing (replacing `\n\n` with `</p><p>`) breaks image syntax if not done first
   - Solution: convert images first, then process paragraphs

3. **Script generates 20 pages total**:
   - 12 main topic pages (dns, cdn, load-balancer, database, cache, asynchronism, communication, security, appendix, solutions, resources, index)
   - 8 solution pages in solutions/ subdirectory

4. **36 images copied** from images/ to docs/assets/images/

5. **Code blocks preserved** using `<pre><code>` tags

6. **Bug found and fixed**: `SOLUTION_SOURCE_DIR` was misspelled as `SOLUTION_SOURCE_DIR` in one place

**QA results:**
- Pages generated: 20 (12 main + 8 solutions)
- Images copied: 36/36
- Code blocks preserved: 3 (appendix, communication, index)
- Old image paths (images/): 0
- New image paths (./assets/images/): working correctly

### Task 06: Populate Topic Pages with Content

**Key findings:**

1. **Sidebar active highlighting bug fixed**: The original script computed `currentPage` from title which didn't match sidebar hrefs.
   - Fix: Changed `generatePage(title, content, isHomepage)` to `generatePage(title, content, isHomepage, filename)` and use `filename` directly for `currentPage`.

2. **Pages populated with README content**:
   - dns.html: 6,090 bytes (Domain Name System content)
   - cdn.html: 6,049 bytes (Content Delivery Network content)
   - load-balancer.html: 14,674 bytes (Load Balancer + Reverse Proxy + Application Layer)
   - database.html: 26,243 bytes (RDBMS + NoSQL content)
   - cache.html: 13,242 bytes (Cache content)
   - asynchronism.html: 6,784 bytes (Asynchronism content)
   - communication.html: 17,483 bytes (TCP/UDP/HTTP/RPC/REST content)
   - security.html: 4,284 bytes (Security content)
   - appendix.html: 26,681 bytes (Powers of two, Latency numbers, etc.)

3. **All pages have consistent navigation**:
   - Sidebar with nav-heading "Topics" and nav-list
   - Active page highlighted with `class="nav-item active"`
   - Progress indicator present on all pages

4. **Evidence files created**:
   - `.sisyphus/evidence/task-06-content.txt`: Content verification
   - `.sisyphus/evidence/task-06-nav.txt`: Navigation verification

### Task 09: Full-Text Search with Fuse.js

**Key findings:**

1. **Search index generated separately** from HTML page generation:
   - `build_search_index.py` extracts content from `<main>` tags
   - Index stored in `docs/search-index.json` (85KB for 20 pages)
   - Title, URL, and content fields per entry

2. **Fuse.js loaded via CDN** from jsdelivr:
   - Added to all 20 HTML pages in `<head>` before `</head>`
   - Search.js loads Fuse.js lazily on first user interaction

3. **Lazy loading pattern**:
   - Search index NOT loaded on page load
   - Index fetched only when user types in search box
   - Fuse.js CDN also loaded on demand

4. **Search.js implementation features**:
   - Debounced input (300ms)
   - Cmd/Ctrl+K keyboard shortcut to focus search
   - Results dropdown with highlighted matches
   - "No results" state
   - Click outside to close results

5. **Content extraction from HTML**:
   - Strips `<script>` and `<style>` tags
   - Removes HTML comments
   - Replaces all tags with spaces
   - Cleans special characters but keeps punctuation
   - Extracts text from `<main>` or `<body>` sections

**QA results:**
- Pages with Fuse.js CDN: 20/20
- Pages indexed: 20
- Search index size: 85,873 bytes
- search.js file: 7,186 bytes
- Evidence: `.sisyphus/evidence/task-09-search.txt`

### Task 12: Progress Tracking Implementation

**Key findings:**

1. **LocalStorage schema**: `{ "sdp-progress": { "dns": true, "cdn": false, ... } }`
   - Key is 'sdp-progress'
   - Value is object mapping topic IDs to boolean completion status

2. **Graceful degradation**: `isStorageAvailable()` wraps localStorage access in try-catch
   - Returns false when localStorage blocked (private browsing, quotas)
   - All operations check storageAvailable flag before attempting I/O

3. **Topics tracked**: dns, cdn, load-balancer, database, cache, asynchronism, communication, security, appendix, solutions, resources

4. **Features implemented**:
   - Progress checkboxes injected into sidebar nav items
   - Header progress indicator updated on any change
   - Homepage progress bar with percentage and reset button
   - All progress synced via LocalStorage across pages

5. **CSS additions** in layout.css:
   - `.progress-bar-container`, `.progress-bar`, `.progress-bar-fill`
   - `.reset-progress-btn` with hover state
   - `.nav-progress-checkbox` for sidebar checkboxes

**Evidence files**:
- `.sisyphus/evidence/task-12-files.txt`: Progress module exists
- `.sisyphus/evidence/task-12-links.txt`: Script linked in 20 HTML files
