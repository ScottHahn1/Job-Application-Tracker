import { Router } from "express";
import authenticateToken from "../middlewares/authToken";
import { createApplication } from "./applications.controller";
import { getApplications } from "./applications.controller";

const applicationsRouter = Router();

applicationsRouter.post("/", authenticateToken, createApplication);
applicationsRouter.get("/", authenticateToken, getApplications);

export default applicationsRouter;