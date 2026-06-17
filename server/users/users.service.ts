import pool from "../config/database";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";

const saltRounds = 10;

export const createUser = async (email: string, password: string) => {
  const sql = "INSERT INTO users (email, hashed_password) VALUES (?, ?)";

  const hash = await bcrypt.hash(password, saltRounds);
  
  await pool.query(sql, [email, hash]);
}

export const loginUser = async (email: string, password: string) => {
  const sql = "SELECT * FROM users WHERE email = ?";

  const [result] = await pool.query<RowDataPacket[]>(sql, [email]);
  const user = result[0];

  if (!user) {
    throw new Error("Invalid email");
  }

  const match = await bcrypt.compare(password, user.hashed_password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" }
  );

  return {
    accessToken, 
    refreshToken, 
    userId: user.id
  }
}

export const generateNewAccessToken = (refreshToken: string) => {
  const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { userId: number };

  const newAccessToken = jwt.sign(
    { userId: user.userId },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );

  return newAccessToken;
}