import { Request, Response } from "express";
import { loginUseCase } from "./../../application/usecases/loginUseCase.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";

const loginController =
  (userRepo: UserRepositoryPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const loginUser = await loginUseCase(email, password, userRepo);

      res.status(200).send({
        success: true,
        message: "Login successful",
        token: loginUser.token,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("User not Found")) {
          res.status(404).send({ success: false, message: "No User Found" });
        } else if (error.message === "Invalid user data") {
          res
            .status(401)
            .send({ success: false, message: "Invalid Credentials" });
        } else if (error.message === "Incorrect Email or Password.") {
          res.status(401).send({
            success: false,
            message: "Unauthorized! Incorrect Email or Password.",
          });
        } else {
          res
            .status(500)
            .send({ success: false, message: "An unknown error occurred" });
        }
      } else {
        res
          .status(500)
          .send({
            success: false,
            message: "Error Occurred while processing login.",
          });
      }
    }
  };

export { loginController };
