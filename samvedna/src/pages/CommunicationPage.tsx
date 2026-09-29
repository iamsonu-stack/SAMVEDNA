import React from "react";
import {
  Search,
  Phone,
  MessageSquare,
  Radio,
  Clock,
  AlertTriangle,
  CheckCircle2,
  CalendarClock,
  Send,
  X,
  UserRound,
  ShieldAlert,
  Activity,
  ChevronRight,
  History,
} from "lucide-react";

type RiskLevel = "Critical" | "High";

type CaseData = {
  id: string;
  category: string;
  district: string;
  score: number;
  previousScore: number;
  risk: RiskLevel;
  trend: string;
  lastCheckIn: string;
  lastContact: string;
  nextContact: string;
  preferredChannel: "SMS" | "IVRS" | "Phone";
  phone: string;
  counsellor: string;
  communicationFrequency: number;
};

type CommunicationLog = {
  id: number;
  caseId: string;
  channel: string;
  action: string;
  date: string;
  status: string;
};

const initialCases: CaseData[] = [
  {
    id: "CASE-1025",
    category: "Caste-based Violence",
    district: "Indore",
    score: 78,
    previousScore: 54,
    risk: "High",
    trend: "Rapid Increase",
    lastCheckIn: "2 hours ago",
    lastContact: "Today, 10:30 AM",
    nextContact: "Tomorrow, 10:30 AM",
    preferredChannel: "SMS",
    phone: "+91 98XXXX1025",
    counsellor: "Anita Sharma",
    communicationFrequency: 1,
  },
  {
    id: "CASE-1088",
    category: "Threat / Intimidation",
    district: "Indore",
    score: 84,
    previousScore: 72,
    risk: "Critical",
    trend: "Increasing",
    lastCheckIn: "5 hours ago",
    lastContact: "Yesterday, 4:20 PM",
    nextContact: "Today, 4:20 PM",
    preferredChannel: "IVRS",
    phone: "+91 97XXXX1088",
    counsellor: "Rahul Verma",
    communicationFrequency: 1,
  },
  {
    id: "CASE-1114",
    category: "Atrocity-related Case",
    district: "Indore",
    score: 82,
    previousScore: 67,
    risk: "Critical",
    trend: "Increasing",
    lastCheckIn: "1 day ago",
    lastContact: "2 days ago",
    nextContact: "Today",
    preferredChannel: "Phone",
    phone: "+91 96XXXX1114",
    counsellor: "Priya Singh",
    communicationFrequency: 1,
  },
  {
    id: "CASE-1142",
    category: "Threat / Intimidation",
    district: "Indore",
    score: 73,
    previousScore: 58,
    risk: "High",
    trend: "Increasing",
    lastCheckIn: "8 hours ago",
    lastContact: "Yesterday, 11:15 AM",
    nextContact: "Tomorrow, 11:15 AM",
    preferredChannel: "SMS",
    phone: "+91 95XXXX1142",
    counsellor: "Neha Patel",
    communicationFrequency: 2,
  },
  {
    id: "CASE-1190",
    category: "Grievous Hurt",
    district: "Indore",
    score: 76,
    previousScore: 60,
    risk: "High",
    trend: "Increasing",
    lastCheckIn: "12 hours ago",
    lastContact: "Yesterday, 2:00 PM",
    nextContact: "Tomorrow, 2:00 PM",
    preferredChannel: "IVRS",
    phone: "+91 94XXXX1190",
    counsellor: "Amit Joshi",
    communicationFrequency: 3,
  },
  {
    id: "CASE-1204",
    category: "Threat / Intimidation",
    district: "Indore",
    score: 88,
    previousScore: 74,
    risk: "Critical",
    trend: "Rapid Increase",
    lastCheckIn: "3 hours ago",
    lastContact: "Today, 8:30 AM",
    nextContact: "Today, 8:30 PM",
    preferredChannel: "Phone",
    phone: "+91 93XXXX1204",
    counsellor: "Kavita Sharma",
    communicationFrequency: 1,
  },
];

