import { deleteUser } from "../../domain/models/user.ts";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";

const deleteUsers = async (
  userRepo: UserRepositoryPort,
  id?: string,
  email?: string,
  roles?: string
) => {
  console.log("Delete User use case invoked.");

  const tokenUser = await userRepo.getTokenUserId(email);
  if (!tokenUser) {
    throw new Error("User authentication failed. No user found.");
  }

  const targetUser: deleteUser | null = await userRepo.getTargetUser(id);
  if (!targetUser) {
    throw new Error(`No user found with ID: ${id}`);
  }

  console.log(targetUser);
  const tokenUserId = Number(tokenUser);
  const targetUserId = Number(targetUser.id);
  const targetUserRole = targetUser.roles;

  // console.log(`Token User ID: ${tokenUserId}, Role: ${roles}`);
  // console.log(`Target User ID: ${targetUserId}, Role: ${targetUserRole}`);

  if (roles !== "admin" && targetUserId !== tokenUserId) {
    throw new Error("Unauthorized: You can only delete your own account.");
  } else if (targetUserRole === roles) { // admin === admin
    throw new Error("Unauthorized: Admin cannot delete another admin account.");
  } else {
    await userRepo.deleteUserPort(targetUserId);

    console.log(`User with ID: ${targetUserId} deleted successfully.`);
  }
};

export { deleteUsers };
