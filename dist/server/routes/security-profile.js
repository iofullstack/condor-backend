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

// GET /api/s_profile
app.get('/', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var sp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _dbApi.s_profile.findAll();

                    case 3:
                        sp = _context.sent;

                        res.status(200).json(sp);
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

// GET /api/s_profile/:id
app.get('/:id', _middleware.s_profileMiddleware, function (req, res) {
    try {
        res.status(200).json(req.s_profile);
    } catch (error) {
        (0, _utils.handleError)(error, res);
    }
});

// POST /api/s_profile
// app.post('/', required, async (req, res) => {
app.post('/', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, name, permits, savedSecurityProfile;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _req$body = req.body, name = _req$body.name, permits = _req$body.permits;
                        _context2.prev = 1;
                        _context2.next = 4;
                        return _dbApi.s_profile.create({ name: name, permits: permits });

                    case 4:
                        savedSecurityProfile = _context2.sent;

                        res.status(201).json({
                            message: 'Security Profile saved',
                            response: savedSecurityProfile
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

exports.default = app;