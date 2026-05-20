import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
const port = Number(process.env.MYSQL_PORT);
const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

if (!port || !host || !user || !password || !database) {
  throw new Error("Something is missing from .env");
}

const pool = mysql.createPool({
  port,
  host,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,     
});

export default pool;