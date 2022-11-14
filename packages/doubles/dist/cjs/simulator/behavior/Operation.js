"use strict";

var _core = require("@dogmalang/core");
class Operation {
  constructor(name, val) {
    Object.defineProperty(this, "name", {
      value: name,
      enum: true
    });
    Object.defineProperty(this, "value", {
      value: val,
      enum: true
    });
  }

  /* c8 ignore start */
  toString() {
    return this.name;
  }
  /* c8 ignore stop */
}

module.exports = exports = Operation;
Object.defineProperty(Operation, "retur", {
  value: new Operation("retur", 1),
  enum: true
});
Object.defineProperty(Operation, "raise", {
  value: new Operation("raise", 2),
  enum: true
});
Object.defineProperty(Operation, "resolve", {
  value: new Operation("resolve", 3),
  enum: true
});
Object.defineProperty(Operation, "reject", {
  value: new Operation("reject", 4),
  enum: true
});
Object.defineProperty(Operation, "call", {
  value: new Operation("call", 5),
  enum: true
});