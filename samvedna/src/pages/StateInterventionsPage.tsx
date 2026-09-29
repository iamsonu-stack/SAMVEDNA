import React, { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  HandHeart,
  MapPin,
  Search,
  ShieldAlert,
  TrendingUp,
  Users,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type InterventionStatus =
  | "Completed"
  | "In Progress"
  | "Pending";

type RiskLevel =
  | "High"
  | "Critical";

interface Intervention {
  id: string;
  caseId: string;
  district: string;
  risk: RiskLevel;
  interventionType: string;
  districtOfficer: string;
  counsellor: string;
  status: InterventionStatus;
  date: string;
  followUp: string;
}

/* =========================================================
   DEMO DATA
========================================================= */

const interventions: Intervention[] = [
  {
    id: "INT-1001",
    caseId: "CASE-1025",
    district: "Indore",
    risk: "High",
    interventionType: "Counselling",
    districtOfficer: "Rahul Sharma",
    counsellor: "Anita Verma",
    status: "Completed",
    date: "03 Sep 2026",
    followUp: "Scheduled",
  },

  {
    id: "INT-1002",
    caseId: "CASE-1088",
    district: "Indore",
    risk: "Critical",
    interventionType: "Safety Assessment",
    districtOfficer: "Rahul Sharma",
    counsellor: "Anita Verma",
    status: "In Progress",
    date: "04 Sep 2026",
    followUp: "Required",
  },

  {
    id: "INT-1003",
    caseId: "CASE-1134",
    district: "Bhopal",
    risk: "Critical",
    interventionType: "Counselling",
    districtOfficer: "Priya Verma",
    counsellor: "Rakesh Gupta",
    status: "Pending",
    date: "04 Sep 2026",
    followUp: "Pending",
  },

  {
    id: "INT-1004",
    caseId: "CASE-1150",
    district: "Bhopal",
    risk: "High",
    interventionType: "Welfare Support Referral",
    districtOfficer: "Priya Verma",
    counsellor: "Rakesh Gupta",
    status: "Completed",
    date: "02 Sep 2026",
    followUp: "Scheduled",
  },

  {
    id: "INT-1005",
    caseId: "CASE-1182",
    district: "Ujjain",
    risk: "Critical",
    interventionType: "Mental-health Professional Referral",
    districtOfficer: "Amit Patel",
    counsellor: "Kiran Shah",
    status: "In Progress",
    date: "05 Sep 2026",
    followUp: "Required",
  },

  {
    id: "INT-1006",
    caseId: "CASE-1201",
    district: "Jabalpur",
    risk: "Critical",
    interventionType: "Safety Assessment",
    districtOfficer: "Neha Singh",
    counsellor: "Pooja Mehta",
    status: "Completed",
    date: "01 Sep 2026",
    followUp: "Completed",
  },

  {
    id: "INT-1007",
    caseId: "CASE-1217",
    district: "Jabalpur",
    risk: "High",
    interventionType: "Counselling",
    districtOfficer: "Neha Singh",
    counsellor: "Pooja Mehta",
    status: "Pending",
    date: "05 Sep 2026",
    followUp: "Required",
  },

  {
    id: "INT-1008",
    caseId: "CASE-1240",
    district: "Gwalior",
    risk: "Critical",
    interventionType: "Legal Aid Referral",
    districtOfficer: "Rohit Sharma",
    counsellor: "Sunita Rao",
    status: "In Progress",
    date: "03 Sep 2026",
    followUp: "Scheduled",
  },

  {
    id: "INT-1009",
    caseId: "CASE-1266",
    district: "Sagar",
    risk: "High",
    interventionType: "Welfare Support Referral",
    districtOfficer: "Kavita Jain",
    counsellor: "Vikas Singh",
    status: "Completed",
    date: "31 Aug 2026",
    followUp: "Completed",
  },

  {
    id: "INT-1010",
    caseId: "CASE-1278",
    district: "Indore",
    risk: "High",
    interventionType: "Counselling",
    districtOfficer: "Rahul Sharma",
    counsellor: "Meena Joshi",
    status: "In Progress",
    date: "05 Sep 2026",
    followUp: "Required",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function StateInterventionsPage() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [districtFilter, setDistrictFilter] =
    useState("All");

  const [riskFilter, setRiskFilter] =
    useState("All");

  /* =========================================================
     DISTRICTS
  ========================================================= */

  const districts = [
    "All",
    ...Array.from(
      new Set(
        interventions.map(
          (item) => item.district
        )
      )
    ),
  ];

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredInterventions =
    useMemo(() => {
      return interventions.filter(
        (item) => {
          const search =
            searchTerm.toLowerCase();

          const matchesSearch =
            item.caseId
              .toLowerCase()
              .includes(search) ||
            item.district
              .toLowerCase()
              .includes(search) ||
            item.interventionType
              .toLowerCase()
              .includes(search) ||
            item.districtOfficer
              .toLowerCase()
              .includes(search);

          const matchesStatus =
            statusFilter === "All" ||
            item.status === statusFilter;

          const matchesDistrict =
            districtFilter === "All" ||
            item.district === districtFilter;

          const matchesRisk =
            riskFilter === "All" ||
            item.risk === riskFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesDistrict &&
            matchesRisk
          );
        }
      );
    }, [
      searchTerm,
      statusFilter,
      districtFilter,
      riskFilter,
    ]);

  /* =========================================================
     KPI DATA
  ========================================================= */

  const totalInterventions =
    interventions.length;

  const completed =
    interventions.filter(
      (item) =>
        item.status === "Completed"
    ).length;

  const inProgress =
    interventions.filter(
      (item) =>
        item.status === "In Progress"
    ).length;

  const pending =
    interventions.filter(
      (item) =>
        item.status === "Pending"
    ).length;

  const criticalCases =
    interventions.filter(
      (item) =>
        item.risk === "Critical"
    ).length;

  /* =========================================================
     DISTRICT SUMMARY
  ========================================================= */

  const districtSummary =
    districts
      .filter(
        (district) =>
          district !== "All"
      )
      .map((district) => {
        const districtCases =
          interventions.filter(
            (item) =>
              item.district ===
              district
          );

        return {
          district,

          active:
            districtCases.filter(
              (item) =>
                item.status !==
                "Completed"
            ).length,

          completed:
            districtCases.filter(
              (item) =>
                item.status ===
                "Completed"
            ).length,

          pending:
            districtCases.filter(
              (item) =>
                item.status ===
                "Pending"
            ).length,

          critical:
            districtCases.filter(
              (item) =>
                item.risk ===
                "Critical"
            ).length,
        };
      });

  return (
    <div className="w-full space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section>
        <div className="flex items-center gap-3">

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-indigo-50
              flex
              items-center
              justify-center
            "
          >
            <HandHeart
              size={20}
              className="text-indigo-600"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-indigo-600">
              State Intervention Monitoring
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Intervention Overview
            </h1>
          </div>

        </div>

        <p className="text-sm text-slate-500 mt-2">
          Monitor intervention progress across
          districts without exposing unnecessary
          victim-level information.
        </p>

        <p className="text-xs text-slate-400 mt-2">
          Demo data for prototype demonstration
        </p>
      </section>


      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >

        <KpiCard
          title="Total Interventions"
          value={totalInterventions}
          description="State-wide interventions"
          icon={HandHeart}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <KpiCard
          title="Completed"
          value={completed}
          description="Successfully completed"
          icon={CheckCircle2}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <KpiCard
          title="In Progress"
          value={inProgress}
          description="Currently being handled"
          icon={Activity}
          iconClass="bg-blue-50 text-blue-600"
        />

        <KpiCard
          title="Pending"
          value={pending}
          description="Require attention"
          icon={Clock3}
          iconClass="bg-amber-50 text-amber-600"
        />

      </section>


      {/* =====================================================
          CRITICAL NOTICE
      ===================================================== */}

      <section
        className="
          bg-red-50
          border
          border-red-100
          rounded-2xl
          p-5
        "
      >

        <div className="flex items-start gap-4">

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-red-100
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <ShieldAlert
              size={20}
              className="text-red-600"
            />
          </div>

          <div>

            <h2 className="font-bold text-red-900">
              Critical intervention monitoring
            </h2>

            <p className="text-sm text-red-800 mt-1">
              {criticalCases} critical-risk
              intervention records require
              continued human oversight.
            </p>

            <p className="text-xs text-red-700 mt-2">
              These indicators are prototype
              decision-support signals and do
              not represent a clinical diagnosis.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          DISTRICT SUMMARY
      ===================================================== */}

      <section
        className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >

        <div className="p-5 border-b border-slate-200">

          <div className="flex items-center gap-2">

            <MapPin
              size={19}
              className="text-indigo-600"
            />

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                District Intervention Status
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                State-level view of intervention
                activity by district.
              </p>

            </div>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead>

              <tr className="bg-slate-50 border-b border-slate-200">

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  District
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  Active
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  Completed
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  Pending
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  Critical Cases
                </th>

              </tr>

            </thead>

            <tbody>

              {districtSummary.map(
                (item) => (
                  <tr
                    key={item.district}
                    className="
                      border-b
                      border-slate-100
                      hover:bg-slate-50
                    "
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-indigo-50
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <MapPin
                            size={16}
                            className="text-indigo-600"
                          />
                        </div>

                        <span className="font-semibold text-slate-800">
                          {item.district}
                        </span>

                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <span className="text-sm font-semibold text-blue-600">
                        {item.active}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <span className="text-sm font-semibold text-emerald-600">
                        {item.completed}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <span className="text-sm font-semibold text-amber-600">
                        {item.pending}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`
                          inline-flex
                          px-2.5
                          py-1
                          rounded-full
                          text-xs
                          font-bold

                          ${
                            item.critical > 0
                              ? "bg-red-50 text-red-600"
                              : "bg-slate-100 text-slate-500"
                          }
                        `}
                      >
                        {item.critical}
                      </span>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </section>


      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section
        className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >

        <div className="p-5 border-b border-slate-200">

          <div
            className="
              flex
              flex-col
              gap-4
              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >

            <div>

              <div className="flex items-center gap-2">

                <Filter
                  size={18}
                  className="text-indigo-600"
                />

                <h2 className="text-lg font-bold text-slate-900">
                  Intervention Records
                </h2>

              </div>

              <p className="text-sm text-slate-500 mt-1">
                State-wide intervention activity
              </p>

            </div>


            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
              "
            >

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
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
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


              {/* DISTRICT */}

              <select
                value={districtFilter}
                onChange={(e) =>
                  setDistrictFilter(
                    e.target.value
                  )
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

                {districts.map(
                  (district) => (
                    <option
                      key={district}
                      value={district}
                    >
                      {district === "All"
                        ? "All Districts"
                        : district}
                    </option>
                  )
                )}

              </select>


              {/* STATUS */}

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
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


              {/* RISK */}

              <select
                value={riskFilter}
                onChange={(e) =>
                  setRiskFilter(
                    e.target.value
                  )
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

                <option value="High">
                  High
                </option>

                <option value="Critical">
                  Critical
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* =====================================================
            TABLE
        ===================================================== */}

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
                  Risk
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  Intervention
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  District Officer
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  Follow-up
                </th>

                <th className="px-5 py-3 text-right text-[11px] uppercase tracking-wide text-slate-500">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredInterventions.map(
                (item) => (
                  <tr
                    key={item.id}
                    className="
                      border-b
                      border-slate-100
                      hover:bg-slate-50
                    "
                  >

                    {/* CASE */}

                    <td className="px-5 py-4">

                      <p className="text-sm font-bold text-slate-900">
                        {item.caseId}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {item.id}
                      </p>

                    </td>


                    {/* DISTRICT */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <MapPin
                          size={14}
                          className="text-slate-400"
                        />

                        <span className="text-sm font-semibold text-slate-700">
                          {item.district}
                        </span>

                      </div>

                    </td>


                    {/* RISK */}

                    <td className="px-5 py-4">

                      <RiskBadge
                        risk={item.risk}
                      />

                    </td>


                    {/* INTERVENTION */}

                    <td className="px-5 py-4">

                      <span className="text-sm text-slate-700">
                        {item.interventionType}
                      </span>

                    </td>


                    {/* OFFICER */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <div
                          className="
                            w-8
                            h-8
                            rounded-full
                            bg-indigo-50
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <Users
                            size={14}
                            className="text-indigo-600"
                          />

                        </div>

                        <span className="text-sm font-semibold text-slate-700">
                          {item.districtOfficer}
                        </span>

                      </div>

                    </td>


                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <StatusBadge
                        status={
                          item.status
                        }
                      />

                    </td>


                    {/* FOLLOW-UP */}

                    <td className="px-5 py-4">

                      <span
                        className={`
                          text-xs
                          font-semibold

                          ${
                            item.followUp ===
                            "Required"
                              ? "text-red-600"
                              : item.followUp ===
                                "Completed"
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }
                        `}
                      >
                        {item.followUp}
                      </span>

                    </td>


                    {/* ACTION */}

                    <td className="px-5 py-4 text-right">

                      <button
                        onClick={() =>
                          alert(
                            `Demo: ${item.caseId} intervention details`
                          )
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
                )
              )}

            </tbody>

          </table>


          {/* EMPTY */}

          {filteredInterventions.length ===
            0 && (
            <div className="py-16 text-center">

              <HandHeart
                size={35}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-semibold text-slate-700">
                No interventions found
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Try changing your filters.
              </p>

            </div>
          )}

        </div>

      </section>


      {/* =====================================================
          WORKFLOW
      ===================================================== */}

      <section
        className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          shadow-sm
          p-6
        "
      >

        <div className="flex items-center gap-2 mb-6">

          <TrendingUp
            size={19}
            className="text-indigo-600"
          />

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Intervention Workflow
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Human-centred support process
            </p>

          </div>

        </div>


        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-5
            gap-4
          "
        >

          <WorkflowStep
            number="01"
            title="AI Alert"
            description="Distress indicator detected"
          />

          <WorkflowStep
            number="02"
            title="Human Review"
            description="Officer reviews the signal"
          />

          <WorkflowStep
            number="03"
            title="Support Assigned"
            description="Authorized support assigned"
          />

          <WorkflowStep
            number="04"
            title="Intervention"
            description="Support process initiated"
          />

          <WorkflowStep
            number="05"
            title="Follow-up"
            description="Monitoring continues"
          />

        </div>

      </section>


      {/* =====================================================
          HUMAN OVERSIGHT
      ===================================================== */}

      <section
        className="
          flex
          items-start
          gap-3
          p-4
          rounded-xl
          bg-amber-50
          border
          border-amber-100
        "
      >

        <AlertTriangle
          size={18}
          className="
            text-amber-600
            mt-0.5
            shrink-0
          "
        />

        <div>

          <p className="text-sm font-semibold text-amber-900">
            Human oversight required
          </p>

          <p className="text-xs text-amber-800 mt-1 leading-5">
            SAMVEDNA provides decision-support
            indicators. Intervention decisions are
            made by authorized officers and support
            professionals. AI does not diagnose,
            prescribe treatment, or automatically
            determine legal action.
          </p>

        </div>

      </section>

    </div>
  );
}

/* =========================================================
   KPI CARD
========================================================= */

function KpiCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
  iconClass: string;
}) {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-5
        shadow-sm
      "
    >

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
   RISK BADGE
========================================================= */

function RiskBadge({
  risk,
}: {
  risk: RiskLevel;
}) {
  if (risk === "Critical") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          px-2.5
          py-1
          rounded-full
          bg-red-50
          text-red-600
          text-xs
          font-bold
        "
      >
        <ShieldAlert size={13} />
        Critical
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        px-2.5
        py-1
        rounded-full
        bg-orange-50
        text-orange-600
        text-xs
        font-bold
      "
    >
      <AlertTriangle size={13} />
      High
    </span>
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
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          px-2.5
          py-1
          rounded-full
          bg-emerald-50
          text-emerald-600
          text-xs
          font-bold
        "
      >
        <CheckCircle2 size={13} />
        Completed
      </span>
    );
  }

  if (status === "In Progress") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          px-2.5
          py-1
          rounded-full
          bg-blue-50
          text-blue-600
          text-xs
          font-bold
        "
      >
        <Activity size={13} />
        In Progress
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        px-2.5
        py-1
        rounded-full
        bg-amber-50
        text-amber-600
        text-xs
        font-bold
      "
    >
      <Clock3 size={13} />
      Pending
    </span>
  );
}

/* =========================================================
   WORKFLOW STEP
========================================================= */

function WorkflowStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        relative
        p-4
        rounded-xl
        border
        border-slate-200
        bg-slate-50
      "
    >

      <div
        className="
          w-8
          h-8
          rounded-lg
          bg-indigo-600
          text-white
          flex
          items-center
          justify-center
          text-xs
          font-bold
        "
      >
        {number}
      </div>

      <h3 className="text-sm font-bold text-slate-900 mt-3">
        {title}
      </h3>

      <p className="text-xs text-slate-500 mt-1 leading-5">
        {description}
      </p>

    </div>
  );
}