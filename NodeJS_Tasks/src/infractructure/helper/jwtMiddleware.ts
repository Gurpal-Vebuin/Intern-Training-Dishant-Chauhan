import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "deccan";

interface JWT_Payload {
  email: string;
  roles: string;
}

interface AuthenticatedRequest extends Request {
  email?: string;
  roles?: string;
}

const jwtMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .send({ msg: "Authorization token is required.", success: false });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWT_Payload;

    res.locals.user = { email: decoded.email, roles: decoded.roles };
    next();
  } catch (err) {
    res.status(401).send({ msg: "Invalid or expired token.", success: false });
  }
};

export { jwtMiddleware };
