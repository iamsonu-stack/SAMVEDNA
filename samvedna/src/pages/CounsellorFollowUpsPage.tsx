import React from "react";

const followUps = [
  {
    id: "FU-1025",
    caseId: "CASE-1025",
    victimId: "V-XXXX-1025",
    date: "28 Sep 2026",
    time: "10:30 AM",
    type: "Well-being Follow-up",
    status: "Scheduled",
    risk: "High",
    channel: "Phone",
  },
  {
    id: "FU-1088",
    caseId: "CASE-1088",
    victimId: "V-XXXX-1088",
    date: "28 Sep 2026",
    time: "12:00 PM",
    type: "Counselling Follow-up",
    status: "Scheduled",
    risk: "Critical",
    channel: "Video Call",
  },
  {
    id: "FU-1102",
    caseId: "CASE-1102",
    victimId: "V-XXXX-1102",
    date: "29 Sep 2026",
    time: "11:00 AM",
    type: "Progress Follow-up",
    status: "Scheduled",
    risk: "Moderate",
    channel: "Phone",
  },
];

export default function CounsellorFollowUpsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Follow-ups
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage scheduled follow-ups and track previous interactions
          for your assigned cases.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Today's Follow-ups
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-2">
            2
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Upcoming
          </p>

          <p className="text-3xl font-bold text-indigo-600 mt-2">
            3
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <p className="text-3xl font-bold text-emerald-600 mt-2">
            18
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <p className="text-3xl font-bold text-orange-500 mt-2">
            4
          </p>
        </div>

      </div>

      {/* Upcoming Follow-ups */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">
            Upcoming Follow-ups
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Follow-ups scheduled for your assigned cases.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Case
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Date & Time
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Type
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Channel
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Risk
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Action
                </th>
              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {followUps.map((item) => (

                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-4">

                    <p className="font-semibold text-slate-900">
                      {item.caseId}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {item.victimId}
                    </p>

                  </td>

                  <td className="px-6 py-4">

                    <p className="text-sm font-medium text-slate-900">
                      {item.date}
                    </p>

                    <p className="text-xs text-slate-500">
                      {item.time}
                    </p>

                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700">
                    {item.type}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700">
                    {item.channel}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          item.risk === "Critical"
                            ? "bg-red-100 text-red-700"
                            : item.risk === "High"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {item.risk}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                      {item.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <button
                      className="
                        px-4
                        py-2
                        rounded-lg
                        bg-indigo-600
                        text-white
                        text-sm
                        font-medium
                        hover:bg-indigo-700
                        transition
                      "
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Follow-up History */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">

        <h2 className="text-lg font-bold text-slate-900">
          Recent Follow-up History
        </h2>

        <div className="mt-5 space-y-4">

          <div className="flex gap-4 p-4 rounded-xl bg-slate-50">

            <div className="w-2 rounded-full bg-emerald-500" />

            <div>

              <p className="font-semibold text-slate-900">
                CASE-1102 follow-up completed
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Victim reported reduced distress compared with
                previous check-in.
              </p>

              <p className="text-xs text-slate-400 mt-2">
                27 Sep 2026 • 4:30 PM
              </p>

            </div>

          </div>

          <div className="flex gap-4 p-4 rounded-xl bg-slate-50">

            <div className="w-2 rounded-full bg-orange-500" />

            <div>

              <p className="font-semibold text-slate-900">
                CASE-1088 follow-up required
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Additional human follow-up recommended after
                increased distress indicators.
              </p>

              <p className="text-xs text-slate-400 mt-2">
                27 Sep 2026 • 2:15 PM
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}