import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  HeartHandshake,
  MessageCircle,
  Phone,
  Search,
  ShieldAlert,
  Users,
  Activity,
  ChevronRight,
} from "lucide-react";

type RiskLevel = "Critical" | "High" | "Moderate" | "Low";

type CaseItem = {
  id: string;
  category: string;
  district: string;
  score: number;
  risk: RiskLevel;
  trend: "Increasing" | "Stable" | "Improving";
  lastCheckin: string;
  nextFollowup: string;
  sessionToday: boolean;
  status: "Active" | "Follow-up Pending" | "Stable";
};

const counsellorCases: CaseItem[] = [
  {
    id: "CASE-1025",
    category: "Caste-based Violence",
    district: "Indore",
    score: 78,
    risk: "High",
    trend: "Increasing",
    lastCheckin: "2 hours ago",
    nextFollowup: "Today, 11:30 AM",
    sessionToday: true,
    status: "Follow-up Pending",
  },
  {
    id: "CASE-1088",
    category: "Threat / Intimidation",
    district: "Indore",
    score: 84,
    risk: "Critical",
    trend: "Increasing",
    lastCheckin: "5 hours ago",
    nextFollowup: "Today, 12:30 PM",
    sessionToday: true,
    status: "Active",
  },
  {
    id: "CASE-1102",
    category: "Atrocity-related",
    district: "Indore",
    score: 35,
    risk: "Moderate",
    trend: "Improving",
    lastCheckin: "Yesterday",
    nextFollowup: "Tomorrow, 10:00 AM",
    sessionToday: false,
    status: "Stable",
  },
  {
    id: "CASE-1114",
    category: "Threat / Intimidation",
    district: "Indore",
    score: 66,
    risk: "High",
    trend: "Stable",
    lastCheckin: "Yesterday",
    nextFollowup: "Today, 3:00 PM",
    sessionToday: true,
    status: "Follow-up Pending",
  },
  {
    id: "CASE-1142",
    category: "Grievous Hurt",
    district: "Indore",
    score: 48,
    risk: "Moderate",
    trend: "Stable",
    lastCheckin: "2 days ago",
    nextFollowup: "04 Oct, 11:00 AM",
    sessionToday: false,
    status: "Active",
  },
  {
    id: "CASE-1178",
    category: "Sexual Violence",
    district: "Indore",
    score: 27,
    risk: "Low",
    trend: "Improving",
    lastCheckin: "2 days ago",
    nextFollowup: "06 Oct, 2:00 PM",
    sessionToday: false,
    status: "Stable",
  },
];

const riskStyles: Record<RiskLevel, string> = {
  Critical:
    "bg-red-50 text-red-700 border-red-200",
  High:
    "bg-orange-50 text-orange-700 border-orange-200",
  Moderate:
    "bg-amber-50 text-amber-700 border-amber-200",
  Low:
    "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function RiskBadge({ risk }: { risk: RiskLevel }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold ${riskStyles[risk]}`}
    >
      {risk === "Critical" && <ShieldAlert size={12} />}
      {risk}
    </span>
  );
}

function TrendBadge({
  trend,
}: {
  trend: CaseItem["trend"];
}) {
  if (trend === "Increasing") {
    return (
      <span className="text-xs font-semibold text-red-600 flex items-center gap-1">
        <ArrowUpRight size={14} />
        Increasing
      </span>
    );
  }

  if (trend === "Improving") {
    return (
      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
        <ArrowUpRight
          size={14}
          className="rotate-90"
        />
        Improving
      </span>
    );
  }

  return (
    <span className="text-xs font-semibold text-slate-500">
      Stable
    </span>
  );
}

