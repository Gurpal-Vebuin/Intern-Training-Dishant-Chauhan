import { updateUser } from "../../domain/models/user.ts";
import { UserRepository } from "../../infractructure/repository/userRepository/index.ts";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";

const updateUser = async (
  user: updateUser,
  email: string,
  roles: string,
  userRepo: UserRepositoryPort
) => {
  // Fetch the token user ID from the function
  const tokenUser = await UserRepository.getTokenUserId(email);

  if (!tokenUser) {
    throw new Error("No User found with the given token.");
  }

  const tokenUserId = String(tokenUser);
  const targetUserId = String(user.id);
  if(!targetUserId){
    throw new Error("No User Found to Update.")
  }

  // Users can only update their own account
  if (targetUserId !== tokenUserId) {
    throw new Error("Unauthorized! You can only update your own account only.");
  }

  await userRepo.updateUserPort(user);
};

export { updateUser };
