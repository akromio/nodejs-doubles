"use strict";

var _core = require("@dogmalang/core");
const Simulator = _core.dogma.use(require("../simulator/Simulator"));
const $Interceptor = class Interceptor extends Simulator {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('intercepted', _['intercepted'], null);
    Object.defineProperty(this, 'intercepted', {
      value: (0, _core.coalesce)(_['intercepted'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_569315759c4f306b90867948a8bd3c13___init__ instanceof Function) this._pvt_569315759c4f306b90867948a8bd3c13___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_569315759c4f306b90867948a8bd3c13___post__ instanceof Function) this._pvt_569315759c4f306b90867948a8bd3c13___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_569315759c4f306b90867948a8bd3c13___validate__ instanceof Function) this._pvt_569315759c4f306b90867948a8bd3c13___validate__(); /* c8 ignore stop */
  }
};

const Interceptor = new Proxy($Interceptor, {
  apply(receiver, self, args) {
    return new $Interceptor(...args);
  }
});
module.exports = exports = Interceptor;
Interceptor.prototype.hasToIntercept = function (name) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("name", name);
  {
    return _core.dogma.is(name, _core.text) && _core.dogma.includes(this.members, name);
  }
};