import mongoose, { Schema, model, models } from 'mongoose'

const ExpenseSchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  includeTime: { type: Boolean, default: false },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  tags: { type: String },
  notes: { type: String },
  location: { type: String },
  recurring: { type: Boolean, default: false },
  multiEntry: { type: Boolean, default: false },
}, { timestamps: true })

export default models.Expense || model('Expense', ExpenseSchema)
