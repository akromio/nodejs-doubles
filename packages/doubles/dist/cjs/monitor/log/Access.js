"use strict";

var _core = require("@dogmalang/core");
const Entry = _core.dogma.use(require("./Entry"));
const AccessKind = _core.dogma.use(require("./AccessKind"));
const $Access = class Access extends Entry {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('member', _['member'], null);
    Object.defineProperty(this, 'member', {
      value: (0, _core.coalesce)(_['member'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('kind', _['kind'], AccessKind);
    Object.defineProperty(this, 'kind', {
      value: (0, _core.coalesce)(_['kind'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_88db894fc1b220e88bd447ff5857e995___init__ instanceof Function) this._pvt_88db894fc1b220e88bd447ff5857e995___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_88db894fc1b220e88bd447ff5857e995___post__ instanceof Function) this._pvt_88db894fc1b220e88bd447ff5857e995___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_88db894fc1b220e88bd447ff5857e995___validate__ instanceof Function) this._pvt_88db894fc1b220e88bd447ff5857e995___validate__(); /* c8 ignore stop */
  }
};

const Access = new Proxy($Access, {
  apply(receiver, self, args) {
    return new $Access(...args);
  }
});
module.exports = exports = Access;
Access.prototype.isGet = function () {
  const self = this;
  const {
    kind
  } = self;
  {
    return _core.dogma.enumEq(kind, "get");
  }
};
Access.prototype.isSet = function () {
  const self = this;
  const {
    kind
  } = self;
  {
    return _core.dogma.enumEq(kind, "set");
  }
};