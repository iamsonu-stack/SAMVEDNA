import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, UserCheck, Phone, MapPin, BriefcaseBusiness, ArrowLeft, CheckCircle2 } from "lucide-react";
import { counsellors, type Counsellor } from "../Data/counsellors";

const ASSIGNMENTS_KEY = "samvedna_case_assignments_v1";
const ALERTS_KEY = "samvedna_alerts_v1";

type AlertRecord = {
  id: string;
  caseId: string;
  assignedCounsellor: string;
  status: string;
  [key: string]: unknown;
};

function readAssignments(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(ASSIGNMENTS_KEY) || "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

export default function CounsellorsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const caseId = searchParams.get("caseId") || "";
  const [query, setQuery] = React.useState("");
  const [district, setDistrict] = React.useState("All");
  const [status, setStatus] = React.useState("All");
  const [selected, setSelected] = React.useState<Counsellor | null>(null);
  const [notice, setNotice] = React.useState("");
  const [assignments, setAssignments] = React.useState<Record<string, string>>(readAssignments);

  const districts = ["All", ...Array.from(new Set(counsellors.map((c) => c.district)))];

  const visible = counsellors.filter((c) => {
    const matchesQuery = `${c.name} ${c.specialization} ${c.district}`.toLowerCase().includes(query.toLowerCase());
    const matchesDistrict = district === "All" || c.district === district;
    const matchesStatus = status === "All" || c.status === status;
    return matchesQuery && matchesDistrict && matchesStatus;
  });

  function assignCounsellor(counsellor: Counsellor) {
    if (!caseId) {
      setSelected(counsellor);
      return;
    }

    const next = { ...assignments, [caseId]: counsellor.name };
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(next));
    setAssignments(next);

    try {
      const raw = localStorage.getItem(ALERTS_KEY);
      if (raw) {
        const alerts = JSON.parse(raw) as AlertRecord[];
        const updated = alerts.map((alert) =>
          alert.caseId === caseId
            ? { ...alert, assignedCounsellor: counsellor.name, status: "Assigned" }
            : alert
        );
        localStorage.setItem(ALERTS_KEY, JSON.stringify(updated));
      }
    } catch {
      // Keep assignment saved even if alert data is unavailable.
    }

    setNotice(`${counsellor.name} assigned to ${caseId}.`);
    window.setTimeout(() => navigate(`/alerts?assigned=${encodeURIComponent(counsellor.name)}`), 900);
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              {caseId && <button onClick={() => navigate("/alerts")} className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"><ArrowLeft className="h-4 w-4" /></button>}
              <h1 className="text-2xl font-bold text-slate-900">Counsellors</h1>
            </div>
            <p className="mt-1 text-sm text-slate-500">Counsellor assignment and availability.</p>
          </div>
          {caseId && (
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700">
              Assigning counsellor for <span className="font-extrabold">{caseId}</span>
            </div>
          )}
        </div>

        {notice && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="h-4 w-4" /> {notice}
          </div>
        )}

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search counsellor, specialization..." className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500" />
          </div>
          <select value={district} onChange={(e) => setDistrict(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">
            {districts.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none">
            <option>All</option><option>Available</option><option>Busy</option><option>Off Duty</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {visible.map((c) => {
          const assignedCases = c.assignedCases + Object.values(assignments).filter((name) => name === c.name).length;
          return (
            <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-700">{c.name.split(" ").map((n) => n[0]).join("")}</div>
                  <div>
                    <h2 className="font-bold text-slate-900">{c.name}</h2>
                    <p className="text-sm text-slate-500">{c.specialization}</p>
                  </div>
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${c.status === "Available" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : c.status === "Busy" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-slate-200 bg-slate-100 text-slate-600"}`}>{c.status}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-50 p-3"><div className="flex items-center gap-2 text-slate-500"><MapPin className="h-4 w-4" />District</div><p className="mt-1 font-semibold text-slate-800">{c.district}</p></div>
                <div className="rounded-xl bg-slate-50 p-3"><div className="flex items-center gap-2 text-slate-500"><BriefcaseBusiness className="h-4 w-4" />Experience</div><p className="mt-1 font-semibold text-slate-800">{c.experience}</p></div>
                <div className="rounded-xl bg-slate-50 p-3"><div className="flex items-center gap-2 text-slate-500"><UserCheck className="h-4 w-4" />Assigned cases</div><p className="mt-1 font-semibold text-slate-800">{assignedCases}</p></div>
                <div className="rounded-xl bg-slate-50 p-3"><div className="flex items-center gap-2 text-slate-500"><Phone className="h-4 w-4" />Contact</div><p className="mt-1 font-semibold text-slate-800">{c.phone}</p></div>
              </div>

              <div className="mt-4 flex gap-2">
                {caseId ? (
                  <button onClick={() => assignCounsellor(c)} className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300" disabled={c.status === "Off Duty"}>
                    Assign to {caseId}
                  </button>
                ) : (
                  <button onClick={() => setSelected(c)} className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">View Profile</button>
                )}
                <button onClick={() => window.alert(`Demo call to ${c.name} (${c.phone})`)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">Call</button>
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">No counsellors match the selected filters.</div>}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-slate-900">{selected.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{selected.specialization}</p>
            <div className="mt-5 space-y-3 text-sm text-slate-700">
              <p><b>District:</b> {selected.district}</p>
              <p><b>Status:</b> {selected.status}</p>
              <p><b>Experience:</b> {selected.experience}</p>
              <p><b>Assigned cases:</b> {selected.assignedCases}</p>
              <p><b>Contact:</b> {selected.phone}</p>
            </div>
            <div className="mt-6 flex gap-2">
              {caseId && <button onClick={() => assignCounsellor(selected)} className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white">Assign to {caseId}</button>}
              <button onClick={() => setSelected(null)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
