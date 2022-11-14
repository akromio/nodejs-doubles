"use strict";

var _core = require("@dogmalang/core");
const Response = _core.dogma.use(require("./Response"));
const Operation = _core.dogma.use(require("./Operation"));
const $Behavior = class Behavior {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['defaultResponse'] != null) (0, _core.expect)('defaultResponse', _['defaultResponse'], Response); /* c8 ignore stop */
    Object.defineProperty(this, 'defaultResponse', {
      value: (0, _core.coalesce)(_['defaultResponse'], null),
      writable: true,
      enumerable: false
    });
    Object.defineProperty(this, 'responses', {
      value: [],
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_ec09dbab37e822c66ee398a96920b003___init__ instanceof Function) this._pvt_ec09dbab37e822c66ee398a96920b003___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ec09dbab37e822c66ee398a96920b003___post__ instanceof Function) this._pvt_ec09dbab37e822c66ee398a96920b003___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ec09dbab37e822c66ee398a96920b003___validate__ instanceof Function) this._pvt_ec09dbab37e822c66ee398a96920b003___validate__(); /* c8 ignore stop */
  }
};

const Behavior = new Proxy($Behavior, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Behavior' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Behavior;
Behavior.prototype.addResponse = function (decl) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl);
  {
    let value;
    let operation;
    if (_core.dogma.includes(decl, "returns")) {
      value = decl.returns;
      operation = Operation.retur;
    } else if (_core.dogma.includes(decl, "raises")) {
      value = decl.raises;
      operation = Operation.raise;
    } else if (_core.dogma.includes(decl, "resolves")) {
      value = decl.resolves;
      operation = Operation.resolve;
    } else if (_core.dogma.includes(decl, "rejects")) {
      value = decl.rejects;
      operation = Operation.reject;
    } else if (_core.dogma.includes(decl, "invokes")) {
      value = _core.dogma.expect('decl.invokes', decl.invokes, _core.func);
      operation = Operation.call;
    } else {
      _core.dogma.raise(TypeError("returns, raises, resolves or rejects must be set."));
    }
    const resp = Response({
      'args': decl.args,
      'value': value,
      'operation': operation
    });
    if (_core.dogma.includes(decl, "default")) {
      this.defaultResponse = resp;
    } else {
      this.responses.push(resp);
    }
  }
  return this;
};
/* c8 ignore start */
Behavior.prototype.getResponse = function () {
  (0, _core.abstract)();
}; /* c8 ignore stop */