import Purchase from "#models/purchase";
import Kardex from "#models/kardex";
import $_sumBy from "lodash/sumBy";
import { makeKardexDetail } from "#root/helpers/utils";
import { findSunatVoucherTypeByValue } from "#root/config/sunat/voucherTypes";
import { connection } from "#root/services/mongodb";
import NumberToWord from "#root/helpers/numbersToWords";
import dayjs from "dayjs";

export default {
  Query: {
    async getPurchasesByBusiness(
      _,
      { page, filter },
      { businessId, officeId }
    ) {
      const purchases = await Purchase.find({
        business: businessId,
        office: officeId,
        createdAt: {
          $gte: dayjs(filter.date).startOf("day"),
          $lte: dayjs(filter.date).endOf("day"),
        },
      }).sort("-createdAt");

      return purchases;
    },

    async showPurchase(_, { id }, { businessId, officeId }) {
      const purchase = await Purchase.findOne({
        business: businessId,
        _id: id,
      }).populate("addedBy");

      //console.log(purchase);

      return purchase;
    },
  },
  Mutation: {
    async createPurchase(_, { input }, { businessId, officeId, auth }) {
      const session = await connection.startSession();

      //console.log(input);

      try {
        session.startTransaction();

        const sunatVoucherType = findSunatVoucherTypeByValue(input.docType);
        const items = input.items.map((item) => {
          item.total = item.quantity * item.unitPrice;
          return item;
        });

        console.log(items);

        // Obtenemos la compra anterior para icrementar
        const lastPurchase = await Purchase.findOne({
          business: businessId,
        })
          .sort("-num")
          .session(session);

        const total = $_sumBy(items, "total");

        // Paso1: Crear el pago
        const [createdPurchase] = await Purchase.create(
          [
            {
              business: businessId,
              office: officeId,
              user: auth.id,
              provider: input.provider,
              currency: input.currency,
              docType: input.docType,
              docSerie: input.docSerie,
              docNumber: input.docNumber,
              items,
              num: lastPurchase ? lastPurchase.num + 1 : 1,
              observation: input.observation,
              aditionalFields: input.aditionalFields,
              total: total,
              totalString: NumberToWord.toInvoice(total, 2),
            },
          ],
          {
            session,
          }
        );

        //console.log(createdPurchase);

        //Paso 2: Agregar el kardex
        for (const item of items) {
          //Paso 2.1: Obtener el balance anterior
          const lastKardex = await Kardex.findOne({
            business: businessId,
            warehouse: item.warehouse,
            product: item.product,
          })
            .sort("-num")
            .session(session);

          const prevBalance = lastKardex ? lastKardex.balance : 0;
          const num = lastKardex ? lastKardex.num + 1 : 1;

          //Paso 2.2: Insertar el nuevo kardex
          await Kardex.create(
            [
              {
                business: businessId,
                warehouse: item.warehouse,
                product: item.product,
                detail: makeKardexDetail.purchase(
                  createdPurchase.num,
                  sunatVoucherType.text,
                  input.docSerie,
                  input.docNumber
                ),
                num,
                prevBalance: prevBalance,
                totalIn: item.quantity,
                totalOut: 0,
                type: "IN",
                balance: prevBalance + item.quantity,
              },
            ],
            {
              session,
            }
          );
        }

        await session.commitTransaction();
        session.endSession();

        return {
          success: true,
        };
      } catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
      }
    },

    async cancelPurchase(_, { id }, { businessId, officeId }) {
      //Iniciar transaccion
      const session = await connection.startSession();

      try {
        session.startTransaction();

        // Paso 1: anulamos la compra
        const purchase = await Purchase.findOneAndUpdate(
          {
            business: businessId,
            office: officeId,
            id,
          },
          {
            voided: true,
            voidedAt: dayjs(),
          }
        ).session(session);

        const sunatVoucherType = findSunatVoucherTypeByValue(purchase.docType);

        //console.log(purchase);

        //Paso 2: Ajustamos el kardex
        for (const item of purchase.items) {
          //Paso 2.1: Obtener el balance anterior
          const lastKardex = await Kardex.findOne({
            business: businessId,
            warehouse: item.warehouse,
            product: item.product,
          }).session(session);

          const prevBalance = lastKardex ? lastKardex.balance : 0;
          const num = lastKardex ? lastKardex.num + 1 : 1;

          //Paso 2.2: Insertar el nuevo kardex
          await Kardex.create(
            [
              {
                business: businessId,
                warehouse: item.warehouse,
                product: item.product,
                detail: makeKardexDetail.purchase(
                  purchase.num,
                  sunatVoucherType.text,
                  purchase.docSerie,
                  purchase.docNumber,
                  true
                ),
                num,
                prevBalance: prevBalance,
                totalIn: 0,
                totalOut: item.quantity,
                type: "OUT",
                balance: prevBalance - item.quantity,
              },
            ],
            {
              session,
            }
          );
        }
        await session.commitTransaction();
        session.endSession();

        return {
          success: true,
        };
      } catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
      }
    },
  },
};
