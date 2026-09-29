import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type District = {
  name: string;
  cases: number;
  monitored: number;
  low: number;
  moderate: number;
  high: number;
  critical: number;
  distress: number;
  response: number;
  trend: "Increasing" | "Stable" | "Decreasing";
};

const districts: District[] = [
  {
    name: "Indore",
    cases: 248,
    monitored: 231,
    low: 118,
    moderate: 67,
    high: 39,
    critical: 24,
    distress: 61,
    response: 91,
    trend: "Increasing",
  },
  {
    name: "Bhopal",
    cases: 214,
    monitored: 201,
    low: 105,
    moderate: 57,
    high: 31,
    critical: 21,
    distress: 58,
    response: 88,
    trend: "Increasing",
  },
  {
    name: "Jabalpur",
    cases: 186,
    monitored: 172,
    low: 94,
    moderate: 48,
    high: 27,
    critical: 17,
    distress: 55,
    response: 86,
    trend: "Stable",
  },
  {
    name: "Gwalior",
    cases: 171,
    monitored: 160,
    low: 91,
    moderate: 43,
    high: 23,
    critical: 14,
    distress: 52,
    response: 84,
    trend: "Decreasing",
  },
  {
    name: "Ujjain",
    cases: 149,
    monitored: 139,
    low: 76,
    moderate: 39,
    high: 21,
    critical: 13,
    distress: 54,
    response: 87,
    trend: "Stable",
  },
  {
    name: "Sagar",
    cases: 132,
    monitored: 121,
    low: 70,
    moderate: 34,
    high: 18,
    critical: 10,
    distress: 49,
    response: 81,
    trend: "Decreasing",
  },
  {
    name: "Rewa",
    cases: 118,
    monitored: 108,
    low: 65,
    moderate: 29,
    high: 15,
    critical: 9,
    distress: 47,
    response: 79,
    trend: "Stable",
  },
  {
    name: "Dewas",
    cases: 102,
    monitored: 94,
    low: 58,
    moderate: 24,
    high: 13,
    critical: 7,
    distress: 45,
    response: 83,
    trend: "Decreasing",
  },
];

const trendData = [
  { month: "Apr", value: 46 },
  { month: "May", value: 48 },
  { month: "Jun", value: 51 },
  { month: "Jul", value: 53 },
  { month: "Aug", value: 56 },
  { month: "Sep", value: 58 },
];

function StatCard({
  title,
  value,
  subtitle,
  type = "blue",
}: {
  title: string;
  value: string | number;
  subtitle: string;
  type?: "blue" | "orange" | "red" | "purple" | "green";
}) {
  const styles = {
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <p className="text-3xl font-bold text-slate-900 mt-2">
        {value}
      </p>

      <div
        className={`inline-block mt-3 px-2.5 py-1 rounded-lg text-xs font-semibold ${styles[type]}`}
      >
        {subtitle}
      </div>
    </div>
  );
}

function TrendBadge({
  trend,
}: {
  trend: District["trend"];
}) {
  if (trend === "Increasing") {
    return (
      <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 text-xs font-semibold">
        ↑ Increasing
      </span>
    );
  }

  if (trend === "Decreasing") {
    return (
      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold">
        ↓ Decreasing
      </span>
    );
  }

  return (
    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
      → Stable
    </span>
  );
}

