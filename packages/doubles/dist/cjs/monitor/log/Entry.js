"use strict";

var _core = require("@dogmalang/core");
const Result = _core.dogma.use(require("../Result"));
const $Entry = class Entry {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'value', {
      value: (0, _core.coalesce)(_['value'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('result', _['result'], Result);
    Object.defineProperty(this, 'result', {
      value: (0, _core.coalesce)(_['result'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_08c8bd51d95a37d7d68928207c15d8da___init__ instanceof Function) this._pvt_08c8bd51d95a37d7d68928207c15d8da___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_08c8bd51d95a37d7d68928207c15d8da___post__ instanceof Function) this._pvt_08c8bd51d95a37d7d68928207c15d8da___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_08c8bd51d95a37d7d68928207c15d8da___validate__ instanceof Function) this._pvt_08c8bd51d95a37d7d68928207c15d8da___validate__(); /* c8 ignore stop */
  }
};

const Entry = new Proxy($Entry, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Entry' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Entry;
Object.defineProperty(Entry.prototype, "returned", {
  enum: true,
  get: function () {
    const self = this;
    {
      return _core.dogma.enumEq(this.result, "returned");
    }
  }
});
Object.defineProperty(Entry.prototype, "raised", {
  enum: true,
  get: function () {
    const self = this;
    {
      return _core.dogma.enumEq(this.result, "raised");
    }
  }
});
Entry.prototype.returnedValue = function (value) {
  const self = this;
  {
    return this.returned && this.value == value;
  }
};
Entry.prototype.returnedType = function (Type) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("Type", Type);
  {
    return this.returned && _core.dogma.is(this.value, Type);
  }
};
Entry.prototype.raisedValue = function (value) {
  const self = this;
  {
    return this.raised && this.value == value;
  }
};
Entry.prototype.raisedType = function (Type) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("Type", Type);
  {
    return this.raised && _core.dogma.is(this.value, Type);
  }
};