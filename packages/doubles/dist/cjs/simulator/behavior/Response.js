"use strict";

var _core = require("@dogmalang/core");

const Operation = _core.dogma.use(require("./Operation"));

const $Response = class Response {
  constructor(_) {
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */

    /* c8 ignore start */

    if (_['args'] != null) (0, _core.expect)('args', _['args'], _core.list);
    /* c8 ignore stop */

    Object.defineProperty(this, 'args', {
      value: (0, _core.coalesce)(_['args'], null),
      writable: false,
      enumerable: true
    });
    Object.defineProperty(this, 'value', {
      value: (0, _core.coalesce)(_['value'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('operation', _['operation'], Operation);
    Object.defineProperty(this, 'operation', {
      value: (0, _core.coalesce)(_['operation'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */

    if (this._pvt_8c4971dc352f2b8fc05a675618226a13___init__ instanceof Function) this._pvt_8c4971dc352f2b8fc05a675618226a13___init__(_);
    /* c8 ignore stop */

    /* c8 ignore start */

    if (this._pvt_8c4971dc352f2b8fc05a675618226a13___post__ instanceof Function) this._pvt_8c4971dc352f2b8fc05a675618226a13___post__();
    /* c8 ignore stop */

    /* c8 ignore start */

    if (this._pvt_8c4971dc352f2b8fc05a675618226a13___validate__ instanceof Function) this._pvt_8c4971dc352f2b8fc05a675618226a13___validate__();
    /* c8 ignore stop */
  }

};
const Response = new Proxy($Response, {
  apply(receiver, self, args) {
    return new $Response(...args);
  }

});
module.exports = exports = Response;