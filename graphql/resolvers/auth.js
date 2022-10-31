import User from "../../models/user";
//import { generateAccessToken } from "../../helpers/utils";
import Hash from "../../helpers/hash";
import Jwt from "../../helpers/jwt";

export default {
  Query: {
    async me(_, {}, ctx) {
      return ctx.auth.user;
    },
  },
  Mutation: {
    async login(_, { email, password }, ctx) {
      const user = await User.findOne({ email });
      if (user && (await Hash.check(password, user.password))) {
        const accessToken = Jwt.generate({
          id: user.id,
        });

        return {
          accessToken,
        };
      }
    },
    async register(_, { input }, ctx) {
      const user = await User.create({
        ...input,
        password: await Hash.make(input.password),
      });

      const accessToken = Jwt.generate({
        id: user.id,
      });

      return {
        accessToken,
      };
    },
  },
};
