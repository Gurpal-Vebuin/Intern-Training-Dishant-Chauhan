import bcrypt from "bcrypt";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";
import { generateJWT } from "../../domain/entities/schema/jwtSchema.ts";
import { Login } from "../../domain/models/user.ts";
import { EntityManager } from "typeorm";

export const loginUseCase = async (
  email: string,
  password: string,
  userRepo: UserRepositoryPort,
  t: EntityManager
) => {
  // Fetch user by email using loginUserPort
  const user: Login | null = await userRepo.loginUserPort(email, t);
  if (!user) {
    throw new Error("User not found");
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid Email or Password");
  }

  const token = generateJWT({ id: user.id, roles: user.roles });

  return {
    user: { id: user.id, roles: user.roles },
    token,
  };
};
