import React from "react";
import {
  FileText,
  Download,
  Eye,
  BarChart3,
  AlertTriangle,
  HeartHandshake,
  ClipboardCheck,
  Users,
  CalendarDays,
  ChevronDown,
  FileSpreadsheet,
  Printer,
  CheckCircle2,
  Clock3,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  X,
} from "lucide-react";

type ReportType =
  | "district-summary"
  | "high-risk"
  | "alerts"
  | "interventions"
  | "checkins"
  | "case-detail";

type RiskFilter = "all" | "high" | "critical";

type ReportConfig = {
  id: ReportType;
  title: string;
  description: string;
  icon: React.ElementType;
};

type CaseData = {
  id: string;
  category: string;
  district: string;
  score: number;
  previousScore: number;
  trend: "Rapid Increase" | "Increasing" | "Improving" | "Stable";
  counsellor: string;
  status: string;
};

const reportTypes: ReportConfig[] = [
  {
    id: "district-summary",
    title: "District Well-being Summary",
    description:
      "Overall monitoring, distress distribution and district-level well-being indicators.",
    icon: BarChart3,
  },
  {
    id: "high-risk",
    title: "High-Risk Cases Report",
    description:
      "High and critical cases requiring closer human monitoring and follow-up.",
    icon: ShieldAlert,
  },
  {
    id: "alerts",
    title: "Alert & Escalation Report",
    description:
      "AI-generated alerts, review status and escalation activity.",
    icon: AlertTriangle,
  },
  {
    id: "interventions",
    title: "Intervention & Follow-up Report",
    description:
      "Counsellor assignments, contact attempts, support and pending follow-ups.",
    icon: HeartHandshake,
  },
  {
    id: "checkins",
    title: "Check-in & Engagement Report",
    description:
      "Check-in completion, missed responses and engagement indicators.",
    icon: ClipboardCheck,
  },
  {
    id: "case-detail",
    title: "Case-wise Detailed Report",
    description:
      "Detailed monitoring summary for a selected case.",
    icon: FileText,
  },
];

const cases: CaseData[] = [
  {
    id: "CASE-1025",
    category: "Caste-based Violence",
    district: "Indore",
    score: 78,
    previousScore: 54,
    trend: "Rapid Increase",
    counsellor: "Anita Sharma",
    status: "Human Review",
  },
  {
    id: "CASE-1088",
    category: "Threat / Intimidation",
    district: "Indore",
    score: 84,
    previousScore: 61,
    trend: "Increasing",
    counsellor: "Rahul Verma",
    status: "Assigned",
  },
  {
    id: "CASE-1114",
    category: "Atrocity-related",
    district: "Indore",
    score: 73,
    previousScore: 58,
    trend: "Increasing",
    counsellor: "Priya Singh",
    status: "Follow-up Due",
  },
  {
    id: "CASE-1162",
    category: "Grievous Hurt",
    district: "Indore",
    score: 82,
    previousScore: 70,
    trend: "Increasing",
    counsellor: "Neha Patel",
    status: "Human Review",
  },
  {
    id: "CASE-1102",
    category: "Threat / Intimidation",
    district: "Indore",
    score: 35,
    previousScore: 43,
    trend: "Improving",
    counsellor: "Priya Singh",
    status: "Stable",
  },
];

const reportHistory = [
  {
    name: "High-Risk Cases Report",
    date: "27 Sep 2026, 09:42 AM",
    format: "PDF",
  },
  {
    name: "District Well-being Summary",
    date: "26 Sep 2026, 06:20 PM",
    format: "PDF",
  },
  {
    name: "Intervention & Follow-up Report",
    date: "25 Sep 2026, 04:15 PM",
    format: "CSV",
  },
];

function getRisk(score: number) {
  if (score >= 81) return "Critical";
  if (score >= 61) return "High";
  if (score >= 31) return "Moderate";
  return "Low";
}

