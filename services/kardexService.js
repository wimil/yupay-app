import { KardexType } from "#root/helpers/enums";
import { throwGqlError } from "#root/helpers/utils";
import Kardex from "#root/models/kardex";
import Warehouse from "#root/models/warehouse";
import { GraphQLError } from "graphql";

export const makeKardexDetail = {
  cpe: () => {
    //
  },
  purchase: (docType, docSerie, docNumber) => {
    return `[COMPRA] ${docType} ${docSerie}-${docNumber}`;
  },
  transfer: (from, to, detail) => {
    return `[${from} -> ${to}] ${detail}`.toUpperCase();
  },
  cancel: () => {
    //
  },
  adjustment: (detail) => {
    return `[Ajuste] ${detail}`.toUpperCase();
  },
};

export const getLastKardex = async ({ business, product, warehouse }) => {
  return await Kardex.findOne(
    {
      business,
      product,
      warehouse,
    },
    {},
    {
      sort: {
        num: -1,
      },
    }
  );
};

export const incrementKardex = async ({
  business,
  product,
  warehouse,
  quantity,
  detail,
}) => {
  const lastKardex = await getLastKardex({ business, product, warehouse });

  const prevBalance = lastKardex ? lastKardex.balance : 0;
  const num = lastKardex ? lastKardex.num + 1 : 1;

  const kardex = await Kardex.create({
    business,
    product,
    warehouse,
    detail: detail.toUpperCase(),
    num,
    prevBalance: prevBalance,
    totalIn: quantity,
    totalOut: 0,
    type: "IN",
    balance: prevBalance + quantity,
  });

  return kardex;
};

export const decrementKardex = async ({
  business,
  product,
  warehouse,
  quantity,
  detail,
}) => {
  const lastKardex = await getLastKardex({ business, product, warehouse });

  const prevBalance = lastKardex ? lastKardex.balance : 0;
  const num = lastKardex ? lastKardex.num + 1 : 1;

  const kardex = await Kardex.create({
    business,
    product,
    warehouse,
    detail: detail.toUpperCase(),
    num,
    prevBalance: prevBalance,
    totalIn: 0,
    totalOut: quantity,
    type: "OUT",
    balance: prevBalance - quantity,
  });

  return kardex;
};

export const transferKardex = async ({
  business,
  product,
  fromId,
  toId,
  quantity,
  detail,
}) => {
  const fromKardex = await getLastKardex({
    business,
    product,
    warehouse: fromId,
  });

  if (fromKardex.balance === 0) {
    // Error, no hay suficiente
  }

  const toKardex = await getLastKardex({
    business,
    product,
    warehouse: toId,
  });

  const prevBalance = {
    from: fromKardex ? fromKardex.balance : 0,
    to: toKardex ? toKardex.balance : 0,
  };

  const warehouses = await Warehouse.find({
    id: {
      $in: [fromId, toId],
    },
  });

  const newDetail = makeKardexDetail.transfer(
    warehouses[0].name,
    warehouses[1].name,
    detail
  );

  Kardex.create([
    {
      business,
      product,
      warehouse: fromId,
      totalIn: 0,
      totalOut: quantity,
      prevBalance: prevBalance.from,
      balance: prevBalance.from - quantity,
      type: "OUT",
      detail: newDetail,
      num: fromKardex ? fromKardex.num + 1 : 1,
    },
    {
      business,
      product,
      warehouse: toId,
      totalIn: quantity,
      totalOut: 0,
      prevBalance: prevBalance.to,
      balance: prevBalance.to + quantity,
      type: "IN",
      detail: newDetail,
      num: toKardex ? toKardex.num + 1 : 1,
    },
  ]);

  return {
    success: true,
  };
};

export const adjustmentKardex = async ({
  business,
  product,
  warehouse,
  balance,
  detail,
}) => {
  const lastKardex = await getLastKardex({ business, product, warehouse });

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
  //let balance;
  let totalIn = 0;
  let totalOut = 0;

  if (balance < lastKardex.balance) {
    totalOut = prevBalance - balance;
    //balance = prevBalance - totalOut;
    type = "OUT";
  }

  if (balance > lastKardex.balance) {
    totalIn = balance - prevBalance;
    //balance = prevBalance + quantity;
    type = "IN";
  }

  const newDetail = makeKardexDetail.adjustment(detail);

  await Kardex.create({
    business,
    product,
    warehouse,
    detail: newDetail.toUpperCase(),
    num: lastKardex.num + 1,
    prevBalance: prevBalance,
    totalIn,
    totalOut,
    type,
    balance,
  });
};
