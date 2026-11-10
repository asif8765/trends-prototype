/**
 * TRENDS BRAND CONFIG — single source of truth
 * ------------------------------------------------
 * To rename the platform later, edit THIS FILE ONLY:
 *   - name, logoText, tagline
 *   - colors (injected as CSS variables on :root)
 *
 * Every page loads this script first. layout.js fills
 * [data-brand], [data-logo], and [data-tagline] nodes.
 * CSS and Tailwind both consume the --color-* variables.
 */
window.BRAND = {
  name: "Trends",
  logoText: "Trends",
  tagline: "Import, sell, and collect COD — Pakistan-first dropshipping",
  shortTagline: "Pakistan COD dropshipping for stores",
  colors: {
    primary: "#0F3D3A",
    primarySoft: "#1A5C57",
    primaryMuted: "#E6F0EE",
    accent: "#E8A838",
    accentSoft: "#F8E7C3",
    ink: "#12221F",
    paper: "#F6F3EE",
    surface: "#FFFDF9",
    muted: "#5B6B68",
    line: "#D9D4C8",
    success: "#1B7A4A",
    successSoft: "#E5F6EC",
    warning: "#B45309",
    warningSoft: "#FEF3C7",
    danger: "#B42318",
    dangerSoft: "#FEE4E2",
    restricted: "#7C2D12",
    suspended: "#3F0D0A",
    healthy: "#157347",
    atRisk: "#C2410C",
  },
};

(function applyBrandCssVars(brand) {
  var root = document.documentElement;
  var c = brand.colors;
  var map = {
    "--brand-name": brand.name,
    "--color-primary": c.primary,
    "--color-primary-soft": c.primarySoft,
    "--color-primary-muted": c.primaryMuted,
    "--color-accent": c.accent,
    "--color-accent-soft": c.accentSoft,
    "--color-ink": c.ink,
    "--color-paper": c.paper,
    "--color-surface": c.surface,
    "--color-muted": c.muted,
    "--color-line": c.line,
    "--color-success": c.success,
    "--color-success-soft": c.successSoft,
    "--color-warning": c.warning,
    "--color-warning-soft": c.warningSoft,
    "--color-danger": c.danger,
    "--color-danger-soft": c.dangerSoft,
    "--color-restricted": c.restricted,
    "--color-suspended": c.suspended,
    "--color-healthy": c.healthy,
    "--color-at-risk": c.atRisk,
  };
  Object.keys(map).forEach(function (k) {
    root.style.setProperty(k, map[k]);
  });
})(window.BRAND);
