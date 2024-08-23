import mongoose, { Schema } from "mongoose";
interface IMessage extends Document {
  emisor: mongoose.Types.ObjectId;
  receptor: mongoose.Types.ObjectId;
  message?: string;
  img?: string;
  entregado?: boolean;
  visto?: boolean;
}

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
    validate: {
      validator: function (this: IMessage, value: string) {
        // Si no hay mensaje, debe haber una imagen
        return value || this.img;
      },
      message: "El mensaje es requerido si no se proporciona una imagen.",
    },
  },
  img: {
    type: String,
    validate: {
      validator: function (this: IMessage, value: string) {
        // Si no hay imagen, debe haber un mensaje
        return value || this.message;
      },
      message: "La imagen es requerida si no se proporciona un mensaje.",
    },
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
