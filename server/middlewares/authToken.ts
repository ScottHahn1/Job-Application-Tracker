import { NextFunction, Request, Response } from 'express';
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  userId: number;
}

export interface CustomRequest extends Request {
  user?: CustomJwtPayload;
}

const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Authentication required. Please provide a valid token." })
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    req.user = decoded as CustomJwtPayload;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token."});
  }
}

export default authenticateToken;