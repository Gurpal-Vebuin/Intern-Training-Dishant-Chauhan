import { User } from "../../domain/models/user.ts";
import bcrypt from "bcrypt";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";
import { EntityManager } from "typeorm";

export const userRegisterUseCase = async (
  name: string,
  email: string,
  phone: string,
  password: string,
  roles: string,
  userRepo: UserRepositoryPort,
  t: EntityManager
) => {
  const existingUser: boolean = await userRepo.checkUserByEmailPort(email, t);

  if (existingUser === true) {
    throw new Error("User already exists with this email.");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      name,
      email,
      phone,
      password: hashedPassword,
      roles,
    };
    const isUserCreated = await userRepo.createUserPort(newUser, t);
    if (!isUserCreated) {
      throw new Error("Database Error! User not inserted.");
    }
    return newUser;
  }
};
