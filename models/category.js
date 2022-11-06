import mongoose from "mongoose";

const model = mongoose.Schema(
  {
    business: {
      type: mongoose.ObjectId,
      ref: "Business",
    },
    name: {
      type: String,
      //unique: true,
      //required: true,
      //index: true,
    },
  },
  {
    //_id: false,
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Category", model);
