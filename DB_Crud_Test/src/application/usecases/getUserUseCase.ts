import { EntityManager } from "typeorm";
import { User } from "../../domain/models/user.ts";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";

const getUsers = async (
  id: number,
  roles: string,
  userRepo: UserRepositoryPort,
  t: EntityManager,
  isAdmin?: string,
): Promise<User[] | User | null> => {
  if (isAdmin === "true" && roles === "admin") {
    return await userRepo.getAllUsersPort(t);
  } else {
    return await userRepo.getTargetUserPort(id, t);
  }
};

export { getUsers };
