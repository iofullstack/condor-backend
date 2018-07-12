'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AttendSchema = new _mongoose.Schema({
  day: { type: String, required: true, default: new Date().toISOString().slice(0, 10), unique: true, index: true },
  note: { type: String, required: false },
  assist: [{ type: ObjectId, ref: 'Assist', default: [] }]
});

AttendSchema.plugin(_mongooseUniqueValidator2.default);
exports.default = _mongoose2.default.model('Attend', AttendSchema);