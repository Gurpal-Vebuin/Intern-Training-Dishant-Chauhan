import { EntityManager } from "typeorm";
import { User } from "../../domain/models/user.ts";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";

const getUsers = async (
  id: number,
  roles: string,
  isAdmin: string,
  userRepo: UserRepositoryPort,
  t: EntityManager
): Promise<User[] | User | null> => {
  if (isAdmin === "true" && roles === "admin") {
    return await userRepo.getAllUsersPort(id, t);
  } else {
    if (id) {
      return await userRepo.getTargetUserPort(id, t);
    } else {
      return null;
    }
  }
};

export { getUsers };
