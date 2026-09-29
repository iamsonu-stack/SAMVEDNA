import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const API_URL = "http://localhost:5001";

type CaseForm = {
  victimId: string;
  victimName: string;
  phone: string;
  state: string;
  district: string;
  caseType: string;
  registrationDate: string;
  status: string;
};

type CaseItem = CaseForm & {
  caseId: string;
};

function App() {
  const [form, setForm] = React.useState<CaseForm>({
    victimId: "",
    victimName: "",
    phone: "",
    state: "Madhya Pradesh",
    district: "",
    caseType: "",
    registrationDate: new Date().toISOString().split("T")[0],
    status: "Registered",
  });

  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [cases, setCases] = React.useState<CaseItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingCases, setLoadingCases] = React.useState(true);

  // Load all registered cases from CCTNS backend
  async function loadCases() {
    try {
      setLoadingCases(true);
      setError("");

      const response = await fetch(`${API_URL}/api/cases`);

      if (!response.ok) {
        throw new Error("Unable to fetch cases");
      }

      const result = await response.json();

      setCases(result.data || []);
    } catch (error) {
      console.error(error);
      setError(
        "Unable to load registered cases. Make sure CCTNS backend is running."
      );
    } finally {
      setLoadingCases(false);
    }
  }

  // Load cases when page opens
  React.useEffect(() => {
    loadCases();
  }, []);

  // Handle form input changes
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setMessage("");
    setError("");
  }

  // Register new case
  async function registerCase(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/cases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to register case");
      }

      // Add newly registered case immediately to the table
      setCases((previousCases) => [
        ...previousCases,
        result.data,
      ]);

      setMessage(
        `Case ${result.data.caseId} registered successfully.`
      );

      // Reset form
      setForm({
        victimId: "",
        victimName: "",
        phone: "",
        state: "Madhya Pradesh",
        district: "",
        caseType: "",
        registrationDate: new Date()
          .toISOString()
          .split("T")[0],
        status: "Registered",
      });

      // Reload from backend to keep frontend synchronized
      await loadCases();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to register case. Check CCTNS backend."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      {/* HEADER */}
      <header>
        <p className="eyebrow">
          TechTrack • Demo Source System
        </p>

        <h1>CCTNS Mock</h1>

        <p>
          Case registration and case information source
          for SAMVEDNA.
        </p>
      </header>

      {/* REGISTER CASE */}
      <section className="card">
        <h2>Register New Case</h2>

        <form
          onSubmit={registerCase}
          className="form"
        >
          {/* Victim ID */}
          <input
            name="victimId"
            placeholder="Victim ID"
            value={form.victimId}
            onChange={handleChange}
            required
          />

          {/* Victim Name */}
          <input
            name="victimName"
            placeholder="Victim Name"
            value={form.victimName}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          {/* State */}
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
          >
            <option>Madhya Pradesh</option>
            <option>Delhi</option>
            <option>Rajasthan</option>
            <option>Uttar Pradesh</option>
          </select>

          {/* District */}
          <input
            name="district"
            placeholder="District"
            value={form.district}
            onChange={handleChange}
            required
          />

          {/* Case Type */}
          <select
            name="caseType"
            value={form.caseType}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Case Type
            </option>

            <option>Atrocity</option>
            <option>Threat / Intimidation</option>
            <option>Accident</option>
            <option>Sexual Violence</option>
            <option>Assault</option>
            <option>Other</option>
          </select>

          {/* Registration Date */}
          <input
            type="date"
            name="registrationDate"
            value={form.registrationDate}
            onChange={handleChange}
            required
          />

          {/* Status */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Registered</option>
            <option>Investigation</option>
            <option>Trial</option>
            <option>Closed</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Register Case"}
          </button>
        </form>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="success">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="error">
            {error}
          </div>
        )}
      </section>

      {/* REGISTERED CASES */}
      <section className="card">
        <div className="section-header">
          <div>
            <h2>Registered Cases</h2>

            <p>
              Cases received from CCTNS Mock API
            </p>
          </div>

          <button
            type="button"
            onClick={loadCases}
            className="refresh-button"
            disabled={loadingCases}
          >
            {loadingCases
              ? "Loading..."
              : "Refresh"}
          </button>
        </div>

        <div className="table-wrap">
          {loadingCases ? (
            <div className="empty">
              Loading registered cases...
            </div>
          ) : cases.length === 0 ? (
            <div className="empty">
              No registered cases found.
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Victim ID</th>
                  <th>Victim Name</th>
                  <th>Phone</th>
                  <th>State</th>
                  <th>District</th>
                  <th>Case Type</th>
                  <th>Registration Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {cases.map((item) => (
                  <tr key={item.caseId}>
                    <td>
                      <strong>
                        {item.caseId}
                      </strong>
                    </td>

                    <td>
                      {item.victimId}
                    </td>

                    <td>
                      {item.victimName}
                    </td>

                    <td>
                      {item.phone}
                    </td>

                    <td>
                      {item.state}
                    </td>

                    <td>
                      {item.district}
                    </td>

                    <td>
                      {item.caseType}
                    </td>

                    <td>
                      {item.registrationDate}
                    </td>

                    <td>
                      <span className="status">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);