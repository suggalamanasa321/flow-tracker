import mongoose, { Schema, Types } from "mongoose";

const transactionSchema = new Schema({
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);