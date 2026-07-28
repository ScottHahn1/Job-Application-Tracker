import { Router } from "express";
import authenticateToken from "../middlewares/authToken.js";
import { createApplication, deleteApplication, getDemoApplications, recentDemoApplications, totalDemoApplications } from "./applications.controller.js";
import { getApplications } from "./applications.controller.js";
import { totalApplications } from "./applications.controller.js";
import { recentApplications } from "./applications.controller.js";

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