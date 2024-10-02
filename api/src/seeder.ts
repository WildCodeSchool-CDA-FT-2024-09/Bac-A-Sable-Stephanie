import AppDataSource from "./data-source";
import LangEntity from "./langs/lang.entity";
import langs from "../data/langs.json";
import StatusEntity from "./status/status.entity";
import status from "../data/status.json";
import RepoEntity from "./repos/repo.entity";
import repo from "../data/repos.json";
import lang_by_repo from "../data/lang_by_repo.json";
import Status from "./status/status.entity";

(async () => {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();
    await queryRunner.query("DELETE FROM repo_languages_lang");
    await queryRunner.query("DELETE FROM lang");
    await queryRunner.query("DELETE FROM repo");
    await queryRunner.query("DELETE FROM status");

    await queryRunner.query(
      'DELETE FROM sqlite_sequence WHERE name="status" OR name="lang"'
    );
    const savedlangs = await Promise.all(
      langs.map(async (el) => {
        const lang = new LangEntity();
        lang.label = el.label;

        return await lang.save();
      })
    );

    console.log(savedlangs);

    const savedStatus = await Promise.all(
      status.map(async (el) => {
        const status = new StatusEntity();
        status.label = el.label;

        return await status.save();
      })
    );

    console.log(savedStatus);

    const savedRepos = await Promise.all(
      repo.map(async (repoData) => {
        const repoEntity = new RepoEntity();
        repoEntity.id = repoData.id;
        repoEntity.name = repoData.name;
        repoEntity.url = repoData.url;

        // Find the status for the repo
        const repostatus = savedStatus.find(
          (st) => st.id === repoData.isPrivate
        ) as Status;
        repoEntity.status = repostatus;

        // Associate languages with the repo
        const associatedLangIds = lang_by_repo
          .filter((lgByRep) => lgByRep.repo_id === repoData.id)
          .map((lgByRep) => lgByRep.lang_id);
        console.log(associatedLangIds);

        // Get the languages that correspond to the associated language IDs
        const mylangs = savedlangs.filter((svLg) =>
          associatedLangIds.includes(svLg.id)
        );

        repoEntity.languages = mylangs;

        return await repoEntity.save();
      })
    );

    console.log(savedRepos);

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.log(error);
  }
})();
