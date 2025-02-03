import { Request, Response } from "express";
import { deleteUsers } from "../../application/usecases/deleteUsersUseCase.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";

const deleteUsersController =
  (userRepo: UserRepositoryPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { email, roles } = res.locals.user;

      if (!id) {
        res.status(400).send({
          success: false,
          message: "User ID is required for deletion.",
        });
        return;
      }

      await deleteUsers(userRepo, id, email, roles);
      res.status(200).send({
        success: true,
        message: "User deleted successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "No User Found") {
          res.status(404).send({ message: "No user found", success: false });
        } else if (
          error.message ===
          "Unauthorized: You can only delete your own account."
        )
          res.status(403).send({
            message: "Unauthorized: You can only delete your own account.",
            success: false,
          });
        else {
          res.status(500).send({
            message: "An unknown occurred.",
            success: false,
          });
        }
      } else {
        res.status(500).send({
          message: "Error occurred while deleting the user.",
          success: false,
        });
      }
    }
  };

export { deleteUsersController };
