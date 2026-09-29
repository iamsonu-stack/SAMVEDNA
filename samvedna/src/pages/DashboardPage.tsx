import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock3,
  Eye,
  FolderOpen,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

type PriorityCase = {
  id: string;
  category: string;
  district: string;
  score: number;
  previousScore: number;
  risk: RiskLevel;
  trend: "Rapid Increase" | "Increasing" | "Improving" | "Stable";
  lastCheckIn: string;
  counsellor: string;
};

const priorityCases: PriorityCase[] = [
  {
    id: "CASE-1025",
    category: "Caste-based Violence",
    district: "Indore",
    score: 78,
    previousScore: 54,
    risk: "High",
    trend: "Rapid Increase",
    lastCheckIn: "2 hours ago",
    counsellor: "Anita Sharma",
  },
  {
    id: "CASE-1088",
    category: "Threat / Intimidation",
    district: "Ujjain",
    score: 84,
    previousScore: 61,
    risk: "Critical",
    trend: "Increasing",
    lastCheckIn: "5 hours ago",
    counsellor: "Rahul Verma",
  },
  {
    id: "CASE-1102",
    category: "Atrocity-related",
    district: "Dewas",
    score: 35,
    previousScore: 43,
    risk: "Moderate",
    trend: "Improving",
    lastCheckIn: "Yesterday",
    counsellor: "Priya Singh",
  },
  {
    id: "CASE-1114",
    category: "Rape / Sexual Violence",
    district: "Indore",
    score: 68,
    previousScore: 57,
    risk: "High",
    trend: "Increasing",
    lastCheckIn: "Yesterday",
    counsellor: "Priya Singh",
  },
];

const trendData = [
  42, 44, 43, 47, 49, 48, 52, 50, 54, 56,
  55, 58, 57, 61, 60, 62, 63, 62, 65, 67,
  66, 69, 68, 70, 69, 72, 71, 73, 72, 76,
];

