"use strict";

var _core = require("@dogmalang/core");

const expected = _core.dogma.use(require("@akromio/expected"));

const {
  monitor
} = _core.dogma.use(require("../../../../.."));

const Result = _core.dogma.use(require("../../../../../dist/cjs/monitor/Result"));

const $TestStruct = class TestStruct {
  constructor(_) {
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */

    Object.defineProperty(this, 'x', {
      value: (0, _core.coalesce)(_['x'], 1),
      writable: true,
      enumerable: true
    });
    /* c8 ignore start */

    if (this._pvt_07adabf0d30c7d1fd60abe5716dabfa0___init__ instanceof Function) this._pvt_07adabf0d30c7d1fd60abe5716dabfa0___init__(_);
    /* c8 ignore stop */

    /* c8 ignore start */

    if (this._pvt_07adabf0d30c7d1fd60abe5716dabfa0___post__ instanceof Function) this._pvt_07adabf0d30c7d1fd60abe5716dabfa0___post__();
    /* c8 ignore stop */

    /* c8 ignore start */

    if (this._pvt_07adabf0d30c7d1fd60abe5716dabfa0___validate__ instanceof Function) this._pvt_07adabf0d30c7d1fd60abe5716dabfa0___validate__();
    /* c8 ignore stop */
  }

};
const TestStruct = new Proxy($TestStruct, {
  apply(receiver, self, args) {
    return new $TestStruct(...args);
  }

});

TestStruct.prototype.returnNum = function () {
  const self = this;
  {
    return (0, _core.num)((0, _core.timestamp)());
  }
};

TestStruct.prototype.raiseError = function () {
  const self = this;
  {
    _core.dogma.raise("my error");
  }
};

suite(__filename, () => {
  {
    teardown(() => {
      {
        monitor.clearAll();
      }
    });
    test("when only one call, call and getCall(0) must return the same", () => {
      {
        const target = TestStruct();
        const p = monitor(target);
        expected(p.returnNum()).toBeNum();
        const log = monitor.log(p);
        expected(log).toHaveLen(2).member("accesses").equalTo(1).member("calls").equalTo(1).member("returns").equalTo(2);
        const call = log.getCall(0);
        expected(log.call).sameAs(call).toBe("Call").toHave({
          'result': Result.returned,
          'args': []
        }).member("value").toBeNum();
      }
    });
    test("when not onlyCalls and no error raised, log must be updated and value returned", () => {
      {
        const target = TestStruct();
        const p = monitor(target);
        expected(p.returnNum()).toBeNum();
        expected(p.returnNum()).toBeNum();
        const log = monitor.log(p);
        expected(log).toHaveLen(4).member("accesses").equalTo(2).member("calls").equalTo(2).member("returns").equalTo(4);

        for (const i of [0, 1]) {
          expected(log.getCall(i)).toBe("Call").toHave({
            'result': Result.returned,
            'args': []
          }).member("value").toBeNum();
        }
      }
    });
    test("when onlyCalls and returning and raising, log must be updated returning and raising", () => {
      {
        const target = TestStruct();
        const p = monitor(target, {
          'onlyCalls': true
        });
        expected(p.returnNum()).toBeNum();
        expected(() => {
          {
            p.raiseError();
          }
        }).toRaise();
        const log = monitor.log(p);
        expected(log).toHaveLen(2).member("calls").equalTo(2).member("returns").equalTo(1).member("raises").equalTo(1);
        expected(log.getCall(0)).toBe("Call").toHave({
          'result': Result.returned,
          'args': []
        }).member("value").toBeNum();
        expected(log.getCall(1)).toBe("Call").toHave({
          'result': Result.raised,
          'args': []
        }).member("value").equalTo("my error");
      }
    });
    test("when calledWith() used, times called with the arguments must be returned", () => {
      {
        const target = (x, y) => {
          /* c8 ignore next */
          _core.dogma.expect("x", x);
          /* c8 ignore next */


          _core.dogma.expect("y", y);

          {
            return x + y;
          }
        };

        const p = monitor(target);
        expected(p(11, 22)).equalTo(33);
        expected(p(11, 22)).equalTo(33);
        expected(p(22, 33)).equalTo(55);
        const log = monitor.log(p);
        expected(log).toHaveLen(3);
        expected(log.calledWith([11, 22])).equalTo(2);
        expected(log.calledWith([22])).equalTo(0);
        expected(log.calledWith([22, 33])).equalTo(1);
        expected(log.returnedValue(33)).equalTo(2);
        expected(log.returnedValue(55)).equalTo(1);
        expected(log.returnedValue(66)).equalTo(0);
      }
    });
  }
});