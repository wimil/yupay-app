import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const model = mongoose.Schema(
  {
    business: {
      type: mongoose.ObjectId,
      ref: "Business",
    },
    name: {
      type: String,
      uppercase: true,
      required: true,
      index: true,
    },
    photo: {
      type: String,
    },
    email: {
      type: String,
      index: true,
    },
    phoneNumber: {
      type: String,
    },
    document: {
      type: String,
      required: true,
      index: true,
    },
    docType: {
      type: String,
      required: true,
      enum: ["1", "4", "6", "7", "0"],
    },
    address: {
      type: String,
    },
    addresses: {
      type: Array,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

model.plugin(mongoosePaginate);

export default mongoose.model("Entity", model);
