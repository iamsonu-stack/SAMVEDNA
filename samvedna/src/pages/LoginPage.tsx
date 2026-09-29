import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  Building2,
  UserRound,
  MapPinned,
  Globe2,
  ArrowRight,
  CheckCircle2,
  UserPlus,
  X,
} from "lucide-react";

type Role = "district" | "counsellor" | "state" | "national";

type RoleConfig = {
  id: Role;
  title: string;
  description: string;
  icon: React.ElementType;
};

const roles: RoleConfig[] = [
  {
    id: "district",
    title: "District Officer",
    description: "District-level case monitoring",
    icon: MapPinned,
  },
  {
    id: "counsellor",
    title: "Counsellor",
    description: "Assigned victim support & follow-up",
    icon: UserRound,
  },
  {
    id: "state",
    title: "State Administrator",
    description: "State-wide monitoring & analytics",
    icon: Building2,
  },
  {
    id: "national",
    title: "National Administrator",
    description: "National aggregated monitoring",
    icon: Globe2,
  },
];

const districts = [
  "Indore",
  "Bhopal",
  "Ujjain",
  "Dewas",
  "Gwalior",
  "Jabalpur",
  "Sagar",
  "Rewa",
  "Ratlam",
  "Khargone",
];

const states = [
  "Madhya Pradesh",
  "Maharashtra",
  "Rajasthan",
  "Uttar Pradesh",
  "Gujarat",
  "Chhattisgarh",
  "Delhi",
  "Bihar",
];

