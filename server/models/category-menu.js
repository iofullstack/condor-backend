import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const CategoryMenuSchema = new Schema({
  name: { type: String, required: true, unique: true, index: true },
  color: { type: String, required: true },
  createdAt: { type: Date, required: true }
})

CategoryMenuSchema.plugin(uniqueValidator)
export default mongoose.model('CategoryMenu', CategoryMenuSchema)
