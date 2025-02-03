import { User } from "../../Domain/models/user.ts";
import { UserRepository } from "../../infractructure/repository/userRepository/index.ts";
import bcrypt from "bcrypt";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";

export const userRegisterUseCase = async (
  name: string,
  email: string,
  phone: number,
  password: string,
  roles: string,
  userRepo: UserRepositoryPort
) => {
  const existingUser: User | null = await UserRepository.getUserByEmailPort(
    email
  );

  if (existingUser) {
    throw new Error("User already exists with this email.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = { name, email, phone, password: hashedPassword, roles };

  const isUserCreated: boolean = await userRepo.createUserPort(newUser);

  if (!isUserCreated) {
    throw new Error("Failed to register user. Please try again.");
  }
};
