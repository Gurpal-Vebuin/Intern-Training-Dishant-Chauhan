import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: 3307,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ["src/infractructure/typeOrm/entities/*"],
  synchronize: true,
  migrationsTableName: "migration_table",
  migrations: ["src/infrastructure/typeOrm/migrations/*"],
});
export default AppDataSource;
