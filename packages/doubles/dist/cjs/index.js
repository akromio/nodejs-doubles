"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simulator = exports.monitor = exports.method = exports.interceptor = exports.fun = exports.field = void 0;

var _core = require("@dogmalang/core");

const simulator = _core.dogma.use(require("./simulator"));

exports.simulator = simulator;

const monitor = _core.dogma.use(require("./monitor"));

exports.monitor = monitor;

const interceptor = _core.dogma.use(require("./interceptor"));

exports.interceptor = interceptor;
const {
  fun,
  method,
  field
} = simulator;
exports.field = field;
exports.method = method;
exports.fun = fun;