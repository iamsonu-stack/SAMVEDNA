import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Download,
  Filter,
  MapPin,
  RefreshCw,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

type District = {
  name: string;
  code: string;
  activeCases: number;
  monitored: number;
  averageDistress: number;
  highRisk: number;
  critical: number;
  pendingFollowups: number;
  counsellors: number;
  responseRate: number;
  trend: "Increasing" | "Stable" | "Improving";
};

const districts: District[] = [
  {
    name: "Indore",
    code: "IND",
    activeCases: 286,
    monitored: 271,
    averageDistress: 58,
    highRisk: 31,
    critical: 9,
    pendingFollowups: 8,
    counsellors: 18,
    responseRate: 91,
    trend: "Increasing",
  },
  {
    name: "Bhopal",
    code: "BHO",
    activeCases: 242,
    monitored: 229,
    averageDistress: 51,
    highRisk: 24,
    critical: 6,
    pendingFollowups: 5,
    counsellors: 16,
    responseRate: 94,
    trend: "Stable",
  },
  {
    name: "Jabalpur",
    code: "JBP",
    activeCases: 198,
    monitored: 187,
    averageDistress: 47,
    highRisk: 18,
    critical: 4,
    pendingFollowups: 4,
    counsellors: 13,
    responseRate: 89,
    trend: "Improving",
  },
  {
    name: "Gwalior",
    code: "GWL",
    activeCases: 176,
    monitored: 164,
    averageDistress: 63,
    highRisk: 22,
    critical: 8,
    pendingFollowups: 7,
    counsellors: 12,
    responseRate: 86,
    trend: "Increasing",
  },
  {
    name: "Ujjain",
    code: "UJN",
    activeCases: 154,
    monitored: 146,
    averageDistress: 44,
    highRisk: 13,
    critical: 3,
    pendingFollowups: 3,
    counsellors: 11,
    responseRate: 93,
    trend: "Improving",
  },
  {
    name: "Sagar",
    code: "SGR",
    activeCases: 131,
    monitored: 122,
    averageDistress: 55,
    highRisk: 15,
    critical: 5,
    pendingFollowups: 4,
    counsellors: 9,
    responseRate: 88,
    trend: "Stable",
  },
];

const monthlyTrend = [
  { month: "Apr", score: 42 },
  { month: "May", score: 45 },
  { month: "Jun", score: 48 },
  { month: "Jul", score: 51 },
  { month: "Aug", score: 55 },
  { month: "Sep", score: 57 },
];

const recentAlerts = [
  {
    id: "ALT-2045",
    district: "Indore",
    caseId: "CASE-1025",
    score: 78,
    change: "+24",
    reason: "Rapid distress increase across consecutive check-ins",
    time: "18 min ago",
    level: "High" as RiskLevel,
  },
  {
    id: "ALT-2039",
    district: "Gwalior",
    caseId: "CASE-1088",
    score: 84,
    change: "+12",
    reason: "Rising fear and stress indicators",
    time: "42 min ago",
    level: "Critical" as RiskLevel,
  },
  {
    id: "ALT-2032",
    district: "Bhopal",
    caseId: "CASE-1134",
    score: 72,
    change: "+18",
    reason: "Repeated high distress responses",
    time: "1 hr ago",
    level: "High" as RiskLevel,
  },
];

