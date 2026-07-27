import { Router } from "express";
import authenticateToken from "../middlewares/authToken";
import { createApplication, deleteApplication, getDemoApplications, recentDemoApplications, totalDemoApplications } from "./applications.controller";
import { getApplications } from "./applications.controller";
import { totalApplications } from "./applications.controller";
import { recentApplications } from "./applications.controller";

const applicationsRouter = Router();

applicationsRouter.post("/", authenticateToken, createApplication);
applicationsRouter.get("/", authenticateToken, getApplications);
applicationsRouter.get("/demo", getDemoApplications);
applicationsRouter.delete("/", authenticateToken, deleteApplication);
applicationsRouter.get("/total", authenticateToken, totalApplications);
applicationsRouter.get("/total/demo", totalDemoApplications);
applicationsRouter.get("/recent", authenticateToken, recentApplications);
applicationsRouter.get("/recent/demo", recentDemoApplications);

export default applicationsRouter;