import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const BoxSchema = new Schema({
  day: { type: String, required: true, unique: true, index: true },
  period: [
    {
      opening: { type: String, required: true },
      closing: { type: String, required: false }
    }
  ],
  amount: { type: Number, required: true }
})

BoxSchema.plugin(uniqueValidator)
export default mongoose.model('Box', BoxSchema)
