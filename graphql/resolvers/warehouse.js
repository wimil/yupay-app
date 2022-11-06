import Warehouse from "#models/warehouse";

export default {
  Query: {
    async getWarehousesByBusiness(_, { business }, ctx) {
      const warehouses = await Warehouse.find({
        business: business,
      });

      return warehouses;
    },
  },
  Mutation: {
    //
  },
};
