import type { NextFunction, Request, Response } from "express";

const error = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (typeof err === "object" && 
    "code" in err && 
    err.code === "ER_DUP_ENTRY"
  ) {
    return res.status(409).json({ message: "An account with this email already exists" });
  }
  
  return res.status(500).json({ message: "Internal server error" });
}

export default error;