import mongoose, { Schema } from 'mongoose'

const PermitSchema = new Schema({
  action: { type: String, required: true },
  description: { type: String, required: true }
})

export default mongoose.model('Permit', PermitSchema)
