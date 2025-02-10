import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ["src/infractructure/typeOrm/entities/*.ts"],
  synchronize: true,
  migrationsTableName: "migration_table",
  migrations: ["src/infrastructure/typeOrm/migrations/*.ts"],
});

export default AppDataSource;