export default function CounsellorDashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const [riskFilter, setRiskFilter] =
    React.useState<"All" | RiskLevel>("All");

  const counsellorId =
    localStorage.getItem("samvedna_user") ||
    "Counsellor";

  /*
   * District is stored during login.
   * If it doesn't exist, prototype uses Indore.
   */
  const counsellorDistrict =
    localStorage.getItem("samvedna_district") ||
    "Indore";

  const filteredCases = React.useMemo(() => {
    return counsellorCases.filter((item) => {
      const matchesSearch =
        item.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesRisk =
        riskFilter === "All" ||
        item.risk === riskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [search, riskFilter]);

  const criticalCases = counsellorCases.filter(
    (item) => item.risk === "Critical"
  ).length;

  const highRiskCases = counsellorCases.filter(
    (item) => item.risk === "High"
  ).length;

  const pendingFollowups =
    counsellorCases.filter(
      (item) => item.status === "Follow-up Pending"
    ).length;

  const todaysSessions =
    counsellorCases.filter(
      (item) => item.sessionToday
    ).length;

  const stableCases =
    counsellorCases.filter(
      (item) => item.status === "Stable"
    ).length;

  const openCase = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };

  const startSession = (caseId: string) => {
    navigate(
      `/counselling-session/${caseId}`
    );
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />

              <p className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
                Counsellor Workspace
              </p>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Good Morning, Counsellor
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Monitor your assigned cases, counselling
              sessions and follow-ups.
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[11px] text-slate-400 font-semibold uppercase">
                District
              </p>

              <p className="text-sm font-bold text-slate-800 mt-1">
                {counsellorDistrict}
              </p>
            </div>

            <div className="px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-100">
              <p className="text-[11px] text-indigo-500 font-semibold uppercase">
                Counsellor
              </p>

              <p className="text-sm font-bold text-indigo-900 mt-1">
                {counsellorId}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          KPI CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">

        {/* Critical */}

        <button
          onClick={() =>
            setRiskFilter("Critical")
          }
          className="text-left bg-white border border-red-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-red-200 transition"
        >
          <div className="flex items-center justify-between">

            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <ShieldAlert size={21} />
            </div>

            <span className="text-xs text-red-500 font-semibold">
              Immediate
            </span>

          </div>

          <p className="text-sm text-slate-500 mt-4">
            Critical Cases
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-1">
            {criticalCases}
          </p>

          <p className="text-xs text-red-600 mt-2">
            Requires immediate attention
          </p>
        </button>

        {/* High */}

        <button
          onClick={() =>
            setRiskFilter("High")
          }
          className="text-left bg-white border border-orange-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition"
        >
          <div className="flex items-center justify-between">

            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <AlertTriangle size={21} />
            </div>

            <span className="text-xs text-orange-600 font-semibold">
              Monitor
            </span>

          </div>

          <p className="text-sm text-slate-500 mt-4">
            High Risk
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-1">
            {highRiskCases}
          </p>

          <p className="text-xs text-orange-600 mt-2">
            Serious cases requiring attention
          </p>
        </button>

        {/* Followups */}

        <button
          onClick={() =>
            navigate("/follow-ups")
          }
          className="text-left bg-white border border-amber-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-200 transition"
        >
          <div className="flex items-center justify-between">

            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock3 size={21} />
            </div>

            <span className="text-xs text-amber-600 font-semibold">
              Pending
            </span>

          </div>

          <p className="text-sm text-slate-500 mt-4">
            Pending Follow-ups
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-1">
            {pendingFollowups}
          </p>

          <p className="text-xs text-amber-600 mt-2">
            Counselling / follow-up pending
          </p>
        </button>

        {/* Sessions */}

        <button
          onClick={() =>
            navigate("/counselling-sessions")
          }
          className="text-left bg-white border border-indigo-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition"
        >
          <div className="flex items-center justify-between">

            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CalendarDays size={21} />
            </div>

            <span className="text-xs text-indigo-600 font-semibold">
              Today
            </span>

          </div>

          <p className="text-sm text-slate-500 mt-4">
            Today's Sessions
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-1">
            {todaysSessions}
          </p>

          <p className="text-xs text-indigo-600 mt-2">
            Scheduled counselling sessions
          </p>
        </button>

        {/* Stable */}

        <button
          onClick={() =>
            setRiskFilter("Low")
          }
          className="text-left bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition"
        >
          <div className="flex items-center justify-between">

            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={21} />
            </div>

            <span className="text-xs text-emerald-600 font-semibold">
              Stable
            </span>

          </div>

          <p className="text-sm text-slate-500 mt-4">
            Resolved / Stable
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-1">
            {stableCases}
          </p>

          <p className="text-xs text-emerald-600 mt-2">
            Recent intervention improved
          </p>
        </button>

      </div>

      {/* =====================================================
          ATTENTION PANEL
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Critical Alert */}

        <div className="xl:col-span-2 bg-white border border-red-100 rounded-2xl overflow-hidden shadow-sm">

          <div className="px-5 py-4 border-b border-red-100 bg-red-50/60 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                <ShieldAlert size={19} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Immediate Attention
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Critical case assigned to you
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                setRiskFilter("Critical")
              }
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View Critical
            </button>

          </div>

          <div className="p-5">

            {counsellorCases
              .filter(
                (item) => item.risk === "Critical"
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-red-100 bg-white p-4"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <div className="flex items-center gap-3">

                        <h3 className="font-bold text-slate-900">
                          {item.id}
                        </h3>

                        <RiskBadge risk={item.risk} />

                      </div>

                      <p className="text-sm text-slate-600 mt-2">
                        {item.category}
                      </p>

                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">

                        <span className="flex items-center gap-1">
                          <Activity size={13} />
                          Distress Score:{" "}
                          <strong className="text-red-600">
                            {item.score}/100
                          </strong>
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock3 size={13} />
                          Last check-in: {item.lastCheckin}
                        </span>

                      </div>

                    </div>

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          openCase(item.id)
                        }
                        className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5"
                      >
                        <Eye size={15} />
                        View Case
                      </button>

                      <button
                        onClick={() =>
                          startSession(item.id)
                        }
                        className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 flex items-center gap-1.5"
                      >
                        <HeartHandshake size={15} />
                        Start Session
                      </button>

                    </div>

                  </div>

                </div>
              ))}

          </div>
        </div>

        {/* Today's Sessions */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="px-5 py-4 border-b border-slate-100">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="font-bold text-slate-900">
                  Today's Sessions
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Scheduled counselling
                </p>
              </div>

              <CalendarDays
                size={19}
                className="text-indigo-600"
              />

            </div>

          </div>

          <div className="p-4 space-y-3">

            {counsellorCases
              .filter(
                (item) => item.sessionToday
              )
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    startSession(item.id)
                  }
                  className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition"
                >

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {item.id}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {item.nextFollowup}
                      </p>
                    </div>

                    <ChevronRight
                      size={17}
                      className="text-slate-400"
                    />

                  </div>

                </button>
              ))}

          </div>

        </div>

      </div>

      {/* =====================================================
          ASSIGNED CASES
      ====================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        {/* Header */}

        <div className="p-5 border-b border-slate-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                My Assigned Cases
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Cases assigned to you in {counsellorDistrict}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">

              {/* Search */}

              <div className="relative">

                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search case..."
                  className="w-full sm:w-56 pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />

              </div>

              {/* Filter */}

              <select
                value={riskFilter}
                onChange={(e) =>
                  setRiskFilter(
                    e.target.value as
                      | "All"
                      | RiskLevel
                  )
                }
                className="px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-indigo-400"
              >
                <option value="All">
                  All Risk Levels
                </option>
                <option value="Critical">
                  Critical
                </option>
                <option value="High">
                  High
                </option>
                <option value="Moderate">
                  Moderate
                </option>
                <option value="Low">
                  Low
                </option>
              </select>

            </div>

          </div>

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Case
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Category
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Distress
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Risk
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Trend
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Last Check-in
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  Follow-up
                </th>

                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500">
                  Action
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredCases.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition"
                >

                  <td className="px-5 py-4">

                    <div>
                      <p className="font-bold text-sm text-slate-900">
                        {item.id}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {item.district}
                      </p>
                    </div>

                  </td>

                  <td className="px-5 py-4">

                    <p className="text-sm text-slate-700">
                      {item.category}
                    </p>

                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`text-sm font-bold ${
                        item.score >= 81
                          ? "text-red-600"
                          : item.score >= 61
                          ? "text-orange-600"
                          : item.score >= 31
                          ? "text-amber-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {item.score}
                    </span>

                    <span className="text-xs text-slate-400">
                      /100
                    </span>

                  </td>

                  <td className="px-5 py-4">
                    <RiskBadge risk={item.risk} />
                  </td>

                  <td className="px-5 py-4">
                    <TrendBadge trend={item.trend} />
                  </td>

                  <td className="px-5 py-4">

                    <p className="text-xs text-slate-600">
                      {item.lastCheckin}
                    </p>

                  </td>

                  <td className="px-5 py-4">

                    <p className="text-xs font-medium text-slate-700">
                      {item.nextFollowup}
                    </p>

                    {item.status ===
                      "Follow-up Pending" && (
                      <span className="text-[11px] text-amber-600 font-semibold">
                        Pending
                      </span>
                    )}

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center justify-end gap-2">

                      <button
                        onClick={() =>
                          openCase(item.id)
                        }
                        title="View Case"
                        className="w-9 h-9 rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 flex items-center justify-center transition"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() =>
                          startSession(item.id)
                        }
                        title="Start Counselling"
                        className="w-9 h-9 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center transition"
                      >
                        <HeartHandshake
                          size={16}
                        />
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

          {filteredCases.length === 0 && (
            <div className="py-16 text-center">

              <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center">
                <Search
                  size={20}
                  className="text-slate-400"
                />
              </div>

              <h3 className="font-semibold text-slate-800 mt-4">
                No cases found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Try changing your search or risk filter.
              </p>

            </div>
          )}

        </div>

      </div>

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <button
          onClick={() =>
            navigate("/check-ins")
          }
          className="bg-white border border-slate-200 rounded-2xl p-5 text-left hover:border-indigo-200 hover:shadow-md transition group"
        >

          <div className="flex items-center justify-between">

            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Activity size={19} />
            </div>

            <ChevronRight
              size={18}
              className="text-slate-300 group-hover:text-indigo-500"
            />

          </div>

          <h3 className="font-bold text-slate-900 mt-4">
            Check-in Monitoring
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            Review recent victim well-being check-ins.
          </p>

        </button>

        <button
          onClick={() =>
            navigate("/counselling-sessions")
          }
          className="bg-white border border-slate-200 rounded-2xl p-5 text-left hover:border-indigo-200 hover:shadow-md transition group"
        >

          <div className="flex items-center justify-between">

            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HeartHandshake size={19} />
            </div>

            <ChevronRight
              size={18}
              className="text-slate-300 group-hover:text-indigo-500"
            />

          </div>

          <h3 className="font-bold text-slate-900 mt-4">
            Counselling Sessions
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            Manage scheduled and completed sessions.
          </p>

        </button>

        <button
          onClick={() =>
            navigate("/communication")
          }
          className="bg-white border border-slate-200 rounded-2xl p-5 text-left hover:border-indigo-200 hover:shadow-md transition group"
        >

          <div className="flex items-center justify-between">

            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MessageCircle size={19} />
            </div>

            <ChevronRight
              size={18}
              className="text-slate-300 group-hover:text-indigo-500"
            />

          </div>

          <h3 className="font-bold text-slate-900 mt-4">
            Communication
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            Contact assigned victims through approved channels.
          </p>

        </button>

      </div>

      {/* =====================================================
          HUMAN OVERSIGHT NOTICE
      ====================================================== */}

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">

        <div className="flex items-start gap-3">

          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Users size={18} />
          </div>

          <div>

            <h3 className="font-bold text-indigo-950">
              Human-centred monitoring
            </h3>

            <p className="text-sm text-indigo-900/70 mt-1 leading-6">
              SAMVEDNA provides early-warning and decision-support
              information. AI risk indicators do not diagnose a
              mental-health condition. Counsellor review and human
              judgement are required before intervention decisions.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}