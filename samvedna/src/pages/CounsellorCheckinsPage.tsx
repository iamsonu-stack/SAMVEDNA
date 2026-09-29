import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  MessageSquare,
  Phone,
  Smartphone,
  Radio,
  Bot,
  Search,
  CalendarDays,
  Clock,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

type Channel =
  | "SMS"
  | "IVRS"
  | "Chatbot"
  | "Mobile App"
  | "Phone Follow-up";

type CheckIn = {
  id: string;
  caseId: string;
  victimId: string;
  date: string;
  time: string;
  channel: Channel;

  stress: number;
  fear: number;
  anxiety: number;
  safetyConcern: number;

  responseStatus: "Completed" | "Missed" | "Partial";

  message: string;

  aiObservation: string;
};

const checkIns: CheckIn[] = [
  {
    id: "CHK-1025-06",
    caseId: "CASE-1025",
    victimId: "V-XXXX-1025",
    date: "24 Sep 2026",
    time: "10:32 AM",
    channel: "SMS",

    stress: 5,
    fear: 5,
    anxiety: 4,
    safetyConcern: 5,

    responseStatus: "Completed",

    message:
      "I am feeling very stressed today. I am worried about what may happen next and I do not feel safe right now.",

    aiObservation:
      "Elevated stress and safety concern reported. Recent responses show an increasing distress pattern.",
  },

  {
    id: "CHK-1025-05",
    caseId: "CASE-1025",
    victimId: "V-XXXX-1025",
    date: "23 Sep 2026",
    time: "09:45 AM",
    channel: "Chatbot",

    stress: 5,
    fear: 4,
    anxiety: 4,
    safetyConcern: 4,

    responseStatus: "Completed",

    message:
      "I am having difficulty sleeping and keep thinking about the incident.",

    aiObservation:
      "Repeated elevated stress indicators detected across consecutive check-ins.",
  },

  {
    id: "CHK-1088-05",
    caseId: "CASE-1088",
    victimId: "V-XXXX-1088",
    date: "24 Sep 2026",
    time: "08:15 AM",
    channel: "IVRS",

    stress: 4,
    fear: 5,
    anxiety: 4,
    safetyConcern: 4,

    responseStatus: "Completed",

    message:
      "I am worried because I received another threatening call.",

    aiObservation:
      "Fear and safety concern increased. Threat-related response requires human review.",
  },

  {
    id: "CHK-1088-04",
    caseId: "CASE-1088",
    victimId: "V-XXXX-1088",
    date: "22 Sep 2026",
    time: "11:20 AM",
    channel: "SMS",

    stress: 4,
    fear: 4,
    anxiety: 3,
    safetyConcern: 3,

    responseStatus: "Completed",

    message:
      "I am managing, but I am still worried about the situation.",

    aiObservation:
      "Moderately elevated distress indicators observed.",
  },

  {
    id: "CHK-1114-04",
    caseId: "CASE-1114",
    victimId: "V-XXXX-1114",
    date: "23 Sep 2026",
    time: "06:40 PM",
    channel: "Mobile App",

    stress: 4,
    fear: 4,
    anxiety: 4,
    safetyConcern: 3,

    responseStatus: "Completed",

    message:
      "I have been feeling anxious since the last hearing.",

    aiObservation:
      "Distress indicators remain elevated following a recent case-related event.",
  },

  {
    id: "CHK-1114-03",
    caseId: "CASE-1114",
    victimId: "V-XXXX-1114",
    date: "21 Sep 2026",
    time: "07:15 PM",
    channel: "SMS",

    stress: 3,
    fear: 3,
    anxiety: 3,
    safetyConcern: 2,

    responseStatus: "Completed",

    message:
      "I am feeling somewhat better today.",

    aiObservation:
      "Distress indicators were moderate during this check-in.",
  },

  {
    id: "CHK-1102-04",
    caseId: "CASE-1102",
    victimId: "V-XXXX-1102",
    date: "22 Sep 2026",
    time: "09:10 AM",
    channel: "Phone Follow-up",

    stress: 2,
    fear: 2,
    anxiety: 2,
    safetyConcern: 1,

    responseStatus: "Completed",

    message:
      "I am feeling better and have been able to continue my daily activities.",

    aiObservation:
      "Distress indicators have reduced compared with previous check-ins.",
  },

  {
    id: "CHK-1102-03",
    caseId: "CASE-1102",
    victimId: "V-XXXX-1102",
    date: "20 Sep 2026",
    time: "08:30 AM",
    channel: "SMS",

    stress: 3,
    fear: 2,
    anxiety: 3,
    safetyConcern: 2,

    responseStatus: "Completed",

    message:
      "I am slowly feeling more comfortable.",

    aiObservation:
      "Overall distress trend appears to be improving.",
  },

  {
    id: "CHK-1025-04",
    caseId: "CASE-1025",
    victimId: "V-XXXX-1025",
    date: "22 Sep 2026",
    time: "10:05 AM",
    channel: "IVRS",

    stress: 4,
    fear: 4,
    anxiety: 4,
    safetyConcern: 4,

    responseStatus: "Completed",

    message:
      "I am scared and finding it difficult to concentrate.",

    aiObservation:
      "Multiple elevated indicators detected. Continued monitoring recommended.",
  },

  {
    id: "CHK-1114-02",
    caseId: "CASE-1114",
    victimId: "V-XXXX-1114",
    date: "19 Sep 2026",
    time: "09:50 AM",
    channel: "SMS",

    stress: 3,
    fear: 2,
    anxiety: 3,
    safetyConcern: 2,

    responseStatus: "Missed",

    message:
      "No response received.",

    aiObservation:
      "No response does not indicate high distress. Follow-up may be considered if missed responses continue.",
  },
];

