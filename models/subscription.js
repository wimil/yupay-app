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
    limits: {
      type: Object,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    months: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Subscription", model);
