import { Router } from "express";
import { login, logout, register } from "./users.controller";

const usersRouter = Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/logout", logout);

export default usersRouter;