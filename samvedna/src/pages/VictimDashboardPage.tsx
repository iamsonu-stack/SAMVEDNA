import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardCheck,
  MessageCircle,
  User,
  LogOut,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

export default function VictimDashboardPage() {
  const navigate = useNavigate();

  const victimId =
    localStorage.getItem("samvedna_victim_id") ||
    "V-XXXX";

  const profile = JSON.parse(
    localStorage.getItem(
      "samvedna_victim_profile"
    ) || "{}"
  );

  const logout = () => {
    localStorage.removeItem(
      "samvedna_victim_authenticated"
    );

    localStorage.removeItem(
      "samvedna_victim_id"
    );

    localStorage.removeItem(
      "samvedna_victim_profile"
    );

    navigate("/victim-login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="bg-white border-b border-slate-200">

        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h1 className="font-bold text-slate-900">
                SAMVEDNA
              </h1>

              <p className="text-xs text-slate-500">
                Victim Well-being Support
              </p>
            </div>

          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600"
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>

      </header>

      <main className="max-w-6xl mx-auto px-5 py-8">

        {/* WELCOME */}

        <section className="bg-slate-950 text-white rounded-3xl p-7">

          <p className="text-sm text-indigo-300">
            Welcome
          </p>

          <h1 className="text-3xl font-bold mt-2">
            {profile.name || "Victim / Complainant"}
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            Victim ID: {victimId}
          </p>

          <p className="text-sm text-slate-400 mt-5 max-w-2xl leading-6">
            Use SAMVEDNA voluntarily to complete
            well-being check-ins, communicate with the
            support assistant and view available
            follow-up information.
          </p>

        </section>

        {/* ACTION CARDS */}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

          <ActionCard
            icon={ClipboardCheck}
            title="Well-being Check-in"
            text="Answer a few short questions about how you are feeling."
            button="Start Check-in"
            onClick={() =>
              navigate("/victim-checkin")
            }
            color="indigo"
          />

          <ActionCard
            icon={MessageCircle}
            title="SAMVEDNA Chatbot"
            text="Share how you are feeling through the support chatbot."
            button="Open Chatbot"
            onClick={() =>
              navigate("/victim-chatbot")
            }
            color="emerald"
          />

          <ActionCard
            icon={User}
            title="My Profile"
            text="View the information you provided to SAMVEDNA."
            button="View Profile"
            onClick={() =>
              navigate("/victim-profile")
            }
            color="amber"
          />

        </section>

        {/* SUPPORT */}

        <section className="mt-6 bg-white border border-slate-200 rounded-2xl p-6">

          <div className="flex items-start gap-4">

            <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center">
              <HeartHandshake
                size={21}
                className="text-rose-600"
              />
            </div>

            <div>

              <h2 className="font-bold text-slate-900">
                Human support
              </h2>

              <p className="text-sm text-slate-500 mt-1 leading-6">
                SAMVEDNA is an early-warning and
                decision-support system. It does not
                diagnose mental illness. Where appropriate,
                authorized personnel may review well-being
                indicators and coordinate support.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  text,
  button,
  onClick,
  color,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
  button: string;
  onClick: () => void;
  color: "indigo" | "emerald" | "amber";
}) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[color]}`}
      >
        <Icon size={21} />
      </div>

      <h2 className="text-lg font-bold text-slate-900 mt-5">
        {title}
      </h2>

      <p className="text-sm text-slate-500 mt-2 leading-6">
        {text}
      </p>

      <button
        onClick={onClick}
        className="w-full mt-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold"
      >
        {button}
      </button>

    </div>
  );
}