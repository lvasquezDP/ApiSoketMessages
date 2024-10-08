import mongoose, { Schema } from "mongoose";

const userScrema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  img: {
    type: Schema.Types.ObjectId,
    ref: "Media",
  },
  avatar: {
    type: Schema.Types.ObjectId,
    ref: "Media",
  },
  role: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
});


userScrema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret, options) {
   delete ret._id; 
   delete ret.password;
  },
});

export const UserModel = mongoose.model("User", userScrema);
