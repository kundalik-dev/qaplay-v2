"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import styles from "./dropdown-practice.module.css";

/* ── Static option data ───────────────────────────────────────────────────── */

const COUNTRIES = [
  { value: "in", label: "India" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
];

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const CURRENCIES: SelectOption[] = [
  { value: "usd", label: "USD - US Dollar" },
  { value: "inr", label: "INR - Indian Rupee" },
  { value: "eur", label: "EUR - Euro" },
  { value: "btc", label: "BTC - Bitcoin (unavailable)", disabled: true },
];

const SKILLS: SelectOption[] = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "py", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
];

interface CarGroup {
  label: string;
  disabled?: boolean;
  options: SelectOption[];
}

const CAR_GROUPS: CarGroup[] = [
  {
    label: "Toyota",
    options: [
      { value: "corolla", label: "Corolla" },
      { value: "camry", label: "Camry" },
    ],
  },
  {
    label: "Tesla",
    options: [
      { value: "model3", label: "Model 3" },
      { value: "modely", label: "Model Y" },
    ],
  },
  {
    label: "BMW",
    disabled: true,
    options: [{ value: "x5", label: "X5" }],
  },
];

const STATUS_OPTIONS: SelectOption[] = [
  { value: "active", label: "Active" },
  { value: "onleave", label: "On Leave" },
  { value: "terminated", label: "Terminated" },
  { value: "probation", label: "Probation (disabled)", disabled: true },
];

const CITIES = [
  "Pune",
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "London",
  "New York",
  "San Francisco",
];

const STATES: Record<string, string[]> = {
  india: ["Maharashtra", "Karnataka", "Gujarat", "Rajasthan"],
  usa: ["California", "Texas", "New York", "Florida"],
};

function labelFor(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? "";
}

