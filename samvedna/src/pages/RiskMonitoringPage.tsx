import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  Search,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { allCases, type RiskLevel } from "../Data/cases";

const riskOrder: RiskLevel[] = [
  "Critical",
  "High",
  "Moderate",
  "Low",
];

const riskStyles: Record<
  RiskLevel,
  { badge: string; dot: string; soft: string }
> = {
  Critical: {
    badge: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
    soft: "bg-red-50/70",
  },
  High: {
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    dot: "bg-orange-500",
    soft: "bg-orange-50/70",
  },
  Moderate: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    soft: "bg-amber-50/70",
  },
  Low: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    soft: "bg-emerald-50/70",
  },
};

function getTrendIcon(trend: string) {
  const value = trend.toLowerCase();

  if (value.includes("increase")) {
    return <TrendingUp className="w-4 h-4" />;
  }

  if (value.includes("decreas")) {
    return <TrendingDown className="w-4 h-4" />;
  }

  return <Activity className="w-4 h-4" />;
}

function getTrendClasses(trend: string) {
  const value = trend.toLowerCase();

  if (value.includes("increase")) {
    return "text-red-600 bg-red-50";
  }

  if (value.includes("decreas")) {
    return "text-emerald-600 bg-emerald-50";
  }

  return "text-slate-600 bg-slate-100";
}

