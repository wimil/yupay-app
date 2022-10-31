import Office from "../../models/office";
//import currency from "../../helpers/currency";

export default {
  Query: {
    async startApp(_, { business }, ctx) {
      const offices = Office.find({
        business: business,
      });

      return {
        offices,
        //currencies: currency.list,
      };
    },
  },
  Mutation: {
    //
  },
};
