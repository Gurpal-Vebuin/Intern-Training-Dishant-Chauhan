import {
  deleteUser,
  Login,
  tokenUser,
  updateUser,
  User,
} from "../../../Domain/models/user.ts";

export type UserRepositoryPort = {
  createUserPort(user: User): Promise<boolean>;
  loginUserPort(email: string): Promise<Login | null>;
  getAllUsersPort(): Promise<User[]>;
  getUserByEmailPort(email: string): Promise<User | null>;
  getTargetUserId(id?: string): Promise<deleteUser | null>;
  getTokenUserId(email?: string): Promise<tokenUser | null>;
  deleteUserPort(id: number): Promise<boolean>;
  updateUserPort(user: updateUser): Promise<boolean>;
};
