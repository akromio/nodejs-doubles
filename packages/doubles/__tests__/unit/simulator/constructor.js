"use strict";

var _core = require("@dogmalang/core");

const expected = _core.dogma.use(require("@akromio/expected"));

const {
  simulator
} = _core.dogma.use(require("../../.."));

suite(__filename, () => {
  {
    const {
      constructor
    } = simulator;
    test("when called with new, construct must be called", () => {
      {
        const Band = constructor.returns({
          'name': "Second"
        });
        const out = new Band();
        expected(out).equalTo({
          'name': "Second"
        });
      }
    });
  }
});