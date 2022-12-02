import mongoose from "mongoose";

const model = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    surname: {
      type: String,
    },
    secondSurname: {
      type: String,
    },
    fullName: {
      type: String,
    },
    phoneCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", model);
