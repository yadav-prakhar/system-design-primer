// Mobile sidebar toggle for System Design Primer

(() => {
  const sidebar = document.querySelector('.site-sidebar');
  const hamburger = document.querySelector('.hamburger-menu');

  if (!sidebar || !hamburger) return;

  const setExpanded = (isExpanded) => {
    hamburger.setAttribute('aria-expanded', String(isExpanded));
  };

  function toggleSidebar() {
    const willOpen = !sidebar.classList.contains('active');
    sidebar.classList.toggle('active');
    setExpanded(willOpen);
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.classList.contains('active')) return;
    const target = e.target;
    if (!(target instanceof Node)) return;
    if (sidebar.contains(target) || hamburger.contains(target)) return;
    sidebar.classList.remove('active');
    setExpanded(false);
  });

  // Close sidebar when clicking a link inside
  sidebar.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest('a')) {
      sidebar.classList.remove('active');
      setExpanded(false);
    }
  });
})();
