'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _models = require('../models');

var _bcryptjs = require('bcryptjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = _express2.default.Router();
var debug = new _debug2.default('condor-backend:auth');

// POST /api/auth/signin
app.post('/signin', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, email, password, user, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _models.User.findOne({ email: email });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 7;
              break;
            }

            debug('User with email ' + email + ' not found');
            return _context.abrupt('return', handleLoginFailed(res));

          case 7:
            if ((0, _bcryptjs.compareSync)(password, user.password)) {
              _context.next = 10;
              break;
            }

            debug('Passwords do not match ' + password + ' !== ' + user.password);
            return _context.abrupt('return', handleLoginFailed(res, 'El correo y la contraseña no coinciden'));

          case 10:
            token = createToken(user);

            res.status(200).json({
              message: 'Login success',
              token: token,
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

var createToken = function createToken(user) {
  return _jsonwebtoken2.default.sign({ user: user }, _config.secret, { expiresIn: 86400 });
};

function handleLoginFailed(res, message) {
  return res.status(401).json({
    message: 'Login failed',
    error: message || 'Email and password don\'t match'
  });
}

exports.default = app;