function getRiskClasses(risk: RiskLevel) {
  switch (risk) {
    case "Low":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Moderate":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "High":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "Critical":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
}

function getTrendIcon(trend: PriorityCase["trend"]) {
  if (trend === "Improving") {
    return (
      <TrendingDown className="w-3.5 h-3.5" />
    );
  }

  if (
    trend === "Increasing" ||
    trend === "Rapid Increase"
  ) {
    return (
      <TrendingUp className="w-3.5 h-3.5" />
    );
  }

  return (
    <Activity className="w-3.5 h-3.5" />
  );
}

function getTrendClasses(trend: PriorityCase["trend"]) {
  if (trend === "Improving") {
    return "text-emerald-600";
  }

  if (trend === "Rapid Increase") {
    return "text-red-500";
  }

  if (trend === "Increasing") {
    return "text-orange-500";
  }

  return "text-slate-500";
}

function KpiCard({
  title,
  value,
  subtitle,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-2">
            {value}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {subtitle}
          </p>
        </div>

        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function DistressDonut() {
  const total = 1250;

  const low = 820;
  const moderate = 280;
  const high = 110;
  const critical = 40;

  const lowPercent = (low / total) * 100;
  const moderatePercent = (moderate / total) * 100;
  const highPercent = (high / total) * 100;
  const criticalPercent = (critical / total) * 100;

  const lowEnd = lowPercent;

  const moderateEnd =
    lowPercent + moderatePercent;

  const highEnd =
    moderateEnd + highPercent;

  const gradient = `
    conic-gradient(
      #10b981 0 ${lowEnd}%,
      #f59e0b ${lowEnd}% ${moderateEnd}%,
      #f97316 ${moderateEnd}% ${highEnd}%,
      #ef4444 ${highEnd}% 100%
    )
  `;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
      <div
        className="relative w-44 h-44 rounded-full flex items-center justify-center"
        style={{
          background: gradient,
        }}
      >
        <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">
            1,250
          </span>

          <span className="text-xs text-slate-400">
            Cases
          </span>
        </div>
      </div>

      <div className="space-y-4 min-w-[180px]">
        <RiskLegend
          label="Low"
          value={low}
          dotClass="bg-emerald-500"
        />

        <RiskLegend
          label="Moderate"
          value={moderate}
          dotClass="bg-amber-500"
        />

        <RiskLegend
          label="High"
          value={high}
          dotClass="bg-orange-500"
        />

        <RiskLegend
          label="Critical"
          value={critical}
          dotClass="bg-red-500"
        />
      </div>
    </div>
  );
}

function RiskLegend({
  label,
  value,
  dotClass,
}: {
  label: string;
  value: number;
  dotClass: string;
}) {
  return (
    <div className="flex items-center justify-between gap-8 text-sm">
      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${dotClass}`}
        />

        <span className="text-slate-500">
          {label}
        </span>
      </div>

      <span className="font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
}

function TrendChart() {
  const max = 100;
  const min = 0;

  return (
    <div className="relative">
      <div className="h-52 flex items-end gap-1.5 px-2">
        {trendData.map((value, index) => {
          const height =
            ((value - min) / (max - min)) * 100;

          return (
            <div
              key={index}
              className="flex-1 h-full flex items-end"
            >
              <div
                className="w-full rounded-t-md bg-indigo-400 hover:bg-indigo-500 transition"
                style={{
                  height: `${Math.max(
                    height,
                    20
                  )}%`,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 mt-2 px-2">
        <span>01 Sep</span>
        <span>08 Sep</span>
        <span>15 Sep</span>
        <span>22 Sep</span>
        <span>30 Sep</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleViewCase = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div>
        <p className="text-xs font-bold tracking-wide text-indigo-600 uppercase">
          Overview
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
          Good Morning, Officer
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Here is today's victim well-being monitoring
          overview for Indore district.
        </p>
      </div>

      {/* =====================================================
          KPI CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">

        <KpiCard
          title="Total Active Cases"
          value="1,248"
          subtitle="Across monitored cases"
          icon={
            <FolderOpen className="w-5 h-5 text-indigo-600" />
          }
          iconClass="bg-indigo-50"
        />

        <KpiCard
          title="Monitoring Active"
          value="1,173"
          subtitle="93.9% of active cases"
          icon={
            <Activity className="w-5 h-5 text-blue-600" />
          }
          iconClass="bg-blue-50"
        />

        <KpiCard
          title="High Risk"
          value="110"
          subtitle="Requires monitoring"
          icon={
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          }
          iconClass="bg-orange-50"
        />

        <KpiCard
          title="Critical"
          value="40"
          subtitle="Human review required"
          icon={
            <Bell className="w-5 h-5 text-red-600" />
          }
          iconClass="bg-red-50"
        />

        <KpiCard
          title="Pending Follow-ups"
          value="23"
          subtitle="Due today"
          icon={
            <Clock3 className="w-5 h-5 text-amber-600" />
          }
          iconClass="bg-amber-50"
        />

        <KpiCard
          title="Active Alerts"
          value="12"
          subtitle="Needs attention"
          icon={
            <ShieldCheck className="w-5 h-5 text-purple-600" />
          }
          iconClass="bg-purple-50"
        />
      </div>

      {/* =====================================================
          CHART SECTION
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

        {/* DISTRESS DISTRIBUTION */}

        <div className="xl:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Victim Distress Distribution
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Current monitored cases
              </p>
            </div>

            <Activity className="w-5 h-5 text-indigo-500" />
          </div>

          <div className="mt-7">
            <DistressDonut />
          </div>
        </div>

        {/* AVERAGE DISTRESS TREND */}

        <div className="xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-start justify-between mb-5">

            <div>
              <h2 className="font-bold text-slate-900">
                Average Distress Trend
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Last 30 days • Score 0–100
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600 text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +12%
            </div>
          </div>

          <TrendChart />

          {/* AI INSIGHT */}

          <div className="mt-5 p-4 rounded-xl bg-indigo-50 border border-indigo-100">

            <div className="flex items-start gap-3">

              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4" />
              </div>

              <div>
                <p className="text-sm font-bold text-indigo-700">
                  AI Insight
                </p>

                <p className="text-xs leading-5 text-indigo-600 mt-1">
                  Overall distress indicators have increased
                  over the last 30 days. Cases with rapidly
                  increasing trends require closer human
                  monitoring.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ALERT + PRIORITY CASES
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

        {/* HIGH RISK ALERT */}

        <div className="xl:col-span-4 bg-white border border-red-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="px-5 py-4 bg-red-50 border-b border-red-100">

            <div className="flex items-center gap-2 text-red-600">

              <AlertTriangle className="w-4 h-4" />

              <h2 className="font-bold text-sm">
                High-Risk Alert
              </h2>

            </div>
          </div>

          <div className="p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="font-bold text-slate-900">
                  CASE-1025
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Caste-based Violence
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-bold">
                HIGH
              </span>
            </div>

            {/* SCORE CHANGE */}

            <div className="grid grid-cols-3 gap-3 mt-6">

              <div>
                <p className="text-xs text-slate-400">
                  Previous
                </p>

                <p className="text-2xl font-bold text-slate-800 mt-1">
                  54
                </p>
              </div>

              <div className="flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-500" />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Current
                </p>

                <p className="text-2xl font-bold text-red-600 mt-1">
                  78
                </p>
              </div>

            </div>

            {/* INDICATORS */}

            <div className="mt-6">

              <p className="text-xs font-bold text-slate-700 mb-3">
                Indicators:
              </p>

              <div className="space-y-2 text-xs text-slate-500">

                <p>✓ Fear increased</p>

                <p>✓ Stress increased</p>

                <p>✓ Threat-related response detected</p>

                <p>✓ Increase across 3 check-ins</p>

              </div>
            </div>

            <div className="mt-5 p-3 rounded-lg bg-amber-50 border border-amber-100">
              <p className="text-xs font-semibold text-amber-700">
                Human follow-up recommended
              </p>
            </div>

            {/* ACTIONS */}

            <div className="grid grid-cols-2 gap-3 mt-5">

              <button
                onClick={() =>
                  handleViewCase("CASE-1025")
                }
                className="
                  flex items-center justify-center gap-2
                  px-4 py-2.5
                  rounded-xl
                  border border-slate-200
                  text-slate-700
                  text-sm font-semibold
                  hover:bg-slate-50
                  transition
                "
              >
                <Eye className="w-4 h-4" />
                View Case
              </button>

              <button
                onClick={() =>
                  navigate("/interventions")
                }
                className="
                  flex items-center justify-center gap-2
                  px-4 py-2.5
                  rounded-xl
                  bg-indigo-600
                  text-white
                  text-sm font-semibold
                  hover:bg-indigo-700
                  transition
                "
              >
                <Users className="w-4 h-4" />
                Follow-up
              </button>

            </div>
          </div>
        </div>

        {/* PRIORITY CASES */}

        <div className="xl:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="p-5 border-b border-slate-100 flex items-center justify-between">

            <div>
              <h2 className="font-bold text-slate-900">
                Priority Cases
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Cases requiring closer monitoring
              </p>
            </div>

            <button
              onClick={() => navigate("/cases")}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              View All
            </button>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[760px]">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">

                  <th className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Case
                  </th>

                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Category
                  </th>

                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Score
                  </th>

                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Trend
                  </th>

                  <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Counsellor
                  </th>

                  <th className="text-right px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {priorityCases.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition"
                  >

                    {/* CASE */}

                    <td className="px-5 py-4">

                      <button
                        onClick={() =>
                          handleViewCase(item.id)
                        }
                        className="text-left"
                      >
                        <p className="font-bold text-sm text-slate-800 hover:text-indigo-600 transition">
                          {item.id}
                        </p>

                        <p className="text-[11px] text-slate-400 mt-1">
                          {item.district} •{" "}
                          {item.lastCheckIn}
                        </p>
                      </button>

                    </td>

                    {/* CATEGORY */}

                    <td className="px-4 py-4">

                      <p className="text-xs text-slate-600 max-w-[130px]">
                        {item.category}
                      </p>

                    </td>

                    {/* SCORE */}

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-2">

                        <span className="font-bold text-sm text-slate-800">
                          {item.score}
                        </span>

                        <span
                          className={`
                            px-2 py-0.5
                            rounded-full
                            border
                            text-[10px]
                            font-bold
                            ${getRiskClasses(item.risk)}
                          `}
                        >
                          {item.risk}
                        </span>

                      </div>

                    </td>

                    {/* TREND */}

                    <td className="px-4 py-4">

                      <div
                        className={`
                          flex items-center gap-1.5
                          text-xs font-semibold
                          ${getTrendClasses(item.trend)}
                        `}
                      >
                        {getTrendIcon(item.trend)}

                        <span>
                          {item.trend}
                        </span>
                      </div>

                    </td>

                    {/* COUNSELLOR */}

                    <td className="px-4 py-4">

                      <span className="text-xs text-slate-600">
                        {item.counsellor}
                      </span>

                    </td>

                    {/* VIEW */}

                    <td className="px-5 py-4 text-right">

                      <button
                        onClick={() =>
                          handleViewCase(item.id)
                        }
                        title={`View ${item.id}`}
                        className="
                          inline-flex
                          items-center
                          justify-center
                          w-9
                          h-9
                          rounded-lg
                          border
                          border-slate-200
                          text-slate-500
                          hover:text-indigo-600
                          hover:bg-indigo-50
                          hover:border-indigo-200
                          transition
                        "
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* =====================================================
          HUMAN OVERSIGHT NOTICE
      ====================================================== */}

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">

        <div className="flex items-start gap-3">

          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-700">
              Human-in-the-loop monitoring
            </p>

            <p className="text-xs text-slate-500 mt-1 leading-5">
              SAMVEDNA provides early-warning and decision-support
              indicators. High and critical alerts require human
              review and should not be treated as a clinical
              diagnosis or an automatic legal decision.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}