"use strict";

var _core = require("@dogmalang/core");

const Behavior = _core.dogma.use(require("./Behavior"));

const $PositionBasedBehavior = class PositionBasedBehavior extends Behavior {
  constructor(_) {
    super(_);
    /* c8 ignore start */

    if (_ == null) _ = {};
    /* c8 ignore stop */

    Object.defineProperty(this, 'currentIndex', {
      value: -1,
      writable: true,
      enumerable: false
    });
    Object.defineProperty(this, 'validated', {
      value: false,
      writable: true,
      enumerable: false
    });
    /* c8 ignore start */

    if (this._pvt_d2551189215301f7ae9105ae582e2c2c___init__ instanceof Function) this._pvt_d2551189215301f7ae9105ae582e2c2c___init__(_);
    /* c8 ignore stop */

    /* c8 ignore start */

    if (this._pvt_d2551189215301f7ae9105ae582e2c2c___post__ instanceof Function) this._pvt_d2551189215301f7ae9105ae582e2c2c___post__();
    /* c8 ignore stop */

    /* c8 ignore start */

    if (this._pvt_d2551189215301f7ae9105ae582e2c2c___validate__ instanceof Function) this._pvt_d2551189215301f7ae9105ae582e2c2c___validate__();
    /* c8 ignore stop */
  }

};
const PositionBasedBehavior = new Proxy($PositionBasedBehavior, {
  apply(receiver, self, args) {
    return new $PositionBasedBehavior(...args);
  }

});
module.exports = exports = PositionBasedBehavior;

PositionBasedBehavior.prototype.getResponse = function (args) {
  const self = this;
  let resp;
  /* c8 ignore next */

  _core.dogma.expect("args", args, _core.list);

  {
    {
      const i = this.currentIndex += 1;

      if ((0, _core.len)(this.responses) > i) {
        resp = _core.dogma.getItem(this.responses, i);
      } else {
        resp = this.defaultResponse;
      }
    }
  }
  return resp;
};