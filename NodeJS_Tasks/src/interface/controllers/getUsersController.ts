import { Request, Response } from "express";
import { getUsers } from "../../application/usecases/getUserUseCase.ts";
import { getUser } from "../../Domain/models/user.ts";
import { UserRepositoryPort } from "../../application/port/repositories/userRepository.ts";

const getUsersControllers =
  (userRepo: UserRepositoryPort) =>
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const { email, roles }: getUser = res.locals.user;
      console.log(res.locals.user);
      const users = await getUsers(email, roles, userRepo);

      res.status(200).send({
        success: true,
        message: "Data fetched successfully!",
        data: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send({
        success: false,
        message: "An unexpected error occurred while fetching users.",
      });
    }
  };

export { getUsersControllers };
