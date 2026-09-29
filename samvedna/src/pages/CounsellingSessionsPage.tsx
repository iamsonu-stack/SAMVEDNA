import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Phone,
  Video,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  FileText,
  X,
} from "lucide-react";

type SessionStatus = "Scheduled" | "Completed" | "Pending";

interface Session {
  id: string;
  caseId: string;
  victimId: string;
  date: string;
  time: string;
  sessionType: string;
  mode: "Phone" | "Video" | "In-person";
  status: SessionStatus;
  risk: "High" | "Critical";
  distress: number;
  previousDistress: number;
  stress: number;
  fear: number;
  anxiety: number;
  notes?: string;
}

const sessions: Session[] = [
  {
    id: "S-1001",
    caseId: "CASE-1025",
    victimId: "V-XXXX-1025",
    date: "28 Sep 2026",
    time: "10:30 AM",
    sessionType: "Initial Counselling",
    mode: "Phone",
    status: "Scheduled",
    risk: "High",
    distress: 78,
    previousDistress: 54,
    stress: 5,
    fear: 5,
    anxiety: 4,
  },
  {
    id: "S-1002",
    caseId: "CASE-1088",
    victimId: "V-XXXX-1088",
    date: "28 Sep 2026",
    time: "02:00 PM",
    sessionType: "Follow-up Counselling",
    mode: "Video",
    status: "Scheduled",
    risk: "Critical",
    distress: 84,
    previousDistress: 72,
    stress: 5,
    fear: 5,
    anxiety: 5,
  },
  {
    id: "S-1003",
    caseId: "CASE-1102",
    victimId: "V-XXXX-1102",
    date: "29 Sep 2026",
    time: "11:00 AM",
    sessionType: "Well-being Follow-up",
    mode: "Phone",
    status: "Scheduled",
    risk: "High",
    distress: 68,
    previousDistress: 55,
    stress: 4,
    fear: 4,
    anxiety: 3,
  },
  {
    id: "S-1004",
    caseId: "CASE-1014",
    victimId: "V-XXXX-1014",
    date: "24 Sep 2026",
    time: "03:00 PM",
    sessionType: "Initial Counselling",
    mode: "In-person",
    status: "Completed",
    risk: "High",
    distress: 71,
    previousDistress: 76,
    stress: 3,
    fear: 3,
    anxiety: 3,
    notes: "Initial counselling session completed.",
  },
  {
    id: "S-1005",
    caseId: "CASE-1025",
    victimId: "V-XXXX-1025",
    date: "20 Sep 2026",
    time: "11:30 AM",
    sessionType: "Follow-up",
    mode: "Phone",
    status: "Completed",
    risk: "High",
    distress: 54,
    previousDistress: 44,
    stress: 3,
    fear: 3,
    anxiety: 3,
    notes: "Follow-up completed. Next session recommended.",
  },
];

const modeIcon = (mode: Session["mode"]) => {
  if (mode === "Phone") {
    return <Phone size={15} />;
  }

  if (mode === "Video") {
    return <Video size={15} />;
  }

  return <MapPin size={15} />;
};

const riskClass = (risk: Session["risk"]) => {
  return risk === "Critical"
    ? "bg-red-50 text-red-700 border-red-200"
    : "bg-orange-50 text-orange-700 border-orange-200";
};

const statusClass = (status: SessionStatus) => {
  if (status === "Completed") {
    return "bg-green-50 text-green-700 border-green-200";
  }

  if (status === "Pending") {
    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  }

  return "bg-blue-50 text-blue-700 border-blue-200";
};

