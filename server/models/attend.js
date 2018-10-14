import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { ObjectId } = Schema.Types

const AttendSchema = new Schema({
  day: { type: String, required: true, unique: true, index: true },
  note: { type: String, required: false },
  assists: [{ type: ObjectId, ref: 'Assist', default: [] }],
  user: { type: ObjectId, ref: 'User', required: true }
})

AttendSchema.plugin(uniqueValidator)
export default mongoose.model('Attend', AttendSchema)
