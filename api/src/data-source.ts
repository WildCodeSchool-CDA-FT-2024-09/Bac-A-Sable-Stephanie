import { DataSource } from "typeorm";
import { Repo } from "./repos/repo.entity";
import { Status } from "./status/status.entity";
import { Lang } from "./langs/lang.entity";
import { Comment } from "./comment/comment.entity";
import * as dotenv from "dotenv";

dotenv.config();
const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
  process.env;
// const AppDataSource = new DataSource({
//   type: "sqlite",
//   database: "database.sqlite",
//   synchronize: true,
//   // logging: true,
//   entities: [Repo, Status, Lang, Comment],
//   migrations: [],
// });

const AppDataSource = new DataSource({
  type: DB_TYPE as any,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  // logging: true,
  entities: [Repo, Status, Lang, Comment],
  migrations: [],
});

export default AppDataSource;
