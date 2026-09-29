import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ShieldAlert,
  UserPlus,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import { allCases, type CaseData, type RiskLevel } from "../Data/cases";

export type AlertStatus = "Active" | "Acknowledged" | "Assigned" | "Escalated" | "Resolved";

export type AlertItem = {
  id: string;
  caseId: string;
  risk: RiskLevel;
  status: AlertStatus;
  title: string;
  subtitle: string;
  indicators: string[];
  recommendation: string;
  createdAt: string;
  assignedCounsellor: string;
};

const ALERTS_KEY = "samvedna_alerts_v1";
const ASSIGNMENTS_KEY = "samvedna_case_assignments_v1";

const initialAlerts: AlertItem[] = [
  {
    id: "ALT-1025",
    caseId: "CASE-1025",
    risk: "High",
    status: "Active",
    title: "Distress score increased rapidly: 54 → 78",
    subtitle: "Fear and stress indicators increased across recent check-ins.",
    indicators: ["Fear increased", "Stress increased", "Threat-related response detected", "Distress increased across 3 check-ins"],
    recommendation: "Human follow-up recommended",
    createdAt: "Today · 08:42",
    assignedCounsellor: "Anita Sharma",
  },
  {
    id: "ALT-1088",
    caseId: "CASE-1088",
    risk: "Critical",
    status: "Acknowledged",
    title: "Distress score reached critical threshold: 84",
    subtitle: "The latest check-in shows a high distress signal requiring human review.",
    indicators: ["Stress rating at maximum", "Safety concern reported", "Sleep difficulty severe", "Rapid upward trend"],
    recommendation: "Immediate human intervention review",
    createdAt: "Today · 06:15",
    assignedCounsellor: "Rahul Verma",
  },
  {
    id: "ALT-1135",
    caseId: "CASE-1135",
    risk: "Critical",
    status: "Assigned",
    title: "Critical distress sustained across recent check-ins",
    subtitle: "Distress remains elevated and has continued to increase.",
    indicators: ["Sustained critical scores", "All indicators elevated", "Engagement declining"],
    recommendation: "Immediate human follow-up recommended",
    createdAt: "Today · 05:30",
    assignedCounsellor: "Rahul Verma",
  },
  {
    id: "ALT-1114",
    caseId: "CASE-1114",
    risk: "High",
    status: "Active",
    title: "Rapid escalation in distress trend",
    subtitle: "The score has increased consistently over the monitoring period.",
    indicators: ["Fear rating high", "Safety concern reported", "Threat-related text detected", "Trend rapidly increasing"],
    recommendation: "Human follow-up recommended",
    createdAt: "Yesterday · 22:10",
    assignedCounsellor: "Priya Singh",
  },
  {
    id: "ALT-1164",
    caseId: "CASE-1164",
    risk: "High",
    status: "Active",
    title: "Distress score crossed high threshold",
    subtitle: "Recent responses show increasing anxiety and sleep difficulty.",
    indicators: ["Anxiety increased", "Sleep difficulty rising", "Engagement pattern changed"],
    recommendation: "Counsellor follow-up recommended",
    createdAt: "Yesterday · 18:45",
    assignedCounsellor: "",
  },
  {
    id: "ALT-1172",
    caseId: "CASE-1172",
    risk: "Critical",
    status: "Acknowledged",
    title: "Critical threshold reached: sustained distress",
    subtitle: "Multiple consecutive check-ins indicate elevated distress.",
    indicators: ["Distress sustained", "Negative sentiment detected", "Rapid upward trend"],
    recommendation: "Immediate human review recommended",
    createdAt: "Yesterday · 14:20",
    assignedCounsellor: "Vikram Patil",
  },
  {
    id: "ALT-1092",
    caseId: "CASE-1092",
    risk: "High",
    status: "Active",
    title: "Distress trend increasing",
    subtitle: "The latest response is higher than the previous monitoring point.",
    indicators: ["Anxiety increased", "Negative sentiment", "Increasing trend"],
    recommendation: "Human follow-up recommended",
    createdAt: "Yesterday · 11:05",
    assignedCounsellor: "Priya Singh",
  },
  {
    id: "ALT-1201",
    caseId: "CASE-1201",
    risk: "High",
    status: "Resolved",
    title: "Previous high distress alert resolved",
    subtitle: "Monitoring continues after human follow-up.",
    indicators: ["Follow-up completed", "Distress improving"],
    recommendation: "Continue routine monitoring",
    createdAt: "2 days ago · 16:40",
    assignedCounsellor: "Anita Sharma",
  },
];

function readAlerts(): AlertItem[] {
  try {
    const stored = localStorage.getItem(ALERTS_KEY);
    if (stored) return JSON.parse(stored) as AlertItem[];
  } catch {
    // Fall back to prototype data.
  }
  localStorage.setItem(ALERTS_KEY, JSON.stringify(initialAlerts));
  return initialAlerts;
}

function saveAlerts(alerts: AlertItem[]) {
  localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
}

function readAssignments(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(ASSIGNMENTS_KEY) || "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

function riskClasses(risk: RiskLevel) {
  if (risk === "Critical") return "border-red-200 bg-red-50 text-red-700";
  if (risk === "High") return "border-orange-200 bg-orange-50 text-orange-700";
  if (risk === "Moderate") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-emerald-200 bg-emerald-50 text-emerald-700";
}

function statusClasses(status: AlertStatus) {
  if (status === "Resolved") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "Escalated") return "border-red-200 bg-red-50 text-red-700";
  if (status === "Assigned") return "border-indigo-200 bg-indigo-50 text-indigo-700";
  if (status === "Acknowledged") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-orange-200 bg-orange-50 text-orange-700";
}

