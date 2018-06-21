import mongoose, { Schema } from 'mongoose'

const PermitSchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
})

export default mongoose.model('Permit', PermitSchema)
