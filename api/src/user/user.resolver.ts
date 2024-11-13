import { Arg, Ctx, Query, Resolver } from "type-graphql";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const { AUTH_SECRET_KEY } = process.env;
const me = {
  email: "test@test.com",
  password: "argon2hash",
};
console.log(me);
@Resolver()
export default class UserResolver {
  // Methode GET pour tous les repos
  @Query(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx()
    context: { res: { setHeader: (name: string, value: string) => void } }
  ) {
    console.info(email, password);
    if (me.email === email) {
      if (me.password === password) {
        const token = jwt.sign(
          { email: me.email, name: "julien" },
          AUTH_SECRET_KEY as string
        );
        context.res.setHeader(
          "Set-Cookie",
          `cdatokenexample=${token};httpOnly;secure;SameSite=Strict;expires=${new Date(
            new Date().getTime() + 1000 * 60 * 60 * 48
          ).toUTCString()}`
        );
        return true;
      }
    }
    return false;
  }
}
