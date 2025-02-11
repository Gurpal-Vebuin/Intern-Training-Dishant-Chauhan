import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { rolesFormat } from "../../../infractructure/typeOrm/entities/userEntity.ts";
dotenv.config();

export const generateJWT = (user: {id: number, roles: rolesFormat}) => {
  const payload = {
    id: user.id,
    roles: user.roles,
  };

  const secretKey: string = process.env.JWT_SECRET ?? "dec23";
  const options: jwt.SignOptions = { expiresIn: "1d" };

  return jwt.sign(payload, secretKey, options);
};
