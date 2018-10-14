import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const ModuleSchema = new Schema({
  name: { type: String, required: true },
  permits: [{ type: ObjectId, ref: 'Permit', default: [] }],
  createdAt: { type: Date, required: true }
})

export default mongoose.model('Module', ModuleSchema)
