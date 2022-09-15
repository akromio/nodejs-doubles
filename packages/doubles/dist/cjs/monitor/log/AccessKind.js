"use strict";

var _core = require("@dogmalang/core");

class AccessKind {
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

module.exports = exports = AccessKind;
Object.defineProperty(AccessKind, "get", {
  value: new AccessKind("get", 1),
  enum: true
});
Object.defineProperty(AccessKind, "set", {
  value: new AccessKind("set", 2),
  enum: true
});