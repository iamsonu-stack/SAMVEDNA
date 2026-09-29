import React from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UserRound,
  Phone,
  CalendarDays,
  ShieldCheck,
  ArrowRight,
  X,
  MessageSquare,
  HeartHandshake,
  FileCheck2,
  Activity,
} from "lucide-react";

type InterventionStatus =
  | "Human Review"
  | "Counsellor Assigned"
  | "Contact Attempted"
  | "Assessment Completed"
  | "Support Provided"
  | "Follow-up Scheduled"
  | "Completed";

type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

type Intervention = {
  id: string;
  caseId: string;
  category: string;
  district: string;
  risk: RiskLevel;
  score: number;
  counsellor: string;
  counsellorStatus: "Available" | "Busy" | "Off Duty";
  type: string;
  status: InterventionStatus;
  createdAt: string;
  lastAction: string;
  nextFollowUp: string;
  priority: "Normal" | "Priority" | "Urgent";
  note: string;
};

const interventionData: Intervention[] = [
  {
    id: "INT-1001",
    caseId: "CASE-1025",
    category: "Caste-based Violence",
    district: "Indore",
    risk: "High",
    score: 78,
    counsellor: "Anita Sharma",
    counsellorStatus: "Busy",
    type: "Counselling",
    status: "Counsellor Assigned",
    createdAt: "26 Sep, 09:20 AM",
    lastAction: "Counsellor assigned",
    nextFollowUp: "Today, 04:00 PM",
    priority: "Priority",
    note: "Distress increased across 3 consecutive check-ins.",
  },
  {
    id: "INT-1002",
    caseId: "CASE-1088",
    category: "Threat / Intimidation",
    district: "Indore",
    risk: "Critical",
    score: 84,
    counsellor: "Rahul Verma",
    counsellorStatus: "Busy",
    type: "Safety / Protection Assessment",
    status: "Human Review",
    createdAt: "26 Sep, 08:45 AM",
    lastAction: "AI alert generated",
    nextFollowUp: "Immediate review",
    priority: "Urgent",
    note: "High distress with recent threat-related response.",
  },
  {
    id: "INT-1003",
    caseId: "CASE-1102",
    category: "Caste-based Violence",
    district: "Indore",
    risk: "Moderate",
    score: 35,
    counsellor: "Anita Sharma",
    counsellorStatus: "Busy",
    type: "Counselling",
    status: "Follow-up Scheduled",
    createdAt: "25 Sep, 11:30 AM",
    lastAction: "Support provided",
    nextFollowUp: "30 Sep, 11:00 AM",
    priority: "Normal",
    note: "Distress trend is decreasing after support.",
  },
  {
    id: "INT-1004",
    caseId: "CASE-1114",
    category: "Rape / Sexual Violence",
    district: "Indore",
    risk: "High",
    score: 68,
    counsellor: "Priya Singh",
    counsellorStatus: "Available",
    type: "Mental-health Professional Referral",
    status: "Assessment Completed",
    createdAt: "25 Sep, 09:15 AM",
    lastAction: "Assessment completed",
    nextFollowUp: "28 Sep, 02:00 PM",
    priority: "Priority",
    note: "Victim requested continued support and follow-up.",
  },
  {
    id: "INT-1005",
    caseId: "CASE-1135",
    category: "Threat / Intimidation",
    district: "Indore",
    risk: "Critical",
    score: 81,
    counsellor: "Rahul Verma",
    counsellorStatus: "Busy",
    type: "Safety / Protection Assessment",
    status: "Contact Attempted",
    createdAt: "24 Sep, 03:40 PM",
    lastAction: "Phone contact attempted",
    nextFollowUp: "Today, 06:00 PM",
    priority: "Urgent",
    note: "Second contact attempt required.",
  },
  {
    id: "INT-1006",
    caseId: "CASE-1150",
    category: "Arson",
    district: "Indore",
    risk: "High",
    score: 63,
    counsellor: "Anita Sharma",
    counsellorStatus: "Busy",
    type: "Welfare Support Referral",
    status: "Support Provided",
    createdAt: "23 Sep, 01:20 PM",
    lastAction: "Welfare support referral recorded",
    nextFollowUp: "29 Sep, 10:30 AM",
    priority: "Priority",
    note: "Support referral completed and follow-up scheduled.",
  },
  {
    id: "INT-1007",
    caseId: "CASE-1172",
    category: "Murder",
    district: "Indore",
    risk: "High",
    score: 76,
    counsellor: "Priya Singh",
    counsellorStatus: "Available",
    type: "Counselling",
    status: "Human Review",
    createdAt: "22 Sep, 10:00 AM",
    lastAction: "Alert awaiting human review",
    nextFollowUp: "Today",
    priority: "Priority",
    note: "Increasing distress trend detected.",
  },
  {
    id: "INT-1008",
    caseId: "CASE-1193",
    category: "Rape / Sexual Violence",
    district: "Indore",
    risk: "High",
    score: 74,
    counsellor: "Rahul Verma",
    counsellorStatus: "Off Duty",
    type: "Mental-health Professional Referral",
    status: "Completed",
    createdAt: "20 Sep, 02:15 PM",
    lastAction: "Follow-up completed",
    nextFollowUp: "Monitoring continues",
    priority: "Normal",
    note: "Intervention completed. Continued monitoring enabled.",
  },
];

