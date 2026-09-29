import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  Filter,
  HandHeart,
  Search,
  Users,
  X,
} from "lucide-react";

type InterventionStatus =
  | "Completed"
  | "In Progress"
  | "Pending";

type Intervention = {
  id: string;
  caseId: string;
  state: string;
  district: string;
  type: string;
  counsellor: string;
  status: InterventionStatus;
  date: string;
};

const interventions: Intervention[] = [
  {
    id: "INT-1001",
    caseId: "CASE-1025",
    state: "Madhya Pradesh",
    district: "Indore",
    type: "Counselling",
    counsellor: "Anita Sharma",
    status: "Completed",
    date: "03 Sep 2026",
  },
  {
    id: "INT-1002",
    caseId: "CASE-1088",
    state: "Madhya Pradesh",
    district: "Bhopal",
    type: "Safety Assessment",
    counsellor: "Rahul Verma",
    status: "In Progress",
    date: "04 Sep 2026",
  },
  {
    id: "INT-1003",
    caseId: "CASE-1102",
    state: "Rajasthan",
    district: "Jaipur",
    type: "Legal Aid Referral",
    counsellor: "Priya Singh",
    status: "Completed",
    date: "04 Sep 2026",
  },
  {
    id: "INT-1004",
    caseId: "CASE-1117",
    state: "Maharashtra",
    district: "Nagpur",
    type: "Mental Health Referral",
    counsellor: "Neha Patel",
    status: "Pending",
    date: "05 Sep 2026",
  },
  {
    id: "INT-1005",
    caseId: "CASE-1132",
    state: "Uttar Pradesh",
    district: "Lucknow",
    type: "Welfare Support",
    counsellor: "Amit Kumar",
    status: "Completed",
    date: "05 Sep 2026",
  },
  {
    id: "INT-1006",
    caseId: "CASE-1150",
    state: "Gujarat",
    district: "Ahmedabad",
    type: "Counselling",
    counsellor: "Kavita Shah",
    status: "In Progress",
    date: "06 Sep 2026",
  },
  {
    id: "INT-1007",
    caseId: "CASE-1164",
    state: "Chhattisgarh",
    district: "Raipur",
    type: "Rehabilitation Support",
    counsellor: "Ravi Singh",
    status: "Pending",
    date: "06 Sep 2026",
  },
  {
    id: "INT-1008",
    caseId: "CASE-1181",
    state: "Madhya Pradesh",
    district: "Jabalpur",
    type: "Follow-up Support",
    counsellor: "Pooja Sharma",
    status: "Completed",
    date: "07 Sep 2026",
  },
];

