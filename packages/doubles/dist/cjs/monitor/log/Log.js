"use strict";

var _core = require("@dogmalang/core");
const Access = _core.dogma.use(require("./Access"));
const Call = _core.dogma.use(require("./Call"));
const $Log = class Log {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    Object.defineProperty(this, 'items', {
      value: [],
      writable: false,
      enumerable: false
    });
    /* c8 ignore start */
    if (this._pvt_cb769d1323fb42de11b4fe6146d48364___init__ instanceof Function) this._pvt_cb769d1323fb42de11b4fe6146d48364___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_cb769d1323fb42de11b4fe6146d48364___post__ instanceof Function) this._pvt_cb769d1323fb42de11b4fe6146d48364___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_cb769d1323fb42de11b4fe6146d48364___validate__ instanceof Function) this._pvt_cb769d1323fb42de11b4fe6146d48364___validate__(); /* c8 ignore stop */
  }
};

const Log = new Proxy($Log, {
  apply(receiver, self, args) {
    return new $Log(...args);
  }
});
module.exports = exports = Log;
Object.defineProperty(Log.prototype, "len", {
  enum: true,
  get: function () {
    const self = this;
    const {
      items
    } = self;
    {
      return items.length;
    }
  }
});
Log.prototype.getEntriesByType = function (Type) {
  const self = this;
  const {
    items
  } = self;
  let entries = []; /* c8 ignore next */
  _core.dogma.expect("Type", Type);
  {
    for (const i of items) {
      if (_core.dogma.is(i, Type)) {
        entries.push(i);
      }
    }
  }
  return entries;
};
Object.defineProperty(Log.prototype, "calls", {
  enum: true,
  get: function () {
    const self = this;
    const {
      items
    } = self;
    {
      return (0, _core.len)(this.getEntriesByType(Call));
    }
  }
});
Object.defineProperty(Log.prototype, "accesses", {
  enum: true,
  get: function () {
    const self = this;
    const {
      items
    } = self;
    {
      return (0, _core.len)(this.getEntriesByType(Access));
    }
  }
});
Object.defineProperty(Log.prototype, "returns", {
  enum: true,
  get: function () {
    const self = this;
    const {
      items
    } = self;
    let count = 0;
    {
      for (const item of items) {
        if (item.returned) {
          count += 1;
        }
      }
    }
    return count;
  }
});
Object.defineProperty(Log.prototype, "raises", {
  enum: true,
  get: function () {
    const self = this;
    const {
      items
    } = self;
    let count = 0;
    {
      for (const item of items) {
        if (item.raised) {
          count += 1;
        }
      }
    }
    return count;
  }
});
Log.prototype.saveCall = function (call) {
  const self = this;
  const {
    items
  } = self; /* c8 ignore next */
  _core.dogma.expect("call", call);
  {
    items.push(Call(call));
  }
};
Log.prototype.saveAccess = function (access) {
  const self = this;
  const {
    items
  } = self; /* c8 ignore next */
  _core.dogma.expect("access", access);
  {
    items.push(Access(access));
  }
};
Log.prototype.returnedValue = function (value) {
  const self = this;
  const {
    items
  } = self;
  let count = 0;
  {
    for (const item of items) {
      if (item.returnedValue(value)) {
        count += 1;
      }
    }
  }
  return count;
};
Log.prototype.returnedType = function (Type) {
  const self = this;
  const {
    items
  } = self;
  let count = 0; /* c8 ignore next */
  _core.dogma.expect("Type", Type);
  {
    for (const item of items) {
      if (item.returnedType(Type)) {
        count += 1;
      }
    }
  }
  return count;
};
Log.prototype.raisedValue = function (value) {
  const self = this;
  const {
    items
  } = self;
  let count = 0;
  {
    for (const item of items) {
      if (item.raisedValue(value)) {
        count += 1;
      }
    }
  }
  return count;
};
Log.prototype.raisedType = function (Type) {
  const self = this;
  const {
    items
  } = self;
  let count = 0; /* c8 ignore next */
  _core.dogma.expect("Type", Type);
  {
    for (const item of items) {
      if (item.raisedType(Type)) {
        count += 1;
      }
    }
  }
  return count;
};
Log.prototype.calledWith = function (args) {
  const self = this;
  const {
    items
  } = self;
  let count = 0; /* c8 ignore next */
  _core.dogma.expect("args", args, _core.list);
  {
    for (const item of items) {
      if (_core.dogma.is(item, Call) && item.calledWith(args)) {
        count += 1;
      }
    }
  }
  return count;
};
Log.prototype.getEntry = function (i) {
  const self = this;
  const {
    items
  } = self; /* c8 ignore next */
  _core.dogma.expect("i", i, _core.num);
  {
    return _core.dogma.getItem(items, i);
  }
};
Object.defineProperty(Log.prototype, "entry", {
  enum: true,
  get: function () {
    const self = this;
    const {
      items
    } = self;
    {
      return this.getEntry(0);
    }
  }
});
Log.prototype.getEntryByType = function (Type, i) {
  const self = this;
  const {
    items
  } = self;
  let entry; /* c8 ignore next */
  _core.dogma.expect("Type", Type); /* c8 ignore next */
  _core.dogma.expect("i", i, _core.num);
  {
    let pos = 0;
    for (const item of items) {
      if (_core.dogma.is(item, Type)) {
        if (pos == i) {
          entry = item;
          break;
        } else {
          pos += 1;
        }
      }
    }
  }
  return entry;
};
Log.prototype.getCall = function (i) {
  const self = this;
  const {
    items
  } = self; /* c8 ignore next */
  _core.dogma.expect("i", i, _core.num);
  {
    return this.getEntryByType(Call, i);
  }
};
Object.defineProperty(Log.prototype, "call", {
  enum: true,
  get: function () {
    const self = this;
    const {
      items
    } = self;
    {
      return this.getCall(0);
    }
  }
});
Log.prototype.getAccess = function (i) {
  const self = this;
  const {
    items
  } = self; /* c8 ignore next */
  _core.dogma.expect("i", i, _core.num);
  {
    return this.getEntryByType(Access, i);
  }
};