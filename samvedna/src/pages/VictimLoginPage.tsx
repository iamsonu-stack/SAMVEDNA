function VictimLoginPage() {
  const navigate = useNavigate();

  const [victimId, setVictimId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!victimId.trim()) {
      setError("Please enter your Victim / Complainant ID.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

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
    <div className="min-h-screen bg-slate-50 flex">

      {/* LEFT INFORMATION PANEL */}

      <div className="hidden lg:flex lg:w-1/2 bg-slate-950 text-white p-12 flex-col justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
              <span className="text-2xl font-bold">
                S
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                SAMVEDNA
              </h1>

              <p className="text-xs text-slate-400">
                Victim Well-being Monitoring
              </p>
            </div>

          </div>

          <div className="mt-20 max-w-lg">

            <p className="text-sm font-semibold text-indigo-400">
              YOUR WELL-BEING MATTERS
            </p>

            <h2 className="text-4xl font-bold leading-tight mt-4">
              Stay connected with your
              well-being support.
            </h2>

            <p className="text-slate-400 mt-6 leading-7">
              SAMVEDNA provides optional well-being
              check-ins and helps authorized support
              personnel understand changing distress
              indicators over time.
            </p>

          </div>

          {/* FEATURES */}

          <div className="mt-10 space-y-4">

            <InfoItem
              title="Simple Check-ins"
              text="Answer short well-being questions when requested."
            />

            <InfoItem
              title="Multiple Communication Channels"
              text="Check-ins may also be collected through approved channels."
            />

            <InfoItem
              title="Human Support"
              text="Important indicators can be reviewed by authorized personnel."
            />

          </div>

        </div>

        <div className="text-xs text-slate-500">
          SAMVEDNA • TechTrack • SIH Prototype
        </div>

      </div>

      {/* LOGIN PANEL */}

      <div className="w-full lg:w-1/2 flex items-center justify-center p-5 sm:p-8">

        <div className="w-full max-w-md">

          {/* MOBILE LOGO */}

          <div className="lg:hidden text-center mb-8">

            <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">

              <span className="text-2xl font-bold">
                S
              </span>

            </div>

            <h1 className="text-2xl font-bold text-slate-900 mt-3">
              SAMVEDNA
            </h1>

          </div>

          {/* LOGIN CARD */}

          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-7 sm:p-9">

            <div className="mb-7">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                Victim / Complainant Access
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-4">
                Welcome back
              </h2>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Sign in to view your well-being check-ins
                and available support updates.
              </p>

            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              {/* VICTIM ID */}

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
                    py-3.5
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    text-slate-900
                    outline-none
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-100
                    transition
                  "
                />

              </div>

              {/* PASSWORD */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
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
                    className="
                      w-full
                      px-4
                      py-3.5
                      pr-20
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      text-slate-900
                      outline-none
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-100
                      transition
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-xs
                      font-semibold
                      text-indigo-600
                    "
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

              </div>

              {/* ERROR */}

              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200">

                  <p className="text-sm text-red-700">
                    {error}
                  </p>

                </div>
              )}

              {/* LOGIN */}

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
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >
                Continue to SAMVEDNA
              </button>

            </form>

            {/* OPTIONAL ACCESS NOTICE */}

            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100">

              <p className="text-xs font-semibold text-amber-800">
                Optional victim access
              </p>

              <p className="text-xs text-amber-700 mt-1 leading-5">
                Victims are not required to continuously
                use this website. Well-being check-ins may
                also be collected through approved SMS,
                IVRS, phone or other communication channels.
              </p>

            </div>

            {/* BACK */}

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
                transition
              "
            >
              ← Back to Official Login
            </button>

            <div className="flex items-center justify-center gap-2 mt-6">

              <span className="w-2 h-2 rounded-full bg-emerald-500" />

              <p className="text-xs text-slate-400">
                Secure prototype access
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}