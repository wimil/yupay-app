import mongoose from "mongoose";

const model = mongoose.Schema(
  {
    business: {
      type: mongoose.ObjectId,
      ref: "Business",
    },
    office: {
      type: mongoose.ObjectId,
      ref: "Office",
    },
    client: {
      type: mongoose.ObjectId,
      ref: "Entity",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Invoice", model);
