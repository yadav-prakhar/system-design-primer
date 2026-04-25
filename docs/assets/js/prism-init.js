(() => {
  function safeGetPrism() {
    return (typeof Prism !== 'undefined' && Prism) ? Prism : null;
  }

  function getCodeTargets() {
    // Only operate on code blocks that haven't been processed yet.
    return Array.from(document.querySelectorAll('pre > code')).filter((el) => {
      // Prism will add "prism--loaded" to processed elements in our init.
      return !el.classList.contains('prism--loaded');
    });
  }

  function process(el) {
    const prism = safeGetPrism();
    if (!prism) return;

    // Attempt to highlight using Prism's markup.
    // If a code element has language-xxx classes, Prism will pick it up.
    try {
      prism.highlightElement(el);
      el.classList.add('prism--loaded');
    } catch (e) {
      // Ignore highlighting errors to avoid breaking page scripts.
      // eslint-disable-next-line no-console
      console.warn('Prism highlight failed', e);
    }
  }

  function initIntersectionObserver() {
    const targets = getCodeTargets();
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(process);
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          process(entry.target);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        // Make sure highlighting happens shortly after it becomes visible.
        rootMargin: '0px 0px 120px 0px',
        threshold: 0.01,
      }
    );

    targets.forEach((el) => io.observe(el));
  }

  // Wait until DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntersectionObserver, { once: true });
  } else {
    initIntersectionObserver();
  }
})();
