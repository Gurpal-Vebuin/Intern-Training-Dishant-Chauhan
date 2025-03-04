import { EntityManager } from "typeorm";
import {
  Login,
  getUser,
  updateUserType,
  User,
} from "../../../domain/models/user.ts";

export type UserRepositoryPort = {
  createUserPort(user: User, entityManager: EntityManager): Promise<boolean>;
  loginUserPort(
    email: string,
    entityManager: EntityManager
  ): Promise<Login | null>;
  getAllUsersPort(entityManager: EntityManager): Promise<getUser[] | null>;
  checkUserByEmailPort(
    email: string,
    entityManager: EntityManager
  ): Promise<boolean>;
  checkUserByIdPort(
    id: string,
    entityManager: EntityManager
  ): Promise<boolean>;
  getTargetUserPort(
    id: number,
    entityManager: EntityManager
  ): Promise<getUser | null>;
  deleteUserPort(
    id: number,
    entityManager: EntityManager
  ): Promise<boolean | null>;
  updateUserPort(
    user: updateUserType,
    entityManager: EntityManager
  ): Promise<boolean>;
  wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
};
