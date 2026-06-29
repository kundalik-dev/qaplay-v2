"use client";

import { useState, useRef, useCallback } from "react";
import {
  ScenarioCard,
  ProgressWidget,
  FrameworkMethodsPanel,
  UpNextCard,
} from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import {
  annotationsScenarios,
  frameworkMethods,
} from "@/data/practice-data/annotations/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./annotations.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

// ── S01: Feature Flag Panel ──────────────────────────────────────────────────

type FlagKey = "dark-mode" | "beta-ui" | "analytics";

interface FeatureFlagsPanelProps {
  onComplete: () => void;
  setResult: (r: string) => void;
}

function FeatureFlagsPanel({ onComplete, setResult }: FeatureFlagsPanelProps) {
  const [flags, setFlags] = useState<Record<FlagKey, boolean>>({
    "dark-mode": false,
    "beta-ui": false,
    analytics: false,
  });
  const [env, setEnv] = useState<"staging" | "production">("staging");

  function toggleFlag(key: FlagKey) {
    const next = { ...flags, [key]: !flags[key] };
    setFlags(next);
    const statusParts = [
      `Env: ${env}`,
      `Dark Mode: ${next["dark-mode"] ? "ON" : "OFF"}`,
      `Beta UI: ${next["beta-ui"] ? "ON" : "OFF"}`,
      `Analytics: ${next.analytics ? "ON" : "OFF"}`,
    ];
    setResult(statusParts.join(" | "));
    // setResult marks done on first call; call complete for beta-ui toggle specifically
    if (key === "beta-ui" && next["beta-ui"]) onComplete();
  }

  function switchEnv() {
    const nextEnv = env === "staging" ? "production" : "staging";
    setEnv(nextEnv);
    setResult(
      `Env: ${nextEnv} | Dark Mode: ${flags["dark-mode"] ? "ON" : "OFF"} | Beta UI: ${flags["beta-ui"] ? "ON" : "OFF"} | Analytics: ${flags.analytics ? "ON" : "OFF"}`,
    );
  }

  const flagDefs: { key: FlagKey; label: string; labelId: string; hasId?: boolean }[] = [
    { key: "dark-mode", label: "Dark Mode", labelId: "dark-mode-label", hasId: true },
    { key: "beta-ui", label: "Beta UI", labelId: "beta-ui-label", hasId: true },
    { key: "analytics", label: "Advanced Analytics", labelId: "analytics-label" },
  ];

  return (
    <div data-testid="feature-flags-panel">
      {/* Environment row */}
      <div className={styles.envRow}>
        <span className={styles.envLabel}>Environment:</span>
        <span
          id="env-badge"
          data-testid="env-badge"
          className={`${styles.envPill} ${env === "staging" ? styles.envStaging : styles.envProd}`}
          role="status"
          aria-label={`Current environment: ${env === "staging" ? "Staging" : "Production"}`}
        >
          {env === "staging" ? "⚙ Staging" : "✓ Production"}
        </span>
        <button
          id="btn-switch-env"
          data-testid="btn-switch-env"
          className={styles.envSwitchBtn}
          onClick={switchEnv}
        >
          {env === "staging" ? "Switch to Production" : "Switch to Staging"}
        </button>
      </div>

      {/* Feature flag toggles */}
      <div
        id="feature-flags"
        data-testid="feature-flags"
        className={styles.flagGroup}
        role="group"
        aria-label="Feature flags"
      >
        {flagDefs.map(({ key, label, labelId, hasId }) => (
          <div key={key} className={styles.flagRow}>
            <span className={styles.flagLabel} id={labelId}>
              {label}
            </span>
            <button
              {...(hasId ? { id: `toggle-${key}` } : {})}
              data-testid={`toggle-${key}`}
              data-feature={key}
              role="switch"
              aria-checked={flags[key] ? "true" : "false"}
              aria-labelledby={labelId}
              className={styles.switchBtn}
              onClick={() => toggleFlag(key)}
            >
              <span className={styles.switchTrack} />
              <span className={styles.switchState}>{flags[key] ? "ON" : "OFF"}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Beta panel — conditional */}
      {flags["beta-ui"] && (
        <div
          id="beta-panel"
          data-testid="beta-panel"
          aria-label="Beta feature panel"
          className={styles.betaPanel}
        >
          <p className={styles.betaTitle}>Beta Feature Visible</p>
          <p className={styles.betaDesc}>
            Only visible when "Beta UI" flag is ON.{" "}
            Test: <code>test.skip(!betaOn, 'Beta UI not enabled')</code>
          </p>
          <button id="btn-beta-action" data-testid="btn-beta-action">
            Beta Action
          </button>
        </div>
      )}
    </div>
  );
}

// ── S02: Slow Report Generator ───────────────────────────────────────────────

const REPORT_ROWS = [
  { month: "January", revenue: "$42,300", orders: 218, status: "Above target" },
  { month: "February", revenue: "$38,900", orders: 201, status: "On target" },
  { month: "March", revenue: "$51,200", orders: 267, status: "Above target" },
  { month: "April", revenue: "$29,400", orders: 153, status: "Below target" },
];

interface SlowReportPanelProps {
  onComplete: () => void;
  setResult: (r: string) => void;
}

function SlowReportPanel({ onComplete, setResult }: SlowReportPanelProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingLabel, setLoadingLabel] = useState("");
  const [reportVisible, setReportVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function runOp(label: string, seconds: number, showReport: boolean) {
    if (loading) return;
    setLoading(true);
    setProgress(0);
    setReportVisible(false);
    setLoadingLabel(`${label}… please wait (${seconds}s)`);
    setResult(`Started: ${new Date().toLocaleTimeString()}`);

    let elapsed = 0;
    intervalRef.current = setInterval(() => {
      elapsed += 100;
      setProgress(Math.min((elapsed / (seconds * 1000)) * 100, 100));
    }, 100);

    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setLoading(false);
      setProgress(100);
      const done = `✓ ${label} done at ${new Date().toLocaleTimeString()} (${seconds}s elapsed).`;
      setResult(done);
      if (showReport) {
        setReportVisible(true);
        onComplete();
      }
    }, seconds * 1000);
  }

  return (
    <div data-testid="slow-ops-panel">
      <div className={styles.btnRow}>
        <button
          id="btn-gen-report"
          data-testid="btn-gen-report"
          aria-label="Generate sales report"
          disabled={loading}
          onClick={() => runOp("Generate sales report", 5, true)}
        >
          Generate Report (5s)
        </button>
        <button
          id="btn-load-data"
          data-testid="btn-load-data"
          aria-label="Load dashboard data"
          disabled={loading}
          onClick={() => runOp("Load dashboard data", 3, false)}
        >
          Load Dashboard Data (3s)
        </button>
        <button
          id="btn-export-csv"
          data-testid="btn-export-csv"
          aria-label="Export CSV file"
          disabled={loading}
          onClick={() => runOp("Export CSV", 8, false)}
        >
          Export CSV (8s)
        </button>
      </div>

      {loading && (
        <div
          id="loading-indicator"
          data-testid="loading-indicator"
          role="status"
          aria-busy="true"
          aria-label="Operation in progress"
          className={styles.loadingBox}
        >
          <div id="loading-label" data-testid="loading-label" className={styles.loadingLabel}>
            {loadingLabel}
          </div>
          <div className={styles.progressWrap}>
            <div
              id="progress-bar"
              data-testid="progress-bar"
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.skeletonLines}>
            <div className={styles.skeleton} style={{ width: "85%" }} />
            <div className={styles.skeleton} style={{ width: "60%" }} />
            <div className={styles.skeleton} style={{ width: "75%" }} />
          </div>
        </div>
      )}

      {!loading && (
        <div
          id="loading-indicator"
          data-testid="loading-indicator"
          role="status"
          aria-busy="false"
          aria-label="Operation in progress"
          style={{ display: "none" }}
        />
      )}

      {reportVisible && (
        <div id="report-result" data-testid="report-result">
          <table
            id="report-table"
            data-testid="report-table"
            aria-label="Sales report"
            className={styles.reportTable}
          >
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue</th>
                <th>Orders</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="report-tbody" data-testid="report-tbody">
              {REPORT_ROWS.map((row, i) => (
                <tr
                  key={row.month}
                  data-testid={`report-row-${i}`}
                  data-month={row.month.toLowerCase()}
                >
                  <td>{row.month}</td>
                  <td>{row.revenue}</td>
                  <td>{row.orders}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── S03: Buggy Counter ───────────────────────────────────────────────────────

interface BuggyCounterPanelProps {
  onComplete: () => void;
  setResult: (r: string) => void;
}

function BuggyCounterPanel({ onComplete, setResult }: BuggyCounterPanelProps) {
  const [count, setCount] = useState(0);
  const completedRef = useRef(false);

  function increment() {
    setCount((prev) => {
      const next = prev + 2; // BUG-101: should be +1
      setResult(
        `Counter: ${next} — BUG-101: clicked + once but added 2. Expected ${prev + 1}.`,
      );
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
      return next;
    });
  }

  function decrement() {
    setCount((prev) => {
      const next = Math.max(0, prev - 1);
      setResult(`Counter: ${next} — Decrement works correctly (−1).`);
      return next;
    });
  }

  return (
    <div data-testid="buggy-counter-panel">
      <div className={styles.cardRow}>
        {/* Buggy counter */}
        <div className={styles.bugCard}>
          <div className={styles.bugCardHeader}>
            Buggy Counter
            <span
              className={styles.bugBadge}
              data-testid="bug-tag-101"
              data-bug-id="BUG-101"
            >
              ⚠ BUG-101
            </span>
          </div>
          <p className={styles.bugNote}>Increments by 2 instead of 1. Use test.fixme('BUG-101').</p>
          <div className={styles.counterRow}>
            <button
              id="btn-dec"
              data-testid="btn-buggy-dec"
              aria-label="Decrease counter"
              onClick={decrement}
            >
              −
            </button>
            <span
              id="buggy-counter"
              data-testid="buggy-counter"
              role="status"
              aria-label="Counter value"
              aria-live="polite"
              className={styles.counterDisplay}
            >
              {count}
            </span>
            <button
              id="btn-inc"
              data-testid="btn-buggy-inc"
              aria-label="Increase counter"
              onClick={increment}
            >
              +
            </button>
          </div>
          <p className={styles.bugNote}>Bug: +1 click adds 2. Decrement is correct.</p>
        </div>
      </div>
    </div>
  );
}

// ── S04: Flaky + Expected Fail ───────────────────────────────────────────────

interface FlakyPanelProps {
  onComplete: () => void;
  setResult: (r: string) => void;
}

function FlakyPanel({ onComplete, setResult }: FlakyPanelProps) {
  const [flakyResult, setFlakyResult] = useState("Not clicked yet.");
  const [flakyColor, setFlakyColor] = useState<string | undefined>(undefined);
  const [failResult, setFailResult] = useState("Not submitted yet.");
  const [failColor, setFailColor] = useState<string | undefined>(undefined);
  const completedRef = useRef(false);

  function clickFlaky() {
    const ok = Math.random() >= 0.5;
    setFlakyResult(ok ? "✓ Success this time." : "✗ Failed this time (50% chance).");
    setFlakyColor(ok ? "#166534" : "#991b1b");
    setResult(`Flaky action: ${ok ? "Success" : "Failed"} (50% reliability)`);
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }

  function triggerExpectedFail() {
    const msg =
      "✗ Error 500: Internal Server Error — always fails. Use test.fail() to confirm bug is still present.";
    setFailResult(msg);
    setFailColor("#991b1b");
    setResult("Expected failure triggered. test.fail() makes this test PASS.");
  }

  return (
    <div data-testid="flaky-panel">
      <div className={styles.cardRow}>
        {/* Flaky button */}
        <div className={styles.bugCard}>
          <div className={styles.bugCardHeader}>
            Flaky Action
            <span
              className={styles.bugBadge}
              data-testid="bug-tag-202"
              data-bug-id="BUG-202"
            >
              ⚠ BUG-202
            </span>
          </div>
          <p className={styles.bugNote}>Succeeds ~50% of runs. Use test.fixme() or retries: 2.</p>
          <button
            id="btn-flaky"
            data-testid="btn-flaky"
            data-reliability="50pct"
            onClick={clickFlaky}
          >
            Flaky Action
          </button>
          <div
            id="flaky-result"
            data-testid="flaky-result"
            role="alert"
            className={styles.outputBox}
            style={flakyColor ? { color: flakyColor } : undefined}
          >
            {flakyResult}
          </div>
        </div>

        {/* Expected failure */}
        <div className={styles.infoCard}>
          <div className={styles.bugCardHeader}>
            Always Errors
            <span style={{ fontSize: 11, fontWeight: 700 }}>test.fail()</span>
          </div>
          <p className={styles.bugNote}>
            Always returns an error. test.fail() confirms the bug — test "passes" if it fails.
          </p>
          <button
            id="btn-expected-fail"
            data-testid="btn-expected-fail"
            data-outcome="always-error"
            onClick={triggerExpectedFail}
          >
            Submit (always errors)
          </button>
          <div
            id="expected-fail-result"
            data-testid="expected-fail-result"
            role="alert"
            className={styles.outputBox}
            style={failColor ? { color: failColor } : undefined}
          >
            {failResult}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── S05: Checkout Stepper ────────────────────────────────────────────────────

interface CheckoutStepperProps {
  onComplete: () => void;
  setResult: (r: string) => void;
}

type StepStatus = "pending" | "active" | "done";

function CheckoutStepper({ onComplete, setResult }: CheckoutStepperProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepStatus, setStepStatus] = useState<StepStatus[]>(["active", "pending", "pending"]);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Cart state
  const [qty1, setQty1] = useState(1);
  const [qty2] = useState(2);
  const price1 = 149.99;
  const price2 = 39.99;
  const total = (qty1 * price1 + qty2 * price2).toFixed(2);

  function goToStep(step: number) {
    setCurrentStep(step);
    setStepStatus((prev) =>
      prev.map((_, i) => {
        if (i + 1 < step) return "done";
        if (i + 1 === step) return "active";
        return "pending";
      }) as StepStatus[],
    );
    setResult(`Moved to step ${step}`);
  }

  function placeOrder() {
    const id = "ORD-" + Math.random().toString(36).toUpperCase().slice(2, 9);
    setOrderId(id);
    setStepStatus(["done", "done", "done"]);
    setResult(`Order placed! ID: ${id}`);
    onComplete();
  }

  function tabClass(idx: number) {
    const s = stepStatus[idx];
    return `${styles.stepTab} ${s === "active" ? styles.active : s === "done" ? styles.done : ""}`;
  }

  const STEP_LABELS = ["Cart", "Shipping", "Payment"];

  return (
    <div data-testid="checkout-stepper-panel">
      {/* Step tabs */}
      <div
        className={styles.stepper}
        role="tablist"
        aria-label="Checkout steps"
        data-testid="checkout-stepper"
      >
        {STEP_LABELS.map((label, idx) => (
          <div
            key={idx}
            id={`step-tab-${idx + 1}`}
            data-testid={`step-tab-${idx + 1}`}
            data-step={idx + 1}
            className={tabClass(idx)}
            role="tab"
            aria-selected={stepStatus[idx] === "active"}
            aria-controls={`step-panel-${idx + 1}`}
          >
            <span className={styles.stepNum}>{idx + 1}</span>
            {label}
          </div>
        ))}
      </div>

      {/* Step 1: Cart */}
      <div
        id="step-panel-1"
        data-testid="step-panel-1"
        className={`${styles.stepPanel}${currentStep === 1 ? ` ${styles.active}` : ""}`}
        role="tabpanel"
        aria-labelledby="step-tab-1"
      >
        <table aria-label="Cart items" data-testid="cart-table" className={styles.reportTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            <tr data-testid="cart-row-headphones">
              <td data-testid="cart-name-1">Wireless Headphones</td>
              <td>
                <input
                  type="number"
                  id="qty-1"
                  data-testid="cart-qty-1"
                  name="qty1"
                  value={qty1}
                  min={1}
                  aria-label="Quantity for Wireless Headphones"
                  style={{ width: 52, padding: "3px 6px" }}
                  onChange={(e) => setQty1(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </td>
              <td data-testid="cart-price-1" data-price="149.99">
                $149.99
              </td>
            </tr>
            <tr data-testid="cart-row-hub">
              <td data-testid="cart-name-2">USB-C Hub</td>
              <td>
                <input
                  type="number"
                  id="qty-2"
                  data-testid="cart-qty-2"
                  name="qty2"
                  value={qty2}
                  min={1}
                  aria-label="Quantity for USB-C Hub"
                  style={{ width: 52, padding: "3px 6px" }}
                  readOnly
                />
              </td>
              <td data-testid="cart-price-2" data-price="39.99">
                $39.99
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontWeight: 700, fontSize: 14, marginTop: 8 }}>
          Total: <span id="cart-total" data-testid="cart-total">${total}</span>
        </p>
        <div className={styles.btnRow} style={{ marginTop: 10 }}>
          <button id="btn-to-shipping" data-testid="btn-to-shipping" onClick={() => goToStep(2)}>
            Continue to Shipping →
          </button>
        </div>
      </div>

      {/* Step 2: Shipping */}
      <div
        id="step-panel-2"
        data-testid="step-panel-2"
        className={`${styles.stepPanel}${currentStep === 2 ? ` ${styles.active}` : ""}`}
        role="tabpanel"
        aria-labelledby="step-tab-2"
      >
        <div className={styles.fieldGrid}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="ship-name">
              Full Name
            </label>
            <input
              type="text"
              id="ship-name"
              data-testid="ship-name"
              name="fullName"
              placeholder="Jane Smith"
              aria-label="Full name"
              aria-required="true"
              className={styles.fieldInput}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="ship-zip">
              ZIP Code
            </label>
            <input
              type="text"
              id="ship-zip"
              data-testid="ship-zip"
              name="zip"
              placeholder="10001"
              aria-label="ZIP code"
              className={styles.fieldInput}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="ship-address">
            Address
          </label>
          <input
            type="text"
            id="ship-address"
            data-testid="ship-address"
            name="address"
            placeholder="123 Main St"
            aria-label="Street address"
            className={styles.fieldInput}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="ship-method">
            Shipping Method
          </label>
          <select
            id="ship-method"
            data-testid="ship-method"
            name="shippingMethod"
            aria-label="Select shipping method"
            className={styles.fieldSelect}
          >
            <option value="standard">Standard (5–7 days) — Free</option>
            <option value="express">Express (2–3 days) — $12.99</option>
            <option value="overnight">Overnight — $24.99</option>
          </select>
        </div>
        <div className={styles.btnRow}>
          <button
            data-testid="btn-back-cart"
            onClick={() => goToStep(1)}
            style={{ background: "var(--muted-foreground)" }}
          >
            ← Back
          </button>
          <button id="btn-to-payment" data-testid="btn-to-payment" onClick={() => goToStep(3)}>
            Continue to Payment →
          </button>
        </div>
      </div>

      {/* Step 3: Payment */}
      <div
        id="step-panel-3"
        data-testid="step-panel-3"
        className={`${styles.stepPanel}${currentStep === 3 ? ` ${styles.active}` : ""}`}
        role="tabpanel"
        aria-labelledby="step-tab-3"
      >
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="pay-card">
            Card Number
          </label>
          <input
            type="text"
            id="pay-card"
            data-testid="pay-card"
            name="cardNumber"
            placeholder="4111 1111 1111 1111"
            maxLength={19}
            aria-label="Card number"
            className={styles.fieldInput}
          />
        </div>
        <div className={styles.fieldGrid}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="pay-expiry">
              Expiry (MM/YY)
            </label>
            <input
              type="text"
              id="pay-expiry"
              data-testid="pay-expiry"
              name="expiry"
              placeholder="12/27"
              maxLength={5}
              aria-label="Card expiry"
              className={styles.fieldInput}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor="pay-cvv">
              CVV
            </label>
            <input
              type="text"
              id="pay-cvv"
              data-testid="pay-cvv"
              name="cvv"
              placeholder="123"
              maxLength={3}
              aria-label="CVV code"
              className={styles.fieldInput}
            />
          </div>
        </div>
        <div className={styles.btnRow}>
          <button
            data-testid="btn-back-shipping"
            onClick={() => goToStep(2)}
            style={{ background: "var(--muted-foreground)" }}
          >
            ← Back
          </button>
          <button id="btn-place-order" data-testid="btn-place-order" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>

      {/* Order confirmation */}
      {orderId && (
        <div
          id="order-confirmation"
          data-testid="order-confirmation"
          className={styles.orderConfirmation}
          role="status"
          aria-live="assertive"
        >
          <strong>✓ Order Placed!</strong> Order ID:{" "}
          <strong id="order-id" data-testid="order-id">
            {orderId}
          </strong>
        </div>
      )}
    </div>
  );
}

// ── S06: Data-Driven Login ───────────────────────────────────────────────────

const USERS: Record<string, { pw: string; role: "admin" | "editor" | "viewer" }> = {
  "admin@test.com": { pw: "admin123", role: "admin" },
  "editor@test.com": { pw: "editor123", role: "editor" },
  "viewer@test.com": { pw: "viewer123", role: "viewer" },
};

interface DataDrivenLoginProps {
  onComplete: () => void;
  setResult: (r: string) => void;
}

function DataDrivenLogin({ onComplete, setResult }: DataDrivenLoginProps) {
  const [loggedInRole, setLoggedInRole] = useState<"admin" | "editor" | "viewer" | null>(null);
  const [loginMsg, setLoginMsg] = useState("Login result will appear here…");
  const [loginColor, setLoginColor] = useState<string | undefined>(undefined);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const doLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const email = emailRef.current?.value.trim() ?? "";
      const pw = passwordRef.current?.value ?? "";
      const user = USERS[email];

      if (!user || user.pw !== pw) {
        setLoginMsg(`✗ Invalid credentials for: ${email}`);
        setLoginColor("#991b1b");
        setLoggedInRole(null);
        setResult("Login failed — invalid credentials");
        return;
      }

      setLoginMsg(`✓ Logged in as ${email} (role: ${user.role})`);
      setLoginColor("#166534");
      setLoggedInRole(user.role);
      setResult(`Logged in as ${user.role} — assert [data-role-panel="${user.role}"] is visible`);
      onComplete();
    },
    [onComplete, setResult],
  );

  function doLogout() {
    setLoggedInRole(null);
    setLoginMsg("Logged out.");
    setLoginColor(undefined);
    setResult("Logged out — state reset for next test.each() iteration");
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  }

  const CRED_ROWS = [
    { role: "admin", email: "admin@test.com", pw: "admin123", badge: "roleAdmin", label: "Admin", expects: "Full dashboard" },
    { role: "editor", email: "editor@test.com", pw: "editor123", badge: "roleEditor", label: "Editor", expects: "Edit panel only" },
    { role: "viewer", email: "viewer@test.com", pw: "viewer123", badge: "roleViewer", label: "Viewer", expects: "Read-only view" },
    { role: "invalid", email: "bad@test.com", pw: "wrong", badge: "roleInvalid", label: "Invalid", expects: "Error message" },
  ];

  return (
    <div data-testid="data-driven-login-panel">
      <div className={styles.loginGrid}>
        {/* Login form */}
        <div>
          <form id="login-form" data-testid="login-form" onSubmit={doLogin} noValidate>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="login-email">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                id="login-email"
                data-testid="login-email"
                name="email"
                placeholder="user@example.com"
                aria-label="Login email"
                aria-required="true"
                className={styles.fieldInput}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="login-password">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                id="login-password"
                data-testid="login-password"
                name="password"
                placeholder="Password"
                aria-label="Login password"
                aria-required="true"
                className={styles.fieldInput}
              />
            </div>
            <div className={styles.btnRow} style={{ marginTop: 4 }}>
              {!loggedInRole && (
                <button type="submit" id="btn-login" data-testid="btn-login">
                  Login
                </button>
              )}
              {loggedInRole && (
                <button
                  type="button"
                  id="btn-logout"
                  data-testid="btn-logout"
                  onClick={doLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </form>
          <div
            id="login-result"
            data-testid="login-result"
            role="status"
            aria-live="polite"
            className={styles.outputBox}
            style={loginColor ? { color: loginColor } : undefined}
          >
            {loginMsg}
          </div>
        </div>

        {/* Credentials reference table */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
            Test Data — Valid Credentials:
          </p>
          <table
            id="credentials-table"
            data-testid="credentials-table"
            aria-label="Valid login credentials"
            className={styles.credTable}
          >
            <thead>
              <tr>
                <th>Role</th>
                <th>Email</th>
                <th>Password</th>
                <th>Expects</th>
              </tr>
            </thead>
            <tbody>
              {CRED_ROWS.map((row) => (
                <tr
                  key={row.role}
                  data-testid={`cred-${row.role}`}
                  data-role={row.role}
                >
                  <td>
                    <span className={`${styles.roleBadge} ${styles[row.badge as keyof typeof styles]}`}>
                      {row.label}
                    </span>
                  </td>
                  <td>
                    <code>{row.email}</code>
                  </td>
                  <td>
                    <code>{row.pw}</code>
                  </td>
                  <td>{row.expects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role dashboards */}
      {loggedInRole && (
        <div
          id="role-dashboard"
          data-testid="role-dashboard"
          className={styles.dashboard}
        >
          <div
            id="dash-admin"
            data-testid="dash-admin"
            data-role-panel="admin"
            className={`${styles.dashPanel}${loggedInRole === "admin" ? ` ${styles.visible}` : ""}`}
          >
            <p className={styles.dashTitle}>Admin Dashboard</p>
            <div className={styles.dashBtnRow}>
              <button data-testid="admin-manage-users" style={{ fontSize: 12 }}>
                Manage Users
              </button>
              <button data-testid="admin-settings" style={{ fontSize: 12 }}>
                Settings
              </button>
              <button data-testid="admin-billing" style={{ fontSize: 12 }}>
                Billing
              </button>
            </div>
          </div>
          <div
            id="dash-editor"
            data-testid="dash-editor"
            data-role-panel="editor"
            className={`${styles.dashPanel}${loggedInRole === "editor" ? ` ${styles.visible}` : ""}`}
          >
            <p className={styles.dashTitle}>Editor Dashboard</p>
            <div className={styles.dashBtnRow}>
              <button data-testid="editor-new-post" style={{ fontSize: 12 }}>
                New Post
              </button>
              <button data-testid="editor-drafts" style={{ fontSize: 12 }}>
                Drafts
              </button>
            </div>
          </div>
          <div
            id="dash-viewer"
            data-testid="dash-viewer"
            data-role-panel="viewer"
            className={`${styles.dashPanel}${loggedInRole === "viewer" ? ` ${styles.visible}` : ""}`}
          >
            <p className={styles.dashTitle}>Viewer Dashboard</p>
            <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "6px 0 0" }}>
              Read-only access. No edit buttons visible.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main PracticeTab ─────────────────────────────────────────────────────────

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = annotationsScenarios.map((s) => ({
    id: s.id.toLowerCase(),
    label: s.title,
    done: completedIds.has(s.id.toLowerCase()),
  }));

  return (
    <div
      className="mx-auto w-full max-w-[1280px] px-4 sm:px-7"
      data-testid="practice-tab"
      data-section="practice"
    >
      <div className={styles.practiceLayout}>
        <section aria-label="Interactive Scenarios">
          <p className="mb-3 text-[10.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            Interactive Scenarios
          </p>

          <div className="flex flex-col gap-[10px]" data-testid="scenarios-list">
            {/* S01 — Feature Flags / test.skip */}
            <ScenarioCard
              {...annotationsScenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult, complete }) => (
                <FeatureFlagsPanel
                  onComplete={complete}
                  setResult={setResult}
                />
              )}
            </ScenarioCard>

            {/* S02 — Slow Report / test.slow */}
            <ScenarioCard
              {...annotationsScenarios[1]}
              onComplete={() => markDone("s02")}
            >
              {({ setResult, complete }) => (
                <SlowReportPanel onComplete={complete} setResult={setResult} />
              )}
            </ScenarioCard>

            {/* S03 — Buggy Counter / test.fixme */}
            <ScenarioCard
              {...annotationsScenarios[2]}
              onComplete={() => markDone("s03")}
            >
              {({ setResult, complete }) => (
                <BuggyCounterPanel onComplete={complete} setResult={setResult} />
              )}
            </ScenarioCard>

            {/* S04 — Flaky / test.fail */}
            <ScenarioCard
              {...annotationsScenarios[3]}
              onComplete={() => markDone("s04")}
            >
              {({ setResult, complete }) => (
                <FlakyPanel onComplete={complete} setResult={setResult} />
              )}
            </ScenarioCard>

            {/* S05 — Checkout Stepper / test.step */}
            <ScenarioCard
              {...annotationsScenarios[4]}
              onComplete={() => markDone("s05")}
            >
              {({ setResult, complete }) => (
                <CheckoutStepper onComplete={complete} setResult={setResult} />
              )}
            </ScenarioCard>

            {/* S06 — Data-Driven Login / test.each */}
            <ScenarioCard
              {...annotationsScenarios[5]}
              onComplete={() => markDone("s06")}
            >
              {({ setResult, complete }) => (
                <DataDrivenLogin onComplete={complete} setResult={setResult} />
              )}
            </ScenarioCard>
          </div>
        </section>

        <aside className={styles.practiceSidebar} data-testid="practice-sidebar">
          <ProgressWidget items={progressItems} />
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>
    </div>
  );
}
