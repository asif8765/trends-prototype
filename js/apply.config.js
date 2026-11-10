/**
 * EARLY-ACCESS APPLICATION CONFIG
 * --------------------------------
 * FORM_ENDPOINT: paste your Google Apps Script web-app URL here (ends in /exec).
 *   See docs/google-sheet-setup.md. Leave "" to run in DEMO MODE:
 *   applications are stored only in this browser (localStorage).
 */
window.APPLY_CONFIG = {
  FORM_ENDPOINT: "",
  spots: { supplier: 80, reseller: 120 },
  // Demo-mode counter start values (ignored when FORM_ENDPOINT returns live counts)
  demoTaken: { supplier: 57, reseller: 96 },
  launchText: "launching in the coming weeks",
};
