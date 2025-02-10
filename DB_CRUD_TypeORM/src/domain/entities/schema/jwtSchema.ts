import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateJWT = (user: any) => {
  const payload = {
    id: user.id,
    roles: user.roles,
  };

  const secretKey: string = process.env.JWT_SECRET ?? "dec23";
  const options: jwt.SignOptions = { expiresIn: "1d" };

  return jwt.sign(payload, secretKey, options);
};
