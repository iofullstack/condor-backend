import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const SaucerSchema = new Schema({
  quantity: { type: Number, required: true },
  contain: [{ type: String, default: [] }],
  type: { type: String, default: '' },
  extra: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  namePrice: { type: String, required: true },
  price: { type: Number, required: true },
  menu: { type: ObjectId, ref: 'Menu', required: true }
})

export default mongoose.model('Saucer', SaucerSchema)
