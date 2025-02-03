import { UserRepository } from "../../infractructure/repository/userRepository/index.ts";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";

const deleteUsers = async (
  userRepo: UserRepositoryPort,
  id?: string,
  email?: string,
  roles?: string
) => {
  const tokenUser = await userRepo.getTokenUserId(email);
  console.log(tokenUser);
  if (!tokenUser) {
    throw new Error("No User Found");
  }

  const tokenUserId = Number(tokenUser);
  const targetUserId = Number(id);

  console.log("Token User ID:", tokenUserId);
  console.log("User Role:", roles);

  // Admin can delete any user
  if (roles !== "admin" && targetUserId !== tokenUserId) {
    throw new Error("Unauthorized: You can only delete your own account.");
  }
  const deleteResult = await userRepo.deleteUserPort(targetUserId); // Passing targetUserId here
  if (!deleteResult) {
    throw new Error("Unable to delete the given user.");
  }

};

export { deleteUsers };
