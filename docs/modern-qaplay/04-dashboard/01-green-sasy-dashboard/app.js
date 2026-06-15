/* ============================================================
   QA Playground Dashboard — app.js
   Routing, tabs, tool modals, theme, session timer
   ============================================================ */

// ── Theme ────────────────────────────────────────────────────
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('qap-theme', next);
  document.getElementById('themeIcon').textContent = next === 'dark' ? '☀️' : '🌙';
}

// Sync icon on load
(function syncThemeIcon() {
  const t = document.documentElement.getAttribute('data-theme');
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = t === 'dark' ? '☀️' : '🌙';
})();

// ── Route config ─────────────────────────────────────────────
const ROUTES = {
  dashboard:  { title: 'Dashboard',           sub: '// overview',               actions: `<button class="topbar-btn" onclick="navigate('interview')">🎙️ New Interview</button><button class="topbar-btn primary" onclick="navigate('challenges')">⚡ Start Practicing</button>` },
  interview:  { title: 'Interview Practice',   sub: '// ai mock interviews',      actions: `<button class="topbar-btn primary" onclick="switchTab(document.querySelector('[data-tab=itab-interview]'),'itab-interview')">+ New Session</button>` },
  jobcrm:     { title: 'Job CRM',              sub: '// application pipeline',    actions: `<button class="topbar-btn primary">+ Add Application</button>` },
  qatools:    { title: 'QA Tools',             sub: '// developer utilities',     actions: '' },
  challenges: { title: 'Challenges',           sub: '// practice elements',       actions: `<button class="topbar-btn primary" onclick="window.open('https://qaplayground.com/practice','_blank')">Open Practice Page ↗</button>` },
  resources:  { title: 'Resources',            sub: '// learning library',        actions: `<button class="topbar-btn primary">+ Save Resource</button>` },
  iq:         { title: 'Interview Questions',  sub: '// q&a bank',               actions: `<button class="topbar-btn primary">+ Add Question</button>` },
};

// ── Navigate ─────────────────────────────────────────────────
function navigate(route) {
  // hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

  // show target
  const target = document.getElementById('view-' + route);
  if (target) target.classList.add('active');

  // update nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.route === route);
  });

  // update topbar
  const cfg = ROUTES[route] || {};
  document.getElementById('topbarTitle').textContent = cfg.title || route;
  document.getElementById('topbarSub').textContent = cfg.sub || '';
  document.getElementById('topbarActions').innerHTML = cfg.actions || '';

  // scroll to top
  document.querySelector('.page-area').scrollTop = 0;
}

