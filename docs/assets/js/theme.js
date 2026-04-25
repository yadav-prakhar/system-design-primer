// Theme toggle for System Design Primer
// - Respects prefers-color-scheme
// - Persists choice to localStorage
// - Prevents FOUC by setting data-theme synchronously

(() => {
  const STORAGE_KEY = "system_design_primer_theme";
  const html = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");

  const getPreferredTheme = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const applyTheme = (theme) => {
    const next = theme === "dark" ? "dark" : "light";
    html.setAttribute("data-theme", next);

    if (toggle) {
      toggle.dataset.theme = next;
      const nextLabel = next === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", `Switch to ${nextLabel} theme`);
    }
  };

  const readSavedTheme = () => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "dark" || v === "light") return v;
    } catch (_) {
      // ignore
    }
    return null;
  };

  // 1) Apply immediately (pre-FOUC)
  // Prefer localStorage; otherwise use prefers-color-scheme.
  const saved = readSavedTheme();
  const initialTheme = saved ?? getPreferredTheme();
  applyTheme(initialTheme);

  // 2) Wire up toggle
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);

      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (_) {
        // ignore
      }
    });
  }

  // 3) If user hasn't chosen explicitly, keep in sync with OS setting
  const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  if (media) {
    const hasSaved = saved === "dark" || saved === "light";
    if (!hasSaved) {
      // Modern browsers
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", (e) => applyTheme(e.matches ? "dark" : "light"));
      } else if (typeof media.addListener === "function") {
        // Fallback
        media.addListener((e) => applyTheme(e.matches ? "dark" : "light"));
      }
    }
  }
})();
