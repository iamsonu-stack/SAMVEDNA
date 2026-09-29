import React from "react";
import {
  Bell,
  ShieldCheck,
  Brain,
  Clock3,
  MessageSquare,
  Phone,
  Save,
  RotateCcw,
  Lock,
  UserRound,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Settings as SettingsIcon,
} from "lucide-react";

type SettingsState = {
  checkInFrequency: string;
  reminderAfter: string;
  secondReminderAfter: string;

  highRiskThreshold: number;
  criticalRiskThreshold: number;

  smsEnabled: boolean;
  ivrsEnabled: boolean;
  phoneFollowupEnabled: boolean;

  highRiskAlert: boolean;
  criticalAlert: boolean;
  missedCheckinAlert: boolean;
  trendAlert: boolean;

  autoGenerateReports: boolean;
  anonymizeVictimId: boolean;
  requireHumanReview: boolean;

  aiConfidenceThreshold: number;
};

const defaultSettings: SettingsState = {
  checkInFrequency: "7",
  reminderAfter: "24",
  secondReminderAfter: "48",

  highRiskThreshold: 61,
  criticalRiskThreshold: 81,

  smsEnabled: true,
  ivrsEnabled: true,
  phoneFollowupEnabled: true,

  highRiskAlert: true,
  criticalAlert: true,
  missedCheckinAlert: true,
  trendAlert: true,

  autoGenerateReports: false,
  anonymizeVictimId: true,
  requireHumanReview: true,

  aiConfidenceThreshold: 70,
};

