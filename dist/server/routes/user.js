'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dbApi = require('../db-api');

var _utils = require('../utils');

var _middleware = require('../middleware');

var _bcryptjs = require('bcryptjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = _express2.default.Router();

// GET /api/users
app.get('/', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _dbApi.user.findAll();

          case 3:
            users = _context.sent;

            res.status(200).json(users);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            (0, _utils.handleError)(_context.t0, res);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// GET /api/users/:id
app.get('/:id', _middleware.userMiddleware, function (req, res) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    (0, _utils.handleError)(error, res);
  }
});

// POST /api/users
app.post('/', _middleware.imageMiddleware, function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var u, savedUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            u = req.body;

            u.password = (0, _bcryptjs.hashSync)(u.password, 10);
            u.avatar = req.imageInfo.fileName;

            _context2.prev = 3;
            _context2.next = 6;
            return _dbApi.user.create(u);

          case 6:
            savedUser = _context2.sent;

            res.status(201).json({
              message: 'User saved',
              savedUser: savedUser
            });
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](3);

            (0, _utils.handleError)(_context2.t0, res);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 10]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = app;