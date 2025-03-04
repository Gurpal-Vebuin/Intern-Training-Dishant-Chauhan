import { Request, Response } from "express";
import { userRegisterUseCase } from "../../application/usecases/registerUserUseCase.ts";
import { User } from "../../domain/models/user.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";
import { EntityManager } from "typeorm";

const registerController =
  (userRepo: UserRepositoryPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, phone, password, roles }: User = req.body;

      if (!name || !email || !phone || !password || !roles) {
        res.status(406).send({
          message: "Missing required fields",
          success: false,
        });
      } else {
        const result = await userRepo.wrapTransaction(
          async (t: EntityManager) => {
            return await userRegisterUseCase(
              name,
              email,
              phone,
              password,
              roles,
              userRepo,
              t
            );
          }
        );

        res
          .status(201)
          .send({ message: "User registered successfully!", success: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("User already exists")) {
          res.status(409).send({
            message: "User already exists with this email",
            success: false,
          });
          return;
        } else {
          res.status(400).send({
            message: "Database Error! User not inserted",
            success: false,
          });
          return;
        }
      } else {
        res
          .status(500)
          .send({ message: "Internal Server Error!", success: false });
        return;
      }
    }
  };

export { registerController };
