"use client";

import { useState } from "react";
import { FormCard } from "./form-card";
import styles from "./forms.module.css";

const HINT =
  `Country is a native <code>&lt;select&gt;</code> — use <code>selectOption({ label: "India" })</code> in Playwright ` +
  `or <code>new Select(driver.findElement(By.id("country")))</code> in Selenium. ` +
  `The "About You" textarea has <strong>no data-testid</strong> — locate it by ` +
  `<code>getByLabel('About You')</code>, <code>#bio</code>, or XPath ` +
  `<code>//label[text()='About You']/following-sibling::textarea</code>.`;

const COUNTRIES = [
  { value: "IN", label: "India" }, { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" }, { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" }, { value: "DE", label: "Germany" },
  { value: "JP", label: "Japan" }, { value: "SG", label: "Singapore" },
];

type Vals = { country: string; city: string; bio: string };
type Errs = { country: string; city: string };
const EMPTY_V: Vals = { country: "", city: "", bio: "" };
const EMPTY_E: Errs = { country: "", city: "" };

export function AddressForm() {
  const [vals, setVals] = useState<Vals>(EMPTY_V);
  const [errs, setErrs] = useState<Errs>(EMPTY_E);
  const [success, setSuccess] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrs: Errs = {
      country: vals.country ? "" : "Please select a country.",
      city:    vals.city.trim() ? "" : "City is required.",
    };
    if (newErrs.country || newErrs.city) { setErrs(newErrs); return; }
    setErrs(EMPTY_E);
    const label = COUNTRIES.find((c) => c.value === vals.country)?.label ?? vals.country;
    setSuccess(`Address saved: ${vals.city}, ${label}`);
  }

  function handleReset() { setVals(EMPTY_V); setErrs(EMPTY_E); setSuccess(""); }

  return (
    <FormCard id="F03" title="Address Form" level="Hard"
      hint={HINT} testId="form-address">
      <form data-testid="form-address-inner" onSubmit={handleSubmit} noValidate>
        {/* Country — medium: native select, label + id + testid */}
        <div className={styles.fieldRow}>
          <label htmlFor="country" className={styles.label}>
            Country <span className={styles.required}>*</span>
          </label>
          <select id="country" name="country" data-testid="select-country"
            className={`${styles.input} ${styles.select} ${errs.country ? styles.inputError : ""}`}
            value={vals.country}
            onChange={(e) => { setVals((p) => ({ ...p, country: e.target.value })); setErrs((p) => ({ ...p, country: "" })); }}
            aria-required="true" aria-describedby={errs.country ? "countryError" : undefined}>
            <option value="">Select country</option>
            {COUNTRIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          {errs.country && (
            <span id="countryError" data-testid="error-country" className={styles.errorMsg} role="alert">{errs.country}</span>
          )}
        </div>

        {/* City — beginner */}
        <div className={styles.fieldRow}>
          <label htmlFor="city" className={styles.label}>
            City <span className={styles.required}>*</span>
          </label>
          <input id="city" name="city" type="text" placeholder="Enter city"
            data-testid="input-city"
            className={`${styles.input} ${errs.city ? styles.inputError : ""}`}
            value={vals.city}
            onChange={(e) => { setVals((p) => ({ ...p, city: e.target.value })); setErrs((p) => ({ ...p, city: "" })); }}
            aria-required="true" aria-describedby={errs.city ? "cityError" : undefined} />
          {errs.city && (
            <span id="cityError" data-testid="error-city" className={styles.errorMsg} role="alert">{errs.city}</span>
          )}
        </div>

        {/* About You — Hard: label + id but NO data-testid */}
        <div className={styles.fieldRow}>
          <label htmlFor="bio" className={styles.label}>
            About You
            <span className={styles.optionalBadge}>optional · no testid</span>
          </label>
          <textarea id="bio" name="bio" rows={3}
            placeholder="Tell us a little about yourself…"
            className={`${styles.input} ${styles.textarea}`}
            value={vals.bio}
            onChange={(e) => setVals((p) => ({ ...p, bio: e.target.value }))} />
        </div>

        <div className={styles.formActions}>
          <button id="addressSubmitBtn" type="submit" data-testid="btn-address-submit" className={styles.submitBtn}>Save Address</button>
          <button type="button" data-testid="btn-address-reset" className={styles.resetBtn} onClick={handleReset}>Reset</button>
        </div>
      </form>

      {success && (
        <div id="addressResult" data-testid="result-address" className={styles.successBanner} role="status">{success}</div>
      )}
    </FormCard>
  );
}
