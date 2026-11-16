import { Request, Response } from "express";
import { createUser, generateNewAccessToken, getUser, loginUser } from "./users.service.js";
import { CustomRequest } from "../middlewares/authToken.js";
import { CustomError } from "../middlewares/error.js";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Email and password are required", 400)
  }

  if (password.length < 8) {
    throw new CustomError("Password must be at least 8 characters", 400);
  }

  if (password.length > 50) {
    throw new CustomError("Password cannot exceed 50 characters", 400);
  }

  await createUser(email, password);
  return res.status(201).json({ registered: true });
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Email and password are required", 400)
  }

  if (password.length < 8) {
    throw new CustomError("Password must be at least 8 characters", 400);
  }

  if (password.length > 50) {
    throw new CustomError("Password cannot exceed 50 characters", 400);
  }

  const { accessToken, refreshToken, userId } = await loginUser(email, password);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000
  })

  // res.cookie("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  //   maxAge: 7 * 24 * 60 * 60 * 1000
  // });

  return res.status(200).json({
    success: true,
    login: true,
    message: "Login Successful!",
    email,
    userId
  });
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
    throw new CustomError("No refresh token provided.", 401);
  }

  const newAccessToken = generateNewAccessToken(refreshToken);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
  });

  return res.status(200).json({ message: "New access token issued." }); 
}

export const getCurrentUser = async (req: CustomRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required." });
  }

  const { userId } = req.user;

  try {
    const rows = await getUser(userId);

    if (rows?.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(rows[0]);
  } catch {
    res.status(500).json({ error: "Internal server error!" });
  }
}