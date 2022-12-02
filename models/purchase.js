import mongoose from "mongoose";
import FloatPlugin from "@waape/mongoose-float";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseSequence from "mongoose-sequence";

const Autoincrement = mongooseSequence(mongoose);
const Float = FloatPlugin.loadType(mongoose, 7);

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
    user: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    provider: {
      id: mongoose.ObjectId,
      name: String,
      address: String,
      document: String,
      docType: String,
    },
    /*entity: {
      type: mongoose.ObjectId,
      ref: "Entity",
    },*/
    num: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
    },
    docType: {
      type: String,
    },
    docSerie: {
      type: String,
    },
    docNumber: {
      type: String,
    },
    items: [
      {
        warehouse: {
          type: mongoose.ObjectId,
          required: true,
        },
        product: {
          type: mongoose.ObjectId,
          required: true,
        },
        code: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        detail: String,
        quantity: {
          type: Float,
          required: true,
        },
        total: {
          type: Float,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
        unitPrice: {
          type: Float,
          required: true,
        },
      },
    ],
    observation: {
      type: String,
    },
    aditionalFields: [
      {
        title: String,
        description: String,
      },
    ],
    total: {
      type: Float,
    },
    totalString: {
      type: String,
    },
    purchasedAt: {
      type: Date,
    },
    voided: {
      type: Boolean,
      default: false,
    },
    voidedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

model.virtual("addedBy", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
  justOne: true,
});

model.plugin(mongoosePaginate);

export default mongoose.model("Purchase", model);
