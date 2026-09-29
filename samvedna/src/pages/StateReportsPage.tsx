import React, { useState } from "react";

type ReportType =
  | "Daily Risk Report"
  | "District Summary"
  | "State Summary"
  | "High-Risk Cases"
  | "Intervention Report"
  | "Distress Trend Report";

const reportTypes: ReportType[] = [
  "Daily Risk Report",
  "District Summary",
  "State Summary",
  "High-Risk Cases",
  "Intervention Report",
  "Distress Trend Report",
];

const districts = [
  "All Districts",
  "Indore",
  "Bhopal",
  "Jabalpur",
  "Gwalior",
  "Ujjain",
  "Sagar",
  "Rewa",
  "Dewas",
];

export default function StateReportsPage() {
  const [reportType, setReportType] =
    useState<ReportType>("State Summary");

  const [district, setDistrict] =
    useState("All Districts");

  const [generated, setGenerated] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [reportDate, setReportDate] =
    useState(
      new Date().toISOString().split("T")[0]
    );

  const generateReport = () => {
    setLoading(true);
    setGenerated(false);

    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 800);
  };

  const exportCSV = () => {
    const csv = [
      ["SAMVEDNA STATE REPORT"],
      ["Report Type", reportType],
      ["District", district],
      ["Date", reportDate],
      [],
      ["Metric", "Value"],
      ["Total Cases", "1320"],
      ["Active Monitoring", "1226"],
      ["High Risk", "187"],
      ["Critical", "115"],
      ["Average Distress", "53/100"],
      ["Check-in Response Rate", "85%"],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      "SAMVEDNA_State_Report.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <section>

        <p className="text-sm font-semibold text-indigo-600">
          State Administration
        </p>

        <h1 className="text-3xl font-bold text-slate-900 mt-1">
          Reports
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Generate state-level well-being, risk and
          intervention reports.
        </p>

      </section>

      {/* DEMO NOTICE */}

      <div className="
        p-4
        rounded-2xl
        bg-indigo-50
        border
        border-indigo-100
      ">

        <p className="text-sm font-semibold text-indigo-900">
          Prototype Report Generator
        </p>

        <p className="text-xs text-indigo-700 mt-1">
          Reports use demonstration data for the
          SAMVEDNA SIH prototype and do not represent
          official government statistics.
        </p>

      </div>

      {/* REPORT CONFIGURATION */}

      <section className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-6
        shadow-sm
      ">

        <h2 className="text-lg font-bold text-slate-900">
          Generate Report
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Select the report parameters below.
        </p>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
          mt-6
        ">

          {/* REPORT TYPE */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-slate-700
              mb-2
            ">
              Report Type
            </label>

            <select
              value={reportType}
              onChange={(e) =>
                setReportType(
                  e.target.value as ReportType
                )
              }
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                outline-none
                focus:border-indigo-500
              "
            >

              {reportTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}

            </select>

          </div>

          {/* DISTRICT */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-slate-700
              mb-2
            ">
              District
            </label>

            <select
              value={district}
              onChange={(e) =>
                setDistrict(e.target.value)
              }
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                outline-none
                focus:border-indigo-500
              "
            >

              {districts.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

          {/* DATE */}

          <div>

            <label className="
              block
              text-sm
              font-semibold
              text-slate-700
              mb-2
            ">
              Report Date
            </label>

            <input
              type="date"
              value={reportDate}
              onChange={(e) =>
                setReportDate(e.target.value)
              }
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-slate-200
                bg-white
                text-sm
                outline-none
                focus:border-indigo-500
              "
            />

          </div>

        </div>

        <button
          onClick={generateReport}
          disabled={loading}
          className="
            mt-6
            px-6
            py-3
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
            disabled:bg-indigo-300
            text-white
            text-sm
            font-semibold
            transition
          "
        >
          {loading
            ? "Generating..."
            : "Generate Report"}
        </button>

      </section>

      {/* GENERATED REPORT */}

      {generated && (

        <section className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          shadow-sm
          overflow-hidden
        ">

          {/* REPORT HEADER */}

          <div className="
            p-6
            border-b
            border-slate-200
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
          ">

            <div>

              <p className="text-xs font-semibold text-indigo-600">
                SAMVEDNA • STATE REPORT
              </p>

              <h2 className="
                text-xl
                font-bold
                text-slate-900
                mt-1
              ">
                {reportType}
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                {district} • {reportDate}
              </p>

            </div>

            <div className="flex gap-2">

              <button
                onClick={exportCSV}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  bg-emerald-50
                  text-emerald-700
                  text-sm
                  font-semibold
                  hover:bg-emerald-100
                "
              >
                Export CSV
              </button>

              <button
                onClick={exportPDF}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  bg-slate-900
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-slate-800
                "
              >
                Export PDF
              </button>

            </div>

          </div>

          {/* REPORT SUMMARY */}

          <div className="
            p-6
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-4
          ">

            <ReportMetric
              title="Total Cases"
              value="1,320"
            />

            <ReportMetric
              title="Active Monitoring"
              value="1,226"
            />

            <ReportMetric
              title="High Risk"
              value="187"
            />

            <ReportMetric
              title="Critical"
              value="115"
            />

            <ReportMetric
              title="Average Distress"
              value="53 / 100"
            />

            <ReportMetric
              title="Check-in Response"
              value="85%"
            />

            <ReportMetric
              title="Interventions"
              value="408"
            />

            <ReportMetric
              title="Completed"
              value="337"
            />

          </div>

          {/* REPORT INSIGHTS */}

          <div className="
            mx-6
            mb-6
            p-5
            rounded-2xl
            bg-slate-50
            border
            border-slate-200
          ">

            <h3 className="font-bold text-slate-900">
              Report Summary
            </h3>

            <ul className="
              mt-4
              space-y-3
              text-sm
              text-slate-600
            ">

              <li>
                • State-wide monitoring currently covers
                1,226 active cases.
              </li>

              <li>
                • 187 cases are currently classified as
                high-risk prototype indicators.
              </li>

              <li>
                • 115 cases require critical-level
                human review according to demo thresholds.
              </li>

              <li>
                • Average check-in response rate is
                approximately 85%.
              </li>

              <li>
                • All indicators are intended for
                authorized human review and decision support.
              </li>

            </ul>

          </div>

          {/* DISCLAIMER */}

          <div className="
            p-5
            border-t
            border-amber-100
            bg-amber-50
          ">

            <p className="
              text-xs
              text-amber-800
              leading-5
            ">
              <strong>Human oversight:</strong>{" "}
              SAMVEDNA analytics are prototype
              decision-support indicators. They do not
              diagnose mental illness and do not
              automatically determine legal or protection
              decisions.
            </p>

          </div>

        </section>

      )}

    </div>
  );
}

/* =====================================================
   REPORT METRIC
===================================================== */

function ReportMetric({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="
      p-5
      rounded-xl
      border
      border-slate-200
      bg-white
    ">

      <p className="text-xs text-slate-500">
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
  );
}