const DropDownPractice = () => {
  /* ── 1. Native single select ──────────────────────────────────────────── */
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("inr");
  const nativeSingleOutput = `Country: ${country || "none"} (${labelFor(COUNTRIES, country) || "--"}) | Currency: ${currency} (${labelFor(CURRENCIES, currency)})`;

  /* ── 2. Native multi select ───────────────────────────────────────────── */
  const skillsRef = useRef<HTMLSelectElement>(null);
  const [multiOutput, setMultiOutput] = useState("Nothing selected");

  function readSkills() {
    const select = skillsRef.current;
    if (!select) return;
    const chosen = Array.from(select.selectedOptions).map((o) => o.text);
    setMultiOutput(
      chosen.length
        ? `Selected (${chosen.length}): ${chosen.join(", ")}`
        : "Nothing selected",
    );
  }

  /* ── 3. Optgroup / grouped select ─────────────────────────────────────── */
  const [car, setCar] = useState("");
  const carGroup = CAR_GROUPS.find((g) =>
    g.options.some((o) => o.value === car),
  )?.label;
  const optgroupOutput = car
    ? `Model: ${car} (Group: ${carGroup ?? "None"})`
    : "No car selected";

  /* ── 4. Custom / hidden non-native dropdown ───────────────────────────── */
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState<string | null>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(e.target as Node)
      ) {
        setStatusOpen(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  function selectStatus(opt: (typeof STATUS_OPTIONS)[number]) {
    if (opt.disabled) return;
    setStatusValue(opt.value);
    setStatusOpen(false);
  }

  const selectedStatus = STATUS_OPTIONS.find((o) => o.value === statusValue);
  const customOutput = selectedStatus
    ? `Status: ${selectedStatus.value} (${selectedStatus.label})`
    : "No status selected";

  /* ── 5. Autocomplete / auto-suggest ───────────────────────────────────── */
  const [cityQuery, setCityQuery] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showNoResult, setShowNoResult] = useState(false);
  const [chosenCity, setChosenCity] = useState<string | null>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = cityQuery.trim();
    // simulate async render latency so learners practice auto-waiting
    const timer = setTimeout(() => {
      if (!query) {
        setCitySuggestions([]);
        setShowNoResult(false);
        return;
      }
      const matches = CITIES.filter((c) =>
        c.toLowerCase().includes(query.toLowerCase()),
      );
      setCitySuggestions(matches);
      setShowNoResult(matches.length === 0);
    }, 250);
    return () => clearTimeout(timer);
  }, [cityQuery]);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(e.target as Node)
      ) {
        setCitySuggestions([]);
        setShowNoResult(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  function chooseCity(city: string) {
    setCityQuery(city);
    setChosenCity(city);
    setCitySuggestions([]);
    setShowNoResult(false);
  }

  /* ── 6. Dependent / cascading dropdowns ───────────────────────────────── */
  const [depCountry, setDepCountry] = useState("");
  const [depState, setDepState] = useState("");
  const depStates = STATES[depCountry];
  const dependentOutput = !depCountry
    ? "No location selected"
    : depState
      ? `Country: ${depCountry} | State: ${depState}`
      : `Country: ${depCountry} | State: (pending)`;

  return (
    <div className={styles.container} data-testid="dropdown-practice-page">
      <h1 className={styles.sectionTitle}>Dropdowns Practice</h1>
      <p className={styles.intro}>
        Native and non-native dropdowns for practicing Playwright locators &amp;
        interactions. Each section notes the locator strategy to try. Selections
        are echoed into an output box for assertions.
      </p>

      {/* 1. NATIVE SINGLE SELECT */}
      <section
        className={styles.section}
        id="sec-native-single"
        data-testid="sec-native-single"
      >
        <h2 className={styles.sectionTitle}>
          1. Native single-select{" "}
          <span className={cn(styles.badge, styles.badgeGreen)}>Beginner</span>
        </h2>
        <p className={styles.hint}>
          Standard &lt;select&gt;. Use <code>selectOption()</code> by value /
          label / index. Locate by id, name, label, or role
          &quot;combobox&quot;.
        </p>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="country">Country (by id / label)</label>
            <select
              id="country"
              name="country"
              data-testid="country-select"
              aria-label="Country"
              className="form-input"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">-- Select country --</option>
              {COUNTRIES.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="currency">
              Currency (has preselected + disabled)
            </label>
            <select
              id="currency"
              name="currency"
              data-testid="currency-select"
              className="form-input"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {CURRENCIES.map((o) => (
                <option key={o.value} value={o.value} disabled={o.disabled}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          className="output-box"
          data-testid="native-single-output"
          id="native-single-output"
        >
          {nativeSingleOutput}
        </div>
      </section>

      {/* 2. NATIVE MULTI SELECT */}
      <section
        className={styles.section}
        id="sec-native-multi"
        data-testid="sec-native-multi"
      >
        <h2 className={styles.sectionTitle}>
          2. Native multi-select{" "}
          <span className={cn(styles.badge, styles.badgeBlue)}>
            Intermediate
          </span>
        </h2>
        <p className={styles.hint}>
          &lt;select multiple&gt;. Pass an array to{" "}
          <code>selectOption([...])</code>. Practice selecting/clearing many,
          reading all selected options.
        </p>
        <div className={styles.field} style={{ maxWidth: 340 }}>
          <label htmlFor="skills">Skills (Ctrl/Cmd + click for many)</label>
          <select
            id="skills"
            name="skills"
            multiple
            data-testid="skills-select"
            className="form-input"
            ref={skillsRef}
          >
            {SKILLS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          data-testid="read-skills-btn"
          id="read-skills-btn"
          className="btn btn-primary"
          onClick={readSkills}
        >
          Show selected skills
        </button>
        <div
          className="output-box"
          data-testid="native-multi-output"
          id="native-multi-output"
        >
          {multiOutput}
        </div>
      </section>

      {/* 3. OPTGROUP / GROUPED SELECT */}
      <section
        className={styles.section}
        id="sec-optgroup"
        data-testid="sec-optgroup"
      >
        <h2 className={styles.sectionTitle}>
          3. Grouped select (optgroup){" "}
          <span className={cn(styles.badge, styles.badgeBlue)}>
            Intermediate
          </span>
        </h2>
        <p className={styles.hint}>
          Options nested inside &lt;optgroup&gt;. Practice locating an option
          under a specific group label, and scoping with{" "}
          <code>
            locator(&apos;optgroup[label=&quot;...&quot;] &gt; option&apos;)
          </code>
          .
        </p>
        <div className={styles.field}>
          <label htmlFor="car">Car model</label>
          <select
            id="car"
            name="car"
            data-testid="car-select"
            aria-label="Car model"
            className="form-input"
            value={car}
            onChange={(e) => setCar(e.target.value)}
          >
            <option value="">-- Choose a model --</option>
            {CAR_GROUPS.map((group) => (
              <optgroup
                label={group.label}
                key={group.label}
                disabled={group.disabled}
              >
                {group.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div
          className="output-box"
          data-testid="optgroup-output"
          id="optgroup-output"
        >
          {optgroupOutput}
        </div>
      </section>

      {/* 4. CUSTOM / HIDDEN NON-NATIVE DROPDOWN */}
      <section
        className={styles.section}
        id="sec-custom"
        data-testid="sec-custom"
      >
        <h2 className={styles.sectionTitle}>
          4. Custom dropdown (non-native / hidden){" "}
          <span className={cn(styles.badge, styles.badgeOrange)}>Advanced</span>
        </h2>
        <p className={styles.hint}>
          No &lt;select&gt;. A div-based widget (like OrangeHRM / React-Select).
          Options are hidden in the DOM until you click the trigger.{" "}
          <code>selectOption()</code> will NOT work — click trigger, then click
          the option. Practice waiting for the panel to appear.
        </p>
        <div
          className={styles.customSelect}
          data-testid="status-dropdown"
          id="status-dropdown"
          ref={statusDropdownRef}
        >
          <div
            className={styles.customTrigger}
            role="combobox"
            aria-expanded={statusOpen}
            aria-haspopup="listbox"
            tabIndex={0}
            data-testid="status-trigger"
            id="status-trigger"
            onClick={() => setStatusOpen((v) => !v)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setStatusOpen((v) => !v);
              }
            }}
          >
            <span id="status-value">
              {selectedStatus?.label ?? "Select status"}
            </span>
          </div>
          <div
            className={styles.customPanel}
            role="listbox"
            hidden={!statusOpen}
            id="status-panel"
            data-testid="status-panel"
          >
            {STATUS_OPTIONS.map((opt) => (
              <div
                key={opt.value}
                className={cn(
                  styles.customOption,
                  opt.disabled && styles.customOptionDisabled,
                )}
                role="option"
                aria-selected={opt.value === statusValue}
                aria-disabled={opt.disabled}
                data-value={opt.value}
                onClick={() => selectStatus(opt)}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
        <div
          className="output-box"
          data-testid="custom-output"
          id="custom-output"
        >
          {customOutput}
        </div>
      </section>

      {/* 5. AUTOCOMPLETE / AUTO-SUGGEST */}
      <section
        className={styles.section}
        id="sec-autocomplete"
        data-testid="sec-autocomplete"
      >
        <h2 className={styles.sectionTitle}>
          5. Autocomplete / auto-suggest{" "}
          <span className={cn(styles.badge, styles.badgeOrange)}>Advanced</span>
        </h2>
        <p className={styles.hint}>
          Type to filter a dynamically-rendered suggestion list. Suggestions
          appear only after typing. Practice: type → wait for list → click
          matching option. Handle &quot;no results&quot; and keyboard
          navigation.
        </p>
        <div
          className={styles.autocomplete}
          data-testid="city-autocomplete"
          ref={autocompleteRef}
        >
          <input
            type="search"
            id="city-input"
            data-testid="city-input"
            className="form-input"
            placeholder="Search a city..."
            autoComplete="off"
            aria-label="Search a city"
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
          />
          <ul
            className={styles.suggestions}
            id="city-suggestions"
            role="listbox"
            data-testid="city-suggestions"
          >
            {showNoResult && (
              <li className={styles.noResult}>No cities found</li>
            )}
            {citySuggestions.map((city) => (
              <li key={city} role="option" onClick={() => chooseCity(city)}>
                {city}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="output-box"
          data-testid="autocomplete-output"
          id="autocomplete-output"
        >
          {chosenCity ? `City: ${chosenCity}` : "No city chosen"}
        </div>
      </section>

      {/* 6. DEPENDENT / CASCADING DROPDOWNS */}
      <section
        className={styles.section}
        id="sec-dependent"
        data-testid="sec-dependent"
      >
        <h2 className={styles.sectionTitle}>
          6. Dependent / cascading dropdowns{" "}
          <span className={cn(styles.badge, styles.badgeRed)}>Advanced</span>
        </h2>
        <p className={styles.hint}>
          Second dropdown&apos;s options are generated dynamically from the
          first (and disabled until the first is chosen). Practice: assert
          options change, assert disabled state, chained selection.
        </p>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="dep-country">Country</label>
            <select
              id="dep-country"
              name="dep-country"
              data-testid="dep-country"
              className="form-input"
              value={depCountry}
              onChange={(e) => {
                setDepCountry(e.target.value);
                setDepState("");
              }}
            >
              <option value="">-- Select country --</option>
              <option value="india">India</option>
              <option value="usa">USA</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="dep-state">State</label>
            <select
              id="dep-state"
              name="dep-state"
              data-testid="dep-state"
              className="form-input"
              disabled={!depStates}
              value={depState}
              onChange={(e) => setDepState(e.target.value)}
            >
              {depStates ? (
                <>
                  <option value="">-- Select state --</option>
                  {depStates.map((s) => (
                    <option key={s} value={s.toLowerCase()}>
                      {s}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">-- Select country first --</option>
              )}
            </select>
          </div>
        </div>
        <div
          className="output-box"
          data-testid="dependent-output"
          id="dependent-output"
        >
          {dependentOutput}
        </div>
      </section>
    </div>
  );
};

export default DropDownPractice;
