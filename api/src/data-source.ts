import { DataSource } from "typeorm";
import Repo from "./repos/repo.entity";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [Repo],
  migrations: [],
});

export default AppDataSource;
