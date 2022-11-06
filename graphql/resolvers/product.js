import Product from "#models/product";
import { findUnitByCode } from "#root/config/units";
import Category from "#root/models/category";
import { currenciesKeyByCode } from "#config/currency";

const findOneOrCreate = async (categoryName, businessId) => {
  const catName = categoryName ? categoryName.toUpperCase() : null;

  let category = await Category.findOne({
    name: catName,
    business: businessId,
  });

  if (!category) {
    category = await Category.create({
      name: catName,
      business: businessId,
    });
  }

  return category;
};

export default {
  Query: {
    async getProductsByBusiness(_, { businessId }, ctx) {
      const products = await Product.paginate(
        {
          business: businessId,
        },
        {
          populate: "category",
        }
      );

      //console.log(products);

      return products;
    },
  },
  Mutation: {
    async createProduct(_, { businessId, input }, ctx) {
      let categoryId = null;
      if (input.categoryName) {
        categoryId = (await findOneOrCreate(input.categoryName, businessId)).id;
      }

      const product = await Product.create({
        business: businessId,
        ...input,
        category: categoryId,
      });

      return product;
    },
    async updateProduct(_, { businessId, productId, input }, ctx) {
      let categoryId = null;
      if (input.categoryName) {
        categoryId = (await findOneOrCreate(input.categoryName, businessId)).id;
      }
      //console.log(input);

      const product = await Product.findByIdAndUpdate(productId, {
        ...input,
        category: categoryId,
      });

      return product;
    },
  },
  Product: {
    _unit: (item) => {
      //console.log(t);
      return findUnitByCode(item.unit);
    },
    _currency: (item) => {
      //console.log(item);
      return currenciesKeyByCode[item.currency];
    },
    categoryName: (item) => {
      return item.category ? item.category.name : null;
    },
  },
};
