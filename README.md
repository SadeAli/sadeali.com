# sadeali.com — the hub

The landing page of the SadeAli network: a neal.fun-style card grid where every
card is one experiment living on its own subdomain (and its own git repo).

## Run it

No build step, no dependencies:

```sh
python3 -m http.server 8080
# then visit http://localhost:8080
```

(Serving is nicer than `file://` because the `about/` and `support/` links
resolve to their `index.html`.)

## Add a new project card

Cards are static HTML (so they work without JS and are fully crawlable).
In `index.html`, replace one of the "coming soon" cards — or copy this block
into the `<ul class="grid">`:

```html
<li>
  <a class="card accent-mint" href="https://yourthing.sadeali.com/">
    <span class="card-bar" aria-hidden="true"><i class="dot d1"></i><i class="dot d2"></i><i class="dot d3"></i><span class="card-slug">your-thing</span></span>
    <span class="badge">NEW</span>
    <span class="card-icon" aria-hidden="true">🎮</span>
    <h2 class="card-title">Your Thing</h2>
    <p class="card-tagline">One playful sentence about it</p>
  </a>
</li>
```

- Accents: `accent-coral`, `accent-sunny`, `accent-mint`, `accent-sky`,
  `accent-lilac`, `accent-bubblegum` — vary them so the grid stays colorful.
- Move the `NEW` badge to the newest card (only one card should have it).
- Also teach the hero shell about it: add the slug → URL to `DESTS` in
  `js/terminal.js` and list it in the `ls` command's output there.
- Keep at least one dashed "coming soon" card before the `./support.sh` card
  (which stays last) — it tells visitors the site is alive.

## Support / monetization switches (Stage 0)

`js/support-config.js` holds every donation surface: Ko-fi, Buy Me a Coffee,
GitHub Sponsors, Liberapay, Patreon, the Buttondown newsletter, the ASCII
goal meter and the supporters wall. Each one stays completely hidden until
you fill in the matching account name (or goal target) — the site never
shows a broken link. `DONATIONS.md`
is the setup guide (which platforms to pick, fees, payout caveats, and the
`.github/FUNDING.yml` step that adds a Sponsor button on GitHub).
The ask stays subtle by design: a heart in the corner, links in the footer,
and the `/support` page. No banners.

## Structure

```
index.html        landing page (hero + card grid)
about/index.html  what/who/why — no personal details beyond the brand
support/index.html free ways + Stage-0 donation surfaces
404.html          served by GitHub Pages for unknown paths (absolute asset paths!)
css/style.css     friendly-terminal theme (dark-first + paper-terminal
                  light mode, reduced-motion safe)
js/main.js        theme toggle + Stage-0 reveal (site works with JS off)
js/terminal.js    the hero shell easter egg (help/ls/open/theme/…; pure
                  enhancement, the block ships [hidden] without JS)
js/support-config.js  the donation/newsletter switches
DONATIONS.md      donation setup guide (platforms, fees, activation)
.github/FUNDING.yml   GitHub Sponsor button (commented until accounts exist)
og.png            1200×630 link-preview image (og:image/twitter:image)
robots.txt        allows all crawlers + points at the sitemap
sitemap.xml       the 3 pages — add a <url> entry when adding a page
                  (submitted to Search Console in DEPLOY.md step 4)
CNAME             sadeali.com (apex)
```

Deploy = push. See `DEPLOY.md` for the one-time GitHub Pages + DNS setup.
