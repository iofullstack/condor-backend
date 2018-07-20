import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const AttendSchema = new Schema({
  day: { type: String, required: true, default: new Date().toISOString().slice(0,10), unique: true, index: true },
  note: { type: String, required: false },
  assist: [{ type: ObjectId, ref: 'Assist', required: true }],
  user: { type: ObjectId, ref: 'User', required: true }
})

AttendSchema.plugin(uniqueValidator)
export default mongoose.model('Attend', AttendSchema)
