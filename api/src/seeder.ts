import AppDataSource from "./data-source";
import { Lang as LangEntity } from "./langs/lang.entity";
import langs from "../data/langs.json";
import { Status as StatusEntity } from "./status/status.entity";
import status from "../data/status.json";
import { Repo as RepoEntity } from "./repos/repo.entity";
import repo from "../data/repos.json";
import lang_by_repo from "../data/lang_by_repo.json";

(async () => {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();
    await queryRunner.query("TRUNCATE repo_languages_lang CASCADE");
    await queryRunner.query("TRUNCATE lang CASCADE");
    await queryRunner.query("TRUNCATE repo CASCADE");
    await queryRunner.query("TRUNCATE status CASCADE");
    await queryRunner.commitTransaction();

    // Postgres reset sequence
    await queryRunner.query("ALTER SEQUENCE lang_id_seq RESTART WITH 1");
    await queryRunner.query("ALTER SEQUENCE status_id_seq RESTART WITH 1");
    await queryRunner.query("ALTER SEQUENCE comment_id_seq RESTART WITH 1");
    // await queryRunner.query(
    // `TRUNCATE TABLE status, lang RESTART IDENTITY CASCADE`
    // );
    const savedlangs = await Promise.all(
      langs.map(async (el) => {
        const lang = new LangEntity();
        lang.label = el.label;

        return await lang.save();
      })
    );

    //console.log(savedlangs);

    const savedStatus = await Promise.all(
      status.map(async (el) => {
        const status = new StatusEntity();
        status.label = el.label;

        return await status.save();
      })
    );

    //console.log(savedStatus);

    const savedRepos = await Promise.all(
      repo.map(async (repoData) => {
        const repoEntity = new RepoEntity();
        repoEntity.id = repoData.id;
        repoEntity.name = repoData.name;
        repoEntity.url = repoData.url;

        // Find the status for the repo
        const repostatus = savedStatus.find(
          (st) => st.id === repoData.isPrivate
        ) as StatusEntity;
        repoEntity.status = repostatus;

        // Associate languages with the repo
        const associatedLangIds = lang_by_repo
          .filter((lgByRep) => lgByRep.repo_id === repoData.id)
          .map((lgByRep) => lgByRep.lang_id);
        //console.log(
        //"Associated language IDs for repo",
        //repoData.id,
        //":",
        //associatedLangIds
        //);

        // Get the languages that correspond to the associated language IDs
        const mylangs = savedlangs.filter((svLg) =>
          associatedLangIds.includes(svLg.id)
        );

        repoEntity.languages = mylangs;

        return await repoEntity.save();
      })
    );

    console.log(savedRepos.length + " repos created");
  } catch (error) {
    await AppDataSource.destroy();
    console.log(error);
  } finally {
    await AppDataSource.destroy();
  }
})();
