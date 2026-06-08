import { Request, Response } from "express";
import { createUser } from "./users.service";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    await createUser(email, password);
    return res.status(201).json({ registered: true });
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email already exists" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}