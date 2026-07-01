import React from "react";

const DropDownPractice = () => {
  return (
    <div>
      <h1>DropDown Practice</h1>
       <div className="container">
    <h1>Dropdowns Practice</h1>
    <p className="intro">
      Native and non-native dropdowns for practicing Playwright locators &amp; interactions.
      Each section notes the locator strategy to try. Selections are echoed into an output box for assertions.
    </p>

    {/* <!-- 1. NATIVE SINGLE SELECT --> */}
    <section className="section" id="sec-native-single">
      <h2>1. Native single-select <span className="badge badge-green">Beginner</span></h2>
      <p className="hint">Standard &lt;select&gt;. Use <code>selectOption()</code> by value / label / index. Locate by id, name, label, or role "combobox".</p>
      <div className="row">
        <div className="field">
          <label >Country (by id / label)</label>
          <select id="country" name="country" data-testid="country-select" aria-label="Country">
            <option value="">-- Select country --</option>
            <option value="in">India</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="de">Germany</option>
            <option value="jp">Japan</option>
          </select>
        </div>
        <div className="field">
          <label  >Currency (has preselected + disabled)</label>
          <select id="currency" name="currency" data-testid="currency-select">
            <option value="usd">USD - US Dollar</option>
            <option value="inr" selected>INR - Indian Rupee</option>
            <option value="eur">EUR - Euro</option>
            <option value="btc" disabled>BTC - Bitcoin (unavailable)</option>
          </select>
        </div>
      </div>
      <div className="output-box" data-testid="native-single-output" id="native-single-output">No selection yet</div>
    </section>

    {/* <!-- 2. NATIVE MULTI SELECT --> */}
    <section className="section" id="sec-native-multi">
      <h2>2. Native multi-select <span className="badge badge-blue">Intermediate</span></h2>
      <p className="hint">&lt;select multiple&gt;. Pass an array to <code>selectOption([...])</code>. Practice selecting/clearing many, reading all selected options.</p>
      <div className="field" style="max-width: 340px;">
        <label for="skills">Skills (Ctrl/Cmd + click for many)</label>
        <select id="skills" name="skills" multiple data-testid="skills-select">
          <option value="js">JavaScript</option>
          <option value="ts">TypeScript</option>
          <option value="py">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="go">Go</option>
        </select>
      </div>
      <button type="button" data-testid="read-skills-btn" id="read-skills-btn">Show selected skills</button>
      <div className="output-box" data-testid="native-multi-output" id="native-multi-output">Nothing selected</div>
    </section>

    {/* <!-- 3. OPTGROUP / GROUPED SELECT --> */}
    <section className="section" id="sec-optgroup">
      <h2>3. Grouped select (optgroup) <span className="badge badge-blue">Intermediate</span></h2>
      <p className="hint">Options nested inside &lt;optgroup&gt;. Practice locating an option under a specific group label, and scoping with <code>locator('optgroup[label="..."] > option')</code>.</p>
      <div className="field">
        <label for="car">Car model</label>
        <select id="car" name="car" data-testid="car-select" aria-label="Car model">
          <option value="">-- Choose a model --</option>
          <optgroup label="Toyota">
            <option value="corolla">Corolla</option>
            <option value="camry">Camry</option>
          </optgroup>
          <optgroup label="Tesla">
            <option value="model3">Model 3</option>
            <option value="modely">Model Y</option>
          </optgroup>
          <optgroup label="BMW" disabled>
            <option value="x5">X5</option>
          </optgroup>
        </select>
      </div>
      <div className="output-box" data-testid="optgroup-output" id="optgroup-output">No car selected</div>
    </section>

    {/* <!-- 4. CUSTOM / HIDDEN NON-NATIVE DROPDOWN --> */}
    <section className="section" id="sec-custom">
      <h2>4. Custom dropdown (non-native / hidden) <span className="badge badge-orange">Advanced</span></h2>
      <p className="hint">
        No &lt;select&gt;. A div-based widget (like OrangeHRM / React-Select). Options are hidden in the DOM until you click the trigger.
        <code>selectOption()</code> will NOT work — click trigger, then click the option. Practice waiting for the panel to appear.
      </p>
      <div className="custom-select" data-testid="status-dropdown" id="status-dropdown">
        <div className="custom-select__trigger" role="combobox" aria-expanded="false"
             aria-haspopup="listbox" tabindex="0" data-testid="status-trigger" id="status-trigger">
          <span className="custom-select__value" id="status-value">Select status</span>
        </div>
        <div className="custom-select__panel" role="listbox" hidden id="status-panel" data-testid="status-panel">
          <div className="custom-option" role="option" data-value="active">Active</div>
          <div className="custom-option" role="option" data-value="onleave">On Leave</div>
          <div className="custom-option" role="option" data-value="terminated">Terminated</div>
          <div className="custom-option" role="option" data-value="probation" aria-disabled="true">Probation (disabled)</div>
        </div>
      </div>
      <div className="output-box" data-testid="custom-output" id="custom-output">No status selected</div>
    </section>

    {/* <!-- 5. AUTOCOMPLETE / AUTO-SUGGEST --> */}
    <section className="section" id="sec-autocomplete">
      <h2>5. Autocomplete / auto-suggest <span className="badge badge-orange">Advanced</span></h2>
      <p className="hint">
        Type to filter a dynamically-rendered suggestion list. Suggestions appear only after typing.
        Practice: type → wait for list → click matching option. Handle "no results" and keyboard navigation.
      </p>
      <div className="autocomplete" data-testid="city-autocomplete">
        <input type="search" id="city-input" data-testid="city-input"
               placeholder="Search a city..." autocomplete="off" aria-label="Search a city" />
        <ul className="suggestions" id="city-suggestions" role="listbox" data-testid="city-suggestions"></ul>
      </div>
      <div className="output-box" data-testid="autocomplete-output" id="autocomplete-output">No city chosen</div>
    </section>

    {/* <!-- 6. DEPENDENT / CASCADING DROPDOWNS --> */}
    <section className="section" id="sec-dependent">
      <h2>6. Dependent / cascading dropdowns <span className="badge badge-red">Advanced</span></h2>
      <p className="hint">
        Second dropdown's options are generated dynamically from the first (and disabled until the first is chosen).
        Practice: assert options change, assert disabled state, chained selection.
      </p>
      <div className="row">
        <div className="field">
          <label for="dep-country">Country</label>
          <select id="dep-country" name="dep-country" data-testid="dep-country">
            <option value="">-- Select country --</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
          </select>
        </div>
        <div className="field">
          <label for="dep-state">State</label>
          <select id="dep-state" name="dep-state" data-testid="dep-state" disabled>
            <option value="">-- Select country first --</option>
          </select>
        </div>
      </div>
      <div className="output-box" data-testid="dependent-output" id="dependent-output">No location selected</div>
    </section>
  </div>

  {/* <script>
    // ---- 1. Native single ----
    const nativeOut = document.getElementById('native-single-output');
    function reportSingle() {
      const c = document.getElementById('country');
      const cur = document.getElementById('currency');
      const cText = c.options[c.selectedIndex].text;
      const curText = cur.options[cur.selectedIndex].text;
      nativeOut.textContent = `Country: ${c.value || 'none'} (${cText}) | Currency: ${cur.value} (${curText})`;
    }
    document.getElementById('country').addEventListener('change', reportSingle);
    document.getElementById('currency').addEventListener('change', reportSingle);

    // ---- 2. Native multi ----
    document.getElementById('read-skills-btn').addEventListener('click', () => {
      const sel = document.getElementById('skills');
      const chosen = Array.from(sel.selectedOptions).map(o => o.text);
      document.getElementById('native-multi-output').textContent =
        chosen.length ? `Selected (${chosen.length}): ${chosen.join(', ')}` : 'Nothing selected';
    });

    // ---- 3. Optgroup ----
    document.getElementById('car').addEventListener('change', (e) => {
      const s = e.target;
      const group = s.options[s.selectedIndex].parentElement.label || 'None';
      document.getElementById('optgroup-output').textContent =
        s.value ? `Model: ${s.value} (Group: ${group})` : 'No car selected';
    });

    // ---- 4. Custom dropdown ----
    const trigger = document.getElementById('status-trigger');
    const panel = document.getElementById('status-panel');
    const statusValue = document.getElementById('status-value');
    function closePanel() { panel.hidden = true; trigger.setAttribute('aria-expanded', 'false'); }
    trigger.addEventListener('click', () => {
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      trigger.setAttribute('aria-expanded', String(willOpen));
    });
    panel.querySelectorAll('.custom-option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (opt.getAttribute('aria-disabled') === 'true') return;
        statusValue.textContent = opt.textContent;
        document.getElementById('custom-output').textContent =
          `Status: ${opt.dataset.value} (${opt.textContent})`;
        closePanel();
      });
    });
    document.addEventListener('click', (e) => {
      if (!document.getElementById('status-dropdown').contains(e.target)) closePanel();
    });

    // ---- 5. Autocomplete ----
    const CITIES = ['Pune', 'Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad',
      'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'London', 'New York', 'San Francisco'];
    const cityInput = document.getElementById('city-input');
    const cityList = document.getElementById('city-suggestions');
    function renderSuggestions(q) {
      cityList.innerHTML = '';
      if (!q) return;
      const matches = CITIES.filter(c => c.toLowerCase().includes(q.toLowerCase()));
      if (matches.length === 0) {
        const li = document.createElement('li');
        li.className = 'no-result';
        li.textContent = 'No cities found';
        cityList.appendChild(li);
        return;
      }
      matches.forEach(city => {
        const li = document.createElement('li');
        li.setAttribute('role', 'option');
        li.textContent = city;
        li.addEventListener('click', () => {
          cityInput.value = city;
          cityList.innerHTML = '';
          document.getElementById('autocomplete-output').textContent = `City: ${city}`;
        });
        cityList.appendChild(li);
      });
    }
    cityInput.addEventListener('input', (e) => {
      // simulate async render latency so learners practice auto-waiting
      setTimeout(() => renderSuggestions(e.target.value.trim()), 250);
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.autocomplete')) cityList.innerHTML = '';
    });

    // ---- 6. Dependent ----
    const STATES = {
      india: ['Maharashtra', 'Karnataka', 'Gujarat', 'Rajasthan'],
      usa: ['California', 'Texas', 'New York', 'Florida'],
    };
    const depCountry = document.getElementById('dep-country');
    const depState = document.getElementById('dep-state');
    const depOut = document.getElementById('dependent-output');
    depCountry.addEventListener('change', () => {
      const list = STATES[depCountry.value];
      depState.innerHTML = '';
      if (!list) {
        depState.disabled = true;
        depState.innerHTML = '<option value="">-- Select country first --</option>';
        depOut.textContent = 'No location selected';
        return;
      }
      depState.disabled = false;
      depState.innerHTML = '<option value="">-- Select state --</option>' +
        list.map(s => `<option value="${s.toLowerCase()}">${s}</option>`).join('');
      depOut.textContent = `Country: ${depCountry.value} | State: (pending)`;
    });
    depState.addEventListener('change', () => {
      depOut.textContent = depState.value
        ? `Country: ${depCountry.value} | State: ${depState.value}`
        : `Country: ${depCountry.value} | State: (pending)`;
    });
  </script> */}
    </div>
  );
};

export default DropDownPractice;
