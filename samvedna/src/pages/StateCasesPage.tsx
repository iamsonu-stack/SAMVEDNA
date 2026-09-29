import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Search,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  UserRound,
  MapPin,
  Eye,
} from "lucide-react";

type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

interface StateCase {
  id: string;
  victimId: string;
  district: string;
  caseCategory: string;
  distressScore: number;
  riskLevel: RiskLevel;
  trend: "Increasing" | "Stable" | "Decreasing";
  districtOfficer: string;
  assignedCounsellor: string;
  lastCheckin: string;
}

/* =========================================================
   DEMO STATE-WIDE CASE DATA
========================================================= */

const stateCases: StateCase[] = [
  {
    id: "CASE-1025",
    victimId: "V-XXXX-1025",
    district: "Indore",
    caseCategory: "Caste-based Violence",
    distressScore: 78,
    riskLevel: "High",
    trend: "Increasing",
    districtOfficer: "Rahul Sharma",
    assignedCounsellor: "Anita Verma",
    lastCheckin: "2 hours ago",
  },

  {
    id: "CASE-1088",
    victimId: "V-XXXX-1088",
    district: "Indore",
    caseCategory: "Threat / Intimidation",
    distressScore: 84,
    riskLevel: "Critical",
    trend: "Increasing",
    districtOfficer: "Rahul Sharma",
    assignedCounsellor: "Anita Verma",
    lastCheckin: "5 hours ago",
  },

  {
    id: "CASE-1102",
    victimId: "V-XXXX-1102",
    district: "Indore",
    caseCategory: "Grievous Hurt",
    distressScore: 43,
    riskLevel: "Moderate",
    trend: "Decreasing",
    districtOfficer: "Rahul Sharma",
    assignedCounsellor: "Meena Joshi",
    lastCheckin: "8 hours ago",
  },

  {
    id: "CASE-1134",
    victimId: "V-XXXX-1134",
    district: "Bhopal",
    caseCategory: "Threat / Intimidation",
    distressScore: 82,
    riskLevel: "Critical",
    trend: "Increasing",
    districtOfficer: "Priya Verma",
    assignedCounsellor: "Rakesh Gupta",
    lastCheckin: "1 hour ago",
  },

  {
    id: "CASE-1150",
    victimId: "V-XXXX-1150",
    district: "Bhopal",
    caseCategory: "Arson",
    distressScore: 74,
    riskLevel: "High",
    trend: "Increasing",
    districtOfficer: "Priya Verma",
    assignedCounsellor: "Rakesh Gupta",
    lastCheckin: "4 hours ago",
  },

  {
    id: "CASE-1161",
    victimId: "V-XXXX-1161",
    district: "Bhopal",
    caseCategory: "Other Atrocity-related Case",
    distressScore: 35,
    riskLevel: "Moderate",
    trend: "Stable",
    districtOfficer: "Priya Verma",
    assignedCounsellor: "Rakesh Gupta",
    lastCheckin: "6 hours ago",
  },

  {
    id: "CASE-1182",
    victimId: "V-XXXX-1182",
    district: "Ujjain",
    caseCategory: "Caste-based Violence",
    distressScore: 81,
    riskLevel: "Critical",
    trend: "Increasing",
    districtOfficer: "Amit Patel",
    assignedCounsellor: "Kiran Shah",
    lastCheckin: "3 hours ago",
  },

  {
    id: "CASE-1195",
    victimId: "V-XXXX-1195",
    district: "Ujjain",
    caseCategory: "Threat / Intimidation",
    distressScore: 52,
    riskLevel: "Moderate",
    trend: "Stable",
    districtOfficer: "Amit Patel",
    assignedCounsellor: "Kiran Shah",
    lastCheckin: "5 hours ago",
  },

  {
    id: "CASE-1201",
    victimId: "V-XXXX-1201",
    district: "Jabalpur",
    caseCategory: "Sexual Violence",
    distressScore: 88,
    riskLevel: "Critical",
    trend: "Increasing",
    districtOfficer: "Neha Singh",
    assignedCounsellor: "Pooja Mehta",
    lastCheckin: "30 minutes ago",
  },

  {
    id: "CASE-1217",
    victimId: "V-XXXX-1217",
    district: "Jabalpur",
    caseCategory: "Threat / Intimidation",
    distressScore: 71,
    riskLevel: "High",
    trend: "Increasing",
    districtOfficer: "Neha Singh",
    assignedCounsellor: "Pooja Mehta",
    lastCheckin: "6 hours ago",
  },

  {
    id: "CASE-1240",
    victimId: "V-XXXX-1240",
    district: "Gwalior",
    caseCategory: "Murder",
    distressScore: 83,
    riskLevel: "Critical",
    trend: "Stable",
    districtOfficer: "Rohit Sharma",
    assignedCounsellor: "Sunita Rao",
    lastCheckin: "2 hours ago",
  },

  {
    id: "CASE-1252",
    victimId: "V-XXXX-1252",
    district: "Gwalior",
    caseCategory: "Grievous Hurt",
    distressScore: 47,
    riskLevel: "Moderate",
    trend: "Decreasing",
    districtOfficer: "Rohit Sharma",
    assignedCounsellor: "Sunita Rao",
    lastCheckin: "7 hours ago",
  },

  {
    id: "CASE-1266",
    victimId: "V-XXXX-1266",
    district: "Sagar",
    caseCategory: "Grievous Hurt",
    distressScore: 65,
    riskLevel: "High",
    trend: "Increasing",
    districtOfficer: "Kavita Jain",
    assignedCounsellor: "Vikas Singh",
    lastCheckin: "7 hours ago",
  },

  {
    id: "CASE-1274",
    victimId: "V-XXXX-1274",
    district: "Sagar",
    caseCategory: "Threat / Intimidation",
    distressScore: 29,
    riskLevel: "Low",
    trend: "Decreasing",
    districtOfficer: "Kavita Jain",
    assignedCounsellor: "Vikas Singh",
    lastCheckin: "9 hours ago",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function StateCasesPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [districtFilter, setDistrictFilter] = useState("All");

  /* =========================================================
     UNIQUE DISTRICTS
  ========================================================= */

  const districts = useMemo(() => {
    return Array.from(
      new Set(stateCases.map((item) => item.district))
    );
  }, []);

  /* =========================================================
     FILTER CASES
  ========================================================= */

  const filteredCases = useMemo(() => {
    return stateCases.filter((item) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(search) ||
        item.district.toLowerCase().includes(search) ||
        item.caseCategory.toLowerCase().includes(search) ||
        item.districtOfficer.toLowerCase().includes(search);

      const matchesRisk =
        riskFilter === "All" ||
        item.riskLevel === riskFilter;

      const matchesDistrict =
        districtFilter === "All" ||
        item.district === districtFilter;

      return (
        matchesSearch &&
        matchesRisk &&
        matchesDistrict
      );
    });
  }, [
    searchTerm,
    riskFilter,
    districtFilter,
  ]);

  /* =========================================================
     SUMMARY
  ========================================================= */

  const totalCases = filteredCases.length;

  const highRisk = filteredCases.filter(
    (item) => item.riskLevel === "High"
  ).length;

  const criticalRisk = filteredCases.filter(
    (item) => item.riskLevel === "Critical"
  ).length;

  const increasing = filteredCases.filter(
    (item) => item.trend === "Increasing"
  ).length;

  /* =========================================================
     IMPORTANT:
     SAVE SELECTED DISTRICT
========================================================= */

  const handleDistrictRisk = (district: string) => {
    localStorage.setItem(
      "samvedna_selected_district",
      district
    );

    navigate("/district-risk");
  };

  /* =========================================================
     VIEW CASE
========================================================= */

  const handleViewCase = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };

  return (
    <div className="w-full space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        <div>

          <div className="flex items-center gap-2 mb-2">

            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">

              <MapPin
                size={17}
                className="text-indigo-600"
              />

            </div>

            <span className="text-sm font-semibold text-indigo-600">
              State Administrator
            </span>

          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            State-wide Cases
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Monitor victim well-being across districts
          </p>

          <p className="text-xs text-slate-400 mt-2">
            Demo data for prototype demonstration
          </p>

        </div>

      </section>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <SummaryCard
          title="Total Cases"
          value={totalCases}
          description="Cases in selected view"
          icon={Activity}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <SummaryCard
          title="High Risk"
          value={highRisk}
          description="Cases requiring monitoring"
          icon={AlertTriangle}
          iconClass="bg-orange-50 text-orange-600"
        />

        <SummaryCard
          title="Critical"
          value={criticalRisk}
          description="Human review required"
          icon={ShieldAlert}
          iconClass="bg-red-50 text-red-600"
        />

        <SummaryCard
          title="Increasing"
          value={increasing}
          description="Rising distress trend"
          icon={TrendingUp}
          iconClass="bg-amber-50 text-amber-600"
        />

      </section>


      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              District-wise Monitoring
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Select a district to view its high and critical cases.
            </p>

          </div>


          <div className="flex flex-col sm:flex-row gap-3">

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={16}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search case/district..."
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
                  focus:ring-indigo-500/20
                "
              />

            </div>


            {/* DISTRICT FILTER */}

            <select
              value={districtFilter}
              onChange={(event) =>
                setDistrictFilter(event.target.value)
              }
              className="
                px-3
                py-2.5
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                outline-none
              "
            >

              <option value="All">
                All Districts
              </option>

              {districts.map((district) => (
                <option
                  key={district}
                  value={district}
                >
                  {district}
                </option>
              ))}

            </select>


            {/* RISK FILTER */}

            <select
              value={riskFilter}
              onChange={(event) =>
                setRiskFilter(event.target.value)
              }
              className="
                px-3
                py-2.5
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                outline-none
              "
            >

              <option value="All">
                All Risk
              </option>

              <option value="Low">
                Low
              </option>

              <option value="Moderate">
                Moderate
              </option>

              <option value="High">
                High
              </option>

              <option value="Critical">
                Critical
              </option>

            </select>

          </div>

        </div>

      </section>


      {/* =====================================================
          DISTRICT CARDS
      ===================================================== */}

      <section>

        <div className="flex items-center justify-between mb-4">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              District Overview
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Current victim well-being condition by district
            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {districts.map((district) => {

            const districtCases = stateCases.filter(
              (item) =>
                item.district === district
            );

            const high = districtCases.filter(
              (item) =>
                item.riskLevel === "High"
            ).length;

            const critical = districtCases.filter(
              (item) =>
                item.riskLevel === "Critical"
            ).length;

            const average = Math.round(
              districtCases.reduce(
                (sum, item) =>
                  sum + item.distressScore,
                0
              ) / districtCases.length
            );

            const officer =
              districtCases[0]?.districtOfficer ||
              "Not assigned";

            return (

              <div
                key={district}
                className="
                  bg-white
                  border
                  border-slate-200
                  rounded-2xl
                  p-5
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div className="
                      w-11
                      h-11
                      rounded-xl
                      bg-indigo-50
                      flex
                      items-center
                      justify-center
                    ">

                      <MapPin
                        size={19}
                        className="text-indigo-600"
                      />

                    </div>

                    <div>

                      <h3 className="font-bold text-slate-900">
                        {district}
                      </h3>

                      <p className="text-xs text-slate-400">
                        {districtCases.length} monitored cases
                      </p>

                    </div>

                  </div>

                  {critical > 0 ? (
                    <span className="
                      px-2.5
                      py-1
                      rounded-full
                      bg-red-50
                      text-red-600
                      text-xs
                      font-bold
                    ">
                      Critical
                    </span>
                  ) : high > 0 ? (
                    <span className="
                      px-2.5
                      py-1
                      rounded-full
                      bg-orange-50
                      text-orange-600
                      text-xs
                      font-bold
                    ">
                      High
                    </span>
                  ) : (
                    <span className="
                      px-2.5
                      py-1
                      rounded-full
                      bg-emerald-50
                      text-emerald-600
                      text-xs
                      font-bold
                    ">
                      Stable
                    </span>
                  )}

                </div>


                {/* CONDITION */}

                <div className="grid grid-cols-3 gap-3 mt-5">

                  <MiniStat
                    label="High"
                    value={String(high)}
                    className="text-orange-600"
                  />

                  <MiniStat
                    label="Critical"
                    value={String(critical)}
                    className="text-red-600"
                  />

                  <MiniStat
                    label="Avg Distress"
                    value={`${average}/100`}
                    className="text-indigo-600"
                  />

                </div>


                {/* OFFICER */}

                <div className="
                  mt-4
                  p-3
                  rounded-xl
                  bg-slate-50
                  border
                  border-slate-100
                ">

                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    District Officer
                  </p>

                  <div className="flex items-center gap-2 mt-1">

                    <div className="
                      w-8
                      h-8
                      rounded-full
                      bg-indigo-50
                      flex
                      items-center
                      justify-center
                    ">

                      <UserRound
                        size={14}
                        className="text-indigo-600"
                      />

                    </div>

                    <span className="text-sm font-semibold text-slate-700">
                      {officer}
                    </span>

                  </div>

                </div>


                {/* BUTTON */}

                <button
                  onClick={() =>
                    handleDistrictRisk(district)
                  }
                  className="
                    w-full
                    mt-4
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    bg-indigo-600
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-indigo-700
                    transition
                  "
                >

                  View District Risk

                  <ArrowRight size={16} />

                </button>

              </div>

            );
          })}

        </div>

      </section>


      {/* =====================================================
          CASE TABLE
      ===================================================== */}

      <section className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        overflow-hidden
      ">

        <div className="p-5 border-b border-slate-200">

          <h2 className="text-lg font-bold text-slate-900">
            State-wide Case List
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            View individual cases and current well-being status.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead>

              <tr className="bg-slate-50 border-b border-slate-200">

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  Case
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  District
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  Category
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  Distress
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  Risk
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  Trend
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  District Officer
                </th>

                <th className="px-5 py-3 text-right text-[11px] uppercase tracking-wide text-slate-500">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredCases.map((item) => (

                <tr
                  key={item.id}
                  className="
                    border-b
                    border-slate-100
                    hover:bg-slate-50
                  "
                >

                  <td className="px-5 py-4">

                    <p className="text-sm font-bold text-slate-900">
                      {item.id}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {item.victimId}
                    </p>

                  </td>


                  <td className="px-5 py-4">

                    <span className="text-sm font-semibold text-slate-700">
                      {item.district}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <span className="text-sm text-slate-700">
                      {item.caseCategory}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <span
                      className={`
                        inline-flex
                        px-2.5
                        py-1
                        rounded-lg
                        text-xs
                        font-bold
                        ${
                          item.distressScore >= 81
                            ? "bg-red-50 text-red-600"
                            : item.distressScore >= 61
                            ? "bg-orange-50 text-orange-600"
                            : item.distressScore >= 31
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600"
                        }
                      `}
                    >
                      {item.distressScore}/100
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <RiskBadge
                      risk={item.riskLevel}
                    />

                  </td>


                  <td className="px-5 py-4">

                    <TrendBadge
                      trend={item.trend}
                    />

                  </td>


                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <div className="
                        w-8
                        h-8
                        rounded-full
                        bg-indigo-50
                        flex
                        items-center
                        justify-center
                      ">

                        <UserRound
                          size={14}
                          className="text-indigo-600"
                        />

                      </div>

                      <span className="text-sm font-semibold text-slate-700">
                        {item.districtOfficer}
                      </span>

                    </div>

                  </td>


                  <td className="px-5 py-4 text-right">

                    <button
                      onClick={() =>
                        handleViewCase(item.id)
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

                      View

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {filteredCases.length === 0 && (

            <div className="py-16 text-center">

              <Activity
                size={35}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-semibold text-slate-700">
                No cases found
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Try changing the search or filters.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          NOTICE
      ===================================================== */}

      <div className="
        flex
        items-start
        gap-3
        p-4
        rounded-xl
        bg-indigo-50
        border
        border-indigo-100
      ">

        <ShieldAlert
          size={18}
          className="text-indigo-600 mt-0.5 shrink-0"
        />

        <div>

          <p className="text-sm font-semibold text-indigo-900">
            State-level privacy
          </p>

          <p className="text-xs text-indigo-800 mt-1 leading-5">
            State administrators primarily view aggregated
            district-level information. Individual sensitive
            details should only be accessed when authorized.
            All data shown here is demo data.
          </p>

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
  description,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: number | string;
  description: string;
  icon: React.ElementType;
  iconClass: string;
}) {
  return (
    <div className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-5
      shadow-sm
    ">

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
          className={`
            w-10
            h-10
            rounded-xl
            flex
            items-center
            justify-center
            ${iconClass}
          `}
        >

          <Icon size={19} />

        </div>

      </div>

      <p className="text-xs text-slate-400 mt-3">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div className="
      p-3
      rounded-xl
      bg-slate-50
      border
      border-slate-100
    ">

      <p className="text-[10px] uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className={`text-sm font-bold mt-1 ${className}`}>
        {value}
      </p>

    </div>
  );
}


/* =========================================================
   RISK BADGE
========================================================= */

function RiskBadge({
  risk,
}: {
  risk: RiskLevel;
}) {
  const config = {
    Low: {
      className: "bg-emerald-50 text-emerald-600",
      label: "Low",
    },

    Moderate: {
      className: "bg-amber-50 text-amber-600",
      label: "Moderate",
    },

    High: {
      className: "bg-orange-50 text-orange-600",
      label: "High",
    },

    Critical: {
      className: "bg-red-50 text-red-600",
      label: "Critical",
    },
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        px-2.5
        py-1
        rounded-full
        text-xs
        font-bold
        ${config[risk].className}
      `}
    >
      {risk === "Critical" ? (
        <ShieldAlert size={13} />
      ) : risk === "High" ? (
        <AlertTriangle size={13} />
      ) : (
        <Activity size={13} />
      )}

      {config[risk].label}
    </span>
  );
}


/* =========================================================
   TREND BADGE
========================================================= */

function TrendBadge({
  trend,
}: {
  trend: StateCase["trend"];
}) {
  if (trend === "Increasing") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600">

        <TrendingUp size={14} />

        Increasing

      </span>
    );
  }

  if (trend === "Decreasing") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">

        <TrendingDown size={14} />

        Decreasing

      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">

      <Activity size={14} />

      Stable

    </span>
  );
}