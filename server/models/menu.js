import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { ObjectId } = Schema.Types

const MenuSchema = new Schema({
  code: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  src: { type: String, required: true },
  contain: [{ type: String, default: [] }],
  type: [{ type: String, default: [] }],
  category: { type: ObjectId, ref: 'CategoryMenu', required: true },
  prices: [{ type: ObjectId, ref: 'Price', default: [] }]
})

MenuSchema.plugin(uniqueValidator)
export default mongoose.model('Menu', MenuSchema)
