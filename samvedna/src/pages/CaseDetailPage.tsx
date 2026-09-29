import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Activity,
  AlertTriangle,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  MessageSquare,
  Phone,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  UserRound,
  Users,
  X,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type RiskLevel =
  | "Low"
  | "Moderate"
  | "High"
  | "Critical";

type TrendType =
  | "Increasing"
  | "Rapid Increase"
  | "Decreasing"
  | "Stable";

type CounsellorStatus =
  | "Available"
  | "Busy"
  | "Off Duty";

type CaseData = {
  id: string;
  category: string;
  district: string;
  state: string;
  registrationDate: string;
  counsellor: string;
  score: number;
  previousScore: number;
  risk: RiskLevel;
  trend: TrendType;
  history: number[];
  lastCheckIn: string;
};

type Counsellor = {
  id: string;
  name: string;
  district: string;
  specialization: string;
  status: CounsellorStatus;
  assignedCases: number;
  experience: string;
  phone: string;
};

/* =========================================================
   DEMO CASE DATA
========================================================= */

const cases: Record<string, CaseData> = {
  "CASE-1025": {
    id: "CASE-1025",
    category: "Caste-based Violence",
    district: "Indore",
    state: "Madhya Pradesh",
    registrationDate: "15 Jul 2026",
    counsellor: "Anita Sharma",
    score: 78,
    previousScore: 54,
    risk: "High",
    trend: "Rapid Increase",
    history: [25, 31, 44, 59, 78],
    lastCheckIn: "2 hours ago",
  },

  "CASE-1088": {
    id: "CASE-1088",
    category: "Threat / Intimidation",
    district: "Ujjain",
    state: "Madhya Pradesh",
    registrationDate: "20 Jul 2026",
    counsellor: "Rahul Verma",
    score: 84,
    previousScore: 61,
    risk: "Critical",
    trend: "Increasing",
    history: [42, 49, 61, 72, 84],
    lastCheckIn: "5 hours ago",
  },

  "CASE-1102": {
    id: "CASE-1102",
    category: "Atrocity-related",
    district: "Dewas",
    state: "Madhya Pradesh",
    registrationDate: "24 Jul 2026",
    counsellor: "Priya Singh",
    score: 35,
    previousScore: 43,
    risk: "Moderate",
    trend: "Decreasing",
    history: [68, 62, 55, 43, 35],
    lastCheckIn: "Yesterday",
  },

  "CASE-1114": {
    id: "CASE-1114",
    category: "Rape / Sexual Violence",
    district: "Indore",
    state: "Madhya Pradesh",
    registrationDate: "28 Jul 2026",
    counsellor: "Priya Singh",
    score: 68,
    previousScore: 57,
    risk: "High",
    trend: "Increasing",
    history: [35, 42, 49, 57, 68],
    lastCheckIn: "Yesterday",
  },
};

/* =========================================================
   COUNSELLOR DATA
========================================================= */

