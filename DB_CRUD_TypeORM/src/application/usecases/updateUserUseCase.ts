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
  if (!targetUserId) {
    throw new Error("No User Found to Update.");
  }

  if (targetUserId !== tokenUserId) {
    throw new Error("Unauthorized You can only update your own account only.");
  }

  await userRepo.updateUserPort(user, t);
};

export { updateUser };
