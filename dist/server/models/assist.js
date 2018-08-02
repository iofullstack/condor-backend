'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose.Schema.Types.ObjectId;


var AssistSchema = new _mongoose.Schema({
  enter: { type: String, required: true },
  leave: { type: String, required: false },
  attend: { type: ObjectId, ref: 'Attend', required: true }
});

exports.default = _mongoose2.default.model('Assist', AssistSchema);