import mysql from "mysql2/promise"; // Import mysql2
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // Needed for ESM module path resolution

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Retrieve environment variables
const HOST: string | undefined = process.env.HOST;
const USER: string | undefined = process.env.USER;
const PASSWORD: string | undefined = process.env.PASSWORD;
const DATABASE: string | undefined = process.env.DATABASE;
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

// Validate environment variables
if (!HOST || !USER || !PASSWORD || !DATABASE || !JWT_SECRET) {
  console.error("Missing required environment variables!");
  process.exit(1);
}

// Create the MySQL connection pool
const db = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