const initialLogs: CommunicationLog[] = [
  {
    id: 1,
    caseId: "CASE-1088",
    channel: "IVRS",
    action: "Well-being check initiated",
    date: "Today, 09:15 AM",
    status: "Completed",
  },
  {
    id: 2,
    caseId: "CASE-1025",
    channel: "SMS",
    action: "Check-in reminder sent",
    date: "Today, 10:30 AM",
    status: "Delivered",
  },
  {
    id: 3,
    caseId: "CASE-1204",
    channel: "Phone",
    action: "Human follow-up attempted",
    date: "Today, 08:30 AM",
    status: "Connected",
  },
];

export default function CommunicationPage() {
  const [cases, setCases] =
    React.useState<CaseData[]>(initialCases);

  const [logs, setLogs] =
    React.useState<CommunicationLog[]>(initialLogs);

  const [search, setSearch] =
    React.useState("");

  const [selectedCase, setSelectedCase] =
    React.useState<CaseData | null>(null);

  const [activeChannel, setActiveChannel] =
    React.useState<"SMS" | "IVRS" | "Phone" | null>(null);

  const [message, setMessage] =
    React.useState(
      "Your SAMVEDNA well-being check is ready. On a scale of 1–5, how stressed do you feel today?"
    );

  const [frequency, setFrequency] =
    React.useState<number>(1);

  const [customDays, setCustomDays] =
    React.useState<number>(1);

  const [showSchedule, setShowSchedule] =
    React.useState(false);

  const [successMessage, setSuccessMessage] =
    React.useState("");

  const [showHistory, setShowHistory] =
    React.useState(false);

  const [filterRisk, setFilterRisk] =
    React.useState<"All" | RiskLevel>("All");

  const filteredCases = cases.filter((item) => {
    const matchesSearch =
      item.id
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.category
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.district
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRisk =
      filterRisk === "All" ||
      item.risk === filterRisk;

    return matchesSearch && matchesRisk;
  });

  const criticalCount = cases.filter(
    (item) => item.risk === "Critical"
  ).length;

  const highCount = cases.filter(
    (item) => item.risk === "High"
  ).length;

  const handleOpenCase = (caseItem: CaseData) => {
    setSelectedCase(caseItem);
    setFrequency(caseItem.communicationFrequency);
    setActiveChannel(null);
    setSuccessMessage("");
  };

  const handleCommunication = (
    channel: "SMS" | "IVRS" | "Phone"
  ) => {
    if (!selectedCase) return;

    setActiveChannel(channel);

    const action =
      channel === "SMS"
        ? "Well-being SMS sent"
        : channel === "IVRS"
        ? "IVRS check initiated"
        : "Human follow-up call initiated";

    const newLog: CommunicationLog = {
      id: Date.now(),
      caseId: selectedCase.id,
      channel,
      action,
      date: "Just now",
      status:
        channel === "Phone"
          ? "Call started"
          : channel === "SMS"
          ? "Delivered"
          : "Initiated",
    };

    setLogs((prev) => [newLog, ...prev]);

    setCases((prev) =>
      prev.map((item) =>
        item.id === selectedCase.id
          ? {
              ...item,
              lastContact: "Just now",
              nextContact:
                frequency === 1
                  ? "Tomorrow"
                  : `${frequency} days from now`,
            }
          : item
      )
    );

    setSuccessMessage(
      channel === "SMS"
        ? "Well-being SMS sent successfully."
        : channel === "IVRS"
        ? "IVRS check-in has been initiated."
        : "Human follow-up call has been initiated."
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3500);
  };

  const handleSchedule = () => {
    if (!selectedCase) return;

    const selectedDays =
      frequency === 0 ? customDays : frequency;

    setCases((prev) =>
      prev.map((item) =>
        item.id === selectedCase.id
          ? {
              ...item,
              communicationFrequency: selectedDays,
              nextContact:
                selectedDays === 1
                  ? "Tomorrow"
                  : `In ${selectedDays} days`,
            }
          : item
      )
    );

    setSelectedCase((prev) =>
      prev
        ? {
            ...prev,
            communicationFrequency: selectedDays,
            nextContact:
              selectedDays === 1
                ? "Tomorrow"
                : `In ${selectedDays} days`,
          }
        : prev
    );

    setShowSchedule(false);

    setSuccessMessage(
      `SAMVEDNA communication scheduled every ${selectedDays} day${
        selectedDays > 1 ? "s" : ""
      }.`
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3500);
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <MessageSquare size={19} />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Communication Monitor
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Victim Communication
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Connect with high-risk cases through SMS, IVRS and human phone follow-up.
            </p>
          </div>

          <div className="flex gap-3">

            <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100">
              <p className="text-xs text-red-500">
                Critical Cases
              </p>

              <p className="text-xl font-bold text-red-700">
                {criticalCount}
              </p>
            </div>

            <div className="px-4 py-3 rounded-xl bg-orange-50 border border-orange-100">
              <p className="text-xs text-orange-500">
                High Risk
              </p>

              <p className="text-xl font-bold text-orange-700">
                {highCount}
              </p>
            </div>

          </div>

        </div>
      </div>


      {/* =====================================================
          INFO BANNER
      ====================================================== */}

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex gap-3">

        <Activity
          size={20}
          className="text-indigo-600 shrink-0 mt-0.5"
        />

        <div>
          <p className="text-sm font-semibold text-indigo-900">
            Low-Burden Monitoring
          </p>

          <p className="text-xs text-indigo-700 mt-1 leading-5">
            SAMVEDNA can automatically schedule periodic well-being
            check-ins. Communication frequency is configurable by
            the authorized officer.
          </p>
        </div>

      </div>


      {/* =====================================================
          SEARCH + FILTER
      ====================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">

        <div className="flex flex-col lg:flex-row gap-3">

          <div className="relative flex-1">

            <Search
              size={18}
              className="
                absolute
                left-4
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
              placeholder="Search Case ID, district or case category..."
              className="
                w-full
                pl-11
                pr-4
                py-3
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                outline-none
                focus:bg-white
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-50
                text-sm
              "
            />

          </div>

          <div className="flex gap-2">

            {(["All", "Critical", "High"] as const).map(
              (risk) => (
                <button
                  key={risk}
                  onClick={() =>
                    setFilterRisk(risk)
                  }
                  className={`
                    px-4
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    border
                    transition
                    ${
                      filterRisk === risk
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }
                  `}
                >
                  {risk}
                </button>
              )
            )}

          </div>

        </div>
      </div>


      {/* =====================================================
          CASE LIST
      ====================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-bold text-slate-900">
                Cases Requiring Communication
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                High and critical cases requiring well-being follow-up
              </p>
            </div>

            <span className="text-xs font-semibold text-slate-500">
              {filteredCases.length} cases
            </span>

          </div>

        </div>


        <div className="divide-y divide-slate-100">

          {filteredCases.length === 0 ? (

            <div className="p-12 text-center">

              <Search
                size={32}
                className="mx-auto text-slate-300"
              />

              <p className="font-semibold text-slate-600 mt-3">
                No cases found
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Try another Case ID or district.
              </p>

            </div>

          ) : (

            filteredCases.map((item) => (

              <div
                key={item.id}
                className="
                  p-5
                  hover:bg-slate-50
                  transition
                "
              >

                <div className="flex flex-col xl:flex-row xl:items-center gap-5">

                  {/* CASE */}

                  <div className="flex items-start gap-4 flex-1 min-w-0">

                    <div
                      className={`
                        w-11
                        h-11
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        shrink-0
                        ${
                          item.risk === "Critical"
                            ? "bg-red-50 text-red-600"
                            : "bg-orange-50 text-orange-600"
                        }
                      `}
                    >
                      <ShieldAlert size={21} />
                    </div>

                    <div className="min-w-0">

                      <div className="flex items-center gap-2 flex-wrap">

                        <p className="font-bold text-slate-900">
                          {item.id}
                        </p>

                        <span
                          className={`
                            px-2
                            py-1
                            rounded-full
                            text-[10px]
                            font-bold
                            ${
                              item.risk === "Critical"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }
                          `}
                        >
                          {item.risk}
                        </span>

                      </div>

                      <p className="text-sm text-slate-600 mt-1">
                        {item.category}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {item.district} • Counsellor:{" "}
                        {item.counsellor}
                      </p>

                    </div>

                  </div>


                  {/* SCORE */}

                  <div className="flex items-center gap-8">

                    <div>
                      <p className="text-[11px] text-slate-400">
                        Distress Score
                      </p>

                      <div className="flex items-center gap-2 mt-1">

                        <span
                          className={`
                            text-xl
                            font-bold
                            ${
                              item.risk === "Critical"
                                ? "text-red-600"
                                : "text-orange-600"
                            }
                          `}
                        >
                          {item.score}
                        </span>

                        <span className="text-xs text-slate-400">
                          /100
                        </span>

                      </div>

                    </div>


                    <div className="hidden sm:block">

                      <p className="text-[11px] text-slate-400">
                        Last Check-in
                      </p>

                      <p className="text-sm font-semibold text-slate-700 mt-1">
                        {item.lastCheckIn}
                      </p>

                    </div>


                    <div className="hidden md:block">

                      <p className="text-[11px] text-slate-400">
                        Next Communication
                      </p>

                      <p className="text-sm font-semibold text-slate-700 mt-1">
                        {item.nextContact}
                      </p>

                    </div>

                  </div>


                  {/* ACTION */}

                  <button
                    onClick={() =>
                      handleOpenCase(item)
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
                      flex
                      items-center
                      justify-center
                      gap-2
                      transition
                    "
                  >
                    Connect
                    <ChevronRight size={16} />
                  </button>

                </div>

              </div>

            ))
          )}

        </div>

      </div>


      {/* =====================================================
          COMMUNICATION HISTORY
      ====================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <button
          onClick={() =>
            setShowHistory((prev) => !prev)
          }
          className="
            w-full
            p-5
            flex
            items-center
            justify-between
            text-left
          "
        >

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <History
                size={19}
                className="text-slate-600"
              />
            </div>

            <div>

              <p className="font-bold text-slate-900">
                Recent Communication History
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Recent SMS, IVRS and phone activities
              </p>

            </div>

          </div>

          <ChevronRight
            size={18}
            className={`
              text-slate-400
              transition-transform
              ${showHistory ? "rotate-90" : ""}
            `}
          />

        </button>


        {showHistory && (

          <div className="border-t border-slate-100 divide-y divide-slate-100">

            {logs.map((log) => (

              <div
                key={log.id}
                className="px-5 py-4 flex items-center justify-between gap-4"
              >

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">

                    {log.channel === "SMS" ? (
                      <MessageSquare size={17} />
                    ) : log.channel === "IVRS" ? (
                      <Radio size={17} />
                    ) : (
                      <Phone size={17} />
                    )}

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-slate-800">
                      {log.caseId}
                    </p>

                    <p className="text-xs text-slate-500">
                      {log.action} • {log.date}
                    </p>

                  </div>

                </div>

                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 size={14} />
                  {log.status}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* =====================================================
          CASE COMMUNICATION MODAL
      ====================================================== */}

      {selectedCase && (

        <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">

          <div
            className="
              w-full
              max-w-3xl
              max-h-[92vh]
              overflow-y-auto
              bg-white
              rounded-2xl
              shadow-2xl
            "
          >

            {/* MODAL HEADER */}

            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between z-10">

              <div>

                <div className="flex items-center gap-2">

                  <ShieldAlert
                    size={19}
                    className={
                      selectedCase.risk === "Critical"
                        ? "text-red-600"
                        : "text-orange-600"
                    }
                  />

                  <h2 className="text-lg font-bold text-slate-900">
                    {selectedCase.id}
                  </h2>

                  <span
                    className={`
                      px-2
                      py-1
                      rounded-full
                      text-[10px]
                      font-bold
                      ${
                        selectedCase.risk ===
                        "Critical"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }
                    `}
                  >
                    {selectedCase.risk}
                  </span>

                </div>

                <p className="text-xs text-slate-500 mt-1">
                  {selectedCase.category} •{" "}
                  {selectedCase.district}
                </p>

              </div>


              <button
                onClick={() =>
                  setSelectedCase(null)
                }
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


            <div className="p-6 space-y-6">

              {/* CRITICAL WARNING */}

              {selectedCase.risk === "Critical" && (

                <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex gap-3">

                  <AlertTriangle
                    size={20}
                    className="text-red-600 shrink-0"
                  />

                  <div>

                    <p className="text-sm font-bold text-red-800">
                      Critical distress indicator
                    </p>

                    <p className="text-xs text-red-700 mt-1 leading-5">
                      Human review is required. Communication
                      should be handled sensitively and according
                      to the authorized support protocol.
                    </p>

                  </div>

                </div>

              )}


              {/* CASE SUMMARY */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">

                  <p className="text-[11px] text-slate-400">
                    Distress Score
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {selectedCase.score}
                  </p>

                </div>


                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">

                  <p className="text-[11px] text-slate-400">
                    Previous
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {selectedCase.previousScore}
                  </p>

                </div>


                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">

                  <p className="text-[11px] text-slate-400">
                    Last Contact
                  </p>

                  <p className="text-sm font-bold text-slate-800 mt-2">
                    {selectedCase.lastContact}
                  </p>

                </div>


                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">

                  <p className="text-[11px] text-slate-400">
                    Next Contact
                  </p>

                  <p className="text-sm font-bold text-indigo-700 mt-2">
                    {selectedCase.nextContact}
                  </p>

                </div>

              </div>


              {/* VICTIM CONTACT */}

              <div>

                <h3 className="font-bold text-slate-900 mb-3">
                  Connect with Victim
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                  {/* SMS */}

                  <button
                    onClick={() =>
                      handleCommunication("SMS")
                    }
                    className="
                      p-4
                      rounded-xl
                      border
                      border-indigo-200
                      bg-indigo-50
                      hover:bg-indigo-100
                      text-left
                      transition
                    "
                  >

                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3">

                      <MessageSquare size={19} />

                    </div>

                    <p className="font-bold text-indigo-900">
                      Send SMS
                    </p>

                    <p className="text-xs text-indigo-700 mt-1">
                      Send well-being check
                    </p>

                  </button>


                  {/* IVRS */}

                  <button
                    onClick={() =>
                      handleCommunication("IVRS")
                    }
                    className="
                      p-4
                      rounded-xl
                      border
                      border-violet-200
                      bg-violet-50
                      hover:bg-violet-100
                      text-left
                      transition
                    "
                  >

                    <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center mb-3">

                      <Radio size={19} />

                    </div>

                    <p className="font-bold text-violet-900">
                      Start IVRS
                    </p>

                    <p className="text-xs text-violet-700 mt-1">
                      Automated voice check
                    </p>

                  </button>


                  {/* PHONE */}

                  <button
                    onClick={() =>
                      handleCommunication("Phone")
                    }
                    className="
                      p-4
                      rounded-xl
                      border
                      border-emerald-200
                      bg-emerald-50
                      hover:bg-emerald-100
                      text-left
                      transition
                    "
                  >

                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3">

                      <Phone size={19} />

                    </div>

                    <p className="font-bold text-emerald-900">
                      Call
                    </p>

                    <p className="text-xs text-emerald-700 mt-1">
                      Human follow-up
                    </p>

                  </button>

                </div>

              </div>


              {/* SMS MESSAGE */}

              {activeChannel === "SMS" && (

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">

                  <div className="flex items-center justify-between mb-3">

                    <div className="flex items-center gap-2">

                      <MessageSquare
                        size={17}
                        className="text-indigo-600"
                      />

                      <p className="font-semibold text-slate-800">
                        SMS Message
                      </p>

                    </div>

                    <span className="text-xs text-emerald-600 font-semibold">
                      Ready to send
                    </span>

                  </div>

                  <textarea
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    rows={4}
                    className="
                      w-full
                      p-3
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      resize-none
                      outline-none
                      focus:border-indigo-500
                    "
                  />

                  <button
                    onClick={() =>
                      handleCommunication("SMS")
                    }
                    className="
                      mt-3
                      px-4
                      py-2.5
                      rounded-xl
                      bg-indigo-600
                      hover:bg-indigo-700
                      text-white
                      text-sm
                      font-semibold
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Send size={16} />

                    Send Well-being Check

                  </button>

                </div>

              )}


              {/* SCHEDULE */}

              <div className="border border-slate-200 rounded-2xl overflow-hidden">

                <div className="p-5 bg-slate-50">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">

                        <CalendarClock size={19} />

                      </div>

                      <div>

                        <p className="font-bold text-slate-900">
                          Monitoring Schedule
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          Next automated communication:
                          {" "}
                          <strong>
                            {selectedCase.nextContact}
                          </strong>
                        </p>

                      </div>

                    </div>


                    <button
                      onClick={() =>
                        setShowSchedule(
                          (prev) => !prev
                        )
                      }
                      className="
                        px-4
                        py-2.5
                        rounded-xl
                        bg-white
                        border
                        border-slate-200
                        hover:bg-slate-100
                        text-sm
                        font-semibold
                        text-slate-700
                      "
                    >
                      Change Schedule
                    </button>

                  </div>

                </div>


                {showSchedule && (

                  <div className="p-5 border-t border-slate-200">

                    <p className="text-sm font-semibold text-slate-700 mb-3">
                      Send well-being check every
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">

                      {[1, 2, 3, 7, 14].map(
                        (days) => (

                          <button
                            key={days}
                            onClick={() =>
                              setFrequency(days)
                            }
                            className={`
                              py-3
                              rounded-xl
                              border
                              text-sm
                              font-semibold
                              transition
                              ${
                                frequency === days
                                  ? "bg-indigo-600 text-white border-indigo-600"
                                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                              }
                            `}
                          >
                            {days === 1
                              ? "Daily"
                              : `Every ${days} days`}
                          </button>

                        )
                      )}

                      <button
                        onClick={() =>
                          setFrequency(0)
                        }
                        className={`
                          py-3
                          rounded-xl
                          border
                          text-sm
                          font-semibold
                          ${
                            frequency === 0
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-slate-600 border-slate-200"
                          }
                        `}
                      >
                        Custom
                      </button>

                    </div>


                    {frequency === 0 && (

                      <div className="mt-4 flex items-center gap-3">

                        <input
                          type="number"
                          min={1}
                          max={90}
                          value={customDays}
                          onChange={(e) =>
                            setCustomDays(
                              Number(e.target.value)
                            )
                          }
                          className="
                            w-24
                            px-3
                            py-2.5
                            rounded-xl
                            border
                            border-slate-200
                            outline-none
                            focus:border-indigo-500
                          "
                        />

                        <span className="text-sm text-slate-600">
                          days
                        </span>

                      </div>

                    )}


                    <button
                      onClick={handleSchedule}
                      className="
                        mt-4
                        w-full
                        py-3
                        rounded-xl
                        bg-indigo-600
                        hover:bg-indigo-700
                        text-white
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >

                      <Clock size={17} />

                      Save Communication Schedule

                    </button>

                  </div>

                )}

              </div>


              {/* CONTACT DETAILS */}

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">

                    <UserRound
                      size={19}
                      className="text-slate-500"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-slate-800">
                      Masked Contact
                    </p>

                    <p className="text-sm text-slate-500">
                      {selectedCase.phone}
                    </p>

                  </div>

                </div>

                <p className="text-[11px] text-slate-400 mt-3">
                  Personal contact information is masked in the prototype.
                </p>

              </div>


              {/* SUCCESS */}

              {successMessage && (

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">

                  <CheckCircle2
                    size={19}
                    className="text-emerald-600"
                  />

                  <p className="text-sm font-semibold text-emerald-700">
                    {successMessage}
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}