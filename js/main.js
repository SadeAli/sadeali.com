/* Theme toggle + Stage-0 support surfaces. Every feature here is an
   enhancement — the page is fully usable with JS disabled. */
(function () {
  'use strict';

  var S = window.SUPPORT || {};
  var root = document.documentElement;

  /* Donation platforms: [config key, base URL, button label, accent, short label] */
  var PLATFORMS = [
    ['kofi', 'https://ko-fi.com/', '☕ Ko-fi', 'accent-coral', 'Ko-fi'],
    ['buymeacoffee', 'https://buymeacoffee.com/', '☕ Buy Me a Coffee', 'accent-sunny', 'Coffee'],
    ['githubSponsors', 'https://github.com/sponsors/', '♥ GitHub Sponsors', 'accent-lilac', 'Sponsor'],
    ['liberapay', 'https://liberapay.com/', '♥ Liberapay', 'accent-mint', 'Liberapay'],
    ['patreon', 'https://patreon.com/', '★ Patreon', 'accent-bubblegum', 'Patreon'],
  ];
  var configured = PLATFORMS.filter(function (p) { return S[p[0]]; });

  /* ---- Theme toggle (initial theme is set inline in <head>) ---- */
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.hidden = false; /* ships hidden so no-JS visitors never see a dead button */
    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('sadeali-theme', next); } catch (e) {}
    });
  }

  /* ---- Footer: append up to two configured platforms after GitHub ---- */
  var slot = document.getElementById('supportLinks');
  if (slot) {
    configured.slice(0, 2).forEach(function (p) {
      var dot = document.createElement('span');
      dot.textContent = '·';
      dot.setAttribute('aria-hidden', 'true');
      var a = document.createElement('a');
      a.href = p[1] + S[p[0]];
      a.textContent = p[4];
      a.rel = 'noopener';
      slot.appendChild(dot);
      slot.appendChild(a);
    });
  }

  /* ---- Support page: one button per configured platform ---- */
  var money = document.getElementById('moneyWays');
  if (money) {
    var row = document.getElementById('donateButtons');
    configured.forEach(function (p) {
      var a = document.createElement('a');
      a.href = p[1] + S[p[0]];
      a.className = 'btn ' + p[3];
      a.textContent = p[2];
      a.rel = 'noopener';
      row.appendChild(a);
    });
    money.hidden = configured.length === 0;
    var soon = document.getElementById('moneySoon');
    if (soon) soon.hidden = configured.length > 0;
  }

  var newsletter = document.getElementById('newsletter');
  if (newsletter && S.buttondown) {
    var form = newsletter.querySelector('form');
    if (form) form.action = 'https://buttondown.com/api/emails/embed-subscribe/' + S.buttondown;
    newsletter.hidden = false;
  }

  var wall = document.getElementById('supportersWall');
  if (wall && S.supporters && S.supporters.length) {
    var list = wall.querySelector('.supporters');
    S.supporters.forEach(function (name) {
      var li = document.createElement('li');
      li.textContent = name;
      list.appendChild(li);
    });
    wall.hidden = false;
  }
})();
