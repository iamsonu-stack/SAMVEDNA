import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// Middleware
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// PostgreSQL Connection
// ==========================================

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "samvedna_db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
});

// ==========================================
// PostgreSQL Connection Test
// ==========================================

pool.query("SELECT NOW()")
  .then(() => {
    console.log("PostgreSQL connected successfully");
  })
  .catch((error) => {
    console.error("PostgreSQL connection failed:", error.message);
  });

// ==========================================
// Health Check
// ==========================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SAMVEDNA backend is running",
    database: "PostgreSQL",
  });
});

// ==========================================
// PostgreSQL DB Test
// ==========================================

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");

    res.json({
      success: true,
      message: "PostgreSQL connection successful",
      database: "samvedna_db",
      time: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Database test error:", error);

    res.status(500).json({
      success: false,
      message: "PostgreSQL connection failed",
      error: error.message,
    });
  }
});

// ==========================================
// Get Cases from SAMVEDNA PostgreSQL
// ==========================================

app.get("/api/cases", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        case_id AS "caseId",
        victim_id AS "victimId",
        victim_name AS "victimName",
        phone,
        district,
        state,
        case_type AS "caseType",
        registration_date AS "registrationDate",
        status,
        source,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM cases
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      source: "SAMVEDNA-POSTGRESQL",
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get cases error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load cases from PostgreSQL",
      error: error.message,
    });
  }
});

// ==========================================
// Get Single Case
// ==========================================

app.get("/api/cases/:caseId", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        case_id AS "caseId",
        victim_id AS "victimId",
        victim_name AS "victimName",
        phone,
        district,
        state,
        case_type AS "caseType",
        registration_date AS "registrationDate",
        status,
        source,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM cases
      WHERE case_id = $1
      `,
      [req.params.caseId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Get single case error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load case",
      error: error.message,
    });
  }
});

// ==========================================
// Sync CCTNS Cases → SAMVEDNA PostgreSQL
// ==========================================

app.get("/api/sync-cctns", async (req, res) => {
  try {
    console.log("Fetching cases from CCTNS...");

    const response = await fetch("http://localhost:5001/api/cases");

    if (!response.ok) {
      throw new Error(
        `CCTNS API returned status ${response.status}`
      );
    }

    const cctnsResponse = await response.json();

    if (!cctnsResponse.success || !Array.isArray(cctnsResponse.data)) {
      throw new Error("Invalid response from CCTNS API");
    }

    const cases = cctnsResponse.data;

    let syncedCount = 0;

    for (const caseData of cases) {
      await pool.query(
        `
        INSERT INTO cases (
          case_id,
          victim_id,
          victim_name,
          phone,
          district,
          state,
          case_type,
          registration_date,
          status,
          source,
          updated_at
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          CURRENT_TIMESTAMP
        )
        ON CONFLICT (case_id)
        DO UPDATE SET
          victim_id = EXCLUDED.victim_id,
          victim_name = EXCLUDED.victim_name,
          phone = EXCLUDED.phone,
          district = EXCLUDED.district,
          state = EXCLUDED.state,
          case_type = EXCLUDED.case_type,
          registration_date = EXCLUDED.registration_date,
          status = EXCLUDED.status,
          source = EXCLUDED.source,
          updated_at = CURRENT_TIMESTAMP
        `,
        [
          caseData.caseId,
          caseData.victimId,
          caseData.victimName,
          caseData.phone,
          caseData.district,
          caseData.state,
          caseData.caseType,
          caseData.registrationDate,
          caseData.status,
          "CCTNS",
        ]
      );

      syncedCount++;
    }

    res.json({
      success: true,
      message: "CCTNS cases synced successfully",
      syncedCount,
    });
  } catch (error) {
    console.error("CCTNS sync error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to sync cases from CCTNS",
      error: error.message,
    });
  }
});

// ==========================================
// Root
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "SAMVEDNA Backend",
    status: "running",
  });
});

// ==========================================
// Start Server
// ==========================================

app.listen(PORT, () => {
  console.log(
    `SAMVEDNA backend running at http://localhost:${PORT}`
  );
});