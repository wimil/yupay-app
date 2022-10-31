import Office from "../../models/office";

export default {
  Query: {
    /*async getOfficesByBusiness(_, { business }, ctx) {
      const offices = Office.find({
        business: business,
      });

      return offices;
    },*/
  },
  Mutation: {
    async createOffice(_, { business, input }, ctx, info) {
      //console.log(input);
      const office = await Office.create({
        business,
        ...input,
      });
      return office;
    },
    async updateOffice(_, {}, ctx, info) {
      //
    },
    /*async destroyOffice(_, {}, ctx, info) {
      //
    },*/
  },
};
