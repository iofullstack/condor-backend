'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// import moment from 'moment-timezone'

var secret = exports.secret = 'miclavesecreta';
var mongoUrl = exports.mongoUrl = 'mongodb://localhost/db-condor';
// export const time = () => moment().tz('America/La_Paz').format()
var time = exports.time = function time() {
  var date = new Date();
  return new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
};