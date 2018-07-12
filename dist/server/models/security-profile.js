'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose.Schema.Types.ObjectId;


var SecurityProfileSchema = new _mongoose.Schema({
  name: { type: String, required: true },
  permits: [{ type: ObjectId, ref: 'Permit', default: [] }]
});

exports.default = _mongoose2.default.model('SecurityProfile', SecurityProfileSchema);