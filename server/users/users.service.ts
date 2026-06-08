import { Request, Response } from "express";
import pool from "../config/database";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const createUser = async (email: string, password: string) => {
  const sql = "INSERT INTO users (email, hashed_password) VALUES (?, ?)";

  const hash = await bcrypt.hash(password, saltRounds);
  
  await pool.query(sql, [email, hash]);
}