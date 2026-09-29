import React from "react";
import {
  ArrowLeft,
  AlertTriangle,
  CalendarDays,
  MapPin,
  UserRound,
  Activity,
  MessageSquare,
  Clock,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const caseData: Record<
  string,
  {
    id: string;
    category: string;
    district: string;
    risk: string;
    score: number;
    previousScore: number;
    assignedOn: string;
    lastCheckIn: string;
    status: string;
    trend: number[];
    counsellor: string;
  }
> = {
  "CASE-1025": {
    id: "CASE-1025",
    category: "Caste-based Violence",
    district: "Indore",
    risk: "Critical",
    score: 84,
    previousScore: 72,
    assignedOn: "24 Sep 2026",
    lastCheckIn: "2 hours ago",
    status: "Needs Attention",
    trend: [25, 31, 44, 59, 78, 84],
    counsellor: "Current Counsellor",
  },

  "CASE-1088": {
    id: "CASE-1088",
    category: "Threat / Intimidation",
    district: "Indore",
    risk: "High",
    score: 78,
    previousScore: 61,
    assignedOn: "23 Sep 2026",
    lastCheckIn: "5 hours ago",
    status: "Follow-up Pending",
    trend: [42, 49, 61, 72, 78],
    counsellor: "Current Counsellor",
  },

  "CASE-1114": {
    id: "CASE-1114",
    category: "Atrocity-related Case",
    district: "Indore",
    risk: "High",
    score: 72,
    previousScore: 65,
    assignedOn: "21 Sep 2026",
    lastCheckIn: "Yesterday",
    status: "Follow-up Pending",
    trend: [48, 53, 59, 65, 72],
    counsellor: "Current Counsellor",
  },

  "CASE-1102": {
    id: "CASE-1102",
    category: "Grievous Hurt",
    district: "Indore",
    risk: "Moderate",
    score: 43,
    previousScore: 51,
    assignedOn: "18 Sep 2026",
    lastCheckIn: "2 days ago",
    status: "Stable",
    trend: [68, 62, 55, 43],
    counsellor: "Current Counsellor",
  },
};

export default function CounsellorCaseDetailPage() {
const { caseId } = useParams();

const decodedCaseId = caseId
  ? decodeURIComponent(caseId)
  : undefined;

  const selectedCase =
  caseData[decodedCaseId || "CASE-1025"];

  if (!selectedCase) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8">

        <h1 className="text-2xl font-bold text-slate-900">
          Case Not Found
        </h1>

        <p className="text-slate-500 mt-2">
          The requested case is not available in your assigned cases.
        </p>

        <Link
          to="/my-assigned-cases"
          className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          <ArrowLeft size={17} />
          Back to Assigned Cases
        </Link>

      </div>
    );
  }

  const scoreChange =
    selectedCase.score - selectedCase.previousScore;

  const isCritical =
    selectedCase.risk === "Critical";

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-start gap-4">

            <Link
              to="/my-assigned-cases"
              className="
                w-10
                h-10
                rounded-xl
                border
                border-slate-200
                flex
                items-center
                justify-center
                text-slate-600
                hover:bg-slate-50
              "
            >
              <ArrowLeft size={20} />
            </Link>

            <div>

              <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                COUNSELLOR CASE VIEW
              </p>

              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                {selectedCase.id}
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Assigned case details and well-being monitoring.
              </p>

            </div>

          </div>

          <span
            className={`
              px-4
              py-2
              rounded-full
              text-sm
              font-bold
              ${
                isCritical
                  ? "bg-red-50 text-red-600"
                  : "bg-orange-50 text-orange-600"
              }
            `}
          >
            {selectedCase.risk}
          </span>

        </div>

      </div>


      {/* CASE INFORMATION */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* BASIC DETAILS */}

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-2 mb-5">

            <UserRound
              size={19}
              className="text-indigo-600"
            />

            <h2 className="text-lg font-bold text-slate-900">
              Case Information
            </h2>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>

              <p className="text-xs text-slate-400 uppercase font-semibold">
                Victim ID
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                V-XXXX-{selectedCase.id.replace("CASE-", "")}
              </p>

            </div>

            <div>

              <p className="text-xs text-slate-400 uppercase font-semibold">
                Case Category
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {selectedCase.category}
              </p>

            </div>

            <div>

              <p className="text-xs text-slate-400 uppercase font-semibold">
                District
              </p>

              <div className="flex items-center gap-1.5 mt-1">

                <MapPin size={15} className="text-slate-400" />

                <p className="text-sm font-semibold text-slate-800">
                  {selectedCase.district}
                </p>

              </div>

            </div>

            <div>

              <p className="text-xs text-slate-400 uppercase font-semibold">
                Assigned On
              </p>

              <div className="flex items-center gap-1.5 mt-1">

                <CalendarDays
                  size={15}
                  className="text-slate-400"
                />

                <p className="text-sm font-semibold text-slate-800">
                  {selectedCase.assignedOn}
                </p>

              </div>

            </div>

            <div>

              <p className="text-xs text-slate-400 uppercase font-semibold">
                Last Check-in
              </p>

              <div className="flex items-center gap-1.5 mt-1">

                <Clock
                  size={15}
                  className="text-slate-400"
                />

                <p className="text-sm font-semibold text-slate-800">
                  {selectedCase.lastCheckIn}
                </p>

              </div>

            </div>

            <div>

              <p className="text-xs text-slate-400 uppercase font-semibold">
                Current Status
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {selectedCase.status}
              </p>

            </div>

          </div>

        </div>


        {/* DISTRESS SCORE */}

        <div
          className={`
            rounded-2xl
            border
            p-6
            ${
              isCritical
                ? "bg-red-50 border-red-100"
                : "bg-orange-50 border-orange-100"
            }
          `}
        >

          <div className="flex items-center gap-2">

            <Activity
              size={19}
              className={
                isCritical
                  ? "text-red-600"
                  : "text-orange-600"
              }
            />

            <p className="text-sm font-bold text-slate-700">
              Dynamic Distress Score
            </p>

          </div>

          <div className="mt-5">

            <p
              className={`
                text-5xl
                font-bold
                ${
                  isCritical
                    ? "text-red-600"
                    : "text-orange-600"
                }
              `}
            >
              {selectedCase.score}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              / 100
            </p>

          </div>

          <div className="mt-5 pt-4 border-t border-black/5">

            <p className="text-xs text-slate-500">
              Previous score
            </p>

            <p className="text-lg font-bold text-slate-800">
              {selectedCase.previousScore}
            </p>

            <p
              className={`
                text-sm
                font-semibold
                mt-2
                ${
                  scoreChange > 0
                    ? "text-red-600"
                    : "text-emerald-600"
                }
              `}
            >
              {scoreChange > 0 ? "+" : ""}
              {scoreChange} from previous score
            </p>

          </div>

        </div>

      </div>


      {/* TREND */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex items-center gap-2">

          <Activity
            size={19}
            className="text-indigo-600"
          />

          <h2 className="text-lg font-bold text-slate-900">
            Distress Trend
          </h2>

        </div>

        <p className="text-sm text-slate-500 mt-1">
          Longitudinal distress score history for this assigned case.
        </p>


        <div className="mt-7 flex items-end gap-4 h-56">

          {selectedCase.trend.map((value, index) => {

            const height = Math.max(
              20,
              (value / 100) * 190
            );

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end h-full"
              >

                <span className="text-xs font-bold text-slate-600 mb-2">
                  {value}
                </span>

                <div
                  className={`
                    w-full
                    max-w-14
                    rounded-t-xl
                    ${
                      value >= 81
                        ? "bg-red-500"
                        : value >= 61
                        ? "bg-orange-400"
                        : value >= 31
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                    }
                  `}
                  style={{
                    height: `${height}px`,
                  }}
                />

                <span className="text-[11px] text-slate-400 mt-2">
                  W{index + 1}
                </span>

              </div>
            );

          })}

        </div>

      </div>


      {/* WHY HIGH RISK */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-2 mb-5">

            <ShieldAlert
              size={19}
              className="text-orange-500"
            />

            <h2 className="text-lg font-bold text-slate-900">
              Why this case requires attention
            </h2>

          </div>

          <div className="space-y-3">

            <div className="p-4 rounded-xl bg-red-50 border border-red-100">

              <p className="text-sm font-semibold text-red-700">
                Distress score increased
              </p>

              <p className="text-xs text-red-600 mt-1">
                Recent monitoring indicates a rising distress pattern.
              </p>

            </div>

            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">

              <p className="text-sm font-semibold text-orange-700">
                Repeated elevated responses
              </p>

              <p className="text-xs text-orange-600 mt-1">
                Multiple check-ins indicate increased stress/fear indicators.
              </p>

            </div>

            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">

              <p className="text-sm font-semibold text-indigo-700">
                Human review required
              </p>

              <p className="text-xs text-indigo-600 mt-1">
                AI output is decision-support only and does not constitute a diagnosis.
              </p>

            </div>

          </div>

        </div>


        {/* RECENT CHECK-IN */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-2 mb-5">

            <MessageSquare
              size={19}
              className="text-indigo-600"
            />

            <h2 className="text-lg font-bold text-slate-900">
              Recent Check-in
            </h2>

          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <span className="text-sm text-slate-500">
                Stress
              </span>

              <span className="font-bold text-slate-800">
                5 / 5
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-sm text-slate-500">
                Fear
              </span>

              <span className="font-bold text-slate-800">
                5 / 5
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-sm text-slate-500">
                Anxiety
              </span>

              <span className="font-bold text-slate-800">
                4 / 5
              </span>

            </div>

            <div className="pt-4 border-t border-slate-100">

              <p className="text-xs text-slate-400">
                Last response
              </p>

              <p className="text-sm font-semibold text-slate-700 mt-1">
                {selectedCase.lastCheckIn}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* ACTIONS */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex flex-col sm:flex-row gap-3">

          <button
            className="
              flex-1
              px-5
              py-3
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              font-semibold
              transition
            "
          >
            Record Counselling Follow-up
          </button>

          <button
            className="
              flex-1
              px-5
              py-3
              rounded-xl
              border
              border-slate-200
              hover:bg-slate-50
              text-slate-700
              font-semibold
              transition
            "
          >
            Schedule Follow-up
          </button>

        </div>

      </div>


      {/* NOTICE */}

      <div className="flex gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">

        <CheckCircle2
          size={19}
          className="text-indigo-500 flex-shrink-0 mt-0.5"
        />

        <p className="text-xs text-slate-500 leading-5">
          This view is limited to the counsellor's assigned case.
          Personal identifiers remain masked. AI-generated distress
          indicators are experimental decision-support signals and are
          not a clinical diagnosis or automatic legal decision.
        </p>

      </div>

    </div>
  );
}