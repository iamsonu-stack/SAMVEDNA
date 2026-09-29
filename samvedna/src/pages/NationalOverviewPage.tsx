import React, { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  CheckCircle2,
  MapPin,
  ShieldAlert,
  TrendingUp,
  Users,
} from "lucide-react";

type Trend = "Increasing" | "Stable" | "Decreasing";

interface StateData {
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
  trend: Trend;
}

const states: StateData[] = [
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

export default function NationalOverviewPage() {
  const [selectedState, setSelectedState] =
    useState("All States");

  const filteredStates = useMemo(() => {
    if (selectedState === "All States") {
      return states;
    }

    return states.filter(
      (item) => item.state === selectedState
    );
  }, [selectedState]);

  const totalCases = states.reduce(
    (sum, item) => sum + item.cases,
    0
  );

  const totalMonitoring = states.reduce(
    (sum, item) => sum + item.monitoring,
    0
  );

  const totalLow = states.reduce(
    (sum, item) => sum + item.low,
    0
  );

  const totalModerate = states.reduce(
    (sum, item) => sum + item.moderate,
    0
  );

  const totalHigh = states.reduce(
    (sum, item) => sum + item.high,
    0
  );

  const totalCritical = states.reduce(
    (sum, item) => sum + item.critical,
    0
  );

  const averageDistress = Math.round(
    states.reduce(
      (sum, item) => sum + item.distress,
      0
    ) / states.length
  );

  const averageResponse = Math.round(
    states.reduce(
      (sum, item) => sum + item.response,
      0
    ) / states.length
  );

  const totalInterventions = states.reduce(
    (sum, item) => sum + item.interventions,
    0
  );

  const completedInterventions = states.reduce(
    (sum, item) => sum + item.completed,
    0
  );

  const interventionRate =
    totalInterventions > 0
      ? Math.round(
          (completedInterventions /
            totalInterventions) *
            100
        )
      : 0;

  const riskTotal =
    totalLow +
    totalModerate +
    totalHigh +
    totalCritical;

  const highestDistressState = [...states].sort(
    (a, b) => b.distress - a.distress
  )[0];

  const highestRiskState = [...states].sort(
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
              National Monitoring
            </span>

          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            National Overview
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Aggregated national view of SAMVEDNA
            monitoring, distress and interventions
          </p>

        </div>

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

          {states.map((item) => (
            <option
              key={item.state}
              value={item.state}
            >
              {item.state}
            </option>
          ))}

        </select>

      </section>

      {/* DEMO NOTICE */}

      <div className="
        p-4
        rounded-2xl
        bg-indigo-50
        border
        border-indigo-100
        flex
        gap-3
      ">

        <Activity
          size={18}
          className="text-indigo-600 mt-0.5"
        />

        <div>

          <p className="text-sm font-semibold text-indigo-900">
            National Aggregated View
          </p>

          <p className="text-xs text-indigo-700 mt-1">
            Demo data for SIH prototype demonstration.
            Figures do not represent official government
            statistics.
          </p>

        </div>

      </div>

      {/* KPI */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <Kpi
          title="Total Cases"
          value={totalCases.toLocaleString()}
          subtitle={`${totalMonitoring.toLocaleString()} actively monitored`}
          icon={Users}
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <Kpi
          title="High Risk"
          value={totalHigh}
          subtitle="Across monitored states"
          icon={AlertTriangle}
          iconClass="bg-orange-50 text-orange-600"
        />

        <Kpi
          title="Critical"
          value={totalCritical}
          subtitle="Requires human review"
          icon={ShieldAlert}
          iconClass="bg-red-50 text-red-600"
        />

        <Kpi
          title="Average Distress"
          value={`${averageDistress}/100`}
          subtitle="Prototype national indicator"
          icon={Activity}
          iconClass="bg-purple-50 text-purple-600"
        />

      </section>

      {/* NATIONAL HEALTH */}

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* RISK DISTRIBUTION */}

        <div className="
          xl:col-span-2
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-6
          shadow-sm
        ">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                National Risk Distribution
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Current aggregated monitoring status
              </p>

            </div>

            <ShieldAlert
              size={20}
              className="text-indigo-500"
            />

          </div>

          <div className="mt-7 space-y-5">

            <RiskBar
              label="Low"
              value={totalLow}
              total={riskTotal}
              color="bg-emerald-500"
              textColor="text-emerald-600"
            />

            <RiskBar
              label="Moderate"
              value={totalModerate}
              total={riskTotal}
              color="bg-yellow-500"
              textColor="text-yellow-600"
            />

            <RiskBar
              label="High"
              value={totalHigh}
              total={riskTotal}
              color="bg-orange-500"
              textColor="text-orange-600"
            />

            <RiskBar
              label="Critical"
              value={totalCritical}
              total={riskTotal}
              color="bg-red-500"
              textColor="text-red-600"
            />

          </div>

        </div>

        {/* NATIONAL STATUS */}

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

              <TrendingUp size={20} />

            </div>

            <div>

              <h2 className="text-lg font-bold">
                National Status
              </h2>

              <p className="text-xs text-slate-400">
                Prototype indicators
              </p>

            </div>

          </div>

          <div className="space-y-5">

            <StatusItem
              label="Monitoring Coverage"
              value={`${Math.round(
                (totalMonitoring / totalCases) * 100
              )}%`}
            />

            <StatusItem
              label="Check-in Response"
              value={`${averageResponse}%`}
            />

            <StatusItem
              label="Intervention Completion"
              value={`${interventionRate}%`}
            />

            <StatusItem
              label="States Covered"
              value={`${states.length}`}
            />

          </div>

        </div>

      </section>

      {/* KEY NATIONAL INDICATORS */}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Indicator
          title="Highest Distress Indicator"
          value={highestDistressState.state}
          detail={`${highestDistressState.distress}/100 average distress`}
          icon={Activity}
          className="text-red-600 bg-red-50"
        />

        <Indicator
          title="Highest Risk Volume"
          value={highestRiskState.state}
          detail={`${highestRiskState.high + highestRiskState.critical} high + critical cases`}
          icon={AlertTriangle}
          className="text-orange-600 bg-orange-50"
        />

        <Indicator
          title="Intervention Progress"
          value={`${interventionRate}%`}
          detail={`${completedInterventions} completed interventions`}
          icon={CheckCircle2}
          className="text-emerald-600 bg-emerald-50"
        />

      </section>

      {/* STATE COMPARISON */}

      <section className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        overflow-hidden
      ">

        <div className="p-6 border-b border-slate-200">

          <h2 className="text-lg font-bold text-slate-900">
            State Comparison
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Aggregated indicators by state
          </p>

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
                <Header text="Distress" />
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

                    <Badge
                      value={item.high}
                      className="bg-orange-50 text-orange-600"
                    />

                  </td>

                  <td className="px-5 py-4">

                    <Badge
                      value={item.critical}
                      className="bg-red-50 text-red-600"
                    />

                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={
                        item.distress >= 60
                          ? "font-bold text-red-600"
                          : item.distress >= 50
                          ? "font-bold text-orange-600"
                          : "font-bold text-emerald-600"
                      }
                    >
                      {item.distress}/100
                    </span>

                  </td>

                  <td className="px-5 py-4 text-sm font-semibold">
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
          State-level information is aggregated before
          national-level monitoring.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">

          <Flow
            number="01"
            title="State Monitoring"
            text="Cases and well-being signals"
          />

          <Flow
            number="02"
            title="Aggregation"
            text="State-level indicators"
          />

          <Flow
            number="03"
            title="National Analysis"
            text="Trend and risk overview"
          />

          <Flow
            number="04"
            title="Human Oversight"
            text="Decision-support only"
          />

        </div>

      </section>

      {/* PRIVACY / OVERSIGHT */}

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
            Privacy & human oversight
          </p>

          <p className="text-xs text-amber-800 mt-1 leading-5">
            National-level users receive aggregated monitoring
            indicators. Individual victim information should
            remain restricted according to role-based access.
            AI indicators support human review and do not
            diagnose mental illness or make legal decisions.
          </p>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   KPI
========================================================= */

function Kpi({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: string | number;
  subtitle: string;
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
      hover:shadow-md
      transition
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

        <div className={`
          w-10
          h-10
          rounded-xl
          flex
          items-center
          justify-center
          ${iconClass}
        `}>

          <Icon size={19} />

        </div>

      </div>

      <p className="text-xs text-slate-400 mt-3">
        {subtitle}
      </p>

    </div>
  );
}

/* =========================================================
   RISK BAR
========================================================= */

function RiskBar({
  label,
  value,
  total,
  color,
  textColor,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
  textColor: string;
}) {
  const percentage =
    total > 0
      ? Math.round((value / total) * 100)
      : 0;

  return (
    <div>

      <div className="flex justify-between mb-2">

        <span className="text-sm font-semibold text-slate-700">
          {label}
        </span>

        <span className={`text-sm font-bold ${textColor}`}>
          {value} · {percentage}%
        </span>

      </div>

      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">

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

/* =========================================================
   STATUS ITEM
========================================================= */

function StatusItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="
      flex
      items-center
      justify-between
      pb-4
      border-b
      border-slate-800
    ">

      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="text-lg font-bold">
        {value}
      </span>

    </div>
  );
}

/* =========================================================
   INDICATOR
========================================================= */

function Indicator({
  title,
  value,
  detail,
  icon: Icon,
  className,
}: {
  title: string;
  value: string;
  detail: string;
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
    ">

      <div className="flex items-center gap-3">

        <div className={`
          w-10
          h-10
          rounded-xl
          flex
          items-center
          justify-center
          ${className}
        `}>

          <Icon size={19} />

        </div>

        <p className="text-sm font-semibold text-slate-600">
          {title}
        </p>

      </div>

      <p className="text-xl font-bold text-slate-900 mt-4">
        {value}
      </p>

      <p className="text-xs text-slate-500 mt-1">
        {detail}
      </p>

    </div>
  );
}

/* =========================================================
   TABLE HEADER
========================================================= */

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

/* =========================================================
   BADGE
========================================================= */

function Badge({
  value,
  className,
}: {
  value: number;
  className: string;
}) {
  return (
    <span className={`
      px-2.5
      py-1
      rounded-lg
      text-xs
      font-bold
      ${className}
    `}>
      {value}
    </span>
  );
}

/* =========================================================
   TREND
========================================================= */

function Trend({
  trend,
}: {
  trend: Trend;
}) {
  if (trend === "Increasing") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600">
        <ArrowUp size={14} />
        Increasing
      </span>
    );
  }

  if (trend === "Decreasing") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
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

/* =========================================================
   FLOW
========================================================= */

function Flow({
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
      p-4
      rounded-xl
      border
      border-slate-200
      bg-slate-50
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