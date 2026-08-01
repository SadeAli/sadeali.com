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

  /* ---- Typed `whoami` intro (home hero) ----
     The .typing class was set in <head> (JS on, motion allowed, once per
     session); type the command, then reveal the "output". A <head>
     failsafe timeout guarantees the hero is never left hidden. */
  var typed = document.getElementById('typedCmd');
  if (typed && root.classList.contains('typing')) {
    var cmd = typed.textContent;
    typed.textContent = '';
    var i = 0;
    var tick = setInterval(function () {
      i += 1;
      typed.textContent = cmd.slice(0, i);
      if (i >= cmd.length) {
        clearInterval(tick);
        setTimeout(function () { root.classList.remove('typing'); }, 140);
      }
    }, 62);
  }

  /* ---- ls output line: derive the counts from the grid itself so the
     static fallback can never silently go stale. ---- */
  var lsout = document.querySelector('.lsout');
  var grid = document.querySelector('.grid');
  if (lsout && grid) {
    var nLive = grid.querySelectorAll('a.card:not(.card-support)').length;
    var nSoon = grid.querySelectorAll('.card-soon').length;
    var nScript = grid.querySelectorAll('.card-support').length;
    lsout.textContent = 'total ' + (nLive + nSoon + nScript) + ' — ' +
      nLive + ' live · ' + nSoon + ' hatching · ' +
      nScript + ' script' + (nScript === 1 ? '' : 's');
  }

  /* ---- Theme toggle (initial theme is set inline in <head>) ---- */
  /* bfcache restores skip the head script; re-sync the theme on pageshow
     so Back doesn't show a stale theme toggled on another page. */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      var t = null;
      try { t = localStorage.getItem('sadeali-theme'); } catch (err) {}
      root.dataset.theme = (t === 'light') ? 'light' : 'dark';
    }
  });
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

  /* ---- Goal meter: ASCII progress toward the year's running costs.
     Only meaningful once there's a way to give, so it also requires a
     configured platform. ---- */
  var meter = document.getElementById('goalMeter');
  var goal = S.goal || {};
  if (meter && goal.target > 0 && configured.length > 0) {
    var pct = Math.max(0, Math.min(1, (goal.raised || 0) / goal.target));
    var cells = 18;
    /* The bar only renders full when the goal is actually met. */
    var full = pct >= 1 ? cells : Math.min(cells - 1, Math.floor(pct * cells));
    var fill = document.createElement('span');
    fill.className = 'fill';
    fill.textContent = new Array(full + 1).join('▓');
    meter.textContent = '[';
    meter.appendChild(fill);
    meter.appendChild(document.createTextNode(
      new Array(cells - full + 1).join('░') + '] ' +
      Math.round(pct * 100) + '% of $' + goal.target +
      ' — ' + (goal.label || 'running costs')
    ));
    meter.setAttribute('aria-label',
      'Donation goal: ' + Math.round(pct * 100) + ' percent of ' +
      goal.target + ' dollars raised for ' + (goal.label || 'running costs'));
    meter.hidden = false;
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
