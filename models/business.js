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
    sol: {
      type: Object,
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
    settings: {
      type: Object
    },
    /*type: String,
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
    profesion: String,*/
    users: [
      {
        type: mongoose.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Business", model);
