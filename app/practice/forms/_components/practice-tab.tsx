"use client";

import { useState } from "react";
import { FrameworkMethodsPanel, UpNextCard } from "@/components/practice";
import { frameworkMethods } from "@/data/practice-data/forms/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./forms.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  country: string;
  city: string;
  bio: string;
  interests: string[];
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  country: string;
  city: string;
  password: string;
  confirmPassword: string;
  terms: string;
}

const EMPTY_VALUES: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  country: "",
  city: "",
  bio: "",
  interests: [],
  password: "",
  confirmPassword: "",
  terms: false,
};

const EMPTY_ERRORS: FormErrors = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  country: "",
  city: "",
  password: "",
  confirmPassword: "",
  terms: "",
};

const COUNTRIES = [
  { value: "IN", label: "India" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" },
  { value: "DE", label: "Germany" },
  { value: "JP", label: "Japan" },
  { value: "SG", label: "Singapore" },
];

const INTERESTS = [
  { id: "interest-selenium", testId: "checkbox-interest-selenium", label: "Selenium", value: "selenium" },
  { id: "interest-playwright", testId: "checkbox-interest-playwright", label: "Playwright", value: "playwright" },
  { id: "interest-cypress", testId: "checkbox-interest-cypress", label: "Cypress", value: "cypress" },
  { id: "interest-appium", testId: "checkbox-interest-appium", label: "Appium", value: "appium" },
  { id: "interest-jest", testId: "checkbox-interest-jest", label: "Jest", value: "jest" },
];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = { ...EMPTY_ERRORS };
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^\d{10}$/;

  if (!values.firstName.trim()) errors.firstName = "First name is required.";
  if (!values.lastName.trim()) errors.lastName = "Last name is required.";

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRe.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone is required.";
  } else if (!phoneRe.test(values.phone.trim())) {
    errors.phone = "Phone must be exactly 10 digits.";
  }

  if (!values.dob) errors.dob = "Date of birth is required.";
  if (!values.gender) errors.gender = "Please select your gender.";
  if (!values.country) errors.country = "Please select a country.";
  if (!values.city.trim()) errors.city = "City is required.";

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!values.terms) {
    errors.terms = "You must accept the Terms & Conditions.";
  }

  return errors;
}