export default function AlertsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [alerts, setAlerts] = React.useState<AlertItem[]>(readAlerts);
  const [filter, setFilter] = React.useState<"All" | RiskLevel | "Resolved">("All");
  const [notice, setNotice] = React.useState("");

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const assigned = params.get("assigned");
    if (assigned) {
      setNotice(`${assigned} has been assigned successfully.`);
      window.history.replaceState({}, "", "/alerts");
      const timer = window.setTimeout(() => setNotice(""), 3500);
      return () => window.clearTimeout(timer);
    }
  }, [location.search]);

  const assignments = readAssignments();
  const enrichedAlerts = alerts.map((alert) => ({
    ...alert,
    assignedCounsellor: assignments[alert.caseId] || alert.assignedCounsellor,
  }));

  const visibleAlerts = enrichedAlerts.filter((alert) => {
    if (filter === "All") return true;
    if (filter === "Resolved") return alert.status === "Resolved";
    return alert.risk === filter && alert.status !== "Resolved";
  });

  const activeCount = enrichedAlerts.filter((a) => a.status !== "Resolved").length;
  const criticalCount = enrichedAlerts.filter((a) => a.risk === "Critical" && a.status !== "Resolved").length;
  const highCount = enrichedAlerts.filter((a) => a.risk === "High" && a.status !== "Resolved").length;
  const resolvedCount = enrichedAlerts.filter((a) => a.status === "Resolved").length;

  function updateAlert(id: string, patch: Partial<AlertItem>, message: string) {
    const next = alerts.map((alert) => alert.id === id ? { ...alert, ...patch } : alert);
    setAlerts(next);
    saveAlerts(next);
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  }

  function viewCase(caseId: string) {
    navigate(`/cases/${caseId}`);
  }

  function assignCounsellor(caseId: string) {
    navigate(`/counsellors?caseId=${encodeURIComponent(caseId)}`);
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Alert Management</h1>
            <p className="mt-1 text-sm text-slate-500">District alerts and human-review queue.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm font-semibold">
            <span className="rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700">{activeCount} active alerts</span>
            <span className="rounded-lg bg-red-50 px-3 py-2 text-red-700">{criticalCount} critical</span>
            <span className="rounded-lg bg-orange-50 px-3 py-2 text-orange-700">{highCount} high</span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            ["All", enrichedAlerts.length],
            ["Critical", criticalCount],
            ["High", highCount],
            ["Resolved", resolvedCount],
          ].map(([label, count]) => (
            <button
              key={String(label)}
              onClick={() => setFilter(label as typeof filter)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${filter === label ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              {label} {count}
            </button>
          ))}
        </div>
      </div>

      {notice && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" /> {notice}
        </div>
      )}

      <div className="space-y-4">
        {visibleAlerts.map((alert) => {
          const caseData = allCases.find((item) => item.id === alert.caseId) as CaseData | undefined;
          const currentScore = caseData?.score ?? 0;
          const previousScore = caseData?.previousScore ?? 0;

          return (
            <div key={alert.id} className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${alert.risk === "Critical" ? "border-t-4 border-t-red-500" : "border-t-4 border-t-orange-400"}`}>
              <div className="p-5">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {alert.risk === "Critical" ? <ShieldAlert className="h-5 w-5 text-red-500" /> : <AlertTriangle className="h-5 w-5 text-orange-500" />}
                      <button onClick={() => viewCase(alert.caseId)} className="font-bold text-slate-900 hover:text-indigo-600 hover:underline">{alert.caseId}</button>
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${riskClasses(alert.risk)}`}>• {alert.risk}</span>
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${statusClasses(alert.status)}`}>{alert.status}</span>
                    </div>

                    <h2 className="mt-2 text-sm font-bold text-slate-800">{alert.title}</h2>
                    <p className="mt-1 text-xs text-slate-500">{alert.subtitle}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{alert.createdAt}</span>
                      {alert.assignedCounsellor && <span>Assigned: {alert.assignedCounsellor}</span>}
                      {caseData && <span>Current score: {currentScore} · Previous: {previousScore}</span>}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {alert.indicators.map((indicator) => (
                    <span key={indicator} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">{indicator}</span>
                  ))}
                </div>

                <div className="mt-4 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700">
                  <span className="font-bold">Recommended:</span> {alert.recommendation}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button onClick={() => viewCase(alert.caseId)} className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700">
                    <Eye className="h-3.5 w-3.5" /> View Case
                  </button>
                  <button onClick={() => assignCounsellor(alert.caseId)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
                    <UserPlus className="h-3.5 w-3.5" /> {alert.assignedCounsellor ? "Reassign Counsellor" : "Assign Counsellor"}
                  </button>
                  {alert.status !== "Resolved" && (
                    <>
                      <button onClick={() => updateAlert(alert.id, { status: "Escalated" }, `${alert.caseId} has been escalated for higher-level review.`)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-100">
                        <ArrowUpRight className="h-3.5 w-3.5" /> Escalate
                      </button>
                      <button onClick={() => updateAlert(alert.id, { status: "Resolved" }, `${alert.caseId} alert marked as resolved.`)} className="rounded-lg px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                        Resolve
                      </button>
                    </>
                  )}
                  {alert.status === "Resolved" && (
                    <button onClick={() => updateAlert(alert.id, { status: "Active" }, `${alert.caseId} alert reopened.`)} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
