import React, { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  FileText,
  MapPin,
  ShieldAlert,
  Users,
} from "lucide-react";

type StateData = {
  state: string;
  cases: number;
  monitoring: number;
  low: number;
  moderate: number;
  high: number;
  critical: number;
  distress: number;
  response: number;
  interventions: number;
  completed: number;
  trend: "Increasing" | "Stable" | "Decreasing";
};

const stateData: StateData[] = [
  {
    state: "Madhya Pradesh",
    cases: 1248,
    monitoring: 1173,
    low: 820,
    moderate: 280,
    high: 110,
    critical: 38,
    distress: 58,
    response: 91,
    interventions: 342,
    completed: 294,
    trend: "Increasing",
  },
  {
    state: "Maharashtra",
    cases: 1135,
    monitoring: 1068,
    low: 748,
    moderate: 231,
    high: 69,
    critical: 20,
    distress: 52,
    response: 89,
    interventions: 318,
    completed: 281,
    trend: "Stable",
  },
  {
    state: "Rajasthan",
    cases: 986,
    monitoring: 914,
    low: 641,
    moderate: 196,
    high: 61,
    critical: 16,
    distress: 49,
    response: 87,
    interventions: 274,
    completed: 236,
    trend: "Decreasing",
  },
  {
    state: "Uttar Pradesh",
    cases: 1562,
    monitoring: 1450,
    low: 914,
    moderate: 361,
    high: 133,
    critical: 42,
    distress: 63,
    response: 84,
    interventions: 426,
    completed: 351,
    trend: "Increasing",
  },
  {
    state: "Chhattisgarh",
    cases: 742,
    monitoring: 681,
    low: 461,
    moderate: 149,
    high: 54,
    critical: 17,
    distress: 51,
    response: 86,
    interventions: 198,
    completed: 171,
    trend: "Stable",
  },
  {
    state: "Gujarat",
    cases: 894,
    monitoring: 831,
    low: 594,
    moderate: 173,
    high: 51,
    critical: 13,
    distress: 47,
    response: 90,
    interventions: 231,
    completed: 204,
    trend: "Decreasing",
  },
  {
    state: "Bihar",
    cases: 1107,
    monitoring: 1021,
    low: 663,
    moderate: 248,
    high: 84,
    critical: 26,
    distress: 57,
    response: 82,
    interventions: 305,
    completed: 248,
    trend: "Increasing",
  },
  {
    state: "Odisha",
    cases: 636,
    monitoring: 581,
    low: 402,
    moderate: 121,
    high: 44,
    critical: 14,
    distress: 48,
    response: 88,
    interventions: 174,
    completed: 153,
    trend: "Stable",
  },
];

