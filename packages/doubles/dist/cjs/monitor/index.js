"use strict";

var _core = require("@dogmalang/core");
const Monitor = _core.dogma.use(require("./Monitor"));
const Result = _core.dogma.use(require("./Result"));
const Log = _core.dogma.use(require("./log/Log"));
const AccessKind = _core.dogma.use(require("./log/AccessKind"));
const monitors = [];
function monitor(object, opts) {
  /* c8 ignore next */_core.dogma.expect("object", object); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, _core.map);
  {
    return createMonitor(object, _core.dogma.clone(opts, {}, {}, ["log"], []));
  }
}
module.exports = exports = monitor;
function createMonitor(object, opts) {
  let p; /* c8 ignore next */
  _core.dogma.expect("object", object); /* c8 ignore next */
  _core.dogma.expect("opts", opts, _core.map);
  {
    var _ref, _opts$members, _opts$log;
    const members = _core.dogma.copy((_ref = (_opts$members = opts.members) !== null && _opts$members !== void 0 ? _opts$members : opts.methods) !== null && _ref !== void 0 ? _ref : []);
    if (opts.method) {
      members.push(opts.method);
    }
    const m = Monitor({
      'target': object,
      'log': (_opts$log = opts.log) !== null && _opts$log !== void 0 ? _opts$log : Log(),
      'members': members
    });
    if ((_core.dogma.includes(opts, "methods") || _core.dogma.includes(opts, "method")) && !_core.dogma.includes(opts, "members") && !_core.dogma.includes(opts, "onlyCalls")) {
      opts.onlyCalls = true;
    }
    p = (0, _core.proxy)(object, {
      ["apply"]: (target, thisArg, args) => {
        /* c8 ignore next */_core.dogma.expect("target", target); /* c8 ignore next */
        _core.dogma.expect("args", args);
        {
          let result;
          let value;
          try {
            /*c8 ignore else*/if (_core.dogma.is(target.apply, _core.func)) {
              value = target.apply(thisArg, args);
            } /* c8 ignore start */else {
              value = target(...args);
            } /* c8 ignore stop */
            result = Result.returned;
          } catch (e) {
            value = e;
            result = Result.raised;
          }
          m.saveCall({
            'target': target,
            'args': args,
            'result': result,
            'value': value
          });
          if (_core.dogma.enumEq(result, "raised")) {
            _core.dogma.raise(value);
          }
          return value;
        }
      },
      ["get"]: (target, member, receiver) => {
        /* c8 ignore next */_core.dogma.expect("target", target); /* c8 ignore next */
        _core.dogma.expect("member", member); /* c8 ignore next */
        _core.dogma.expect("receiver", receiver);
        {
          if (!m.hasToBeMonitorized(member)) {
            return _core.dogma.getItem(target, member);
          }
          let result;
          let value;
          try {
            value = _core.dogma.getItem(target, member);
            result = Result.returned;
          } catch (e) {
            value = e;
            result = Result.raised;
          }
          if (!opts.onlyCalls) {
            m.saveAccess({
              'target': target,
              'member': member,
              'kind': AccessKind.get,
              'result': result,
              'value': value
            });
          }
          if (_core.dogma.enumEq(result, "raised")) {
            _core.dogma.raise(value);
          } else if (_core.dogma.is(value, _core.func)) {
            return createMonitor(value, {
              'log': m.log
            });
          } else {
            return value;
          }
        }
      },
      ["set"]: (target, member, value, receiver) => {
        /* c8 ignore next */_core.dogma.expect("target", target); /* c8 ignore next */
        _core.dogma.expect("member", member); /* c8 ignore next */
        _core.dogma.expect("value", value); /* c8 ignore next */
        _core.dogma.expect("receiver", receiver);
        {
          if (!m.hasToBeMonitorized(member) || opts.onlyCalls) {
            return _core.dogma.setItem("=", target, member, value);
          }
          let result;
          try {
            _core.dogma.setItem("=", target, member, value);
            result = Result.returned;
          } catch (e) {
            value = e;
            result = Result.raised;
          }
          m.saveAccess({
            'target': target,
            'member': member,
            'kind': AccessKind.set,
            'result': result,
            'value': value
          });
          if (_core.dogma.enumEq(result, "raised")) {
            _core.dogma.raise(value);
          } else {
            return value;
          }
        }
      }
    });
    monitors.push({
      'proxy': p,
      'monitor': m
    });
  }
  return p;
}
Object.defineProperty(monitor, "monitors", {
  ["enumerable"]: false,
  ["get"]: () => {
    {
      return monitors;
    }
  }
});
monitor.clearAll = () => {
  {
    monitors.splice(0);
  }
};
monitor.clear = p => {
  let deleted = false; /* c8 ignore next */
  _core.dogma.expect("p", p);
  {
    {
      const i = monitors.findIndex(i => {
        /* c8 ignore next */_core.dogma.expect("i", i);
        {
          return i.proxy === p;
        }
      });
      if (i >= 0) {
        monitors.splice(i, 1);
        deleted = true;
      }
    }
  }
  return deleted;
};
monitor.log = (p, opts) => {
  let log; /* c8 ignore next */
  _core.dogma.expect("p", p); /* c8 ignore next */
  if (opts != null) _core.dogma.expect("opts", opts, _core.dogma.intf("inline", {
    clear: {
      optional: false,
      type: _core.bool
    }
  }));
  let {
    clear
  } = opts || {};
  {
    for (const item of monitors) {
      if (item.proxy === p) {
        log = item.monitor.log;
        if (clear) {
          monitor.clear(p);
        }
        break;
      }
    }
  }
  return log;
};