"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator,
  method,
  fun,
  field
} = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    suite("position-based simulator", () => {
      {
        test("when empty simulator, no response available and error must be raised", () => {
          {
            const p = fun([]);
            const out = _core.dogma.peval(() => {
              return p();
            });
            expected(out).it(0).equalTo(false).it(1).equalTo(Error("No response available for simulator."));
          }
        });
        test("when procedure simulator, the calls must return nil", () => {
          {
            const p = fun();
            expected(p()).toBeNil();
            expected(p()).toBeNil();
          }
        });
        test("when position-based simulator, position-based behavior must be used", () => {
          {
            const p = fun([{
              ["default"]: true,
              ["returns"]: "the default value"
            }, {
              ["i"]: 0,
              ["returns"]: 111
            }, {
              ["raises"]: Error("my error")
            }, {
              ["returns"]: 222
            }]);
            expected(p).toBeCallable();
            expected(p()).equalTo(111);
            expected(() => {
              {
                p();
              }
            }).toRaise(Error("my error"));
            expected(p()).equalTo(222);
            expected(p()).equalTo("the default value");
            expected(p()).equalTo("the default value");
          }
        });
        test("when position-based simulator using the first item, position-based behavior must be used", () => {
          {
            const p = fun([{
              ["i"]: 0,
              ["returns"]: 111
            }, {
              ["raises"]: Error("my error")
            }, {
              ["returns"]: 222
            }]);
            expected(p).toBeCallable();
            expected(p()).equalTo(111);
            expected(() => {
              {
                p();
              }
            }).toRaise(Error("my error"));
            expected(p()).equalTo(222);
            expected(() => {
              {
                p();
              }
            }).toRaise(Error("No response available for simulator."));
          }
        });
        test("when function sim must return other sim, this must be returned", () => {
          {
            const value = simulator({
              'm': method.returns("xyz")
            });
            const sim = fun.returns(value);
            const out = sim().m();
            expected(out).equalTo("xyz");
          }
        });
      }
    });
    suite("args-based simulator", () => {
      {
        test("when valid behavior, args-based behavior must be used", async () => {
          {
            const p = fun([{
              ["default"]: true,
              ["invokes"]: (...args) => {
                {
                  return args.join(" ");
                }
              }
            }, {
              ["args"]: [11, 22],
              ["returns"]: 1122
            }, {
              ["args"]: [22, 11],
              ["raises"]: Error("my error")
            }, {
              ["args"]: ["simple minds"],
              ["resolves"]: "promised you a miracle"
            }, {
              ["args"]: [],
              ["rejects"]: Error("rejected promise")
            }]);
            expected(p(11, 22)).equalTo(1122);
            expected(() => {
              {
                p(22, 11);
              }
            }).toRaise(Error("my error"));
            (0, await expected(p("simple minds"))).equalTo("promised you a miracle");
            expected(await _core.dogma.pawait(() => p())).it(0).equalTo(false).it(1).equalTo(Error("rejected promise"));
            expected(p(11, 22)).equalTo(1122);
            expected(p("alive", "and", "kicking")).equalTo("alive and kicking");
          }
        });
        test("when not default call and needed in call, error must be raised", () => {
          {
            const p = fun([{
              ["args"]: ["promised you a miracle"],
              ["returns"]: "simple minds"
            }]);
            expected(p("promised you a miracle")).equalTo("simple minds");
            expected(() => {
              {
                p("alive and kicking");
              }
            }).toRaise(Error("No response available for simulator."));
          }
        });
      }
    });
    suite("simulator base", () => {
      {
        test("when operation not passed, error must be raised", () => {
          {
            expected(() => {
              {
                fun([{}]);
              }
            }).toRaise(TypeError("returns, raises, resolves or rejects must be set."));
          }
        });
        test("when simulating function with fields, fields can be accessed", () => {
          {
            const m = fun({
              ["returns"]: "Simple Minds - Waterfront"
            }, {
              ["x"]: field({
                ["returns"]: "Simple Minds - Live in the City of Light"
              })
            });
            expected(m()).equalTo("Simple Minds - Waterfront");
            expected(m.x).equalTo("Simple Minds - Live in the City of Light");
          }
        });
      }
    });
  }
});