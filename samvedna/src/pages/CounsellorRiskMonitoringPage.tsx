import React from "react";
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Eye,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

type RiskCase = {
  id: string;
  category: string;
  district: string;
  score: number;
  previousScore: number;
  risk: "Critical" | "High" | "Moderate" | "Low";
  trend: number[];
  trendStatus: "Increasing" | "Decreasing" | "Stable";
  lastCheckIn: string;
  checkInStatus: "Recent" | "Pending" | "Missed";
  status: string;
};

const riskCases: RiskCase[] = [
  {
    id: "CASE-1025",
    category: "Caste-based Violence",
    district: "Indore",
    score: 84,
    previousScore: 72,
    risk: "Critical",
    trend: [25, 31, 44, 59, 78, 84],
    trendStatus: "Increasing",
    lastCheckIn: "2 hours ago",
    checkInStatus: "Recent",
    status: "Needs Attention",
  },

  {
    id: "CASE-1088",
    category: "Threat / Intimidation",
    district: "Indore",
    score: 78,
    previousScore: 61,
    risk: "High",
    trend: [42, 49, 61, 72, 78],
    trendStatus: "Increasing",
    lastCheckIn: "5 hours ago",
    checkInStatus: "Recent",
    status: "Follow-up Pending",
  },

  {
    id: "CASE-1114",
    category: "Atrocity-related Case",
    district: "Indore",
    score: 72,
    previousScore: 65,
    risk: "High",
    trend: [48, 53, 59, 65, 72],
    trendStatus: "Increasing",
    lastCheckIn: "Yesterday",
    checkInStatus: "Pending",
    status: "Follow-up Pending",
  },

  {
    id: "CASE-1102",
    category: "Grievous Hurt",
    district: "Indore",
    score: 43,
    previousScore: 51,
    risk: "Moderate",
    trend: [68, 62, 55, 43],
    trendStatus: "Decreasing",
    lastCheckIn: "2 days ago",
    checkInStatus: "Pending",
    status: "Stable",
  },

  {
    id: "CASE-1130",
    category: "Threat / Intimidation",
    district: "Indore",
    score: 56,
    previousScore: 55,
    risk: "Moderate",
    trend: [51, 53, 54, 55, 56],
    trendStatus: "Stable",
    lastCheckIn: "Yesterday",
    checkInStatus: "Recent",
    status: "Monitoring",
  },

  {
    id: "CASE-1142",
    category: "Other Atrocity-related Case",
    district: "Indore",
    score: 28,
    previousScore: 34,
    risk: "Low",
    trend: [42, 38, 35, 31, 28],
    trendStatus: "Decreasing",
    lastCheckIn: "3 days ago",
    checkInStatus: "Missed",
    status: "Monitoring",
  },
];

/* =====================================================
   RISK COLORS
===================================================== */

