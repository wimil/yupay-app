import mongoose from "mongoose";

const model = mongoose.Schema(
  {
    name: {
      type: String,
    },
    months: {
      type: Number,
    },
    discount: {
      type: Number,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.model("Period", model);
