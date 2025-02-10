import { Request, Response } from "express";
import { userRegisterUseCase } from "../../application/usecases/userRegisterUseCase.ts";
import { User } from "../../domain/models/user.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";
import { EntityManager } from "typeorm";

const registerController =
  (userRepo: UserRepositoryPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, phone, password, roles }: User = req.body;
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
      res.status(201).send({ message: "User registered successfully!" });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User already exists with this email.") {
          res.status(409).send({
            message: "User already registered exists",
            success: false,
          });
        } else {
          res.status(400).send({
            message: "Unable to insert the User!",
          });
        }
      } else {
        res.status(500).send({ message: "Database Error! User not inserted." });
      }
    }
  };

export { registerController };
