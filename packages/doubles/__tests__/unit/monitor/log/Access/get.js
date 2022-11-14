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
        expected(p.x).equalTo(11);
        expected(p.y).equalTo(22);
        expected(p.z).toBeNil();
        const log = monitor.log(p);
        expected(log).toHaveLen(3);
        expected(log.items).it(0).toHave({
          'member': "x"
        }).it(1).toHave({
          'member': "y"
        }).it(2).toHave({
          'member': "z"
        });
        expected(log.returnedType(_core.num)).equalTo(2);
        expected(log.entry).toBe("Access").toHave({
          'value': 11,
          'result': Result.returned,
          'member': "x",
          'kind': AccessKind.get
        });
        expected(log.getEntry(0)).toBe("Access").toHave({
          'value': 11,
          'result': Result.returned,
          'member': "x",
          'kind': AccessKind.get
        });
        expected(log.getAccess(0)).toBe("Access").toHave({
          'value': 11,
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
            /* c8 ignore start */
            if (this._pvt_52d5593b2f467894987f16ab647e51d1___init__ instanceof Function) this._pvt_52d5593b2f467894987f16ab647e51d1___init__(_); /* c8 ignore stop */
            /* c8 ignore start */
            if (this._pvt_52d5593b2f467894987f16ab647e51d1___post__ instanceof Function) this._pvt_52d5593b2f467894987f16ab647e51d1___post__(); /* c8 ignore stop */
            /* c8 ignore start */
            if (this._pvt_52d5593b2f467894987f16ab647e51d1___validate__ instanceof Function) this._pvt_52d5593b2f467894987f16ab647e51d1___validate__(); /* c8 ignore stop */
          }
        };

        const Point2D = new Proxy($Point2D, {
          apply(receiver, self, args) {
            return new $Point2D(...args);
          }
        });
        Object.defineProperty(Point2D.prototype, "z", {
          enum: true,
          get: function () {
            const self = this;
            {
              return _core.dogma.raise("my error");
            }
          }
        });
        const target = Point2D({
          'x': 11,
          'y': 22
        });
        const p = monitor(target);
        expected(p).toBe(Point2D);
        expected(p.x).equalTo(11);
        expected(p.y).equalTo(22);
        expected(() => {
          {
            p.z;
          }
        }).toRaise("my error");
        const log = monitor.log(p);
        expected(log).toHaveLen(3).member("accesses").equalTo(3);
        expected(log.items).it(0).toHave({
          'member': "x"
        }).it(1).toHave({
          'member': "y"
        }).it(2).toHave({
          'member': "z"
        });
        expected(log.returns).equalTo(2);
        expected(log.raises).equalTo(1);
        expected(log.raisedValue("my error")).equalTo(1);
        expected(log.raisedType(_core.text)).equalTo(1);
      }
    });
    test("when given fields, only these fields must be monitored", () => {
      {
        const target = {
          ["x"]: 11,
          ["y"]: 22,
          ["z"]: 33
        };
        const p = monitor(target, {
          'members': ["x", "z"]
        });
        expected(p.x).equalTo(11);
        expected(p.y).equalTo(22);
        expected(p.z).equalTo(33);
        const log = monitor.log(p);
        expected(log).toHaveLen(2);
        expected(log.items).it(0).toHave({
          'member': "x"
        }).it(1).toHave({
          'member': "z"
        });
      }
    });
  }
});