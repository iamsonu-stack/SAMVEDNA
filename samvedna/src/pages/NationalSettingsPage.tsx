import React, { useState } from "react";
import {
  User,
  ShieldCheck,
  Bell,
  Lock,
  Database,
  Globe,
  Save,
  CheckCircle2,
  Monitor,
} from "lucide-react";

export default function NationalSettingsPage() {
  const [saved, setSaved] = useState(false);

  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [name, setName] = useState(
    localStorage.getItem("samvedna_user") ||
      "National Administrator"
  );

  const [email, setEmail] = useState(
    "national.admin@samvedna.gov.in"
  );

  const handleSave = () => {
    localStorage.setItem("samvedna_user", name);

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

          <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
            <ShieldCheck
              size={22}
              className="text-indigo-600"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              National Settings
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage national administrator profile,
              security and system preferences.
            </p>
          </div>

        </div>
      </div>

      {/* SAVE MESSAGE */}
      {saved && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">

          <CheckCircle2
            size={19}
            className="text-emerald-600"
          />

          <div>
            <p className="text-sm font-semibold text-emerald-800">
              Settings saved successfully
            </p>

            <p className="text-xs text-emerald-600 mt-1">
              Your national administrator preferences
              have been updated.
            </p>
          </div>

        </div>
      )}

      {/* PROFILE */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <div className="p-6 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <User
                size={19}
                className="text-indigo-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Administrator Profile
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                National-level administrator information
              </p>
            </div>

          </div>

        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              placeholder="Enter administrator name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Official Email
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Role
            </label>

            <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700">
              National Administrator
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Access Level
            </label>

            <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700">
              National Aggregated Access
            </div>
          </div>

        </div>

      </section>

      {/* SECURITY */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <div className="p-6 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Lock
                size={19}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Security & Access
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                National administrator security controls
              </p>
            </div>

          </div>

        </div>

        <div className="divide-y divide-slate-100">

          <SettingRow
            icon={ShieldCheck}
            title="Two-factor authentication"
            description="Require an additional verification step for administrator access."
            enabled={twoFactor}
            onChange={setTwoFactor}
          />

          <SettingRow
            icon={Lock}
            title="Role-based access control"
            description="Restrict sensitive information according to administrator role."
            enabled={true}
            onChange={() => {}}
            disabled
          />

          <SettingRow
            icon={Database}
            title="Audit logging"
            description="Record important administrator actions for accountability."
            enabled={true}
            onChange={() => {}}
            disabled
          />

        </div>

      </section>

      {/* NOTIFICATIONS */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <div className="p-6 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Bell
                size={19}
                className="text-amber-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Notifications
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Configure national-level system notifications
              </p>
            </div>

          </div>

        </div>

        <div className="divide-y divide-slate-100">

          <SettingRow
            icon={Bell}
            title="System notifications"
            description="Receive important SAMVEDNA system updates."
            enabled={notifications}
            onChange={setNotifications}
          />

          <SettingRow
            icon={Globe}
            title="Email notifications"
            description="Receive reports and administrative updates by email."
            enabled={emailAlerts}
            onChange={setEmailAlerts}
          />

        </div>

      </section>

      {/* SYSTEM PREFERENCES */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <div className="p-6 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Monitor
                size={19}
                className="text-purple-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                System Preferences
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Dashboard and monitoring preferences
              </p>
            </div>

          </div>

        </div>

        <div className="divide-y divide-slate-100">

          <SettingRow
            icon={Monitor}
            title="Automatic dashboard refresh"
            description="Keep national analytics updated automatically."
            enabled={autoRefresh}
            onChange={setAutoRefresh}
          />

        </div>

      </section>

      {/* DATA & PRIVACY */}
      <section className="bg-slate-950 text-white rounded-2xl p-6">

        <div className="flex items-start gap-4">

          <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
            <Database size={21} />
          </div>

          <div>

            <h2 className="text-lg font-bold">
              Data & Privacy
            </h2>

            <p className="text-sm text-slate-400 mt-2 leading-6">
              National administrators primarily access
              aggregated state-level indicators. Individual
              sensitive information should remain restricted
              according to role-based access policies.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">

              <span className="px-3 py-1.5 rounded-lg bg-white/10 text-xs">
                Role-based access
              </span>

              <span className="px-3 py-1.5 rounded-lg bg-white/10 text-xs">
                Audit logs
              </span>

              <span className="px-3 py-1.5 rounded-lg bg-white/10 text-xs">
                Privacy by design
              </span>

              <span className="px-3 py-1.5 rounded-lg bg-white/10 text-xs">
                Human oversight
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* SAVE BUTTON */}
      <div className="flex justify-end pb-6">

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm transition"
        >
          <Save size={17} />
          Save Changes
        </button>

      </div>

    </div>
  );
}

/* =====================================================
   SETTING ROW
===================================================== */

function SettingRow({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
  disabled = false,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="p-5 flex items-center justify-between gap-5">

      <div className="flex items-center gap-4 min-w-0">

        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
          <Icon
            size={18}
            className="text-slate-600"
          />
        </div>

        <div>

          <p className="text-sm font-semibold text-slate-800">
            {title}
          </p>

          <p className="text-xs text-slate-500 mt-1 leading-5">
            {description}
          </p>

        </div>

      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!enabled)}
        className={`
          relative
          w-12
          h-6
          rounded-full
          transition
          shrink-0
          ${enabled ? "bg-indigo-600" : "bg-slate-300"}
          ${disabled ? "opacity-70 cursor-not-allowed" : ""}
        `}
      >

        <span
          className={`
            absolute
            top-1
            w-4
            h-4
            rounded-full
            bg-white
            transition
            ${enabled ? "left-7" : "left-1"}
          `}
        />

      </button>

    </div>
  );
}