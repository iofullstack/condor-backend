import mongoose, { Schema } from 'mongoose'

const AssistSchema = new Schema({
  enter: { type: Date, required: true, default: Date.now },
  leave: { type: Date, required: true, default: Date.now },
  attend: { type: ObjectId, ref: 'User', required: true }
})

export default mongoose.model('Assist', AssistSchema)
