(function() {
  'use strict';

  let fuse = null;
  let searchIndex = null;
  let debounceTimer = null;
  const DEBOUNCE_MS = 300;
  const INDEX_PATH = './search-index.json';
  const FUSE_CDN = 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js';

  function initFuse() {
    if (typeof Fuse !== 'undefined') {
      fuse = new Fuse(searchIndex, {
        keys: ['title', 'content'],
        threshold: 0.3,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2
      });
    }
  }

  function loadSearchIndex() {
    return fetch(INDEX_PATH)
      .then(function(response) {
        if (!response.ok) throw new Error('Failed to load search index');
        return response.json();
      })
      .then(function(data) {
        searchIndex = data;
        initFuse();
        return fuse;
      });
  }

  function highlightMatches(text, matches, key) {
    if (!matches || !text) return text;
    var result = text;
    var matchKeyMatches = matches.filter(function(m) { return m.key === key; });
    if (matchKeyMatches.length === 0) return result;
    matchKeyMatches.forEach(function(match) {
      if (match.indices && match.indices.length > 0) {
        var highlighted = '';
        var lastIndex = 0;
        match.indices.forEach(function(indices) {
          var start = indices[0];
          var end = indices[1] + 1;
          highlighted += result.substring(lastIndex, start);
          highlighted += '<mark>' + result.substring(start, end) + '</mark>';
          lastIndex = end;
        });
        highlighted += result.substring(lastIndex);
        result = highlighted;
      }
    });
    return result;
  }

  function showResults(query, results) {
    var dropdown = document.getElementById('search-results');
    if (!dropdown) return;

    if (results.length === 0) {
      dropdown.innerHTML = '<div class="search-no-results">No results for "' + query + '"</div>';
      dropdown.style.display = 'block';
      return;
    }

    var html = '';
    results.slice(0, 8).forEach(function(result) {
      var title = highlightMatches(result.item.title, result.matches, 'title');
      var snippet = result.item.content.substring(0, 120) + '...';
      html += '<a href="' + result.item.url + '" class="search-result-item">';
      html += '<div class="search-result-title">' + title + '</div>';
      html += '<div class="search-result-snippet">' + snippet + '</div>';
      html += '</a>';
    });

    dropdown.innerHTML = html;
    dropdown.style.display = 'block';
  }

  function hideResults() {
    var dropdown = document.getElementById('search-results');
    if (dropdown) dropdown.style.display = 'none';
  }

  function performSearch(query) {
    if (!query || query.length < 2) {
      hideResults();
      return;
    }

    if (!fuse) {
      loadSearchIndex().then(function() {
        performSearch(query);
      });
      return;
    }

    var results = fuse.search(query);
    showResults(query, results);
  }

  function debouncedSearch(query) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      performSearch(query);
    }, DEBOUNCE_MS);
  }

  function setupKeyboardShortcut() {
    document.addEventListener('keydown', function(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        var input = document.getElementById('site-search');
        if (input) {
          input.focus();
          input.select();
        }
      }
      if (e.key === 'Escape') {
        hideResults();
        var input = document.getElementById('site-search');
        if (input) input.blur();
      }
    });
  }

  function setupSearchInput() {
    var input = document.getElementById('site-search');
    if (!input) return;

    input.addEventListener('input', function() {
      var query = input.value.trim();
      if (query.length > 0) {
        debouncedSearch(query);
      } else {
        hideResults();
      }
    });

    input.addEventListener('focus', function() {
      var query = input.value.trim();
      if (query.length > 1 && searchIndex) {
        performSearch(query);
      }
    });
  }

  function setupClickOutside() {
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.header-search') && !e.target.closest('#search-results')) {
        hideResults();
      }
    });
  }

  function createDropdown() {
    var existing = document.getElementById('search-results');
    if (existing) existing.remove();

    var dropdown = document.createElement('div');
    dropdown.id = 'search-results';
    dropdown.className = 'search-results-dropdown';
    dropdown.style.display = 'none';

    var searchForm = document.querySelector('.header-search');
    if (searchForm) {
      searchForm.style.position = 'relative';
      searchForm.appendChild(dropdown);
    }
  }

  function addStyles() {
    if (document.getElementById('search-styles')) return;

    var style = document.createElement('style');
    style.id = 'search-styles';
    style.textContent = [
      '.search-results-dropdown {',
      '  position: absolute;',
      '  top: 100%;',
      '  left: 0;',
      '  right: 0;',
      '  background: var(--color-bg, #fff);',
      '  border: 2px solid var(--color-stroke, #000);',
      '  border-top: none;',
      '  max-height: 400px;',
      '  overflow-y: auto;',
      '  z-index: 1000;',
      '}',
      '.search-result-item {',
      '  display: block;',
      '  padding: 12px;',
      '  border-bottom: 1px solid var(--color-stroke-soft, #222);',
      '  text-decoration: none;',
      '  color: var(--color-text, #0a0a0a);',
      '}',
      '.search-result-item:hover {',
      '  background: var(--color-surface, #f5f5f5);',
      '}',
      '.search-result-title {',
      '  font-weight: 700;',
      '  margin-bottom: 4px;',
      '}',
      '.search-result-snippet {',
      '  font-size: 13px;',
      '  color: var(--color-muted, #3a3a3a);',
      '  white-space: nowrap;',
      '  overflow: hidden;',
      '  text-overflow: ellipsis;',
      '}',
      '.search-no-results {',
      '  padding: 12px;',
      '  text-align: center;',
      '  color: var(--color-muted, #3a3a3a);',
      '}',
      'mark {',
      '  background: var(--color-selection-bg, #c7ddff);',
      '  color: inherit;',
      '  padding: 0 2px;',
      '}'
    ].join('\n');

    document.head.appendChild(style);
  }

  function loadFuse() {
    return new Promise(function(resolve, reject) {
      if (typeof Fuse !== 'undefined') {
        resolve();
        return;
      }
      var script = document.createElement('script');
      script.src = FUSE_CDN;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function init() {
    loadFuse().then(function() {
      createDropdown();
      addStyles();
      setupSearchInput();
      setupKeyboardShortcut();
      setupClickOutside();
    }).catch(function(err) {
      console.error('Failed to load Fuse.js:', err);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();