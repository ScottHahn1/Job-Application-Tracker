import { RowDataPacket } from "mysql2";
import pool from "../config/database";

export const createApplication = async (
  userId: number,
  company: string, 
  jobTitle: string, 
  status: string, 
  date: string
) => {
  const sql = "INSERT INTO applications (user_id, company_name, job_title, status, application_date) VALUES(?, ?, ?, ?, ?)"; 

  await pool.query(sql, [userId, company, jobTitle, status, date]);
}

export const getApplications = async (userId: number) => {
  const sql = "SELECT * FROM applications WHERE user_id = ?";

  const [rows] = await pool.query(sql, [userId]);
  
  return rows;
}

export const deleteApplication = async (applicationId: number) => {
  const sql = "DELETE FROM applications WHERE id = ?";

  await pool.query(sql, [applicationId]); 
}

export const totalApplications = async (userId: number) => {
  const sql = `
  SELECT COUNT(*) AS total,
  SUM(status = "applied") AS applied,
  SUM(status = "interview") AS interview,
  SUM(status = "offer") AS offer,
  SUM(status = "rejected") AS rejected
  FROM applications WHERE user_id = ?`;

  const [rows] = await pool.query<RowDataPacket[]>(sql, [userId]);


  return rows[0];
}

export const recentApplications = async (userId: number) => {
  const sql = `
  SELECT * FROM applications 
  WHERE user_id = ? 
  ORDER BY application_date  DESC
  LIMIT 5
  `;

  const [rows] = await pool.query(sql, [userId]);

  return rows;
}