function riskClasses(
  risk: RiskCase["risk"]
) {
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

/* =====================================================
   TREND ICON
===================================================== */

function TrendIcon({
  trend,
}: {
  trend: RiskCase["trendStatus"];
}) {
  if (trend === "Increasing") {
    return (
      <TrendingUp
        size={17}
        className="text-red-500"
      />
    );
  }

  if (trend === "Decreasing") {
    return (
      <TrendingDown
        size={17}
        className="text-emerald-500"
      />
    );
  }

  return (
    <Minus
      size={17}
      className="text-slate-400"
    />
  );
}

/* =====================================================
   TREND COLOR
===================================================== */

function trendColor(
  trend: RiskCase["trendStatus"]
) {
  if (trend === "Increasing") {
    return "text-red-600";
  }

  if (trend === "Decreasing") {
    return "text-emerald-600";
  }

  return "text-slate-500";
}

/* =====================================================
   CHECK-IN STATUS
===================================================== */

function checkInClasses(
  status: RiskCase["checkInStatus"]
) {
  if (status === "Recent") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (status === "Missed") {
    return "bg-red-50 text-red-600";
  }

  return "bg-amber-50 text-amber-600";
}

/* =====================================================
   MAIN PAGE
===================================================== */

export default function RiskMonitoringPage() {

  /* =====================================================
     SUMMARY
  ===================================================== */

  const criticalCases = riskCases.filter(
    (item) => item.risk === "Critical"
  ).length;

  const highRiskCases = riskCases.filter(
    (item) => item.risk === "High"
  ).length;

  const increasingCases = riskCases.filter(
    (item) => item.trendStatus === "Increasing"
  ).length;

  const pendingCheckIns = riskCases.filter(
    (item) =>
      item.checkInStatus === "Pending" ||
      item.checkInStatus === "Missed"
  ).length;

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <div className="flex items-center gap-2">

              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">

                <Activity
                  size={21}
                  className="text-indigo-600"
                />

              </div>

              <div>

                <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                  COUNSELLOR MONITORING
                </p>

                <h1 className="text-2xl font-bold text-slate-900">
                  Risk Monitoring
                </h1>

              </div>

            </div>

            <p className="text-sm text-slate-500 mt-3">
              Monitor distress trends and risk changes across your
              assigned cases.
            </p>

          </div>


          <div className="px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-100">

            <p className="text-xs text-indigo-500 font-semibold">
              Assigned Cases
            </p>

            <p className="text-2xl font-bold text-indigo-700 mt-1">
              {riskCases.length}
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* CRITICAL */}

        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Critical Risk
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {criticalCases}
              </p>

              <p className="text-xs text-red-500 font-semibold mt-1">
                Human review required
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

        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                High Risk
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {highRiskCases}
              </p>

              <p className="text-xs text-orange-500 font-semibold mt-1">
                Close monitoring
              </p>

            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">

              <Activity
                size={21}
                className="text-orange-500"
              />

            </div>

          </div>

        </div>


        {/* INCREASING */}

        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Rising Distress
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {increasingCases}
              </p>

              <p className="text-xs text-red-500 font-semibold mt-1">
                Increasing trend
              </p>

            </div>

            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">

              <TrendingUp
                size={21}
                className="text-red-500"
              />

            </div>

          </div>

        </div>


        {/* CHECK-IN */}

        <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Check-ins Pending
              </p>

              <p className="text-3xl font-bold text-slate-900 mt-2">
                {pendingCheckIns}
              </p>

              <p className="text-xs text-amber-500 font-semibold mt-1">
                Follow-up may be required
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


      {/* =================================================
          AI MONITORING INSIGHT
      ================================================= */}

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">

        <div className="flex gap-3">

          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">

            <Activity
              size={19}
              className="text-indigo-600"
            />

          </div>

          <div>

            <h2 className="text-sm font-bold text-indigo-800">
              Monitoring Insight
            </h2>

            <p className="text-sm text-indigo-700 mt-1 leading-6">
              {increasingCases} assigned cases currently show an
              increasing distress trend. Review the longitudinal
              pattern and recent check-ins before taking action.
            </p>

            <p className="text-xs text-indigo-500 mt-2">
              AI indicators are decision-support signals and are not
              a clinical diagnosis.
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          CASE MONITORING TABLE
      ================================================= */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* TABLE HEADER */}

        <div className="p-5 border-b border-slate-200">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Assigned Case Risk Monitor
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Longitudinal monitoring of distress indicators for
              assigned cases.
            </p>

          </div>

        </div>


        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead>

              <tr className="bg-slate-50 border-b border-slate-200">

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Case
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Current Score
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Previous
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Risk
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Trend
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

              {riskCases.map((item) => {

                const scoreChange =
                  item.score - item.previousScore;

                return (

                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >

                    {/* CASE */}

                    <td className="px-5 py-5">

                      <p className="font-bold text-slate-800">
                        {item.id}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {item.category}
                      </p>

                    </td>


                    {/* CURRENT SCORE */}

                    <td className="px-5 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">

                          <span className="text-lg font-bold text-slate-800">
                            {item.score}
                          </span>

                        </div>

                        <span className="text-xs text-slate-400">
                          / 100
                        </span>

                      </div>

                    </td>


                    {/* PREVIOUS */}

                    <td className="px-5 py-5">

                      <div>

                        <p className="text-sm font-semibold text-slate-700">
                          {item.previousScore}
                        </p>

                        <p
                          className={`
                            text-xs
                            font-semibold
                            mt-1
                            ${
                              scoreChange > 0
                                ? "text-red-500"
                                : scoreChange < 0
                                ? "text-emerald-500"
                                : "text-slate-400"
                            }
                          `}
                        >
                          {scoreChange > 0 ? "+" : ""}
                          {scoreChange}
                        </p>

                      </div>

                    </td>


                    {/* RISK */}

                    <td className="px-5 py-5">

                      <span
                        className={`
                          inline-flex
                          items-center
                          px-3
                          py-1.5
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


                    {/* TREND */}

                    <td className="px-5 py-5">

                      <div className="flex items-center gap-2">

                        <TrendIcon
                          trend={item.trendStatus}
                        />

                        <span
                          className={`
                            text-sm
                            font-semibold
                            ${trendColor(item.trendStatus)}
                          `}
                        >
                          {item.trendStatus}
                        </span>

                      </div>

                      {/* MINI TREND */}

                      <div className="flex items-end gap-1 h-8 mt-2">

                        {item.trend.map(
                          (value, index) => (

                            <div
                              key={`${item.id}-${index}`}
                              className={`
                                w-2
                                rounded-t
                                ${
                                  value >= 81
                                    ? "bg-red-400"
                                    : value >= 61
                                    ? "bg-orange-400"
                                    : value >= 31
                                    ? "bg-amber-400"
                                    : "bg-emerald-400"
                                }
                              `}
                              style={{
                                height: `${Math.max(
                                  5,
                                  (value / 100) * 30
                                )}px`,
                              }}
                            />

                          )
                        )}

                      </div>

                    </td>


                    {/* CHECK-IN */}

                    <td className="px-5 py-5">

                      <p className="text-sm text-slate-600">
                        {item.lastCheckIn}
                      </p>

                      <span
                        className={`
                          inline-flex
                          mt-1
                          px-2
                          py-1
                          rounded-md
                          text-[11px]
                          font-semibold
                          ${checkInClasses(
                            item.checkInStatus
                          )}
                        `}
                      >
                        {item.checkInStatus}
                      </span>

                    </td>


                    {/* STATUS */}

                    <td className="px-5 py-5">

                      <span className="text-sm font-semibold text-slate-700">
                        {item.status}
                      </span>

                    </td>


                    {/* ACTION */}

                    <td className="px-5 py-5 text-right">

                      <Link
                        to={`/counsellor-case/${item.id}`}
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

                );
              })}

            </tbody>

          </table>

        </div>

      </div>


      {/* =================================================
          MONITORING LOGIC
      ================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <div className="bg-white border border-slate-200 rounded-2xl p-5">

          <div className="flex items-center gap-2">

            <TrendingUp
              size={18}
              className="text-red-500"
            />

            <h3 className="font-bold text-slate-800">
              Rising Distress
            </h3>

          </div>

          <p className="text-sm text-slate-500 mt-2 leading-6">
            Repeated increases across check-ins should be reviewed
            by the counsellor.
          </p>

        </div>


        <div className="bg-white border border-slate-200 rounded-2xl p-5">

          <div className="flex items-center gap-2">

            <MessageSquare
              size={18}
              className="text-indigo-500"
            />

            <h3 className="font-bold text-slate-800">
              Check-in Signals
            </h3>

          </div>

          <p className="text-sm text-slate-500 mt-2 leading-6">
            Stress, fear, anxiety and other approved signals are
            monitored longitudinally.
          </p>

        </div>


        <div className="bg-white border border-slate-200 rounded-2xl p-5">

          <div className="flex items-center gap-2">

            <CheckCircle2
              size={18}
              className="text-emerald-500"
            />

            <h3 className="font-bold text-slate-800">
              Human Review
            </h3>

          </div>

          <p className="text-sm text-slate-500 mt-2 leading-6">
            AI monitoring supports counsellor decisions and does not
            automatically diagnose or take legal action.
          </p>

        </div>

      </div>


      {/* =================================================
          PRIVACY NOTICE
      ================================================= */}

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

        <p className="text-xs text-slate-500 leading-5">

          <span className="font-semibold text-slate-700">
            Counsellor monitoring notice:
          </span>{" "}

          Only assigned cases are displayed. Distress scores are
          experimental decision-support indicators, not clinical
          diagnoses. A single high response or missed check-in should
          not independently determine a critical classification.

        </p>

      </div>

    </div>
  );
}