const counsellors: Counsellor[] = [
  {
    id: "C001",
    name: "Anita Sharma",
    district: "Indore",
    specialization: "Trauma Support",
    status: "Available",
    assignedCases: 8,
    experience: "6 years",
    phone: "+91 98XXXXXX21",
  },

  {
    id: "C002",
    name: "Rahul Verma",
    district: "Indore",
    specialization: "Crisis Counselling",
    status: "Busy",
    assignedCases: 14,
    experience: "8 years",
    phone: "+91 97XXXXXX45",
  },

  {
    id: "C003",
    name: "Priya Singh",
    district: "Ujjain",
    specialization: "Victim Support",
    status: "Available",
    assignedCases: 6,
    experience: "5 years",
    phone: "+91 96XXXXXX18",
  },

  {
    id: "C004",
    name: "Neha Patel",
    district: "Dewas",
    specialization: "Mental Well-being",
    status: "Off Duty",
    assignedCases: 11,
    experience: "7 years",
    phone: "+91 95XXXXXX72",
  },

  {
    id: "C005",
    name: "Arjun Mehta",
    district: "Indore",
    specialization: "Trauma Counselling",
    status: "Available",
    assignedCases: 5,
    experience: "4 years",
    phone: "+91 94XXXXXX63",
  },

  {
    id: "C006",
    name: "Kavita Joshi",
    district: "Bhopal",
    specialization: "Crisis Support",
    status: "Busy",
    assignedCases: 16,
    experience: "9 years",
    phone: "+91 93XXXXXX28",
  },

  {
    id: "C007",
    name: "Rohit Sharma",
    district: "Indore",
    specialization: "Family & Trauma Support",
    status: "Available",
    assignedCases: 7,
    experience: "5 years",
    phone: "+91 92XXXXXX41",
  },

  {
    id: "C008",
    name: "Sneha Gupta",
    district: "Dhar",
    specialization: "Victim Rehabilitation",
    status: "Off Duty",
    assignedCases: 9,
    experience: "6 years",
    phone: "+91 91XXXXXX56",
  },
];

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function getRiskClasses(risk: RiskLevel) {
  switch (risk) {
    case "Low":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Moderate":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "High":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "Critical":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
}

function getStatusClasses(
  status: CounsellorStatus
) {
  switch (status) {
    case "Available":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Busy":
      return "bg-red-50 text-red-700 border-red-200";

    case "Off Duty":
      return "bg-slate-100 text-slate-600 border-slate-200";

    default:
      return "bg-slate-50 text-slate-600";
  }
}

function getTrendColor(trend: TrendType) {
  if (trend === "Decreasing") {
    return "text-emerald-600";
  }

  if (trend === "Rapid Increase") {
    return "text-red-600";
  }

  if (trend === "Increasing") {
    return "text-orange-600";
  }

  return "text-slate-500";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-xs font-medium">
          {label}
        </span>
      </div>

      <p className="font-semibold text-slate-800 mt-2">
        {value}
      </p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <div className="flex items-end gap-2 mt-1">
        <p className="text-xl font-bold text-slate-900">
          {value}
        </p>

        {change && (
          <span className="text-xs text-slate-400 mb-1">
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

function ExplanationRow({
  text,
  type = "normal",
}: {
  text: string;
  type?: "normal" | "warning";
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
          type === "warning"
            ? "bg-orange-100 text-orange-600"
            : "bg-emerald-100 text-emerald-600"
        }`}
      >
        {type === "warning" ? (
          <AlertTriangle className="w-3.5 h-3.5" />
        ) : (
          <CheckCircle2 className="w-3.5 h-3.5" />
        )}
      </div>

      <p className="text-sm text-slate-600 leading-5">
        {text}
      </p>
    </div>
  );
}

function SignalBar({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">
          {label}
        </span>

        <span className="text-sm font-bold text-slate-800">
          {value}
        </span>
      </div>

      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function PredictionBox({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-4">
      <p className="text-xs text-slate-400">
        {title}
      </p>

      <p className="text-xl font-bold text-slate-900 mt-1">
        {value}
      </p>

      <p className="text-xs text-slate-500 mt-2 leading-5">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   SCORE CHART
========================================================= */

function ScoreChart({
  history,
}: {
  history: number[];
}) {
  const width = 700;
  const height = 230;

  const paddingX = 40;
  const paddingY = 25;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const points = history.map((value, index) => {
    const x =
      paddingX +
      (index / Math.max(history.length - 1, 1)) *
        chartWidth;

    const y =
      paddingY +
      chartHeight -
      (value / 100) * chartHeight;

    return {
      x,
      y,
      value,
    };
  });

  const linePoints = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  const areaPoints = [
    `${paddingX},${height - paddingY}`,
    ...points.map(
      (point) => `${point.x},${point.y}`
    ),
    `${paddingX + chartWidth},${
      height - paddingY
    }`,
  ].join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[620px] h-[250px]"
      >
        {/* GRID */}

        {[0, 25, 50, 75, 100].map(
          (value) => {
            const y =
              paddingY +
              chartHeight -
              (value / 100) * chartHeight;

            return (
              <g key={value}>
                <line
                  x1={paddingX}
                  x2={paddingX + chartWidth}
                  y1={y}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                />

                <text
                  x="8"
                  y={y + 4}
                  fontSize="11"
                  fill="#94a3b8"
                >
                  {value}
                </text>
              </g>
            );
          }
        )}

        {/* AREA */}

        <polygon
          points={areaPoints}
          fill="#6366f1"
          opacity="0.08"
        />

        {/* LINE */}

        <polyline
          points={linePoints}
          fill="none"
          stroke="#6366f1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* POINTS */}

        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="white"
              stroke="#6366f1"
              strokeWidth="3"
            />

            <text
              x={point.x}
              y={point.y - 12}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#475569"
            >
              {point.value}
            </text>
          </g>
        ))}

        {/* LABELS */}

        {history.map((_, index) => {
          const x =
            paddingX +
            (index /
              Math.max(history.length - 1, 1)) *
              chartWidth;

          return (
            <text
              key={index}
              x={x}
              y={height - 4}
              textAnchor="middle"
              fontSize="10"
              fill="#94a3b8"
            >
              Week {index + 1}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

/* =========================================================
   FORECAST CHART
========================================================= */

function ForecastChart({
  currentScore,
}: {
  currentScore: number;
}) {
  const forecast = [
    currentScore,
    Math.min(currentScore + 3, 100),
    Math.min(currentScore + 5, 100),
    Math.min(currentScore + 7, 100),
    Math.min(currentScore + 8, 100),
    Math.min(currentScore + 10, 100),
    Math.min(currentScore + 12, 100),
  ];

  return (
    <div className="flex items-end gap-3 h-32">
      {forecast.map((value, index) => {
        const height = Math.max(
          15,
          (value / 100) * 100
        );

        return (
          <div
            key={index}
            className="flex-1 h-full flex flex-col justify-end items-center gap-1"
          >
            <span className="text-[10px] font-semibold text-slate-500">
              {value}
            </span>

            <div
              className={`w-full rounded-t-md ${
                index === 0
                  ? "bg-indigo-500"
                  : "bg-indigo-300"
              }`}
              style={{
                height: `${height}%`,
              }}
            />

            <span className="text-[9px] text-slate-400">
              {index === 0
                ? "Now"
                : `D${index}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   CHECK-IN
========================================================= */

function CheckIn({
  number,
  date,
  stress,
  fear,
  anxiety,
  status,
}: {
  number: number;
  date: string;
  stress: number;
  fear: number;
  anxiety: number;
  status: string;
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-slate-800">
            Check-in #{number}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {date}
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
          {status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <CheckValue
          label="Stress"
          value={stress}
        />

        <CheckValue
          label="Fear"
          value={fear}
        />

        <CheckValue
          label="Anxiety"
          value={anxiety}
        />
      </div>
    </div>
  );
}

function CheckValue({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="bg-slate-50 rounded-lg p-3">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="font-bold text-slate-800 mt-1">
        {value}/5
      </p>
    </div>
  );
}

/* =========================================================
   TIMELINE
========================================================= */

function TimelineItem({
  date,
  title,
  description,
  completed = true,
}: {
  date: string;
  title: string;
  description: string;
  completed?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center ${
            completed
              ? "bg-indigo-100 text-indigo-600"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          {completed ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Clock3 className="w-4 h-4" />
          )}
        </div>

        <div className="w-px flex-1 bg-slate-200 mt-2" />
      </div>

      <div className="pb-6">
        <p className="text-xs text-slate-400">
          {date}
        </p>

        <p className="font-semibold text-slate-800 mt-1">
          {title}
        </p>

        <p className="text-sm text-slate-500 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   COMMUNICATION
========================================================= */

function CommunicationRow({
  icon,
  channel,
  date,
  status,
  description,
}: {
  icon: React.ReactNode;
  channel: string;
  date: string;
  status: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0">
      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm text-slate-800">
            {channel}
          </p>

          <span className="text-[10px] text-slate-400">
            {date}
          </span>
        </div>

        <p className="text-xs text-slate-500 mt-1">
          {description}
        </p>
      </div>

      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
        {status}
      </span>
    </div>
  );
}

/* =========================================================
   COUNSELLOR MODAL
========================================================= */

function CounsellorModal({
  caseData,
  onClose,
  onAssign,
}: {
  caseData: CaseData;
  onClose: () => void;
  onAssign: (counsellor: Counsellor) => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />

              <h2 className="text-xl font-bold text-slate-900">
                Assign Counsellor
              </h2>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              Select a counsellor for{" "}
              <span className="font-semibold">
                {caseData.id}
              </span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* INFO */}

        <div className="px-6 py-4 bg-red-50 border-b border-red-100">
          <div className="flex items-center gap-3">

            <AlertTriangle className="w-5 h-5 text-red-600" />

            <div>
              <p className="text-sm font-semibold text-red-700">
                Critical case requires human review
              </p>

              <p className="text-xs text-red-600 mt-0.5">
                Counsellor assignment is a human decision.
                AI does not automatically assign staff.
              </p>
            </div>

          </div>
        </div>

        {/* COUNSELLOR LIST */}

        <div className="p-6 overflow-y-auto max-h-[65vh]">

          <div className="grid grid-cols-1 gap-3">

            {counsellors.map((counsellor) => (
              <div
                key={counsellor.id}
                className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50/20 transition"
              >

                <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                  {/* PROFILE */}

                  <div className="flex items-center gap-3 flex-1 min-w-0">

                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                      {getInitials(
                        counsellor.name
                      )}
                    </div>

                    <div className="min-w-0">

                      <div className="flex items-center gap-2 flex-wrap">

                        <h3 className="font-semibold text-slate-900">
                          {counsellor.name}
                        </h3>

                        <span
                          className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${getStatusClasses(
                            counsellor.status
                          )}`}
                        >
                          {counsellor.status}
                        </span>

                      </div>

                      <p className="text-sm text-slate-500 mt-1">
                        {counsellor.specialization}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {counsellor.district} •{" "}
                        {counsellor.experience}
                      </p>

                    </div>
                  </div>

                  {/* STATS */}

                  <div className="flex items-center gap-6">

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Assigned
                      </p>

                      <p className="text-lg font-bold text-slate-800">
                        {counsellor.assignedCases}
                      </p>

                      <p className="text-[10px] text-slate-400">
                        active cases
                      </p>
                    </div>

                    <div className="hidden sm:block">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Contact
                      </p>

                      <p className="text-xs font-medium text-slate-600 mt-1">
                        {counsellor.phone}
                      </p>
                    </div>

                  </div>

                  {/* ACTION */}

                  <button
                    disabled={
                      counsellor.status !==
                      "Available"
                    }
                    onClick={() =>
                      onAssign(counsellor)
                    }
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                      counsellor.status ===
                      "Available"
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {counsellor.status ===
                    "Available"
                      ? "Assign"
                      : counsellor.status}
                  </button>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* FOOTER */}

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">

          <p className="text-xs text-slate-500">
            Demo counsellor data for prototype
            demonstration. Production assignment should
            use authorized staff records and real-time
            availability.
          </p>

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function CaseDetailPage() {
  const navigate = useNavigate();

  const { caseId } = useParams<{
    caseId: string;
  }>();

  const [showCounsellorModal, setShowCounsellorModal] =
    React.useState(false);

  const [assignedCounsellor, setAssignedCounsellor] =
    React.useState<string | null>(null);

  const [showSuccess, setShowSuccess] =
    React.useState(false);

  /* =======================================================
     FIND CASE
  ======================================================== */

  const caseData = caseId
    ? cases[caseId]
    : undefined;

  /* =======================================================
     UNKNOWN CASE
  ======================================================== */

  if (!caseData) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">

        <div className="max-w-md w-full text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">
            <FileText className="w-7 h-7 text-slate-400" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mt-5">
            Case Not Found
          </h1>

          <p className="text-sm text-slate-500 mt-2 leading-6">
            The requested case does not exist in the
            current prototype dataset.
          </p>

          {caseId && (
            <p className="text-xs text-slate-400 mt-3">
              Requested Case ID:{" "}
              <span className="font-semibold">
                {caseId}
              </span>
            </p>
          )}

          <button
            onClick={() => navigate("/cases")}
            className="mt-6 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          >
            ← Back to Cases
          </button>

        </div>
      </div>
    );
  }

  /* =======================================================
     ASSIGN COUNSELLOR
  ======================================================== */

  const handleAssignCounsellor = (
    counsellor: Counsellor
  ) => {
    setAssignedCounsellor(counsellor.name);

    setShowCounsellorModal(false);

    setShowSuccess(true);

    window.setTimeout(() => {
      setShowSuccess(false);
    }, 3500);
  };

  const currentCounsellor =
    assignedCounsellor || caseData.counsellor;

  const scoreChange =
    caseData.score - caseData.previousScore;

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <div className="space-y-6">

      {/* ===================================================
          SUCCESS MESSAGE
      ==================================================== */}

      {showSuccess && (
        <div className="fixed top-5 right-5 z-[120] bg-white border border-emerald-200 shadow-xl rounded-xl px-5 py-4 flex items-start gap-3">

          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              Counsellor assigned successfully
            </p>

            <p className="text-xs text-slate-500 mt-1">
              {assignedCounsellor} has been assigned to{" "}
              {caseData.id}.
            </p>
          </div>

        </div>
      )}

      {/* ===================================================
          TOP HEADER
      ==================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <button
            onClick={() => navigate("/cases")}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cases
          </button>

          <div className="flex items-center gap-3 flex-wrap">

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {caseData.id}
            </h1>

            <span
              className={`px-3 py-1 rounded-full border text-xs font-bold ${getRiskClasses(
                caseData.risk
              )}`}
            >
              {caseData.risk}
            </span>

          </div>

          <p className="text-sm text-slate-500 mt-2">
            Victim well-being monitoring case
            profile and AI-assisted risk analysis.
          </p>

        </div>

        {/* HEADER ACTIONS */}

        <div className="flex items-center gap-3">

          {caseData.risk === "Critical" && (
            <button
              onClick={() =>
                setShowCounsellorModal(true)
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition shadow-sm"
            >
              <Users className="w-4 h-4" />
              Assign Counsellor
            </button>
          )}

          <button
            onClick={() =>
              navigate("/interventions")
            }
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition"
          >
            <Activity className="w-4 h-4" />
            Follow-up
          </button>

        </div>
      </div>

      {/* ===================================================
          CRITICAL NOTICE
      ==================================================== */}

      {caseData.risk === "Critical" && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">

          <div className="flex items-start gap-3">

            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="flex-1">

              <h2 className="font-bold text-red-800">
                Critical Risk — Human Review Required
              </h2>

              <p className="text-sm text-red-700 mt-1 leading-6">
                This prototype indicates elevated
                distress-related signals. The result is
                not a clinical diagnosis. Human review
                and appropriate support assessment are
                required.
              </p>

              <button
                onClick={() =>
                  setShowCounsellorModal(true)
                }
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
              >
                <Users className="w-4 h-4" />
                Review & Assign Counsellor
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ===================================================
          CASE INFORMATION
      ==================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="flex items-center gap-2 mb-5">

          <FileText className="w-5 h-5 text-indigo-600" />

          <h2 className="font-bold text-slate-900">
            Case Information
          </h2>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <InfoBox
            icon={
              <ShieldCheck className="w-4 h-4" />
            }
            label="Case Status"
            value="Active"
          />

          <InfoBox
            icon={
              <CalendarDays className="w-4 h-4" />
            }
            label="Registration Date"
            value={caseData.registrationDate}
          />

          <InfoBox
            icon={
              <Activity className="w-4 h-4" />
            }
            label="District"
            value={caseData.district}
          />

          <InfoBox
            icon={
              <FileText className="w-4 h-4" />
            }
            label="Category"
            value={caseData.category}
          />

        </div>

        {/* MASKED VICTIM */}

        <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <p className="text-xs text-slate-400">
              Victim Identifier
            </p>

            <p className="font-semibold text-slate-800 mt-1">
              V-XXXX-{caseData.id.replace(
                "CASE-",
                ""
              )}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Personally identifiable information is
              masked in this dashboard.
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Assigned Counsellor
            </p>

            <div className="flex items-center gap-2 mt-1">

              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                {getInitials(
                  currentCounsellor
                )}
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  {currentCounsellor}
                </p>

                <p className="text-xs text-slate-400">
                  Human support staff
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ===================================================
          DISTRESS SCORE
      ==================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

          {/* SCORE */}

          <div className="lg:w-1/3">

            <p className="text-sm font-medium text-slate-500">
              Dynamic Distress Score
            </p>

            <div className="flex items-end gap-3 mt-2">

              <span className="text-5xl font-bold text-slate-900">
                {caseData.score}
              </span>

              <span className="text-sm text-slate-400 mb-2">
                / 100
              </span>

            </div>

            <div className="mt-3">

              <span
                className={`inline-flex px-3 py-1.5 rounded-full border text-xs font-bold ${getRiskClasses(
                  caseData.risk
                )}`}
              >
                {caseData.risk.toUpperCase()}
              </span>

            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">

              <MiniStat
                label="Previous Score"
                value={`${caseData.previousScore}`}
              />

              <MiniStat
                label="Change"
                value={`${
                  scoreChange >= 0
                    ? "+"
                    : ""
                }${scoreChange}`}
                change="since last"
              />

            </div>

            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">

              <div className="flex items-center gap-2">

                {caseData.trend ===
                "Decreasing" ? (
                  <TrendingDown className="w-5 h-5 text-emerald-600" />
                ) : (
                  <TrendingUp
                    className={`w-5 h-5 ${getTrendColor(
                      caseData.trend
                    )}`}
                  />
                )}

                <div>
                  <p className="text-xs text-slate-400">
                    Trend
                  </p>

                  <p
                    className={`text-sm font-bold ${getTrendColor(
                      caseData.trend
                    )}`}
                  >
                    {caseData.trend}
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* CHART */}

          <div className="lg:w-2/3">

            <div className="flex items-center justify-between mb-3">

              <div>
                <h2 className="font-bold text-slate-900">
                  Distress Score History
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Longitudinal monitoring trend
                </p>
              </div>

              <span className="text-xs text-slate-400">
                Score 0–100
              </span>

            </div>

            <ScoreChart
              history={caseData.history}
            />

          </div>

        </div>
      </div>

      {/* ===================================================
          EXPLAINABLE AI
      ==================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* WHY HIGH RISK */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Why is this case high-risk?
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Explainable AI indicators
                </p>
              </div>

            </div>

            <div className="text-right">

              <p className="text-xs text-slate-400">
                AI Confidence
              </p>

              <p className="font-bold text-indigo-600">
                87%
              </p>

            </div>

          </div>

          <div className="mt-5">

            <ExplanationRow
              text="Stress rating increased from 3/5 to 5/5."
            />

            <ExplanationRow
              text="Fear rating increased from 2/5 to 5/5."
            />

            <ExplanationRow
              text="Recent threat-related response detected."
              type="warning"
            />

            <ExplanationRow
              text="Distress increased across 3 consecutive check-ins."
              type="warning"
            />

            <ExplanationRow
              text="Recent engagement pattern changed."
              type="warning"
            />

          </div>

          <div className="mt-4 p-3 rounded-xl bg-indigo-50 border border-indigo-100">

            <p className="text-xs text-indigo-700 leading-5">
              Model confidence is an experimental
              prototype indicator and is not a clinical
              diagnosis.
            </p>

          </div>

        </div>

        {/* MULTI SIGNAL */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center gap-2">

            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Multi-Signal Analysis
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Prototype signal contribution
              </p>
            </div>

          </div>

          <div className="space-y-5 mt-6">

            <SignalBar
              label="Self-reported responses"
              value="35%"
              percentage={35}
            />

            <SignalBar
              label="Text / language signals"
              value="20%"
              percentage={20}
            />

            <SignalBar
              label="Voice indicators"
              value="15%"
              percentage={15}
            />

            <SignalBar
              label="Behaviour / engagement"
              value="10%"
              percentage={10}
            />

            <SignalBar
              label="Longitudinal trend"
              value="20%"
              percentage={20}
            />

          </div>

          <p className="text-xs text-slate-400 mt-5 leading-5">
            A single high self-reported rating does not
            automatically classify a case as critical.
            The prototype considers multiple signals and
            changes over time.
          </p>

        </div>

      </div>

      {/* ===================================================
          PREDICTION
      ==================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="flex items-center gap-2 mb-5">

          <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Distress Escalation Prediction
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Prototype predictive indicator
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          <PredictionBox
            title="Current Score"
            value={`${caseData.score}/100`}
            description="Current dynamic distress score."
          />

          <PredictionBox
            title="Predicted 7-Day Risk"
            value={
              caseData.risk === "Critical"
                ? "Critical"
                : "High"
            }
            description="Based on recent trend and multiple monitored signals."
          />

          <PredictionBox
            title="Trend"
            value={caseData.trend}
            description="Longitudinal pattern detected across recent check-ins."
          />

        </div>

        <div className="mt-6">

          <div className="flex items-center justify-between mb-4">

            <div>
              <p className="text-sm font-semibold text-slate-700">
                Forecast
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Illustrative prototype prediction
              </p>
            </div>

            <span className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 font-semibold">
              Human validation required
            </span>

          </div>

          <ForecastChart
            currentScore={caseData.score}
          />

        </div>

      </div>

      {/* ===================================================
          CHECK INS
      ==================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="flex items-center justify-between mb-5">

          <div className="flex items-center gap-2">

            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Well-being Check-ins
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Recent victim responses
              </p>
            </div>

          </div>

          <span className="text-xs text-slate-400">
            Last check-in:{" "}
            {caseData.lastCheckIn}
          </span>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <CheckIn
            number={1}
            date="20 Aug 2026"
            stress={2}
            fear={1}
            anxiety={2}
            status="Completed"
          />

          <CheckIn
            number={2}
            date="25 Aug 2026"
            stress={3}
            fear={2}
            anxiety={3}
            status="Completed"
          />

          <CheckIn
            number={3}
            date="03 Sep 2026"
            stress={5}
            fear={5}
            anxiety={4}
            status="Completed"
          />

        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">

          <p className="text-xs text-slate-500 leading-5">
            <span className="font-semibold text-slate-700">
              Missed check-in logic:
            </span>{" "}
            No response is not treated as high stress.
            Repeated missed check-ins may instead indicate
            reduced engagement and can generate a human
            follow-up recommendation.
          </p>

        </div>

      </div>

      {/* ===================================================
          INTERVENTION TIMELINE
      ==================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* TIMELINE */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center gap-2 mb-6">

            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Clock3 className="w-5 h-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Follow-up Timeline
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Human intervention history
              </p>
            </div>

          </div>

          <TimelineItem
            date="03 Sep 2026"
            title="AI alert generated"
            description="Distress trend crossed the configured prototype monitoring threshold."
          />

          <TimelineItem
            date="03 Sep 2026"
            title="Counsellor assigned"
            description={`Assigned counsellor: ${currentCounsellor}`}
          />

          <TimelineItem
            date="04 Sep 2026"
            title="Contact attempted"
            description="Human follow-up communication initiated."
          />

          <TimelineItem
            date="04 Sep 2026"
            title="Assessment completed"
            description="Support needs reviewed by authorized staff."
          />

          <TimelineItem
            date="05 Sep 2026"
            title="Support provided"
            description="Appropriate support pathway recorded."
          />

          <TimelineItem
            date="12 Sep 2026"
            title="Next check-in scheduled"
            description="Continued well-being monitoring planned."
            completed={false}
          />

        </div>

        {/* COMMUNICATION */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center gap-2 mb-2">

            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Communication Log
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Recent monitoring interactions
              </p>
            </div>

          </div>

          <div className="mt-4">

            <CommunicationRow
              icon={
                <MessageSquare className="w-4 h-4" />
              }
              channel="SMS Check-in"
              date="03 Sep"
              status="Delivered"
              description="Well-being check-in sent successfully."
            />

            <CommunicationRow
              icon={
                <Phone className="w-4 h-4" />
              }
              channel="Phone Follow-up"
              date="04 Sep"
              status="Completed"
              description="Human follow-up call recorded."
            />

            <CommunicationRow
              icon={
                <MessageSquare className="w-4 h-4" />
              }
              channel="SMS Response"
              date="03 Sep"
              status="Received"
              description="Victim response received through approved channel."
            />

            <CommunicationRow
              icon={
                <Phone className="w-4 h-4" />
              }
              channel="Counsellor Contact"
              date="05 Sep"
              status="Completed"
              description="Support interaction recorded by counsellor."
            />

          </div>

        </div>

      </div>

      {/* ===================================================
          SAFETY / HUMAN OVERSIGHT
      ==================================================== */}

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
          </div>

          <div>

            <h2 className="font-semibold text-slate-800">
              Human-in-the-loop safeguard
            </h2>

            <p className="text-sm text-slate-500 mt-1 leading-6">
              SAMVEDNA is an early-warning and
              decision-support prototype. The distress score
              is not a clinical diagnosis. AI does not
              prescribe treatment, decide legal action, or
              automatically declare a victim in crisis.
              High and critical indicators require authorized
              human review.
            </p>

          </div>

        </div>
      </div>

      {/* ===================================================
          FOOTER
      ==================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2">

        <p className="text-xs text-slate-400">
          SAMVEDNA • Demo data for SIH prototype
          demonstration
        </p>

        <button
          onClick={() => navigate("/cases")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Back to all cases
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

      </div>

      {/* ===================================================
          COUNSELLOR MODAL
      ==================================================== */}

      {showCounsellorModal && (
        <CounsellorModal
          caseData={caseData}
          onClose={() =>
            setShowCounsellorModal(false)
          }
          onAssign={handleAssignCounsellor}
        />
      )}

    </div>
  );
}