"use client";

import { useState } from "react";
import { FormCard } from "./form-card";
import styles from "./forms.module.css";

const HINT =
  `Gender radios share <code>name="gender"</code>. Scope to <code>[data-testid="radio-group-gender"]</code> ` +
  `then check by <code>getByTestId("radio-gender-male")</code>. Phone must be exactly 10 digits — ` +
  `trigger the error with a short number and assert <code>[data-testid="error-phone"]</code>.`;

type Vals = { firstName: string; lastName: string; phone: string; dob: string; gender: string };
type Errs = { firstName: string; lastName: string; phone: string; dob: string; gender: string };
const EMPTY_V: Vals = { firstName: "", lastName: "", phone: "", dob: "", gender: "" };
const EMPTY_E: Errs = { firstName: "", lastName: "", phone: "", dob: "", gender: "" };

function validate(v: Vals): Errs {
  return {
    firstName: v.firstName.trim() ? "" : "First name is required.",
    lastName:  v.lastName.trim()  ? "" : "Last name is required.",
    phone: !v.phone.trim() ? "Phone is required." : !/^\d{10}$/.test(v.phone.trim()) ? "Phone must be exactly 10 digits." : "",
    dob:    v.dob    ? "" : "Date of birth is required.",
    gender: v.gender ? "" : "Please select your gender.",
  };
}

const RADIOS = [
  { id: "gender-male",   testId: "radio-gender-male",   value: "male",   label: "Male" },
  { id: "gender-female", testId: "radio-gender-female", value: "female", label: "Female" },
  { id: "gender-other",  testId: "radio-gender-other",  value: "other",  label: "Other" },
] as const;

export function PersonalDetailsForm() {
  const [vals, setVals] = useState<Vals>(EMPTY_V);
  const [errs, setErrs] = useState<Errs>(EMPTY_E);
  const [success, setSuccess] = useState("");

  function set(field: keyof Vals, value: string) {
    setVals((p) => ({ ...p, [field]: value }));
    if (errs[field]) setErrs((p) => ({ ...p, [field]: "" }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const e2 = validate(vals);
    if (Object.values(e2).some(Boolean)) { setErrs(e2); return; }
    setErrs(EMPTY_E);
    setSuccess(`Saved: ${vals.firstName} ${vals.lastName}`);
  }

  function handleReset() { setVals(EMPTY_V); setErrs(EMPTY_E); setSuccess(""); }

  return (
    <FormCard id="F02" title="Personal Details Form" level="Beginner"
      hint={HINT} testId="form-personal">
      <form data-testid="form-personal-inner" onSubmit={handleSubmit} noValidate>
        <div className={styles.formGrid2}>
          {/* First name */}
          <div className={styles.fieldRow}>
            <label htmlFor="firstName" className={styles.label}>First Name <span className={styles.required}>*</span></label>
            <input id="firstName" name="firstName" type="text" placeholder="First name"
              data-testid="input-first-name"
              className={`${styles.input} ${errs.firstName ? styles.inputError : ""}`}
              value={vals.firstName} onChange={(e) => set("firstName", e.target.value)} aria-required="true" />
            {errs.firstName && <span id="firstNameError" data-testid="error-first-name" className={styles.errorMsg} role="alert">{errs.firstName}</span>}
          </div>

          {/* Last name */}
          <div className={styles.fieldRow}>
            <label htmlFor="lastName" className={styles.label}>Last Name <span className={styles.required}>*</span></label>
            <input id="lastName" name="lastName" type="text" placeholder="Last name"
              data-testid="input-last-name"
              className={`${styles.input} ${errs.lastName ? styles.inputError : ""}`}
              value={vals.lastName} onChange={(e) => set("lastName", e.target.value)} aria-required="true" />
            {errs.lastName && <span id="lastNameError" data-testid="error-last-name" className={styles.errorMsg} role="alert">{errs.lastName}</span>}
          </div>

          {/* Phone */}
          <div className={styles.fieldRow}>
            <label htmlFor="phone" className={styles.label}>Phone <span className={styles.required}>*</span></label>
            <input id="phone" name="phone" type="tel" placeholder="10-digit number"
              data-testid="input-phone"
              className={`${styles.input} ${errs.phone ? styles.inputError : ""}`}
              value={vals.phone} onChange={(e) => set("phone", e.target.value)} aria-required="true" />
            {errs.phone && <span id="phoneError" data-testid="error-phone" className={styles.errorMsg} role="alert">{errs.phone}</span>}
          </div>

          {/* Date of birth */}
          <div className={styles.fieldRow}>
            <label htmlFor="dob" className={styles.label}>Date of Birth <span className={styles.required}>*</span></label>
            <input id="dob" name="dob" type="date"
              data-testid="input-dob"
              className={`${styles.input} ${errs.dob ? styles.inputError : ""}`}
              value={vals.dob} onChange={(e) => set("dob", e.target.value)} aria-required="true" />
            {errs.dob && <span id="dobError" data-testid="error-dob" className={styles.errorMsg} role="alert">{errs.dob}</span>}
          </div>
        </div>

        {/* Gender — medium: scope to radiogroup */}
        <div className={styles.fieldRow}>
          <span id="gender-group-label" className={styles.label}>Gender <span className={styles.required}>*</span></span>
          <div className={styles.radioGroup} role="radiogroup"
            aria-labelledby="gender-group-label" data-testid="radio-group-gender"
            aria-describedby={errs.gender ? "genderError" : undefined}>
            {RADIOS.map((r) => (
              <label key={r.value} htmlFor={r.id} className={styles.radioLabel}>
                <input id={r.id} name="gender" type="radio" value={r.value}
                  data-testid={r.testId} data-gender={r.value}
                  className={styles.radioInput}
                  checked={vals.gender === r.value}
                  onChange={() => { setVals((p) => ({ ...p, gender: r.value })); setErrs((p) => ({ ...p, gender: "" })); }} />
                {r.label}
              </label>
            ))}
          </div>
          {errs.gender && <span id="genderError" data-testid="error-gender" className={styles.errorMsg} role="alert">{errs.gender}</span>}
        </div>

        <div className={styles.formActions}>
          <button id="personalSubmitBtn" type="submit" data-testid="btn-personal-submit" className={styles.submitBtn}>Save Details</button>
          <button type="button" data-testid="btn-personal-reset" className={styles.resetBtn} onClick={handleReset}>Reset</button>
        </div>
      </form>

      {success && (
        <div id="personalResult" data-testid="result-personal" className={styles.successBanner} role="status">{success}</div>
      )}
    </FormCard>
  );
}
