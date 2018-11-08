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


var AttendSchema = new _mongoose.Schema({
  day: { type: String, required: true, unique: true, index: true },
  note: { type: String, required: false },
  assists: [{ type: ObjectId, ref: 'Assist', default: [] }],
  user: { type: ObjectId, ref: 'User', required: true }
});

AttendSchema.plugin(_mongooseUniqueValidator2.default);
exports.default = _mongoose2.default.model('Attend', AttendSchema);