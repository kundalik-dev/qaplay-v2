"use client";

import { useMemo, useState } from "react";
import {
  FrameworkMethodsPanel,
  ProgressWidget,
  ScenarioCard,
  UpNextCard,
  type ProgressItem,
} from "@/components/practice";
import {
  dropdownScenarios,
  frameworkMethods,
} from "@/data/practice-data/dropdowns/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./dropdowns.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

const fruits = [
  { value: "", label: "Select Fruit" },
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

const countries = [
  { value: "", label: "Select Country" },
  { value: "argentina", label: "Argentina" },
  { value: "india", label: "India" },
  { value: "japan", label: "Japan" },
  { value: "united-states", label: "United States" },
];

const languages = [
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
];

const heroes = [
  { value: "ant-man", label: "Ant-Man" },
  { value: "aquaman", label: "Aquaman" },
  { value: "the-avengers", label: "The Avengers" },
  { value: "batman", label: "Batman" },
];

const priorityOptions = [
  { id: "priority-low", value: "low", label: "Low Priority" },
  { id: "priority-medium", value: "medium", label: "Medium Priority" },
  { id: "priority-high", value: "high", label: "High Priority" },
];

const cityOptions = [
  { id: "city-pune", value: "pune", label: "Pune", region: "MH" },
  { id: "city-mumbai", value: "mumbai", label: "Mumbai", region: "MH" },
  { id: "city-bengaluru", value: "bengaluru", label: "Bengaluru", region: "KA" },
  { id: "city-delhi", value: "delhi", label: "Delhi", region: "DL" },
  { id: "city-hyderabad", value: "hyderabad", label: "Hyderabad", region: "TS" },
];

function optionLabel(
  options: Array<{ value: string; label: string }>,
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? "";
}

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [fruit, setFruit] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState(languages[0].value);
  const [heroValues, setHeroValues] = useState<string[]>([]);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priority, setPriority] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = dropdownScenarios.map((s) => ({
    id: s.id.toLowerCase(),
    label: s.title,
    done: completedIds.has(s.id.toLowerCase()),
  }));

  const filteredCities = useMemo(() => {
    const query = cityQuery.trim().toLowerCase();

    if (!query) {
      return cityOptions;
    }

    return cityOptions.filter((city) =>
      city.label.toLowerCase().includes(query),
    );
  }, [cityQuery]);

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

          <div
            className="flex flex-col gap-[10px]"
            data-testid="scenarios-list"
          >
            <ScenarioCard
              {...dropdownScenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult }) => (
                <>
                  <div className={styles.fieldStack}>
                    <label className={styles.fieldLabel} htmlFor="fruitSelect">
                      Select Fruit
                    </label>
                    <select
                      id="fruitSelect"
                      name="fruit"
                      data-testid="fruit-select"
                      className={styles.practiceSelect}
                      value={fruit}
                      onChange={(event) => {
                        const value = event.target.value;
                        setFruit(value);
                        setResult(
                          value
                            ? `Selected fruit: ${optionLabel(fruits, value)}`
                            : "No fruit selected",
                        );
                      }}
                    >
                      {fruits.map((item) => (
                        <option key={item.value || "placeholder"} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </ScenarioCard>

            <ScenarioCard
              {...dropdownScenarios[1]}
              onComplete={() => markDone("s02")}
            >
              {({ setResult }) => (
                <div className={styles.fieldStack}>
                  <label className={styles.fieldLabel} htmlFor="countrySelect">
                    Select Country
                  </label>
                  <select
                    id="countrySelect"
                    name="country"
                    data-testid="country-select"
                    data-locator-level="beginner"
                    className={styles.practiceSelect}
                    value={country}
                    onChange={(event) => {
                      const value = event.target.value;
                      setCountry(value);
                      setResult(
                        value
                          ? `Selected country: ${optionLabel(countries, value)} (${value})`
                          : "No country selected",
                      );
                    }}
                  >
                    {countries.map((item) => (
                      <option key={item.value || "placeholder"} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </ScenarioCard>

            <ScenarioCard
              {...dropdownScenarios[2]}
              onComplete={() => markDone("s03")}
            >
              {({ setResult }) => (
                <>
                  <div className={styles.fieldStack}>
                    <label className={styles.fieldLabel} htmlFor="languageSelect">
                      Select Language
                    </label>
                    <select
                      id="languageSelect"
                      name="language"
                      data-testid="language-select"
                      data-list-id="language-options-2026"
                      className={styles.practiceSelect}
                      value={language}
                      onChange={(event) => {
                        const value = event.target.value;
                        setLanguage(value);
                        setResult(
                          `Selected language: ${optionLabel(languages, value)}`,
                        );
                      }}
                    >
                      {languages.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    id="selectLastLanguageBtn"
                    className={styles.actionBtn}
                    aria-label="Select last programming language"
                    onClick={() => {
                      const last = languages[languages.length - 1];
                      setLanguage(last.value);
                      setResult(
                        `Selected ${last.label}; options: ${languages
                          .map((item) => item.label)
                          .join(", ")}`,
                      );
                    }}
                  >
                    Select Last
                  </button>
                </>
              )}
            </ScenarioCard>

            <ScenarioCard
              {...dropdownScenarios[3]}
              onComplete={() => markDone("s04")}
            >
              {({ setResult }) => (
                <div className={styles.fieldStack}>
                  <label className={styles.fieldLabel} htmlFor="heroSelect">
                    Select Superheroes
                  </label>
                  <select
                    id="heroSelect"
                    name="heroes"
                    data-testid="hero-select"
                    className={`${styles.practiceSelect} ${styles.multiSelect}`}
                    multiple
                    value={heroValues}
                    onChange={(event) => {
                      const selected = Array.from(
                        event.target.selectedOptions,
                        (option) => option.value,
                      );
                      setHeroValues(selected);
                      setResult(
                        selected.length
                          ? `Selected heroes: ${selected
                              .map((value) => optionLabel(heroes, value))
                              .join(", ")}`
                          : "No heroes selected",
                      );
                    }}
                  >
                    {heroes.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </ScenarioCard>

            <ScenarioCard
              {...dropdownScenarios[4]}
              onComplete={() => markDone("s05")}
            >
              {({ setResult }) => {
                const selectedPriority = priorityOptions.find(
                  (item) => item.value === priority,
                );

                return (
                  <div
                    className={styles.dropdownWrap}
                    data-testid="priority-dropdown"
                    data-dropdown-kind="custom-listbox"
                  >
                    <button
                      type="button"
                      id="priorityDropdownTrigger"
                      data-testid="priority-dropdown-trigger"
                      className={styles.dropdownTrigger}
                      aria-haspopup="listbox"
                      aria-expanded={priorityOpen}
                      aria-controls="priorityDropdownList"
                      onClick={() => setPriorityOpen((open) => !open)}
                    >
                      {selectedPriority?.label ?? "Choose priority"}
                    </button>

                    {priorityOpen ? (
                      <div
                        id="priorityDropdownList"
                        role="listbox"
                        data-testid="priority-dropdown-list"
                        className={styles.dropdownList}
                        aria-label="Priority options"
                      >
                        {priorityOptions.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            role="option"
                            data-priority-id={item.id}
                            data-priority-value={item.value}
                            aria-selected={priority === item.value}
                            className={`${styles.option} ${
                              priority === item.value ? styles.optionActive : ""
                            }`}
                            onClick={() => {
                              setPriority(item.value);
                              setPriorityOpen(false);
                              setResult(`Priority selected: ${item.label}`);
                            }}
                          >
                            <span>{item.label}</span>
                            <span className={styles.optionCode}>{item.id}</span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }}
            </ScenarioCard>

            <ScenarioCard
              {...dropdownScenarios[5]}
              onComplete={() => markDone("s06")}
            >
              {({ setResult }) => (
                <div
                  className={styles.comboboxShell}
                  data-testid="city-combobox"
                  data-widget-id="city-picker-2026"
                >
                  <label className={styles.nearbyLabel} htmlFor="citySearch">
                    City
                  </label>
                  <div className={styles.comboboxControl}>
                    <input
                      id="citySearch"
                      name="city_search_dynamic_2026"
                      role="combobox"
                      aria-expanded={cityOpen}
                      aria-controls="cityResults"
                      aria-autocomplete="list"
                      aria-label="City"
                      className={styles.comboInput}
                      placeholder="Search city"
                      value={cityQuery}
                      onFocus={() => setCityOpen(true)}
                      onChange={(event) => {
                        setCityQuery(event.target.value);
                        setCityOpen(true);
                      }}
                    />
                    <span className={styles.comboStatus}>
                      {selectedCity || "empty"}
                    </span>
                  </div>

                  {cityOpen ? (
                    <ul
                      id="cityResults"
                      role="listbox"
                      data-testid="city-results"
                      className={styles.cityList}
                      aria-label="City results"
                    >
                      {filteredCities.length ? (
                        filteredCities.map((city) => (
                          <li key={city.id} role="presentation">
                            <button
                              type="button"
                              role="option"
                              data-city-id={city.id}
                              data-city-value={city.value}
                              aria-selected={selectedCity === city.value}
                              className={`${styles.option} ${styles.cityOption}`}
                              onClick={() => {
                                setSelectedCity(city.value);
                                setCityQuery(city.label);
                                setCityOpen(false);
                                setResult(`City selected: ${city.label} (${city.id})`);
                              }}
                            >
                              <span>{city.label}</span>
                              <span className={styles.optionCode}>{city.region}</span>
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className={styles.emptyState}>No city matches found</li>
                      )}
                    </ul>
                  ) : null}
                </div>
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
