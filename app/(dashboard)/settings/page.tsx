"use client";

import { useState, useEffect } from "react";
import { Save, Palette, Key, Monitor, Moon, Sun, Type, User, Mail, Shield } from "lucide-react";
import pageStyles from "./settings.module.css";
import dashboardStyles from "../_components/dashboard.module.css";
import { cn } from "@/lib/utils";

const MODELS = [
  { id: "openai/gpt-4o-mini", name: "OpenAI GPT-4o Mini (Default)" },
  { id: "openai/gpt-4o", name: "OpenAI GPT-4o" },
  { id: "anthropic/claude-3.5-sonnet", name: "Anthropic Claude 3.5 Sonnet" },
  { id: "anthropic/claude-3-haiku", name: "Anthropic Claude 3 Haiku" },
  { id: "google/gemini-1.5-flash", name: "Google Gemini 1.5 Flash" },
  { id: "google/gemini-1.5-pro", name: "Google Gemini 1.5 Pro" }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "appearance" | "api">("profile");
  
  // API State
  const [key, setKey] = useState("");
  const [model, setModel] = useState("openai/gpt-4o-mini");
  const [customModel, setCustomModel] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [apiSaved, setApiSaved] = useState(false);

  // Appearance State
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [font, setFont] = useState<"inter" | "space-grotesk">("inter");

  // Profile State
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      // Load API settings
      const savedKey = localStorage.getItem("qap_openrouter_key") || "";
      const savedModel = localStorage.getItem("qap_openrouter_model") || "openai/gpt-4o-mini";
      
      setKey(savedKey);
      
      const isStandard = MODELS.some(m => m.id === savedModel);
      if (isStandard) {
        setModel(savedModel);
        setIsCustom(false);
      } else {
        setModel("custom");
        setCustomModel(savedModel);
        setIsCustom(true);
      }

      // Load Appearance settings
      const savedTheme = localStorage.getItem("qap-theme") as "light" | "dark" | null;
      setTheme(savedTheme || "system");

      const savedFont = localStorage.getItem("qap-font") as "inter" | "space-grotesk" | null;
      setFont(savedFont || "inter");
    });
  }, []);

  const handleSaveApi = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("qap_openrouter_key", key);
    
    const finalModel = isCustom ? customModel : model;
    localStorage.setItem("qap_openrouter_model", finalModel);
    
    setApiSaved(true);
    setTimeout(() => setApiSaved(false), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    if (newTheme === "system") {
      localStorage.removeItem("qap-theme");
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isSystemDark);
    } else {
      localStorage.setItem("qap-theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  const handleFontChange = (newFont: "inter" | "space-grotesk") => {
    setFont(newFont);
    localStorage.setItem("qap-font", newFont);
    document.documentElement.setAttribute("data-font", newFont);
  };

  return (
    <div className={cn(dashboardStyles.main, pageStyles.page)}>
      
      {/* Header */}
      <div className={pageStyles.topBar}>
        <div className={pageStyles.titleGroup}>
          <h1 className={pageStyles.title}>Settings</h1>
        </div>
        <p className={pageStyles.description}>
          Manage your account preferences, appearance, and integrations.
        </p>
      </div>

      {/* Tabs */}
      <div className={pageStyles.tabsBar}>
        <button 
          onClick={() => setActiveTab("profile")} 
          className={cn(pageStyles.tab, activeTab === "profile" && pageStyles.tabActive)}
        >
          <User size={16} /> Profile
        </button>
        <button 
          onClick={() => setActiveTab("appearance")} 
          className={cn(pageStyles.tab, activeTab === "appearance" && pageStyles.tabActive)}
        >
          <Palette size={16} /> Appearance
        </button>
        <button 
          onClick={() => setActiveTab("api")} 
          className={cn(pageStyles.tab, activeTab === "api" && pageStyles.tabActive)}
        >
          <Key size={16} /> API & Integrations
        </button>
      </div>

      {/* Content */}
      <div style={{ animation: 'fade-in 0.3s ease-out' }}>
        
        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div>
            <div className={pageStyles.card}>
              <div className={pageStyles.cardHeader}>
                <h2 className={pageStyles.cardTitle}>Personal Information</h2>
                <p className={pageStyles.cardDesc}>Update your name and email address.</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary)', color: 'var(--primary-foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 600, fontFamily: 'var(--font-space-grotesk)' }}>
                  KJ
                </div>
                <div>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px' }}>Upload New Photo</button>
                  <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginTop: '8px', margin: '4px 0 0 0' }}>At least 256x256px PNG or JPG.</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className={pageStyles.inputGroup}>
                    <label className={pageStyles.label}>First Name</label>
                    <input type="text" defaultValue="Kundalik" className={pageStyles.input} />
                  </div>
                  <div className={pageStyles.inputGroup}>
                    <label className={pageStyles.label}>Last Name</label>
                    <input type="text" defaultValue="Jadhav" className={pageStyles.input} />
                  </div>
                </div>
                <div className={pageStyles.inputGroup}>
                  <label className={pageStyles.label}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                    <input type="email" defaultValue="kundalik.dev@gmail.com" className={pageStyles.input} style={{ paddingLeft: '38px' }} />
                  </div>
                </div>
                <div className={pageStyles.formActions}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '13px' }}>Save Changes</button>
                  {profileSaved && <span style={{ color: 'var(--success)', fontSize: '12px', fontWeight: 500 }}>✓ Saved successfully</span>}
                </div>
              </form>
            </div>

            <div className={pageStyles.card}>
                <div className={pageStyles.cardHeader}>
                <h2 className={pageStyles.cardTitle}><Shield size={18} className="text-destructive" /> Danger Zone</h2>
                <p className={pageStyles.cardDesc}>Permanently delete your account and all associated data.</p>
              </div>
              <button className="btn btn-secondary" style={{ color: 'var(--destructive)', borderColor: 'color-mix(in srgb, var(--destructive) 30%, transparent)' }}>Delete Account</button>
            </div>
          </div>
        )}

        {/* APPEARANCE TAB */}
        {activeTab === "appearance" && (
          <div>
            <div className={pageStyles.card}>
              <div className={pageStyles.cardHeader}>
                <h2 className={pageStyles.cardTitle}>
                  <Monitor size={18} /> Theme Preference
                </h2>
                <p className={pageStyles.cardDesc}>Select or customize your UI theme.</p>
              </div>
              <div className={pageStyles.buttonGrid}>
                {[
                  { id: "system", icon: Monitor, label: "System" },
                  { id: "light", icon: Sun, label: "Light" },
                  { id: "dark", icon: Moon, label: "Dark" },
                ].map((t) => {
                  const Icon = t.icon;
                  const isActive = theme === t.id;
                  return (
                    <button 
                      key={t.id}
                      onClick={() => handleThemeChange(t.id as "light" | "dark" | "system")}
                      className={cn(pageStyles.optionBtn, isActive && pageStyles.optionBtnActive)}
                    >
                      <Icon size={24} />
                      <span className={pageStyles.optionBtnTitle}>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={pageStyles.card}>
              <div className={pageStyles.cardHeader}>
                <h2 className={pageStyles.cardTitle}>
                  <Type size={18} /> App Font
                </h2>
                <p className={pageStyles.cardDesc}>Choose your preferred typeface for reading and writing.</p>
              </div>
              <div className={pageStyles.buttonGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                {[
                  { id: "inter", name: "Inter", desc: "Clean and highly readable sans-serif.", var: "var(--font-inter)" },
                  { id: "space-grotesk", name: "Space Grotesk", desc: "Geometrical, technical, and modern.", var: "var(--font-space-grotesk)" }
                ].map((f) => {
                  const isActive = font === f.id;
                  return (
                    <button 
                      key={f.id}
                      onClick={() => handleFontChange(f.id as "inter" | "space-grotesk")}
                      className={cn(pageStyles.optionBtn, isActive && pageStyles.optionBtnActive)}
                      style={{ alignItems: 'flex-start', fontFamily: f.var, textAlign: 'left' }}
                    >
                      <span className={pageStyles.optionBtnTitle} style={{ fontSize: '18px' }}>{f.name}</span>
                      <span className={pageStyles.optionBtnDesc}>{f.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* API TAB */}
        {activeTab === "api" && (
          <div>
            <div className={pageStyles.card}>
              <div className={pageStyles.cardHeader}>
                <h2 className={pageStyles.cardTitle}>
                  AI Validation Configuration
                </h2>
                <p className={pageStyles.cardDesc}>
                  We use <a href="https://openrouter.ai/" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>OpenRouter</a> to process your challenge submissions. 
                  Your API key is stored locally in your browser and is never sent to our servers.
                </p>
              </div>

              <form onSubmit={handleSaveApi}>
                
                {/* API Key */}
                <div className={pageStyles.inputGroup}>
                  <label htmlFor="openrouter-key" className={pageStyles.label}>OpenRouter API Key</label>
                  <div style={{ position: 'relative', maxWidth: '480px' }}>
                    <Key size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                    <input 
                      id="openrouter-key"
                      type="password"
                      placeholder="sk-or-v1-..."
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      className={pageStyles.input}
                      style={{ paddingLeft: '38px' }}
                    />
                  </div>
                </div>

                {/* Model Selection */}
                <div className={pageStyles.inputGroup}>
                  <label htmlFor="openrouter-model" className={pageStyles.label}>Preferred Model</label>
                  <select 
                    id="openrouter-model"
                    value={model}
                    onChange={(e) => {
                      setModel(e.target.value);
                      setIsCustom(e.target.value === "custom");
                    }}
                    className={pageStyles.select}
                    style={{ maxWidth: '480px', backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '10px 10px' }}
                  >
                    {MODELS.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                    <option value="custom">Custom Model...</option>
                  </select>
                </div>

                {/* Custom Model Input */}
                {isCustom && (
                  <div className={pageStyles.inputGroup}>
                    <label htmlFor="custom-model" className={pageStyles.label}>Custom Model ID</label>
                    <input 
                      id="custom-model"
                      type="text"
                      placeholder="e.g. meta-llama/llama-3-8b-instruct"
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      className={pageStyles.input}
                      style={{ maxWidth: '480px' }}
                    />
                  </div>
                )}

                <div className={pageStyles.formActions}>
                  <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '6px', fontSize: '13px' }}>
                    <Save size={14} /> Save Configuration
                  </button>
                  {apiSaved && <span style={{ color: 'var(--success)', fontSize: '12px', fontWeight: 500 }}>✓ Saved successfully</span>}
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
