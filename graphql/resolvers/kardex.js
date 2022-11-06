import { KardexType } from "#root/helpers/enums";
import Kardex from "#root/models/kardex";
import Warehouse from "#root/models/warehouse";
import {
  adjustmentKardex,
  decrementKardex,
  incrementKardex,
  makeKardexDetail,
  transferKardex,
} from "#root/services/kardexService";

export default {
  Query: {
    async getKardexByProduct(
      _,
      { businessId, productId, warehouseId, page },
      ctx
    ) {
      const kardex = await Kardex.paginate(
        {
          business: businessId,
          product: productId,
          warehouse: warehouseId,
        },
        {
          sort: {
            num: -1,
          },
          limit: 30,
          page: page || 1,
        }
      );

      return kardex;
    },
  },
  Mutation: {
    async saveKardex(_, { businessId, productId, input }, ctx) {
      const data = {
        business: businessId,
        product: productId,
        warehouse: input.fromId,
        quantity: input.quantity,
        detail: input.detail,
      };

      if (input.action === "IN") {
        incrementKardex(data);
      }

      if (input.action === "OUT") {
        decrementKardex(data);
      }

      if (input.action === "TRANSFER") {
        transferKardex({
          ...data,
          fromId: input.fromId,
          toId: input.toId,
        });
      }

      if (input.action === "ADJUSTMENT") {
        adjustmentKardex({
          ...data,
          balance: input.quantity,
        });
      }

      return {
        success: true,
      };
    },
  },
};