export default function CounsellingSessionsPage() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showNotes, setShowNotes] = useState(false);

  const upcomingSessions = useMemo(
    () => sessions.filter((session) => session.status === "Scheduled"),
    []
  );

  const completedSessions = useMemo(
    () => sessions.filter((session) => session.status === "Completed"),
    []
  );

  const todaySessions = useMemo(
    () =>
      sessions.filter(
        (session) =>
          session.status === "Scheduled" &&
          session.date === "28 Sep 2026"
      ),
    []
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Counselling Sessions
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and manage counselling sessions for your assigned cases.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
            <CalendarDays size={17} />
            Counsellor Schedule
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard
          title="Today's Sessions"
          value={todaySessions.length}
          icon={<CalendarDays size={20} />}
          iconBg="bg-indigo-50 text-indigo-600"
        />

        <SummaryCard
          title="Upcoming Sessions"
          value={upcomingSessions.length}
          icon={<Clock size={20} />}
          iconBg="bg-blue-50 text-blue-600"
        />

        <SummaryCard
          title="Completed Sessions"
          value={completedSessions.length}
          icon={<CheckCircle2 size={20} />}
          iconBg="bg-green-50 text-green-600"
        />

        <SummaryCard
          title="Pending"
          value={1}
          icon={<AlertTriangle size={20} />}
          iconBg="bg-yellow-50 text-yellow-600"
        />
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Upcoming Sessions
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Scheduled sessions for your assigned cases
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Date & Time
                </th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Case
                </th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Risk
                </th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Session
                </th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Mode
                </th>
                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>
                <th className="text-right px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {upcomingSessions.map((session) => (
                <tr
                  key={session.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-900">
                      {session.date}
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-sm text-slate-500">
                      <Clock size={14} />
                      {session.time}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900">
                      {session.caseId}
                    </div>

                    <div className="text-xs text-slate-500 mt-1">
                      {session.victimId}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-semibold ${riskClass(
                        session.risk
                      )}`}
                    >
                      {session.risk}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-slate-900">
                      {session.sessionType}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="inline-flex items-center gap-2 text-sm text-slate-600">
                      {modeIcon(session.mode)}
                      {session.mode}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-semibold ${statusClass(
                        session.status
                      )}`}
                    >
                      {session.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedSession(session)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                      View
                      <ChevronRight size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Past Sessions */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Past Counselling Sessions
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Previous sessions for your assigned cases
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {completedSessions.map((session) => (
            <div
              key={session.id}
              className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 hover:bg-slate-50"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <div className="font-semibold text-slate-900">
                    {session.caseId}
                  </div>

                  <div className="text-sm text-slate-500 mt-1">
                    {session.sessionType}
                  </div>

                  <div className="text-xs text-slate-400 mt-1">
                    {session.date} • {session.time}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${statusClass(
                    session.status
                  )}`}
                >
                  {session.status}
                </span>

                <button
                  onClick={() => setSelectedSession(session)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-white"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedSession.caseId}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Victim ID: {selectedSession.victimId}
                </p>
              </div>

              <button
                onClick={() => setSelectedSession(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Risk information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InfoBox
                  label="Current Distress"
                  value={`${selectedSession.distress}/100`}
                />

                <InfoBox
                  label="Previous Score"
                  value={`${selectedSession.previousDistress}/100`}
                />

                <div className="border border-slate-200 rounded-xl p-4">
                  <p className="text-xs text-slate-500">Risk Level</p>

                  <span
                    className={`inline-flex mt-2 px-2.5 py-1 rounded-full border text-xs font-semibold ${riskClass(
                      selectedSession.risk
                    )}`}
                  >
                    {selectedSession.risk}
                  </span>
                </div>
              </div>

              {/* Session information */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">
                  Session Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoBox
                    label="Date"
                    value={selectedSession.date}
                  />

                  <InfoBox
                    label="Time"
                    value={selectedSession.time}
                  />

                  <InfoBox
                    label="Session Type"
                    value={selectedSession.sessionType}
                  />

                  <InfoBox
                    label="Mode"
                    value={selectedSession.mode}
                  />
                </div>
              </div>

              {/* Check-in */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">
                  Recent Check-in
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  <CheckinScore
                    label="Stress"
                    value={selectedSession.stress}
                  />

                  <CheckinScore
                    label="Fear"
                    value={selectedSession.fear}
                  />

                  <CheckinScore
                    label="Anxiety"
                    value={selectedSession.anxiety}
                  />
                </div>
              </div>

              {/* Notes */}
              {selectedSession.notes && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <FileText size={17} />
                    Previous Session Notes
                  </div>

                  <p className="text-sm text-slate-600 mt-2">
                    {selectedSession.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              {selectedSession.status === "Scheduled" && (
                <div className="flex flex-wrap gap-3 pt-2">
                  <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
                    Start Session
                  </button>

                  <button
                    onClick={() => setShowNotes(true)}
                    className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50"
                  >
                    Add Notes
                  </button>

                  <button className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50">
                    Schedule Follow-up
                  </button>
                </div>
              )}

              {selectedSession.status === "Completed" && (
                <button
                  onClick={() => setShowNotes(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50"
                >
                  <FileText size={17} />
                  View / Add Notes
                </button>
              )}

              {showNotes && (
                <div className="border border-indigo-100 bg-indigo-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Session Notes
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Enter counselling session notes..."
                    className="w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => setShowNotes(false)}
                      className="px-3 py-2 text-sm text-slate-600"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => setShowNotes(false)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
  iconBg,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">
            {value}
          </p>
        </div>

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900 mt-1">
        {value}
      </p>
    </div>
  );
}

function CheckinScore({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 text-center">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xl font-bold text-slate-900 mt-1">
        {value}/5
      </p>
    </div>
  );
}