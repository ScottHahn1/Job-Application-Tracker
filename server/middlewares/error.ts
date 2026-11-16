import type { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

const error = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (typeof err === "object" && 
    "code" in err && 
    err.code === "ER_DUP_ENTRY"
  ) {
    return res.status(409).json({ message: "An account with this email already exists" });
  }
  
  return res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
}

export default error;