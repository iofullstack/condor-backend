'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middleware = require('../middleware');

var _dbApi = require('../db-api');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = _express2.default.Router();

// GET /api/clients
app.get('/', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var clients;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _dbApi.client.findAll();

          case 3:
            clients = _context.sent;

            res.status(200).json(clients);
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

// GET /api/clients/:id
app.get('/:id', _middleware.clientMiddleware, function (req, res) {
  try {
    res.status(200).json(req.client);
  } catch (error) {
    (0, _utils.handleError)(error, res);
  }
});

// POST /api/clients
// app.post('/', required, async (req, res) => {
app.post('/', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, nit_passport, firstName, lastName, c, savedClient;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, nit_passport = _req$body.nit_passport, firstName = _req$body.firstName, lastName = _req$body.lastName;
            c = {
              nit_passport: nit_passport,
              firstName: firstName,
              lastName: lastName
            };
            _context2.prev = 2;
            _context2.next = 5;
            return _dbApi.client.create(c);

          case 5:
            savedClient = _context2.sent;

            res.status(201).json({
              message: 'Client saved',
              savedClient: savedClient
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](2);

            (0, _utils.handleError)(_context2.t0, res);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 9]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = app;