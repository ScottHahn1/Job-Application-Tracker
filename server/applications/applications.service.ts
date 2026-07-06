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