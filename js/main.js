/* Theme toggle + Stage-0 support surfaces. Every feature here is an
   enhancement — the page is fully usable with JS disabled. */
(function () {
  'use strict';

  var S = window.SUPPORT || {};
  var root = document.documentElement;

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

  /* ---- Footer: append configured support links after GitHub ---- */
  var slot = document.getElementById('supportLinks');
  if (slot) {
    var links = [];
    if (S.kofi) links.push(['https://ko-fi.com/' + S.kofi, 'Ko-fi']);
    if (S.githubSponsors) links.push(['https://github.com/sponsors/' + S.githubSponsors, 'Sponsor']);
    links.forEach(function (l) {
      var dot = document.createElement('span');
      dot.textContent = '·';
      dot.setAttribute('aria-hidden', 'true');
      var a = document.createElement('a');
      a.href = l[0];
      a.textContent = l[1];
      a.rel = 'noopener';
      slot.appendChild(dot);
      slot.appendChild(a);
    });
  }

  /* ---- Support page: reveal configured surfaces ---- */
  var money = document.getElementById('moneyWays');
  if (money) {
    var any = false;
    var kofiBtn = money.querySelector('[data-support="kofi"]');
    if (kofiBtn && S.kofi) {
      kofiBtn.href = 'https://ko-fi.com/' + S.kofi;
      kofiBtn.hidden = false;
      any = true;
    }
    var sponsorBtn = money.querySelector('[data-support="sponsors"]');
    if (sponsorBtn && S.githubSponsors) {
      sponsorBtn.href = 'https://github.com/sponsors/' + S.githubSponsors;
      sponsorBtn.hidden = false;
      any = true;
    }
    money.hidden = !any;
    var soon = document.getElementById('moneySoon');
    if (soon) soon.hidden = any;
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
