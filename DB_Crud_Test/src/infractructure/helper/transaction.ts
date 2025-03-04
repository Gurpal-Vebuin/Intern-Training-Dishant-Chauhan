import { EntityManager } from "typeorm";
import AppDataSource from "../typeOrm/config/typeorm.ts";

export const wrapTransaction = async <T>(
  fun: (t: EntityManager) => Promise<T>
): Promise<T> => {
  return await AppDataSource.transaction(async (transactionalEntityManager) => {
    return fun(transactionalEntityManager);
  });
};
