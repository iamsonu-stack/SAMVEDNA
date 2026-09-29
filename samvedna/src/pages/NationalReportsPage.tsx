import React, { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  CheckCircle2,
  Clock,
  ShieldAlert,
  X,
} from "lucide-react";

type ReportType =
  | "National Summary"
  | "State-wise Risk"
  | "Distress Trend"
  | "Intervention Report"
  | "High-Risk Cases";

interface Report {
  id: number;
  name: string;
  type: ReportType;
  date: string;
  status: "Generated" | "Ready";
}

const reportTypes: ReportType[] = [
  "National Summary",
  "State-wise Risk",
  "Distress Trend",
  "Intervention Report",
  "High-Risk Cases",
];

const demoReports: Report[] = [
  {
    id: 1,
    name: "National Monitoring Summary",
    type: "National Summary",
    date: "28 Sep 2026",
    status: "Generated",
  },
  {
    id: 2,
    name: "State-wise Risk Analysis",
    type: "State-wise Risk",
    date: "27 Sep 2026",
    status: "Generated",
  },
  {
    id: 3,
    name: "Monthly Distress Trend",
    type: "Distress Trend",
    date: "26 Sep 2026",
    status: "Ready",
  },
];

const stateData = [
  { state: "Madhya Pradesh", cases: 1248, high: 110, critical: 40 },
  { state: "Maharashtra", cases: 1385, high: 126, critical: 48 },
  { state: "Rajasthan", cases: 1024, high: 91, critical: 32 },
  { state: "Chhattisgarh", cases: 742, high: 68, critical: 25 },
  { state: "Uttar Pradesh", cases: 1860, high: 154, critical: 57 },
  { state: "Gujarat", cases: 891, high: 73, critical: 29 },
];

