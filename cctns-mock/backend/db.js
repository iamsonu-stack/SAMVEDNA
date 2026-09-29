import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log("DATABASE BEING USED:", process.env.DB_NAME);
console.log("CCTNS DB NAME:", process.env.DB_NAME);
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "cctns_db",
    port: process.env.DB_PORT || 3306,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;