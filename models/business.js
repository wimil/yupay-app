import mongoose from "mongoose";

const model = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    ruc: {
      type: String,
      unique: true,
    },
    solUsername: {
      type: String,
    },
    solPassword: {
      type: String,
    },
    fiscalAddress: {
      type: String,
    },
    tradename: {
      type: String,
    },
    ubigeo: {
      type: String,
    },
    logo: {
      type: String,
    },
    type: String,
    department: String,
    province: String,
    district: String,
    enrollmentDate: String,
    emissionSystem: String,
    accountingSystem: String,
    outdoorActivity: String,
    economicActivities: Array,
    cpPago: Array,
    sistElectronica: Array,
    fechaPle: String,
    padrones: Array,
    fechaBaja: String,
    profesion: String,
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

export default mongoose.model("Business", model);
