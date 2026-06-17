/* =====================================================
   QA Playground – Practice Page UI Explainer
   app.js — tab switching, interactions, accordion, etc.
   ===================================================== */

(function () {
  "use strict";

  /* ── Theme toggle ── */
  const html = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  const toggleIcon = toggleBtn?.querySelector(".toggle-icon");
  const toggleLabel = toggleBtn?.querySelector(".toggle-label");

  const savedTheme = localStorage.getItem("explainer-theme") || "dark";
  html.dataset.theme = savedTheme;
  if (toggleIcon && toggleLabel) {
    toggleIcon.textContent  = savedTheme === "light" ? "☀️" : "🌙";
    toggleLabel.textContent = savedTheme === "light" ? "Light" : "Dark";
  }

  toggleBtn?.addEventListener("click", () => {
    const next = html.dataset.theme === "dark" ? "light" : "dark";
    html.dataset.theme = next;
    localStorage.setItem("explainer-theme", next);
    if (toggleIcon && toggleLabel) {
      toggleIcon.textContent  = next === "light" ? "☀️" : "🌙";
      toggleLabel.textContent = next === "light" ? "Light" : "Dark";
    }
  });

  /* ── Layout concept switcher ── */
  const layoutTabs = document.querySelectorAll(".layout-tab");
  const conceptViews = document.querySelectorAll(".concept-view");

  layoutTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.concept;
      layoutTabs.forEach((t) => t.classList.remove("active"));
      conceptViews.forEach((v) => v.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });

  /* ── Concept A: inner tabs (Scenarios / Test Cases) ── */
  const caInnerTabs = document.querySelectorAll(".ca-inner-tab");
  const caViews = document.querySelectorAll(".ca-view");
  caInnerTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.view;
      caInnerTabs.forEach((t) => t.classList.remove("active"));
      caViews.forEach((v) => v.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });

  /* ── Concept B: top tabs ── */
  const cbTabs = document.querySelectorAll(".cb-tab");
  const cbViews = document.querySelectorAll(".cb-view");
  cbTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.view;
      cbTabs.forEach((t) => t.classList.remove("active"));
      cbViews.forEach((v) => v.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });

  /* ── Concept B: code panel sub-tabs ── */
  const cbPanelTabs = document.querySelectorAll(".cb-panel-tab");
  const cbCodePanels = document.querySelectorAll(".cb-code-panel");
  cbPanelTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.code;
      cbPanelTabs.forEach((t) => t.classList.remove("active"));
      cbCodePanels.forEach((v) => v.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });

  /* ── Learn card tabs (Concept A sidebar) ── */
  const learnTabs = document.querySelectorAll(".learn-tab");
  const learnPanels = document.querySelectorAll(".learn-panel");
  learnTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.panel;
      learnTabs.forEach((t) => t.classList.remove("active"));
      learnPanels.forEach((v) => v.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });

  /* ── Test case expand/collapse ── */
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("expand-btn")) {
      const row = e.target.closest("tr");
      const tcId = row?.dataset.tcRow;
      if (!tcId) return;
      const steps = document.getElementById("steps-" + tcId);
      const expanded = steps?.classList.toggle("open");
      e.target.textContent = expanded ? "▾" : "▸";
    }
  });

  /* ── FAQ accordion ── */
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".faq-trigger");
    if (!trigger) return;
    const item = trigger.closest(".faq-item");
    item?.classList.toggle("open");
  });

  /* ── Copy code buttons ── */
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("code-copy")) {
      const block = e.target.closest(".code-block")?.querySelector(".code-body");
      if (!block) return;
      const text = block.innerText;
      navigator.clipboard.writeText(text).then(() => {
        const original = e.target.textContent;
        e.target.textContent = "✓ Copied";
        e.target.style.color = "var(--accent)";
        setTimeout(() => {
          e.target.textContent = original;
          e.target.style.color = "";
        }, 1500);
      });
    }
  });

  /* ── Playground button interactions ── */

  // Concept A scenario results
  function setupScenarioBtn(btnSel, resultSel, message) {
    const btn = document.querySelector(btnSel);
    const result = document.querySelector(resultSel);
    if (!btn || !result) return;
    btn.addEventListener("click", () => {
      result.textContent = "✓ " + message;
      result.style.color = "var(--success)";
    });
  }

  function setupDblClick(btnSel, resultSel) {
    const btn = document.querySelector(btnSel);
    const result = document.querySelector(resultSel);
    if (!btn || !result) return;
    btn.addEventListener("dblclick", () => {
      result.textContent = "✓ Double-click fired!";
      result.style.color = "var(--accent)";
    });
  }

  function setupRightClick(btnSel, resultSel) {
    const btn = document.querySelector(btnSel);
    const result = document.querySelector(resultSel);
    if (!btn || !result) return;
    btn.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      result.textContent = "✓ Right-click captured!";
      result.style.color = "var(--warning)";
    });
  }

  function setupClickHold(btnSel, resultSel) {
    const btn = document.querySelector(btnSel);
    const result = document.querySelector(resultSel);
    if (!btn || !result) return;
    let timer;
    btn.addEventListener("mousedown", () => {
      result.textContent = "⏳ Holding...";
      timer = setTimeout(() => {
        result.textContent = "✓ Held for 1.5s!";
        result.style.color = "var(--accent)";
      }, 1500);
    });
    btn.addEventListener("mouseup", () => clearTimeout(timer));
    btn.addEventListener("mouseleave", () => clearTimeout(timer));
  }

  // Wire up Concept A
  setupScenarioBtn("#ca-btn-home",     "#ca-res-home",     "Navigated to Home!");
  setupScenarioBtn("#ca-btn-location", "#ca-res-location", "X: 142, Y: 328");
  setupScenarioBtn("#ca-btn-color",    "#ca-res-color",    "Color: #4fc3f7");
  setupScenarioBtn("#ca-btn-size",     "#ca-res-size",     "H: 38px, W: 156px");
  setupClickHold(  "#ca-btn-hold",     "#ca-res-hold");
  setupDblClick(   "#ca-btn-dbl",      "#ca-res-dbl");

  // Wire up Concept B tiles
  setupScenarioBtn("#cb-btn-home",     "#cb-res-home",     "Navigated!");
  setupClickHold(  "#cb-btn-hold",     "#cb-res-hold");
  setupDblClick(   "#cb-btn-dbl",      "#cb-res-dbl");
  setupRightClick( "#cb-btn-right",    "#cb-res-right");

  // Wire up Concept C inline playgrounds
  setupScenarioBtn("#cc-btn-single",  "#cc-res-single",  "click() fired!");
  setupDblClick(   "#cc-btn-dbl",     "#cc-res-dbl");
  setupRightClick( "#cc-btn-right",   "#cc-res-right");
  setupClickHold(  "#cc-btn-hold",    "#cc-res-hold");

  /* ── TOC active tracking (Concept C) ── */
  const tocItems = document.querySelectorAll(".cc-toc-item[href^='#']");
  tocItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      tocItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      const target = document.querySelector(item.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

})();
