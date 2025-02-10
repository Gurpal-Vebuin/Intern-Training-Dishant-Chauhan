import { Request, Response } from "express";
import { updateUser } from "../../application/usecases/updateUserUseCase.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";
import { EntityManager } from "typeorm";

const updateUsersController =
  (userRepo: UserRepositoryPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const updateData = req.body;
      const { id } = res.locals.user;
      await userRepo.wrapTransaction(async (t: EntityManager) => {
        await updateUser(updateData, id, userRepo, t);
      });

      res.status(200).send({
        success: true,
        message: "User updated successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message ===
          "Unauthorized You can only update your own account only."
        ) {
          res
            .status(401)
            .send("Unauthorized! You can only update your own account only.");
        } else {
          res
            .status(500)
            .send({ message: "Error Occurred while updating the given user.", success: false });
        }
      } else {
        res.status(500).send("Error Occurred while updating the given user.");
      }
    }
  };

export { updateUsersController };
