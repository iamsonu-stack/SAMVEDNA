import React from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Phone,
  UserRound,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

type Intervention = {
  id: string;
  caseId: string;
  category: string;
  risk: "Critical" | "High" | "Moderate";
  type: string;
  date: string;
  time: string;
  status: "Scheduled" | "Completed" | "Pending";
  mode: "Phone" | "In Person" | "Video Call";
  notes: string;
};

const interventions: Intervention[] = [
  {
    id: "INT-1025",
    caseId: "CASE-1025",
    category: "Caste-based Violence",
    risk: "Critical",
    type: "Counselling Session",
    date: "28 Sep 2026",
    time: "10:30 AM",
    status: "Scheduled",
    mode: "Phone",
    notes:
      "Follow-up recommended after significant increase in distress indicators.",
  },
  {
    id: "INT-1088",
    caseId: "CASE-1088",
    category: "Threat / Intimidation",
    risk: "High",
    type: "Well-being Follow-up",
    date: "28 Sep 2026",
    time: "12:00 PM",
    status: "Scheduled",
    mode: "Phone",
    notes:
      "Check recent fear and stress responses and document support requirements.",
  },
  {
    id: "INT-1114",
    caseId: "CASE-1114",
    category: "Atrocity-related Case",
    risk: "High",
    type: "Counselling Session",
    date: "29 Sep 2026",
    time: "11:00 AM",
    status: "Scheduled",
    mode: "In Person",
    notes:
      "Review recent check-in pattern and discuss available support options.",
  },
  {
    id: "INT-1102",
    caseId: "CASE-1102",
    category: "Grievous Hurt",
    risk: "Moderate",
    type: "Follow-up Review",
    date: "26 Sep 2026",
    time: "03:00 PM",
    status: "Completed",
    mode: "Phone",
    notes:
      "Follow-up completed. Current monitoring indicators appear stable.",
  },
];

function riskClasses(risk: Intervention["risk"]) {
  switch (risk) {
    case "Critical":
      return "bg-red-50 text-red-600 border-red-200";

    case "High":
      return "bg-orange-50 text-orange-600 border-orange-200";

    default:
      return "bg-amber-50 text-amber-600 border-amber-200";
  }
}

function statusClasses(status: Intervention["status"]) {
  switch (status) {
    case "Completed":
      return "bg-emerald-50 text-emerald-600";

    case "Scheduled":
      return "bg-indigo-50 text-indigo-600";

    default:
      return "bg-amber-50 text-amber-600";
  }
}

function modeIcon(mode: Intervention["mode"]) {
  if (mode === "Phone") {
    return <Phone size={15} />;
  }

  if (mode === "Video Call") {
    return <MessageSquare size={15} />;
  }

  return <UserRound size={15} />;
}

