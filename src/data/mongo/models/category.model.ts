import mongoose, { Schema } from "mongoose";

const categoryScrema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  available:{
    type:Boolean,
    default:false,
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true,
  }
});


categoryScrema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret, options) {
   delete ret._id; 
  },
});

export const CategoryModel = mongoose.model("Category", categoryScrema);
