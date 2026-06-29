import { Router } from "express";
import authenticateToken from "../middlewares/authToken";
import { createApplication } from "./applications.controller";

const applicationsRouter = Router();

applicationsRouter.post("/", authenticateToken, createApplication);

export default applicationsRouter;