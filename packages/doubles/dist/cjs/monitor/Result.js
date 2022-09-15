"use strict";

var _core = require("@dogmalang/core");

class Result {
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

module.exports = exports = Result;
Object.defineProperty(Result, "returned", {
  value: new Result("returned", 1),
  enum: true
});
Object.defineProperty(Result, "raised", {
  value: new Result("raised", 2),
  enum: true
});