'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _models = require('../models');

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var debug = new _debug2.default('condor-cafe:db-api:module');

exports.default = {
  findAll: function findAll() {
    debug('Finding all module');
    return _models.Module.find().populate('permits');
  },

  findById: function findById(_id) {
    debug('Find module with id ' + _id);
    return _models.Module.findOne({ _id: _id });
  },

  create: function create(m) {
    m.createdAt = (0, _config.time)();
    debug('Creating new module ' + m);
    var module = new _models.Module(m);
    return module.save();
  },

  createPermit: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(m, p) {
      var permit, savePermit;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              debug('Creating new permit ' + p);
              permit = new _models.Permit(p);
              _context.next = 4;
              return permit.save();

            case 4:
              savePermit = _context.sent;

              m.permits.push(savePermit);
              _context.next = 8;
              return m.save();

            case 8:
              return _context.abrupt('return', savePermit);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function createPermit(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
};