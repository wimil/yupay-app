import Entity from "#root/models/entity";
import Product from "#root/models/product";

export default {
  Query: {
    async autocomplete(_, { type, search, limit }, { businessId }) {
      let results;
      const itemsLimit = limit ? (limit > 30 ? 30 : limit) : 10;

      if (type === "entity") {
        results = await Entity.find({
          business: businessId,
          $or: [
            {
              name: {
                $regex: search,
                $options: "i",
              },
            },
            {
              email: {
                $regex: search,
                $options: "i",
              },
            },
            {
              document: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }).limit(itemsLimit);

        //console.log(results);
      }

      if (type === "product") {
        results = await Product.find({
          business: businessId,
          $or: [
            {
              description: {
                $regex: search,
                $options: "i",
              },
            },
            {
              code: {
                $regex: search,
                $options: "i",
              },
            },
            {
              barcode: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }).limit(itemsLimit);

        //console.log(results);
      }

      return results;
    },
  },
  Mutation: {
    //
  },
  AutocompleteResult: {
    __resolveType(obj, ctx, _) {
      if (obj instanceof Entity) {
        return "Entity";
      }

      if (obj instanceof Product) {
        return "Product";
      }
    },
  },
};
