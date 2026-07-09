import { Response } from "express";
import { createApplication as createApplicationService, getApplications as getApplicationsService } from "./applications.service";
import { CustomRequest } from "../middlewares/authToken"; 

export const createApplication = async (req: CustomRequest, res: Response) => {
  const { company, jobTitle, status, date } = req.body;
  const userId = req.user!.userId;

  if (!company || !jobTitle || !status || !date) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await createApplicationService(userId, company, jobTitle, status, date);
    return res.status(201).json({ message: "Application added" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const getApplications = async (req: CustomRequest, res: Response) => {
  const userId = req.user!.userId;

  try {
    const data = await getApplicationsService(Number(userId));
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}