export default function CounsellorInterventionsPage() {
  const scheduledCount = interventions.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const completedCount = interventions.filter(
    (item) => item.status === "Completed"
  ).length;

  const criticalCount = interventions.filter(
    (item) => item.risk === "Critical"
  ).length;

  const pendingCount = interventions.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex items-start gap-4">

          <Link
            to="/counsellor-dashboard"
            className="
              w-10
              h-10
              rounded-xl
              border
              border-slate-200
              flex
              items-center
              justify-center
              text-slate-600
              hover:bg-slate-50
              transition
              flex-shrink-0
            "
          >
            <ArrowLeft size={20} />
          </Link>

          <div>

            <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
              COUNSELLOR WORKSPACE
            </p>

            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              My Interventions
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage counselling sessions, follow-ups and support
              interventions for your assigned cases.
            </p>

          </div>

        </div>

      </div>


      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* SCHEDULED */}

        <div className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Scheduled
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {scheduledCount}
              </p>

              <p className="text-xs text-indigo-500 font-semibold mt-1">
                Upcoming interventions
              </p>

            </div>

            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
              <CalendarDays
                size={21}
                className="text-indigo-500"
              />
            </div>

          </div>

        </div>


        {/* COMPLETED */}

        <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {completedCount}
              </p>

              <p className="text-xs text-emerald-500 font-semibold mt-1">
                Completed support
              </p>

            </div>

            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle2
                size={21}
                className="text-emerald-500"
              />
            </div>

          </div>

        </div>


        {/* CRITICAL */}

        <div className="bg-white rounded-2xl border border-red-100 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Critical Cases
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {criticalCount}
              </p>

              <p className="text-xs text-red-500 font-semibold mt-1">
                Requires close attention
              </p>

            </div>

            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle
                size={21}
                className="text-red-500"
              />
            </div>

          </div>

        </div>


        {/* PENDING */}

        <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Pending
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {pendingCount}
              </p>

              <p className="text-xs text-amber-500 font-semibold mt-1">
                Awaiting action
              </p>

            </div>

            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock
                size={21}
                className="text-amber-500"
              />
            </div>

          </div>

        </div>

      </div>


      {/* INTERVENTION LIST */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="p-5 border-b border-slate-200">

          <div className="flex items-center justify-between gap-4">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Intervention Schedule
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Counselling and follow-up activities for your assigned cases.
              </p>

            </div>

            <div className="hidden sm:block px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-semibold">
              {interventions.length} Activities
            </div>

          </div>

        </div>


        <div className="divide-y divide-slate-100">

          {interventions.map((item) => (

            <div
              key={item.id}
              className="p-5 hover:bg-slate-50 transition"
            >

              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                {/* LEFT */}

                <div className="flex items-start gap-4">

                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">

                    <FileText
                      size={20}
                      className="text-indigo-600"
                    />

                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <p className="font-bold text-slate-900">
                        {item.type}
                      </p>

                      <span
                        className={`
                          px-2.5
                          py-1
                          rounded-full
                          text-[11px]
                          font-bold
                          border
                          ${riskClasses(item.risk)}
                        `}
                      >
                        {item.risk}
                      </span>

                      <span
                        className={`
                          px-2.5
                          py-1
                          rounded-full
                          text-[11px]
                          font-semibold
                          ${statusClasses(item.status)}
                        `}
                      >
                        {item.status}
                      </span>

                    </div>

                    <p className="text-sm font-semibold text-indigo-600 mt-1">
                      {item.caseId}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      {item.category}
                    </p>

                  </div>

                </div>


                {/* DETAILS */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xl:min-w-[500px]">

                  {/* DATE */}

                  <div>

                    <p className="text-xs text-slate-400 uppercase font-semibold">
                      Date & Time
                    </p>

                    <div className="flex items-center gap-2 mt-1 text-sm font-semibold text-slate-700">

                      <CalendarDays
                        size={15}
                        className="text-slate-400"
                      />

                      {item.date}

                    </div>

                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">

                      <Clock size={14} />

                      {item.time}

                    </div>

                  </div>


                  {/* MODE */}

                  <div>

                    <p className="text-xs text-slate-400 uppercase font-semibold">
                      Mode
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-slate-700">

                      {modeIcon(item.mode)}

                      {item.mode}

                    </div>

                  </div>


                  {/* CASE LINK */}

                  <div>

                    <p className="text-xs text-slate-400 uppercase font-semibold">
                      Case
                    </p>

                    <Link
                      to={`/counsellor-case/${item.caseId}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        mt-2
                        text-sm
                        font-semibold
                        text-indigo-600
                        hover:text-indigo-700
                      "
                    >
                      View Case →
                    </Link>

                  </div>

                </div>

              </div>


              {/* NOTES */}

              <div className="mt-4 ml-0 xl:ml-15">

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">

                  <p className="text-xs font-semibold text-slate-500">
                    Intervention Note
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    {item.notes}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* WORKFLOW */}

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">

        <h3 className="font-bold text-indigo-800">
          Counsellor Intervention Workflow
        </h3>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">

          <span className="px-3 py-2 rounded-lg bg-white border border-indigo-100 text-slate-700">
            AI Alert
          </span>

          <span className="text-indigo-400">→</span>

          <span className="px-3 py-2 rounded-lg bg-white border border-indigo-100 text-slate-700">
            Human Review
          </span>

          <span className="text-indigo-400">→</span>

          <span className="px-3 py-2 rounded-lg bg-white border border-indigo-100 text-slate-700">
            Counsellor Contact
          </span>

          <span className="text-indigo-400">→</span>

          <span className="px-3 py-2 rounded-lg bg-white border border-indigo-100 text-slate-700">
            Support
          </span>

          <span className="text-indigo-400">→</span>

          <span className="px-3 py-2 rounded-lg bg-white border border-indigo-100 text-slate-700">
            Follow-up
          </span>

        </div>

      </div>


      {/* NOTICE */}

      <div className="flex gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">

        <CheckCircle2
          size={19}
          className="text-indigo-500 flex-shrink-0 mt-0.5"
        />

        <p className="text-xs text-slate-500 leading-5">
          This page shows intervention activities assigned to the
          logged-in counsellor. AI-generated risk indicators are
          decision-support signals only and do not constitute a
          clinical diagnosis or automatic legal decision.
        </p>

      </div>

    </div>
  );
}