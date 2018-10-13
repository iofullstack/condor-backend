import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const SaucerSchema = new Schema({
  quantity: { type: Number, required: true },
  price: { type: String, required: true },
  menu: { type: ObjectId, ref: 'Menu', required: true }
})

export default mongoose.model('Saucer', SaucerSchema)
