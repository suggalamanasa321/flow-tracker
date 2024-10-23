import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String },
  type: { type: String, enum: ["income", "expense"], required: true },
});

export const Category = mongoose.model("Category", categorySchema);