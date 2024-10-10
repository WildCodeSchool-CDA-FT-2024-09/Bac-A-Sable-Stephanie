import { In } from "typeorm";
import { Repo } from "./repo.entity";
import { Query, Resolver, Arg } from "type-graphql";

// Mutation, Arg, Field, InputType,
/**
 * type Repo {
 *  id: string
 *  ...
 * }
 */
// @InputType()
// class RepoInput implements Partial<Repo> {
//   @Field()
//   id: string;

//   @Field()
//   url: string;
// }

@Resolver(Repo)
export default class RepoResolver {
  // Methode GET pour tous les repos
  @Query(() => [Repo])
  async fullrepos(@Arg("langlabel", { nullable: true }) langlabel?: string) {
    if (langlabel) {
      const repos = await Repo.createQueryBuilder("repo")
        .leftJoinAndSelect("repo.languages", "languages")
        .where("languages.label = :langlabel", { langlabel })
        .getMany();
      const fulllangrepos = await Repo.find({
        relations: {
          status: true,
          languages: true,
        },
        where: {
          id: In(repos.map((repo) => repo.id)),
        },
      });

      console.info(fulllangrepos); // Log the result to see what is returned
      return fulllangrepos;
    } else {
      const repos = await Repo.find({
        relations: {
          status: true,
          languages: true,
          comments: true,
        },
      });
      console.info(repos);
      return repos;
    }
  }

  @Query(() => Repo) // Change to `Repo` instead of `RepoById`
  async repobyid(@Arg("id") id: string): Promise<Repo | null> {
    const repo = await Repo.findOne({
      where: { id },
      relations: {
        status: true,
        languages: true,
        comments: true,
      },
    });

    console.info(repo);
    return repo;
  }
  @Query(() => [Repo])
  async repobylang(@Arg("langlabel", { nullable: true }) langlabel?: string) {
    // If langlabel is not provided, return all repos or handle accordingly
    if (!langlabel) {
      return await Repo.find({
        relations: {
          status: true,
          languages: true,
        },
      });
    }

    const repos = await Repo.createQueryBuilder("repo")
      .leftJoinAndSelect("repo.languages", "languages")
      .where("languages.label = :langlabel", { langlabel })
      .getMany();

    // Optional: Fetch full details of each repo if needed
    const fulllangrepos = await Repo.find({
      relations: {
        status: true,
        languages: true,
      },
      where: {
        id: In(repos.map((repo) => repo.id)),
      },
    });

    console.info(fulllangrepos); // Log the result to see what is returned
    return fulllangrepos; // Return the full repos found
  }
}

//    @Mutation(() => Repo)
// async createNewRepo(@Arg("data") newRepo: RepoInput) {
//   //const newRepo: RepoInput = req.body.data
//   // fonction de validation
//   console.info(newRepo);

//   const repo = new Repo();
//   repo.id = newRepo.id;
//   repo.name = newRepo.name;
//   repo.url = newRepo.url;

//   const status = await Status.findOneOrFail({
//     where: { id: +newRepo.isPrivate },
//   });
//   repo.status = status;

//   await repo.save();
//   console.log("repo", repo);
//   const myRepo = await Repo.findOneOrFail({
//     where: { id: newRepo.id },
//     relations: {
//       langs: true,
//       status: true,
//     },
//   });
//   console.log("myRepo", myRepo);
//   return myRepo;
