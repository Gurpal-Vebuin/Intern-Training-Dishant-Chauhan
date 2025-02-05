import db from "../../config/connection.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { UserRepositoryPort } from "./../../../application/port/repositories/userRepository.ts";
import {
  deleteUser,
  updateUser,
  Login,
  tokenUser,
  User,
} from "../../../domain/models/user.ts";
import {
  registerQuery,
  loginUserQuery,
  getUsersQuery,
  getParticularUserQuery,
  getUserTypeQuery,
  deleteUserQuery,
} from "./../sql/mySql.ts";

export const UserRepository: UserRepositoryPort = {
  // Registering the User.
  createUserPort: async (user: User): Promise<boolean> => {
    const [result] = await db.query<ResultSetHeader>(registerQuery, [
      user.name,
      user.email,
      user.phone,
      user.password,
      user.roles,
    ]);

    return result.affectedRows > 0;
  },

  // Logging In
  loginUserPort: async (email: string): Promise<Login | null> => {
    const [result] = await db.query<RowDataPacket[]>(loginUserQuery, [email]);

    if (result.length === 0) {
      return null;
    }

    return {
      email: result[0].email,
      password: result[0].password,
      roles: result[0].roles,
    };
  },

  // Fetch any particular user's data.
  getUserByEmailPort: async (email?: string): Promise<User | null> => {
    if (!email) return null;

    const [result] = await db.query<RowDataPacket[]>(getParticularUserQuery, [
      email,
    ]);

    if (result.length === 0) {
      return null;
    }

    return result[0] as User;
  },

  // Fetch all the user's data.
  getAllUsersPort: async (): Promise<User[]> => {
    const [result] = await db.query<RowDataPacket[]>(getUsersQuery);

    if (result.length === 0) {
      return [];
    }

    return result as User[];
  },
  // Fetching the Id of the Target User
  getTargetUser: async (id?: string): Promise<deleteUser | null> => {
    const [targetUserId] = await db.query<RowDataPacket[]>(getUserTypeQuery, [
      id,
    ]);
    if (targetUserId.length === 0) {
      return null;
    }
    return targetUserId[0] as deleteUser;
  },
  getTokenUserId: async (email: string): Promise<tokenUser | null> => {
    const [tokenUserId] = await db.query<RowDataPacket[]>(
      getParticularUserQuery,
      [email]
    );

    console.log(tokenUserId);
    if (tokenUserId.length === 0) {
      return null;
    }
    return tokenUserId[0].id as tokenUser;
  },
  // Deleting the particular User.
  deleteUserPort: async (id: number): Promise<boolean> => {
    const [deleteResult] = await db.query<RowDataPacket[]>(deleteUserQuery, [
      id,
    ]);
    return deleteResult.length > 0;
  },
  // Updating the User.
  updateUserPort: async (user: updateUser): Promise<boolean> => {
    const fields: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(user)) {
      if (key !== "id") {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error("No fields provided for update.");
    }

    values.push(user.id);
    const updateQuery = `update user set ${fields.join(", ")} where id = ?`;

    console.log("Executing Query:", updateQuery, "With Values:", values);

    const [updateResult] = await db.query<ResultSetHeader>(updateQuery, values);
    return updateResult.affectedRows > 0;
  },
};
