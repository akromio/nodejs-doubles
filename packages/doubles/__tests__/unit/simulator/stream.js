"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator
} = _core.dogma.use(require("../../.."));
suite(__filename, () => {
  {
    test("when stream.duplex() called, a duplex stream must be returned", () => {
      {
        const out = simulator.stream.duplex();
        expected(out).toBeDuplexStream();
      }
    });
  }
});