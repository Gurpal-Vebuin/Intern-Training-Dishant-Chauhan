import bcrypt from "bcrypt";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";
import { generateJWT } from "../../domain/entities/schema/jwtSchema.ts";
import { Login } from "../../domain/models/user.ts";
import { EntityManager } from "typeorm";
import { rolesFormat } from "../../infractructure/typeOrm/entities/userEntity.ts";

export const loginUseCase = async (
  email: string,
  password: string,
  userRepo: UserRepositoryPort,
  t: EntityManager
) => {
  const user: Login | null = await userRepo.loginUserPort(email, t);
  if (user === null) {
    throw new Error("Invalid Email or Password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid Email or Password");
  }

  const token = generateJWT({ id: user.id, roles: user.roles as rolesFormat });

  return {
    user: { id: user.id, roles: user.roles },
    token,
  };
};
