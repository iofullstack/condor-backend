'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default('condor-cafe:db-api:client');

exports.default = {
  findAll: function findAll() {
    var sort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-createdAt';

    debug('Finding all clients');
    return _models.Client.find().sort(sort);
  },

  findById: function findById(_id) {
    debug('Find client with id ' + _id);
    return _models.Client.findOne({ _id: _id });
  },

  create: function create(c) {
    debug('Creating new client ' + c);
    var client = new _models.Client(c);
    return client.save();
  }
};