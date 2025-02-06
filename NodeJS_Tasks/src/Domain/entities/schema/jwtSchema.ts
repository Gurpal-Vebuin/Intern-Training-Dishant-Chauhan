import jwt from "jsonwebtoken";

export const generateJWT = (user: any) => {
  const payload = {
    email: user.email,
    roles: user.roles,
  };

  const secretKey: string = process.env.JWT_SECRET ?? "dec23";

  const options: jwt.SignOptions = { expiresIn: "1d" };

  return jwt.sign(payload, secretKey, options);
};
