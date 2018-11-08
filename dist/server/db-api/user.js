'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _models = require('../models');

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default('condor-cafe:db-api:user');

exports.default = {
  findAll: function findAll() {
    var sort = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-createdAt';

    debug('Finding all users');
    return _models.User.find({ status: true }).populate('s_profile').sort(sort);
  },

  findById: function findById(_id) {
    debug('Find user with id ' + _id);
    return _models.User.findOne({ _id: _id, status: true }).populate({
      path: 's_profile',
      populate: { path: 'permits', options: { sort: 'action' } }
    });
  },

  findByCI: function findByCI(ci) {
    debug('Find user with CI ' + ci);
    return _models.User.findOne({ ci: ci, status: true });
  },

  create: function create(u) {
    u.createdAt = (0, _config.time)();
    debug('Creating new user ' + u);
    var user = new _models.User(u);
    return user.save();
  }
};