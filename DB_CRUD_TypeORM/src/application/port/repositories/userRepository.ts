import { EntityManager } from "typeorm";
import {
  deleteUser,
  Login,
  tokenUser,
  getUser,
  updateUser,
  User,
} from "../../../domain/models/user.ts";

export type UserRepositoryPort = {
  createUserPort(user: User, entityManager: EntityManager): Promise<boolean>;
  loginUserPort(
    email: string,
    entityManager: EntityManager
  ): Promise<Login | null>;
  getAllUsersPort(
    id: number,
    entityManager: EntityManager
  ): Promise<getUser[] | null>;
  checkUserByEmailPort(
    email: string,
    entityManager: EntityManager
  ): Promise<boolean>;
  getTargetUserPort(
    id: number,
    entityManager: EntityManager
  ): Promise<User | null>;
  deleteUserPort(
    id: number,
    entityManager: EntityManager
  ): Promise<boolean | null>;
  updateUserPort(
    user: updateUser,
    entityManager: EntityManager
  ): Promise<boolean>;
  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
};
