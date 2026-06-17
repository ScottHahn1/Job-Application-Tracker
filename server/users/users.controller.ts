import { Request, Response } from "express";
import { createUser, generateNewAccessToken, loginUser } from "./users.service";
import { CustomRequest } from "../middlewares/authToken";

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { accessToken, refreshToken, userId } = await loginUser(email, password);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 2 * 60 * 1000
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      login: true,
      message: "Login Successful!",
      email,
      userId
    });
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const logout = (req: Request, res: Response) => {
   res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.REACT_APP_NODE_ENV === 'production',
    sameSite: process.env.REACT_APP_NODE_ENV === 'production' ? 'none' : 'lax'
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.REACT_APP_NODE_ENV === "production",
    sameSite: process.env.REACT_APP_NODE_ENV === "production" ? "none" : "lax"
  });

  res.status(200).json({ message: "Logged out successfully" });
}

export const refreshAccessToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided." });
  }

  try {
    const newAccessToken = generateNewAccessToken(refreshToken);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 2 * 60 * 1000
    });

    return res.json({ message: "New access token issued" });
  } catch {
    return res.status(403).json({ message: "Invalid refresh token." });
  }
}