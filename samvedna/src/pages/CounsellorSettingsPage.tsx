import React, { useState } from "react";
import {
  UserCircle,
  Bell,
  ShieldCheck,
  Lock,
  Save,
  Mail,
  Phone,
  MapPin,
  BriefcaseMedical,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function CounsellorSettingsPage() {
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: localStorage.getItem("samvedna_user") || "Counsellor",
    counsellorId: "CNS-1042",
    district: "Indore",
    state: "Madhya Pradesh",
    specialization: "Trauma & Victim Support",
    phone: "+91 XXXXX XXXXX",
    email: "counsellor@samvedna.gov.in",
    availability: "Available",
  });

  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    highRiskAlerts: true,
    sessionReminder: true,
    followUpReminder: true,
    checkInUpdates: true,
  });

  const [security, setSecurity] = useState({
    loginAlerts: true,
    twoFactor: false,
  });

  const handleSave = () => {
    localStorage.setItem("samvedna_user", profile.name);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div className="bg-white border border-slate-200 rounded-2xl p-6">

        <div className="flex items-start justify-between">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Settings
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage your counsellor profile, notifications and security.
            </p>
          </div>

          {saved && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium">
              <CheckCircle2 size={17} />
              Changes saved
            </div>
          )}

        </div>

      </div>


      {/* ================= PROFILE ================= */}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <UserCircle
                size={22}
                className="text-indigo-600"
              />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Counsellor Profile
              </h2>

              <p className="text-sm text-slate-500">
                Your professional information
              </p>
            </div>

          </div>

        </div>


        <div className="p-6">

          {/* PROFILE TOP */}

          <div className="flex items-center gap-5 mb-8">

            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">

              <UserCircle
                size={45}
                className="text-indigo-600"
              />

            </div>

            <div>

              <h3 className="text-xl font-bold text-slate-900">
                {profile.name}
              </h3>

              <p className="text-sm text-slate-500">
                {profile.specialization}
              </p>

              <div className="flex items-center gap-2 mt-2">

                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  {profile.availability}
                </span>

                <span className="text-xs text-slate-400">
                  ID: {profile.counsellorId}
                </span>

              </div>

            </div>

          </div>


          {/* FORM */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* NAME */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>

              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>


            {/* COUNSELLOR ID */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Counsellor ID
              </label>

              <input
                value={profile.counsellorId}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
              />
            </div>


            {/* DISTRICT */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                District
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-4 top-3.5 text-slate-400"
                />

                <input
                  value={profile.district}
                  disabled
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                />

              </div>
            </div>


            {/* STATE */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                State
              </label>

              <input
                value={profile.state}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
              />
            </div>


            {/* SPECIALIZATION */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Specialization
              </label>

              <div className="relative">

                <BriefcaseMedical
                  size={18}
                  className="absolute left-4 top-3.5 text-slate-400"
                />

                <input
                  value={profile.specialization}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      specialization: e.target.value,
                    })
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>
            </div>


            {/* AVAILABILITY */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Availability
              </label>

              <select
                value={profile.availability}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    availability: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Available</option>
                <option>Busy</option>
                <option>Offline</option>
              </select>
            </div>


            {/* PHONE */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contact Number
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-4 top-3.5 text-slate-400"
                />

                <input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      phone: e.target.value,
                    })
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>
            </div>


            {/* EMAIL */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Official Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-3.5 text-slate-400"
                />

                <input
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      email: e.target.value,
                    })
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>
            </div>

          </div>


          {/* SAVE */}

          <div className="flex justify-end mt-6">

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              <Save size={18} />
              Save Profile
            </button>

          </div>

        </div>

      </div>


      {/* ================= NOTIFICATIONS ================= */}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Bell
                size={21}
                className="text-amber-600"
              />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Notifications
              </h2>

              <p className="text-sm text-slate-500">
                Choose which updates you want to receive.
              </p>
            </div>

          </div>

        </div>


        <div className="divide-y divide-slate-100">

          <SettingToggle
            title="Critical Risk Alerts"
            description="Receive immediate alerts for critical-risk assigned cases."
            checked={notifications.criticalAlerts}
            onChange={(value) =>
              setNotifications({
                ...notifications,
                criticalAlerts: value,
              })
            }
          />

          <SettingToggle
            title="High Risk Alerts"
            description="Get notified when an assigned case shows significant risk escalation."
            checked={notifications.highRiskAlerts}
            onChange={(value) =>
              setNotifications({
                ...notifications,
                highRiskAlerts: value,
              })
            }
          />

          <SettingToggle
            title="Counselling Session Reminders"
            description="Receive reminders for upcoming counselling sessions."
            checked={notifications.sessionReminder}
            onChange={(value) =>
              setNotifications({
                ...notifications,
                sessionReminder: value,
              })
            }
          />

          <SettingToggle
            title="Follow-up Reminders"
            description="Get reminders when a victim follow-up is due."
            checked={notifications.followUpReminder}
            onChange={(value) =>
              setNotifications({
                ...notifications,
                followUpReminder: value,
              })
            }
          />

          <SettingToggle
            title="Check-in Updates"
            description="Receive updates when an assigned victim submits a check-in."
            checked={notifications.checkInUpdates}
            onChange={(value) =>
              setNotifications({
                ...notifications,
                checkInUpdates: value,
              })
            }
          />

        </div>

      </div>


      {/* ================= SECURITY ================= */}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <ShieldCheck
                size={21}
                className="text-emerald-600"
              />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Security & Privacy
              </h2>

              <p className="text-sm text-slate-500">
                Manage your account security.
              </p>
            </div>

          </div>

        </div>


        <div className="divide-y divide-slate-100">

          <SettingToggle
            title="Login Activity Alerts"
            description="Get notified when your account is accessed from a new device."
            checked={security.loginAlerts}
            onChange={(value) =>
              setSecurity({
                ...security,
                loginAlerts: value,
              })
            }
          />

          <SettingToggle
            title="Two-Factor Authentication"
            description="Add an additional security layer to your counsellor account."
            checked={security.twoFactor}
            onChange={(value) =>
              setSecurity({
                ...security,
                twoFactor: value,
              })
            }
          />

        </div>


        <div className="p-6">

          <button
            className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              border
              border-slate-200
              text-slate-700
              font-semibold
              hover:bg-slate-50
              transition
            "
          >
            <Lock size={18} />
            Change Password
          </button>

        </div>

      </div>


      {/* ================= WORKING HOURS ================= */}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Clock
                size={21}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Counselling Availability
              </h2>

              <p className="text-sm text-slate-500">
                Define your usual counselling hours.
              </p>
            </div>

          </div>

        </div>


        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Start Time
            </label>

            <input
              type="time"
              defaultValue="09:00"
              className="w-full px-4 py-3 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              End Time
            </label>

            <input
              type="time"
              defaultValue="17:00"
              className="w-full px-4 py-3 rounded-xl border border-slate-200"
            />
          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   TOGGLE COMPONENT
========================================================= */

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="px-6 py-5 flex items-center justify-between gap-6">

      <div>

        <h3 className="text-sm font-semibold text-slate-900">
          {title}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {description}
        </p>

      </div>


      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`
          relative
          w-12
          h-6
          rounded-full
          transition
          flex-shrink-0
          ${checked ? "bg-indigo-600" : "bg-slate-300"}
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
            ${checked ? "left-7" : "left-1"}
          `}
        />

      </button>

    </div>
  );
}