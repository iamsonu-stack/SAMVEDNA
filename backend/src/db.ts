import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "samvedna_db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
  console.log("PostgreSQL connected successfully");
});

pool.on("error", (err) => {
  console.error("PostgreSQL connection error:", err);
});

export default pool;