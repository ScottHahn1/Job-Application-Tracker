import { Router } from "express";
import { register } from "./users.controller";

const usersRouter = Router();

usersRouter.post("/register", register);

export default usersRouter;