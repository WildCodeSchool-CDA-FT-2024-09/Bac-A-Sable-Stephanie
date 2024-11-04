// import express from "express";
// import router from "./router";
import * as dotenv from "dotenv";
// import cors from "cors";
// import "reflect-metadata";
// import AppDataSource from "./data-source";

dotenv.config();
const { PORT } = process.env;

// const app = express();

// app.use(
//   cors({
//     origin: CLIENT_URL,
//   })
// );

// app.use(express.json());
// app.use("/api", router);

// app.listen(APP_PORT, async () => {
//   await AppDataSource.initialize();
//   console.log(`Server is listening on http://localhost:${APP_PORT}`);
// });
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import AppDataSource from "./data-source";
import { buildSchema } from "type-graphql";
import RepoResolver from "./repos/repo.resolvers";
import CommentResolver from "./comment/comment.resolver";
import LangResolver from "./langs/lang.resolvers";

// const typeDefs = `#graphql

//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This type defines the queryable fields for every book in our data source.

//   type Repo {
//   id: String
//   name: String
//   url: String
//   isPrivate: Int
//   }
//   type Status{
//   id: Int
//   label: String
//   }

//   # The "Query" type is special: it lists all of the available queries that

//   # clients can execute, along with the return type for each. In this

//   # case, the "books" query returns an array of zero or more Books (defined above).

//   type Query {
//     repos: [Repo]
//     status: [Status]
//   }

// `;
// const resolvers = {
//   Query: {
//     repos: async () => {
//       const repoRepository = AppDataSource.getRepository(Repo);
//       return await repoRepository.find();
//     },
//     status: async () => {
//       const statusRepository = AppDataSource.getRepository(Status);
//       return await statusRepository.find();
//     },
//   },
// };

(async () => {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolver, CommentResolver, LangResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
