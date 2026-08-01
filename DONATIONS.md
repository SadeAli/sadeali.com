# Donations — setup & strategy

The site's donation infrastructure is fully wired; nothing shows until an
account name is pasted into `js/support-config.js`. This file is the guide
for turning it on.

## Pick platforms deliberately

Start with **exactly one** platform. This isn't a style preference: in
controlled donation-form tests, adding a *second* payment option cut
conversion by ~65% (NextAfter) — extra choices break the moment. For a
developer audience the strongest single choice is **GitHub Sponsors**
(0% platform fee, devs already have payment set up, and it adds a Sponsor
button on every repo). Set a $1 minimum, one-time tier listed first.

Add a second platform later only if supporters ask for an option the
first one can't cover (e.g. recurring memberships, non-GitHub users).

| Platform | Platform fee | Payouts via | Best for |
|---|---|---|---|
| Ko-fi | 0% on donations | PayPal or Stripe | one-off tips |
| Buy Me a Coffee | 5% | Stripe | one-off tips |
| GitHub Sponsors | 0% | Stripe Connect (bank) | dev audience, repo button |
| Liberapay | 0% (processor fees only) | Stripe or PayPal | recurring, FOSS crowd |
| Patreon | 8–12% | bank, PayPal, Payoneer | memberships/tiers |

**Payout reality check:** Ko-fi, Buy Me a Coffee and Liberapay depend on
Stripe or PayPal supporting payouts in your country; GitHub Sponsors uses
Stripe Connect with its own country list; Patreon has the broadest payout
options (including Payoneer). Before creating anything, confirm the payout
rail works for your bank/country — a donation page that can't pay out is
worse than none.

## Activation checklist (per platform)

1. Create the account; use the **SadeAli** name/handle where available.
   Give the page the same no-nonsense description as `/about` — do not link
   it to any non-SadeAli identity (see the workspace README's no-PII rule).
2. Paste the handle into `js/support-config.js` here in the hub.
3. Paste the same handle into each live subdomain's `js/support-config.js`
   (waytoc has one too).
4. Uncomment the matching line in `.github/FUNDING.yml` in **every** repo —
   that's what puts the Sponsor button on GitHub itself.
5. Commit + push. The buttons, footer links and `/support` sections appear
   on their own; the "not wired up yet" line disappears.

## House rules (already implemented)

- The ask stays subtle: corner heart, footer link, one quiet page. No
  banners, no popups, no nags — the no-ads/no-tracking promise is the brand.
- Supporters wall: add names to `supporters` in `js/support-config.js`
  only with the donor's permission; pseudonyms welcome. Keep the wall OFF
  until at least ~3 names exist — an empty wall is negative social proof.
- Goal meter (`goal` in `js/support-config.js`): keep goals micro and
  concrete ("2026 running costs", $target small), and only set a target
  once it's ≥~70% funded. Evidence: showing a bar at 85% full doubled
  donations; a bar at 66% did nothing; a near-empty bar suppresses giving.
- Newsletter (Buttondown) counts as a support surface: it's the only way
  to reach visitors again without tracking them — and it needs no payout
  rail, so it can be turned on before any donation platform.
