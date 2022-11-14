"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator
} = _core.dogma.use(require("../../.."));
const {
  field,
  fun
} = simulator;
suite(__filename, () => {
  {
    test("when well-defined, object simulator must be returned", () => {
      {
        const o = simulator({
          ["x"]: field([{
            ["returns"]: 1234
          }, {
            ["returns"]: 4321
          }]),
          ["y"]: fun({
            ["returns"]: 12345678
          })
        });
        expected(o).notToBeCallable();
        expected(o.x).equalTo(1234);
        expected(o.y()).equalTo(12345678);
        expected(o.y()).equalTo(12345678);
        expected(o.x).equalTo(4321);
      }
    });
    test("when object simulator called, JS-engine error must be raised", () => {
      {
        const o = simulator({});
        expected(o).notToBeCallable();
        expected(() => {
          {
            o();
          }
        }).toRaise(TypeError("o is not a function"));
      }
    });
    test("when field() or fun() not used for member, error must be raised", () => {
      {
        expected(() => {
          {
            simulator({
              'x': "invalid value"
            });
          }
        }).toRaise(TypeError("Member 'x' must be map, field simulator or function simulator."));
      }
    });
  }
});