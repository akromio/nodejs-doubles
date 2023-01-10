"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator,
  fun,
  field
} = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    suite("simulator()", () => {
      {
        test("when called w/o arguments, dummy object must be returned", () => {
          {
            const out = simulator();
            expected(out).toBeMap();
          }
        });
        test("when called w/ members, members must be created", () => {
          {
            const out = simulator({
              'id': field.uuid()
            });
            expected(out.id).toBeUuid();
          }
        });
        test("when called w/ type and members, double returned must be of that type", () => {
          {
            const out = simulator(Array, {
              'id': field.uuid()
            });
            expected(out).toBeList().member("id").toBeUuid();
          }
        });
        test("when called w/ three or more args, error must be raised", () => {
          {
            const out = _core.dogma.peval(() => {
              return simulator("one", "two", "three");
            });
            expected(out).it(0).equalTo(false).it(1).equalTo(TypeError("Invalid number of arguments, expected 0, 1 or 2. Got: 3."));
          }
        });
      }
    });
    suite("fun()", () => {
      {
        test("when fun.invokes(), a function returning the value must be returned", () => {
          {
            const f = fun.invokes(() => {
              {
                return (0, _core.timestamp)().valueOf();
              }
            });
            const out1 = f();
            const out2 = f();
            expected(out1).toBeNum();
            expected(out2).toBeNum();
          }
        });
        test("when fun.returns(), a function returning the value must be returned", () => {
          {
            const value = 1234;
            const f = fun.returns(value);
            const out1 = f();
            const out2 = f();
            expected(out1).equalTo(value);
            expected(out2).equalTo(value);
          }
        });
        test("when fun.raises(), a function raising error must be returned", () => {
          {
            const error = Error("The error message.");
            const f = fun.raises(error);
            const out1 = _core.dogma.peval(() => {
              return f();
            });
            const out2 = _core.dogma.peval(() => {
              return f();
            });
            expected(out1).it(0).equalTo(false).it(1).equalTo(error);
            expected(out2).it(0).equalTo(false).it(1).equalTo(error);
          }
        });
        test("when fun.resolves(), a function returning a resolved promise must be returned", async () => {
          {
            const value = 101;
            const f = fun.resolves(value);
            const out1 = f();
            const out2 = f();
            (0, await expected(out1)).toBeFulfilled().equalTo(value);
            (0, await expected(out2)).toBeFulfilled().equalTo(value);
          }
        });
        test("when fun.rejects(), a function returning a rejected promise must be returned", async () => {
          {
            const error = Error("The message error");
            const f = fun.rejects(error);
            const out1 = f();
            const out2 = f();
            (0, await expected(out1)).toBeRejected().equalTo(error);
            (0, await expected(out2)).toBeRejected().equalTo(error);
          }
        });
        test("when fun.sleep(), a delay is performed and the vlaue must be returned", async () => {
          {
            const delay = "100ms";
            const value = "the value";
            const f = fun.sleep(delay, value);
            const out = f();
            (0, await expected(out)).toBeFulfilled().equalTo(value);
          }
        });
      }
    });
    suite("stream", () => {
      {
        test("when stream.duplex() called, a duplex stream must be returned", () => {
          {
            const out = simulator.stream.duplex();
            expected(out).toBeDuplexStream();
          }
        });
      }
    });
  }
});