'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default('condor-cafe:db-api:user');

exports.default = {
  findAll: function findAll() {
    var sort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-createdAt';

    debug('Finding all users');
    return _models.User.find().populate('s_profile').sort(sort);
  },

  findById: function findById(_id) {
    debug('Find user with id ' + _id);
    return _models.User.findOne({ _id: _id }).populate('role').populate({
      path: 'permits',
      options: { sort: '-createdAt' }
    });
  },

  create: function create(u) {
    debug('Creating new user ' + u);
    var user = new _models.User(u);
    return user.save();
  }
};