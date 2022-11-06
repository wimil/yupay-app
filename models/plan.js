import mongoose from "mongoose";

const model = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: mongoose.Decimal128,
    },
    limits: {
      type: Object,
    },
    currency: {
      type: String,
    },
    devices: {
      type: Array,
    },
    customSupport: {
      type: Boolean,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Plan", model);
