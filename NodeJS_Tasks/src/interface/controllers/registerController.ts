import { Request, Response } from "express";
import { userRegisterUseCase } from "../../application/usecases/userRegisterUseCase.ts";
import { User } from "../../domain/models/user.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";

const registerController = 
  (userRepo: UserRepositoryPort) =>
async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, phone, password, roles }:User = req.body;
    const result = await userRegisterUseCase(
      name,
      email,
      phone,
      password,
      roles,
      userRepo
    );
    res
      .status(201)
      .send({ message: "User registered successfully!", data: result });
  } catch (err: any) {
    console.error("Error in user registration:", err.message);
    if (err.message.includes("already registered")) {
      res.status(409).send({
        message: "User already registered with this email!",
        success: false,
      });
    } else
      res.status(500).send({ message: "Database Error! User not inserted." });
  }
};

export { registerController };
