'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientSchema = new _mongoose.Schema({
  nit_passport: { type: String, required: true, unique: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
});

ClientSchema.plugin(_mongooseUniqueValidator2.default);
exports.default = _mongoose2.default.model('Client', ClientSchema);