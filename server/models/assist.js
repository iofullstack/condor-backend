import mongoose, { Schema } from 'mongoose'

const AssistSchema = new Schema({
  enter: { type: Date, required: true, default: Date.now },
  leave: { type: Date, required: true, default: Date.now }
})

export default mongoose.model('Assist', AssistSchema)
