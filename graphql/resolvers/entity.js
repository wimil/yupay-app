import { entityDocTypesKeyBy } from "#root/config/entity";
import Entity from "#root/models/entity";

export default {
  Query: {
    async getEntitiesByBusiness(_, { page, search }, { businessId }) {
      const entities = await Entity.paginate(
        {
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
        },
        {
          //page: 1,
        }
      );

      //console.log(entities);

      return entities;
    },
    async showEntityById(_, { entityId }, { businessId }) {
      const entity = await Entity.findOne({
        business: businessId,
        _id: entityId,
      });

      return entity;
    },
  },
  Mutation: {
    async createEntity(_, { input }, { businessId }) {
      //console.log(ctx);
      await Entity.create({
        ...input,
        business: businessId,
      });

      return {
        success: true,
      };
    },
    async updateEntity(_, { entityId, input }, { businessId }) {
      await Entity.findByIdAndUpdate(entityId, {
        ...input,
      });

      return {
        success: true,
      };
    },
    async deleteEntity(_, { entityId }, { businessId }) {
      await Entity.deleteOne({
        business: businessId,
        _id: entityId,
      });

      return {
        success: true,
      };
    },
  },
  Entity: {
    _docType: (item) => {
      return entityDocTypesKeyBy[item.docType];
    },
  },
};
