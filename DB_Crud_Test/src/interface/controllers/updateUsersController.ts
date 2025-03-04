import { Request, Response } from "express";
import { updateUser } from "../../application/usecases/updateUserUseCase.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";
import { EntityManager } from "typeorm";
import { updateUserType } from "../../domain/models/user.ts";

const updateUsersController =
  (userRepo: UserRepositoryPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const updateData: updateUserType = req.body;
      const { id } = res.locals.user;

      const result = await userRepo.wrapTransaction(
        async (t: EntityManager) => {
          return await updateUser(updateData, id, userRepo, t);
        }
      );

      if (result) {
        res.status(200).send({
          success: true,
          message: "User updated successfully.",
        });
      }
      else{
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Id does not exists to update!")) {
          res.status(404).send({
            success: false,
            message: "User not found. Please check the user ID.",
          });
        } else if (
          error.message.includes(
            "Unauthorized You can only update your own account only."
          )
        ) {
          res.status(403).send({
            success: false,
            message: "Forbidden. You are not allowed to update this user.",
          });
        } else {
          res.status(500).send({
            success: false,
            message: "An unexpected error occurred while updating the user.",
            error: error.message,
          });
        }
      } else {
        res.status(500).send({
          success: false,
          message: "An unknown error occurred while updating the user.",
        });
      }
    }
  };

export { updateUsersController };
