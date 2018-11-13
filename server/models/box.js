import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const BoxSchema = new Schema({
  day: { type: String, required: true, unique: true, index: true },
  period: [
    {
      amount: { type: Number, required: true },
      opening: { type: String, required: true },
      closing: { type: String, required: false },
      accumulated: { type: Number, required: false, default: 0 }
    }
  ]
})

BoxSchema.plugin(uniqueValidator)
export default mongoose.model('Box', BoxSchema)
