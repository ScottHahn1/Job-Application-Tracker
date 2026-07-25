import { Router } from "express";
import authenticateToken from "../middlewares/authToken";
import { createApplication, deleteApplication } from "./applications.controller";
import { getApplications } from "./applications.controller";
import { totalApplications } from "./applications.controller";

const applicationsRouter = Router();

applicationsRouter.post("/", authenticateToken, createApplication);
applicationsRouter.get("/", authenticateToken, getApplications);
applicationsRouter.delete("/", authenticateToken, deleteApplication);
applicationsRouter.get("/total", authenticateToken, totalApplications);

export default applicationsRouter;