// ── Tab switcher ─────────────────────────────────────────────
function switchTab(btn, panelId) {
  // find the parent tab bar and deactivate siblings
  const tabBar = btn.closest('.tab-bar');
  if (tabBar) {
    tabBar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  // find all tab panels inside the same section and deactivate
  const section = btn.closest('section') || btn.closest('.view') || document;
  section.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
}

// ── Q&A accordion ─────────────────────────────────────────────
function toggleIQ(btn) {
  const item = btn.closest('.iq-item');
  const answer = item.querySelector('.iq-answer');
  const isOpen = item.classList.contains('open');

  // close all others in the same list
  item.closest('.iq-list').querySelectorAll('.iq-item.open').forEach(o => {
    if (o !== item) {
      o.classList.remove('open');
      o.querySelector('.iq-answer').style.maxHeight = '0';
    }
  });

  if (isOpen) {
    item.classList.remove('open');
    answer.style.maxHeight = '0';
  } else {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// ── Filter chips ─────────────────────────────────────────────
function filterIQ(chip, cat) {
  chip.closest('.iq-filters').querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');

  document.querySelectorAll('#iqList .iq-item').forEach(item => {
    item.style.display = (cat === 'all' || item.dataset.category === cat) ? '' : 'none';
  });
}

// Also wire up other filter chips (challenges, resources) generically
document.querySelectorAll('.iq-filters .filter-chip').forEach(chip => {
  if (!chip.getAttribute('onclick')) {
    chip.addEventListener('click', function () {
      this.closest('.iq-filters').querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  }
});

// ── Tool Modals ───────────────────────────────────────────────
function openTool(id) {
  const modal = document.getElementById('modal-' + id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeTool(id) {
  const modal = document.getElementById('modal-' + id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// close on backdrop click
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// close on Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ── Copy helper ───────────────────────────────────────────────
function copyResult(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  const text = el.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const orig = el.style.borderColor;
    el.style.borderColor = 'var(--accent)';
    setTimeout(() => { el.style.borderColor = orig; }, 800);
  });
}

// ── JSON Formatter ────────────────────────────────────────────
function runJSON(mode) {
  const input = document.getElementById('json-input').value.trim();
  const output = document.getElementById('json-output');
  if (!input) { output.textContent = '// paste some JSON above'; return; }
  try {
    const parsed = JSON.parse(input);
    if (mode === 'pretty')   output.textContent = JSON.stringify(parsed, null, 2);
    else if (mode === 'minify') output.textContent = JSON.stringify(parsed);
    else if (mode === 'validate') output.textContent = '✅ Valid JSON\n\nKeys: ' + Object.keys(parsed).join(', ') + '\nType: ' + (Array.isArray(parsed) ? 'Array[' + parsed.length + ']' : 'Object');
    output.style.color = 'var(--accent)';
  } catch (e) {
    output.textContent = '❌ Invalid JSON\n\n' + e.message;
    output.style.color = 'var(--clr-danger)';
  }
}

// ── Base64 ────────────────────────────────────────────────────
function runBase64(mode) {
  const input = document.getElementById('b64-input').value;
  const output = document.getElementById('b64-output');
  if (!input.trim()) { output.textContent = '// enter text above'; return; }
  try {
    if (mode === 'encode') {
      output.textContent = btoa(unescape(encodeURIComponent(input)));
      output.style.color = 'var(--accent)';
    } else {
      output.textContent = decodeURIComponent(escape(atob(input)));
      output.style.color = 'var(--clr-info)';
    }
  } catch (e) {
    output.textContent = '❌ Error: ' + e.message;
    output.style.color = 'var(--clr-danger)';
  }
}

// ── JWT Decoder ───────────────────────────────────────────────
function runJWT() {
  const input = document.getElementById('jwt-input').value.trim();
  const header = document.getElementById('jwt-header');
  const payload = document.getElementById('jwt-payload');

  if (!input) { header.textContent = '// paste a JWT above'; return; }

  try {
    const parts = input.split('.');
    if (parts.length < 2) throw new Error('Not a valid JWT (expected 3 parts)');
    const decode = str => {
      const padded = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(str.length + (4 - str.length % 4) % 4, '=');
      return JSON.parse(atob(padded));
    };
    header.textContent = JSON.stringify(decode(parts[0]), null, 2);
    payload.textContent = JSON.stringify(decode(parts[1]), null, 2);
    header.style.color = 'var(--accent2)';
    payload.style.color = 'var(--accent)';
  } catch (e) {
    header.textContent = '❌ Error: ' + e.message;
    header.style.color = 'var(--clr-danger)';
    payload.textContent = '';
  }
}

// ── Regex Tester ──────────────────────────────────────────────
function runRegex() {
  const pattern = document.getElementById('regex-pattern').value;
  const flags   = document.getElementById('regex-flags').value || '';
  const input   = document.getElementById('regex-input').value;
  const output  = document.getElementById('regex-output');

  if (!pattern || !input) { output.textContent = '// fill pattern and test string'; return; }

  try {
    const re = new RegExp(pattern, flags);
    const matches = [...input.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))];
    if (matches.length === 0) {
      output.textContent = '⚠️ No matches found';
      output.style.color = 'var(--clr-warn)';
    } else {
      output.textContent = `✅ ${matches.length} match${matches.length > 1 ? 'es' : ''}:\n\n` +
        matches.map((m, i) => `[${i + 1}] "${m[0]}" at index ${m.index}`).join('\n');
      output.style.color = 'var(--accent)';
    }
  } catch (e) {
    output.textContent = '❌ Invalid regex: ' + e.message;
    output.style.color = 'var(--clr-danger)';
  }
}

// ── UUID Generator ────────────────────────────────────────────
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function runUUID() {
  const count = Math.min(Math.max(parseInt(document.getElementById('uuid-count').value) || 5, 1), 50);
  const output = document.getElementById('uuid-output');
  const uuids = Array.from({ length: count }, generateUUID);
  output.textContent = uuids.join('\n');
  output.style.color = 'var(--accent)';
}

// ── CSV to JSON ───────────────────────────────────────────────
function runCSV() {
  const input  = document.getElementById('csv-input').value.trim();
  const output = document.getElementById('csv-output');
  if (!input) { output.textContent = '// paste CSV above'; return; }

  try {
    const lines = input.split('\n').filter(l => l.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(line => {
      const vals = line.split(',').map(v => v.trim());
      return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? '']));
    });
    output.textContent = JSON.stringify(rows, null, 2);
    output.style.color = 'var(--accent)';
  } catch (e) {
    output.textContent = '❌ Error: ' + e.message;
    output.style.color = 'var(--clr-danger)';
  }
}

// ── Session Timer ─────────────────────────────────────────────
let sessionSeconds = 0;
let sessionInterval = null;
let sessionRunning = false;

function startSessionTimer() {
  if (sessionInterval) return;
  sessionRunning = true;
  sessionInterval = setInterval(() => {
    sessionSeconds++;
    const m = String(Math.floor(sessionSeconds / 60)).padStart(2, '0');
    const s = String(sessionSeconds % 60).padStart(2, '0');
    const el = document.getElementById('sessionTimer');
    if (el) el.textContent = m + ':' + s;
  }, 1000);
}

function toggleSession() {
  const btn = event.target;
  if (sessionRunning) {
    clearInterval(sessionInterval);
    sessionInterval = null;
    sessionRunning = false;
    btn.textContent = '▶ Resume';
  } else {
    startSessionTimer();
    btn.textContent = '⏸ Pause';
  }
}

function endSession() {
  clearInterval(sessionInterval);
  sessionInterval = null;
  sessionRunning = false;
  sessionSeconds = 0;
  const el = document.getElementById('sessionTimer');
  if (el) el.textContent = '00:00';
  // switch to history
  navigate('interview');
  const historyBtn = document.querySelector('[data-tab="itab-history"]');
  if (historyBtn) switchTab(historyBtn, 'itab-history');
}

// auto-start timer when session tab is shown
document.querySelectorAll('[data-tab="itab-session"]').forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(startSessionTimer, 200);
  });
});

