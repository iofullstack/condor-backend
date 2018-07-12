import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const SecurityProfileSchema = new Schema({
  name: { type: String, required: true },
  permits: [{ type: ObjectId, ref: 'Permit', default: [] }]
})

export default mongoose.model('SecurityProfile', SecurityProfileSchema)
