import mongoose, { Schema } from 'mongoose'

const DiscountSchema = new Schema({
  percent: { type: Number, required: true},
  createdAt: { type: Date, required: true }
})

export default mongoose.model('Discount', DiscountSchema)