export default function NationalDashboard() {
  const [selectedState, setSelectedState] =
    useState("All States");

  const filteredStates = useMemo(() => {
    if (selectedState === "All States") {
      return stateData;
    }

    return stateData.filter(
      (item) => item.state === selectedState
    );
  }, [selectedState]);

  const totalCases = stateData.reduce(
    (sum, item) => sum + item.cases,
    0
  );

  const totalMonitoring = stateData.reduce(
    (sum, item) => sum + item.monitoring,
    0
  );

  const totalHigh = stateData.reduce(
    (sum, item) => sum + item.high,
    0
  );

  const totalCritical = stateData.reduce(
    (sum, item) => sum + item.critical,
    0
  );

  const averageDistress = Math.round(
    stateData.reduce(
      (sum, item) => sum + item.distress,
      0
    ) / stateData.length
  );

  const averageResponse = Math.round(
    stateData.reduce(
      (sum, item) => sum + item.response,
      0
    ) / stateData.length
  );

  const totalInterventions = stateData.reduce(
    (sum, item) => sum + item.interventions,
    0
  );

  const completedInterventions = stateData.reduce(
    (sum, item) => sum + item.completed,
    0
  );

  const interventionRate = Math.round(
    (completedInterventions /
      totalInterventions) *
      100
  );

  const highestRiskState = [...stateData].sort(
    (a, b) =>
      b.high +
      b.critical -
      (a.high + a.critical)
  )[0];

  return (
    <div className="w-full space-y-6">

      {/* HEADER */}

      <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

        <div>

          <div className="flex items-center gap-2 mb-2">

            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
              <BarChart3
                size={19}
                className="text-indigo-600"
              />
            </div>

            <span className="text-sm font-semibold text-indigo-600">
              National Intelligence & Analytics
            </span>

          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            National Administrator Dashboard
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            National overview of victim well-being,
            distress trends and state-level monitoring
          </p>

        </div>

        <div className="flex items-center gap-3">

          <select
            value={selectedState}
            onChange={(e) =>
              setSelectedState(e.target.value)
            }
            className="
              px-4
              py-2.5
              rounded-xl
              border
              border-slate-200
              bg-white
              text-sm
              font-medium
              text-slate-700
              outline-none
            "
          >

            <option value="All States">
              All States
            </option>

            {stateData.map((item) => (
              <option
                key={item.state}
                value={item.state}
              >
                {item.state}
              </option>
            ))}

          </select>

        </div>

      </section>

      {/* DEMO NOTICE */}

      <div className="
        flex
        items-start
        gap-3
        p-4
        rounded-2xl
        bg-indigo-50
        border
        border-indigo-100
      ">

        <Activity
          size={18}
          className="text-indigo-600 mt-0.5"
        />

        <div>

          <p className="text-sm font-semibold text-indigo-900">
            National Prototype Analytics
          </p>

          <p className="text-xs text-indigo-700 mt-1">
            All figures shown are demo data for SIH
            prototype demonstration and do not represent
            official government statistics.
          </p>

        </div>

      </div>

      {/* KPI CARDS */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <Kpi
          title="Total Cases"
          value={totalCases.toLocaleString()}
          subtitle={`${totalMonitoring.toLocaleString()} currently monitored`}
          icon={Users}
          className="bg-indigo-50 text-indigo-600"
        />

        <Kpi
          title="High Risk"
          value={totalHigh}
          subtitle="Across monitored states"
          icon={AlertTriangle}
          className="bg-orange-50 text-orange-600"
        />

        <Kpi
          title="Critical"
          value={totalCritical}
          subtitle="Human review required"
          icon={ShieldAlert}
          className="bg-red-50 text-red-600"
        />

        <Kpi
          title="Average Distress"
          value={`${averageDistress}/100`}
          subtitle="National prototype average"
          icon={Activity}
          className="bg-purple-50 text-purple-600"
        />

      </section>

      {/* SECOND KPI ROW */}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Kpi
          title="Check-in Response"
          value={`${averageResponse}%`}
          subtitle="Average response rate"
          icon={CheckCircle2}
          className="bg-emerald-50 text-emerald-600"
        />

        <Kpi
          title="Intervention Completion"
          value={`${interventionRate}%`}
          subtitle={`${completedInterventions}/${totalInterventions} completed`}
          icon={CheckCircle2}
          className="bg-blue-50 text-blue-600"
        />

        <Kpi
          title="States Monitored"
          value={stateData.length}
          subtitle="Prototype state coverage"
          icon={MapPin}
          className="bg-cyan-50 text-cyan-600"
        />

      </section>

      {/* NATIONAL SNAPSHOT */}

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        <div className="
          xl:col-span-2
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-6
          shadow-sm
        ">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                State-wise Risk Overview
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                High and critical cases across states
              </p>

            </div>

            <BarChart3
              size={20}
              className="text-indigo-500"
            />

          </div>

          <div className="space-y-5">

            {filteredStates.map((item) => {

              const totalRisk =
                item.high +
                item.critical;

              const maxRisk = Math.max(
                ...stateData.map(
                  (state) =>
                    state.high +
                    state.critical
                )
              );

              const width =
                (totalRisk / maxRisk) *
                100;

              return (
                <div key={item.state}>

                  <div className="flex justify-between mb-2">

                    <span className="text-sm font-semibold text-slate-700">
                      {item.state}
                    </span>

                    <span className="text-xs text-slate-500">
                      {totalRisk} high/critical
                    </span>

                  </div>

                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                      style={{
                        width: `${width}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between mt-2 text-xs">

                    <span className="text-orange-600">
                      High: {item.high}
                    </span>

                    <span className="text-red-600">
                      Critical: {item.critical}
                    </span>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* NATIONAL INSIGHT */}

        <div className="
          bg-slate-950
          text-white
          rounded-2xl
          p-6
        ">

          <div className="flex items-center gap-3 mb-6">

            <div className="
              w-10
              h-10
              rounded-xl
              bg-white/10
              flex
              items-center
              justify-center
            ">

              <ShieldAlert size={20} />

            </div>

            <div>

              <h2 className="text-lg font-bold">
                National Insights
              </h2>

              <p className="text-xs text-slate-400">
                Prototype analytical summary
              </p>

            </div>

          </div>

          <div className="space-y-5">

            <Insight
              title="Highest risk volume"
              text={`${highestRiskState.state} currently has the highest combined high and critical cases in the demo dataset.`}
            />

            <Insight
              title="Monitoring coverage"
              text={`${totalMonitoring.toLocaleString()} cases are currently represented as actively monitored.`}
            />

            <Insight
              title="Distress indicator"
              text={`The national prototype average distress indicator is ${averageDistress}/100.`}
            />

            <Insight
              title="Interventions"
              text={`${interventionRate}% of recorded prototype interventions are marked completed.`}
            />

          </div>

        </div>

      </section>

      {/* STATE TABLE */}

      <section className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        overflow-hidden
      ">

        <div className="p-6 border-b border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                State-wise Monitoring
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Aggregated indicators available to
                National Administrator
              </p>

            </div>

            <span className="
              px-3
              py-1.5
              rounded-lg
              bg-slate-100
              text-xs
              font-semibold
              text-slate-600
            ">
              Aggregated View
            </span>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead>

              <tr className="bg-slate-50 border-b border-slate-200">

                <Header text="State" />
                <Header text="Cases" />
                <Header text="Monitoring" />
                <Header text="High" />
                <Header text="Critical" />
                <Header text="Avg Distress" />
                <Header text="Response" />
                <Header text="Trend" />

              </tr>

            </thead>

            <tbody>

              {filteredStates.map((item) => (

                <tr
                  key={item.state}
                  className="
                    border-b
                    border-slate-100
                    hover:bg-slate-50
                    transition
                  "
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="
                        w-9
                        h-9
                        rounded-lg
                        bg-indigo-50
                        flex
                        items-center
                        justify-center
                      ">

                        <MapPin
                          size={16}
                          className="text-indigo-600"
                        />

                      </div>

                      <span className="text-sm font-bold text-slate-800">
                        {item.state}
                      </span>

                    </div>

                  </td>

                  <td className="px-5 py-4 text-sm font-semibold">
                    {item.cases.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-indigo-600">
                    {item.monitoring.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">

                    <span className="
                      px-2.5
                      py-1
                      rounded-lg
                      bg-orange-50
                      text-orange-600
                      text-xs
                      font-bold
                    ">
                      {item.high}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <span className="
                      px-2.5
                      py-1
                      rounded-lg
                      bg-red-50
                      text-red-600
                      text-xs
                      font-bold
                    ">
                      {item.critical}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={
                        item.distress >= 60
                          ? "text-red-600 font-bold"
                          : item.distress >= 50
                          ? "text-orange-600 font-bold"
                          : "text-emerald-600 font-bold"
                      }
                    >
                      {item.distress}/100
                    </span>

                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                    {item.response}%
                  </td>

                  <td className="px-5 py-4">

                    <Trend trend={item.trend} />

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

      {/* NATIONAL FLOW */}

      <section className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-6
        shadow-sm
      ">

        <h2 className="text-lg font-bold text-slate-900">
          National Monitoring Flow
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          How aggregated SAMVEDNA information reaches
          the National Administrator
        </p>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-5
          gap-3
          mt-6
        ">

          <FlowStep
            number="01"
            title="State Data"
            text="State-level monitoring"
          />

          <FlowStep
            number="02"
            title="Aggregation"
            text="Privacy-aware aggregation"
          />

          <FlowStep
            number="03"
            title="Analysis"
            text="Risk and trend analysis"
          />

          <FlowStep
            number="04"
            title="Insights"
            text="National indicators"
          />

          <FlowStep
            number="05"
            title="Oversight"
            text="Human decision support"
          />

        </div>

      </section>

      {/* HUMAN OVERSIGHT */}

      <div className="
        flex
        items-start
        gap-3
        p-4
        rounded-xl
        bg-amber-50
        border
        border-amber-100
      ">

        <AlertTriangle
          size={18}
          className="text-amber-600 mt-0.5"
        />

        <div>

          <p className="text-sm font-semibold text-amber-900">
            Human oversight
          </p>

          <p className="text-xs text-amber-800 mt-1 leading-5">
            National analytics are prototype decision-support
            indicators. They do not diagnose mental illness
            and do not automatically determine legal,
            protection or intervention decisions.
          </p>

        </div>

      </div>

    </div>
  );
}

/* =====================================================
   KPI
===================================================== */

function Kpi({
  title,
  value,
  subtitle,
  icon: Icon,
  className,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  className: string;
}) {
  return (
    <div className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-5
      shadow-sm
      hover:shadow-md
      transition
    ">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="
            text-2xl
            font-bold
            text-slate-900
            mt-2
          ">
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
            ${className}
          `}
        >
          <Icon size={19} />
        </div>

      </div>

      <p className="text-xs text-slate-400 mt-3">
        {subtitle}
      </p>

    </div>
  );
}

/* =====================================================
   INSIGHT
===================================================== */

function Insight({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border-l-2 border-indigo-400 pl-4">

      <p className="text-sm font-semibold">
        {title}
      </p>

      <p className="text-xs text-slate-400 mt-1 leading-5">
        {text}
      </p>

    </div>
  );
}

/* =====================================================
   TABLE HEADER
===================================================== */

function Header({
  text,
}: {
  text: string;
}) {
  return (
    <th className="
      px-5
      py-3
      text-left
      text-[11px]
      uppercase
      tracking-wide
      text-slate-500
    ">
      {text}
    </th>
  );
}

/* =====================================================
   TREND
===================================================== */

function Trend({
  trend,
}: {
  trend: StateData["trend"];
}) {
  if (trend === "Increasing") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600">
        <ArrowUp size={14} />
        Increasing
      </span>
    );
  }

  if (trend === "Decreasing") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
        <ArrowDown size={14} />
        Decreasing
      </span>
    );
  }

  return (
    <span className="text-xs font-semibold text-slate-500">
      Stable
    </span>
  );
}

/* =====================================================
   FLOW STEP
===================================================== */

function FlowStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="
      rounded-xl
      border
      border-slate-200
      bg-slate-50
      p-4
    ">

      <div className="
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
      ">
        {number}
      </div>

      <p className="text-sm font-bold text-slate-800 mt-3">
        {title}
      </p>

      <p className="text-xs text-slate-500 mt-1">
        {text}
      </p>

    </div>
  );
}