import { units } from "#config/units";

export default {
  Query: {
    async getUnits(_, { business }, ctx) {
      return units;
    },
  },
  Mutation: {
    //
  },
};
