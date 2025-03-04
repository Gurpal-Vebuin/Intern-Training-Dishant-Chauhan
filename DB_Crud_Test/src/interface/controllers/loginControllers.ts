import { Request, Response } from "express";
import { loginUseCase } from "../../application/usecases/loginUseCase.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";
import { EntityManager } from "typeorm";

export const loginController =
  (userRepo: UserRepositoryPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const loginUser = await userRepo.wrapTransaction(
        async (t: EntityManager) => {
          return await loginUseCase(email, password, userRepo, t);
        }
      );

      res.status(200).send({
        success: true,
        message: "Login successful",
        token: loginUser.token,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Invalid Email or Password") {
          res
            .status(401)
            .send({ message: "Invalid Email or Password", success: false });
        } else {
          res.status(404).send({ message: "User not Found", success: false });
        }
      } else {
        res.status(500).send({
          message: "Error occurred while processing login!",
          success: false,
        });
      }
    }
  };
