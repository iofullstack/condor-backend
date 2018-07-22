import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const AssistSchema = new Schema({
  enter: { type: String, required: true },
  leave: { type: String, required: false },
  attend: { type: ObjectId, ref: 'User', required: true }
})

export default mongoose.model('Assist', AssistSchema)
