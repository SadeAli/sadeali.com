/* ============================================================
   support-config.js — Stage-0 monetization switches for the hub.
   EVERY surface below stays completely hidden until you fill in
   the matching account name, so the site never shows a broken
   link. Fill in a platform as you create the account; see
   DONATIONS.md for setup steps and how to choose platforms.
   Keep the same values in each subdomain's support-config.js and
   uncomment the matching lines in .github/FUNDING.yml.
   ============================================================ */
window.SUPPORT = {
  /* github.com/sponsors — enable on your GitHub account, then put
     your username here, e.g. 'SadeAli'. */
  githubSponsors: '',

  /* ko-fi.com — page name, e.g. 'sadeali'. */
  kofi: '',

  /* buymeacoffee.com — page name, e.g. 'sadeali'. */
  buymeacoffee: '',

  /* liberapay.com — username, e.g. 'sadeali'. */
  liberapay: '',

  /* patreon.com — page name, e.g. 'sadeali'. */
  patreon: '',

  /* buttondown.com — newsletter username (free under 100 subs).
     Renders the email opt-in form on /support. */
  buttondown: '',

  /* Goal meter on /support — an ASCII progress bar toward this year's
     running costs. Shown only when target > 0 AND at least one platform
     above is configured. Hand-edit `raised` as donations arrive. */
  goal: { label: "2026 running costs", target: 0, raised: 0 },

  /* Names shown on the supporters wall (/support). Hand-edit after
     each donation (ask permission before listing a name). */
  supporters: [],
};
