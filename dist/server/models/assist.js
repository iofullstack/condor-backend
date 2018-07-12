'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssistSchema = new _mongoose.Schema({
  enter: { type: Date, required: true, default: Date.now },
  leave: { type: Date, required: true, default: Date.now }
});

exports.default = _mongoose2.default.model('Assist', PermitSchema);