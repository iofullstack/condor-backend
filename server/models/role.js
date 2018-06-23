import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const RoleSchema = new Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  permits: [{ type: ObjectId, ref: 'Permit', default: [] }]
})

export default mongoose.model('Role', RoleSchema)
