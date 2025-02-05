import { User } from "../../domain/models/user.ts";
import { UserRepository } from "../../infractructure/repository/userRepository/index.ts";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";

const getUsers = async (
  email: string,
  roles: string,
  userRepo: UserRepositoryPort
): Promise<User[] | User | null> => {
  console.log(email);
  if (roles === "admin") {
    return await userRepo.getAllUsersPort();
  } else {
    if (email) {
      return await userRepo.getUserByEmailPort(email);
    } else {
      return null;
    }
  }
};

export { getUsers };
