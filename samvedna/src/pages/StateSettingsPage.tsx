import React, { useState } from "react";
import {
  Settings,
  Bell,
  ShieldCheck,
  Globe,
  Monitor,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function StateSettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    localStorage.setItem(
      "samvedna_state_settings",
      JSON.stringify({
        notifications,
        emailAlerts,
        darkMode,
        compactMode,
        language,
      })
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Settings
              size={20}
              className="text-indigo-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Settings
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Configure SAMVEDNA state administrator settings.
            </p>
          </div>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {saved && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold">
          <CheckCircle2 size={18} />
          Settings saved successfully.
        </div>
      )}

      {/* WEB SETTINGS */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <div className="p-5 border-b border-slate-200">
          <div className="flex items-center gap-3">

            <Globe
              size={20}
              className="text-indigo-600"
            />

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Web Settings
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Manage dashboard appearance and web preferences.
              </p>
            </div>

          </div>
        </div>

        <div className="p-5 space-y-5">

          {/* LANGUAGE */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Interface Language
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Select the language used across the dashboard.
              </p>
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-indigo-500"
            >
              <option value="English">
                English
              </option>

              <option value="Hindi">
                Hindi
              </option>
            </select>

          </div>

          {/* COMPACT MODE */}
          <SettingToggle
            title="Compact Dashboard"
            description="Use a more compact layout for tables and data."
            enabled={compactMode}
            onChange={setCompactMode}
            icon={<Monitor size={17} />}
          />

          {/* DARK MODE */}
          <SettingToggle
            title="Dark Mode"
            description="Use a dark interface for the dashboard."
            enabled={darkMode}
            onChange={setDarkMode}
            icon={<Monitor size={17} />}
          />

        </div>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <div className="p-5 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <Bell
              size={20}
              className="text-orange-600"
            />

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Notification Settings
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Configure state-level monitoring notifications.
              </p>
            </div>

          </div>

        </div>

        <div className="p-5 space-y-5">

          <SettingToggle
            title="Dashboard Notifications"
            description="Show important monitoring notifications inside SAMVEDNA."
            enabled={notifications}
            onChange={setNotifications}
            icon={<Bell size={17} />}
          />

          <SettingToggle
            title="Email Alerts"
            description="Receive authorized system alerts through email."
            enabled={emailAlerts}
            onChange={setEmailAlerts}
            icon={<Bell size={17} />}
          />

        </div>
      </div>

      {/* SECURITY */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <div className="p-5 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <ShieldCheck
              size={20}
              className="text-emerald-600"
            />

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Security & Privacy
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                State-level access and privacy controls.
              </p>
            </div>

          </div>

        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">

          <SecurityCard
            title="Role-Based Access"
            text="Access is limited according to administrator role."
          />

          <SecurityCard
            title="Data Protection"
            text="Sensitive victim information follows minimum-access principles."
          />

          <SecurityCard
            title="Human Oversight"
            text="AI indicators require authorized human review."
          />

        </div>
      </div>

      {/* SYSTEM STATUS */}
      <div className="bg-slate-950 text-white rounded-2xl p-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">

            <CheckCircle2
              size={20}
              className="text-emerald-400"
            />

          </div>

          <div>

            <h2 className="font-bold">
              System Status
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              SAMVEDNA prototype services are operational.
            </p>

          </div>

        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">

          <StatusItem title="Dashboard" />
          <StatusItem title="Analytics" />
          <StatusItem title="Monitoring Engine" />

        </div>

      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">

        <button
          onClick={saveSettings}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
        >
          <Save size={17} />
          Save Settings
        </button>

      </div>

    </div>
  );
}

/* =====================================================
   SETTING TOGGLE
===================================================== */

function SettingToggle({
  title,
  description,
  enabled,
  onChange,
  icon,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200">

      <div className="flex items-center gap-3">

        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
          {icon}
        </div>

        <div>

          <p className="text-sm font-semibold text-slate-800">
            {title}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            {description}
          </p>

        </div>

      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition flex-shrink-0 ${
          enabled
            ? "bg-indigo-600"
            : "bg-slate-300"
        }`}
      >

        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}

/* =====================================================
   SECURITY CARD
===================================================== */

function SecurityCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">

      <p className="text-sm font-semibold text-slate-800">
        {title}
      </p>

      <p className="text-xs text-slate-500 mt-2 leading-5">
        {text}
      </p>

    </div>
  );
}

/* =====================================================
   STATUS ITEM
===================================================== */

function StatusItem({
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5">

      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />

      <span className="text-sm">
        {title}
      </span>

    </div>
  );
}