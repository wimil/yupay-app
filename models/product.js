import mongoose from "mongoose";

const product = mongoose.Schema(
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
    name: {
      type: String,
      required: true,
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
    },
    alertQuantity: {
      type: Number,
    },
    igvType: {
      type: String,
    },
    iscPublicUnitPrice: {
      type: mongoose.Decimal128,
    },
    iscValue: {
      type: mongoose.Decimal128,
    },
    salesWithoutStock: {
      type: Boolean,
    },
    stockControl: {
      type: Boolean,
    },
    unit: {
      type: String,
    },
    unitPrice: {
      type: mongoose.Decimal128,
    },
    unitPriceIncIgv: {
      type: Boolean,
    },
    priceVariants: [
      {
        name: String,
        office: mongoose.ObjectId,
        quantityMin: Number,
        unitPrice: mongoose.Decimal128,
        unitPriceIncIgv: Boolean,
      },
    ],
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", product);