export default function LoginPage() {
  const navigate = useNavigate();

  /* =====================================================
     LOGIN STATE
  ===================================================== */

  const [officialId, setOfficialId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<Role>("district");

  const [district, setDistrict] = React.useState("Indore");
  const [state, setState] = React.useState("Madhya Pradesh");

  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  /* =====================================================
     REGISTER STATE
  ===================================================== */

  const [showRegister, setShowRegister] = React.useState(false);

  const [registerName, setRegisterName] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [registerRole, setRegisterRole] =
    React.useState<Role>("district");

  const [registerDistrict, setRegisterDistrict] =
    React.useState("Indore");

  const [registerState, setRegisterState] =
    React.useState("Madhya Pradesh");

  const [registerError, setRegisterError] = React.useState("");
  const [registerSuccess, setRegisterSuccess] = React.useState("");

  /* =====================================================
     DASHBOARD ROUTE
  ===================================================== */

  const getDashboardRoute = (selectedRole: Role) => {
    switch (selectedRole) {
      case "district":
        return "/dashboard";

      case "counsellor":
        return "/counsellor-dashboard";

      case "state":
        return "/state-dashboard";

      case "national":
        return "/national-dashboard";

      default:
        return "/dashboard";
    }
  };

  /* =====================================================
     ROLE CHANGE
  ===================================================== */

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setError("");

    if (newRole === "district" || newRole === "counsellor") {
      setDistrict("Indore");
      setState("Madhya Pradesh");
    }

    if (newRole === "state") {
      setState("Madhya Pradesh");
    }
  };

  /* =====================================================
     REGISTER
  ===================================================== */

  const handleRegister = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setRegisterError("");
    setRegisterSuccess("");

    if (!registerName.trim()) {
      setRegisterError("Please enter your full name.");
      return;
    }

    if (!registerEmail.trim()) {
      setRegisterError("Please enter your email ID.");
      return;
    }

    if (!registerPassword.trim()) {
      setRegisterError("Please enter a password.");
      return;
    }

    if (registerPassword.length < 6) {
      setRegisterError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (registerPassword !== confirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    const registrationData = {
      name: registerName.trim(),
      email: registerEmail.trim(),
      role: registerRole,

      district:
        registerRole === "district" ||
        registerRole === "counsellor"
          ? registerDistrict
          : null,

      state: registerState,

      status: "pending_authorization",

      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "samvedna_registered_user",
      JSON.stringify(registrationData)
    );

    setRegisterSuccess(
      "Registration submitted successfully. Your account requires authorization."
    );

    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");
    setConfirmPassword("");
  };

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLogin = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const cleanOfficialId = officialId.trim();
    const cleanPassword = password.trim();

    if (!cleanOfficialId) {
      setError("Please enter your Official ID.");
      return;
    }

    if (!cleanPassword) {
      setError("Please enter your Password.");
      return;
    }

    if (
      (role === "district" || role === "counsellor") &&
      !district
    ) {
      setError("Please select your district.");
      return;
    }

    if (role === "state" && !state) {
      setError("Please select your state.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      /* ROLE */

      localStorage.setItem(
        "samvedna_role",
        role
      );

      /* USER */

      localStorage.setItem(
        "samvedna_user",
        cleanOfficialId
      );

      /* AUTH */

      localStorage.setItem(
        "samvedna_authenticated",
        "true"
      );

      /* DISTRICT */

      if (
        role === "district" ||
        role === "counsellor"
      ) {
        localStorage.setItem(
          "samvedna_district",
          district
        );
      } else {
        localStorage.removeItem(
          "samvedna_district"
        );
      }

      /* STATE */

      if (
        role === "state" ||
        role === "district" ||
        role === "counsellor"
      ) {
        localStorage.setItem(
          "samvedna_state",
          state
        );
      } else {
        localStorage.removeItem(
          "samvedna_state"
        );
      }

      /* COUNSELLOR */

      if (role === "counsellor") {
        localStorage.setItem(
          "samvedna_counsellor_id",
          `COUN-${cleanOfficialId}`
        );
      } else {
        localStorage.removeItem(
          "samvedna_counsellor_id"
        );
      }

      /* ROLE NAME */

      const roleNames: Record<Role, string> = {
        district: "District Officer",
        counsellor: "Counsellor",
        state: "State Administrator",
        national: "National Administrator",
      };

      localStorage.setItem(
        "samvedna_role_name",
        roleNames[role]
      );

      setLoading(false);

      navigate(
        getDashboardRoute(role),
        {
          replace: true,
        }
      );
    }, 500);
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">

      {/* TOP LINE */}

      <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600" />

      {/* BACKGROUND DECORATION */}

      <div className="
        absolute
        -top-32
        -left-32
        w-72
        h-72
        rounded-full
        bg-indigo-100/70
        blur-sm
      " />

      <div className="
        absolute
        -bottom-40
        -right-32
        w-80
        h-80
        rounded-full
        bg-indigo-100/60
        blur-sm
      " />

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="
        relative
        z-10
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        px-4
        py-5
        sm:py-6
      ">

        {/* =================================================
            BRAND
        ================================================= */}

        <div className="text-center mb-4">

          <div className="
            mx-auto
            w-12
            h-12
            rounded-xl
            bg-indigo-600
            text-white
            flex
            items-center
            justify-center
            shadow-lg
            shadow-indigo-200
          ">
            <ShieldCheck size={27} />
          </div>

          <h1 className="
            text-2xl
            sm:text-3xl
            font-bold
            tracking-tight
            text-indigo-950
            mt-2
          ">
            SAMVEDNA
          </h1>

          <p className="
            text-xs
            sm:text-sm
            text-slate-500
            mt-0.5
          ">
            AI Victim Well-being Monitoring
          </p>

        </div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="
          w-full
          max-w-[650px]
          bg-white
          rounded-2xl
          border
          border-slate-200
          shadow-xl
          shadow-slate-200/60
          px-5
          py-5
          sm:px-6
          sm:py-6
        ">

          {/* HEADER */}

          <div className="mb-4">

            <div className="flex items-center gap-2">

              <p className="
                text-xs
                font-semibold
                text-indigo-600
              ">
                SECURE GOVERNMENT ACCESS
              </p>

              <span className="
                w-1.5
                h-1.5
                rounded-full
                bg-emerald-500
              " />

            </div>

            <h2 className="
              text-2xl
              font-bold
              text-slate-900
              mt-1
            ">
              Welcome back
            </h2>

            <p className="
              text-sm
              text-slate-500
              mt-1
            ">
              Sign in to access the SAMVEDNA monitoring platform.
            </p>

          </div>

          {/* =================================================
              ROLE
          ================================================= */}

          <div className="mb-4">

            <label className="
              block
              text-xs
              font-semibold
              text-slate-700
              mb-2
            ">
              Select your role
            </label>

            <div className="
              grid
              grid-cols-2
              gap-2.5
            ">

              {roles.map((item) => {

                const Icon = item.icon;
                const selected = role === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      handleRoleChange(item.id)
                    }
                    className={`
                      text-left
                      p-3
                      rounded-xl
                      border
                      transition-all

                      ${
                        selected
                          ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                          : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50"
                      }

                      ${
                        loading
                          ? "opacity-60 cursor-not-allowed"
                          : "cursor-pointer"
                      }
                    `}
                  >

                    <div className="
                      flex
                      items-center
                      gap-2.5
                    ">

                      <div className={`
                        w-9
                        h-9
                        shrink-0
                        rounded-lg
                        flex
                        items-center
                        justify-center

                        ${
                          selected
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }
                      `}>
                        <Icon size={17} />
                      </div>

                      <div className="flex-1 min-w-0">

                        <div className="
                          flex
                          items-center
                          justify-between
                          gap-1
                        ">

                          <p className="
                            font-semibold
                            text-xs
                            sm:text-sm
                            text-slate-900
                          ">
                            {item.title}
                          </p>

                          {selected && (
                            <CheckCircle2
                              size={15}
                              className="text-indigo-600 shrink-0"
                            />
                          )}

                        </div>

                        <p className="
                          text-[10px]
                          sm:text-xs
                          text-slate-500
                          mt-0.5
                          leading-4
                        ">
                          {item.description}
                        </p>

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>

          {/* =================================================
              LOCATION
          ================================================= */}

          {(role === "district" ||
            role === "counsellor") && (

            <div className="mb-4">

              <div className="
                grid
                grid-cols-2
                gap-3
              ">

                {/* DISTRICT */}

                <div>

                  <label className="
                    block
                    text-xs
                    font-semibold
                    text-slate-700
                    mb-1.5
                  ">
                    {role === "counsellor"
                      ? "Assigned District"
                      : "District"}
                  </label>

                  <select
                    value={district}
                    onChange={(event) => {
                      setDistrict(event.target.value);
                      setError("");
                    }}
                    disabled={loading}
                    className="
                      w-full
                      px-3
                      py-2.5
                      rounded-lg
                      border
                      border-slate-300
                      bg-white
                      text-sm
                      text-slate-900
                      outline-none
                      focus:border-indigo-500
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  >
                    {districts.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                </div>

                {/* STATE */}

                <div>

                  <label className="
                    block
                    text-xs
                    font-semibold
                    text-slate-700
                    mb-1.5
                  ">
                    State
                  </label>

                  <select
                    value={state}
                    onChange={(event) =>
                      setState(event.target.value)
                    }
                    disabled={loading}
                    className="
                      w-full
                      px-3
                      py-2.5
                      rounded-lg
                      border
                      border-slate-300
                      bg-white
                      text-sm
                      text-slate-900
                      outline-none
                      focus:border-indigo-500
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  >
                    {states.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

              <p className="
                text-[10px]
                text-slate-400
                mt-1.5
              ">
                {role === "counsellor"
                  ? "You will only see cases assigned to you within this district."
                  : "You will see all monitored cases registered within this district."}
              </p>

            </div>
          )}

          {/* =================================================
              STATE ADMIN
          ================================================= */}

          {role === "state" && (

            <div className="mb-4">

              <label className="
                block
                text-xs
                font-semibold
                text-slate-700
                mb-1.5
              ">
                Select State
              </label>

              <select
                value={state}
                onChange={(event) =>
                  setState(event.target.value)
                }
                disabled={loading}
                className="
                  w-full
                  px-3
                  py-2.5
                  rounded-lg
                  border
                  border-slate-300
                  bg-white
                  text-sm
                  outline-none
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-100
                "
              >
                {states.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <p className="
                text-[10px]
                text-slate-400
                mt-1.5
              ">
                State administrators see aggregated data for the selected state.
              </p>

            </div>
          )}

          {/* =================================================
              NATIONAL ADMIN
          ================================================= */}

          {role === "national" && (

            <div className="
              mb-4
              p-3
              rounded-lg
              bg-indigo-50
              border
              border-indigo-100
            ">

              <div className="flex gap-2.5">

                <Globe2
                  size={18}
                  className="
                    text-indigo-600
                    mt-0.5
                    shrink-0
                  "
                />

                <div>

                  <p className="
                    text-xs
                    font-semibold
                    text-indigo-900
                  ">
                    National Administrator Access
                  </p>

                  <p className="
                    text-[10px]
                    text-indigo-700
                    mt-0.5
                    leading-4
                  ">
                    Access is limited to aggregated national and state-level monitoring data.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form
            onSubmit={handleLogin}
            className="space-y-3.5"
          >

            {/* OFFICIAL ID */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-slate-700
                mb-1.5
              ">
                {role === "counsellor"
                  ? "Counsellor ID"
                  : "Official ID"}
              </label>

              <input
                type="text"
                value={officialId}
                onChange={(event) => {
                  setOfficialId(event.target.value);
                  setError("");
                }}
                placeholder={
                  role === "counsellor"
                    ? "Enter counsellor ID"
                    : "Enter your official ID"
                }
                autoComplete="username"
                disabled={loading}
                className="
                  w-full
                  px-3
                  py-2.5
                  rounded-lg
                  border
                  border-slate-300
                  bg-white
                  text-sm
                  outline-none
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-100
                "
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-slate-700
                mb-1.5
              ">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="
                    w-full
                    px-3
                    py-2.5
                    pr-11
                    rounded-lg
                    border
                    border-slate-300
                    bg-white
                    text-sm
                    outline-none
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  disabled={loading}
                  className="
                    absolute
                    right-2.5
                    top-1/2
                    -translate-y-1/2
                    p-1
                    text-slate-400
                    hover:text-slate-600
                  "
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </div>

            {/* ERROR */}

            {error && (

              <div className="
                p-2.5
                rounded-lg
                bg-red-50
                border
                border-red-200
                text-xs
                text-red-700
              ">
                {error}
              </div>

            )}

            {/* LOGIN */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-2.5
                rounded-lg
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
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >

              {loading ? (
                <>
                  <span className="
                    w-4
                    h-4
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                    animate-spin
                  " />

                  Signing in...
                </>
              ) : (
                <>
                  <LockKeyhole size={16} />
                  Secure Login
                  <ArrowRight size={15} />
                </>
              )}

            </button>

            {/* REGISTER */}

            <button
              type="button"
              onClick={() => {
                setShowRegister(true);
                setRegisterError("");
                setRegisterSuccess("");
              }}
              disabled={loading}
              className="
                w-full
                py-2.5
                rounded-lg
                border
                border-slate-200
                bg-white
                hover:bg-slate-50
                text-slate-700
                text-sm
                font-semibold
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <UserPlus size={16} />
              Create Account / Register
              <ArrowRight size={15} />
            </button>

            {/* VICTIM LOGIN */}

            <button
              type="button"
              onClick={() =>
                navigate("/victim-login")
              }
              disabled={loading}
              className="
                w-full
                py-2.5
                rounded-lg
                border
                border-indigo-200
                bg-indigo-50
                hover:bg-indigo-100
                text-indigo-700
                text-sm
                font-semibold
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <UserRound size={16} />
              Victim / Complainant Login
              <ArrowRight size={15} />
            </button>

            <p className="
              text-center
              text-[10px]
              text-slate-400
            ">
              Optional access for well-being check-ins and support updates.
            </p>

          </form>

          {/* =================================================
              SECURITY
          ================================================= */}

          <div className="
            mt-4
            p-3
            rounded-lg
            bg-slate-50
            border
            border-slate-200
            flex
            items-start
            gap-2.5
          ">

            <ShieldCheck
              size={18}
              className="
                text-emerald-600
                mt-0.5
                shrink-0
              "
            />

            <div>

              <p className="
                text-xs
                font-semibold
                text-slate-700
              ">
                Secure Government Access
              </p>

              <p className="
                text-[10px]
                text-slate-500
                mt-0.5
                leading-4
              ">
                Prototype authentication for authorized personnel.
                Access to sensitive case information is role-controlled.
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="
          text-center
          mt-3
        ">

          <p className="
            text-[10px]
            text-slate-400
          ">
            Demo environment • Mock authentication
          </p>

          <p className="
            text-[10px]
            text-slate-400
            mt-0.5
          ">
            SAMVEDNA • TechTrack • SIH Prototype
          </p>

        </div>

      </div>

      {/* =====================================================
          REGISTER MODAL
      ===================================================== */}

      {showRegister && (

        <div className="
          fixed
          inset-0
          z-[100]
          bg-slate-950/60
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-4
        ">

          <div className="
            w-full
            max-w-lg
            max-h-[90vh]
            overflow-y-auto
            bg-white
            rounded-2xl
            shadow-2xl
            border
            border-slate-200
          ">

            {/* MODAL HEADER */}

            <div className="
              flex
              items-center
              justify-between
              p-4
              border-b
              border-slate-200
            ">

              <div>

                <h3 className="
                  text-lg
                  font-bold
                  text-slate-900
                ">
                  Create Account
                </h3>

                <p className="
                  text-xs
                  text-slate-500
                  mt-0.5
                ">
                  Submit your details for authorization.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowRegister(false)
                }
                className="
                  p-2
                  rounded-lg
                  hover:bg-slate-100
                  text-slate-500
                "
              >
                <X size={19} />
              </button>

            </div>

            {/* MODAL FORM */}

            <form
              onSubmit={handleRegister}
              className="p-4 space-y-3"
            >

              {/* NAME */}

              <div>

                <label className="
                  block
                  text-xs
                  font-semibold
                  text-slate-700
                  mb-1.5
                ">
                  Full Name
                </label>

                <input
                  type="text"
                  value={registerName}
                  onChange={(event) =>
                    setRegisterName(event.target.value)
                  }
                  placeholder="Enter full name"
                  className="
                    w-full
                    px-3
                    py-2.5
                    rounded-lg
                    border
                    border-slate-300
                    text-sm
                    outline-none
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="
                  block
                  text-xs
                  font-semibold
                  text-slate-700
                  mb-1.5
                ">
                  Official Email
                </label>

                <input
                  type="email"
                  value={registerEmail}
                  onChange={(event) =>
                    setRegisterEmail(event.target.value)
                  }
                  placeholder="official@example.gov.in"
                  className="
                    w-full
                    px-3
                    py-2.5
                    rounded-lg
                    border
                    border-slate-300
                    text-sm
                    outline-none
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                />

              </div>

              {/* ROLE */}

              <div>

                <label className="
                  block
                  text-xs
                  font-semibold
                  text-slate-700
                  mb-1.5
                ">
                  Requested Role
                </label>

                <select
                  value={registerRole}
                  onChange={(event) =>
                    setRegisterRole(
                      event.target.value as Role
                    )
                  }
                  className="
                    w-full
                    px-3
                    py-2.5
                    rounded-lg
                    border
                    border-slate-300
                    bg-white
                    text-sm
                  "
                >

                  {roles.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.title}
                    </option>
                  ))}

                </select>

              </div>

              {/* LOCATION */}

              {(registerRole === "district" ||
                registerRole === "counsellor") && (

                <div className="
                  grid
                  grid-cols-2
                  gap-3
                ">

                  <div>

                    <label className="
                      block
                      text-xs
                      font-semibold
                      text-slate-700
                      mb-1.5
                    ">
                      District
                    </label>

                    <select
                      value={registerDistrict}
                      onChange={(event) =>
                        setRegisterDistrict(
                          event.target.value
                        )
                      }
                      className="
                        w-full
                        px-3
                        py-2.5
                        rounded-lg
                        border
                        border-slate-300
                        bg-white
                        text-sm
                      "
                    >
                      {districts.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                  </div>

                  <div>

                    <label className="
                      block
                      text-xs
                      font-semibold
                      text-slate-700
                      mb-1.5
                    ">
                      State
                    </label>

                    <select
                      value={registerState}
                      onChange={(event) =>
                        setRegisterState(
                          event.target.value
                        )
                      }
                      className="
                        w-full
                        px-3
                        py-2.5
                        rounded-lg
                        border
                        border-slate-300
                        bg-white
                        text-sm
                      "
                    >
                      {states.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                  </div>

                </div>
              )}

              {/* STATE ADMIN */}

              {registerRole === "state" && (

                <div>

                  <label className="
                    block
                    text-xs
                    font-semibold
                    text-slate-700
                    mb-1.5
                  ">
                    State
                  </label>

                  <select
                    value={registerState}
                    onChange={(event) =>
                      setRegisterState(
                        event.target.value
                      )
                    }
                    className="
                      w-full
                      px-3
                      py-2.5
                      rounded-lg
                      border
                      border-slate-300
                      bg-white
                      text-sm
                    "
                  >
                    {states.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                </div>
              )}

              {/* PASSWORD */}

              <div>

                <label className="
                  block
                  text-xs
                  font-semibold
                  text-slate-700
                  mb-1.5
                ">
                  Password
                </label>

                <input
                  type="password"
                  value={registerPassword}
                  onChange={(event) =>
                    setRegisterPassword(
                      event.target.value
                    )
                  }
                  placeholder="Create password"
                  className="
                    w-full
                    px-3
                    py-2.5
                    rounded-lg
                    border
                    border-slate-300
                    text-sm
                  "
                />

              </div>

              {/* CONFIRM */}

              <div>

                <label className="
                  block
                  text-xs
                  font-semibold
                  text-slate-700
                  mb-1.5
                ">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Confirm password"
                  className="
                    w-full
                    px-3
                    py-2.5
                    rounded-lg
                    border
                    border-slate-300
                    text-sm
                  "
                />

              </div>

              {/* ERROR */}

              {registerError && (

                <div className="
                  p-2.5
                  rounded-lg
                  bg-red-50
                  border
                  border-red-200
                  text-xs
                  text-red-700
                ">
                  {registerError}
                </div>

              )}

              {/* SUCCESS */}

              {registerSuccess && (

                <div className="
                  p-2.5
                  rounded-lg
                  bg-emerald-50
                  border
                  border-emerald-200
                  text-xs
                  text-emerald-700
                ">
                  {registerSuccess}
                </div>

              )}

              {/* SUBMIT */}

              <button
                type="submit"
                className="
                  w-full
                  py-2.5
                  rounded-lg
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  text-sm
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <UserPlus size={16} />
                Submit Registration
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}