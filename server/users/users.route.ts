import { Router } from "express";
import { login, logout, refreshAccessToken, register } from "./users.controller";

const usersRouter = Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/logout", logout);
usersRouter.post("/refresh-token", refreshAccessToken);

export default usersRouter;