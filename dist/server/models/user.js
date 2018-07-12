'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose.Schema.Types.ObjectId;


var UserSchema = new _mongoose.Schema({
  ci: { type: Number, required: true },
  exp: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String, required: true, default: 'avatar.png' },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  birthdate: { type: Date, required: true },
  address: { type: String, required: true },
  cellphone: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  s_profile: { type: ObjectId, ref: 'SecurityProfile', required: true }
});

UserSchema.plugin(_mongooseUniqueValidator2.default);
exports.default = _mongoose2.default.model('User', UserSchema);