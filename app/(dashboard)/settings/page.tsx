"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Palette,
  Key,
  Monitor,
  Moon,
  Sun,
  Type,
  User,
  Mail,
  Shield,
  FileText,
  Upload,
} from "lucide-react";
import pageStyles from "./settings.module.css";
import dashboardStyles from "../_components/dashboard.module.css";
import { cn } from "@/lib/utils";

const MODELS = [
  { id: "openai/gpt-4o-mini", name: "OpenAI GPT-4o Mini (Default)" },
  { id: "openai/gpt-4o", name: "OpenAI GPT-4o" },
  { id: "anthropic/claude-3.5-sonnet", name: "Anthropic Claude 3.5 Sonnet" },
  { id: "anthropic/claude-3-haiku", name: "Anthropic Claude 3 Haiku" },
  { id: "google/gemini-1.5-flash", name: "Google Gemini 1.5 Flash" },
  { id: "google/gemini-1.5-pro", name: "Google Gemini 1.5 Pro" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "appearance" | "api">(
    "profile",
  );

  // API State
  const [key, setKey] = useState("");
  const [model, setModel] = useState("openai/gpt-4o-mini");
  const [customModel, setCustomModel] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [apiSaved, setApiSaved] = useState(false);

  // Appearance State
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [font, setFont] = useState<"inter" | "space-grotesk">("inter");
  const [fontSize, setFontSize] = useState<number>(16);

  // Profile State
  const [profileSaved, setProfileSaved] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const updateSettings = (updates: Record<string, unknown>) => {
    const current = JSON.parse(localStorage.getItem("qap_settings") || "{}");
    const merged: Record<string, unknown> = { ...current, ...updates };
    // Remove undefined keys to keep localStorage clean
    Object.keys(merged).forEach(
      (key) => merged[key] === undefined && delete merged[key],
    );
    localStorage.setItem("qap_settings", JSON.stringify(merged));
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      const settings = JSON.parse(localStorage.getItem("qap_settings") || "{}");

      // Load API settings
      const savedKey = settings.openrouter_key || "";
      const savedModel = settings.openrouter_model || "openai/gpt-4o-mini";

      setKey(savedKey);

      const isStandard = MODELS.some((m) => m.id === savedModel);
      if (isStandard) {
        setModel(savedModel);
        setIsCustom(false);
      } else {
        setModel("custom");
        setCustomModel(savedModel);
        setIsCustom(true);
      }

      // Load Appearance settings
      setTheme(settings.theme || "system");
      setFont(settings.font || "inter");
      if (settings.fontSize) setFontSize(Number(settings.fontSize));
    });
  }, []);

  const handleSaveApi = (e: React.FormEvent) => {
    e.preventDefault();
    const finalModel = isCustom ? customModel : model;

    updateSettings({
      openrouter_key: key,
      openrouter_model: finalModel,
    });

    setApiSaved(true);
    setTimeout(() => setApiSaved(false), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulated API Call for Resume Upload
    if (resumeFile) {
      console.log("Simulating resume upload to API:", resumeFile.name);
      /*
      const formData = new FormData();
      formData.append("resume", resumeFile);
      fetch("/api/upload-resume", { method: "POST", body: formData })
        .then(res => res.json())
        .then(data => console.log("Upload success", data))
        .catch(err => console.error("Upload failed", err));
      */
    }

    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    if (newTheme === "system") {
      updateSettings({ theme: undefined });
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.documentElement.classList.toggle("dark", isSystemDark);
    } else {
      updateSettings({ theme: newTheme });
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
    window.dispatchEvent(new Event("qap-theme-change"));
  };

  const handleFontChange = (newFont: "inter" | "space-grotesk") => {
    setFont(newFont);
    updateSettings({ font: newFont });
    document.documentElement.setAttribute("data-font", newFont);
  };

  const handleFontSizeChange = (delta: number) => {
    const newSize = Math.max(12, Math.min(24, fontSize + delta));
    setFontSize(newSize);
    updateSettings({ fontSize: newSize });
    document.documentElement.style.fontSize = `${newSize}px`;
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
          className={cn(
            pageStyles.tab,
            activeTab === "profile" && pageStyles.tabActive,
          )}
        >
          <User size={16} /> Profile
        </button>
        <button
          onClick={() => setActiveTab("appearance")}
          className={cn(
            pageStyles.tab,
            activeTab === "appearance" && pageStyles.tabActive,
          )}
        >
          <Palette size={16} /> Appearance
        </button>
        <button
          onClick={() => setActiveTab("api")}
          className={cn(
            pageStyles.tab,
            activeTab === "api" && pageStyles.tabActive,
          )}
        >
          <Key size={16} /> API & Integrations
        </button>
      </div>

      {/* Content */}
      <div style={{ animation: "fade-in 0.3s ease-out" }}>
        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div>
            <div className={pageStyles.card}>
              <div className={pageStyles.cardHeader}>
                <h2 className={pageStyles.cardTitle}>Personal Information</h2>
                <p className={pageStyles.cardDesc}>
                  Update your name and email address.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: 600,
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  KJ
                </div>
                <div>
                  <button
                    className={cn(
                      pageStyles.btn,
                      pageStyles.btnSecondary,
                      pageStyles.btnSm,
                    )}
                  >
                    Upload New Photo
                  </button>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "var(--muted-foreground)",
                      marginTop: "8px",
                      margin: "4px 0 0 0",
                    }}
                  >
                    At least 256x256px PNG or JPG.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div className={pageStyles.inputGroup}>
                    <label className={pageStyles.label}>First Name</label>
                    <input
                      type="text"
                      defaultValue="Kundalik"
                      className={pageStyles.input}
                    />
                  </div>
                  <div className={pageStyles.inputGroup}>
                    <label className={pageStyles.label}>Last Name</label>
                    <input
                      type="text"
                      defaultValue="Jadhav"
                      className={pageStyles.input}
                    />
                  </div>
                </div>
                <div className={pageStyles.inputGroup}>
                  <label className={pageStyles.label}>Email Address</label>
                  <div style={{ position: "relative" }}>
                    <Mail
                      size={16}
                      style={{
                        position: "absolute",
                        left: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--muted-foreground)",
                      }}
                    />
                    <input
                      type="email"
                      defaultValue="kundalik.dev@gmail.com"
                      readOnly
                      className={pageStyles.input}
                      style={{ paddingLeft: "44px" }}
                    />
                  </div>
                </div>

                <div className={pageStyles.inputGroup}>
                  <label className={pageStyles.label}>Upload Resume</label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <label
                      className={cn(pageStyles.btn, pageStyles.btnSecondary)}
                      style={{ cursor: "pointer" }}
                    >
                      <Upload size={14} /> Choose File
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.md"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setResumeFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                    {resumeFile ? (
                      <span
                        style={{
                          fontSize: "13px",
                          color: "var(--foreground)",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <FileText size={14} className="text-primary" />{" "}
                        {resumeFile.name}
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: "13px",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        No file chosen (PDF, DOCX, MD)
                      </span>
                    )}
                  </div>
                </div>

                <div className={pageStyles.formActions}>
                  <button
                    type="submit"
                    className={cn(pageStyles.btn, pageStyles.btnPrimary)}
                  >
                    Save Changes
                  </button>
                  {profileSaved && (
                    <span
                      style={{
                        color: "var(--success)",
                        fontSize: "13px",
                        fontWeight: 500,
                        marginLeft: "8px",
                      }}
                    >
                      ✓ Saved successfully
                    </span>
                  )}
                </div>
              </form>
            </div>

            <div className={pageStyles.card}>
              <div className={pageStyles.cardHeader}>
                <h2 className={pageStyles.cardTitle}>
                  <Shield size={18} className="text-destructive" /> Danger Zone
                </h2>
                <p className={pageStyles.cardDesc}>
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <button className={cn(pageStyles.btn, pageStyles.btnDanger)}>
                Delete Account
              </button>
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
                <p className={pageStyles.cardDesc}>
                  Select or customize your UI theme.
                </p>
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
                      onClick={() =>
                        handleThemeChange(t.id as "light" | "dark" | "system")
                      }
                      className={cn(
                        pageStyles.optionBtn,
                        isActive && pageStyles.optionBtnActive,
                      )}
                    >
                      <Icon size={24} />
                      <span className={pageStyles.optionBtnTitle}>
                        {t.label}
                      </span>
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
                <p className={pageStyles.cardDesc}>
                  Choose your preferred typeface for reading and writing.
                </p>
              </div>
              <div
                className={pageStyles.buttonGrid}
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                }}
              >
                {[
                  {
                    id: "inter",
                    name: "Inter",
                    desc: "Clean and highly readable sans-serif.",
                    var: "var(--font-inter)",
                  },
                  {
                    id: "space-grotesk",
                    name: "Space Grotesk",
                    desc: "Geometrical, technical, and modern.",
                    var: "var(--font-space-grotesk)",
                  },
                ].map((f) => {
                  const isActive = font === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() =>
                        handleFontChange(f.id as "inter" | "space-grotesk")
                      }
                      className={cn(
                        pageStyles.optionBtn,
                        isActive && pageStyles.optionBtnActive,
                      )}
                      style={{
                        alignItems: "flex-start",
                        fontFamily: f.var,
                        textAlign: "left",
                      }}
                    >
                      <span
                        className={pageStyles.optionBtnTitle}
                        style={{ fontSize: "18px" }}
                      >
                        {f.name}
                      </span>
                      <span className={pageStyles.optionBtnDesc}>{f.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={pageStyles.card}>
              <div className={pageStyles.cardHeader}>
                <h2 className={pageStyles.cardTitle}>
                  <Type size={18} /> Font Size
                </h2>
                <p className={pageStyles.cardDesc}>
                  Adjust the base font size for the application.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <button
                  onClick={() => handleFontSizeChange(-1)}
                  className={cn(pageStyles.btn, pageStyles.btnSecondary)}
                  disabled={fontSize <= 12}
                  style={{ opacity: fontSize <= 12 ? 0.5 : 1 }}
                >
                  A-
                </button>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    width: "40px",
                    textAlign: "center",
                    color: "var(--foreground)",
                  }}
                >
                  {fontSize}px
                </span>
                <button
                  onClick={() => handleFontSizeChange(1)}
                  className={cn(pageStyles.btn, pageStyles.btnSecondary)}
                  disabled={fontSize >= 24}
                  style={{ opacity: fontSize >= 24 ? 0.5 : 1 }}
                >
                  A+
                </button>
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
                  We use{" "}
                  <a
                    href="https://openrouter.ai/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "var(--primary)",
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    OpenRouter
                  </a>{" "}
                  to process your challenge submissions. Your API key is stored
                  locally in your browser and is never sent to our servers.
                </p>
              </div>

              <form onSubmit={handleSaveApi}>
                {/* API Key */}
                <div className={pageStyles.inputGroup}>
                  <label htmlFor="openrouter-key" className={pageStyles.label}>
                    OpenRouter API Key
                  </label>
                  <div style={{ position: "relative", maxWidth: "480px" }}>
                    <Key
                      size={16}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--muted-foreground)",
                      }}
                    />
                    <input
                      id="openrouter-key"
                      type="password"
                      placeholder="sk-or-v1-..."
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      className={pageStyles.input}
                      style={{ paddingLeft: "38px" }}
                    />
                  </div>
                </div>

                {/* Model Selection */}
                <div className={pageStyles.inputGroup}>
                  <label
                    htmlFor="openrouter-model"
                    className={pageStyles.label}
                  >
                    Preferred Model
                  </label>
                  <select
                    id="openrouter-model"
                    value={model}
                    onChange={(e) => {
                      setModel(e.target.value);
                      setIsCustom(e.target.value === "custom");
                    }}
                    className={pageStyles.select}
                    style={{
                      maxWidth: "480px",
                      backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                      backgroundSize: "10px 10px",
                    }}
                  >
                    {MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                    <option value="custom">Custom Model...</option>
                  </select>
                </div>

                {/* Custom Model Input */}
                {isCustom && (
                  <div className={pageStyles.inputGroup}>
                    <label htmlFor="custom-model" className={pageStyles.label}>
                      Custom Model ID
                    </label>
                    <input
                      id="custom-model"
                      type="text"
                      placeholder="e.g. meta-llama/llama-3-8b-instruct"
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      className={pageStyles.input}
                      style={{ maxWidth: "480px" }}
                    />
                  </div>
                )}

                <div className={pageStyles.formActions}>
                  <button
                    type="submit"
                    className={cn(pageStyles.btn, pageStyles.btnPrimary)}
                  >
                    <Save size={16} /> Save Changes
                  </button>
                  {apiSaved && (
                    <span
                      style={{
                        color: "var(--success)",
                        fontSize: "13px",
                        fontWeight: 500,
                        marginLeft: "8px",
                      }}
                    >
                      ✓ Saved successfully
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
