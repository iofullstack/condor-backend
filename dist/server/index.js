'use strict';

var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongoose2.default.connect(_config.mongoUrl);

          case 2:

            // app.use( publicDir )

            server.listen(PORT, function () {
              debug('Server running at port ' + PORT);
            });

            io.on('connection', function (socket) {
              socket.broadcast.emit('msg', { msg: 'Welcome bro!' });
              console.log('cliente conectado');
              socket.on('msg', function (msg) {
                console.log(msg);
                socket.broadcast.emit('msg', { msg: "Tu Mensaje: " + msg });
              });
            });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _http = require('http');

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import express from 'express'
// import path from 'path'


var PORT = process.env.port || 3500,
    debug = (0, _debug2.default)('condor-backend:root'),
    server = (0, _http.createServer)(_app2.default),
    io = (0, _socket2.default)(server);
// publicDir = express.static( path.join(__dirname, '../../dist/proyect-app') )

_app2.default.set('io', io);

start();