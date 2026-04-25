/**
 * Content Extraction Script
 * Parses README.md and generates HTML pages for the System Design Primer website.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const README_PATH = path.join(__dirname, '..', 'README.md');
const IMAGES_SOURCE_DIR = path.join(__dirname, '..', 'images');
const IMAGES_TARGET_DIR = path.join(__dirname, '..', 'docs', 'assets', 'images');
const OUTPUT_DIR = path.join(__dirname, '..', 'docs');
const SOLUTIONS_SOURCE_DIR = path.join(__dirname, '..', 'solutions', 'system_design');
const SOLUTIONS_TARGET_DIR = path.join(__dirname, '..', 'docs', 'solutions');

// Page mappings based on h2 headers
const PAGE_MAPPINGS = {
  'Motivation': { file: 'index.html', title: 'System Design Primer' },
  'Anki flashcards': { file: 'index.html', title: 'System Design Primer' },
  'Contributing': { file: 'index.html', title: 'System Design Primer' },
  'Index of system design topics': { file: 'index.html', title: 'System Design Primer' },
  'Study guide': { file: 'index.html', title: 'System Design Primer' },
  'How to approach a system design interview question': { file: 'index.html', title: 'System Design Primer' },
  'System design interview questions with solutions': { file: 'solutions.html', title: 'System Design Solutions' },
  'Object-oriented design interview questions with solutions': { file: 'solutions.html', title: 'System Design Solutions' },
  'System design topics: start here': { file: 'index.html', title: 'System Design Primer' },
  'Performance vs scalability': { file: 'index.html', title: 'System Design Primer' },
  'Latency vs throughput': { file: 'index.html', title: 'System Design Primer' },
  'Availability vs consistency': { file: 'index.html', title: 'System Design Primer' },
  'Consistency patterns': { file: 'index.html', title: 'System Design Primer' },
  'Availability patterns': { file: 'index.html', title: 'System Design Primer' },
  'Domain name system': { file: 'dns.html', title: 'Domain Name System (DNS)' },
  'Content delivery network': { file: 'cdn.html', title: 'Content Delivery Network (CDN)' },
  'Load balancer': { file: 'load-balancer.html', title: 'Load Balancer' },
  'Reverse proxy (web server)': { file: 'load-balancer.html', title: 'Load Balancer' },
  'Application layer': { file: 'load-balancer.html', title: 'Load Balancer' },
  'Database': { file: 'database.html', title: 'Database (RDBMS & NoSQL)' },
  'Cache': { file: 'cache.html', title: 'Cache' },
  'Asynchronism': { file: 'asynchronism.html', title: 'Asynchronism' },
  'Communication': { file: 'communication.html', title: 'Communication (TCP/UDP/HTTP)' },
  'Security': { file: 'security.html', title: 'Security' },
  'Appendix': { file: 'appendix.html', title: 'Appendix' },
  'Under development': { file: 'index.html', title: 'System Design Primer' },
  'Credits': { file: 'index.html', title: 'System Design Primer' },
  'Contact info': { file: 'index.html', title: 'System Design Primer' },
  'License': { file: 'index.html', title: 'System Design Primer' }
};

// Solution pages
const SOLUTION_PAGES = [
  { name: 'pastebin', title: 'Design Pastebin.com (or Bit.ly)' },
  { name: 'twitter', title: 'Design Twitter Timeline and Search' },
  { name: 'web_crawler', title: 'Design a Web Crawler' },
  { name: 'mint', title: 'Design Mint.com' },
  { name: 'social_graph', title: 'Design Data Structures for a Social Network' },
  { name: 'query_cache', title: 'Design a Key-Value Store for a Search Engine' },
  { name: 'sales_rank', title: 'Design Amazon\'s Sales Ranking by Category' },
  { name: 'scaling_aws', title: 'Design a System that Scales to Millions of Users on AWS' }
];

/**
 * Parse README.md and extract sections by h2 headers
 */