export default function StateAnalyticsPage() {
  const navigate = useNavigate();

  const [selectedDistrict, setSelectedDistrict] =
    useState("All Districts");

  const filteredDistricts = useMemo(() => {
    if (selectedDistrict === "All Districts") {
      return districts;
    }

    return districts.filter(
      (district) => district.name === selectedDistrict
    );
  }, [selectedDistrict]);

  /* ================================
     STATE TOTALS
  ================================= */

  const totalCases = districts.reduce(
    (sum, district) => sum + district.cases,
    0
  );

  const monitoredCases = districts.reduce(
    (sum, district) => sum + district.monitored,
    0
  );

  const highRisk = districts.reduce(
    (sum, district) => sum + district.high,
    0
  );

  const criticalRisk = districts.reduce(
    (sum, district) => sum + district.critical,
    0
  );

  const averageDistress = Math.round(
    districts.reduce(
      (sum, district) => sum + district.distress,
      0
    ) / districts.length
  );

  const responseRate = Math.round(
    districts.reduce(
      (sum, district) => sum + district.response,
      0
    ) / districts.length
  );

  const riskTotals = {
    low: districts.reduce(
      (sum, district) => sum + district.low,
      0
    ),
    moderate: districts.reduce(
      (sum, district) => sum + district.moderate,
      0
    ),
    high: highRisk,
    critical: criticalRisk,
  };

  const totalRiskCases =
    riskTotals.low +
    riskTotals.moderate +
    riskTotals.high +
    riskTotals.critical;

  /* ================================
     DISTRICT RISK NAVIGATION
  ================================= */

  const openDistrictRisk = (district: string) => {
    localStorage.setItem(
      "samvedna_selected_district",
      district
    );

    navigate("/district-risk");
  };

  return (
    <div className="space-y-6">

      {/* ================================
          HEADER
      ================================= */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

        <div>
          <div className="flex items-center gap-2 mb-2">

            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
              <span className="text-indigo-600 font-bold">
                A
              </span>
            </div>

            <span className="text-sm font-semibold text-indigo-600">
              State Intelligence & Analytics
            </span>

          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            State Analytics
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            State-wide victim well-being, risk and intervention overview
          </p>
        </div>

        <div className="flex gap-3">

          <select
            value={selectedDistrict}
            onChange={(event) =>
              setSelectedDistrict(event.target.value)
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
            <option value="All Districts">
              All Districts
            </option>

            {districts.map((district) => (
              <option
                key={district.name}
                value={district.name}
              >
                {district.name}
              </option>
            ))}
          </select>

          <button
            onClick={() =>
              navigate("/state-reports")
            }
            className="
              px-4
              py-2.5
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              text-sm
              font-semibold
            "
          >
            Reports
          </button>

        </div>
      </div>

      {/* ================================
          DEMO NOTICE
      ================================= */}

      <div className="
        p-4
        rounded-2xl
        bg-indigo-50
        border
        border-indigo-100
      ">
        <p className="text-sm font-semibold text-indigo-900">
          Prototype Analytics
        </p>

        <p className="text-xs text-indigo-700 mt-1">
          Demo data for SIH prototype demonstration.
          These figures do not represent official government statistics.
        </p>
      </div>

      {/* ================================
          KPI CARDS
      ================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <StatCard
          title="Total Cases"
          value={totalCases}
          subtitle={`${monitoredCases} monitored`}
          type="blue"
        />

        <StatCard
          title="High Risk"
          value={highRisk}
          subtitle="Human review"
          type="orange"
        />

        <StatCard
          title="Critical"
          value={criticalRisk}
          subtitle="Immediate review"
          type="red"
        />

        <StatCard
          title="Average Distress"
          value={`${averageDistress}/100`}
          subtitle="State average"
          type="purple"
        />

      </div>

      {/* ================================
          SECOND KPI ROW
      ================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <StatCard
          title="Check-in Response"
          value={`${responseRate}%`}
          subtitle="Average response"
          type="green"
        />

        <StatCard
          title="Districts Monitored"
          value={districts.length}
          subtitle="Demo districts"
          type="blue"
        />

        <StatCard
          title="Monitoring Coverage"
          value={`${Math.round(
            (monitoredCases / totalCases) * 100
          )}%`}
          subtitle="Cases currently monitored"
          type="purple"
        />

      </div>

      {/* ================================
          DISTRESS TREND
      ================================= */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Average Distress Trend
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              State-wide prototype indicator
            </p>
          </div>

          <span className="text-sm font-semibold text-orange-600">
            ↑ Rising
          </span>

        </div>

        {/* SIMPLE CSS CHART */}

        <div className="h-64 flex items-end gap-4 sm:gap-8 border-b border-slate-200">

          {trendData.map((item) => {

            const height =
              Math.max(
                20,
                (item.value / 100) * 220
              );

            return (
              <div
                key={item.month}
                className="flex-1 h-full flex flex-col items-center justify-end"
              >

                <span className="text-xs font-bold text-slate-700 mb-2">
                  {item.value}
                </span>

                <div
                  className="
                    w-full
                    max-w-14
                    bg-indigo-500
                    rounded-t-xl
                    hover:bg-indigo-600
                    transition
                  "
                  style={{
                    height: `${height}px`,
                  }}
                />

                <span className="text-xs text-slate-500 mt-3">
                  {item.month}
                </span>

              </div>
            );
          })}

        </div>

      </div>

      {/* ================================
          RISK DISTRIBUTION
      ================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <h2 className="text-lg font-bold text-slate-900">
            Risk Distribution
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Current monitored cases
          </p>

          <div className="mt-6 space-y-5">

            {[
              {
                name: "Low",
                value: riskTotals.low,
                color: "bg-emerald-500",
              },
              {
                name: "Moderate",
                value: riskTotals.moderate,
                color: "bg-yellow-500",
              },
              {
                name: "High",
                value: riskTotals.high,
                color: "bg-orange-500",
              },
              {
                name: "Critical",
                value: riskTotals.critical,
                color: "bg-red-500",
              },
            ].map((risk) => {

              const percentage =
                Math.round(
                  (risk.value /
                    totalRiskCases) *
                    100
                );

              return (
                <div key={risk.name}>

                  <div className="flex justify-between mb-2">

                    <span className="text-sm font-semibold text-slate-700">
                      {risk.name}
                    </span>

                    <span className="text-sm font-bold text-slate-900">
                      {risk.value}
                    </span>

                  </div>

                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className={`h-full ${risk.color} rounded-full`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                  <p className="text-xs text-slate-400 mt-1">
                    {percentage}% of monitored cases
                  </p>

                </div>
              );
            })}

          </div>

        </div>

        {/* ================================
            INSIGHTS
        ================================= */}

        <div className="bg-slate-950 text-white rounded-2xl p-6">

          <h2 className="text-lg font-bold">
            State-level Insights
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Prototype analytical summary
          </p>

          <div className="mt-6 space-y-5">

            <div className="border-l-2 border-indigo-400 pl-4">

              <p className="text-sm font-semibold">
                Highest monitored risk
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Indore has the highest number of high and
                critical cases in the demo dataset.
              </p>

            </div>

            <div className="border-l-2 border-orange-400 pl-4">

              <p className="text-sm font-semibold">
                Distress indicator
              </p>

              <p className="text-xs text-slate-400 mt-1">
                The displayed state distress indicator has
                gradually increased during the monitoring period.
              </p>

            </div>

            <div className="border-l-2 border-emerald-400 pl-4">

              <p className="text-sm font-semibold">
                Engagement
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Average check-in response rate is {responseRate}%.
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              navigate("/district-risk")
            }
            className="
              mt-7
              w-full
              py-3
              rounded-xl
              bg-white
              text-slate-900
              font-semibold
              text-sm
              hover:bg-slate-100
            "
          >
            Open District Risk →
          </button>

        </div>

      </div>

      {/* ================================
          DISTRICT COMPARISON
      ================================= */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="mb-6">

          <h2 className="text-lg font-bold text-slate-900">
            District Risk Comparison
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            High and critical cases by district
          </p>

        </div>

        <div className="space-y-5">

          {filteredDistricts.map((district) => {

            const maximum =
              Math.max(
                ...districts.map(
                  (item) =>
                    item.high +
                    item.critical
                )
              );

            const current =
              district.high +
              district.critical;

            const percentage =
              (current / maximum) * 100;

            return (
              <div key={district.name}>

                <div className="flex justify-between mb-2">

                  <span className="text-sm font-semibold text-slate-700">
                    {district.name}
                  </span>

                  <span className="text-xs font-bold text-slate-500">
                    {current} high/critical
                  </span>

                </div>

                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* ================================
          DISTRICT TABLE
      ================================= */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 border-b border-slate-200">

          <h2 className="text-lg font-bold text-slate-900">
            District Performance & Risk
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Compare district-level indicators
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className="bg-slate-50">

                <th className="px-5 py-3 text-left text-xs text-slate-500">
                  District
                </th>

                <th className="px-5 py-3 text-left text-xs text-slate-500">
                  Cases
                </th>

                <th className="px-5 py-3 text-left text-xs text-slate-500">
                  High
                </th>

                <th className="px-5 py-3 text-left text-xs text-slate-500">
                  Critical
                </th>

                <th className="px-5 py-3 text-left text-xs text-slate-500">
                  Distress
                </th>

                <th className="px-5 py-3 text-left text-xs text-slate-500">
                  Response
                </th>

                <th className="px-5 py-3 text-left text-xs text-slate-500">
                  Trend
                </th>

                <th className="px-5 py-3 text-right text-xs text-slate-500">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredDistricts.map(
                (district) => (
                  <tr
                    key={district.name}
                    className="border-t border-slate-100 hover:bg-slate-50"
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
                          <span className="text-indigo-600 font-bold">
                            {district.name.charAt(0)}
                          </span>
                        </div>

                        <span className="font-semibold text-sm text-slate-800">
                          {district.name}
                        </span>

                      </div>

                    </td>

                    <td className="px-5 py-4 text-sm font-semibold">
                      {district.cases}
                    </td>

                    <td className="px-5 py-4">

                      <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 text-xs font-bold">
                        {district.high}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-bold">
                        {district.critical}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`text-sm font-bold ${
                          district.distress >= 60
                            ? "text-red-600"
                            : district.distress >= 50
                            ? "text-orange-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {district.distress}/100
                      </span>

                    </td>

                    <td className="px-5 py-4 text-sm font-semibold">
                      {district.response}%
                    </td>

                    <td className="px-5 py-4">
                      <TrendBadge trend={district.trend} />
                    </td>

                    <td className="px-5 py-4 text-right">

                      <button
                        onClick={() =>
                          openDistrictRisk(
                            district.name
                          )
                        }
                        className="
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
                        View Risk →
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================================
          HUMAN OVERSIGHT
      ================================= */}

      <div className="
        p-4
        rounded-2xl
        bg-amber-50
        border
        border-amber-100
      ">

        <p className="text-sm font-semibold text-amber-900">
          Human oversight
        </p>

        <p className="text-xs text-amber-800 mt-1 leading-5">
          These analytics are prototype decision-support
          indicators. They do not diagnose mental illness
          or automatically determine legal or protection
          decisions. High and critical indicators require
          authorized human review.
        </p>

      </div>

    </div>
  );
}