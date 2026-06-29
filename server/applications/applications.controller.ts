import { Response } from "express";
import { createApplication as createApplicationService } from "./applications.service";
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