'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageMiddleware = undefined;

var _utils = require('../utils');

var _base64ToImage = require('base64-to-image');

var _base64ToImage2 = _interopRequireDefault(_base64ToImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageMiddleware = exports.imageMiddleware = function imageMiddleware(req, res, next) {
  try {
    var base64Str = req.body.avatar;
    var path = './img/';
    var optionalObj = { 'fileName': +new Date(), 'type': 'png' };

    (0, _base64ToImage2.default)(base64Str, path, optionalObj);

    req.imageInfo = (0, _base64ToImage2.default)(base64Str, path, optionalObj);
    next();
  } catch (err) {
    (0, _utils.handleError)(err, res);
  }
};