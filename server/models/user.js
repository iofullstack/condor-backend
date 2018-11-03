import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { ObjectId } = Schema.Types

const UserSchema = new Schema({
  ci: { type: Number, required:true },
  exp: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String, required:true, default: 'avatar.png' },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  birthdate: { type: Date, required: true },
  address: { type: String, required: true },
  cellphone: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  status: { type: Boolean, required: true, default: true },
  s_profile: { type: ObjectId, ref: 'SecurityProfile', required: true }
})

UserSchema.plugin(uniqueValidator)
export default mongoose.model('User', UserSchema)
