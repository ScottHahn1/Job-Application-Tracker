import type { ErrorRequestHandler } from "express";

const error: ErrorRequestHandler = (err, req, res, next) => {
    if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ message: "An account with this email already exists" })
  }
  
  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  } 

  return res.status(500).json({ message: "Internal server error" });
}

export default error;