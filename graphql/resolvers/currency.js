import { currencies } from "#root/config/currency";

export default {
  Query: {
    async getCurrencies(_, {}, ctx) {
      return currencies;
    },
  },
  Mutation: {
    //
  },
};
