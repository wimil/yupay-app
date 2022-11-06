import mongoose from "mongoose";

const model = mongoose.Schema(
  {
    business: {
      type: mongoose.ObjectId,
      ref: "Business",
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    series: {
      type: Array,
      default: [],
    },
    users: [
      {
        type: mongoose.ObjectId,
        ref: "User",
      },
    ],
    warehouses: [
      {
        type: mongoose.ObjectId,
        ref: "Warehouse",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Office", model);
