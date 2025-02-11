import { Request, Response } from "express";
import { getUsers } from "../../application/usecases/getUserUseCase.ts";
import { getUser } from "../../domain/models/user.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";
import { EntityManager } from "typeorm";

const getUsersControllers =
  (userRepo: UserRepositoryPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const isAdmin = req.query.isAdmin as string | undefined;
      const { id, roles }: getUser = res.locals.user;
      const users = await userRepo.wrapTransaction(async (t: EntityManager) => {
        return await getUsers(id, roles, userRepo, t, isAdmin);
      });
      res.status(200).send({
        success: true,
        message: "Users fetched successfully!",
        data: users,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error Fetching Users.",
      });
    }
  };

export { getUsersControllers };
