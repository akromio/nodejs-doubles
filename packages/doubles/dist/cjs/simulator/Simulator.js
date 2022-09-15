"use strict";

var _core = require("@dogmalang/core");

const Double = _core.dogma.use(require("../Double"));

const Behavior = _core.dogma.use(require("./behavior/Behavior"));

const Response = _core.dogma.use(require("./behavior/Response"));

const Operation = _core.dogma.use(require("./behavior/Operation"));

const $Simulator = class Simulator extends Double {
  constructor(_) {
    super(_);
    /* c8 ignore start */

    if (_ == null) _ = {};
    /* c8 ignore stop */

    Object.defineProperty(this, 'callBehavior', {
      value: (0, _core.coalesce)(_['callBehavior'], null),
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */

    if (_['members'] != null) (0, _core.expect)('members', _['members'], _core.map);
    /* c8 ignore stop */

    Object.defineProperty(this, 'members', {
      value: (0, _core.coalesce)(_['members'], {}),
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */

    if (this._pvt_03d44f9db5eb626e6037e42fcf944e43___init__ instanceof Function) this._pvt_03d44f9db5eb626e6037e42fcf944e43___init__(_);
    /* c8 ignore stop */

    /* c8 ignore start */

    if (this._pvt_03d44f9db5eb626e6037e42fcf944e43___post__ instanceof Function) this._pvt_03d44f9db5eb626e6037e42fcf944e43___post__();
    /* c8 ignore stop */

    /* c8 ignore start */

    if (this._pvt_03d44f9db5eb626e6037e42fcf944e43___validate__ instanceof Function) this._pvt_03d44f9db5eb626e6037e42fcf944e43___validate__();
    /* c8 ignore stop */
  }

};
const Simulator = new Proxy($Simulator, {
  apply(receiver, self, args) {
    return new $Simulator(...args);
  }

});
module.exports = exports = Simulator;

Simulator.prototype.processCall = function (args) {
  const self = this;
  const {
    callBehavior,
    members
  } = self;
  let result;
  /* c8 ignore next */

  _core.dogma.expect("args", args, _core.list);

  {
    {
      const resp = callBehavior.getResponse(args);

      if (resp) {
        result = this.handleResponse(resp, args);
      } else {
        _core.dogma.raise(Error("No response available for simulator."));
      }
    }
  }
  return result;
};

Simulator.prototype.processGet = function (member) {
  const self = this;
  const {
    callBehavior,
    members
  } = self;
  let result;
  /* c8 ignore next */

  _core.dogma.expect("member", member);

  {
    if (_core.dogma.is(result = _core.dogma.getItem(members, member), Behavior)) {
      result = this.handleResponse(result.getResponse([]));
    }
  }
  return result;
};

Simulator.prototype.handleResponse = function (resp, args) {
  const self = this;
  const {
    callBehavior,
    members
  } = self;
  let result;
  /* c8 ignore next */

  _core.dogma.expect("resp", resp, Response);
  /* c8 ignore next */


  if (args != null) _core.dogma.expect("args", args, _core.list);
  {
    {
      const _ = resp.operation;

      switch (_) {
        case Operation.retur:
          {
            result = resp.value;
          }
          /* c8 ignore start */

          break;

        /* c8 ignore stop */

        case Operation.raise:
          {
            _core.dogma.raise(resp.value);
          }
          /* c8 ignore start */

          break;

        /* c8 ignore stop */

        case Operation.resolve:
          {
            result = _core.promise.resolve(resp.value);
          }
          /* c8 ignore start */

          break;

        /* c8 ignore stop */

        case Operation.reject:
          {
            result = _core.promise.reject(resp.value);
          }
          /* c8 ignore start */

          break;

        /* c8 ignore stop */

        case Operation.call:
          {
            result = resp.value(...(args !== null && args !== void 0 ? args : []));
          }
          /* c8 ignore start */

          break;

        /* c8 ignore stop */
      }
    }
  }
  return result;
};