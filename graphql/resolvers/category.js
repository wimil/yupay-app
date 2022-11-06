import Category from "#root/models/category";

export default {
  Query: {
    async getCategories(_, {}, ctx) {
      const categories = await Category.find({});

      return categories;
    },
    async getCategoriesByBusiness(_, { businessId }, ctx) {
      const categories = await Category.find({
        business: businessId,
      });

      return categories;
    },
  },
  Mutation: {
    //
  },
};
