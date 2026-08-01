/* An actual shell in the hero terminal. Pure enhancement: the whole
   block ships [hidden] and only appears when this file runs. */
(function () {
  'use strict';

  var shell = document.getElementById('shell');
  var out = document.getElementById('shellOut');
  var input = document.getElementById('shellIn');
  var term = document.querySelector('.hero-term');
  if (!shell || !out || !input || !term) return;

  var MAX_LINES = 40;

  function line(kind, nodes) {
    var p = document.createElement('p');
    p.className = 'shell-line-out' + (kind ? ' ' + kind : '');
    nodes.forEach(function (n) { p.appendChild(n); });
    out.appendChild(p);
    while (out.children.length > MAX_LINES) out.removeChild(out.firstChild);
    out.scrollTop = out.scrollHeight;
  }
  function txt(s) { return document.createTextNode(s); }
  function echo(s, kind) { line(kind, [txt(s)]); }
  function link(label, href) {
    var a = document.createElement('a');
    a.textContent = label;
    a.href = href;
    return a;
  }
  function echoCmd(raw) {
    var dollar = document.createElement('span');
    dollar.className = 'prompt';
    dollar.textContent = '$ ';
    line('cmd', [dollar, txt(raw)]);
  }

  var DESTS = {
    'the-c-path': 'https://waytoc.sadeali.com/',
    'support': 'support/',
    'about': 'about/',
    'github': 'https://github.com/SadeAli',
  };

  function go(where) {
    var url = DESTS[where];
    echo('opening ' + where + ' …');
    setTimeout(function () { location.assign(url); }, 350);
  }

  var COMMANDS = {
    help: function () {
      echo('available commands:');
      echo('  ls            list the experiments');
      echo('  open <name>   open one (e.g. open the-c-path)');
      echo('  about         who makes this');
      echo('  ./support.sh  fuel the next experiment');
      echo('  theme         toggle light/dark');
      echo('  whoami · clear · exit');
    },
    ls: function () {
      line('', [link('the-c-path', DESTS['the-c-path']), txt('   '), txt('???'), txt('   '), txt('???'), txt('   '), link('support.sh', DESTS.support)]);
    },
    whoami: function () { echo('a lovely visitor'); },
    about: function () { go('about'); },
    github: function () { go('github'); },
    support: function () { go('support'); },
    './support.sh': function () { go('support'); },
    'support.sh': function () { go('support'); },
    donate: function () { go('support'); },
    theme: function () {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('sadeali-theme', next); } catch (e) {}
      echo('theme: ' + next);
    },
    clear: function () { out.textContent = ''; },
    exit: function () { echo('there is no way out of the experiments. try: help'); },
    pwd: function () { echo('/home/sadeali/experiments'); },
    whoareyou: function () { echo('SadeAli — I make little things for the internet.'); },
  };

  /* Own-property lookups only — a fake shell invites "__proto__". */
  function has(table, key) { return Object.prototype.hasOwnProperty.call(table, key) && typeof table[key] !== 'undefined'; }

  function run(raw) {
    var cmd = raw.trim();
    if (!cmd) return;
    echoCmd(cmd);
    var word = cmd.toLowerCase();
    if (has(COMMANDS, word) && typeof COMMANDS[word] === 'function') return COMMANDS[word]();
    if (/^sudo\b/.test(word)) {
      echo("you're not root here. nobody is.");
      return;
    }
    var open = word.match(/^(?:open|cd)\s+(.+)$/);
    if (open) {
      var name = open[1].replace(/^\.\//, '').replace(/\/$/, '').replace(/\.sh$/, '');
      if (has(DESTS, name) && typeof DESTS[name] === 'string') return go(name);
      if (/^\?+$/.test(name)) return echo('patience. it is still hatching. 🥚');
      return echo('open: ' + name + ': no such experiment (try ls)');
    }
    echo('sadesh: ' + cmd + ': command not found — try "help"');
  }

  function submit() {
    var value = input.value;
    input.value = '';
    run(value);
  }
  var form = input.form;
  if (form) form.addEventListener('submit', function (e) { e.preventDefault(); submit(); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.isComposing) {
      e.preventDefault(); /* the form submit path handles it where forms fire */
      submit();
    }
  });

  /* Clicking anywhere on the hero terminal focuses the input — but only
     for fine pointers (a tap would summon the phone keyboard), and never
     while selecting text or clicking a link. */
  term.addEventListener('click', function (e) {
    if (e.target.closest('a') || e.target === input) return;
    if (!matchMedia('(pointer: fine)').matches) return;
    var sel = window.getSelection && window.getSelection();
    if (sel && String(sel).length) return;
    input.focus({ preventScroll: true });
  });

  shell.hidden = false;
})();
