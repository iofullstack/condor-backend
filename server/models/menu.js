import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { ObjectId } = Schema.Types

const MenuSchema = new Schema({
  code: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  src: { type: String, required: true },
  contain: [{ type: String, default: [] }],
  type: [{ type: String, default: [] }],
  extra: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    }
  ],
  createdAt: { type: Date, required: true },
  status: { type: Boolean, required: true, default: true },
  category: { type: ObjectId, ref: 'CategoryMenu', required: true },
  prices: [{ type: ObjectId, ref: 'Price', default: [] }]
})

MenuSchema.plugin(uniqueValidator)
export default mongoose.model('Menu', MenuSchema)
