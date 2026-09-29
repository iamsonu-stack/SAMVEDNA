import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());


// ===============================
// HEALTH CHECK
// ===============================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CCTNS Backend is running"
  });
});


// ===============================
// DATABASE TEST
// ===============================

app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT 1 AS database_connected"
    );

    res.json({
      success: true,
      message: "MySQL connected successfully",
      data: rows
    });

  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message
    });
  }
});


// ===============================
// GET ALL CASES
// ===============================

app.get("/api/cases", async (req, res) => {
  try {

    const [rows] = await pool.query(`
      SELECT
        c.case_id AS caseId,
        v.victim_id AS victimId,
        v.name AS victimName,
        v.phone AS phone,
        v.district AS district,
        v.state AS state,
        c.case_type AS caseType,
        DATE_FORMAT(c.registration_date, '%Y-%m-%d')
          AS registrationDate,
        c.status AS status
      FROM cases c
      JOIN victims v
        ON c.victim_id = v.victim_id
      ORDER BY c.registration_date DESC
    `);

    res.json({
      success: true,
      source: "CCTNS-MYSQL",
      count: rows.length,
      data: rows
    });

  } catch (error) {

    console.error("Error fetching cases:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cases",
      error: error.message
    });

  }
});


// ===============================
// GET ONE CASE
// ===============================

app.get("/api/cases/:caseId", async (req, res) => {

  try {

    const { caseId } = req.params;

    const [rows] = await pool.query(`
      SELECT
        c.case_id AS caseId,
        v.victim_id AS victimId,
        v.name AS victimName,
        v.phone AS phone,
        v.district AS district,
        v.state AS state,
        c.case_type AS caseType,
        DATE_FORMAT(c.registration_date, '%Y-%m-%d')
          AS registrationDate,
        c.status AS status
      FROM cases c
      JOIN victims v
        ON c.victim_id = v.victim_id
      WHERE c.case_id = ?
    `, [caseId]);

    if (rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Case not found"
      });

    }

    res.json({
      success: true,
      data: rows[0]
    });

  } catch (error) {

    console.error("Error fetching case:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch case",
      error: error.message
    });

  }

});


// ===============================
// ADD NEW CASE
// ===============================

app.post("/api/cases", async (req, res) => {

  const {
    victimId,
    victimName,
    phone,
    district,
    state,
    caseType,
    registrationDate,
    status
  } = req.body;

  // Validate required fields
  if (
    !victimId ||
    !victimName ||
    !phone ||
    !district ||
    !state ||
    !caseType ||
    !registrationDate
  ) {

    return res.status(400).json({
      success: false,
      message: "Required fields are missing"
    });

  }

  const connection = await pool.getConnection();

  try {

    // Start transaction
    await connection.beginTransaction();


    // ===============================
    // INSERT / UPDATE VICTIM
    // ===============================

    await connection.query(`
      INSERT INTO victims
      (
        victim_id,
        name,
        phone,
        state,
        district
      )
      VALUES (?, ?, ?, ?, ?)

      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        phone = VALUES(phone),
        state = VALUES(state),
        district = VALUES(district)
    `, [
      victimId,
      victimName,
      phone,
      state,
      district
    ]);


    // ===============================
    // GENERATE CASE ID
    // ===============================

    const [existingCases] = await connection.query(`
      SELECT case_id
      FROM cases
      ORDER BY case_id DESC
      LIMIT 1
    `);

    let nextNumber = 1;

    if (existingCases.length > 0) {

      const lastId = existingCases[0].case_id;

      const lastNumber =
        parseInt(lastId.replace("CCTNS-", ""), 10);

      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    const caseId =
      `CCTNS-${String(nextNumber).padStart(3, "0")}`;


    // ===============================
    // INSERT CASE
    // ===============================

    await connection.query(`
      INSERT INTO cases
      (
        case_id,
        victim_id,
        case_type,
        registration_date,
        status
      )
      VALUES (?, ?, ?, ?, ?)
    `, [
      caseId,
      victimId,
      caseType,
      registrationDate,
      status || "Registered"
    ]);


    // Commit transaction
    await connection.commit();


    // ===============================
    // RESPONSE
    // ===============================

    res.status(201).json({

      success: true,

      message: "Case added to CCTNS",

      data: {
        caseId,
        victimId,
        victimName,
        phone,
        district,
        state,
        caseType,
        registrationDate,
        status: status || "Registered"
      }

    });

  } catch (error) {

    // Rollback if something fails
    await connection.rollback();

    console.error("Error adding case:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add case",
      error: error.message
    });

  } finally {

    connection.release();

  }

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

  console.log(
    `CCTNS Backend running at http://localhost:${PORT}`
  );

});