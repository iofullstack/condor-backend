import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const PriceSchema = new Schema({
  name: { type: String, required: true, unique: true, index: true },
  amount: { type: Number, required: true},
  createdAt: { type: Date, required: true, default: Date.now }
})

PriceSchema.plugin(uniqueValidator)
export default mongoose.model('Price', PriceSchema)
