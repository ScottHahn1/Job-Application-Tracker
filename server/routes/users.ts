import { Router } from "express";
import bcrypt from "bcrypt";
import pool from "../config/database";
import { RowDataPacket } from "mysql2";

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
    await pool.query(sql, [email, hash]);
    return res.status(201).json({ registered: true });
  } catch (error: any) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email already exists" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
})

usersRouter.post("/login", async (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [result] = await pool.query<RowDataPacket[]>(sql, [email]);
    const user = result[0];
    
    if (user) {
      const match = await bcrypt.compare(password, user.hashed_password);

      if (match) {
        const userId = user.id;

        return res.status(200).json({
          success: true,
          login: true,
          message: "Login Successful!",
          email,
          userId,
        });
      } else {
        return res.status(401).json({ success: false, message: "Incorrect password" });
      }
    }   else {
      return res.status(401).json({ success: false, message: "Invalid Email" });
    }
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
})

export default usersRouter;