// ── Chat ─────────────────────────────────────────────────────
const aiResponses = [
  "Good explanation! Can you tell me more about how you handle test isolation in your Playwright setup? For example, how do you prevent one test from affecting another?",
  "Interesting approach. How would you debug this if the test started failing only in CI but passed locally?",
  "That's a solid answer. Let's go deeper — what strategies do you use to reduce flakiness in dynamic SPA applications?",
  "I like that. Now, how would you integrate your Playwright tests into a GitHub Actions workflow with parallel execution?",
  "Great. Final question: how do you decide which tests to automate vs. keep as manual exploratory tests?"
];
let aiIdx = 0;

function sendChat() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  if (!input || !messages || !input.value.trim()) return;

  // add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.textContent = input.value.trim();
  messages.appendChild(userMsg);
  input.value = '';

  // scroll
  messages.scrollTop = messages.scrollHeight;

  // AI reply after delay
  setTimeout(() => {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'chat-msg ai';
    aiMsg.textContent = aiResponses[aiIdx % aiResponses.length];
    aiIdx++;
    messages.appendChild(aiMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 900);
}

// ── Keyboard shortcuts ────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.altKey) {
    const map = { '1':'dashboard','2':'interview','3':'jobcrm','4':'qatools','5':'challenges','6':'resources','7':'iq' };
    if (map[e.key]) { e.preventDefault(); navigate(map[e.key]); }
  }
});
