"use strict";

var _core = require("@dogmalang/core");
const isEqual = _core.dogma.use(require("lodash.isequal"));
const Behavior = _core.dogma.use(require("./Behavior"));
const $ArgsBasedBehavior = class ArgsBasedBehavior extends Behavior {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_4737a5c8c83360a6985997432a25cf4e___init__ instanceof Function) this._pvt_4737a5c8c83360a6985997432a25cf4e___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4737a5c8c83360a6985997432a25cf4e___post__ instanceof Function) this._pvt_4737a5c8c83360a6985997432a25cf4e___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_4737a5c8c83360a6985997432a25cf4e___validate__ instanceof Function) this._pvt_4737a5c8c83360a6985997432a25cf4e___validate__(); /* c8 ignore stop */
  }
};

const ArgsBasedBehavior = new Proxy($ArgsBasedBehavior, {
  apply(receiver, self, args) {
    return new $ArgsBasedBehavior(...args);
  }
});
module.exports = exports = ArgsBasedBehavior;
ArgsBasedBehavior.prototype.getResponse = function (args) {
  const self = this;
  let resp; /* c8 ignore next */
  _core.dogma.expect("args", args, _core.list);
  {
    var _resp;
    for (const r of this.responses) {
      if (isEqual(args, r.args)) {
        resp = r;
        break;
      }
    }
    resp = (_resp = resp) !== null && _resp !== void 0 ? _resp : this.defaultResponse;
  }
  return resp;
};