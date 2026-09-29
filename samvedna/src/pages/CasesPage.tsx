import React from "react";
import {
  Search,
  Filter,
  Eye,
  ChevronDown,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  allCases,
  type RiskLevel,
  type CaseStatus,
} from "../data/cases";

const riskStyles: Record<RiskLevel, string> = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Moderate: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Critical: "bg-red-50 text-red-700 border-red-200",
};

const statusStyles: Record<CaseStatus, string> = {
  Active: "bg-blue-50 text-blue-700 border-blue-200",
  "Under Review":
    "bg-purple-50 text-purple-700 border-purple-200",
  Monitoring:
    "bg-slate-100 text-slate-700 border-slate-200",
  Closed:
    "bg-gray-100 text-gray-600 border-gray-200",
};

export default function CasesPage() {
  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const [riskFilter, setRiskFilter] =
    React.useState("All");
  const [statusFilter, setStatusFilter] =
    React.useState("All");

  const assignedDistrict =
    localStorage.getItem("samvedna_district") ||
    "Indore";

  const districtCases = allCases.filter(
    (item) =>
      item.district === assignedDistrict
  );

  const filteredCases = districtCases.filter(
    (item) => {
      const query =
        search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        item.id
          .toLowerCase()
          .includes(query) ||
        item.category
          .toLowerCase()
          .includes(query) ||
        item.counsellor
          .toLowerCase()
          .includes(query);

      const matchesRisk =
        riskFilter === "All" ||
        item.risk === riskFilter;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesRisk &&
        matchesStatus
      );
    }
  );

  const riskCounts = {
    Low: districtCases.filter(
      (c) => c.risk === "Low"
    ).length,

    Moderate: districtCases.filter(
      (c) => c.risk === "Moderate"
    ).length,

    High: districtCases.filter(
      (c) => c.risk === "High"
    ).length,

    Critical: districtCases.filter(
      (c) => c.risk === "Critical"
    ).length,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-7">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="flex items-center gap-2 text-sm text-slate-500">

              <ShieldCheck
                className="h-4 w-4 text-indigo-600"
              />

              District Case Management

            </div>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Cases
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor and review cases assigned
              to your district.
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 shadow-sm">

            <MapPin className="h-5 w-5 text-indigo-600" />

            <div>

              <p className="text-xs text-slate-500">
                Assigned District
              </p>

              <p className="font-semibold text-slate-900">
                {assignedDistrict}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* SUMMARY */}

      <div className="mb-7 grid grid-cols-2 gap-4 lg:grid-cols-5">

        <SummaryCard
          title="Total Cases"
          value={districtCases.length}
          subtitle="District cases"
        />

        <SummaryCard
          title="Low Risk"
          value={riskCounts.Low}
          subtitle="0–30"
          valueClass="text-emerald-600"
        />

        <SummaryCard
          title="Moderate"
          value={riskCounts.Moderate}
          subtitle="31–60"
          valueClass="text-amber-600"
        />

        <SummaryCard
          title="High Risk"
          value={riskCounts.High}
          subtitle="61–80"
          valueClass="text-orange-600"
        />

        <SummaryCard
          title="Critical"
          value={riskCounts.Critical}
          subtitle="81–100"
          valueClass="text-red-600"
        />

      </div>

      {/* FILTERS */}

      <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-3 lg:flex-row">

          <div className="relative flex-1">

            <Search
              className="
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search case ID, category or counsellor..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
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

          <div className="relative">

            <Filter
              className="
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

            <select
              value={riskFilter}
              onChange={(e) =>
                setRiskFilter(e.target.value)
              }
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
              <option value="All">
                All Risk Levels
              </option>
              <option value="Low">Low</option>
              <option value="Moderate">
                Moderate
              </option>
              <option value="High">High</option>
              <option value="Critical">
                Critical
              </option>
            </select>

            <ChevronDown
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

          </div>

          <div className="relative">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
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
              <option value="All">
                All Status
              </option>
              <option value="Active">
                Active
              </option>
              <option value="Under Review">
                Under Review
              </option>
              <option value="Monitoring">
                Monitoring
              </option>
              <option value="Closed">
                Closed
              </option>
            </select>

            <ChevronDown
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />

          </div>

        </div>

      </div>

      {/* NOTICE */}

      <div className="mb-5 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3">

        <div className="flex items-start gap-3">

          <ShieldCheck
            className="
              mt-0.5
              h-5
              w-5
              shrink-0
              text-indigo-600
            "
          />

          <div>

            <p className="text-sm font-semibold text-indigo-900">
              District-level access
            </p>

            <p className="mt-1 text-xs leading-5 text-indigo-700">
              Showing {filteredCases.length} of{" "}
              {districtCases.length} cases assigned
              to {assignedDistrict}. Other districts
              are not visible to this District Officer.
            </p>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-[1200px] w-full">

            <thead>

              <tr className="border-b border-slate-200 bg-slate-50">

                {[
                  "Case ID",
                  "Category",
                  "District",
                  "Current Risk",
                  "Previous",
                  "Trend",
                  "Last Check-in",
                  "Counsellor",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className={`
                      px-5
                      py-4
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-500
                      ${
                        heading === "Action"
                          ? "text-right"
                          : ""
                      }
                    `}
                  >
                    {heading}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredCases.map((item) => (

                <tr
                  key={item.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-5 py-4">

                    <div className="font-semibold text-slate-900">
                      {item.id}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      Victim ID masked
                    </div>

                  </td>

                  <td className="max-w-[210px] px-5 py-4">

                    <p className="text-sm font-medium text-slate-700">
                      {item.category}
                    </p>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <MapPin className="h-4 w-4 text-slate-400" />

                      {item.district}

                    </div>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <span
                        className={`
                          rounded-full
                          border
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          ${riskStyles[item.risk]}
                        `}
                      >
                        {item.risk}
                      </span>

                      <span className="text-sm font-semibold text-slate-700">
                        {item.score}
                      </span>

                    </div>

                  </td>

                  <td className="px-5 py-4">

                    <span className="text-sm font-medium text-slate-600">
                      {item.previousScore}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`
                        text-sm
                        font-semibold
                        ${
                          item.score >
                          item.previousScore
                            ? "text-red-600"
                            : item.score <
                                item.previousScore
                              ? "text-emerald-600"
                              : "text-slate-500"
                        }
                      `}
                    >
                      {item.score >
                      item.previousScore
                        ? "↑ "
                        : item.score <
                            item.previousScore
                          ? "↓ "
                          : "→ "}

                      {item.trend}

                    </span>

                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {item.lastCheckIn}
                  </td>

                  <td className="px-5 py-4">

                    <span className="text-sm font-medium text-slate-700">
                      {item.counsellor}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`
                        rounded-full
                        border
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${statusStyles[item.status]}
                      `}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="px-5 py-4 text-right">

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/cases/${item.id}`
                        )
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

              {filteredCases.length === 0 && (

                <tr>

                  <td
                    colSpan={10}
                    className="px-6 py-16 text-center"
                  >

                    <div className="mx-auto max-w-sm">

                      <Search className="mx-auto h-10 w-10 text-slate-300" />

                      <h3 className="mt-3 text-base font-semibold text-slate-800">
                        No cases found
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">

          <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

            <span>
              Showing{" "}
              <strong className="text-slate-800">
                {filteredCases.length}
              </strong>{" "}
              of{" "}
              <strong className="text-slate-800">
                {districtCases.length}
              </strong>{" "}
              district cases
            </span>

            <span>
              Demo data • SAMVEDNA prototype
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  valueClass = "text-slate-900",
}: {
  title: string;
  value: number;
  subtitle: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <p className="text-xs font-medium text-slate-500">
        {title}
      </p>

      <div className="mt-2 flex items-end justify-between gap-2">

        <p
          className={`text-3xl font-bold ${valueClass}`}
        >
          {value}
        </p>

        <span className="text-xs text-slate-400">
          {subtitle}
        </span>

      </div>

    </div>
  );
}