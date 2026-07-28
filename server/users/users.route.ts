import { Router } from "express";
import { getCurrentUser, login, logout, refreshAccessToken, register } from "./users.controller.js";
import authenticateToken from "../middlewares/authToken.js";

const usersRouter = Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/logout", logout);
usersRouter.post("/refresh-token", refreshAccessToken);
usersRouter.get("/me", authenticateToken, getCurrentUser);

export default usersRouter;