export default function SettingsPage() {
  const [settings, setSettings] =
    React.useState<SettingsState>(() => {
      try {
        const saved = localStorage.getItem(
          "samvedna_settings"
        );

        if (saved) {
          return {
            ...defaultSettings,
            ...JSON.parse(saved),
          };
        }
      } catch (error) {
        console.error(
          "Unable to load settings",
          error
        );
      }

      return defaultSettings;
    });

  const [saved, setSaved] = React.useState(false);

  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem(
      "samvedna_settings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);

    localStorage.setItem(
      "samvedna_settings",
      JSON.stringify(defaultSettings)
    );

    setSaved(false);
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <SettingsIcon size={24} />
            </div>

            <div>

              <div className="flex items-center gap-2">

                <h1 className="text-2xl font-bold text-slate-900">
                  Settings
                </h1>

                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  District Configuration
                </span>

              </div>

              <p className="text-sm text-slate-500 mt-1">
                Configure SAMVEDNA monitoring, alerts,
                communication and privacy controls.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={resetSettings}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-600
                hover:bg-slate-50
                transition
                text-sm
                font-medium
              "
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              onClick={saveSettings}
              className="
                flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                transition
                text-sm
                font-semibold
                shadow-sm
              "
            >
              <Save size={16} />
              Save Changes
            </button>

          </div>

        </div>

        {saved && (
          <div className="mt-5 flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">

            <CheckCircle2 size={18} />

            <span>
              Settings saved successfully.
            </span>

          </div>
        )}

      </div>


      {/* =====================================================
          QUICK STATUS
      ====================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <StatusCard
          icon={<ShieldCheck size={20} />}
          title="Access Control"
          value="Role Based"
          description="Sensitive case information is restricted."
          color="indigo"
        />

        <StatusCard
          icon={<Brain size={20} />}
          title="AI Monitoring"
          value="Active"
          description="Dynamic distress analysis is enabled."
          color="emerald"
        />

        <StatusCard
          icon={<Bell size={20} />}
          title="Alert System"
          value="Enabled"
          description="Human review alerts are active."
          color="amber"
        />

      </div>


      {/* =====================================================
          MONITORING SETTINGS
      ====================================================== */}

      <SettingsSection
        icon={<Clock3 size={20} />}
        title="Well-being Monitoring"
        description="Configure how frequently SAMVEDNA requests victim check-ins."
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <SelectSetting
            label="Check-in Frequency"
            value={settings.checkInFrequency}
            onChange={(value) =>
              updateSetting(
                "checkInFrequency",
                value
              )
            }
            options={[
              ["3", "Every 3 days"],
              ["7", "Every 7 days"],
              ["14", "Every 14 days"],
              ["30", "Every 30 days"],
            ]}
          />

          <SelectSetting
            label="First Reminder"
            value={settings.reminderAfter}
            onChange={(value) =>
              updateSetting(
                "reminderAfter",
                value
              )
            }
            options={[
              ["12", "After 12 hours"],
              ["24", "After 24 hours"],
              ["48", "After 48 hours"],
            ]}
          />

          <SelectSetting
            label="Second Reminder"
            value={settings.secondReminderAfter}
            onChange={(value) =>
              updateSetting(
                "secondReminderAfter",
                value
              )
            }
            options={[
              ["24", "After 24 hours"],
              ["48", "After 48 hours"],
              ["72", "After 72 hours"],
            ]}
          />

        </div>

        <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">

          <Clock3
            size={19}
            className="text-blue-600 mt-0.5 shrink-0"
          />

          <div>

            <p className="text-sm font-semibold text-blue-900">
              Low-burden monitoring
            </p>

            <p className="text-xs text-blue-700 mt-1 leading-5">
              SAMVEDNA uses periodic check-ins rather than
              requiring victims to continuously use the dashboard.
            </p>

          </div>

        </div>

      </SettingsSection>


      {/* =====================================================
          RISK THRESHOLDS
      ====================================================== */}

      <SettingsSection
        icon={<AlertTriangle size={20} />}
        title="Risk & Alert Thresholds"
        description="Configure prototype thresholds used for district-level monitoring."
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <RangeSetting
            label="High Risk Threshold"
            value={settings.highRiskThreshold}
            min={50}
            max={80}
            onChange={(value) =>
              updateSetting(
                "highRiskThreshold",
                value
              )
            }
            description="Scores at or above this level are flagged for closer monitoring."
          />

          <RangeSetting
            label="Critical Risk Threshold"
            value={settings.criticalRiskThreshold}
            min={70}
            max={100}
            onChange={(value) =>
              updateSetting(
                "criticalRiskThreshold",
                value
              )
            }
            description="Scores at or above this level require human review."
          />

        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-4 gap-3">

          <RiskBadge
            label="Low"
            range={`0–${settings.highRiskThreshold - 1}`}
            color="green"
          />

          <RiskBadge
            label="Moderate"
            range={`${settings.highRiskThreshold - 30}–${settings.highRiskThreshold - 1}`}
            color="yellow"
          />

          <RiskBadge
            label="High"
            range={`${settings.highRiskThreshold}–${settings.criticalRiskThreshold - 1}`}
            color="orange"
          />

          <RiskBadge
            label="Critical"
            range={`${settings.criticalRiskThreshold}–100`}
            color="red"
          />

        </div>

        <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">

          <AlertTriangle
            size={19}
            className="text-amber-600 mt-0.5"
          />

          <div>

            <p className="text-sm font-semibold text-amber-900">
              Prototype thresholds only
            </p>

            <p className="text-xs text-amber-700 mt-1 leading-5">
              These thresholds are demonstration settings and
              are not clinical standards. AI alerts require
              human review.
            </p>

          </div>

        </div>

      </SettingsSection>


      {/* =====================================================
          COMMUNICATION CHANNELS
      ====================================================== */}

      <SettingsSection
        icon={<MessageSquare size={20} />}
        title="Communication Channels"
        description="Choose the channels available for well-being check-ins and follow-up."
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <ToggleCard
            icon={<MessageSquare size={20} />}
            title="SMS"
            description="Send scheduled check-in messages."
            enabled={settings.smsEnabled}
            onChange={(value) =>
              updateSetting(
                "smsEnabled",
                value
              )
            }
          />

          <ToggleCard
            icon={<Phone size={20} />}
            title="IVRS"
            description="Automated voice-based check-ins."
            enabled={settings.ivrsEnabled}
            onChange={(value) =>
              updateSetting(
                "ivrsEnabled",
                value
              )
            }
          />

          <ToggleCard
            icon={<Phone size={20} />}
            title="Phone Follow-up"
            description="Human follow-up by authorized staff."
            enabled={settings.phoneFollowupEnabled}
            onChange={(value) =>
              updateSetting(
                "phoneFollowupEnabled",
                value
              )
            }
          />

        </div>

      </SettingsSection>


      {/* =====================================================
          ALERT NOTIFICATIONS
      ====================================================== */}

      <SettingsSection
        icon={<Bell size={20} />}
        title="Alert Notifications"
        description="Control which events create dashboard notifications."
      >

        <div className="divide-y divide-slate-100">

          <SettingToggleRow
            title="High-risk case alert"
            description="Notify the district officer when a case enters high-risk range."
            enabled={settings.highRiskAlert}
            onChange={(value) =>
              updateSetting(
                "highRiskAlert",
                value
              )
            }
          />

          <SettingToggleRow
            title="Critical case alert"
            description="Notify the district officer when a case reaches critical range."
            enabled={settings.criticalAlert}
            onChange={(value) =>
              updateSetting(
                "criticalAlert",
                value
              )
            }
          />

          <SettingToggleRow
            title="Missed check-in alert"
            description="Create an engagement concern after repeated missed check-ins."
            enabled={settings.missedCheckinAlert}
            onChange={(value) =>
              updateSetting(
                "missedCheckinAlert",
                value
              )
            }
          />

          <SettingToggleRow
            title="Rapid trend alert"
            description="Notify when distress indicators increase across consecutive check-ins."
            enabled={settings.trendAlert}
            onChange={(value) =>
              updateSetting(
                "trendAlert",
                value
              )
            }
          />

        </div>

      </SettingsSection>


      {/* =====================================================
          AI SETTINGS
      ====================================================== */}

      <SettingsSection
        icon={<Brain size={20} />}
        title="AI Monitoring"
        description="Configure explainability and human-in-the-loop controls."
      >

        <RangeSetting
          label="Minimum AI Confidence Indicator"
          value={settings.aiConfidenceThreshold}
          min={50}
          max={95}
          onChange={(value) =>
            updateSetting(
              "aiConfidenceThreshold",
              value
            )
          }
          description="Prototype indicator used to display model confidence alongside AI-generated explanations."
        />

        <div className="mt-5 divide-y divide-slate-100">

          <SettingToggleRow
            title="Human review required"
            description="High and critical AI alerts must be reviewed by an authorized human."
            enabled={settings.requireHumanReview}
            onChange={(value) =>
              updateSetting(
                "requireHumanReview",
                value
              )
            }
            locked
          />

          <SettingToggleRow
            title="Explainable AI"
            description="Display the main factors contributing to a distress-risk result."
            enabled={true}
            onChange={() => {}}
            locked
          />

        </div>

      </SettingsSection>


      {/* =====================================================
          PRIVACY & SECURITY
      ====================================================== */}

      <SettingsSection
        icon={<Lock size={20} />}
        title="Privacy & Security"
        description="Controls for protecting sensitive victim information."
      >

        <div className="divide-y divide-slate-100">

          <SettingToggleRow
            title="Masked victim identifier"
            description="Display masked victim IDs instead of unnecessary personally identifying information."
            enabled={settings.anonymizeVictimId}
            onChange={(value) =>
              updateSetting(
                "anonymizeVictimId",
                value
              )
            }
            locked
          />

          <SettingToggleRow
            title="Role-based access"
            description="Access to cases and analytics is restricted according to the logged-in role."
            enabled={true}
            onChange={() => {}}
            locked
          />

          <SettingToggleRow
            title="Audit logging"
            description="Record important administrative actions for accountability."
            enabled={true}
            onChange={() => {}}
            locked
          />

        </div>

      </SettingsSection>


      {/* =====================================================
          REPORTING
      ====================================================== */}

      <SettingsSection
        icon={<SettingsIcon size={20} />}
        title="Reports & Automation"
        description="Configure district-level reporting preferences."
      >

        <SettingToggleRow
          title="Automatic daily report"
          description="Generate a daily district monitoring summary for authorized officers."
          enabled={settings.autoGenerateReports}
          onChange={(value) =>
            updateSetting(
              "autoGenerateReports",
              value
            )
          }
        />

        <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-slate-50">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-800">
                Report contents
              </p>

              <p className="text-xs text-slate-500 mt-1">
                High-risk cases • Critical alerts •
                Pending follow-ups • Check-in trends
              </p>

            </div>

            <ChevronRight
              size={19}
              className="text-slate-400"
            />

          </div>

        </div>

      </SettingsSection>


      {/* =====================================================
          ACCOUNT
      ====================================================== */}

      <SettingsSection
        icon={<UserRound size={20} />}
        title="Account"
        description="Current SAMVEDNA user and access information."
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <InfoCard
            label="User"
            value={
              localStorage.getItem(
                "samvedna_user"
              ) || "District Officer"
            }
          />

          <InfoCard
            label="Role"
            value="District Officer"
          />

          <InfoCard
            label="Access"
            value="District-level"
          />

        </div>

      </SettingsSection>


      {/* =====================================================
          FOOT NOTE
      ====================================================== */}

      <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100">

        <div className="flex items-start gap-3">

          <ShieldCheck
            size={20}
            className="text-indigo-600 mt-0.5 shrink-0"
          />

          <div>

            <p className="text-sm font-semibold text-indigo-900">
              SAMVEDNA — Human-centred AI monitoring
            </p>

            <p className="text-xs text-indigo-700 mt-1 leading-5">
              AI provides early-warning and decision-support
              signals. It does not diagnose mental illness,
              prescribe treatment or make legal decisions.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   REUSABLE COMPONENTS
============================================================ */

function StatusCard({
  icon,
  title,
  value,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: "indigo" | "emerald" | "amber";
}) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <p className="text-xl font-bold text-slate-900 mt-1">
            {value}
          </p>

        </div>

        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}
        >
          {icon}
        </div>

      </div>

      <p className="text-xs text-slate-400 mt-3">
        {description}
      </p>

    </div>
  );
}


function SettingsSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

      <div className="px-6 py-5 border-b border-slate-100">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            {icon}
          </div>

          <div>

            <h2 className="text-base font-bold text-slate-900">
              {title}
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              {description}
            </p>

          </div>

        </div>

      </div>

      <div className="p-6">
        {children}
      </div>

    </section>
  );
}


function SelectSetting({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-slate-200
          bg-white
          text-sm
          text-slate-800
          outline-none
          focus:border-indigo-500
          focus:ring-4
          focus:ring-indigo-100
        "
      >

        {options.map(([optionValue, label]) => (
          <option
            key={optionValue}
            value={optionValue}
          >
            {label}
          </option>
        ))}

      </select>

    </div>
  );
}


function RangeSetting({
  label,
  value,
  min,
  max,
  onChange,
  description,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  description: string;
}) {
  return (
    <div>

      <div className="flex items-center justify-between mb-2">

        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>

        <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-bold">
          {value}
        </span>

      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) =>
          onChange(
            Number(event.target.value)
          )
        }
        className="w-full accent-indigo-600"
      />

      <div className="flex justify-between text-[11px] text-slate-400 mt-1">

        <span>{min}</span>

        <span>{max}</span>

      </div>

      <p className="text-xs text-slate-500 mt-2 leading-5">
        {description}
      </p>

    </div>
  );
}


