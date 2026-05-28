import { Response, Router } from "express";
import bcrypt from "bcrypt";
import pool from "../config/database";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import authenticateToken, { CustomRequest } from "../middlewares/authToken";

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

        const accessToken = jwt.sign(
          { userId }, 
          process.env.ACCESS_TOKEN_SECRET as string, 
          { expiresIn: "15m" }
        );
        const refreshToken = jwt.sign(
          { userId }, 
          process.env.REFRESH_TOKEN_SECRET as string, 
          { expiresIn: "7d" }
        );

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 15 * 60 * 1000
        })

        res.cookie("refreshToken", refreshToken,
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
          }
        );

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