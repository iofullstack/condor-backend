import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const ClientSchema = new Schema({
  nit_passport: { type: String, required: true, unique: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: Date, required: true }
})

ClientSchema.plugin(uniqueValidator)
export default mongoose.model('Client', ClientSchema)
