import { Request, Response, NextFunction } from "express";
import { loginUseCase } from "../../application/usecases/loginUseCase.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";
import { EntityManager } from "typeorm";

const loginController =
  (userRepo: UserRepositoryPort) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      const loginUser = await userRepo.wrapTransaction(
        async (t: EntityManager) => {
          return await loginUseCase(email, password, userRepo, t);
        }
      );

      res.status(200).json({
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
        res
          .status(500)
          .send({
            messsage: "Error occurred while processing login!",
            success: false,
          });
      }
    }
  };

export { loginController };