export default function RiskMonitoringPage() {
  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const [riskFilter, setRiskFilter] = React.useState<"All" | RiskLevel>("All");
  const [showOnlyMonitoring, setShowOnlyMonitoring] = React.useState(true);

  const filteredCases = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    return allCases
      .filter((item) => {
        if (showOnlyMonitoring && !item.monitoring) return false;
        if (riskFilter !== "All" && item.risk !== riskFilter) return false;

        if (!query) return true;

        return [
          item.id,
          item.category,
          item.district,
          item.counsellor,
          item.status,
        ].some((value) => value.toLowerCase().includes(query));
      })
      .sort((a, b) => {
        const riskDifference =
          riskOrder.indexOf(a.risk) - riskOrder.indexOf(b.risk);

        if (riskDifference !== 0) return riskDifference;
        return b.score - a.score;
      });
  }, [search, riskFilter, showOnlyMonitoring]);

  const totalMonitored = allCases.filter((item) => item.monitoring).length;
  const criticalCount = allCases.filter(
    (item) => item.monitoring && item.risk === "Critical"
  ).length;
  const highCount = allCases.filter(
    (item) => item.monitoring && item.risk === "High"
  ).length;
  const moderateCount = allCases.filter(
    (item) => item.monitoring && item.risk === "Moderate"
  ).length;
  const lowCount = allCases.filter(
    (item) => item.monitoring && item.risk === "Low"
  ).length;

  const increasingCount = allCases.filter(
    (item) =>
      item.monitoring && item.trend.toLowerCase().includes("increase")
  ).length;

  const averageScore = totalMonitored
    ? Math.round(
        allCases
          .filter((item) => item.monitoring)
          .reduce((sum, item) => sum + item.score, 0) / totalMonitored
      )
    : 0;

  const topCriticalCases = allCases
    .filter((item) => item.monitoring && item.risk === "Critical")
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600">
              <Activity className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Monitoring Center
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              Risk Monitoring
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              District-level monitoring of victim well-being, distress scores and
              changing risk trends.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-indigo-600">Active monitoring</p>
              <p className="text-lg font-bold text-slate-900">
                {totalMonitored} cases
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <SummaryCard
          label="Monitored Cases"
          value={totalMonitored}
          description="Currently under monitoring"
          icon={<Users className="h-5 w-5" />}
          iconClass="bg-indigo-50 text-indigo-600"
        />
        <SummaryCard
          label="Critical Distress"
          value={criticalCount}
          description="Human review required"
          icon={<ShieldAlert className="h-5 w-5" />}
          iconClass="bg-red-50 text-red-600"
        />
        <SummaryCard
          label="High Distress"
          value={highCount}
          description="Closer monitoring"
          icon={<AlertTriangle className="h-5 w-5" />}
          iconClass="bg-orange-50 text-orange-600"
        />
        <SummaryCard
          label="Increasing Trend"
          value={increasingCount}
          description="Distress is increasing"
          icon={<TrendingUp className="h-5 w-5" />}
          iconClass="bg-amber-50 text-amber-600"
        />
        <SummaryCard
          label="Average Score"
          value={`${averageScore}/100`}
          description="Across monitored cases"
          icon={<Activity className="h-5 w-5" />}
          iconClass="bg-violet-50 text-violet-600"
        />
      </div>

      {/* RISK DISTRIBUTION */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Risk Distribution</h2>
              <p className="mt-1 text-sm text-slate-500">
                Current monitored cases by distress level.
              </p>
            </div>
            <Activity className="h-5 w-5 text-indigo-500" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <RiskSummary label="Critical" value={criticalCount} risk="Critical" />
            <RiskSummary label="High" value={highCount} risk="High" />
            <RiskSummary label="Moderate" value={moderateCount} risk="Moderate" />
            <RiskSummary label="Low" value={lowCount} risk="Low" />
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="flex h-full w-full">
              {[
                ["bg-red-500", criticalCount],
                ["bg-orange-500", highCount],
                ["bg-amber-400", moderateCount],
                ["bg-emerald-500", lowCount],
              ].map(([className, count]) => {
                const percentage = totalMonitored
                  ? (Number(count) / totalMonitored) * 100
                  : 0;

                return (
                  <div
                    key={className}
                    className={className as string}
                    style={{ width: `${percentage}%` }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">Monitoring Insight</h2>
          <p className="mt-1 text-sm text-slate-500">
            Automatically generated from the current prototype monitoring data.
          </p>

          <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">AI monitoring insight</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {increasingCount > 0
                    ? `${increasingCount} monitored cases show an increasing distress trend. Cases with rapidly increasing scores should receive closer human review.`
                    : "No monitored case currently shows an increasing distress trend."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Average score</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{averageScore}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Critical + High</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {criticalCount + highCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CRITICAL CASES */}
      <div className="rounded-2xl border border-red-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-red-100 bg-red-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-red-700">
              <ShieldAlert className="h-5 w-5" />
              <h2 className="font-bold">Critical Distress Cases</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Cases with the highest current well-being distress indicators.
            </p>
          </div>
          <span className="w-fit rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            {criticalCount} critical
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {topCriticalCases.length === 0 ? (
            <div className="p-6 text-sm text-slate-500">
              No critical distress cases in the current monitoring data.
            </div>
          ) : (
            topCriticalCases.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/cases/${item.id}`)}
                      className="font-bold text-slate-900 hover:text-indigo-600"
                    >
                      {item.id}
                    </button>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${riskStyles[item.risk].badge}`}
                    >
                      {item.risk}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.category} • {item.district} • Counsellor: {item.counsellor}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:min-w-[560px]">
                  <Metric label="Current" value={`${item.score}/100`} />
                  <Metric label="Previous" value={`${item.previousScore}/100`} />
                  <Metric
                    label="Change"
                    value={`${item.score - item.previousScore > 0 ? "+" : ""}${
                      item.score - item.previousScore
                    }`}
                    valueClass="text-red-600"
                  />
                  <Metric label="Last check-in" value={item.lastCheckIn} />
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/cases/${item.id}`)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Eye className="h-4 w-4" />
                  View Case
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FILTERS + TABLE */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">All Monitored Cases</h2>
              <p className="mt-1 text-sm text-slate-500">
                Review current distress scores and longitudinal trends.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search case, category..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 sm:w-64"
                />
              </div>

              <div className="relative">
                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <select
                  value={riskFilter}
                  onChange={(event) =>
                    setRiskFilter(event.target.value as "All" | RiskLevel)
                  }
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 sm:w-40"
                >
                  <option value="All">All Risk</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setShowOnlyMonitoring((value) => !value)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  showOnlyMonitoring
                    ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {showOnlyMonitoring ? "Monitoring only" : "All cases"}
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1050px] w-full">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Case</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Distress</th>
                <th className="px-5 py-4">Risk</th>
                <th className="px-5 py-4">Trend</th>
                <th className="px-5 py-4">Last Check-in</th>
                <th className="px-5 py-4">Counsellor</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => navigate(`/cases/${item.id}`)}
                      className="text-left"
                    >
                      <p className="font-semibold text-slate-900 hover:text-indigo-600">
                        {item.id}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.district}, {item.state}
                      </p>
                    </button>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {item.category}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-900">
                        {item.score}
                      </span>
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${
                            item.score >= 80
                              ? "bg-red-500"
                              : item.score >= 60
                              ? "bg-orange-500"
                              : item.score >= 40
                              ? "bg-amber-400"
                              : "bg-emerald-500"
                          }`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      Previous: {item.previousScore}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${riskStyles[item.risk].badge}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${riskStyles[item.risk].dot}`}
                      />
                      {item.risk}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${getTrendClasses(
                        item.trend
                      )}`}
                    >
                      {getTrendIcon(item.trend)}
                      {item.trend}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock3 className="h-4 w-4 text-slate-400" />
                      {item.lastCheckIn}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {item.counsellor}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => navigate(`/cases/${item.id}`)}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCases.length === 0 && (
          <div className="border-t border-slate-100 p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold text-slate-900">
              No matching cases
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try another case ID, category or risk filter.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-slate-200 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Showing {filteredCases.length} of {allCases.length} prototype cases
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Human review remains required for intervention decisions.
          </span>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  description,
  icon,
  iconClass,
}: {
  label: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function RiskSummary({
  label,
  value,
  risk,
}: {
  label: string;
  value: number;
  risk: RiskLevel;
}) {
  return (
    <div className={`rounded-xl border border-slate-200 p-4 ${riskStyles[risk].soft}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${riskStyles[risk].dot}`} />
        <span className="text-sm font-semibold text-slate-700">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Metric({
  label,
  value,
  valueClass = "text-slate-900",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`mt-1 text-sm font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}
