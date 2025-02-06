import {
  deleteUser,
  Login,
  tokenUser,
  updateUser,
  User,
} from "../../../domain/models/user.ts";

export type UserRepositoryPort = {
  createUserPort(user: User): Promise<boolean>;
  loginUserPort(email: string): Promise<Login | null>;
  getAllUsersPort(): Promise<User[]>;
  getUserByEmailPort(email: string): Promise<User | null>;
  getTargetUser(id?: string): Promise<deleteUser | null>;
  getTokenUserId(email?: string): Promise<tokenUser | null>;
  deleteUserPort(id: number): Promise<boolean>;
  updateUserPort(user: updateUser): Promise<boolean>;
};
