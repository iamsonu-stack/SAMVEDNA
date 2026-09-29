import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

// =====================================================
// DISTRICT OFFICER / COMMON PAGES
// =====================================================

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CasesPage from "./pages/CasesPage";
import SidebarLayout from "./components/SidebarLayout";
import CaseDetailPage from "./pages/CaseDetailPage";
import RiskMonitoringPage from "./pages/RiskMonitoringPage";
import AlertsPage from "./pages/AlertsPage";
import CounsellorsPage from "./pages/CounsellorsPage";
import InterventionsPage from "./pages/InterventionsPage";
import CommunicationPage from "./pages/CommunicationPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

// =====================================================
// COUNSELLOR PAGES
// =====================================================

import CounsellorDashboardPage from "./pages/CounsellorDashboardPage";
import MyAssignedCasesPage from "./pages/MyAssignedCasesPage";
import CounsellorCaseDetailPage from "./pages/CounsellorCaseDetailPage";
import CounsellorRiskMonitoringPage from "./pages/CounsellorRiskMonitoringPage";
import CounsellorCheckinsPage from "./pages/CounsellorCheckinsPage";
import CounsellorAlertsPage from "./pages/CounsellorAlertsPage";
import CounsellingSessionsPage from "./pages/CounsellingSessionsPage";
import CounsellorInterventionsPage from "./pages/CounsellorInterventionsPage";
import CounsellorFollowUpsPage from "./pages/CounsellorFollowUpsPage";
import CounsellorSettingsPage from "./pages/CounsellorSettingsPage";

// =====================================================
// STATE ADMINISTRATOR PAGES
// =====================================================

import StateAdministratorDashboardPage from "./pages/StateAdministratorDashboardPage";
import StateCasesPage from "./pages/StateCasesPage";
import DistrictRiskPage from "./pages/DistrictRiskPage";
import StateInterventionsPage from "./pages/StateInterventionsPage";
import StateAnalyticsPage from "./pages/StateAnalyticsPage";
import StateReportsPage from "./pages/StateReportsPage";
import StateSettingsPage from "./pages/StateSettingsPage";

// =====================================================
// NATIONAL ADMINISTRATOR PAGES
// =====================================================

import NationalDashboard from "./pages/NationalDashboard";
import NationalOverviewPage from "./pages/NationalOverviewPage";
import InterventionAnalyticsPage from "./pages/InterventionAnalyticsPage";
import NationalReportsPage from "./pages/NationalReportsPage";
import SystemMonitoringPage from "./pages/SystemMonitoringPage";
import NationalSettingsPage from "./pages/NationalSettingsPage";

// =====================================================
// VICTIM PAGES
// =====================================================

import VictimCheckinPage from "./pages/VictimCheckinPage";
import VictimChatbotPage from "./pages/VictimChatbotPage";


// =====================================================
// COMMON PAGE COMPONENT
// =====================================================

function Page({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8">

      <h1 className="text-2xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

    </div>
  );
}


// =====================================================
// VICTIM / COMPLAINANT LOGIN
// =====================================================

