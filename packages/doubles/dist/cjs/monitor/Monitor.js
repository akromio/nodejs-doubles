"use strict";

var _core = require("@dogmalang/core");
const Double = _core.dogma.use(require("../Double"));
const Log = _core.dogma.use(require("./log/Log"));
const $Monitor = class Monitor extends Double {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('log', _['log'], Log);
    Object.defineProperty(this, 'log', {
      value: (0, _core.coalesce)(_['log'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('target', _['target'], null);
    Object.defineProperty(this, 'target', {
      value: (0, _core.coalesce)(_['target'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('members', _['members'], _core.dogma.TypeDef({
      name: 'inline',
      types: [_core.text],
      min: 0,
      max: null
    }));
    Object.defineProperty(this, 'members', {
      value: (0, _core.coalesce)(_['members'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_6d5d4d2373594d4f18d906d4ea54acf9___init__ instanceof Function) this._pvt_6d5d4d2373594d4f18d906d4ea54acf9___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6d5d4d2373594d4f18d906d4ea54acf9___post__ instanceof Function) this._pvt_6d5d4d2373594d4f18d906d4ea54acf9___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_6d5d4d2373594d4f18d906d4ea54acf9___validate__ instanceof Function) this._pvt_6d5d4d2373594d4f18d906d4ea54acf9___validate__(); /* c8 ignore stop */
  }
};

const Monitor = new Proxy($Monitor, {
  apply(receiver, self, args) {
    return new $Monitor(...args);
  }
});
module.exports = exports = Monitor;
Monitor.prototype.hasToBeMonitorized = function (name) {
  const self = this;
  const {
    log,
    members
  } = self; /* c8 ignore next */
  _core.dogma.expect("name", name);
  {
    return (0, _core.len)(members) == 0 || _core.dogma.includes(members, name);
  }
};
Monitor.prototype.saveCall = function (...args) {
  const self = this;
  const {
    log,
    members
  } = self;
  {
    log.saveCall(...args);
  }
  return this;
};
Monitor.prototype.saveAccess = function (...args) {
  const self = this;
  const {
    log,
    members
  } = self;
  {
    log.saveAccess(...args);
  }
  return this;
};