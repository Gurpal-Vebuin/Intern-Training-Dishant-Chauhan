import bcrypt from "bcrypt";
import { UserRepositoryPort } from "../port/repositories/userRepository.ts";
import { generateJWT } from "../../domain/entities/schema/jwtSchema.ts";
import { Login } from "../../domain/models/user.ts";

export const loginUseCase = async (
  email: string,
  password: string,
  userRepo: UserRepositoryPort
) => {
  // Fetch user by email using loginUserPort
  const user: Login | null = await userRepo.loginUserPort(email);

  // Check if user exists
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.password) {
    throw new Error("Invalid user data");
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Incorrect Email or Password");
  }

  const token = generateJWT({ email: user.email, roles: user.roles });

  return {
    user: { email: user.email, roles: user.roles },
    token,
  };
};
