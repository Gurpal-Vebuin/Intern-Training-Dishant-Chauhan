import { Request, Response } from "express";
import { deleteUsers } from "../../application/usecases/deleteUsersUseCase.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";
import { EntityManager } from "typeorm";

const deleteUsersController =
  (userRepo: UserRepositoryPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const paramsId = req.params.id;
      const { id, roles } = res.locals.user;

      await userRepo.wrapTransaction(async (t: EntityManager) => {
        await deleteUsers(userRepo, paramsId, id, roles, t);
      });

      res.status(200).send({
        success: true,
        message: `User with ID: ${paramsId} has been deleted successfully.`,
      });
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();

        if (errorMessage.includes("no user found with id")) {
          res.status(404).send({ success: false, message: error.message });
        } else if (errorMessage.includes("unauthorized")) {
          res.status(401).send({ success: false, message: error.message });
        }
      } else {
        res.status(500).send({
          success: false,
          message: "An unexpected error occurred while deleting the user.",
        });
      }
    }
  };

export { deleteUsersController };
