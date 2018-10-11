'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userMiddlewareCI = exports.userMiddleware = undefined;

var _dbApi = require('../db-api');

var _utils = require('../utils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var userMiddleware = exports.userMiddleware = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _dbApi.user.findById(req.params.id);

          case 3:
            req.user = _context.sent;

            next();
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

  return function userMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var userMiddlewareCI = exports.userMiddlewareCI = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _dbApi.user.findByCI(req.params.ci);

          case 3:
            req.user = _context2.sent;

            next();
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            (0, _utils.handleError)(_context2.t0, res);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function userMiddlewareCI(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();