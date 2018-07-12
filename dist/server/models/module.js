'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose.Schema.Types.ObjectId;


var ModuleSchema = new _mongoose.Schema({
  name: { type: String, required: true },
  permits: [{ type: ObjectId, ref: 'Permit', default: [] }],
  createdAt: { type: Date, default: Date.now, required: true }
});

exports.default = _mongoose2.default.model('Module', ModuleSchema);