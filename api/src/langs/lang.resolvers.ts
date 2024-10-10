import { Lang } from "./lang.entity";
import { Query, Resolver } from "type-graphql";

@Resolver(Lang)
export default class LangResolver {
  // Methode GET pour tous les repos
  @Query(() => [Lang])
  async alllangs() {
    const langs = await Lang.find({});
    console.info(langs);
    return langs;
  }
}
