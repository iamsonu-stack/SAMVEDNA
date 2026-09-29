import React, { useState } from "react";
import {
  Activity,
  Server,
  Database,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  ChevronRight,
} from "lucide-react";

type Status = "Operational" | "Warning";

const systemServices = [
  {
    name: "SAMVEDNA Application",
    description: "Main administrative dashboard",
    status: "Operational" as Status,
    uptime: "99.9%",
    icon: Activity,
  },
  {
    name: "Authentication",
    description: "Login and role-based access",
    status: "Operational" as Status,
    uptime: "99.8%",
    icon: ShieldCheck,
  },
  {
    name: "Case Management API",
    description: "Case and monitoring services",
    status: "Operational" as Status,
    uptime: "99.7%",
    icon: Server,
  },
  {
    name: "Database",
    description: "Application data storage",
    status: "Operational" as Status,
    uptime: "99.9%",
    icon: Database,
  },
  {
    name: "AI Analysis Engine",
    description: "Distress analysis and prediction",
    status: "Operational" as Status,
    uptime: "98.9%",
    icon: Cpu,
  },
  {
    name: "Communication Gateway",
    description: "SMS, IVRS and communication channels",
    status: "Warning" as Status,
    uptime: "97.8%",
    icon: Wifi,
  },
];

export default function SystemMonitoringPage() {
  const [checking, setChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState("Just now");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const operationalServices = systemServices.filter(
    (service) => service.status === "Operational"
  ).length;

  const warningServices = systemServices.filter(
    (service) => service.status === "Warning"
  ).length;

  const runHealthCheck = () => {
    setChecking(true);

    setTimeout(() => {
      setChecking(false);
      setLastChecked("Just now");
    }, 1000);
  };

  return (
    <div className="w-full space-y-6">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

        <div>

          <div className="flex items-center gap-2 mb-2">

            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Activity
                size={20}
                className="text-indigo-600"
              />
            </div>

            <span className="text-sm font-semibold text-indigo-600">
              National Administration
            </span>

          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            System Monitoring
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Monitor SAMVEDNA platform health and system services.
          </p>

        </div>

        <button
          type="button"
          onClick={runHealthCheck}
          disabled={checking}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-60 transition"
        >

          <RefreshCw
            size={17}
            className={checking ? "animate-spin" : ""}
          />

          {checking ? "Checking..." : "Run Health Check"}

        </button>

      </div>


      {/* OVERALL STATUS */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">

              <CheckCircle2
                size={24}
                className="text-emerald-600"
              />

            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                All Core Systems Operational
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                SAMVEDNA services are currently available.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">

            <Clock size={16} />

            Last checked:

            <span className="font-semibold text-slate-700">
              {lastChecked}
            </span>

          </div>

        </div>

      </div>


      {/* KPI */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <MetricCard
          title="Operational"
          value={operationalServices}
          subtitle={`of ${systemServices.length} services`}
          icon={CheckCircle2}
          bg="bg-emerald-50"
          color="text-emerald-600"
        />

        <MetricCard
          title="Warnings"
          value={warningServices}
          subtitle="Requires monitoring"
          icon={AlertTriangle}
          bg="bg-amber-50"
          color="text-amber-600"
        />

        <MetricCard
          title="Overall Uptime"
          value="99.2%"
          subtitle="Prototype availability"
          icon={Activity}
          bg="bg-indigo-50"
          color="text-indigo-600"
        />

        <MetricCard
          title="System Load"
          value="42%"
          subtitle="Current infrastructure load"
          icon={Cpu}
          bg="bg-purple-50"
          color="text-purple-600"
        />

      </div>


      {/* INFRASTRUCTURE */}

      <div>

        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Infrastructure Health
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <HealthCard
            title="CPU Usage"
            value="42%"
            status="Normal"
            icon={Cpu}
          />

          <HealthCard
            title="Database"
            value="38%"
            status="Healthy"
            icon={Database}
          />

          <HealthCard
            title="Storage"
            value="54%"
            status="Normal"
            icon={HardDrive}
          />

        </div>

      </div>


      {/* SERVICES */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 border-b border-slate-200">

          <h2 className="text-lg font-bold text-slate-900">
            System Services
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Current health status of SAMVEDNA services
          </p>

        </div>


        <div>

          {systemServices.map((service) => {

            const Icon = service.icon;

            return (
              <div
                key={service.name}
                className="p-5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">

                      <Icon
                        size={20}
                        className="text-slate-600"
                      />

                    </div>

                    <div>

                      <h3 className="text-sm font-bold text-slate-900">
                        {service.name}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        {service.description}
                      </p>

                    </div>

                  </div>


                  <div className="flex items-center gap-5">

                    <div className="hidden sm:block text-right">

                      <p className="text-[11px] text-slate-400">
                        Uptime
                      </p>

                      <p className="text-sm font-bold text-slate-700">
                        {service.uptime}
                      </p>

                    </div>


                    <StatusBadge
                      status={service.status}
                    />


                    <button
                      type="button"
                      onClick={() =>
                        setSelectedService(service.name)
                      }
                      className="p-2 rounded-lg hover:bg-slate-200 text-slate-500"
                    >

                      <ChevronRight size={17} />

                    </button>

                  </div>

                </div>


                {selectedService === service.name && (
                  <div className="mt-4 ml-0 md:ml-15 p-4 rounded-xl bg-indigo-50 border border-indigo-100">

                    <p className="text-sm font-semibold text-indigo-900">
                      Service Details
                    </p>

                    <p className="text-xs text-indigo-700 mt-1">
                      {service.name} is being monitored as part of the
                      SAMVEDNA prototype infrastructure.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedService(null)
                      }
                      className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      Close details
                    </button>

                  </div>
                )}

              </div>
            );

          })}

        </div>

      </div>


      {/* RECENT EVENTS */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

        <div className="p-5 border-b border-slate-200">

          <h2 className="text-lg font-bold text-slate-900">
            Recent System Activity
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Latest platform health events
          </p>

        </div>


        <div className="p-5 space-y-4">

          <EventRow
            title="Daily system health check completed"
            time="Today, 10:30 AM"
            warning={false}
          />

          <EventRow
            title="Database backup completed successfully"
            time="Today, 09:45 AM"
            warning={false}
          />

          <EventRow
            title="Communication gateway response delay detected"
            time="Today, 08:20 AM"
            warning={true}
          />

          <EventRow
            title="Authentication service verified"
            time="Today, 08:00 AM"
            warning={false}
          />

        </div>

      </div>


      {/* PROTOTYPE NOTICE */}

      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">

        <div className="flex items-start gap-3">

          <ShieldCheck
            size={19}
            className="text-indigo-600 mt-0.5"
          />

          <div>

            <p className="text-sm font-semibold text-indigo-900">
              Prototype System Monitoring
            </p>

            <p className="text-xs text-indigo-700 mt-1 leading-5">
              The system health values shown on this page are
              simulated demo data for the SIH prototype.
              They do not represent real production infrastructure.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  bg,
  color,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  bg: string;
  color: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-2">
            {value}
          </p>

        </div>

        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}
        >

          <Icon
            size={19}
            className={color}
          />

        </div>

      </div>

      <p className="text-xs text-slate-400 mt-3">
        {subtitle}
      </p>

    </div>
  );
}


/* =========================================================
   HEALTH CARD
========================================================= */

function HealthCard({
  title,
  value,
  status,
  icon: Icon,
}: {
  title: string;
  value: string;
  status: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">

          <Icon
            size={19}
            className="text-indigo-600"
          />

        </div>

        <div>

          <p className="text-sm font-semibold text-slate-800">
            {title}
          </p>

          <p className="text-xs text-slate-500">
            Infrastructure metric
          </p>

        </div>

      </div>


      <div className="mt-5">

        <div className="flex items-center justify-between">

          <span className="text-2xl font-bold text-slate-900">
            {value}
          </span>

          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            {status}
          </span>

        </div>


        <div className="mt-3 w-full h-2 bg-slate-100 rounded-full overflow-hidden">

          <div
            className="h-full bg-indigo-500 rounded-full"
            style={{
              width: value,
            }}
          />

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: Status;
}) {
  if (status === "Warning") {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">

        <span className="w-2 h-2 rounded-full bg-amber-500" />

        Warning

      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">

      <span className="w-2 h-2 rounded-full bg-emerald-500" />

      Operational

    </span>
  );
}


/* =========================================================
   EVENT ROW
========================================================= */

function EventRow({
  title,
  time,
  warning,
}: {
  title: string;
  time: string;
  warning: boolean;
}) {
  return (
    <div className="flex items-center gap-4">

      <div
        className={
          warning
            ? "w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center"
            : "w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center"
        }
      >

        {warning ? (
          <AlertTriangle
            size={17}
            className="text-amber-600"
          />
        ) : (
          <CheckCircle2
            size={17}
            className="text-emerald-600"
          />
        )}

      </div>

      <div className="flex-1">

        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="text-xs text-slate-400 mt-1">
          {time}
        </p>

      </div>

      <span
        className={
          warning
            ? "text-xs font-semibold text-amber-600"
            : "text-xs font-semibold text-emerald-600"
        }
      >
        {warning ? "Warning" : "Healthy"}
      </span>

    </div>
  );
}