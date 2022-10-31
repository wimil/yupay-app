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
    users: [
      {
        type: mongoose.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

export default mongoose.model("Office", model);
