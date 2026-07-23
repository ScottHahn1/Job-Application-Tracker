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