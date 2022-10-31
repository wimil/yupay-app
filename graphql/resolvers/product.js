import Product from "../../models/product";

export default {
  Query: {},
  Mutation: {
    async createProduct(_, { businessId, input }, ctx) {
      //console.log(input);
      const product = await Product.create({
        business: businessId,
        ...input,
      });

      return product;
    },
  },
};
