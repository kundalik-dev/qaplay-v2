"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
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
  const [key, setKey] = useState("");
  const [model, setModel] = useState("openai/gpt-4o-mini");
  const [customModel, setCustomModel] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
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
    });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("qap_openrouter_key", key);
    
    const finalModel = isCustom ? customModel : model;
    localStorage.setItem("qap_openrouter_model", finalModel);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.main} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="heading-lg" style={{ marginBottom: '8px' }}>Settings</h1>
      <p className="body-base text-muted" style={{ marginBottom: '32px' }}>
        Manage your integrations and API keys.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
        <h2 className="heading-md" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="icon">🔑</span> AI Validation Configuration (BYOK)
        </h2>
        <p className="body-sm text-muted" style={{ marginBottom: '24px' }}>
          We use <a href="https://openrouter.ai/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>OpenRouter</a> to process your challenge submissions. 
          Your API key is stored locally in your browser and is never sent to our servers.
        </p>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
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
            {saved && <span style={{ color: 'var(--success)', fontSize: '13px', fontWeight: 500 }}>Saved successfully!</span>}
          </div>

        </form>
      </div>
    </div>
  );
}
