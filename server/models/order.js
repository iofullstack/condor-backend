import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const OrderSchema = new Schema({
  numOrder: { type: Number, required: true },
  numPeople: { type: Number, required: true },
  carry: { type: Boolean, required: true },
  user: { type: ObjectId, ref: 'User', required: true },
  tables: [{ type: ObjectId, ref: 'Table', required: true }],
  saucers: [{ type: ObjectId, ref: 'Saucer', required: true }],
  createdAt: { type: Date, required: true },
  status: { type: Boolean, required: true, default: true },
  viewed: { type: Boolean, required: true, default: true }
})

export default mongoose.model('Order', OrderSchema)
