"use client";

import { useState, useEffect } from "react";
import { Save, Palette, Key, Monitor, Moon, Sun, Type } from "lucide-react";
import styles from "../_components/dashboard.module.css";

const MODELS = [
  { id: "openai/gpt-4o-mini", name: "OpenAI GPT-4o Mini (Default)" },
  { id: "openai/gpt-4o", name: "OpenAI GPT-4o" },
  { id: "anthropic/claude-3.5-sonnet", name: "Anthropic Claude 3.5 Sonnet" },
  { id: "anthropic/claude-3-haiku", name: "Anthropic Claude 3 Haiku" },
  { id: "google/gemini-1.5-flash", name: "Google Gemini 1.5 Flash" },
  { id: "google/gemini-1.5-pro", name: "Google Gemini 1.5 Pro" }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"appearance" | "api">("appearance");
  
  // API State
  const [key, setKey] = useState("");
  const [model, setModel] = useState("openai/gpt-4o-mini");
  const [customModel, setCustomModel] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [apiSaved, setApiSaved] = useState(false);

  // Appearance State
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [font, setFont] = useState<"inter" | "space-grotesk">("inter");

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
    <div className={styles.main} style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <h1 className="heading-lg" style={{ marginBottom: '8px' }}>Settings</h1>
      <p className="body-base text-muted" style={{ marginBottom: '32px' }}>
        Manage your preferences and integrations.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border)' }}>
        <button 
          onClick={() => setActiveTab("appearance")}
          style={{ 
            padding: '12px 16px', 
            fontWeight: 600, 
            color: activeTab === "appearance" ? 'var(--accent)' : 'var(--text-muted)',
            borderBottom: activeTab === "appearance" ? '2px solid var(--accent)' : '2px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Palette size={18} /> Appearance
        </button>
        <button 
          onClick={() => setActiveTab("api")}
          style={{ 
            padding: '12px 16px', 
            fontWeight: 600, 
            color: activeTab === "api" ? 'var(--accent)' : 'var(--text-muted)',
            borderBottom: activeTab === "api" ? '2px solid var(--accent)' : '2px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Key size={18} /> API & Integrations
        </button>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
        
        {/* APPEARANCE TAB */}
        {activeTab === "appearance" && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Theme Selection */}
            <div>
              <h2 className="heading-md" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Monitor size={20} /> Theme Preference
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                <button 
                  onClick={() => handleThemeChange("system")}
                  style={{ padding: '16px', borderRadius: '8px', border: `2px solid ${theme === 'system' ? 'var(--accent)' : 'var(--border)'}`, background: 'var(--bg2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
                >
                  <Monitor size={24} /> System
                </button>
                <button 
                  onClick={() => handleThemeChange("light")}
                  style={{ padding: '16px', borderRadius: '8px', border: `2px solid ${theme === 'light' ? 'var(--accent)' : 'var(--border)'}`, background: 'var(--bg2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
                >
                  <Sun size={24} /> Light
                </button>
                <button 
                  onClick={() => handleThemeChange("dark")}
                  style={{ padding: '16px', borderRadius: '8px', border: `2px solid ${theme === 'dark' ? 'var(--accent)' : 'var(--border)'}`, background: 'var(--bg2)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
                >
                  <Moon size={24} /> Dark
                </button>
              </div>
            </div>

            {/* Font Selection */}
            <div>
              <h2 className="heading-md" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Type size={20} /> App Font
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <button 
                  onClick={() => handleFontChange("inter")}
                  style={{ padding: '16px', borderRadius: '8px', border: `2px solid ${font === 'inter' ? 'var(--accent)' : 'var(--border)'}`, background: 'var(--bg2)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', fontFamily: 'var(--font-inter)' }}
                >
                  <span style={{ fontSize: '18px', fontWeight: 600 }}>Inter</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>The quick brown fox jumps over the lazy dog.</span>
                </button>
                <button 
                  onClick={() => handleFontChange("space-grotesk")}
                  style={{ padding: '16px', borderRadius: '8px', border: `2px solid ${font === 'space-grotesk' ? 'var(--accent)' : 'var(--border)'}`, background: 'var(--bg2)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', fontFamily: 'var(--font-space-grotesk)' }}
                >
                  <span style={{ fontSize: '18px', fontWeight: 600 }}>Space Grotesk</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>The quick brown fox jumps over the lazy dog.</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* API TAB */}
        {activeTab === "api" && (
          <div>
            <h2 className="heading-md" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="icon">🔑</span> AI Validation Configuration (BYOK)
            </h2>
            <p className="body-sm text-muted" style={{ marginBottom: '24px' }}>
              We use <a href="https://openrouter.ai/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>OpenRouter</a> to process your challenge submissions. 
              Your API key is stored locally in your browser and is never sent to our servers.
            </p>

            <form onSubmit={handleSaveApi} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* API Key */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="openrouter-key" style={{ fontSize: '13px', fontWeight: 600 }}>OpenRouter API Key</label>
                <input 
                  id="openrouter-key"
                  type="password"
                  placeholder="sk-or-v1-..."
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  style={{
                    background: 'var(--bg2)', border: '1px solid var(--border-strong)', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: 'var(--text)', width: '100%', maxWidth: '400px'
                  }}
                />
              </div>

              {/* Model Selection */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="openrouter-model" style={{ fontSize: '13px', fontWeight: 600 }}>Preferred Model</label>
                <select 
                  id="openrouter-model"
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                    setIsCustom(e.target.value === "custom");
                  }}
                  style={{
                    background: 'var(--bg2)', border: '1px solid var(--border-strong)', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: 'var(--text)', width: '100%', maxWidth: '400px', cursor: 'pointer'
                  }}
                >
                  {MODELS.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                  <option value="custom">Custom Model...</option>
                </select>
              </div>

              {/* Custom Model Input */}
              {isCustom && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="custom-model" style={{ fontSize: '13px', fontWeight: 600 }}>Custom Model ID</label>
                  <input 
                    id="custom-model"
                    type="text"
                    placeholder="e.g. meta-llama/llama-3-8b-instruct"
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    style={{
                      background: 'var(--bg2)', border: '1px solid var(--border-strong)', borderRadius: '6px', padding: '10px 14px', fontSize: '14px', color: 'var(--text)', width: '100%', maxWidth: '400px'
                    }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={16} /> Save Configuration
                </button>
                {apiSaved && <span style={{ color: 'var(--success)', fontSize: '13px', fontWeight: 500 }}>Saved successfully!</span>}
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
