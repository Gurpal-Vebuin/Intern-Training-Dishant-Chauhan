import { ResultSetHeader, RowDataPacket } from "mysql2";
import { UserRepositoryPort } from "./../../../application/port/repositories/userRepository.ts";
import {
  updateUser,
  Login,
  User,
  getUser,
} from "../../../domain/models/user.ts";
import { Users } from "../../typeOrm/entities/userEntity.ts";
import { EntityManager } from "typeorm";
import { DeleteResult } from "typeorm/browser";
import { wrapTransaction } from "../../helper/transaction.ts";

export const UserRepository: UserRepositoryPort = {
  // creating Users
  createUserPort: async (
    user: User,
    entityManager: EntityManager
  ): Promise<boolean> => {
    const result = await entityManager
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        roles: user.roles,
      })
      .execute();
    return result.identifiers.length > 0;
  },

  // Logging In
  loginUserPort: async (
    email: string,
    entityManager: EntityManager
  ): Promise<Login | null> => {
    const userRepo = entityManager.getRepository(Users);

    const result: Users | null = await userRepo
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();

    if (!result) {
      return null;
    }

    return {
      id: result.id,
      password: result.password,
      roles: result.roles,
    };
  },

  // Fetch any particular user's data.
  checkUserByEmailPort: async (
    email: string,
    entityManager: EntityManager
  ): Promise<boolean> => {
    const userRepo = entityManager.getRepository(Users);

    const exists = await userRepo
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getExists();

    return exists;
  },

  // Fetch all the user's data.
  getAllUsersPort: async (
    entityManager: EntityManager
  ): Promise<getUser[] | null> => {
    const userRepo = entityManager.getRepository(Users);

    const result: getUser[] = await userRepo
      .createQueryBuilder("user")
      .getMany();

    if (!result) {
      return null;
    }

    return result.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      roles: user.roles,
    }));
  },

  // Fetching the Particular User.
  getTargetUserPort: async (
    id: number,
    entityManager: EntityManager
  ): Promise<getUser | null> => {
    const userRepo = entityManager.getRepository(Users);

    const result: getUser | null = await userRepo
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();

    if (!result) {
      return null;
    }

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      phone: result.phone,
      password: result.password,
      roles: result.roles,
    };
  },
  // Deleting the particular User.
  deleteUserPort: async (
    id: number,
    entityManager: EntityManager
  ): Promise<boolean | null> => {
    const userRepo = entityManager.getRepository(Users);

    const deleteResult: DeleteResult = await userRepo
      .createQueryBuilder()
      .delete()
      .from(Users)
      .where("id = :id", { id })
      .execute();

    return (deleteResult.affected ?? 0) > 0;
  },
  // Updating the User.
  updateUserPort: async (
    user: updateUser,
    entityManager: EntityManager
  ): Promise<boolean> => {
    const { id, ...fieldsToUpdate } = user;

    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new Error("No fields to provide for update.");
    }

    const userRepo = entityManager.getRepository(Users);

    const updateResult = await userRepo
      .createQueryBuilder()
      .update(Users)
      .set(fieldsToUpdate)
      .where("id = :id", { id })
      .execute();

    return updateResult.affected !== undefined && updateResult.affected > 0;
  },
  wrapTransaction,
};
