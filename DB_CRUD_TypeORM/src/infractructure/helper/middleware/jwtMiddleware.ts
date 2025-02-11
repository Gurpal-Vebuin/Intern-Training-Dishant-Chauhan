import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "deccan";
interface JWT_Payload {
  id: number;
  roles: string;
}

interface AuthenticatedRequest extends Request {
  id?: number;
  roles?: string;
}

const jwtMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res
      .status(401)
      .send({ msg: "Authorization token is required.", success: false });
  } else {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWT_Payload;
      res.locals.user = { id: decoded.id, roles: decoded.roles };
      next();
    } catch (err) {
      res
        .status(401)
        .send({ msg: "Invalid or expired token.", success: false });
    }
  }
};

export { jwtMiddleware };
