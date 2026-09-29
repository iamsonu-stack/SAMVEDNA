import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Eye,
  CalendarDays,
  MapPin,
} from "lucide-react";

type AssignedCase = {
  id: string;
  category: string;
  district: string;
  risk: "Critical" | "High" | "Moderate" | "Low";
  distressScore: number;
  assignedOn: string;
  lastCheckIn: string;
  status: string;
};

const assignedCases: AssignedCase[] = [
  {
    id: "CASE-1025",
    category: "Caste-based Violence",
    district: "Indore",
    risk: "Critical",
    distressScore: 84,
    assignedOn: "24 Sep 2026",
    lastCheckIn: "2 hours ago",
    status: "Needs Attention",
  },
  {
    id: "CASE-1088",
    category: "Threat / Intimidation",
    district: "Indore",
    risk: "High",
    distressScore: 78,
    assignedOn: "23 Sep 2026",
    lastCheckIn: "5 hours ago",
    status: "Follow-up Pending",
  },
  {
    id: "CASE-1114",
    category: "Atrocity-related Case",
    district: "Indore",
    risk: "High",
    distressScore: 72,
    assignedOn: "21 Sep 2026",
    lastCheckIn: "Yesterday",
    status: "Follow-up Pending",
  },
  {
    id: "CASE-1102",
    category: "Grievous Hurt",
    district: "Indore",
    risk: "Moderate",
    distressScore: 43,
    assignedOn: "18 Sep 2026",
    lastCheckIn: "2 days ago",
    status: "Stable",
  },
];

function riskClasses(risk: AssignedCase["risk"]) {
  switch (risk) {
    case "Critical":
      return "bg-red-50 text-red-600 border-red-200";

    case "High":
      return "bg-orange-50 text-orange-600 border-orange-200";

    case "Moderate":
      return "bg-amber-50 text-amber-600 border-amber-200";

    default:
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
  }
}

function statusClasses(status: string) {
  if (status === "Needs Attention") {
    return "bg-red-50 text-red-600";
  }

  if (status === "Follow-up Pending") {
    return "bg-orange-50 text-orange-600";
  }

  return "bg-emerald-50 text-emerald-600";
}

export default function MyAssignedCasesPage() {
  const criticalCases = assignedCases.filter(
    (item) => item.risk === "Critical"
  ).length;

  const highRiskCases = assignedCases.filter(
    (item) => item.risk === "High"
  ).length;

  const pendingFollowUps = assignedCases.filter(
    (item) => item.status === "Follow-up Pending"
  ).length;

  const stableCases = assignedCases.filter(
    (item) => item.status === "Stable"
  ).length;

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-4">

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
            "
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
              COUNSELLOR WORKSPACE
            </p>

            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              My Assigned Cases
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Cases assigned to you for counselling, monitoring and follow-up.
            </p>
          </div>

        </div>
      </div>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* CRITICAL */}

        <div className="bg-white rounded-2xl border border-red-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Critical Cases
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {criticalCases}
              </p>

              <p className="text-xs text-red-500 font-semibold mt-1">
                Immediate attention
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

        {/* HIGH */}

        <div className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                High Risk
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {highRiskCases}
              </p>

              <p className="text-xs text-orange-500 font-semibold mt-1">
                Serious cases
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
              <AlertTriangle
                size={21}
                className="text-orange-500"
              />
            </div>

          </div>
        </div>

        {/* FOLLOW UPS */}

        <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Pending Follow-ups
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {pendingFollowUps}
              </p>

              <p className="text-xs text-amber-500 font-semibold mt-1">
                Counselling required
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

        {/* STABLE */}

        <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Stable Cases
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {stableCases}
              </p>

              <p className="text-xs text-emerald-500 font-semibold mt-1">
                Recent intervention stable
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

      </div>

      {/* ASSIGNED CASE TABLE */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="p-5 border-b border-slate-200 flex items-center justify-between">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Assigned Cases
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Only cases assigned to the logged-in counsellor are shown.
            </p>
          </div>

          <div className="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-semibold">
            {assignedCases.length} Active Cases
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Case
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Category
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  District
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Risk
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Assigned On
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Last Check-in
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Status
                </th>

                <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {assignedCases.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >

                  <td className="px-5 py-5">
                    <p className="font-bold text-slate-800">
                      {item.id}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Distress Score: {item.distressScore}/100
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <p className="text-sm font-medium text-slate-700">
                      {item.category}
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin size={15} />
                      {item.district}
                    </div>
                  </td>

                  <td className="px-5 py-5">

                    <span
                      className={`
                        inline-flex
                        items-center
                        px-3
                        py-1
                        rounded-full
                        border
                        text-xs
                        font-bold
                        ${riskClasses(item.risk)}
                      `}
                    >
                      {item.risk}
                    </span>

                  </td>

                  <td className="px-5 py-5">

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarDays size={15} />
                      {item.assignedOn}
                    </div>

                  </td>

                  <td className="px-5 py-5">
                    <span className="text-sm text-slate-600">
                      {item.lastCheckIn}
                    </span>
                  </td>

                  <td className="px-5 py-5">

                    <span
                      className={`
                        inline-flex
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${statusClasses(item.status)}
                      `}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* VIEW CASE */}

                  <td className="px-5 py-5 text-right">

                    <Link
                      to={`/counsellor-case/${encodeURIComponent(item.id)}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-lg
                        bg-indigo-50
                        text-indigo-600
                        hover:bg-indigo-600
                        hover:text-white
                        transition
                        text-sm
                        font-semibold
                      "
                    >
                      <Eye size={16} />
                      View Case
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ACCESS NOTICE */}

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">

        <p className="text-sm font-semibold text-indigo-700">
          Counsellor access
        </p>

        <p className="text-xs text-indigo-600 mt-1">
          You can view only the cases assigned to your counselling
          workload. Sensitive personal information should remain masked
          unless access is specifically authorized.
        </p>

      </div>

    </div>
  );
}