import { EntityManager } from "typeorm";
import { updateUserType } from "../../domain/models/user.ts";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";

const updateUser = async (
  user: updateUserType,
  id: number,
  userRepo: UserRepositoryPort,
  t: EntityManager
) => {
  const tokenUserId = String(id);
  const targetUserId = String(user.id);

  const targetResult = await userRepo.checkUserByIdPort(targetUserId, t);
  if (targetResult === false) {
    throw new Error("Id does not exists to update!");
  } else {
    if (targetUserId !== tokenUserId) {
      throw new Error(
        "Unauthorized You can only update your own account only."
      );
    }

    const result = await userRepo.updateUserPort(user, t);
    if (!result) {
      throw new Error("Error Occurred while updating the given user.");
    }
    return result;
  }
};

export { updateUser };
