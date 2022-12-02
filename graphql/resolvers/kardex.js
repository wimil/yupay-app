import { KardexType } from "#root/helpers/enums";
import Kardex from "#root/models/kardex";
import Warehouse from "#root/models/warehouse";
import { getLastKardex, makeKardexDetail } from "#root/services/kardexService";

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
    async inKardex(_, { businessId, productId, input }, ctx) {
      const common = {
        business: businessId,
        product: productId,
        warehouse: input.fromId,
      };

      const lastKardex = await getLastKardex(common);

      const prevBalance = lastKardex ? lastKardex.balance : 0;
      const num = lastKardex ? lastKardex.num + 1 : 1;

      await Kardex.create({
        ...common,
        detail: input.detail,
        num,
        prevBalance: prevBalance,
        totalIn: input.quantity,
        totalOut: 0,
        type: "IN",
        balance: prevBalance + input.quantity,
      });

      return {
        success: true,
      };

      //return kardex;
    },
    async outKardex(_, { businessId, productId, input }, ctx) {
      const common = {
        business: businessId,
        product: productId,
        warehouse: input.fromId,
      };

      const lastKardex = await getLastKardex(common);

      const prevBalance = lastKardex ? lastKardex.balance : 0;
      const num = lastKardex ? lastKardex.num + 1 : 1;

      await Kardex.create({
        ...common,
        detail: input.detail,
        num,
        prevBalance: prevBalance,
        totalIn: 0,
        totalOut: input.quantity,
        type: "OUT",
        balance: prevBalance - input.quantity,
      });

      return {
        success: true,
      };
    },
    async transferKardex(_, { businessId, productId, input }, ctx) {
      const common = {
        business: businessId,
        product: productId,
        warehouse: input.fromId,
      };

      const fromKardex = await getLastKardex(common);

      if (fromKardex.balance === 0) {
        // Error, no hay suficiente
      }

      const toKardex = await getLastKardex({
        ...common,
        warehouse: input.toId,
      });

      const prevBalance = {
        from: fromKardex ? fromKardex.balance : 0,
        to: toKardex ? toKardex.balance : 0,
      };

      const warehouses = await Warehouse.find({
        id: {
          $in: [input.fromId, input.toId],
        },
      });

      const newDetail = makeKardexDetail.transfer(
        warehouses[0].name,
        warehouses[1].name,
        input.detail
      );

      Kardex.create([
        {
          ...common,
          totalIn: 0,
          totalOut: input.quantity,
          prevBalance: prevBalance.from,
          balance: prevBalance.from - input.quantity,
          type: "OUT",
          detail: newDetail,
          num: fromKardex ? fromKardex.num + 1 : 1,
        },
        {
          ...common,
          warehouse: input.toId,
          totalIn: input.quantity,
          totalOut: 0,
          prevBalance: prevBalance.to,
          balance: prevBalance.to + input.quantity,
          type: "IN",
          detail: newDetail,
          num: toKardex ? toKardex.num + 1 : 1,
        },
      ]);

      return {
        success: true,
      };
    },
    async adjustmentKardex(_, { businessId, productId, input }, ctx) {
      const common = {
        business: businessId,
        product: productId,
        warehouse: input.fromId,
      };

      const balance = input.quantity;

      const lastKardex = await getLastKardex(common);

      if (!lastKardex) {
        /*throw new GraphQLError("test", {
      extensions: {
        code: "BAD",
      },
    });*/
      }

      if (lastKardex.balance === balance) {
        // error
      }

      let type;
      let prevBalance = lastKardex.balance || 0;
      let totalIn = 0;
      let totalOut = 0;

      if (balance < lastKardex.balance) {
        totalOut = prevBalance - balance;
        type = "OUT";
      }

      if (balance > lastKardex.balance) {
        totalIn = balance - prevBalance;
        type = "IN";
      }

      const newDetail = makeKardexDetail.adjustment(input.detail);

      await Kardex.create({
        ...common,
        detail: newDetail,
        num: lastKardex.num + 1,
        prevBalance: prevBalance,
        totalIn,
        totalOut,
        type,
        balance,
      });
    },
  },
};