function channelIcon(channel: Channel) {
  switch (channel) {
    case "SMS":
      return <MessageSquare size={15} />;

    case "IVRS":
      return <Radio size={15} />;

    case "Chatbot":
      return <Bot size={15} />;

    case "Mobile App":
      return <Smartphone size={15} />;

    case "Phone Follow-up":
      return <Phone size={15} />;

    default:
      return <MessageSquare size={15} />;
  }
}

function channelClasses(channel: Channel) {
  switch (channel) {
    case "SMS":
      return "bg-blue-50 text-blue-700 border-blue-100";

    case "IVRS":
      return "bg-violet-50 text-violet-700 border-violet-100";

    case "Chatbot":
      return "bg-indigo-50 text-indigo-700 border-indigo-100";

    case "Mobile App":
      return "bg-cyan-50 text-cyan-700 border-cyan-100";

    case "Phone Follow-up":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";

    default:
      return "bg-slate-50 text-slate-700 border-slate-100";
  }
}

function statusClasses(status: CheckIn["responseStatus"]) {
  switch (status) {
    case "Completed":
      return "bg-emerald-50 text-emerald-700";

    case "Partial":
      return "bg-amber-50 text-amber-700";

    case "Missed":
      return "bg-slate-100 text-slate-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

function scoreClasses(score: number) {
  if (score >= 5) {
    return "text-red-600";
  }

  if (score >= 4) {
    return "text-orange-600";
  }

  if (score >= 3) {
    return "text-amber-600";
  }

  return "text-emerald-600";
}

export default function CounsellorCheckinsPage() {
  const [search, setSearch] = useState("");
  const [caseFilter, setCaseFilter] = useState("All Cases");
  const [channelFilter, setChannelFilter] = useState("All Channels");
  const [selectedCheckIn, setSelectedCheckIn] =
    useState<CheckIn | null>(null);

  const assignedCaseIds = [
    "CASE-1025",
    "CASE-1088",
    "CASE-1114",
    "CASE-1102",
  ];

  const filteredCheckIns = useMemo(() => {
    return checkIns.filter((item) => {
      const matchesSearch =
        item.caseId
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.victimId
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.message
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCase =
        caseFilter === "All Cases" ||
        item.caseId === caseFilter;

      const matchesChannel =
        channelFilter === "All Channels" ||
        item.channel === channelFilter;

      return (
        assignedCaseIds.includes(item.caseId) &&
        matchesSearch &&
        matchesCase &&
        matchesChannel
      );
    });
  }, [search, caseFilter, channelFilter]);

  const completedCount = checkIns.filter(
    (item) =>
      item.responseStatus === "Completed"
  ).length;

  const missedCount = checkIns.filter(
    (item) =>
      item.responseStatus === "Missed"
  ).length;

  const highConcernCount = checkIns.filter(
    (item) =>
      item.stress >= 4 ||
      item.fear >= 4 ||
      item.safetyConcern >= 4
  ).length;

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex items-start gap-4">

          <Link
            to="/counsellor-dashboard"
            className="
              w-10 h-10 rounded-xl
              border border-slate-200
              flex items-center justify-center
              text-slate-600
              hover:bg-slate-50
              transition
              flex-shrink-0
            "
          >
            <ArrowLeft size={20} />
          </Link>

          <div>

            <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
              COUNSELLOR WORKSPACE
            </p>

            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Well-being Check-ins
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Case-wise victim responses collected through approved
              communication channels.
            </p>

          </div>

        </div>

      </div>


      {/* SUMMARY */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Total Check-ins
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-2">
            {checkIns.length}
          </p>

          <p className="text-xs text-indigo-600 font-semibold mt-1">
            Assigned cases only
          </p>

        </div>


        <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Completed
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-2">
            {completedCount}
          </p>

          <p className="text-xs text-emerald-600 font-semibold mt-1">
            Responses received
          </p>

        </div>


        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Missed
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-2">
            {missedCount}
          </p>

          <p className="text-xs text-slate-500 font-semibold mt-1">
            Not treated as distress
          </p>

        </div>


        <div className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Elevated Responses
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-2">
            {highConcernCount}
          </p>

          <p className="text-xs text-orange-600 font-semibold mt-1">
            Requires review
          </p>

        </div>

      </div>


      {/* FILTER BAR */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* SEARCH */}

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search case, victim ID or message..."
              className="
                w-full
                pl-10
                pr-4
                py-3
                rounded-xl
                border
                border-slate-200
                outline-none
                text-sm
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-50
              "
            />

          </div>


          {/* CASE FILTER */}

          <div className="relative">

            <select
              value={caseFilter}
              onChange={(e) =>
                setCaseFilter(e.target.value)
              }
              className="
                appearance-none
                w-full
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
              "
            >

              <option>All Cases</option>
              <option>CASE-1025</option>
              <option>CASE-1088</option>
              <option>CASE-1114</option>
              <option>CASE-1102</option>

            </select>

            <ChevronDown
              size={16}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                pointer-events-none
              "
            />

          </div>


          {/* CHANNEL FILTER */}

          <div className="relative">

            <select
              value={channelFilter}
              onChange={(e) =>
                setChannelFilter(e.target.value)
              }
              className="
                appearance-none
                w-full
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
              "
            >

              <option>All Channels</option>
              <option>SMS</option>
              <option>IVRS</option>
              <option>Chatbot</option>
              <option>Mobile App</option>
              <option>Phone Follow-up</option>

            </select>

            <ChevronDown
              size={16}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                pointer-events-none
              "
            />

          </div>

        </div>

      </div>


      {/* CHECK-IN TABLE */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="p-5 border-b border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Case-wise Check-in History
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Review what the victim responded, how the response was
                received and the related AI observation.
              </p>

            </div>

            <div className="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-semibold">
              {filteredCheckIns.length} Records
            </div>

          </div>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[1250px]">

            <thead>

              <tr className="bg-slate-50 border-b border-slate-200">

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Case
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Date / Time
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Channel
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Well-being Response
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Safety
                </th>

                <th className="text-left px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Status
                </th>

                <th className="text-right px-5 py-4 text-xs font-bold text-slate-500 uppercase">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredCheckIns.map((item) => (

                <tr
                  key={item.id}
                  className="
                    border-b
                    border-slate-100
                    hover:bg-slate-50
                    transition
                  "
                >

                  {/* CASE */}

                  <td className="px-5 py-5">

                    <p className="font-bold text-slate-800">
                      {item.caseId}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {item.victimId}
                    </p>

                  </td>


                  {/* DATE */}

                  <td className="px-5 py-5">

                    <div className="flex items-center gap-2">

                      <CalendarDays
                        size={15}
                        className="text-slate-400"
                      />

                      <div>

                        <p className="text-sm font-medium text-slate-700">
                          {item.date}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {item.time}
                        </p>

                      </div>

                    </div>

                  </td>


                  {/* CHANNEL */}

                  <td className="px-5 py-5">

                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-1.5
                        rounded-lg
                        border
                        text-xs
                        font-semibold
                        ${channelClasses(item.channel)}
                      `}
                    >

                      {channelIcon(item.channel)}

                      {item.channel}

                    </span>

                  </td>


                  {/* RESPONSE */}

                  <td className="px-5 py-5">

                    <div className="space-y-2">

                      <div className="flex items-center gap-4 text-xs">

                        <span>
                          Stress:
                          <strong
                            className={`ml-1 ${scoreClasses(
                              item.stress
                            )}`}
                          >
                            {item.stress}/5
                          </strong>
                        </span>

                        <span>
                          Fear:
                          <strong
                            className={`ml-1 ${scoreClasses(
                              item.fear
                            )}`}
                          >
                            {item.fear}/5
                          </strong>
                        </span>

                        <span>
                          Anxiety:
                          <strong
                            className={`ml-1 ${scoreClasses(
                              item.anxiety
                            )}`}
                          >
                            {item.anxiety}/5
                          </strong>
                        </span>

                      </div>

                      <p className="text-sm text-slate-600 max-w-[420px] truncate">
                        {item.message}
                      </p>

                    </div>

                  </td>


                  {/* SAFETY */}

                  <td className="px-5 py-5">

                    <div className="flex items-center gap-2">

                      <ShieldAlert
                        size={16}
                        className={
                          item.safetyConcern >= 4
                            ? "text-red-500"
                            : "text-slate-400"
                        }
                      />

                      <span
                        className={`
                          text-sm
                          font-bold
                          ${scoreClasses(
                            item.safetyConcern
                          )}
                        `}
                      >
                        {item.safetyConcern}/5
                      </span>

                    </div>

                  </td>


                  {/* STATUS */}

                  <td className="px-5 py-5">

                    <span
                      className={`
                        inline-flex
                        px-3
                        py-1.5
                        rounded-full
                        text-xs
                        font-semibold
                        ${statusClasses(
                          item.responseStatus
                        )}
                      `}
                    >
                      {item.responseStatus}
                    </span>

                  </td>


                  {/* ACTION */}

                  <td className="px-5 py-5 text-right">

                    <button
                      onClick={() =>
                        setSelectedCheckIn(item)
                      }
                      className="
                        px-4
                        py-2
                        rounded-lg
                        bg-indigo-50
                        text-indigo-600
                        hover:bg-indigo-600
                        hover:text-white
                        text-sm
                        font-semibold
                        transition
                      "
                    >
                      View Details
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {filteredCheckIns.length === 0 && (

          <div className="p-12 text-center">

            <MessageSquare
              size={35}
              className="mx-auto text-slate-300"
            />

            <h3 className="font-semibold text-slate-700 mt-4">
              No check-ins found
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              Try changing the search or filters.
            </p>

          </div>

        )}

      </div>


      {/* IMPORTANT NOTICE */}

      <div className="flex gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-4">

        <CheckCircle2
          size={19}
          className="text-indigo-600 flex-shrink-0 mt-0.5"
        />

        <div>

          <p className="text-sm font-semibold text-indigo-700">
            Counsellor monitoring note
          </p>

          <p className="text-xs text-indigo-600 mt-1 leading-5">
            Check-in responses are decision-support signals. A missed
            response is not automatically interpreted as high distress.
            Counsellor review and human follow-up remain required.
          </p>

        </div>

      </div>


      {/* DETAIL MODAL */}

      {selectedCheckIn && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-slate-900/50
            flex
            items-center
            justify-center
            p-5
          "
          onClick={() =>
            setSelectedCheckIn(null)
          }
        >

          <div
            className="
              bg-white
              rounded-2xl
              shadow-2xl
              w-full
              max-w-3xl
              max-h-[90vh]
              overflow-y-auto
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="p-6 border-b border-slate-200 flex items-start justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                  CHECK-IN DETAILS
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedCheckIn.caseId}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {selectedCheckIn.victimId}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedCheckIn(null)
                }
                className="
                  w-9
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  flex
                  items-center
                  justify-center
                  text-slate-500
                  hover:bg-slate-50
                "
              >
                <X size={18} />
              </button>

            </div>


            {/* MODAL CONTENT */}

            <div className="p-6 space-y-6">

              {/* META */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="p-4 rounded-xl bg-slate-50">

                  <p className="text-xs text-slate-400">
                    Received
                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {selectedCheckIn.date}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {selectedCheckIn.time}
                  </p>

                </div>


                <div className="p-4 rounded-xl bg-slate-50">

                  <p className="text-xs text-slate-400">
                    Response Channel
                  </p>

                  <div className="flex items-center gap-2 mt-2">

                    {channelIcon(
                      selectedCheckIn.channel
                    )}

                    <p className="text-sm font-semibold text-slate-800">
                      {selectedCheckIn.channel}
                    </p>

                  </div>

                </div>


                <div className="p-4 rounded-xl bg-slate-50">

                  <p className="text-xs text-slate-400">
                    Response Status
                  </p>

                  <span
                    className={`
                      inline-flex
                      mt-2
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${statusClasses(
                        selectedCheckIn.responseStatus
                      )}
                    `}
                  >
                    {selectedCheckIn.responseStatus}
                  </span>

                </div>

              </div>


              {/* RATINGS */}

              <div>

                <h3 className="text-lg font-bold text-slate-900">
                  Well-being Response
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">

                  <div className="p-4 rounded-xl bg-slate-50 text-center">

                    <p className="text-xs text-slate-500">
                      Stress
                    </p>

                    <p
                      className={`text-2xl font-bold mt-1 ${scoreClasses(
                        selectedCheckIn.stress
                      )}`}
                    >
                      {selectedCheckIn.stress}/5
                    </p>

                  </div>


                  <div className="p-4 rounded-xl bg-slate-50 text-center">

                    <p className="text-xs text-slate-500">
                      Fear
                    </p>

                    <p
                      className={`text-2xl font-bold mt-1 ${scoreClasses(
                        selectedCheckIn.fear
                      )}`}
                    >
                      {selectedCheckIn.fear}/5
                    </p>

                  </div>


                  <div className="p-4 rounded-xl bg-slate-50 text-center">

                    <p className="text-xs text-slate-500">
                      Anxiety
                    </p>

                    <p
                      className={`text-2xl font-bold mt-1 ${scoreClasses(
                        selectedCheckIn.anxiety
                      )}`}
                    >
                      {selectedCheckIn.anxiety}/5
                    </p>

                  </div>


                  <div className="p-4 rounded-xl bg-slate-50 text-center">

                    <p className="text-xs text-slate-500">
                      Safety Concern
                    </p>

                    <p
                      className={`text-2xl font-bold mt-1 ${scoreClasses(
                        selectedCheckIn.safetyConcern
                      )}`}
                    >
                      {selectedCheckIn.safetyConcern}/5
                    </p>

                  </div>

                </div>

              </div>


              {/* MESSAGE */}

              <div>

                <div className="flex items-center gap-2">

                  <MessageSquare
                    size={18}
                    className="text-indigo-600"
                  />

                  <h3 className="text-lg font-bold text-slate-900">
                    Victim Response / Message
                  </h3>

                </div>

                <div className="mt-3 p-5 rounded-xl bg-slate-50 border border-slate-200">

                  <p className="text-sm text-slate-700 leading-6">
                    "{selectedCheckIn.message}"
                  </p>

                </div>

              </div>


              {/* AI OBSERVATION */}

              <div>

                <div className="flex items-center gap-2">

                  <AlertTriangle
                    size={18}
                    className="text-orange-500"
                  />

                  <h3 className="text-lg font-bold text-slate-900">
                    AI Observation
                  </h3>

                </div>

                <div className="mt-3 p-5 rounded-xl bg-orange-50 border border-orange-100">

                  <p className="text-sm text-orange-800 leading-6">
                    {selectedCheckIn.aiObservation}
                  </p>

                  <p className="text-xs text-orange-600 mt-3">
                    Prototype decision-support signal — not a clinical
                    diagnosis.
                  </p>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="flex flex-col sm:flex-row gap-3">

                <Link
                  to={`/counsellor-case/${selectedCheckIn.caseId}`}
                  className="
                    flex-1
                    text-center
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
                  Open Case
                </Link>

                <button
                  onClick={() =>
                    setSelectedCheckIn(null)
                  }
                  className="
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    text-slate-700
                    font-semibold
                    hover:bg-slate-50
                  "
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}