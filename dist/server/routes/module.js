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

// GET /api/modules
app.get('/', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var modules;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _dbApi.module.findAll();

                    case 3:
                        modules = _context.sent;

                        res.status(200).json(modules);
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

// GET /api/modules/:id
app.get('/:id', _middleware.moduleMiddleware, function (req, res) {
    try {
        res.status(200).json(req.module);
    } catch (error) {
        (0, _utils.handleError)(error, res);
    }
});

// POST /api/modules
// app.post('/', required, async (req, res) => {
app.post('/', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var name, savedModule;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        name = req.body.name;
                        _context2.prev = 1;
                        _context2.next = 4;
                        return _dbApi.module.create({ name: name });

                    case 4:
                        savedModule = _context2.sent;

                        res.status(201).json({
                            message: 'Module saved',
                            savedModule: savedModule
                        });
                        _context2.next = 11;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](1);

                        (0, _utils.handleError)(_context2.t0, res);

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[1, 8]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

// POST /api/modules/:id/permits
// app.post('/:id/permits', required, roleMiddleware, async (req, res) => {
app.post('/:id/permits', _middleware.moduleMiddleware, function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var p, m, savedPermit;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        p = req.body;
                        m = req.module;
                        _context3.prev = 2;
                        _context3.next = 5;
                        return _dbApi.module.createPermit(m, p);

                    case 5:
                        savedPermit = _context3.sent;

                        res.status(201).json({
                            message: 'Permit saved',
                            savedPermit: savedPermit
                        });
                        _context3.next = 12;
                        break;

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](2);

                        (0, _utils.handleError)(_context3.t0, res);

                    case 12:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[2, 9]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

exports.default = app;