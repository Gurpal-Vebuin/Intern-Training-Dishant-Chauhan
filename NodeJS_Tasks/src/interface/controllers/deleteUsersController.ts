import { Request, Response } from "express";
import { deleteUsers } from "../../application/usecases/deleteUsersUseCase.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";

const deleteUsersController =
  (userRepo: UserRepositoryPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { email, roles } = res.locals.user;

      await deleteUsers(userRepo, id, email, roles);
      res.status(200).send({
        success: true,
        message: `User with ID: ${id} has been deleted successfully.`,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in deleteUsersController:", error.message);

        if (error.message.includes("No user found with ID")) {
          res.status(404).json({ success: false, message: error.message });
        } else if (error.message.includes("User authentication failed")) {
          res.status(401).json({ success: false, message: error.message });
        } else if (error.message.includes("Unauthorized")) {
          res.status(401).json({ success: false, message: error.message });
        } else if (error.message.includes("Failed to delete user")) {
          res.status(500).json({ success: false, message: error.message });
        }
      } else {
        res.status(500).json({
          success: false,
          message: "An unexpected error occurred while deleting the user.",
        });
      }
    }
  };

export { deleteUsersController };
