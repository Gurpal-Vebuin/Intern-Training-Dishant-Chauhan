import { Request, Response } from "express";
import { updateUser } from "../../application/usecases/updateUserUseCase.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";

const updateUsersController =
  (userRepo: UserRepositoryPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const updateData = req.body;
      const { email, roles } = res.locals.user;
      console.log(updateData, roles);

      await updateUser(updateData, email, roles, userRepo);

      res.status(200).send({
        success: true,
        message: "User updated successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("No User Found")) {
          res.status(404).send({ message: "No User Found", success: false });
        } else if (error.message === "No User found with the given token.") {
          res.status(404).send({ message: "No token found.", success: false });
        } else if (
          error.message ===
          "Unauthorized! You can only update your own account."
        )
          res
            .status(403)
            .send("Unauthorized! You can only update your own account.");
        else {
          res.status(500).send("An unknown error occurred");
        }
      } else {
        res.status(500).send("Error Occurred while updating the given user.");
      }
    }
  };

export { updateUsersController };