const statusOrder: InterventionStatus[] = [
  "Human Review",
  "Counsellor Assigned",
  "Contact Attempted",
  "Assessment Completed",
  "Support Provided",
  "Follow-up Scheduled",
  "Completed",
];

const riskStyles: Record<RiskLevel, string> = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Moderate: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Critical: "bg-red-50 text-red-700 border-red-200",
};

const statusStyles: Record<InterventionStatus, string> = {
  "Human Review": "bg-red-50 text-red-700 border-red-200",
  "Counsellor Assigned": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Contact Attempted": "bg-blue-50 text-blue-700 border-blue-200",
  "Assessment Completed": "bg-purple-50 text-purple-700 border-purple-200",
  "Support Provided": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Follow-up Scheduled": "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-slate-100 text-slate-700 border-slate-200",
};

export default function InterventionsPage() {
  const [search, setSearch] = React.useState("");
  const [riskFilter, setRiskFilter] = React.useState("All");
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [selectedIntervention, setSelectedIntervention] =
    React.useState<Intervention | null>(null);

  const [interventions, setInterventions] =
    React.useState<Intervention[]>(interventionData);

  const filteredInterventions = interventions.filter((item) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      item.caseId.toLowerCase().includes(searchValue) ||
      item.category.toLowerCase().includes(searchValue) ||
      item.counsellor.toLowerCase().includes(searchValue) ||
      item.district.toLowerCase().includes(searchValue);

    const matchesRisk =
      riskFilter === "All" || item.risk === riskFilter;

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesRisk && matchesStatus;
  });

  const stats = {
    total: interventions.length,
    humanReview: interventions.filter(
      (item) => item.status === "Human Review"
    ).length,
    active: interventions.filter(
      (item) =>
        item.status !== "Completed" &&
        item.status !== "Human Review"
    ).length,
    followUps: interventions.filter(
      (item) => item.status === "Follow-up Scheduled"
    ).length,
    completed: interventions.filter(
      (item) => item.status === "Completed"
    ).length,
  };

  const updateStatus = (
    interventionId: string,
    newStatus: InterventionStatus
  ) => {
    setInterventions((current) =>
      current.map((item) =>
        item.id === interventionId
          ? {
              ...item,
              status: newStatus,
              lastAction: newStatus,
            }
          : item
      )
    );

    setSelectedIntervention((current) =>
      current
        ? {
            ...current,
            status: newStatus,
            lastAction: newStatus,
          }
        : null
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-2 text-sm font-medium text-indigo-600">
              <HeartHandshake className="h-4 w-4" />
              Human-centred support workflow
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Interventions
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Track AI alerts, human review, counselling support and
              follow-up actions.
            </p>

          </div>

          <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3">

            <ShieldCheck className="h-5 w-5 text-indigo-600" />

            <div>
              <p className="text-xs font-semibold text-indigo-800">
                Human-in-the-loop
              </p>

              <p className="text-xs text-indigo-600">
                AI recommends • Humans decide
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ================= KPI CARDS ================= */}

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">

        <StatCard
          title="Total Interventions"
          value={stats.total}
          icon={<Activity className="h-5 w-5" />}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Human Review"
          value={stats.humanReview}
          icon={<AlertTriangle className="h-5 w-5" />}
          iconClass="bg-red-50 text-red-600"
        />

        <StatCard
          title="Active Support"
          value={stats.active}
          icon={<HeartHandshake className="h-5 w-5" />}
          iconClass="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Follow-ups"
          value={stats.followUps}
          icon={<CalendarDays className="h-5 w-5" />}
          iconClass="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconClass="bg-emerald-50 text-emerald-600"
        />

      </div>

      {/* ================= WORKFLOW ================= */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-5">

          <h2 className="text-lg font-bold text-slate-900">
            Intervention Workflow
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            AI alert never directly performs an intervention. Human review
            remains part of the workflow.
          </p>

        </div>

        <div className="overflow-x-auto pb-2">

          <div className="flex min-w-[950px] items-center">

            {[
              {
                title: "AI Alert",
                icon: AlertTriangle,
              },
              {
                title: "Human Review",
                icon: Eye,
              },
              {
                title: "Counsellor Assigned",
                icon: UserRound,
              },
              {
                title: "Contact",
                icon: Phone,
              },
              {
                title: "Assessment",
                icon: FileCheck2,
              },
              {
                title: "Support",
                icon: HeartHandshake,
              },
              {
                title: "Follow-up",
                icon: CalendarDays,
              },
            ].map((step, index, array) => {

              const Icon = step.icon;

              return (
                <React.Fragment key={step.title}>

                  <div className="flex min-w-[120px] flex-col items-center text-center">

                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        ${
                          index <= 2
                            ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                            : "border-slate-200 bg-slate-50 text-slate-400"
                        }
                      `}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <p className="mt-2 text-xs font-semibold text-slate-700">
                      {step.title}
                    </p>

                  </div>

                  {index < array.length - 1 && (
                    <div className="mx-2 h-px min-w-[30px] flex-1 bg-slate-200" />
                  )}

                </React.Fragment>
              );
            })}

          </div>

        </div>

      </div>

      {/* ================= FILTER BAR ================= */}

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-3 lg:flex-row">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search case, category, district or counsellor..."
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                py-3
                pl-10
                pr-4
                text-sm
                outline-none
                transition
                focus:border-indigo-400
                focus:bg-white
                focus:ring-2
                focus:ring-indigo-100
              "
            />

          </div>

          {/* RISK */}

          <div className="relative">

            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="
                appearance-none
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                py-3
                pl-10
                pr-10
                text-sm
                outline-none
                focus:border-indigo-400
                focus:ring-2
                focus:ring-indigo-100
              "
            >
              <option value="All">All Risk Levels</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

          </div>

          {/* STATUS */}

          <div className="relative">

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
                appearance-none
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                py-3
                pl-4
                pr-10
                text-sm
                outline-none
                focus:border-indigo-400
                focus:ring-2
                focus:ring-indigo-100
              "
            >
              <option value="All">All Intervention Status</option>

              {statusOrder.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}

            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

          </div>

        </div>

      </div>

      {/* ================= URGENT ALERT ================= */}

      {interventions.some(
        (item) =>
          item.priority === "Urgent" &&
          item.status !== "Completed"
      ) && (

        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4">

          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <div className="flex-1">

              <p className="font-semibold text-red-900">
                Urgent intervention requires human review
              </p>

              <p className="mt-1 text-sm text-red-700">
                Critical-risk cases are awaiting or undergoing human
                intervention. Review the case before assigning support.
              </p>

            </div>

          </div>

        </div>

      )}

      {/* ================= TABLE ================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-4">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-bold text-slate-900">
                Active Interventions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Showing {filteredInterventions.length} of{" "}
                {interventions.length} interventions
              </p>

            </div>

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-indigo-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-indigo-700
              "
            >
              <Plus className="h-4 w-4" />
              New Intervention
            </button>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-[1250px] w-full">

            <thead>

              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Case
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Risk
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Intervention
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Counsellor
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Next Follow-up
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredInterventions.map((item) => (

                <tr
                  key={item.id}
                  className="transition hover:bg-slate-50"
                >

                  {/* CASE */}

                  <td className="px-5 py-4">

                    <div className="font-semibold text-slate-900">
                      {item.caseId}
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      {item.category}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {item.district}
                    </div>

                  </td>

                  {/* RISK */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${riskStyles[item.risk]}`}
                      >
                        {item.risk}
                      </span>

                      <span className="text-sm font-semibold text-slate-700">
                        {item.score}
                      </span>

                    </div>

                    {item.priority === "Urgent" && (
                      <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-red-600">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Urgent
                      </div>
                    )}

                  </td>

                  {/* TYPE */}

                  <td className="px-5 py-4">

                    <p className="text-sm font-medium text-slate-700">
                      {item.type}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.id}
                    </p>

                  </td>

                  {/* COUNSELLOR */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                        <UserRound className="h-4 w-4" />
                      </div>

                      <div>

                        <p className="text-sm font-medium text-slate-700">
                          {item.counsellor}
                        </p>

                        <p
                          className={`mt-1 text-xs font-medium ${
                            item.counsellorStatus === "Available"
                              ? "text-emerald-600"
                              : item.counsellorStatus === "Busy"
                                ? "text-amber-600"
                                : "text-slate-400"
                          }`}
                        >
                          {item.counsellorStatus}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* STATUS */}

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* FOLLOW UP */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <CalendarDays className="h-4 w-4 text-slate-400" />

                      {item.nextFollowUp}

                    </div>

                  </td>

                  {/* ACTION */}

                  <td className="px-5 py-4 text-right">

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedIntervention(item)
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        px-3
                        py-2
                        text-sm
                        font-medium
                        text-slate-700
                        transition
                        hover:border-indigo-200
                        hover:bg-indigo-50
                        hover:text-indigo-700
                      "
                    >

                      <Eye className="h-4 w-4" />

                      View

                    </button>

                  </td>

                </tr>

              ))}

              {filteredInterventions.length === 0 && (

                <tr>

                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center"
                  >

                    <Search className="mx-auto h-10 w-10 text-slate-300" />

                    <h3 className="mt-3 font-semibold text-slate-800">
                      No interventions found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Try changing your search or filters.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">

          <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

            <span>
              Showing{" "}
              <strong className="text-slate-800">
                {filteredInterventions.length}
              </strong>{" "}
              interventions
            </span>

            <span>
              Demo data • SAMVEDNA prototype
            </span>

          </div>

        </div>

      </div>

      {/* =====================================================
          INTERVENTION DETAIL MODAL
      ====================================================== */}

      {selectedIntervention && (

        <InterventionModal
          intervention={selectedIntervention}
          onClose={() => setSelectedIntervention(null)}
          onStatusChange={updateStatus}
        />

      )}

    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>

        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

/* ============================================================
   INTERVENTION MODAL
============================================================ */

function InterventionModal({
  intervention,
  onClose,
  onStatusChange,
}: {
  intervention: Intervention;
  onClose: () => void;
  onStatusChange: (
    interventionId: string,
    newStatus: InterventionStatus
  ) => void;
}) {
  const currentIndex = statusOrder.indexOf(
    intervention.status
  );

  const nextStatus =
    currentIndex < statusOrder.length - 1
      ? statusOrder[currentIndex + 1]
      : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">

      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">

          <div>

            <div className="flex items-center gap-2">

              <HeartHandshake className="h-5 w-5 text-indigo-600" />

              <h2 className="text-xl font-bold text-slate-900">
                Intervention Details
              </h2>

            </div>

            <p className="mt-1 text-sm text-slate-500">
              {intervention.id} • {intervention.caseId}
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        <div className="p-6">

          {/* CASE SUMMARY */}

          <div className="grid gap-4 md:grid-cols-4">

            <InfoBox
              label="Case"
              value={intervention.caseId}
            />

            <InfoBox
              label="Risk"
              value={`${intervention.risk} • ${intervention.score}/100`}
            />

            <InfoBox
              label="District"
              value={intervention.district}
            />

            <InfoBox
              label="Intervention"
              value={intervention.type}
            />

          </div>

          {/* STATUS */}

          <div className="mt-6 rounded-2xl border border-slate-200 p-5">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Current Status
                </p>

                <div className="mt-2 flex items-center gap-3">

                  <span
                    className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${statusStyles[intervention.status]}`}
                  >
                    {intervention.status}
                  </span>

                  {intervention.priority === "Urgent" && (
                    <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                      Urgent
                    </span>
                  )}

                </div>

              </div>

              {nextStatus && (

                <button
                  type="button"
                  onClick={() =>
                    onStatusChange(
                      intervention.id,
                      nextStatus
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-indigo-600
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-indigo-700
                  "
                >

                  Move to {nextStatus}

                  <ArrowRight className="h-4 w-4" />

                </button>

              )}

            </div>

          </div>

          {/* PROGRESS */}

          <div className="mt-6 rounded-2xl border border-slate-200 p-5">

            <h3 className="font-bold text-slate-900">
              Intervention Progress
            </h3>

            <div className="mt-5 space-y-5">

              {statusOrder.map((status, index) => {

                const completed =
                  index <= currentIndex;

                const isCurrent =
                  index === currentIndex;

                return (
                  <div
                    key={status}
                    className="flex items-start gap-4"
                  >

                    <div className="flex flex-col items-center">

                      <div
                        className={`
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          border
                          ${
                            completed
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-slate-200 bg-slate-50 text-slate-400"
                          }
                        `}
                      >

                        {completed ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <span className="text-xs font-bold">
                            {index + 1}
                          </span>
                        )}

                      </div>

                      {index < statusOrder.length - 1 && (
                        <div
                          className={`
                            mt-1
                            h-8
                            w-px
                            ${
                              index < currentIndex
                                ? "bg-indigo-400"
                                : "bg-slate-200"
                            }
                          `}
                        />
                      )}

                    </div>

                    <div className="pt-1">

                      <p
                        className={`text-sm font-semibold ${
                          isCurrent
                            ? "text-indigo-700"
                            : completed
                              ? "text-slate-800"
                              : "text-slate-400"
                        }`}
                      >
                        {status}
                      </p>

                      {isCurrent && (
                        <p className="mt-1 text-xs text-slate-500">
                          Current intervention stage
                        </p>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* COUNSELLOR */}

          <div className="mt-6 rounded-2xl border border-slate-200 p-5">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <UserRound className="h-5 w-5" />
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Assigned Counsellor
                </p>

                <p className="font-semibold text-slate-900">
                  {intervention.counsellor}
                </p>

                <p
                  className={`text-xs font-medium ${
                    intervention.counsellorStatus ===
                    "Available"
                      ? "text-emerald-600"
                      : intervention.counsellorStatus ===
                        "Busy"
                        ? "text-amber-600"
                        : "text-slate-400"
                  }`}
                >
                  {intervention.counsellorStatus}
                </p>

              </div>

            </div>

          </div>

          {/* NOTE */}

          <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">

            <div className="flex items-start gap-3">

              <MessageSquare className="mt-0.5 h-5 w-5 text-indigo-600" />

              <div>

                <p className="text-sm font-semibold text-indigo-900">
                  Intervention Note
                </p>

                <p className="mt-1 text-sm leading-6 text-indigo-700">
                  {intervention.note}
                </p>

              </div>

            </div>

          </div>

          {/* TIMELINE */}

          <div className="mt-6">

            <h3 className="font-bold text-slate-900">
              Activity Timeline
            </h3>

            <div className="mt-4 space-y-4">

              <TimelineItem
                title="Intervention created"
                text={intervention.createdAt}
                icon={<Activity className="h-4 w-4" />}
              />

              <TimelineItem
                title={intervention.lastAction}
                text="Latest intervention activity"
                icon={<CheckCircle2 className="h-4 w-4" />}
              />

              <TimelineItem
                title="Next follow-up"
                text={intervention.nextFollowUp}
                icon={<CalendarDays className="h-4 w-4" />}
              />

            </div>

          </div>

          {/* HUMAN REVIEW NOTICE */}

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">

            <div className="flex items-start gap-3">

              <ShieldCheck className="mt-0.5 h-5 w-5 text-amber-600" />

              <div>

                <p className="text-sm font-semibold text-amber-900">
                  Human review required
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-700">
                  SAMVEDNA provides decision-support signals. It does not
                  diagnose mental illness, prescribe treatment or make legal
                  decisions automatically.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-4">

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              hover:bg-slate-100
            "
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

/* ============================================================
   INFO BOX
============================================================ */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>

    </div>
  );
}

/* ============================================================
   TIMELINE ITEM
============================================================ */

function TimelineItem({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <div>

        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}