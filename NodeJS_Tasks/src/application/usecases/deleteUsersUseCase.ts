import { deleteUser } from "../../domain/models/user.ts";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";

const deleteUsers = async (
  userRepo: UserRepositoryPort,
  id?: string,
  email?: string,
  roles?: string
) => {

  const tokenUser = await userRepo.getTokenUserId(email);
  if (!tokenUser) {
    throw new Error("User authentication failed. No user found.");
  }

  const targetUser: deleteUser | null = await userRepo.getTargetUser(id);
  if (!targetUser) {
    throw new Error(`No user found with ID: ${id}`);
  }

  const tokenUserId = Number(tokenUser);
  const targetUserId = Number(targetUser.id);
  const targetUserRole = targetUser.roles;


  if (roles !== "admin" && targetUserId !== tokenUserId) {
    throw new Error("Unauthorized: You can only delete your own account.");
  } else if (targetUserRole === roles) { // admin === admin
    throw new Error("Unauthorized: Admin cannot delete another admin account.");
  } else {
    await userRepo.deleteUserPort(targetUserId);

  }
};

export { deleteUsers };
