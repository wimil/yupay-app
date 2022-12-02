import mongoose from "mongoose";
import FloatPlugin from "@waape/mongoose-float";
import mongoosePaginate from "mongoose-paginate-v2";

const Float = FloatPlugin.loadType(mongoose, 7);

const model = mongoose.Schema(
  {
    business: {
      type: mongoose.ObjectId,
      ref: "Business",
    },
    addedBy: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
    },
    description: {
      type: String,
      required: true,
      uppercase: true,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
    },
    photo: {
      type: String,
    },
    code: {
      type: String,
    },
    barcode: {
      type: String,
    },
    icbper: {
      type: Boolean,
      required: true,
    },
    alertQuantity: {
      type: Number,
    },
    igvType: {
      type: String,
      required: true,
    },
    iscPublicUnitPrice: {
      type: Float,
    },
    iscValue: {
      type: Float,
    },
    salesWithoutStock: {
      type: Boolean,
      required: true,
    },
    stockControl: {
      type: Boolean,
    },
    unit: {
      type: mongoose.Mixed,
      required: true,
    },
    unitPrice: {
      type: Float,
      required: true,
    },
    unitPriceIncIgv: {
      type: Boolean,
      required: true,
    },
    priceVariants: [
      {
        name: String,
        office: mongoose.ObjectId,
        quantityMin: {
          type: Number,
          required: true,
        },
        unitPrice: {
          type: Float,
          required: true,
        },
        unitPriceIncIgv: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

model.plugin(mongoosePaginate);

export default mongoose.model("Product", model);