function getRiskClass(level: RiskLevel) {
  switch (level) {
    case "Critical":
      return "bg-red-50 text-red-700 border-red-200";
    case "High":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "Moderate":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    default:
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
}

function getTrendIcon(trend: District["trend"]) {
  if (trend === "Increasing") {
    return <TrendingUp size={15} className="text-red-500" />;
  }

  if (trend === "Improving") {
    return <TrendingDown size={15} className="text-emerald-500" />;
  }

  return <Activity size={15} className="text-slate-500" />;
}

export default function StateAdministratorDashboardPage() {
  const navigate = useNavigate();

  const [selectedDistrict, setSelectedDistrict] =
    useState<District | null>(null);

  const [riskFilter, setRiskFilter] =
    useState<"All" | "Attention Required" | "Improving">("All");

  const [search, setSearch] = useState("");

  const [lastUpdated, setLastUpdated] =
    useState("Just now");

  const [showAllDistricts, setShowAllDistricts] =
    useState(false);

  const filteredDistricts = useMemo(() => {
    let result = districts;

    if (riskFilter === "Attention Required") {
      result = result.filter(
        (district) =>
          district.trend === "Increasing" ||
          district.critical >= 6
      );
    }

    if (riskFilter === "Improving") {
      result = result.filter(
        (district) => district.trend === "Improving"
      );
    }

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter(
        (district) =>
          district.name.toLowerCase().includes(value) ||
          district.code.toLowerCase().includes(value)
      );
    }

    return result;
  }, [riskFilter, search]);

  const visibleDistricts = showAllDistricts
    ? filteredDistricts
    : filteredDistricts.slice(0, 4);

  const totalCases = districts.reduce(
    (sum, d) => sum + d.activeCases,
    0
  );

  const totalMonitored = districts.reduce(
    (sum, d) => sum + d.monitored,
    0
  );

  const totalHighRisk = districts.reduce(
    (sum, d) => sum + d.highRisk,
    0
  );

  const totalCritical = districts.reduce(
    (sum, d) => sum + d.critical,
    0
  );

  const totalPending = districts.reduce(
    (sum, d) => sum + d.pendingFollowups,
    0
  );

  const handleRefresh = () => {
    setLastUpdated("Updated just now");
  };

  const exportDistrictReport = () => {
    const header =
      "District,Active Cases,Monitored,Average Distress,High Risk,Critical,Pending Follow-ups,Response Rate\n";

    const rows = districts
      .map(
        (d) =>
          `${d.name},${d.activeCases},${d.monitored},${d.averageDistress},${d.highRisk},${d.critical},${d.pendingFollowups},${d.responseRate}%`
      )
      .join("\n");

    const blob = new Blob(
      [header + rows],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "SAMVEDNA_State_District_Report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
              <BarChart3 size={20} />
            </div>

            <span className="text-sm font-medium text-indigo-600">
              State-level Monitoring
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            State Administrator Dashboard
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            District-wise victim well-being and risk overview
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            onClick={exportDistrictReport}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
          >
            <Download size={16} />
            Export Report
          </button>

        </div>

      </div>

      <div className="text-xs text-slate-400">
        Demo data for prototype demonstration • {lastUpdated}
      </div>


      {/* ================= KPI CARDS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">

        <KpiCard
          title="Active Cases"
          value={totalCases}
          icon={<ShieldAlert size={21} />}
          description="Across monitored districts"
        />

        <KpiCard
          title="Monitoring Active"
          value={totalMonitored}
          icon={<Activity size={21} />}
          description="Cases with active monitoring"
        />

        <KpiCard
          title="High Risk"
          value={totalHighRisk}
          icon={<AlertTriangle size={21} />}
          description="Requires closer observation"
          warning
        />

        <KpiCard
          title="Critical"
          value={totalCritical}
          icon={<ShieldAlert size={21} />}
          description="Human review required"
          danger
        />

        <KpiCard
          title="Pending Follow-ups"
          value={totalPending}
          icon={<ClipboardCheck size={21} />}
          description="Across all districts"
        />

      </div>


      {/* ================= STATE OVERVIEW ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* DISTRESS TREND */}

        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

          <div className="flex items-start justify-between mb-6">

            <div>
              <h2 className="font-bold text-slate-900">
                State Average Distress Trend
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Average distress indicator across monitored cases
              </p>
            </div>

            <span className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-xs font-semibold">
              +15% trend
            </span>

          </div>

          <div className="h-64 flex items-end gap-4 sm:gap-8 border-b border-l border-slate-200 px-4 pb-0">

            {monthlyTrend.map((item) => {

              const height =
                Math.max(15, (item.score / 100) * 220);

              return (
                <div
                  key={item.month}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                >

                  <span className="text-xs font-semibold text-slate-600">
                    {item.score}
                  </span>

                  <div
                    className="w-full max-w-12 rounded-t-xl bg-indigo-500 hover:bg-indigo-600 transition-all"
                    style={{
                      height: `${height}px`,
                    }}
                    title={`${item.month}: ${item.score}`}
                  />

                  <span className="text-xs text-slate-500 -mb-6">
                    {item.month}
                  </span>

                </div>
              );
            })}

          </div>

          <div className="mt-8 flex items-center gap-2 text-sm">
            <TrendingUp
              size={17}
              className="text-orange-500"
            />

            <span className="text-slate-600">
              State average distress has gradually increased.
            </span>
          </div>

        </div>


        {/* RISK DISTRIBUTION */}

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-bold text-slate-900">
                State Risk Distribution
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Current monitored cases
              </p>
            </div>

            <ShieldAlert
              size={20}
              className="text-indigo-600"
            />

          </div>

          <div className="mt-6 space-y-5">

            <RiskRow
              label="Low"
              value={520}
              total={1000}
              color="bg-emerald-500"
            />

            <RiskRow
              label="Moderate"
              value={300}
              total={1000}
              color="bg-yellow-500"
            />

            <RiskRow
              label="High"
              value={140}
              total={1000}
              color="bg-orange-500"
            />

            <RiskRow
              label="Critical"
              value={40}
              total={1000}
              color="bg-red-500"
            />

          </div>

          <button
            onClick={() =>
              navigate("/district-risk")
            }
            className="mt-7 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            View District Risk
            <ChevronRight size={16} />
          </button>

        </div>

      </div>


      {/* ================= DISTRICT FILTER ================= */}

      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              District-wise Well-being Overview
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Compare victim monitoring conditions across districts
            </p>
          </div>


          <div className="flex flex-col sm:flex-row gap-2">

            {/* SEARCH */}

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search district..."
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
            />

            {/* FILTER */}

            <div className="relative">

              <Filter
                size={16}
                className="absolute left-3 top-3 text-slate-400"
              />

              <select
                value={riskFilter}
                onChange={(e) =>
                  setRiskFilter(
                    e.target.value as
                      | "All"
                      | "Attention Required"
                      | "Improving"
                  )
                }
                className="pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-sm bg-white outline-none"
              >
                <option value="All">
                  All Districts
                </option>

                <option value="Attention Required">
                  Attention Required
                </option>

                <option value="Improving">
                  Improving
                </option>
              </select>

            </div>

          </div>

        </div>


        {/* DISTRICT TABLE */}

        <div className="overflow-x-auto mt-6">

          <table className="w-full min-w-[950px]">

            <thead>

              <tr className="border-b border-slate-200 text-left">

                <th className="pb-3 text-xs uppercase tracking-wide text-slate-500">
                  District
                </th>

                <th className="pb-3 text-xs uppercase tracking-wide text-slate-500">
                  Active Cases
                </th>

                <th className="pb-3 text-xs uppercase tracking-wide text-slate-500">
                  Avg. Distress
                </th>

                <th className="pb-3 text-xs uppercase tracking-wide text-slate-500">
                  High Risk
                </th>

                <th className="pb-3 text-xs uppercase tracking-wide text-slate-500">
                  Critical
                </th>

                <th className="pb-3 text-xs uppercase tracking-wide text-slate-500">
                  Response
                </th>

                <th className="pb-3 text-xs uppercase tracking-wide text-slate-500">
                  Trend
                </th>

                <th className="pb-3 text-xs uppercase tracking-wide text-slate-500">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {visibleDistricts.map((district) => (

                <tr
                  key={district.code}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >

                  <td className="py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                        {district.code}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {district.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {district.monitored} monitored
                        </p>
                      </div>

                    </div>

                  </td>


                  <td className="py-4 font-semibold text-slate-800">
                    {district.activeCases}
                  </td>


                  <td className="py-4">

                    <span
                      className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold ${
                        district.averageDistress >= 61
                          ? "bg-red-50 text-red-700"
                          : district.averageDistress >= 51
                          ? "bg-orange-50 text-orange-700"
                          : district.averageDistress >= 31
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {district.averageDistress}/100
                    </span>

                  </td>


                  <td className="py-4">

                    <span className="font-semibold text-orange-600">
                      {district.highRisk}
                    </span>

                  </td>


                  <td className="py-4">

                    <span className="font-semibold text-red-600">
                      {district.critical}
                    </span>

                  </td>


                  <td className="py-4">

                    <div className="flex items-center gap-2">

                      <div className="w-20 h-2 rounded-full bg-slate-100 overflow-hidden">

                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{
                            width: `${district.responseRate}%`,
                          }}
                        />

                      </div>

                      <span className="text-xs font-semibold">
                        {district.responseRate}%
                      </span>

                    </div>

                  </td>


                  <td className="py-4">

                    <div className="flex items-center gap-1.5">

                      {getTrendIcon(
                        district.trend
                      )}

                      <span className="text-xs font-medium text-slate-600">
                        {district.trend}
                      </span>

                    </div>

                  </td>


                  <td className="py-4">

                    <button
                      onClick={() =>
                        setSelectedDistrict(
                          district
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition"
                    >
                      View Details
                      <ChevronRight size={14} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        <div className="mt-5 flex justify-center">

          <button
            onClick={() =>
              setShowAllDistricts(
                !showAllDistricts
              )
            }
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            {showAllDistricts
              ? "Show Less"
              : "View All Districts"}
          </button>

        </div>

      </div>


      {/* ================= ALERTS ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* RECENT ALERTS */}

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="font-bold text-slate-900">
                Recent State Alerts
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Alerts requiring district-level attention
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/state-alerts")
              }
              className="text-sm text-indigo-600 font-semibold hover:text-indigo-800"
            >
              View all
            </button>

          </div>


          <div className="space-y-3">

            {recentAlerts.map((alert) => (

              <div
                key={alert.id}
                className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex gap-3">

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        alert.level === "Critical"
                          ? "bg-red-50 text-red-600"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      <AlertTriangle size={19} />
                    </div>

                    <div>

                      <div className="flex items-center gap-2">

                        <p className="font-semibold text-slate-900">
                          {alert.caseId}
                        </p>

                        <span
                          className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${getRiskClass(
                            alert.level
                          )}`}
                        >
                          {alert.level}
                        </span>

                      </div>

                      <p className="text-xs text-slate-500 mt-1">
                        {alert.district} • {alert.time}
                      </p>

                      <p className="text-sm text-slate-600 mt-2">
                        {alert.reason}
                      </p>

                    </div>

                  </div>

                  <span className="text-sm font-bold text-red-600 whitespace-nowrap">
                    {alert.change}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* STATE SUMMARY */}

        <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center">
              <MapPin size={21} />
            </div>

            <div>

              <h2 className="font-bold">
                State Monitoring Summary
              </h2>

              <p className="text-xs text-slate-400">
                District-level operational indicators
              </p>

            </div>

          </div>


          <div className="grid grid-cols-2 gap-4 mt-6">

            <SummaryBox
              label="Districts Monitored"
              value="6"
            />

            <SummaryBox
              label="Counsellors"
              value="79"
            />

            <SummaryBox
              label="Interventions"
              value="184"
            />

            <SummaryBox
              label="Check-in Response"
              value="91%"
            />

          </div>


          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">

            <div className="flex items-center gap-2 mb-2">

              <CheckCircle2
                size={17}
                className="text-emerald-400"
              />

              <span className="font-semibold text-sm">
                Monitoring Status
              </span>

            </div>

            <p className="text-sm text-slate-300 leading-6">
              District-level monitoring is active.
              High-risk changes are surfaced for
              human review and appropriate support.
            </p>

          </div>


          <button
            onClick={() =>
              navigate("/state-analytics")
            }
            className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition"
          >
            Open State Analytics
            <ChevronRight size={16} />
          </button>

        </div>

      </div>


      {/* ================= DISTRICT DETAIL MODAL ================= */}

      {selectedDistrict && (

        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">

            <div className="p-6 border-b border-slate-200 flex items-start justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <MapPin size={21} />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-slate-900">
                      {selectedDistrict.name} District
                    </h2>

                    <p className="text-sm text-slate-500">
                      District well-being overview
                    </p>

                  </div>

                </div>

              </div>


              <button
                onClick={() =>
                  setSelectedDistrict(null)
                }
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>


            <div className="p-6">

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                <DetailMetric
                  label="Active Cases"
                  value={selectedDistrict.activeCases}
                />

                <DetailMetric
                  label="Avg Distress"
                  value={`${selectedDistrict.averageDistress}/100`}
                />

                <DetailMetric
                  label="High Risk"
                  value={selectedDistrict.highRisk}
                />

                <DetailMetric
                  label="Critical"
                  value={selectedDistrict.critical}
                />

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">

                  <div className="flex items-center gap-2 mb-4">

                    <Users
                      size={18}
                      className="text-indigo-600"
                    />

                    <h3 className="font-semibold">
                      Counsellor Capacity
                    </h3>

                  </div>

                  <p className="text-3xl font-bold text-slate-900">
                    {selectedDistrict.counsellors}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Counsellors assigned in district
                  </p>

                </div>


                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">

                  <div className="flex items-center gap-2 mb-4">

                    <ClipboardCheck
                      size={18}
                      className="text-indigo-600"
                    />

                    <h3 className="font-semibold">
                      Follow-up Status
                    </h3>

                  </div>

                  <p className="text-3xl font-bold text-slate-900">
                    {selectedDistrict.pendingFollowups}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Pending follow-ups
                  </p>

                </div>

              </div>


              <div className="mt-5 p-5 rounded-xl border border-slate-200">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="font-semibold text-slate-900">
                      Check-in Response Rate
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Victim responses received through
                      available monitoring channels
                    </p>

                  </div>

                  <span className="text-2xl font-bold text-indigo-600">
                    {selectedDistrict.responseRate}%
                  </span>

                </div>

                <div className="mt-4 h-3 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{
                      width: `${selectedDistrict.responseRate}%`,
                    }}
                  />

                </div>

              </div>


              <div className="mt-5 p-5 rounded-xl bg-indigo-50 border border-indigo-100">

                <div className="flex items-center gap-2">

                  {getTrendIcon(
                    selectedDistrict.trend
                  )}

                  <p className="font-semibold text-slate-900">
                    Current Trend:{" "}
                    {selectedDistrict.trend}
                  </p>

                </div>

                <p className="text-sm text-slate-600 mt-2">
                  This district summary is intended
                  for state-level monitoring and
                  resource planning. Individual victim
                  details remain restricted according
                  to role-based access.
                </p>

              </div>


              <div className="mt-6 flex flex-wrap gap-2">

                <button
                  onClick={() => {
                    setSelectedDistrict(null);
                    navigate("/state-cases");
                  }}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
                >
                  View State Cases
                </button>

                <button
                  onClick={() => {
                    setSelectedDistrict(null);
                    navigate("/district-risk");
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
                >
                  View Risk Analysis
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================================================
   SMALL REUSABLE COMPONENTS
========================================================= */

function KpiCard({
  title,
  value,
  icon,
  description,
  warning,
  danger,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  warning?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-2">
            {value.toLocaleString()}
          </p>

        </div>

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${
            danger
              ? "bg-red-50 text-red-600"
              : warning
              ? "bg-orange-50 text-orange-600"
              : "bg-indigo-50 text-indigo-600"
          }`}
        >
          {icon}
        </div>

      </div>

      <p className="text-xs text-slate-400 mt-4">
        {description}
      </p>

    </div>
  );
}


function RiskRow({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const percentage =
    Math.round((value / total) * 100);

  return (
    <div>

      <div className="flex items-center justify-between mb-2">

        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>

        <span className="text-sm font-bold text-slate-900">
          {value}
        </span>

      </div>

      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">

        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}


function SummaryBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="text-2xl font-bold mt-1">
        {value}
      </p>

    </div>
  );
}


function DetailMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="text-xl font-bold text-slate-900 mt-1">
        {value}
      </p>

    </div>
  );
}