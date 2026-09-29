import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Eye,
  Search,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

type RiskLevel = "High" | "Critical";

interface RiskCase {
  id: string;
  victimId: string;
  caseNumber: string;
  category: string;
  district: string;
  state: string;
  distressScore: number;
  riskLevel: RiskLevel;
  trend: "Increasing" | "Stable" | "Decreasing";
  districtOfficer: string;
  lastCheckin: string;
}

const riskCases: RiskCase[] = [
  {
    id: "1",
    victimId: "V-XXXX-1025",
    caseNumber: "CASE-1025",
    category: "Caste-based Violence",
    district: "Indore",
    state: "Madhya Pradesh",
    distressScore: 78,
    riskLevel: "High",
    trend: "Increasing",
    districtOfficer: "Rajesh Sharma",
    lastCheckin: "2 hours ago",
  },
  {
    id: "2",
    victimId: "V-XXXX-1088",
    caseNumber: "CASE-1088",
    category: "Threat / Intimidation",
    district: "Bhopal",
    state: "Madhya Pradesh",
    distressScore: 84,
    riskLevel: "Critical",
    trend: "Increasing",
    districtOfficer: "Priya Verma",
    lastCheckin: "5 hours ago",
  },
  {
    id: "3",
    victimId: "V-XXXX-1102",
    caseNumber: "CASE-1102",
    category: "Grievous Hurt",
    district: "Ujjain",
    state: "Madhya Pradesh",
    distressScore: 73,
    riskLevel: "High",
    trend: "Increasing",
    districtOfficer: "Amit Singh",
    lastCheckin: "3 hours ago",
  },
  {
    id: "4",
    victimId: "V-XXXX-1115",
    caseNumber: "CASE-1115",
    category: "Threat / Intimidation",
    district: "Jabalpur",
    state: "Madhya Pradesh",
    distressScore: 88,
    riskLevel: "Critical",
    trend: "Increasing",
    districtOfficer: "Neha Patel",
    lastCheckin: "1 hour ago",
  },
  {
    id: "5",
    victimId: "V-XXXX-1142",
    caseNumber: "CASE-1142",
    category: "Arson",
    district: "Jabalpur",
    state: "Madhya Pradesh",
    distressScore: 67,
    riskLevel: "High",
    trend: "Stable",
    districtOfficer: "Neha Patel",
    lastCheckin: "6 hours ago",
  },
  {
    id: "6",
    victimId: "V-XXXX-1160",
    caseNumber: "CASE-1160",
    category: "Caste-based Violence",
    district: "Gwalior",
    state: "Madhya Pradesh",
    distressScore: 82,
    riskLevel: "Critical",
    trend: "Increasing",
    districtOfficer: "Vivek Tiwari",
    lastCheckin: "4 hours ago",
  },
  {
    id: "7",
    victimId: "V-XXXX-1178",
    caseNumber: "CASE-1178",
    category: "Sexual Violence",
    district: "Sagar",
    state: "Madhya Pradesh",
    distressScore: 64,
    riskLevel: "High",
    trend: "Stable",
    districtOfficer: "Anita Sharma",
    lastCheckin: "7 hours ago",
  },
  {
    id: "8",
    victimId: "V-XXXX-1191",
    caseNumber: "CASE-1191",
    category: "Threat / Intimidation",
    district: "Indore",
    state: "Madhya Pradesh",
    distressScore: 91,
    riskLevel: "Critical",
    trend: "Increasing",
    districtOfficer: "Rajesh Sharma",
    lastCheckin: "45 minutes ago",
  },
];

const districts = [
  "All Districts",
  ...Array.from(new Set(riskCases.map((item) => item.district))),
];

