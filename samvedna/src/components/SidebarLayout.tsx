import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  FolderOpen,
  Activity,
  Bell,
  Users,
  HandHeart,
  MessageSquare,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  Search,
  UserCircle,
  ClipboardCheck,
  Stethoscope,
  Map,
  BarChart3,
  MonitorCog,
} from "lucide-react";

/* =========================================================
   ROLE TYPE
========================================================= */

type Role =
  | "district"
  | "counsellor"
  | "state"
  | "national";

/* =========================================================
   SIDEBAR MENU
========================================================= */

const sidebarMenus: Record<
  Role,
  {
    name: string;
    path: string;
    icon: React.ElementType;
  }[]
> = {
  /* =====================================================
     DISTRICT OFFICER
  ===================================================== */

  district: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Cases",
      path: "/cases",
      icon: FolderOpen,
    },

    {
      name: "Risk Monitoring",
      path: "/risk-monitoring",
      icon: Activity,
    },

    {
      name: "Alerts",
      path: "/alerts",
      icon: Bell,
    },

    {
      name: "Counsellors",
      path: "/counsellors",
      icon: Users,
    },

    {
      name: "Interventions",
      path: "/interventions",
      icon: HandHeart,
    },

    {
      name: "Communication",
      path: "/communication",
      icon: MessageSquare,
    },

    {
      name: "Reports",
      path: "/reports",
      icon: FileText,
    },

    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ],

  /* =====================================================
     COUNSELLOR
  ===================================================== */

  counsellor: [
    {
      name: "Dashboard",
      path: "/counsellor-dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "My Assigned Cases",
      path: "/my-assigned-cases",
      icon: FolderOpen,
    },

    {
      name: "Risk Monitoring",
      path: "/counsellor-risk-monitoring",
      icon: Activity,
    },

    {
      name: "Check-ins",
      path: "/check-ins",
      icon: ClipboardCheck,
    },

    {
      name: "Alerts",
      path: "/counsellor-alerts",
      icon: Bell,
    },

    {
      name: "Counselling Sessions",
      path: "/counselling-sessions",
      icon: Stethoscope,
    },

    {
      name: "Interventions",
      path: "/counsellor-interventions",
      icon: HandHeart,
    },

    {
      name: "Follow-ups",
      path: "/follow-ups",
      icon: ClipboardCheck,
    },

    {
      name: "Settings",
      path: "/counsellor-settings",
      icon: Settings,
    },
  ],

  /* =====================================================
     STATE ADMINISTRATOR
     
     IMPORTANT:
     No Alerts
     No Counsellors
     
     State Admin focuses on:
     State Cases
     District Risk
     Interventions
     Analytics
     Reports
     Settings
  ===================================================== */

  state: [
    {
      name: "Dashboard",
      path: "/state-dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "State Cases",
      path: "/state-cases",
      icon: FolderOpen,
    },

    {
      name: "District Risk",
      path: "/district-risk",
      icon: Map,
    },

    {
      name: "Interventions",
      path: "/state-interventions",
      icon: HandHeart,
    },

    {
      name: "Analytics",
      path: "/state-analytics",
      icon: BarChart3,
    },

    {
      name: "Reports",
      path: "/state-reports",
      icon: FileText,
    },

    {
      name: "Settings",
      path: "/state-settings",
      icon: Settings,
    },
  ],

  /* =====================================================
     NATIONAL ADMINISTRATOR
  ===================================================== */

  national: [
    {
      name: "Dashboard",
      path: "/national-dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "National Overview",
      path: "/national-overview",
      icon: BarChart3,
    },

    {
      name: "State Analytics",
      path: "/state-analytics",
      icon: Map,
    },

    

    {
      name: "Intervention Analytics",
      path: "/intervention-analytics",
      icon: HandHeart,
    },

    {
      name: "Reports",
      path: "/national-reports",
      icon: FileText,
    },

    {
      name: "System Monitoring",
      path: "/system-monitoring",
      icon: MonitorCog,
    },

    {
      name: "Settings",
      path: "/national-settings",
      icon: Settings,
    },
  ],
};

/* =========================================================
   ROLE NORMALIZER

   Login se agar:
   "state"
   ya
   "State Administrator"

   aaye, dono ko "state" banayega.
========================================================= */

function normalizeRole(
  storedRole: string | null
): Role {
  const value =
    (storedRole || "")
      .trim()
      .toLowerCase();

  if (
    value === "state" ||
    value === "state administrator" ||
    value === "state-admin" ||
    value === "state_admin"
  ) {
    return "state";
  }

  if (
    value === "counsellor" ||
    value === "counselor"
  ) {
    return "counsellor";
  }

  if (
    value === "national" ||
    value === "national administrator" ||
    value === "national-admin" ||
    value === "national_admin"
  ) {
    return "national";
  }

  return "district";
}

/* =========================================================
   MAIN SIDEBAR LAYOUT
========================================================= */

