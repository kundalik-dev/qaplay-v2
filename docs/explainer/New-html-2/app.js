/* =====================================================
   QA Playground – Combined Practice Page
   New-html-2 · app.js
   ===================================================== */
(function () {
  "use strict";

  /* ─── Theme toggle ─── */
  const html      = document.documentElement;
  const themBtn   = document.getElementById("theme-toggle");
  const themIcon  = themBtn?.querySelector(".t-icon");
  const themLabel = themBtn?.querySelector(".t-label");

  function applyTheme(t) {
    html.dataset.theme = t;
    localStorage.setItem("qap-theme", t);
    if (themIcon)  themIcon.textContent  = t === "light" ? "☀️" : "🌙";
    if (themLabel) themLabel.textContent = t === "light" ? "Light" : "Dark";
  }
  applyTheme(localStorage.getItem("qap-theme") || "dark");
  themBtn?.addEventListener("click", () =>
    applyTheme(html.dataset.theme === "dark" ? "light" : "dark")
  );

  /* ─── Main tabs (Practice / Test Cases / Learn) ─── */
  const mainTabs  = document.querySelectorAll(".main-tab");
  const tabViews  = document.querySelectorAll(".tab-view");

  mainTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      mainTabs.forEach(t => t.classList.remove("active"));
      tabViews.forEach(v => v.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });

  /* ─── Framework code switcher (Practice tab) ─── */
  const fwBtns   = document.querySelectorAll(".fw-btn");
  const fwPanels = document.querySelectorAll(".fw-panel");

  fwBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.fw;
      fwBtns.forEach(b => b.classList.remove("active"));
      fwPanels.forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });

  /* ─── Copy code ─── */
  document.addEventListener("click", e => {
    if (!e.target.classList.contains("copy-btn")) return;
    const pre = e.target.closest(".code-block, .inline-code")?.querySelector("pre");
    if (!pre) return;
    navigator.clipboard.writeText(pre.innerText).then(() => {
      const orig = e.target.textContent;
      e.target.textContent = "✓ Copied";
      e.target.style.color = "var(--accent)";
      setTimeout(() => { e.target.textContent = orig; e.target.style.color = ""; }, 1600);
    });
  });

  /* ─── Test case expand/collapse ─── */
  document.addEventListener("click", e => {
    const btn = e.target.closest(".expand-btn");
    if (!btn) return;
    const rowId   = btn.dataset.row;
    const stepsEl = document.getElementById("steps-" + rowId);
    if (!stepsEl) return;
    const open = stepsEl.classList.toggle("open");
    btn.textContent = open ? "▾" : "▸";
    btn.style.borderColor = open ? "var(--accent2)" : "";
    btn.style.color       = open ? "var(--accent2)" : "";
  });

  /* ─── FAQ accordion ─── */
  document.addEventListener("click", e => {
    const trigger = e.target.closest(".faq-trigger");
    if (!trigger) return;
    trigger.closest(".faq-item")?.classList.toggle("open");
  });

  /* ─── TOC link highlighting ─── */
  const tocLinks = document.querySelectorAll(".toc-link[href^='#']");
  tocLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      tocLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Scroll spy for TOC
  const learnSections = document.querySelectorAll(".doc-section[id]");
  const learnMain = document.querySelector(".learn-main");
  if (learnMain) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(l => {
            l.classList.toggle("active", l.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    learnSections.forEach(sec => observer.observe(sec));
  }

  /* ─── Practice button interactions ─── */
  function setBarReady(resId) {
    // find closest out-zone-bar sibling
    const resEl = document.getElementById(resId);
    const bar = resEl?.closest(".out-zone-body")?.previousElementSibling;
    if (bar && bar.classList.contains("out-zone-bar")) {
      bar.textContent = "FIRED";
      bar.classList.add("ready");
    }
  }

  function wireClick(btnId, resId, msg) {
    const btn = document.getElementById(btnId);
    const res = document.getElementById(resId);
    if (!btn || !res) return;
    btn.addEventListener("click", () => {
      res.textContent = "✓ " + msg;
      res.classList.remove("out-idle");
      res.classList.add("out-success");
      setBarReady(resId);
    });
  }

  function wireDbl(btnId, resId) {
    const btn = document.getElementById(btnId);
    const res = document.getElementById(resId);
    if (!btn || !res) return;
    btn.addEventListener("dblclick", () => {
      res.textContent = "✓ Double-click fired!";
      res.classList.remove("out-idle");
      res.classList.add("out-success");
      setBarReady(resId);
    });
  }

  function wireRight(btnId, resId) {
    const btn = document.getElementById(btnId);
    const res = document.getElementById(resId);
    if (!btn || !res) return;
    btn.addEventListener("contextmenu", e => {
      e.preventDefault();
      res.textContent = "✓ Right-click captured!";
      res.classList.remove("out-idle");
      res.classList.add("out-success");
      setBarReady(resId);
    });
  }

  function wireHold(btnId, resId) {
    const btn = document.getElementById(btnId);
    const res = document.getElementById(resId);
    if (!btn || !res) return;
    let timer;
    btn.addEventListener("mousedown", () => {
      res.textContent = "⏳ Holding…";
      res.classList.remove("out-idle", "out-success");
      timer = setTimeout(() => {
        res.textContent = "✓ Held 1.5 s — release!";
        res.classList.add("out-success");
        setBarReady(resId);
      }, 1500);
    });
    ["mouseup", "mouseleave"].forEach(ev => btn.addEventListener(ev, () => clearTimeout(timer)));
  }

  // Practice tab
  wireClick("btn-home",     "res-home",     "Navigated to Home!");
  wireClick("btn-location", "res-location", "X: 142, Y: 328");
  wireClick("btn-color",    "res-color",    "Color: #4fc3f7 (sky blue)");
  wireClick("btn-size",     "res-size",     "H: 38px  W: 168px");
  wireHold( "btn-hold",     "res-hold");
  wireDbl(  "btn-dbl",      "res-dbl");

  // Learn tab inline playgrounds
  wireClick("lc-btn-single",  "lc-res-single",  "click() fired!");
  wireDbl(  "lc-btn-dbl",     "lc-res-dbl");
  wireRight("lc-btn-right",   "lc-res-right");
  wireHold( "lc-btn-hold",    "lc-res-hold");

})();
