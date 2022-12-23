"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplex = duplex;
exports.readable = readable;
var _core = require("@dogmalang/core");
const {
  Readable,
  Duplex
} = _core.dogma.use(require("stream"));
const {
  setInterval,
  clearInterval
} = _core.dogma.use(require("timers"));
const $ReadableStream = class ReadableStream extends Readable {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (_['data'] != null) (0, _core.expect)('data', _['data'], _core.list); /* c8 ignore stop */
    Object.defineProperty(this, 'data', {
      value: (0, _core.coalesce)(_['data'], []),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['interval'] != null) (0, _core.expect)('interval', _['interval'], _core.num); /* c8 ignore stop */
    Object.defineProperty(this, 'interval', {
      value: (0, _core.coalesce)(_['interval'], 1),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_8b05ce8b853300ea6a5d3d0a718410aa___init__ instanceof Function) this._pvt_8b05ce8b853300ea6a5d3d0a718410aa___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8b05ce8b853300ea6a5d3d0a718410aa___post__ instanceof Function) this._pvt_8b05ce8b853300ea6a5d3d0a718410aa___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_8b05ce8b853300ea6a5d3d0a718410aa___validate__ instanceof Function) this._pvt_8b05ce8b853300ea6a5d3d0a718410aa___validate__(); /* c8 ignore stop */
  }
};

const ReadableStream = new Proxy($ReadableStream, {
  apply(receiver, self, args) {
    return new $ReadableStream(...args);
  }
});
ReadableStream.prototype._construct = function (done) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("done", done);
  {
    const {
      interval
    } = this;
    const data = _core.dogma.copy(this.data);
    const timer = setInterval(() => {
      {
        if ((0, _core.len)(data) > 0) {
          this.push(data.shift());
        } else {
          clearInterval(timer);
          this.push(null);
        }
      }
    }, interval);
    done();
  }
};
ReadableStream.prototype._read = function () {
  const self = this;
  {
    _core.dogma.nop();
  }
};
function readable(opts = {}) {
  /* c8 ignore next */if (opts != null) _core.dogma.expect("opts", opts, _core.map);
  {
    return ReadableStream(opts);
  }
}
function duplex() {
  {
    return (/* c8 ignore start */new Duplex({
        read() {},
        write() {}
      }) /* c8 ignore stop */
    );
  }
}