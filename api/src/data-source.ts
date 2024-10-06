import { DataSource } from "typeorm";
import Repo from "./repos/repo.entity";
import Status from "./status/status.entity";
import Lang from "./langs/lang.entity";
import Comment from "./comment/comment.entity";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  // logging: true,
  entities: [Repo, Status, Lang, Comment],
  migrations: [],
});

export default AppDataSource;