export default function NationalReportsPage() {
  const [selectedReport, setSelectedReport] =
    useState<ReportType>("National Summary");

  const [reports, setReports] =
    useState<Report[]>(demoReports);

  const [showPreview, setShowPreview] =
    useState(false);

  const [generatedReport, setGeneratedReport] =
    useState<Report | null>(null);

  const [dateRange, setDateRange] =
    useState("Last 30 Days");

  const generateReport = () => {
    const newReport: Report = {
      id: Date.now(),
      name: selectedReport,
      type: selectedReport,
      date: new Date().toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),
      status: "Generated",
    };

    setReports((previous) => [
      newReport,
      ...previous,
    ]);

    setGeneratedReport(newReport);
    setShowPreview(true);
  };

  const previewReport = (report: Report) => {
    setGeneratedReport(report);
    setShowPreview(true);
  };

  const downloadCSV = () => {
    const rows = [
      [
        "State",
        "Total Cases",
        "High Risk",
        "Critical",
      ],
      ...stateData.map((item) => [
        item.state,
        item.cases,
        item.high,
        item.critical,
      ]),
    ];

    const csv = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "SAMVEDNA-National-Report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6">

      {/* HEADER */}

      <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

        <div>

          <div className="flex items-center gap-2 mb-2">

            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <FileText
                size={20}
                className="text-indigo-600"
              />
            </div>

            <span className="text-sm font-semibold text-indigo-600">
              National Administration
            </span>

          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            National Reports
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Generate and review aggregated SAMVEDNA
            monitoring reports.
          </p>

        </div>

        <div className="flex items-center gap-3">

          <select
            value={dateRange}
            onChange={(event) =>
              setDateRange(event.target.value)
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
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>

        </div>

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

        <BarChart3
          size={19}
          className="text-indigo-600 mt-0.5"
        />

        <div>

          <p className="text-sm font-semibold text-indigo-900">
            Prototype Reports
          </p>

          <p className="text-xs text-indigo-700 mt-1">
            All figures are demo data created for the
            SAMVEDNA SIH prototype. They do not represent
            official government statistics.
          </p>

        </div>

      </div>


      {/* REPORT GENERATOR */}

      <section className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-6
        shadow-sm
      ">

        <div className="flex items-center gap-3 mb-6">

          <div className="
            w-10
            h-10
            rounded-xl
            bg-slate-100
            flex
            items-center
            justify-center
          ">
            <FileText size={19} />
          </div>

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Generate Report
            </h2>

            <p className="text-xs text-slate-500">
              Select a report type and monitoring period.
            </p>

          </div>

        </div>


        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-5
          gap-3
        ">

          {reportTypes.map((type) => (

            <button
              key={type}
              onClick={() =>
                setSelectedReport(type)
              }
              className={`
                text-left
                p-4
                rounded-xl
                border
                transition
                ${
                  selectedReport === type
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }
              `}
            >

              <FileText
                size={18}
                className={
                  selectedReport === type
                    ? "text-indigo-600"
                    : "text-slate-500"
                }
              />

              <p className="text-sm font-semibold text-slate-800 mt-3">
                {type}
              </p>

            </button>

          ))}

        </div>


        <div className="
          mt-6
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          p-4
          rounded-xl
          bg-slate-50
          border
          border-slate-200
        ">

          <div>

            <p className="text-xs text-slate-500">
              Selected report
            </p>

            <p className="text-sm font-bold text-slate-900 mt-1">
              {selectedReport}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Period: {dateRange}
            </p>

          </div>

          <button
            onClick={generateReport}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              text-sm
              font-semibold
              transition
            "
          >
            <BarChart3 size={17} />
            Generate Report
          </button>

        </div>

      </section>


      {/* NATIONAL SUMMARY */}

      <section className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
      ">

        <SummaryCard
          title="Total Cases"
          value="9,110"
          subtitle="Aggregated cases"
          icon={<FileText size={19} />}
          className="bg-indigo-50 text-indigo-600"
        />

        <SummaryCard
          title="High Risk"
          value="771"
          subtitle="Prototype indicator"
          icon={<ShieldAlert size={19} />}
          className="bg-orange-50 text-orange-600"
        />

        <SummaryCard
          title="Critical"
          value="277"
          subtitle="Human review required"
          icon={<ShieldAlert size={19} />}
          className="bg-red-50 text-red-600"
        />

        <SummaryCard
          title="Reports Generated"
          value={reports.length}
          subtitle="This prototype session"
          icon={<CheckCircle2 size={19} />}
          className="bg-emerald-50 text-emerald-600"
        />

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

        <div className="p-5 border-b border-slate-200">

          <h2 className="text-lg font-bold text-slate-900">
            State-wise Summary
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Aggregated indicators available to the
            National Administrator.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>

              <tr className="bg-slate-50 border-b border-slate-200">

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  State
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Total Cases
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  High Risk
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                  Critical
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {stateData.map((item) => (

                <tr
                  key={item.state}
                  className="
                    border-b
                    border-slate-100
                    hover:bg-slate-50
                  "
                >

                  <td className="px-5 py-4">

                    <p className="text-sm font-semibold text-slate-800">
                      {item.state}
                    </p>

                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                    {item.cases.toLocaleString()}
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

                  <td className="px-5 py-4 text-right">

                    <button
                      onClick={() => {
                        setSelectedReport(
                          "State-wise Risk"
                        );
                        setGeneratedReport({
                          id: Date.now(),
                          name: `${item.state} Risk Report`,
                          type: "State-wise Risk",
                          date: new Date().toLocaleDateString(
                            "en-IN"
                          ),
                          status: "Ready",
                        });
                        setShowPreview(true);
                      }}
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
                      View Report
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>


      {/* GENERATED REPORTS */}

      <section className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
      ">

        <div className="
          p-5
          border-b
          border-slate-200
        ">

          <h2 className="text-lg font-bold text-slate-900">
            Recent Reports
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Previously generated prototype reports.
          </p>

        </div>


        <div className="divide-y divide-slate-100">

          {reports.map((report) => (

            <div
              key={report.id}
              className="
                p-5
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
              "
            >

              <div className="flex items-center gap-3">

                <div className="
                  w-10
                  h-10
                  rounded-xl
                  bg-indigo-50
                  flex
                  items-center
                  justify-center
                ">
                  <FileText
                    size={18}
                    className="text-indigo-600"
                  />
                </div>

                <div>

                  <p className="text-sm font-bold text-slate-800">
                    {report.name}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {report.type} • {report.date}
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-2">

                <span className="
                  inline-flex
                  items-center
                  gap-1
                  px-2.5
                  py-1
                  rounded-full
                  bg-emerald-50
                  text-emerald-600
                  text-xs
                  font-semibold
                ">
                  <CheckCircle2 size={13} />
                  {report.status}
                </span>

                <button
                  onClick={() =>
                    previewReport(report)
                  }
                  className="
                    px-3
                    py-2
                    rounded-lg
                    border
                    border-slate-200
                    text-xs
                    font-semibold
                    text-slate-700
                    hover:bg-slate-50
                  "
                >
                  Preview
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* EXPORT */}

      <section className="
        bg-slate-950
        rounded-2xl
        p-6
        text-white
      ">

        <div className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
        ">

          <div>

            <h2 className="text-lg font-bold">
              Export National Data
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Export aggregated prototype data for
              presentation and analysis.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={downloadCSV}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-white
                text-slate-900
                text-sm
                font-semibold
                hover:bg-slate-100
              "
            >
              <Download size={16} />
              Export CSV
            </button>

            <button
              onClick={printReport}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-500
                text-white
                text-sm
                font-semibold
              "
            >
              <FileText size={16} />
              Print / PDF
            </button>

          </div>

        </div>

      </section>


      {/* PREVIEW MODAL */}

      {showPreview && generatedReport && (

        <div className="
          fixed
          inset-0
          z-50
          bg-black/50
          flex
          items-center
          justify-center
          p-4
        ">

          <div className="
            bg-white
            rounded-2xl
            shadow-2xl
            w-full
            max-w-2xl
            max-h-[90vh]
            overflow-y-auto
          ">

            <div className="
              p-5
              border-b
              border-slate-200
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="text-xs text-indigo-600 font-semibold">
                  SAMVEDNA REPORT
                </p>

                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {generatedReport.name}
                </h2>

              </div>

              <button
                onClick={() =>
                  setShowPreview(false)
                }
                className="
                  p-2
                  rounded-lg
                  hover:bg-slate-100
                "
              >
                <X size={19} />
              </button>

            </div>


            <div className="p-6">

              <div className="
                grid
                grid-cols-2
                gap-4
              ">

                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500">
                    Report Type
                  </p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {generatedReport.type}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500">
                    Reporting Period
                  </p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {dateRange}
                  </p>
                </div>

              </div>


              <div className="
                mt-5
                grid
                grid-cols-2
                md:grid-cols-4
                gap-3
              ">

                <MiniStat
                  title="Cases"
                  value="9,110"
                />

                <MiniStat
                  title="High Risk"
                  value="771"
                />

                <MiniStat
                  title="Critical"
                  value="277"
                />

                <MiniStat
                  title="Avg Distress"
                  value="56"
                />

              </div>


              <div className="
                mt-6
                p-4
                rounded-xl
                bg-amber-50
                border
                border-amber-100
              ">

                <div className="flex gap-2">

                  <Clock
                    size={17}
                    className="text-amber-600"
                  />

                  <div>

                    <p className="text-sm font-semibold text-amber-900">
                      Prototype notice
                    </p>

                    <p className="text-xs text-amber-800 mt-1 leading-5">
                      This report contains simulated
                      demonstration data. It should not
                      be interpreted as official statistics
                      or a clinical assessment.
                    </p>

                  </div>

                </div>

              </div>


              <div className="
                mt-6
                flex
                justify-end
                gap-3
              ">

                <button
                  onClick={downloadCSV}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    border
                    border-slate-200
                    text-sm
                    font-semibold
                    text-slate-700
                    hover:bg-slate-50
                  "
                >
                  <Download size={16} />
                  CSV
                </button>

                <button
                  onClick={printReport}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    bg-indigo-600
                    text-white
                    text-sm
                    font-semibold
                  "
                >
                  <FileText size={16} />
                  Print
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  className,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
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
            ${className}
          `}
        >
          {icon}
        </div>

      </div>

      <p className="text-xs text-slate-400 mt-3">
        {subtitle}
      </p>

    </div>
  );
}


/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="p-3 rounded-xl border border-slate-200">

      <p className="text-[11px] text-slate-500">
        {title}
      </p>

      <p className="text-lg font-bold text-slate-900 mt-1">
        {value}
      </p>

    </div>
  );
}