function ToggleCard({
  icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div
      className={`
        border
        rounded-2xl
        p-5
        transition
        ${
          enabled
            ? "border-indigo-200 bg-indigo-50/40"
            : "border-slate-200 bg-white"
        }
      `}
    >

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center">
            {icon}
          </div>

          <div>

            <p className="text-sm font-bold text-slate-800">
              {title}
            </p>

            <p className="text-xs text-slate-500 mt-1 leading-5">
              {description}
            </p>

          </div>

        </div>

        <Switch
          enabled={enabled}
          onChange={onChange}
        />

      </div>

    </div>
  );
}


function SettingToggleRow({
  title,
  description,
  enabled,
  onChange,
  locked = false,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
  locked?: boolean;
}) {
  return (
    <div className="py-5 flex items-center justify-between gap-5">

      <div>

        <div className="flex items-center gap-2">

          <p className="text-sm font-semibold text-slate-800">
            {title}
          </p>

          {locked && (
            <Lock
              size={13}
              className="text-slate-400"
            />
          )}

        </div>

        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-5">
          {description}
        </p>

      </div>

      <Switch
        enabled={enabled}
        onChange={onChange}
        disabled={locked}
      />

    </div>
  );
}


function Switch({
  enabled,
  onChange,
  disabled = false,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() =>
        !disabled && onChange(!enabled)
      }
      className={`
        relative
        w-11
        h-6
        rounded-full
        transition
        shrink-0
        ${
          enabled
            ? "bg-indigo-600"
            : "bg-slate-300"
        }
        ${
          disabled
            ? "opacity-70 cursor-not-allowed"
            : "cursor-pointer"
        }
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
          shadow
          transition
          ${
            enabled
              ? "left-6"
              : "left-1"
          }
        `}
      />

    </button>
  );
}


function RiskBadge({
  label,
  range,
  color,
}: {
  label: string;
  range: string;
  color: "green" | "yellow" | "orange" | "red";
}) {
  const styles = {
    green:
      "bg-emerald-50 border-emerald-200 text-emerald-700",
    yellow:
      "bg-yellow-50 border-yellow-200 text-yellow-700",
    orange:
      "bg-orange-50 border-orange-200 text-orange-700",
    red:
      "bg-red-50 border-red-200 text-red-700",
  };

  return (
    <div
      className={`border rounded-xl p-3 ${styles[color]}`}
    >

      <p className="text-xs font-bold">
        {label}
      </p>

      <p className="text-xs mt-1 opacity-80">
        Score {range}
      </p>

    </div>
  );
}


function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="text-sm font-semibold text-slate-800 mt-1 truncate">
        {value}
      </p>

    </div>
  );
}