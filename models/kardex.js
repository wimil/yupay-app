import mongoose from "mongoose";
import FloatPlugin from "@waape/mongoose-float";
import mongoosePaginate from "mongoose-paginate-v2";

const Float = FloatPlugin.loadType(mongoose, 2);

const model = mongoose.Schema(
  {
    business: {
      type: mongoose.ObjectId,
      ref: "Business",
    },
    warehouse: {
      type: mongoose.ObjectId,
      ref: "Warehouse",
    },
    product: {
      type: mongoose.ObjectId,
      ref: "Product",
    },
    attachments: {
      type: Object,
    },
    balance: {
      type: Float,
      required: true,
    },
    detail: {
      type: String,
      required: true,
      uppercase: true,
    },
    num: {
      type: Number,
      index: true,
      required: true,
    },
    prevBalance: {
      type: Float,
      required: true,
    },
    totalIn: {
      type: Number,
      required: true,
    },
    totalOut: {
      type: Float,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["IN", "OUT"],
    },
  },
  {
    //_id: false,
    timestamps: true,
    versionKey: false,
  }
);

model.plugin(mongoosePaginate);

export default mongoose.model("Kardex", model);
