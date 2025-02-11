import { EntityManager } from "typeorm";
import { UserRepositoryPort } from "./../../application/port/repositories/userRepository.ts";

const deleteUsers = async (
  userRepo: UserRepositoryPort,
  paramsId: string,
  tokenUserId: number,
  tokenUserRole: string,
  t: EntityManager
): Promise<void> => {
  const targetUserId = Number(paramsId);

  if (isNaN(targetUserId)) {
    throw new Error(`Invalid user ID: ${paramsId}`);
  }

  const targetUser = await userRepo.getTargetUserPort(targetUserId, t);
  if (!targetUser) {
    throw new Error(`No user found with ID: ${targetUserId}`);
  }

  if (tokenUserRole !== "admin" && targetUserId !== tokenUserId) {
    throw new Error("Unauthorized: You can only delete your own account.");
  }

  if (tokenUserRole === "admin" && targetUser.roles === "admin") {
    throw new Error("Unauthorized: Admin cannot delete another admin account.");
  }

  const deletionSuccess = await userRepo.deleteUserPort(targetUserId, t);
  if (!deletionSuccess) {
    throw new Error(`Failed to delete user with ID: ${targetUserId}`);
  }
};

export { deleteUsers };