function riskClasses(risk: string) {
  switch (risk) {
    case "Critical":
      return "bg-red-50 text-red-700 border-red-200";
    case "High":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "Moderate":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] =
    React.useState<ReportType>("district-summary");

  const [riskFilter, setRiskFilter] =
    React.useState<RiskFilter>("all");

  const [fromDate, setFromDate] =
    React.useState("2026-09-01");

  const [toDate, setToDate] =
    React.useState("2026-09-27");

  const [selectedCase, setSelectedCase] =
    React.useState("CASE-1025");

  const [generated, setGenerated] =
    React.useState(false);

  const [showPreview, setShowPreview] =
    React.useState(false);

  const [showReportMenu, setShowReportMenu] =
    React.useState(false);

  const filteredCases = React.useMemo(() => {
    if (riskFilter === "all") return cases;

    return cases.filter((item) => {
      const risk = getRisk(item.score);

      return risk.toLowerCase() === riskFilter;
    });
  }, [riskFilter]);

  const currentReport = reportTypes.find(
    (item) => item.id === selectedReport
  );

  const selectedCaseData =
    cases.find((item) => item.id === selectedCase) ||
    cases[0];

  const handleGenerateReport = () => {
    setGenerated(true);

    setTimeout(() => {
      setShowPreview(true);
    }, 350);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const rows = [
      [
        "Case ID",
        "Category",
        "District",
        "Current Score",
        "Previous Score",
        "Risk",
        "Trend",
        "Counsellor",
        "Status",
      ],
      ...filteredCases.map((item) => [
        item.id,
        item.category,
        item.district,
        item.score,
        item.previousScore,
        getRisk(item.score),
        item.trend,
        item.counsellor,
        item.status,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "SAMVEDNA-District-Report.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const renderReportPreview = () => {
    switch (selectedReport) {
      case "district-summary":
        return (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SummaryCard
                label="Total Active Cases"
                value="1,248"
              />

              <SummaryCard
                label="Monitoring Active"
                value="1,173"
              />

              <SummaryCard
                label="High Risk"
                value="110"
              />

              <SummaryCard
                label="Critical"
                value="40"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <div className="border border-slate-200 rounded-xl p-5">
                <h4 className="font-semibold text-slate-900">
                  Distress Distribution
                </h4>

                <div className="space-y-3 mt-4">
                  <Distribution
                    label="Low"
                    value="820"
                    percent="66%"
                    color="bg-emerald-500"
                  />

                  <Distribution
                    label="Moderate"
                    value="280"
                    percent="22%"
                    color="bg-amber-400"
                  />

                  <Distribution
                    label="High"
                    value="110"
                    percent="9%"
                    color="bg-orange-500"
                  />

                  <Distribution
                    label="Critical"
                    value="40"
                    percent="3%"
                    color="bg-red-500"
                  />
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-5">
                <h4 className="font-semibold text-slate-900">
                  District Monitoring Status
                </h4>

                <div className="space-y-4 mt-4">
                  <StatusRow
                    label="Pending Human Review"
                    value="12"
                    icon={Clock3}
                  />

                  <StatusRow
                    label="Pending Follow-ups"
                    value="23"
                    icon={ClipboardCheck}
                  />

                  <StatusRow
                    label="Active Alerts"
                    value="12"
                    icon={AlertTriangle}
                  />

                  <StatusRow
                    label="Counsellor Assigned"
                    value="98%"
                    icon={Users}
                  />
                </div>
              </div>
            </div>
          </>
        );

      case "high-risk":
        return (
          <ReportTable
            title="High & Critical Cases"
            data={filteredCases.filter(
              (item) => item.score >= 61
            )}
          />
        );

      case "alerts":
        return (
          <div className="space-y-3">
            <AlertRow
              id="CASE-1025"
              risk="High"
              reason="Distress increased from 54 → 78 across consecutive check-ins."
              status="Human Review"
            />

            <AlertRow
              id="CASE-1088"
              risk="Critical"
              reason="Repeated high stress and fear indicators detected."
              status="Assigned"
            />

            <AlertRow
              id="CASE-1162"
              risk="Critical"
              reason="Rapid increase in longitudinal distress trend."
              status="Pending Review"
            />

            <AlertRow
              id="CASE-1114"
              risk="High"
              reason="Recent threat-related response reported."
              status="Follow-up Due"
            />
          </div>
        );

      case "interventions":
        return (
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-5 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500">
              <div className="p-4">Case</div>
              <div className="p-4">Counsellor</div>
              <div className="p-4">Contact</div>
              <div className="p-4">Support</div>
              <div className="p-4">Next Follow-up</div>
            </div>

            {[
              [
                "CASE-1025",
                "Anita Sharma",
                "Completed",
                "Assessment completed",
                "30 Sep",
              ],
              [
                "CASE-1088",
                "Rahul Verma",
                "Completed",
                "Safety assessment",
                "29 Sep",
              ],
              [
                "CASE-1114",
                "Priya Singh",
                "Attempted",
                "Pending",
                "28 Sep",
              ],
              [
                "CASE-1162",
                "Neha Patel",
                "Completed",
                "Support provided",
                "02 Oct",
              ],
            ].map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-5 border-b border-slate-100 text-sm"
              >
                {row.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className="p-4 text-slate-700"
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );

      case "checkins":
        return (
          <div className="grid md:grid-cols-3 gap-4">
            <MetricCard
              title="Check-ins Scheduled"
              value="3,420"
              subtitle="This reporting period"
            />

            <MetricCard
              title="Completed"
              value="3,012"
              subtitle="88.1% response rate"
            />

            <MetricCard
              title="Missed"
              value="408"
              subtitle="Requires engagement monitoring"
            />

            <MetricCard
              title="Repeated Misses"
              value="74"
              subtitle="Human follow-up recommended"
            />

            <MetricCard
              title="Engagement Improved"
              value="126"
              subtitle="Positive change"
            />

            <MetricCard
              title="Engagement Reduced"
              value="82"
              subtitle="Requires review"
            />
          </div>
        );

      case "case-detail":
        return (
          <div className="border border-slate-200 rounded-xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  Case Report
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedCaseData.id}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {selectedCaseData.category} •{" "}
                  {selectedCaseData.district}
                </p>
              </div>

              <span
                className={`px-3 py-1.5 rounded-full border text-xs font-semibold ${riskClasses(
                  getRisk(selectedCaseData.score)
                )}`}
              >
                {getRisk(selectedCaseData.score)}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <MetricCard
                title="Current Score"
                value={`${selectedCaseData.score}/100`}
                subtitle={selectedCaseData.trend}
              />

              <MetricCard
                title="Previous Score"
                value={`${selectedCaseData.previousScore}/100`}
                subtitle="Previous check-in"
              />

              <MetricCard
                title="Counsellor"
                value={selectedCaseData.counsellor}
                subtitle="Assigned"
              />

              <MetricCard
                title="Case Status"
                value={selectedCaseData.status}
                subtitle="Current status"
              />
            </div>

            <div className="mt-6 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
              <div className="flex gap-3">
                <ShieldAlert
                  size={20}
                  className="text-indigo-600 mt-0.5"
                />

                <div>
                  <p className="font-semibold text-indigo-900">
                    Human Review
                  </p>

                  <p className="text-sm text-indigo-700 mt-1">
                    AI indicators are intended for monitoring
                    and decision support. Human review is required
                    before intervention decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <div className="flex items-center gap-2 text-indigo-600">
              <FileText size={20} />

              <span className="text-xs font-bold uppercase tracking-wider">
                District Reporting
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
              Reports
            </h1>

            <p className="text-slate-500 mt-1">
              Generate district-level monitoring and intervention reports.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-2 rounded-lg bg-slate-100 text-xs font-medium text-slate-600">
              Indore District
            </span>

            <span className="px-3 py-2 rounded-lg bg-emerald-50 text-xs font-medium text-emerald-700 border border-emerald-100">
              Demo Data
            </span>
          </div>

        </div>
      </section>


      {/* =====================================================
          REPORT TYPE CARDS
      ====================================================== */}

      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Generate a Report
            </h2>

            <p className="text-sm text-slate-500">
              Select the report required for district monitoring.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

          {reportTypes.map((report) => {
            const Icon = report.icon;
            const selected =
              selectedReport === report.id;

            return (
              <button
                key={report.id}
                onClick={() => {
                  setSelectedReport(report.id);
                  setGenerated(false);
                }}
                className={`text-left bg-white border rounded-2xl p-5 transition-all ${
                  selected
                    ? "border-indigo-500 ring-2 ring-indigo-100 shadow-md"
                    : "border-slate-200 hover:border-indigo-200 hover:shadow-sm"
                }`}
              >

                <div className="flex items-start justify-between">

                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      selected
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    <Icon size={21} />
                  </div>

                  {selected && (
                    <CheckCircle2
                      size={20}
                      className="text-indigo-600"
                    />
                  )}

                </div>

                <h3 className="font-bold text-slate-900 mt-4">
                  {report.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1 leading-5">
                  {report.description}
                </p>

              </button>
            );
          })}

        </div>
      </section>


      {/* =====================================================
          FILTER PANEL
      ====================================================== */}

      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="flex items-center gap-2 mb-5">
          <CalendarDays
            size={19}
            className="text-indigo-600"
          />

          <div>
            <h3 className="font-bold text-slate-900">
              Report Filters
            </h3>

            <p className="text-xs text-slate-500">
              Configure the reporting period and case scope.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* REPORT TYPE */}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Report Type
            </label>

            <div className="relative">
              <select
                value={selectedReport}
                onChange={(event) =>
                  setSelectedReport(
                    event.target.value as ReportType
                  )
                }
                className="
                  w-full
                  appearance-none
                  px-4
                  py-3
                  pr-10
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-sm
                  text-slate-700
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-50
                "
              >
                {reportTypes.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.title}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>


          {/* FROM */}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(event) =>
                setFromDate(event.target.value)
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
                text-slate-700
                outline-none
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-50
              "
            />
          </div>


          {/* TO */}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              To Date
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(event) =>
                setToDate(event.target.value)
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
                text-slate-700
                outline-none
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-50
              "
            />
          </div>


          {/* RISK */}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Risk Level
            </label>

            <div className="relative">
              <select
                value={riskFilter}
                onChange={(event) =>
                  setRiskFilter(
                    event.target.value as RiskFilter
                  )
                }
                className="
                  w-full
                  appearance-none
                  px-4
                  py-3
                  pr-10
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-sm
                  text-slate-700
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-50
                "
              >
                <option value="all">
                  All Risk Levels
                </option>

                <option value="high">
                  High
                </option>

                <option value="critical">
                  Critical
                </option>
              </select>

              <ChevronDown
                size={17}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

        </div>


        {/* CASE SELECT FOR CASE REPORT */}

        {selectedReport === "case-detail" && (
          <div className="mt-4 max-w-md">

            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Select Case
            </label>

            <select
              value={selectedCase}
              onChange={(event) =>
                setSelectedCase(event.target.value)
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
              {cases.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.id} — {getRisk(item.score)}
                </option>
              ))}
            </select>

          </div>
        )}


        {/* ACTIONS */}

        <div className="flex flex-wrap gap-3 mt-5">

          <button
            onClick={handleGenerateReport}
            className="
              px-5
              py-3
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              font-semibold
              text-sm
              flex
              items-center
              gap-2
              shadow-sm
              transition
            "
          >
            <FileText size={18} />

            Generate Report
          </button>

          <button
            onClick={() => setShowPreview(true)}
            className="
              px-5
              py-3
              rounded-xl
              border
              border-slate-200
              bg-white
              hover:bg-slate-50
              text-slate-700
              font-semibold
              text-sm
              flex
              items-center
              gap-2
              transition
            "
          >
            <Eye size={18} />

            Preview
          </button>

          <button
            onClick={handleExportCSV}
            className="
              px-5
              py-3
              rounded-xl
              border
              border-slate-200
              bg-white
              hover:bg-slate-50
              text-slate-700
              font-semibold
              text-sm
              flex
              items-center
              gap-2
              transition
            "
          >
            <FileSpreadsheet size={18} />

            Export CSV
          </button>

        </div>

      </section>


      {/* =====================================================
          GENERATED SUCCESS
      ====================================================== */}

      {generated && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">

          <CheckCircle2
            size={21}
            className="text-emerald-600 mt-0.5"
          />

          <div>
            <p className="font-semibold text-emerald-800">
              Report generated successfully
            </p>

            <p className="text-sm text-emerald-700 mt-1">
              {currentReport?.title} is ready for review.
            </p>
          </div>

        </div>
      )}


      {/* =====================================================
          QUICK REPORT STATISTICS
      ====================================================== */}

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <QuickStat
          label="Reports Generated"
          value="28"
          icon={FileText}
        />

        <QuickStat
          label="Pending Reviews"
          value="12"
          icon={Clock3}
        />

        <QuickStat
          label="High-Risk Cases"
          value="110"
          icon={ShieldAlert}
        />

        <QuickStat
          label="Follow-ups Due"
          value="23"
          icon={ClipboardCheck}
        />

      </section>


      {/* =====================================================
          RECENT REPORTS
      ====================================================== */}

      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="p-5 border-b border-slate-200 flex items-center justify-between">

          <div>
            <h2 className="font-bold text-slate-900">
              Recently Generated Reports
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Reports generated by the district officer.
            </p>
          </div>

          <FileText
            size={20}
            className="text-slate-400"
          />

        </div>

        <div className="divide-y divide-slate-100">

          {reportHistory.map((report, index) => (
            <div
              key={index}
              className="
                p-4
                flex
                flex-col
                sm:flex-row
                sm:items-center
                justify-between
                gap-3
                hover:bg-slate-50
                transition
              "
            >

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FileText size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {report.name}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Generated {report.date}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3">

                <span className="text-xs font-semibold text-slate-500">
                  {report.format}
                </span>

                <button
                  onClick={() => setShowPreview(true)}
                  className="
                    p-2
                    rounded-lg
                    border
                    border-slate-200
                    hover:bg-slate-100
                    text-slate-600
                  "
                  title="Preview"
                >
                  <Eye size={17} />
                </button>

                <button
                  onClick={
                    report.format === "CSV"
                      ? handleExportCSV
                      : handlePrint
                  }
                  className="
                    p-2
                    rounded-lg
                    border
                    border-slate-200
                    hover:bg-slate-100
                    text-slate-600
                  "
                  title="Download"
                >
                  <Download size={17} />
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* =====================================================
          PREVIEW MODAL
      ====================================================== */}

      {showPreview && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-slate-950/60
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >

          <div
            className="
              bg-white
              w-full
              max-w-5xl
              max-h-[90vh]
              rounded-2xl
              shadow-2xl
              overflow-hidden
              flex
              flex-col
            "
          >

            {/* MODAL HEADER */}

            <div className="p-5 border-b border-slate-200 flex items-center justify-between">

              <div>
                <p className="text-xs uppercase tracking-wider text-indigo-600 font-bold">
                  Report Preview
                </p>

                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {currentReport?.title}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Indore District • {fromDate} to {toDate}
                </p>
              </div>

              <button
                onClick={() => setShowPreview(false)}
                className="
                  p-2
                  rounded-lg
                  hover:bg-slate-100
                  text-slate-500
                "
              >
                <X size={20} />
              </button>

            </div>


            {/* REPORT CONTENT */}

            <div className="overflow-y-auto p-5 sm:p-7">

              <div className="bg-white">

                <div className="flex items-start justify-between border-b border-slate-200 pb-5">

                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      SAMVEDNA
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                      AI-Powered Victim Well-being Monitoring
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-400">
                      District
                    </p>

                    <p className="font-semibold text-slate-900">
                      Indore
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Demo Data
                    </p>
                  </div>

                </div>

                <div className="mt-6">

                  <h2 className="text-xl font-bold text-slate-900">
                    {currentReport?.title}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Reporting period: {fromDate} → {toDate}
                  </p>

                </div>

                <div className="mt-6">
                  {renderReportPreview()}
                </div>

                <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-xl">

                  <p className="text-xs text-slate-500 leading-5">
                    <strong className="text-slate-700">
                      Prototype notice:
                    </strong>{" "}
                    This report uses demo data for prototype
                    demonstration. AI-generated indicators are
                    decision-support signals and are not clinical
                    diagnoses. Human review is required for
                    high and critical risk alerts.
                  </p>

                </div>

              </div>

            </div>


            {/* MODAL ACTIONS */}

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap justify-end gap-3">

              <button
                onClick={handleExportCSV}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-700
                  font-semibold
                  text-sm
                  flex
                  items-center
                  gap-2
                "
              >
                <FileSpreadsheet size={17} />
                Export CSV
              </button>

              <button
                onClick={handlePrint}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  font-semibold
                  text-sm
                  flex
                  items-center
                  gap-2
                "
              >
                <Printer size={17} />
                Download / Print PDF
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}


/* ============================================================
   SMALL COMPONENTS
============================================================ */

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-4">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="text-2xl font-bold text-slate-900 mt-1">
        {value}
      </p>
    </div>
  );
}


function MetricCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-4">
      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="text-xl font-bold text-slate-900 mt-1">
        {value}
      </p>

      <p className="text-xs text-slate-400 mt-1">
        {subtitle}
      </p>
    </div>
  );
}


function Distribution({
  label,
  value,
  percent,
  color,
}: {
  label: string;
  value: string;
  percent: string;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">

        <div className="flex items-center gap-2">

          <span
            className={`w-2.5 h-2.5 rounded-full ${color}`}
          />

          <span className="text-slate-600">
            {label}
          </span>

        </div>

        <span className="font-semibold text-slate-800">
          {value}
        </span>

      </div>

      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: percent,
          }}
        />

      </div>
    </div>
  );
}


function StatusRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2">

        <Icon
          size={17}
          className="text-indigo-500"
        />

        <span className="text-sm text-slate-600">
          {label}
        </span>

      </div>

      <span className="font-bold text-slate-900">
        {value}
      </span>

    </div>
  );
}


function QuickStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">

      <div className="flex items-center justify-between">

        <p className="text-xs text-slate-500">
          {label}
        </p>

        <Icon
          size={17}
          className="text-indigo-500"
        />

      </div>

      <p className="text-2xl font-bold text-slate-900 mt-2">
        {value}
      </p>

    </div>
  );
}


function ReportTable({
  title,
  data,
}: {
  title: string;
  data: CaseData[];
}) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">

      <div className="p-4 bg-slate-50 border-b border-slate-200">

        <h4 className="font-bold text-slate-900">
          {title}
        </h4>

        <p className="text-xs text-slate-500 mt-1">
          Human review is required for high and critical alerts.
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-white border-b border-slate-200">

            <tr className="text-left text-xs text-slate-500">

              <th className="p-4">Case</th>
              <th className="p-4">Category</th>
              <th className="p-4">Score</th>
              <th className="p-4">Risk</th>
              <th className="p-4">Trend</th>
              <th className="p-4">Counsellor</th>
              <th className="p-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {data.map((item) => {
              const risk = getRisk(item.score);

              return (
                <tr
                  key={item.id}
                  className="border-b border-slate-100"
                >

                  <td className="p-4 font-semibold text-slate-900">
                    {item.id}
                  </td>

                  <td className="p-4 text-slate-600">
                    {item.category}
                  </td>

                  <td className="p-4 font-bold text-slate-900">
                    {item.score}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${riskClasses(
                        risk
                      )}`}
                    >
                      {risk}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-1">

                      {item.trend === "Improving" ? (
                        <TrendingDown
                          size={15}
                          className="text-emerald-600"
                        />
                      ) : (
                        <TrendingUp
                          size={15}
                          className="text-red-500"
                        />
                      )}

                      <span className="text-xs text-slate-600">
                        {item.trend}
                      </span>

                    </div>

                  </td>

                  <td className="p-4 text-slate-600">
                    {item.counsellor}
                  </td>

                  <td className="p-4 text-slate-600">
                    {item.status}
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}


function AlertRow({
  id,
  risk,
  reason,
  status,
}: {
  id: string;
  risk: string;
  reason: string;
  status: string;
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-4">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">

        <div className="flex items-start gap-3">

          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} />
          </div>

          <div>

            <div className="flex items-center gap-2">

              <p className="font-bold text-slate-900">
                {id}
              </p>

              <span
                className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${riskClasses(
                  risk
                )}`}
              >
                {risk}
              </span>

            </div>

            <p className="text-sm text-slate-500 mt-1">
              {reason}
            </p>

          </div>

        </div>

        <span className="text-xs font-semibold text-slate-600">
          {status}
        </span>

      </div>

    </div>
  );
}