export default function SidebarLayout() {
  const [sidebarOpen, setSidebarOpen] =
    React.useState(false);

  const navigate = useNavigate();

  /* =====================================================
     GET CURRENT ROLE
  ===================================================== */

  const storedRole = localStorage.getItem(
    "samvedna_role"
  );

  const role = normalizeRole(storedRole);

  const menuItems =
    sidebarMenus[role];

  /* =====================================================
     USER INFORMATION
  ===================================================== */

  const userName =
    localStorage.getItem(
      "samvedna_user"
    ) || "Officer";

  const roleNames: Record<
    Role,
    string
  > = {
    district: "District Officer",
    counsellor: "Counsellor",
    state: "State Administrator",
    national: "National Administrator",
  };

  const roleName =
    roleNames[role];

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    localStorage.removeItem(
      "samvedna_authenticated"
    );

    localStorage.removeItem(
      "samvedna_role"
    );

    localStorage.removeItem(
      "samvedna_user"
    );

    navigate("/");
  };

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          w-72
          bg-slate-950
          text-white
          flex
          flex-col
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >

        {/* =================================================
            LOGO
        ================================================= */}

        <div
          className="
            h-20
            px-5
            flex
            items-center
            justify-between
            border-b
            border-slate-800
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-indigo-600
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <ShieldCheck size={22} />
            </div>

            <div>

              <h1 className="text-xl font-bold">
                SAMVEDNA
              </h1>

              <p className="text-[10px] text-slate-400">
                AI Victim Well-being Monitoring
              </p>

            </div>

          </div>

          {/* MOBILE CLOSE */}

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="
              lg:hidden
              p-2
              rounded-lg
              hover:bg-slate-800
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* =================================================
            ROLE
        ================================================= */}

        <div
          className="
            px-5
            py-4
            border-b
            border-slate-800
          "
        >

          <p
            className="
              text-[10px]
              uppercase
              tracking-wider
              text-slate-500
            "
          >
            Logged in as
          </p>

          <p
            className="
              text-sm
              font-semibold
              text-slate-200
              mt-1
            "
          >
            {roleName}
          </p>

        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav
          className="
            flex-1
            overflow-y-auto
            px-3
            py-4
            space-y-1
          "
        >

          {menuItems.map(
            (item) => {

              const Icon =
                item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={({
                    isActive,
                  }) =>
                    `
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all

                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                    `
                  }
                >

                  <Icon size={19} />

                  <span>
                    {item.name}
                  </span>

                </NavLink>
              );
            }
          )}

        </nav>

        {/* =================================================
            USER AREA
        ================================================= */}

        <div
          className="
            border-t
            border-slate-800
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-3
            "
          >

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-slate-800
                flex
                items-center
                justify-center
              "
            >

              <UserCircle
                size={22}
                className="text-slate-300"
              />

            </div>

            <div className="min-w-0">

              <p
                className="
                  text-sm
                  font-semibold
                  truncate
                "
              >
                {userName}
              </p>

              <p className="text-xs text-slate-500">
                {roleName}
              </p>

            </div>

          </div>

          {/* =================================================
              LOGOUT
          ================================================= */}

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-slate-800
              hover:bg-red-600
              text-slate-300
              hover:text-white
              transition
              text-sm
              font-medium
            "
          >

            <LogOut size={17} />

            Logout

          </button>

        </div>

      </aside>

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            lg:hidden
          "
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className="
          lg:ml-72
          min-h-screen
        "
      >

        {/* =================================================
            TOP HEADER
        ================================================= */}

        <header
          className="
            sticky
            top-0
            z-30
            h-20
            bg-white
            border-b
            border-slate-200
            flex
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-8
          "
        >

          {/* LEFT */}

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            {/* MOBILE MENU */}

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="
                lg:hidden
                p-2.5
                rounded-xl
                border
                border-slate-200
                bg-white
              "
            >

              <Menu size={22} />

            </button>

            <div>

              <h2
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                SAMVEDNA
              </h2>

              <p
                className="
                  text-xs
                  text-slate-500
                  hidden
                  sm:block
                "
              >
                AI-Powered Victim
                Well-being Monitoring
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            {/* SEARCH */}

            <button
              className="
                hidden
                sm:flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                border
                border-slate-200
                text-slate-500
              "
            >

              <Search size={17} />

              <span className="text-sm">
                Search
              </span>

            </button>

            {/* NOTIFICATION */}

            <button
              className="
                relative
                p-2.5
                rounded-xl
                hover:bg-slate-100
                text-slate-600
              "
            >

              <Bell size={20} />

              <span
                className="
                  absolute
                  top-1
                  right-1
                  w-2
                  h-2
                  rounded-full
                  bg-red-500
                "
              />

            </button>

          </div>

        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main
          className="
            p-4
            sm:p-6
            lg:p-6
          "
        >

          <Outlet />

        </main>

      </div>

    </div>
  );
}