import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const TableSchema = new Schema({
  numTable: { type: String, required: true, unique: true, index: true },
  capacity: { type: Number, required: true }
})

TableSchema.plugin(uniqueValidator)
export default mongoose.model('Table', TableSchema)
