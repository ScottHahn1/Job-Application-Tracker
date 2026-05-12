import { Router } from "express";
import bcrypt from "bcrypt";
import pool from "../config/database";

const usersRouter = Router();
const saltRounds = 10;

usersRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const sql = "INSERT INTO users (email, hashed_password) VALUES (?, ?)";

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const [result] = await pool.query(sql, [email, hash]);
    return res.status(201).json({ registered: true });
  } catch (error) {
     console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
})

export default usersRouter;