function parseReadme() {
  console.log('Reading README.md...');
  const content = fs.readFileSync(README_PATH, 'utf8');
  const lines = content.split('\n');

  const sections = [];
  let currentSection = null;
  let currentContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for h2 header (starts with ## )
    if (line.match(/^## /)) {
      // Save previous section
      if (currentSection) {
        sections.push({
          header: currentSection,
          content: currentContent.join('\n').trim()
        });
      }

      // Start new section
      currentSection = line.replace(/^## /, '').trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  // Don't forget the last section
  if (currentSection) {
    sections.push({
      header: currentSection,
      content: currentContent.join('\n').trim()
    });
  }

  console.log(`Found ${sections.length} sections`);
  return sections;
}

/**
 * Convert Markdown to basic HTML
 */
function markdownToHtml(markdown) {
  let html = markdown;

  html = html.replace(/<img src="images\/([^"]+)"([^>]*)>/g, (match, filename, rest) => {
    return `<img src="./assets/images/${filename}"${rest} class="diagram" loading="lazy" />`;
  });

  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    let newSrc = src;
    if (src.startsWith('images/')) {
      newSrc = './assets/images/' + src.replace('images/', '');
    } else if (src.startsWith('http')) {
      newSrc = src;
    }
    return `<img src="${newSrc}" alt="${alt}" class="diagram" loading="lazy" />`;
  });

  // Handle code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const langClass = lang ? ` class="language-${lang}"` : '';
    return `<pre><code${langClass}>${escapeHtml(code.trim())}</code></pre>`;
  });

  // Handle inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Handle headers (h2, h3, h4)
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');

  // Handle bold and italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Handle links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Handle paragraphs (double newlines)
  html = html.replace(/\n\n+/g, '</p><p>');

  // Handle single newlines within paragraphs
  html = html.replace(/\n/g, '<br />');

  // Wrap in paragraph tags if not already wrapped
  if (!html.startsWith('<h') && !html.startsWith('<pre') && !html.startsWith('<ul') && !html.startsWith('<ol') && !html.startsWith('<p')) {
    html = '<p>' + html + '</p>';
  }

  // Handle horizontal rules
  html = html.replace(/^---$/gm, '<hr />');

  // Handle blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // Handle tables
  html = html.replace(/\|(.+)\|\n\|[-: |]+\|\n((?:\|.+\|\n?)+)/g, (match, header, body) => {
    const headerCells = header.split('|').filter(c => c.trim());
    const rows = body.trim().split('\n');
    let table = '<table><thead><tr>';
    headerCells.forEach(cell => {
      table += `<th>${cell.trim()}</th>`;
    });
    table += '</tr></thead><tbody>';
    rows.forEach(row => {
      const cells = row.split('|').filter(c => c.trim());
      table += '<tr>';
      cells.forEach(cell => {
        table += `<td>${cell.trim()}</td>`;
      });
      table += '</tr>';
    });
    table += '</tbody></table>';
    return table;
  });

  // Handle unordered lists
  html = html.replace(/^[*\-] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  // Handle ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>\s*(<h[123]>)/g, '$1');
  html = html.replace(/(<\/h[123]>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<pre>)/g, '$1');
  html = html.replace(/(<\/pre>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<table>)/g, '$1');
  html = html.replace(/(<\/table>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<blockquote>)/g, '$1');
  html = html.replace(/(<\/blockquote>)\s*<\/p>/g, '$1');

  return html;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate HTML page with base template
 */
function generatePage(title, content, isHomepage = false, filename = '') {
  const sidebarLinks = [
    { href: 'dns.html', label: 'DNS' },
    { href: 'cdn.html', label: 'CDN' },
    { href: 'load-balancer.html', label: 'Load Balancer' },
    { href: 'database.html', label: 'Database' },
    { href: 'cache.html', label: 'Cache' },
    { href: 'asynchronism.html', label: 'Asynchronism' },
    { href: 'communication.html', label: 'Communication' },
    { href: 'security.html', label: 'Security' },
    { href: 'appendix.html', label: 'Appendix' },
    { href: 'solutions.html', label: 'Solutions' },
    { href: 'resources.html', label: 'Resources' }
  ];

  const currentPage = isHomepage ? 'index.html' : filename;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <link rel="stylesheet" href="./assets/css/reset.css" />
  <link rel="stylesheet" href="./assets/css/variables.css" />
  <link rel="stylesheet" href="./assets/css/layout.css" />
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <div class="site">
    <header class="site-header" role="banner">
      <a href="index.html" class="site-title">System Design Primer</a>

      <div class="header-tools" aria-label="Site tools">
        <form class="header-search" action="#" method="get" role="search">
          <label for="site-search" class="sr-only">Search</label>
          <input id="site-search" name="q" type="search" placeholder="Search..." autocomplete="off" />
        </form>

        <button class="theme-toggle" type="button" aria-label="Toggle theme">Theme</button>
      </div>

      <div class="progress-indicator" aria-label="Progress">Progress: 0%</div>
    </header>

    <aside class="site-sidebar" aria-label="Topic navigation">
      <nav aria-label="Primary">
        <h2 class="nav-heading">Topics</h2>
        <ul class="nav-list">
          ${sidebarLinks.map(link => `
          <li class="nav-item${link.href === currentPage ? ' active' : ''}">
            <a href="${link.href}">${link.label}</a>
          </li>`).join('\n          ')}
        </ul>
      </nav>
    </aside>

    <main id="main" class="site-main" role="main">
      <article class="page-content">
        ${content}
      </article>
    </main>

    <footer class="site-footer" role="contentinfo">
      <div class="footer-left">© System Design Primer</div>
      <div class="footer-right">
        <a href="https://github.com/donnemartin/system-design-primer">GitHub</a>
      </div>
    </footer>
  </div>

  <script src="./assets/js/theme.js"></script>
  <script src="./assets/js/search.js"></script>
  <script src="./assets/js/progress.js"></script>
  <script src="./assets/js/lightbox.js"></script>
</body>
</html>`;
}

/**
 * Build homepage with all topics overview
 */
function buildHomepage(sections) {
  const topicSections = sections.filter(s =>
    ['Domain name system', 'Content delivery network', 'Load balancer', 'Database',
     'Cache', 'Asynchronism', 'Communication', 'Security', 'Appendix'].includes(s.header)
  );

  let content = `<h1>The System Design Primer</h1>
<p>Learn how to design large-scale systems. Prep for the system design interview.</p>

<h2>Index of System Design Topics</h2>
<p>Summaries of various system design topics, including pros and cons. Everything is a trade-off.</p>

<ul class="topic-index">`;

  const topicLinks = [
    { href: 'dns.html', label: 'Domain Name System (DNS)' },
    { href: 'cdn.html', label: 'Content Delivery Network (CDN)' },
    { href: 'load-balancer.html', label: 'Load Balancer' },
    { href: 'database.html', label: 'Database (RDBMS & NoSQL)' },
    { href: 'cache.html', label: 'Cache' },
    { href: 'asynchronism.html', label: 'Asynchronism' },
    { href: 'communication.html', label: 'Communication (TCP/UDP/HTTP)' },
    { href: 'security.html', label: 'Security' },
    { href: 'appendix.html', label: 'Appendix' },
    { href: 'solutions.html', label: 'System Design Interview Questions with Solutions' },
    { href: 'resources.html', label: 'Resources (Anki Flashcards)' }
  ];

  topicLinks.forEach(topic => {
    content += `\n  <li><a href="${topic.href}">${topic.label}</a></li>`;
  });

  content += `\n</ul>

<h2>System Design Interview Questions with Solutions</h2>
<p>Practice common system design interview questions and compare your results with sample solutions.</p>

<ul class="solutions-index">`;

  SOLUTION_PAGES.forEach(sol => {
    content += `\n  <li><a href="solutions/${sol.name}.html">${sol.title}</a></li>`;
  });

  content += `\n</ul>`;

  return generatePage('System Design Primer', content, true);
}

/**
 * Copy images from source to target directory
 */
function copyImages() {
  console.log('Copying images...');

  // Ensure target directory exists
  if (!fs.existsSync(IMAGES_TARGET_DIR)) {
    fs.mkdirSync(IMAGES_TARGET_DIR, { recursive: true });
  }

  const files = fs.readdirSync(IMAGES_SOURCE_DIR);
  let count = 0;

  files.forEach(file => {
    if (file.match(/\.(png|jpg|jpeg|gif|webp)$/i)) {
      const src = path.join(IMAGES_SOURCE_DIR, file);
      const dest = path.join(IMAGES_TARGET_DIR, file);
      fs.copyFileSync(src, dest);
      count++;
    }
  });

  console.log(`Copied ${count} images to ${IMAGES_TARGET_DIR}`);
  return count;
}

/**
 * Generate solutions pages
 */
function generateSolutionsPages() {
  console.log('Generating solution pages...');

  if (!fs.existsSync(SOLUTIONS_TARGET_DIR)) {
    fs.mkdirSync(SOLUTIONS_TARGET_DIR, { recursive: true });
  }

  SOLUTION_PAGES.forEach(solution => {
    const readmePath = path.join(SOLUTIONS_SOURCE_DIR, solution.name, 'README.md');
    let content = `<h1>${solution.title}</h1>`;

    if (fs.existsSync(readmePath)) {
      const markdown = fs.readFileSync(readmePath, 'utf8');
      content += markdownToHtml(markdown);
    } else {
      content += `<p>Solution content coming soon.</p>`;
    }

    const html = generatePage(solution.title, content);
    const outputPath = path.join(SOLUTIONS_TARGET_DIR, `${solution.name}.html`);
    fs.writeFileSync(outputPath, html);
    console.log(`Created: ${outputPath}`);
  });
}

/**
 * Generate main topic pages
 */
function generateTopicPages(sections) {
  console.log('Generating topic pages...');

  // Group sections by target file
  const pageGroups = {};

  sections.forEach(section => {
    let targetFile = 'index.html';
    let pageTitle = 'System Design Primer';

    if (PAGE_MAPPINGS[section.header]) {
      targetFile = PAGE_MAPPINGS[section.header].file;
      pageTitle = PAGE_MAPPINGS[section.header].title;
    }

    if (!pageGroups[targetFile]) {
      pageGroups[targetFile] = { title: pageTitle, sections: [] };
    }
    pageGroups[targetFile].sections.push(section);
  });

  // Generate each page
  Object.entries(pageGroups).forEach(([filename, { title, sections }]) => {
    const content = sections.map(s => {
      const htmlContent = markdownToHtml(s.content);
      return `<section id="${s.header.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">
        <h2>${s.header}</h2>
        ${htmlContent}
      </section>`;
    }).join('\n');

    const html = generatePage(title, content, filename === 'index.html', filename);
    const outputPath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(outputPath, html);
    console.log(`Created: ${outputPath}`);
  });
}

/**
 * Generate resources page
 */
function generateResourcesPage() {
  const content = `
<h1>Resources</h1>

<h2>Anki Flashcards</h2>
<p>The provided Anki flashcard decks use spaced repetition to help you retain key system design concepts.</p>

<ul>
  <li><a href="https://github.com/donnemartin/system-design-primer/tree/master/resources/flash_cards/System%20Design.apkg">System Design Deck</a></li>
  <li><a href="https://github.com/donnemartin/system-design-primer/tree/master/resources/flash_cards/System%20Design%20Exercises.apkg">System Design Exercises Deck</a></li>
  <li><a href="https://github.com/donnemartin/system-design-primer/tree/master/resources/flash_cards/OO%20Design.apkg">Object Oriented Design Exercises Deck</a></li>
</ul>

<h2>Engineering Blogs</h2>
<ul>
  <li><a href="https://engineering.fb.com/" target="_blank">Facebook Engineering</a></li>
  <li><a href="https://engineering.twitter.com/" target="_blank">Twitter Engineering</a></li>
  <li><a href="https://netflixtechblog.com/" target="_blank">Netflix Tech Blog</a></li>
  <li><a href="https://aws.amazon.com/blogs/aws/" target="_blank">AWS Blog</a></li>
  <li><a href="https://slack.engineering/" target="_blank">Slack Engineering</a></li>
  <li><a href="https://stripe.com/blog/engineering" target="_blank">Stripe Engineering Blog</a></li>
  <li><a href="https://github.blog/category/engineering/" target="_blank">GitHub Engineering Blog</a></li>
  <li><a href="https://labs.spotify.com/" target="_blank">Spotify Labs</a></li>
</ul>

<h2>Additional Resources</h2>
<ul>
  <li><a href="https://github.com/donnemartin/interactive-coding-challenges">Interactive Coding Challenges</a> - Sister repo for coding interview prep</li>
  <li><a href="https://apps.ankiweb.net/" target="_blank">Anki Web</a> - Spaced repetition software</li>
</ul>`;

  const html = generatePage('Resources', content);
  const outputPath = path.join(OUTPUT_DIR, 'resources.html');
  fs.writeFileSync(outputPath, html);
  console.log(`Created: ${outputPath}`);
}

/**
 * Main execution
 */
function main() {
  console.log('=== Content Extraction Script ===\n');

  try {
    // Parse README
    const sections = parseReadme();

    // Copy images
    const imageCount = copyImages();

    // Generate topic pages
    generateTopicPages(sections);

    // Generate solutions pages
    generateSolutionsPages();

    // Generate resources page
    generateResourcesPage();

    // Copy images count for reporting
    console.log(`\n=== Summary ===`);
    console.log(`Sections parsed: ${sections.length}`);
    console.log(`Images copied: ${imageCount}`);
    console.log(`Pages generated in: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();