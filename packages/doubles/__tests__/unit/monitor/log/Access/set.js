"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  monitor
} = _core.dogma.use(require("../../../../.."));
const Result = _core.dogma.use(require("../../../../../dist/cjs/monitor/Result"));
const AccessKind = _core.dogma.use(require("../../../../../dist/cjs/monitor/log/AccessKind"));
suite(__filename, () => {
  {
    teardown(() => {
      {
        monitor.clearAll();
      }
    });
    test("when no error raised, log must be updated and value returned", () => {
      {
        const target = {
          ["x"]: 11,
          ["y"]: 22
        };
        const p = monitor(target);
        expected(p.x = 123).equalTo(123);
        expected(p.x).equalTo(123);
        const log = monitor.log(p);
        expected(log).toHaveLen(2);
        expected(log.items).it(0).toHave({
          'member': "x"
        }).it(1).toHave({
          'member': "x"
        });
        expected(log.returnedType(_core.num)).equalTo(2);
        let access = log.getEntry(0);
        expected(access.isSet()).equalTo(true);
        expected(access).toBe("Access").toHave({
          'value': 123,
          'result': Result.returned,
          'member': "x",
          'kind': AccessKind.set
        });
        access = log.getEntry(1);
        expected(access.isGet()).equalTo(true);
        expected(access).toBe("Access").toHave({
          'value': 123,
          'result': Result.returned,
          'member': "x",
          'kind': AccessKind.get
        });
      }
    });
    test("when error raised, log must be updated and the error raised", () => {
      {
        const $Point2D = class Point2D {
          constructor(_) {
            /* c8 ignore start */if (_ == null) _ = {};
            /* c8 ignore stop */
            (0, _core.expect)('x', _['x'], null);
            Object.defineProperty(this, 'x', {
              value: (0, _core.coalesce)(_['x'], null),
              writable: false,
              enumerable: true
            });
            (0, _core.expect)('y', _['y'], null);
            Object.defineProperty(this, 'y', {
              value: (0, _core.coalesce)(_['y'], null),
              writable: false,
              enumerable: true
            });
            Object.defineProperty(this, 'value', {
              value: (0, _core.coalesce)(_['value'], 33),
              writable: true,
              enumerable: false
            });
            /* c8 ignore start */
            if (this._pvt_6c4d96819fa9f493324e73ab2a3c9316___init__ instanceof Function) this._pvt_6c4d96819fa9f493324e73ab2a3c9316___init__(_); /* c8 ignore stop */
            /* c8 ignore start */
            if (this._pvt_6c4d96819fa9f493324e73ab2a3c9316___post__ instanceof Function) this._pvt_6c4d96819fa9f493324e73ab2a3c9316___post__(); /* c8 ignore stop */
            /* c8 ignore start */
            if (this._pvt_6c4d96819fa9f493324e73ab2a3c9316___validate__ instanceof Function) this._pvt_6c4d96819fa9f493324e73ab2a3c9316___validate__(); /* c8 ignore stop */
          }
        };

        const Point2D = new Proxy($Point2D, {
          apply(receiver, self, args) {
            return new $Point2D(...args);
          }
        });
        const target = Point2D({
          'x': 11,
          'y': 22
        });
        Object.defineProperty(target, "z", {
          ["enumerable"]: true,
          ["get"]: () => {
            {
              return target.value;
            }
          },
          ["set"]: () => {
            {
              return _core.dogma.raise("my error");
            }
          }
        });
        const p = monitor(target);
        expected(p).toBe(Point2D);
        expected(p.x).equalTo(11);
        expected(p.y).equalTo(22);
        expected(p.z).equalTo(33);
        expected(() => {
          {
            p.z = 123;
          }
        }).toRaise("my error");
        const log = monitor.log(p);
        expected(log).toHaveLen(4).member("accesses").equalTo(4);
        expected(log.items).it(0).toHave({
          'member': "x"
        }).it(1).toHave({
          'member': "y"
        }).it(2).toHave({
          'member': "z"
        }).it(3).toHave({
          'member': "z"
        });
        expected(log).member("returns").equalTo(3).member("raises").equalTo(1);
        for (const i of [0, 1, 2]) {
          expected(log.getEntry(i).isGet()).equalTo(true);
        }
        const access = log.getEntry(3);
        expected(access.isSet()).equalTo(true);
        expected(access.raisedValue("my error")).equalTo(true);
        expected(access.raisedType(_core.text)).equalTo(true);
      }
    });
    test("when given fields, only these fields must be monitored", () => {
      {
        const target = {
          ["x"]: 1,
          ["y"]: 2,
          ["z"]: 3
        };
        const p = monitor(target, {
          'members': ["x", "z"]
        });
        expected(p.x = 11).equalTo(11);
        expected(p.y = 22).equalTo(22);
        expected(p.z = 33).equalTo(33);
        const log = monitor.log(p);
        expected(log).toHaveLen(2);
        expected(log.items).it(0).toHave({
          'member': "x"
        }).it(1).toHave({
          'member': "z"
        });
      }
    });
    test("when onlyCalls, nothing must be monitored when set", () => {
      {
        const target = {
          ["x"]: 1,
          ["y"]: 2,
          ["z"]: 3
        };
        const p = monitor(target, {
          'onlyCalls': true
        });
        expected(p.x = 11).equalTo(11);
        expected(p.y = 22).equalTo(22);
        expected(p.z = 33).equalTo(33);
        const log = monitor.log(p);
        expected(log).toHaveLen(0);
      }
    });
  }
});