function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((v) => v !== "");
}

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>(EMPTY_ERRORS);
  const [submitted, setSubmitted] = useState(false);

  function handleText(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  function handleInterest(value: string, checked: boolean) {
    setValues((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((i) => i !== value),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    if (hasErrors(errs)) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }

  function handleReset() {
    setValues(EMPTY_VALUES);
    setErrors(EMPTY_ERRORS);
  }

  function handleFillAgain() {
    setValues(EMPTY_VALUES);
    setErrors(EMPTY_ERRORS);
    setSubmitted(false);
  }

  return (
    <div
      className="mx-auto w-full max-w-[1280px] px-4 sm:px-7"
      data-testid="practice-tab"
      data-section="practice"
    >
      <div className="grid grid-cols-1 gap-6 pt-6 pb-16 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* ── Left: form ───────────────────────────────────────────────── */}
        <section aria-label="Registration Form Practice">
          <p className="mb-3 text-[10.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            Interactive Form
          </p>

          {/* ── Success state ─────────────────────────────────────────── */}
          {submitted ? (
            <div
              id="formSuccessMsg"
              data-testid="form-success-msg"
              className={styles.successCard}
              role="alert"
              aria-live="polite"
            >
              <div className={styles.successIcon} aria-hidden="true">✓</div>
              <h2 className={styles.successTitle}>Form Submitted!</h2>
              <p className={styles.successBody}>
                Hello,{" "}
                <strong id="submittedName" data-testid="submitted-name">
                  {values.firstName} {values.lastName}
                </strong>
                ! Your registration was received successfully.
              </p>
              <button
                type="button"
                className={styles.fillAgainBtn}
                onClick={handleFillAgain}
                data-testid="fill-again-btn"
              >
                Fill Again
              </button>
            </div>
          ) : (
            /* ── The form ─────────────────────────────────────────────── */
            <form
              id="registrationForm"
              data-testid="registration-form"
              data-section="form"
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
            >
              {/* ── Personal Details ─────────────────────────────────── */}
              <fieldset className={styles.fieldset} data-testid="section-personal">
                <legend className={styles.legend}>Personal Details</legend>

                {/* First name — Beginner: label + id + data-testid */}
                <div className={styles.fieldRow}>
                  <label htmlFor="firstName" className={styles.label}>
                    First Name <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    data-testid="input-first-name"
                    className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
                    value={values.firstName}
                    onChange={(e) => handleText("firstName", e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.firstName ? "firstNameError" : undefined}
                    autoComplete="given-name"
                  />
                  {errors.firstName && (
                    <span
                      id="firstNameError"
                      data-testid="error-first-name"
                      className={styles.errorMsg}
                      role="alert"
                    >
                      {errors.firstName}
                    </span>
                  )}
                </div>

                {/* Last name — Beginner */}
                <div className={styles.fieldRow}>
                  <label htmlFor="lastName" className={styles.label}>
                    Last Name <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    data-testid="input-last-name"
                    className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
                    value={values.lastName}
                    onChange={(e) => handleText("lastName", e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.lastName ? "lastNameError" : undefined}
                    autoComplete="family-name"
                  />
                  {errors.lastName && (
                    <span
                      id="lastNameError"
                      data-testid="error-last-name"
                      className={styles.errorMsg}
                      role="alert"
                    >
                      {errors.lastName}
                    </span>
                  )}
                </div>

                {/* Email — Beginner + format validation */}
                <div className={styles.fieldRow}>
                  <label htmlFor="email" className={styles.label}>
                    Email <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    data-testid="input-email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                    value={values.email}
                    onChange={(e) => handleText("email", e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.email ? "emailError" : undefined}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span
                      id="emailError"
                      data-testid="error-email"
                      className={styles.errorMsg}
                      role="alert"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Phone — Beginner + digit validation */}
                <div className={styles.fieldRow}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    data-testid="input-phone"
                    className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                    value={values.phone}
                    onChange={(e) => handleText("phone", e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.phone ? "phoneError" : undefined}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <span
                      id="phoneError"
                      data-testid="error-phone"
                      className={styles.errorMsg}
                      role="alert"
                    >
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Date of Birth — Beginner */}
                <div className={styles.fieldRow}>
                  <label htmlFor="dob" className={styles.label}>
                    Date of Birth <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    data-testid="input-dob"
                    className={`${styles.input} ${errors.dob ? styles.inputError : ""}`}
                    value={values.dob}
                    onChange={(e) => handleText("dob", e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.dob ? "dobError" : undefined}
                  />
                  {errors.dob && (
                    <span
                      id="dobError"
                      data-testid="error-dob"
                      className={styles.errorMsg}
                      role="alert"
                    >
                      {errors.dob}
                    </span>
                  )}
                </div>

                {/* Gender — Medium: radio group, scope to section */}
                <div className={styles.fieldRow}>
                  <span className={styles.label} id="gender-group-label">
                    Gender <span className={styles.required} aria-hidden="true">*</span>
                  </span>
                  <div
                    className={styles.radioGroup}
                    role="radiogroup"
                    aria-labelledby="gender-group-label"
                    data-testid="radio-group-gender"
                    aria-describedby={errors.gender ? "genderError" : undefined}
                  >
                    {(
                      [
                        { id: "gender-male", testId: "radio-gender-male", value: "male", label: "Male" },
                        { id: "gender-female", testId: "radio-gender-female", value: "female", label: "Female" },
                        { id: "gender-other", testId: "radio-gender-other", value: "other", label: "Other" },
                      ] as const
                    ).map((opt) => (
                      <label key={opt.value} htmlFor={opt.id} className={styles.radioLabel}>
                        <input
                          id={opt.id}
                          name="gender"
                          type="radio"
                          value={opt.value}
                          data-testid={opt.testId}
                          data-gender={opt.value}
                          className={styles.radioInput}
                          checked={values.gender === opt.value}
                          onChange={() =>
                            setValues((prev) => ({ ...prev, gender: opt.value }))
                          }
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                  {errors.gender && (
                    <span
                      id="genderError"
                      data-testid="error-gender"
                      className={styles.errorMsg}
                      role="alert"
                    >
                      {errors.gender}
                    </span>
                  )}
                </div>
              </fieldset>

              {/* ── Address ──────────────────────────────────────────── */}
              <fieldset className={styles.fieldset} data-testid="section-address">
                <legend className={styles.legend}>Address</legend>

                {/* Country — Medium: native select, scoped by label */}
                <div className={styles.fieldRow}>
                  <label htmlFor="country" className={styles.label}>
                    Country <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    data-testid="select-country"
                    className={`${styles.input} ${styles.select} ${errors.country ? styles.inputError : ""}`}
                    value={values.country}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, country: e.target.value }));
                      if (errors.country) setErrors((prev) => ({ ...prev, country: "" }));
                    }}
                    aria-required="true"
                    aria-describedby={errors.country ? "countryError" : undefined}
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <span
                      id="countryError"
                      data-testid="error-country"
                      className={styles.errorMsg}
                      role="alert"
                    >
                      {errors.country}
                    </span>
                  )}
                </div>

                {/* City — Beginner */}
                <div className={styles.fieldRow}>
                  <label htmlFor="city" className={styles.label}>
                    City <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Enter city"
                    data-testid="input-city"
                    className={`${styles.input} ${errors.city ? styles.inputError : ""}`}
                    value={values.city}
                    onChange={(e) => handleText("city", e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.city ? "cityError" : undefined}
                    autoComplete="address-level2"
                  />
                  {errors.city && (
                    <span
                      id="cityError"
                      data-testid="error-city"
                      className={styles.errorMsg}
                      role="alert"
                    >
                      {errors.city}
                    </span>
                  )}
                </div>

                {/* About You — Hard: label + id, NO data-testid — use getByLabel or #bio */}
                <div className={styles.fieldRow}>
                  <label htmlFor="bio" className={styles.label}>
                    About You
                    <span className={styles.optionalBadge}>optional</span>
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    placeholder="Tell us a little about yourself…"
                    className={`${styles.input} ${styles.textarea}`}
                    value={values.bio}
                    onChange={(e) => handleText("bio", e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </fieldset>

              {/* ── Interests — Medium: repeated checkboxes, unique ids ─ */}
              <fieldset className={styles.fieldset} data-testid="section-interests">
                <legend className={styles.legend}>Interests</legend>
                <div
                  className={styles.checkboxGroup}
                  data-testid="checkbox-group-interests"
                >
                  {INTERESTS.map((item) => (
                    <label key={item.value} htmlFor={item.id} className={styles.checkboxLabel}>
                      <input
                        id={item.id}
                        name="interests"
                        type="checkbox"
                        value={item.value}
                        data-testid={item.testId}
                        data-interest={item.value}
                        className={styles.checkboxInput}
                        checked={values.interests.includes(item.value)}
                        onChange={(e) => handleInterest(item.value, e.target.checked)}
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* ── Account Details ───────────────────────────────────── */}
              <fieldset className={styles.fieldset} data-testid="section-account">
                <legend className={styles.legend}>Account Details</legend>

                {/* Password — Beginner */}
                <div className={styles.fieldRow}>
                  <label htmlFor="password" className={styles.label}>
                    Password <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Min. 6 characters"
                    data-testid="input-password"
                    className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                    value={values.password}
                    onChange={(e) => handleText("password", e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.password ? "passwordError" : undefined}
                    autoComplete="new-password"
                  />
                  {errors.password && (
                    <span
                      id="passwordError"
                      data-testid="error-password"
                      className={styles.errorMsg}
                      role="alert"
                    >
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* Confirm Password — Beginner + mismatch challenge */}
                <div className={styles.fieldRow}>
                  <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm Password <span className={styles.required} aria-hidden="true">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    data-testid="input-confirm-password"
                    className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
                    value={values.confirmPassword}
                    onChange={(e) => handleText("confirmPassword", e.target.value)}
                    aria-required="true"
                    aria-describedby={errors.confirmPassword ? "confirmPasswordError" : undefined}
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && (
                    <span
                      id="confirmPasswordError"
                      data-testid="error-confirm-password"
                      className={styles.errorMsg}
                      role="alert"
                    >
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* Terms — Challenge: error uses text, no data-testid on error span */}
                <div className={styles.fieldRow}>
                  <label
                    htmlFor="terms"
                    className={`${styles.checkboxLabel} ${styles.termsLabel}`}
                  >
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      data-testid="checkbox-terms"
                      className={styles.checkboxInput}
                      checked={values.terms}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, terms: e.target.checked }));
                        if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }));
                      }}
                    />
                    I agree to the Terms &amp; Conditions
                  </label>
                  {errors.terms && (
                    <span
                      id="termsError"
                      className={styles.errorMsg}
                      role="alert"
                    >
                      {errors.terms}
                    </span>
                  )}
                </div>
              </fieldset>

              {/* ── Form actions ────────────────────────────────────── */}
              <div className={styles.formActions} data-testid="form-actions">
                <button
                  id="submitFormBtn"
                  type="submit"
                  data-testid="submit-form-btn"
                  data-cta="submit"
                  className={styles.submitBtn}
                >
                  Submit
                </button>
                <button
                  id="resetFormBtn"
                  type="button"
                  data-testid="reset-form-btn"
                  data-cta="reset"
                  className={styles.resetBtn}
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        </section>

        {/* ── Right: sticky sidebar ────────────────────────────────────── */}
        <aside
          className="flex flex-col gap-4 self-start lg:sticky lg:top-[120px]"
          data-testid="practice-sidebar"
        >
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>
    </div>
  );
}