function VictimLoginPage() {
  const navigate = useNavigate();

  const [victimId, setVictimId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!victimId.trim()) {
      setError(
        "Please enter your Victim / Complainant ID."
      );
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    // Prototype authentication
    localStorage.setItem(
      "samvedna_victim_authenticated",
      "true"
    );

    localStorage.setItem(
      "samvedna_victim_id",
      victimId.trim()
    );

    navigate("/victim-dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-5">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="text-center mb-8">

          <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">

            <span className="text-2xl font-bold">
              S
            </span>

          </div>

          <h1 className="text-3xl font-bold text-slate-900 mt-4">
            SAMVEDNA
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            AI-Powered Victim Well-being Monitoring
          </p>

        </div>


        {/* Login Card */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-7">

          <h2 className="text-2xl font-bold text-slate-900">
            Victim / Complainant Login
          </h2>

          <p className="text-sm text-slate-500 mt-2 mb-7">
            Access your private well-being check-ins
            and support options.
          </p>


          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Victim ID */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Victim / Complainant ID
              </label>

              <input
                type="text"
                value={victimId}
                onChange={(event) => {
                  setVictimId(event.target.value);
                  setError("");
                }}
                placeholder="Example: V-1001"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                "
              />

            </div>


            {/* Password */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                "
              />

            </div>


            {/* Error */}

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                {error}
              </div>
            )}


            {/* Login */}

            <button
              type="submit"
              className="
                w-full
                py-3.5
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                font-semibold
                transition
              "
            >
              Login to SAMVEDNA →
            </button>

          </form>


          {/* Back */}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              w-full
              mt-4
              py-3
              rounded-xl
              border
              border-slate-200
              text-slate-600
              hover:bg-slate-50
              font-medium
            "
          >
            ← Back to Official Login
          </button>


          {/* Privacy note */}

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">

            <p className="text-xs text-slate-500 leading-5">
              Victim access is optional. SAMVEDNA does not
              require continuous website usage. Check-ins
              may also be collected through approved
              communication channels.
            </p>

          </div>


          <p className="text-center text-xs text-slate-400 mt-5">
            SAMVEDNA • TechTrack • SIH Prototype
          </p>

        </div>

      </div>

    </div>
  );
}


// =====================================================
// VICTIM DASHBOARD
// =====================================================

function VictimDashboard() {
  const navigate = useNavigate();

  const victimId =
    localStorage.getItem(
      "samvedna_victim_id"
    ) || "V-XXXX";

  const victimName =
    localStorage.getItem(
      "samvedna_victim_name"
    ) || "Victim / Complainant";

  const storedCheckins =
    localStorage.getItem(
      "samvedna_checkins"
    );

  const checkins = storedCheckins
    ? JSON.parse(storedCheckins)
    : [];

  const latestCheckin =
    checkins.length > 0
      ? checkins[checkins.length - 1]
      : null;

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-6xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

          <div>

            <p className="text-sm text-indigo-600 font-semibold">
              SAMVEDNA
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mt-1">
              Welcome, {victimName}
            </h1>

            <p className="text-slate-500 mt-2">
              Your private well-being support space
            </p>

          </div>


          <div className="mt-4 md:mt-0 px-4 py-3 rounded-xl bg-white border border-slate-200">

            <span className="text-xs text-slate-400">
              Victim ID
            </span>

            <p className="font-semibold text-slate-800">
              {victimId}
            </p>

          </div>

        </div>


        {/* =================================================
            MAIN ACTION CARDS
        ================================================= */}

        <div className="grid md:grid-cols-2 gap-6">


          {/* CHECK-IN */}

          <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-7">

            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">
              ✓
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-5">
              Today's Check-in
            </h2>

            <p className="text-slate-500 mt-2">
              Complete a short voluntary well-being
              check-in about how you are feeling today.
            </p>

            <button
              onClick={() =>
                navigate("/victim-checkin")
              }
              className="
                mt-6
                w-full
                py-3
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                font-semibold
              "
            >
              Start Check-in →
            </button>

          </div>


          {/* CHATBOT */}

          <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-7">

            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
              💬
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-5">
              SAMVEDNA Support Chat
            </h2>

            <p className="text-slate-500 mt-2">
              Get help with check-ins, support options,
              calming options or requesting human support.
            </p>

            <button
              onClick={() =>
                navigate("/victim-chatbot")
              }
              className="
                mt-6
                w-full
                py-3
                rounded-xl
                bg-emerald-600
                hover:bg-emerald-700
                text-white
                font-semibold
              "
            >
              Open Support Chat →
            </button>

          </div>

        </div>


        {/* =================================================
            WELL-BEING SUMMARY
        ================================================= */}

        <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-7">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                My Well-being
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Your recent voluntary check-in information
              </p>

            </div>

            <button
              onClick={() =>
                navigate("/victim-checkin")
              }
              className="text-sm font-semibold text-indigo-600"
            >
              New Check-in
            </button>

          </div>


          {!latestCheckin ? (

            <div className="mt-5 p-6 rounded-xl bg-slate-50 border border-slate-100">

              <p className="text-slate-500">
                No check-in has been completed yet.
              </p>

              <button
                onClick={() =>
                  navigate("/victim-checkin")
                }
                className="mt-3 text-indigo-600 font-semibold"
              >
                Complete your first check-in →
              </button>

            </div>

          ) : (

            <div className="grid md:grid-cols-3 gap-4 mt-5">


              {/* Indicator */}

              <div className="p-5 rounded-xl bg-indigo-50">

                <p className="text-sm text-indigo-600">
                  Latest Well-being Indicator
                </p>

                <p className="text-3xl font-bold text-indigo-700 mt-2">
                  {latestCheckin.distressIndicator}
                </p>

                <p className="text-xs text-slate-500 mt-2">
                  Prototype indicator, not a diagnosis
                </p>

              </div>


              {/* Last check-in */}

              <div className="p-5 rounded-xl bg-slate-50">

                <p className="text-sm text-slate-500">
                  Last Check-in
                </p>

                <p className="font-semibold text-slate-800 mt-2">
                  {new Date(
                    latestCheckin.date
                  ).toLocaleDateString()}
                </p>

              </div>


              {/* Total */}

              <div className="p-5 rounded-xl bg-emerald-50">

                <p className="text-sm text-emerald-600">
                  Check-ins Completed
                </p>

                <p className="text-3xl font-bold text-emerald-700 mt-2">
                  {checkins.length}
                </p>

              </div>

            </div>

          )}

        </div>


        {/* =================================================
            SUPPORT INFORMATION
        ================================================= */}

        <div className="mt-6 grid md:grid-cols-3 gap-4">


          <div className="bg-white border border-slate-200 rounded-2xl p-5">

            <h3 className="font-semibold text-slate-900">
              Privacy
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              You can pause or skip routine check-in
              questions.
            </p>

          </div>


          <div className="bg-white border border-slate-200 rounded-2xl p-5">

            <h3 className="font-semibold text-slate-900">
              Human Support
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              You can request support from an authorized
              human professional.
            </p>

          </div>


          <div className="bg-white border border-slate-200 rounded-2xl p-5">

            <h3 className="font-semibold text-slate-900">
              Support Chat
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Use the support chat for approved support
              navigation.
            </p>

          </div>

        </div>


        {/* =================================================
            LOGOUT
        ================================================= */}

        <button
          onClick={() => {

            localStorage.removeItem(
              "samvedna_victim_authenticated"
            );

            localStorage.removeItem(
              "samvedna_victim_id"
            );

            localStorage.removeItem(
              "samvedna_victim_name"
            );

            navigate("/");

          }}
          className="
            mt-8
            px-5
            py-3
            rounded-xl
            bg-slate-900
            text-white
            font-semibold
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
}


// =====================================================
// VICTIM REGISTRATION
// =====================================================

function VictimRegistrationPage() {
  const navigate = useNavigate();

  const [victimId, setVictimId] =
    React.useState("");

  const [name, setName] =
    React.useState("");

  const [mobile, setMobile] =
    React.useState("");

  const [password, setPassword] =
    React.useState("");

  const [message, setMessage] =
    React.useState("");

  function handleRegistration(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");

    if (
      !victimId.trim() ||
      !name.trim() ||
      !mobile.trim() ||
      !password.trim()
    ) {
      setMessage(
        "Please fill all required fields."
      );
      return;
    }

    localStorage.setItem(
      "samvedna_victim_id",
      victimId.trim()
    );

    localStorage.setItem(
      "samvedna_victim_name",
      name.trim()
    );

    localStorage.setItem(
      "samvedna_victim_mobile",
      mobile.trim()
    );

    localStorage.setItem(
      "samvedna_victim_authenticated",
      "true"
    );

    setMessage(
      "Registration successful. Redirecting..."
    );

    setTimeout(() => {
      navigate("/victim-dashboard");
    }, 800);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-5">

      <div className="w-full max-w-lg">

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">

          {/* Header */}

          <div className="text-center mb-7">

            <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">

              <span className="text-2xl font-bold">
                S
              </span>

            </div>

            <h1 className="text-3xl font-bold text-slate-900 mt-4">
              SAMVEDNA
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Victim / Complainant Registration
            </p>

          </div>


          {/* Form */}

          <form
            onSubmit={handleRegistration}
            className="space-y-5"
          >

            {/* Victim ID */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Victim / Complainant ID
              </label>

              <input
                type="text"
                value={victimId}
                onChange={(e) =>
                  setVictimId(e.target.value)
                }
                placeholder="Example: V-1001"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                "
              />

            </div>


            {/* Name */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter name"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                "
              />

            </div>


            {/* Mobile */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mobile Number
              </label>

              <input
                type="tel"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value)
                }
                placeholder="Enter mobile number"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                "
              />

            </div>


            {/* Password */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Create password"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  outline-none
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-100
                "
              />

            </div>


            {/* Message */}

            {message && (
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-sm text-indigo-700">
                {message}
              </div>
            )}


            {/* Submit */}

            <button
              type="submit"
              className="
                w-full
                py-3.5
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                font-semibold
              "
            >
              Register & Continue →
            </button>

          </form>


          {/* Back */}

          <button
            onClick={() =>
              navigate("/")
            }
            className="
              w-full
              mt-4
              py-3
              rounded-xl
              border
              border-slate-200
              text-slate-600
              hover:bg-slate-50
              font-medium
            "
          >
            ← Back
          </button>

        </div>

      </div>

    </div>
  );
}


// =====================================================
// MAIN APP
// =====================================================

export default function App() {

  return (
    <Routes>

      {/* =================================================
          OFFICIAL LOGIN
      ================================================= */}

      <Route
        path="/"
        element={<LoginPage />}
      />


      {/* =================================================
          VICTIM / COMPLAINANT
      ================================================= */}

      <Route
        path="/victim-login"
        element={<VictimLoginPage />}
      />

      <Route
        path="/victim-registration"
        element={<VictimRegistrationPage />}
      />

      <Route
        path="/victim-dashboard"
        element={<VictimDashboard />}
      />

      <Route
        path="/victim-checkin"
        element={<VictimCheckinPage />}
      />

      <Route
        path="/victim-chatbot"
        element={<VictimChatbotPage />}
      />


      {/* =================================================
          SIDEBAR APPLICATION
      ================================================= */}

      <Route element={<SidebarLayout />}>

        {/* =================================================
            DISTRICT OFFICER
        ================================================= */}

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/cases"
          element={<CasesPage />}
        />

        <Route
          path="/cases/:caseId"
          element={<CaseDetailPage />}
        />

        <Route
          path="/risk-monitoring"
          element={<RiskMonitoringPage />}
        />

        <Route
          path="/alerts"
          element={<AlertsPage />}
        />

        <Route
          path="/counsellors"
          element={<CounsellorsPage />}
        />

        <Route
          path="/interventions"
          element={<InterventionsPage />}
        />

        <Route
          path="/communication"
          element={<CommunicationPage />}
        />

        <Route
          path="/reports"
          element={<ReportsPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />


        {/* =================================================
            COUNSELLOR
        ================================================= */}

        <Route
          path="/counsellor-dashboard"
          element={<CounsellorDashboardPage />}
        />

        <Route
          path="/my-assigned-cases"
          element={<MyAssignedCasesPage />}
        />

        <Route
          path="/counsellor-case/:caseId"
          element={<CounsellorCaseDetailPage />}
        />

        <Route
          path="/counsellor-risk-monitoring"
          element={<CounsellorRiskMonitoringPage />}
        />

        <Route
          path="/check-ins"
          element={<CounsellorCheckinsPage />}
        />

        <Route
          path="/counsellor-alerts"
          element={<CounsellorAlertsPage />}
        />

        <Route
          path="/counselling-sessions"
          element={<CounsellingSessionsPage />}
        />

        <Route
          path="/counsellor-interventions"
          element={<CounsellorInterventionsPage />}
        />

        <Route
          path="/follow-ups"
          element={<CounsellorFollowUpsPage />}
        />

        <Route
          path="/counsellor-settings"
          element={<CounsellorSettingsPage />}
        />


        {/* =================================================
            STATE ADMINISTRATOR
        ================================================= */}

        <Route
          path="/state-dashboard"
          element={<StateAdministratorDashboardPage />}
        />

        <Route
          path="/state-cases"
          element={<StateCasesPage />}
        />

        <Route
          path="/district-risk"
          element={<DistrictRiskPage />}
        />

        <Route
          path="/state-interventions"
          element={<StateInterventionsPage />}
        />

        <Route
          path="/state-analytics"
          element={<StateAnalyticsPage />}
        />

        <Route
          path="/state-reports"
          element={<StateReportsPage />}
        />

        <Route
          path="/state-settings"
          element={<StateSettingsPage />}
        />


        {/* =================================================
            NATIONAL ADMINISTRATOR
        ================================================= */}

        <Route
          path="/national-dashboard"
          element={<NationalDashboard />}
        />

        <Route
          path="/national-overview"
          element={<NationalOverviewPage />}
        />

        <Route
          path="/intervention-analytics"
          element={<InterventionAnalyticsPage />}
        />

        <Route
          path="/national-reports"
          element={<NationalReportsPage />}
        />

        <Route
          path="/system-monitoring"
          element={<SystemMonitoringPage />}
        />

        <Route
          path="/national-settings"
          element={<NationalSettingsPage />}
        />

      </Route>


      {/* =================================================
          UNKNOWN ROUTES
      ================================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}