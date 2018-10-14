import mongoose, { Schema } from 'mongoose'

const PriceSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true},
  createdAt: { type: Date, required: true }
})

export default mongoose.model('Price', PriceSchema)
