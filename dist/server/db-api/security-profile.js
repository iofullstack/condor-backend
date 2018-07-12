'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default('condor-cafe:db-api:security-profile');

exports.default = {
  findAll: function findAll() {
    debug('Finding all security-profile');
    return _models.SecurityProfile.find().populate('permits');
  },

  findById: function findById(_id) {
    debug('Find security-profile with id ' + _id);
    return _models.SecurityProfile.findOne({ _id: _id });
  },

  create: function create(sp) {
    debug('Creating new security-profile ' + sp);
    var s_profile = new _models.SecurityProfile(sp);
    return s_profile.save();
  }
};