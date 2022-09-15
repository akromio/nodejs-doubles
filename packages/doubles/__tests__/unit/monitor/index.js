"use strict";

var _core = require("@dogmalang/core");

const expected = _core.dogma.use(require("@akromio/expected"));

const {
  monitor
} = _core.dogma.use(require("../../.."));

suite(__filename, () => {
  {
    suite("monitor()", () => {
      {
        teardown(() => {
          {
            monitor.clearAll();
          }
        });
        test("when monitor created, monitors must contain monitor info", () => {
          {
            const target = {};
            const out = monitor(target);
            expected(out).notSameAs(target);
            expected(monitor.monitors).toHaveLen(1).get("[0].proxy").sameAs(out);
          }
        });
        test("when method option set, this must be pushed to methods", () => {
          {
            const p = monitor({}, {
              'method': "methodName"
            });
            expected(_core.dogma.getItem(monitor.monitors, 0).monitor.members).equalTo(["methodName"]);
          }
        });
      }
    });
    suite("monitor.log()", () => {
      {
        teardown(() => {
          {
            monitor.clearAll();
          }
        });
        test("when proxy not saved, nil must be returned", () => {
          {
            monitor({});
            expected(monitor.log((0, _core.proxy)({}, {}))).toBeNil();
          }
        });
        test("when proxy saved, log must be returned", () => {
          {
            const m = monitor({});
            const out = monitor.log(m);
            expected(out).toBe("Log");
            expected(monitor.monitors).notToBeEmpty();
          }
        });
        test("when proxy saved and clear options, log must be returned and clear run", () => {
          {
            const m = monitor({});
            const out = monitor.log(m, {
              'clear': true
            });
            expected(out).toBe("Log");
            expected(monitor.monitors).toBeEmpty();
          }
        });
      }
    });
    suite("monitor.clear()", () => {
      {
        teardown(() => {
          {
            monitor.clearAll();
          }
        });
        test("when proxy saved, clear must be performed", () => {
          {
            const m = monitor({});
            monitor.clear(m);
            expected(monitor.monitors).toBeEmpty();
          }
        });
        test("when proxy not saved, no clear performed and mustn't be raised error", () => {
          {
            const m = monitor({});
            monitor.clear((0, _core.proxy)({}, {}));
            expected(monitor.monitors).toHaveLen(1).get("[0].proxy").sameAs(m);
          }
        });
      }
    });
  }
});