export default function DistrictRiskPage() {
  const navigate = useNavigate();

  const [selectedDistrict, setSelectedDistrict] =
    useState("All Districts");

  const [selectedRisk, setSelectedRisk] =
    useState("All Risk");

  const [search, setSearch] = useState("");

  const filteredCases = useMemo(() => {
    return riskCases.filter((item) => {
      const districtMatch =
        selectedDistrict === "All Districts" ||
        item.district === selectedDistrict;

      const riskMatch =
        selectedRisk === "All Risk" ||
        item.riskLevel === selectedRisk;

      const searchMatch =
        item.caseNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.district
          .toLowerCase()
          .includes(search.toLowerCase());

      return districtMatch && riskMatch && searchMatch;
    });
  }, [selectedDistrict, selectedRisk, search]);

  const highRiskCount = riskCases.filter(
    (item) => item.riskLevel === "High"
  ).length;

  const criticalCount = riskCases.filter(
    (item) => item.riskLevel === "Critical"
  ).length;

  const increasingCount = riskCases.filter(
    (item) => item.trend === "Increasing"
  ).length;

  return (
    <div className="w-full space-y-6">

      {/* HEADER */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <button
            onClick={() => navigate("/state-dashboard")}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-3"
          >
            <ArrowLeft size={16} />
            Back to State Dashboard
          </button>

          <div className="flex items-center gap-2">

            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
              <ShieldAlert
                size={19}
                className="text-indigo-600"
              />
            </div>

            <span className="text-sm font-semibold text-indigo-600">
              State Risk Monitoring
            </span>

          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            District Risk Overview
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            High-risk and critical cases across districts
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Demo data for prototype demonstration
          </p>

        </div>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <RiskKpi
          title="High-Risk Victims"
          value={highRiskCount}
          description="Requires closer monitoring"
          icon={<AlertTriangle size={20} />}
          className="bg-orange-50 text-orange-600"
        />

        <RiskKpi
          title="Critical Victims"
          value={criticalCount}
          description="Human review required"
          icon={<ShieldAlert size={20} />}
          className="bg-red-50 text-red-600"
        />

        <RiskKpi
          title="Increasing Risk"
          value={increasingCount}
          description="Distress trend increasing"
          icon={<TrendingUp size={20} />}
          className="bg-amber-50 text-amber-600"
        />

        <RiskKpi
          title="Districts Covered"
          value={districts.length - 1}
          description="Monitored districts"
          icon={<Users size={20} />}
          className="bg-indigo-50 text-indigo-600"
        />

      </div>


      {/* DISTRICT SUMMARY */}

      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              District Risk Summary
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Where high and critical distress cases are concentrated
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {districts
            .filter((district) => district !== "All Districts")
            .map((district) => {

              const districtCases = riskCases.filter(
                (item) => item.district === district
              );

              const high = districtCases.filter(
                (item) => item.riskLevel === "High"
              ).length;

              const critical = districtCases.filter(
                (item) => item.riskLevel === "Critical"
              ).length;

              const avgScore = Math.round(
                districtCases.reduce(
                  (sum, item) => sum + item.distressScore,
                  0
                ) / districtCases.length
              );

              return (
                <div
                  key={district}
                  className="border border-slate-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="font-bold text-slate-900">
                        {district}
                      </h3>

                      <p className="text-xs text-slate-400">
                        Madhya Pradesh
                      </p>

                    </div>

                    <span className="text-sm font-bold text-slate-700">
                      {avgScore}/100
                    </span>

                  </div>


                  <div className="grid grid-cols-2 gap-3 mt-4">

                    <div className="rounded-lg bg-orange-50 p-3">

                      <p className="text-xs text-orange-600">
                        High Risk
                      </p>

                      <p className="text-xl font-bold text-orange-700">
                        {high}
                      </p>

                    </div>

                    <div className="rounded-lg bg-red-50 p-3">

                      <p className="text-xs text-red-600">
                        Critical
                      </p>

                      <p className="text-xl font-bold text-red-700">
                        {critical}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

        </div>

      </section>


      {/* FILTERS */}

      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <div className="p-5 border-b border-slate-200">

          <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                High & Critical Risk Cases
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Case-level view with assigned district officer
              </p>

            </div>


            <div className="flex flex-col sm:flex-row gap-3">

              {/* SEARCH */}

              <div className="relative">

                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search case..."
                  className="
                    w-full
                    sm:w-56
                    pl-9
                    pr-3
                    py-2.5
                    rounded-xl
                    border
                    border-slate-200
                    text-sm
                    outline-none
                    focus:border-indigo-400
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                />

              </div>


              {/* DISTRICT */}

              <select
                value={selectedDistrict}
                onChange={(e) =>
                  setSelectedDistrict(e.target.value)
                }
                className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none"
              >

                {districts.map((district) => (
                  <option key={district}>
                    {district}
                  </option>
                ))}

              </select>


              {/* RISK */}

              <select
                value={selectedRisk}
                onChange={(e) =>
                  setSelectedRisk(e.target.value)
                }
                className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none"
              >

                <option>All Risk</option>
                <option>High</option>
                <option>Critical</option>

              </select>

            </div>

          </div>

        </div>


        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1050px]">

            <thead>

              <tr className="bg-slate-50 border-b border-slate-200">

                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-500">
                  Case
                </th>

                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-500">
                  Category
                </th>

                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-500">
                  District
                </th>

                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-500">
                  Distress
                </th>

                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-500">
                  Risk
                </th>

                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-500">
                  Trend
                </th>

                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-500">
                  District Officer
                </th>

                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase text-slate-500">
                  Last Check-in
                </th>

                <th className="px-5 py-3 text-right text-[11px] font-bold uppercase text-slate-500">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredCases.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >

                  {/* CASE */}

                  <td className="px-5 py-4">

                    <div>

                      <p className="font-semibold text-sm text-slate-900">
                        {item.caseNumber}
                      </p>

                      <p className="text-xs text-slate-400">
                        {item.victimId}
                      </p>

                    </div>

                  </td>


                  {/* CATEGORY */}

                  <td className="px-5 py-4">

                    <span className="text-sm text-slate-700">
                      {item.category}
                    </span>

                  </td>


                  {/* DISTRICT */}

                  <td className="px-5 py-4">

                    <div>

                      <p className="text-sm font-semibold text-slate-800">
                        {item.district}
                      </p>

                      <p className="text-xs text-slate-400">
                        {item.state}
                      </p>

                    </div>

                  </td>


                  {/* DISTRESS */}

                  <td className="px-5 py-4">

                    <span
                      className={`
                        inline-flex
                        px-3
                        py-1.5
                        rounded-lg
                        text-xs
                        font-bold
                        ${
                          item.distressScore >= 81
                            ? "bg-red-50 text-red-600"
                            : "bg-orange-50 text-orange-600"
                        }
                      `}
                    >
                      {item.distressScore}/100
                    </span>

                  </td>


                  {/* RISK */}

                  <td className="px-5 py-4">

                    <span
                      className={`
                        inline-flex
                        px-2.5
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${
                          item.riskLevel === "Critical"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      `}
                    >
                      {item.riskLevel}
                    </span>

                  </td>


                  {/* TREND */}

                  <td className="px-5 py-4">

                    {item.trend === "Increasing" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600">
                        <TrendingUp size={14} />
                        Increasing
                      </span>
                    ) : item.trend === "Decreasing" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <TrendingDown size={14} />
                        Decreasing
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-500">
                        Stable
                      </span>
                    )}

                  </td>


                  {/* OFFICER */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                        {item.districtOfficer
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {item.districtOfficer}
                      </span>

                    </div>

                  </td>


                  {/* CHECK-IN */}

                  <td className="px-5 py-4">

                    <span className="text-xs text-slate-500">
                      {item.lastCheckin}
                    </span>

                  </td>


                  {/* ACTION */}

                  <td className="px-5 py-4 text-right">

                    <button
                      onClick={() =>
                        navigate(`/cases/${item.caseNumber}`)
                      }
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-2
                        rounded-lg
                        bg-indigo-50
                        text-indigo-600
                        text-xs
                        font-semibold
                        hover:bg-indigo-100
                      "
                    >

                      <Eye size={14} />

                      View Case

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {filteredCases.length === 0 && (

            <div className="py-14 text-center">

              <Users
                size={35}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-semibold text-slate-700">
                No risk cases found
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Try another district or risk filter.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* INFORMATION */}

      <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">

        <p className="text-sm font-semibold text-indigo-900">
          State Administrator View
        </p>

        <p className="text-xs text-indigo-700 mt-1">
          This view provides aggregated risk monitoring across
          districts. Individual victim information is masked.
          High and critical alerts require human review.
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   KPI COMPONENT
========================================================= */

function RiskKpi({
  title,
  value,
  description,
  icon,
  className,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  className: string;
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
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${className}`}
        >
          {icon}
        </div>

      </div>

      <p className="text-xs text-slate-400 mt-3">
        {description}
      </p>

    </div>
  );
}