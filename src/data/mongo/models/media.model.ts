import mongoose, { Schema } from "mongoose";
import { envs } from "../../../config";
interface IMedia extends Document {
  emisor: mongoose.Types.ObjectId;
  receptor: mongoose.Types.ObjectId;
  Media?: string;
  img?: string;
  entregado?: boolean;
  visto?: boolean;
}


const MediaSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Media: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

MediaSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret, options) {
    ret.Media = `${envs.BASE}${ret.Media}`;
    delete ret._id;
  },
});

export const MediaModel = mongoose.model("Media", MediaSchema);
