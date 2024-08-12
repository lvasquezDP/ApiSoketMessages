import mongoose, { Schema } from "mongoose";

const MessageScrema = new mongoose.Schema({
  emisor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receptor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  entregado: {
    type: Boolean,
    default: false,
  },
  visto: {
    type: Boolean,
    default: false,
  },
});

MessageScrema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret, options) {
    delete ret._id;
  },
});

export const MessageModel = mongoose.model("Message", MessageScrema);
