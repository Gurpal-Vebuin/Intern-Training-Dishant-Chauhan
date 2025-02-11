import { EntityManager } from "typeorm";
import { updateUser } from "../../domain/models/user.ts";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";

const updateUser = async (
  user: updateUser,
  id: number,
  userRepo: UserRepositoryPort,
  t: EntityManager
) => {
  const tokenUserId = String(id);
  const targetUserId = String(user.id);

  if (targetUserId !== tokenUserId) {
    throw new Error("Unauthorized You can only update your own account only.");
  }

  const result = await userRepo.updateUserPort(user, t);
  if (!result) {
    throw new Error("Error Occurred while updating the given user.");
  }
};

export { updateUser };