export default function InterventionAnalyticsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"All" | InterventionStatus>("All");
  const [stateFilter, setStateFilter] =
    useState("All States");

  const [selected, setSelected] =
    useState<Intervention | null>(null);

  const states = Array.from(
    new Set(interventions.map((item) => item.state))
  );

  const filteredData = useMemo(() => {
    return interventions.filter((item) => {
      const matchesSearch =
        item.caseId
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.counsellor
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.district
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.type
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesState =
        stateFilter === "All States" ||
        item.state === stateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesState
      );
    });
  }, [search, statusFilter, stateFilter]);

  const total = interventions.length;

  const completed = interventions.filter(
    (item) => item.status === "Completed"
  ).length;

  const inProgress = interventions.filter(
    (item) => item.status === "In Progress"
  ).length;

  const pending = interventions.filter(
    (item) => item.status === "Pending"
  ).length;

  const completionRate = Math.round(
    (completed / total) * 100
  );

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setStateFilter("All States");
  };

  const exportCSV = () => {
    const header =
      "Intervention ID,Case ID,State,District,Type,Counsellor,Status,Date";

    const rows = filteredData.map((item) =>
      [
        item.id,
        item.caseId,
        item.state,
        item.district,
        item.type,
        item.counsellor,
        item.status,
        item.date,
      ]
        .map((value) => `"${value}"`)
        .join(",")
    );

    const csv =
      [header, ...rows].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "SAMVEDNA_Intervention_Analytics.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 space-y-6">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
              <HandHeart
                size={22}
                className="text-indigo-600"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Intervention Analytics
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                National-level intervention monitoring
                and outcome overview
              </p>
            </div>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/national-dashboard")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Dashboard
          </button>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700"
          >
            <Download size={16} />
            Export CSV
          </button>

        </div>

      </div>

      {/* DEMO NOTICE */}

      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">

        <p className="text-sm font-semibold text-indigo-900">
          National Intervention Monitoring
        </p>

        <p className="text-xs text-indigo-700 mt-1">
          Demo data for SAMVEDNA SIH prototype.
          This dashboard shows aggregated intervention
          information and does not represent official
          government statistics.
        </p>

      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <Kpi
          title="Total Interventions"
          value={total}
          icon={<HandHeart size={20} />}
          bg="bg-indigo-50"
          text="text-indigo-600"
        />

        <Kpi
          title="Completed"
          value={completed}
          icon={<CheckCircle2 size={20} />}
          bg="bg-emerald-50"
          text="text-emerald-600"
        />

        <Kpi
          title="In Progress"
          value={inProgress}
          icon={<Clock3 size={20} />}
          bg="bg-orange-50"
          text="text-orange-600"
        />

        <Kpi
          title="Completion Rate"
          value={`${completionRate}%`}
          icon={<Users size={20} />}
          bg="bg-purple-50"
          text="text-purple-600"
        />

      </div>

      {/* STATUS SUMMARY */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <SummaryCard
          title="Completed"
          value={completed}
          percentage={Math.round(
            (completed / total) * 100
          )}
          color="bg-emerald-500"
        />

        <SummaryCard
          title="In Progress"
          value={inProgress}
          percentage={Math.round(
            (inProgress / total) * 100
          )}
          color="bg-orange-500"
        />

        <SummaryCard
          title="Pending"
          value={pending}
          percentage={Math.round(
            (pending / total) * 100
          )}
          color="bg-slate-400"
        />

      </div>

      {/* FILTERS */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="flex items-center gap-2 mb-4">

          <Filter
            size={18}
            className="text-indigo-600"
          />

          <h2 className="font-bold text-slate-900">
            Intervention Filters
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

          {/* SEARCH */}

          <div className="relative">

            <Search
              size={17}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search case, district..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-400"
            />

          </div>

          {/* STATE */}

          <select
            value={stateFilter}
            onChange={(e) =>
              setStateFilter(e.target.value)
            }
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white outline-none"
          >

            <option>
              All States
            </option>

            {states.map((state) => (
              <option
                key={state}
                value={state}
              >
                {state}
              </option>
            ))}

          </select>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as
                  | "All"
                  | InterventionStatus
              )
            }
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white outline-none"
          >

            <option value="All">
              All Status
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Pending">
              Pending
            </option>

          </select>

          {/* CLEAR */}

          <button
            onClick={clearFilters}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50"
          >
            Clear Filters
          </button>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 border-b border-slate-200 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              National Intervention Records
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Showing {filteredData.length} intervention records
            </p>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1050px]">

            <thead>

              <tr className="bg-slate-50 border-b border-slate-200">

                <Th text="Intervention" />
                <Th text="Case" />
                <Th text="State" />
                <Th text="District" />
                <Th text="Type" />
                <Th text="Counsellor" />
                <Th text="Status" />
                <Th text="Date" />

                <th className="px-5 py-3 text-right text-xs text-slate-500 uppercase">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredData.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >

                  <td className="px-5 py-4">

                    <span className="font-semibold text-indigo-600 text-sm">
                      {item.id}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <span className="font-semibold text-slate-800 text-sm">
                      {item.caseId}
                    </span>

                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {item.state}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {item.district}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {item.type}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {item.counsellor}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={item.status}
                    />
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {item.date}
                  </td>

                  <td className="px-5 py-4 text-right">

                    <button
                      onClick={() =>
                        setSelected(item)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-semibold hover:bg-indigo-100"
                    >
                      <Eye size={14} />
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {filteredData.length === 0 && (

          <div className="p-12 text-center">

            <p className="font-semibold text-slate-700">
              No interventions found
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Try changing the filters.
            </p>

          </div>

        )}

      </div>

      {/* HUMAN OVERSIGHT */}

      <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">

        <p className="font-semibold text-amber-900 text-sm">
          Human oversight
        </p>

        <p className="text-xs text-amber-800 mt-1 leading-5">
          Intervention analytics are decision-support
          indicators for authorized administrators.
          They do not diagnose mental illness or
          automatically determine legal or protection
          decisions.
        </p>

      </div>

      {/* DETAIL MODAL */}

      {selected && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">

            <div className="p-5 border-b border-slate-200 flex items-center justify-between">

              <div>

                <p className="text-xs text-indigo-600 font-bold uppercase">
                  Intervention Details
                </p>

                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {selected.id}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelected(null)
                }
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6 space-y-4">

              <DetailRow
                label="Case ID"
                value={selected.caseId}
              />

              <DetailRow
                label="State"
                value={selected.state}
              />

              <DetailRow
                label="District"
                value={selected.district}
              />

              <DetailRow
                label="Intervention Type"
                value={selected.type}
              />

              <DetailRow
                label="Counsellor"
                value={selected.counsellor}
              />

              <DetailRow
                label="Date"
                value={selected.date}
              />

              <div className="pt-2">
                <StatusBadge
                  status={selected.status}
                />
              </div>

            </div>

            <div className="p-5 border-t border-slate-200 flex justify-end">

              <button
                onClick={() =>
                  setSelected(null)
                }
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* =========================================================
   KPI
========================================================= */

function Kpi({
  title,
  value,
  icon,
  bg,
  text,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bg: string;
  text: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-2">
            {value}
          </p>

        </div>

        <div
          className={`w-10 h-10 rounded-xl ${bg} ${text} flex items-center justify-center`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
  percentage,
  color,
}: {
  title: string;
  value: number;
  percentage: number;
  color: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

      <div className="flex justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-1">
            {value}
          </p>
        </div>

        <p className="text-sm font-bold text-slate-700">
          {percentage}%
        </p>

      </div>

      <div className="h-2 bg-slate-100 rounded-full mt-5 overflow-hidden">

        <div
          className={`h-full ${color} rounded-full`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

/* =========================================================
   TABLE HEADER
========================================================= */

function Th({
  text,
}: {
  text: string;
}) {
  return (
    <th className="px-5 py-3 text-left text-xs uppercase tracking-wide text-slate-500">
      {text}
    </th>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: InterventionStatus;
}) {
  if (status === "Completed") {
    return (
      <span className="inline-flex px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">
        Completed
      </span>
    );
  }

  if (status === "In Progress") {
    return (
      <span className="inline-flex px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold">
        In Progress
      </span>
    );
  }

  return (
    <span className="inline-flex px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold">
      Pending
    </span>
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-800 text-right">
        {value}
      </span>

    </div>
  );
}