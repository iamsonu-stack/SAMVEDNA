import React, { useState } from "react";
import {
  AlertTriangle,
  TrendingUp,
  Phone,
  MessageSquare,
  Eye,
  Clock,
  UserRound,
  X,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

type AlertCase = {
  id: string;
  victimId: string;
  category: string;
  district: string;
  previousScore: number;
  currentScore: number;
  increase: number;
  lastCheckIn: string;
  detected: string;
  reason: string[];
  status: "Needs Attention" | "Contact Pending";
};

const alertCases: AlertCase[] = [
  {
    id: "CASE-1025",
    victimId: "V-XXXX-1025",
    category: "Caste-based Violence",
    district: "Indore",
    previousScore: 54,
    currentScore: 84,
    increase: 30,
    lastCheckIn: "2 hours ago",
    detected: "2 hours ago",
    reason: [
      "Stress increased from 3/5 to 5/5",
      "Fear increased from 2/5 to 5/5",
      "Distress score increased sharply",
      "High distress detected across consecutive check-ins",
    ],
    status: "Needs Attention",
  },

  {
    id: "CASE-1088",
    victimId: "V-XXXX-1088",
    category: "Threat / Intimidation",
    district: "Indore",
    previousScore: 61,
    currentScore: 78,
    increase: 17,
    lastCheckIn: "5 hours ago",
    detected: "5 hours ago",
    reason: [
      "Stress increased from 3/5 to 5/5",
      "Fear response increased",
      "Distress trend continuously rising",
    ],
    status: "Contact Pending",
  },
];

export default function CounsellorAlertsPage() {
  const [selectedAlert, setSelectedAlert] =
    useState<AlertCase | null>(null);

  const [showMessageBox, setShowMessageBox] =
    useState(false);

  const [message, setMessage] = useState("");

  const [contactedCases, setContactedCases] =
    useState<string[]>([]);

  function markContacted(caseId: string) {
    setContactedCases((previous) => {
      if (previous.includes(caseId)) {
        return previous;
      }

      return [...previous, caseId];
    });
  }

  function handleSendMessage() {
    if (!message.trim() || !selectedAlert) {
      return;
    }

    markContacted(selectedAlert.id);

    setMessage("");

    setShowMessageBox(false);

    alert(
      `Message recorded for ${selectedAlert.victimId}`
    );
  }

  function handleCall(caseItem: AlertCase) {
    markContacted(caseItem.id);

    alert(
      `Call connection initiated for ${caseItem.victimId}.\n\nDemo prototype: actual phone integration can be connected later.`
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-wide text-red-600">
              COUNSELLOR ALERT CENTER
            </p>

            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Sudden Distress Alerts
            </h1>

            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Shows assigned cases where distress indicators have
              increased significantly and human follow-up may be required.
            </p>

          </div>

          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">

            <AlertTriangle
              size={24}
              className="text-red-500"
            />

          </div>

        </div>

      </div>


      {/* IMPORTANT EXPLANATION */}

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">

        <div className="flex items-start gap-3">

          <TrendingUp
            size={21}
            className="text-indigo-600 mt-0.5"
          />

          <div>

            <h2 className="font-bold text-indigo-800">
              What appears here?
            </h2>

            <p className="text-sm text-indigo-700 mt-1 leading-6">
              Only assigned cases showing a significant change in
              distress indicators are displayed. A single high
              response does not automatically create a crisis alert.
              The system considers changes across multiple check-ins.
            </p>

          </div>

        </div>

      </div>


      {/* SUMMARY */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white border border-red-100 rounded-2xl p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Sudden Increase
          </p>

          <p className="text-3xl font-bold text-red-600 mt-2">
            {alertCases.length}
          </p>

          <p className="text-xs text-red-500 font-semibold mt-1">
            Cases requiring review
          </p>

        </div>


        <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Contact Pending
          </p>

          <p className="text-3xl font-bold text-orange-600 mt-2">
            {
              alertCases.filter(
                (item) =>
                  item.status === "Contact Pending"
              ).length
            }
          </p>

          <p className="text-xs text-orange-500 font-semibold mt-1">
            Follow-up recommended
          </p>

        </div>


        <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Contacted
          </p>

          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {contactedCases.length}
          </p>

          <p className="text-xs text-emerald-500 font-semibold mt-1">
            Counsellor connection recorded
          </p>

        </div>

      </div>


      {/* ALERT LIST */}

      <div className="space-y-4">

        {alertCases.map((item) => {

          const alreadyContacted =
            contactedCases.includes(item.id);

          return (
            <div
              key={item.id}
              className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                shadow-sm
                overflow-hidden
              "
            >

              {/* TOP */}

              <div className="p-5">

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">

                      <AlertTriangle
                        size={23}
                        className="text-red-500"
                      />

                    </div>

                    <div>

                      <div className="flex items-center gap-2 flex-wrap">

                        <h2 className="text-lg font-bold text-slate-900">
                          {item.id}
                        </h2>

                        <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                          SUDDEN INCREASE
                        </span>

                      </div>

                      <p className="text-sm text-slate-500 mt-1">
                        {item.category} • {item.district}
                      </p>

                      <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">

                        <Clock size={14} />

                        Detected {item.detected}

                      </div>

                    </div>

                  </div>


                  {/* SCORE CHANGE */}

                  <div className="flex items-center gap-5">

                    <div className="text-right">

                      <p className="text-xs text-slate-400">
                        Previous
                      </p>

                      <p className="text-xl font-bold text-slate-600">
                        {item.previousScore}
                      </p>

                    </div>

                    <div className="text-red-400 text-xl">
                      →
                    </div>

                    <div className="text-right">

                      <p className="text-xs text-slate-400">
                        Current
                      </p>

                      <p className="text-2xl font-bold text-red-600">
                        {item.currentScore}
                      </p>

                    </div>

                    <div className="px-3 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-sm">
                      +{item.increase}
                    </div>

                  </div>

                </div>


                {/* REASONS */}

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">

                  {item.reason.map((reason, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >

                      <CheckCircle2
                        size={16}
                        className="text-red-500 mt-0.5 flex-shrink-0"
                      />

                      <p className="text-sm text-slate-600">
                        {reason}
                      </p>

                    </div>

                  ))}

                </div>


                {/* CONTACT STATUS */}

                {alreadyContacted && (

                  <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100">

                    <CheckCircle2
                      size={17}
                      className="text-emerald-600"
                    />

                    <p className="text-sm font-semibold text-emerald-700">
                      Counsellor contact recorded
                    </p>

                  </div>

                )}

              </div>


              {/* ACTION BAR */}

              <div className="px-5 py-4 bg-slate-50 border-t border-slate-100">

                <div className="flex flex-col sm:flex-row gap-3">

                  <Link
                    to={`/counsellor-case/${item.id}`}
                    className="
                      flex-1
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-xl
                      bg-indigo-600
                      hover:bg-indigo-700
                      text-white
                      text-sm
                      font-semibold
                      transition
                    "
                  >

                    <Eye size={16} />

                    View Case

                  </Link>


                  <button
                    onClick={() => handleCall(item)}
                    className="
                      flex-1
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-xl
                      bg-emerald-600
                      hover:bg-emerald-700
                      text-white
                      text-sm
                      font-semibold
                      transition
                    "
                  >

                    <Phone size={16} />

                    Connect / Call

                  </button>


                  <button
                    onClick={() => {

                      setSelectedAlert(item);
                      setShowMessageBox(true);

                    }}
                    className="
                      flex-1
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      hover:bg-slate-100
                      text-slate-700
                      text-sm
                      font-semibold
                      transition
                    "
                  >

                    <MessageSquare size={16} />

                    Send Message

                  </button>

                </div>

              </div>

            </div>
          );

        })}

      </div>


      {/* PRIVACY / HUMAN REVIEW */}

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

        <div className="flex gap-3">

          <UserRound
            size={18}
            className="text-indigo-500 flex-shrink-0"
          />

          <p className="text-xs text-slate-500 leading-5">
            Contact information should only be revealed to an
            authorized counsellor through the approved communication
            system. AI alerts are decision-support signals. The
            counsellor reviews the situation before taking action.
          </p>

        </div>

      </div>


      {/* MESSAGE MODAL */}

      {showMessageBox && selectedAlert && (

        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5">

          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between p-5 border-b border-slate-200">

              <div>

                <p className="text-xs font-bold text-indigo-600 uppercase">
                  Secure Communication
                </p>

                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  Message {selectedAlert.victimId}
                </h2>

              </div>

              <button
                onClick={() => setShowMessageBox(false)}
                className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center"
              >

                <X size={19} />

              </button>

            </div>


            {/* MESSAGE */}

            <div className="p-5">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Message
              </label>

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                rows={5}
                placeholder="Enter a supportive follow-up message..."
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  outline-none
                  resize-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                "
              />

              <p className="text-xs text-slate-400 mt-2">
                Demo communication interface. Actual SMS/chat
                integration can be connected through the approved
                communication service.
              </p>

            </div>


            {/* FOOTER */}

            <div className="flex gap-3 p-5 border-t border-slate-200">

              <button
                onClick={() => setShowMessageBox(false)}
                className="
                  flex-1
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-700
                  font-semibold
                "
              >
                Cancel
              </button>

              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="
                  flex-1
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  disabled:bg-slate-300
                  text-white
                  font-semibold
                "
              >

                <Send size={16} />

                Send Message

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}