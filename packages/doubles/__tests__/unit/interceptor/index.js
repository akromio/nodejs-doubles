"use strict";

var _core = require("@dogmalang/core");

const expected = _core.dogma.use(require("@akromio/expected"));

const {
  interceptor,
  field
} = _core.dogma.use(require("../../.."));

suite(__filename, () => {
  {
    suite("interceptor()", () => {
      {
        test("when called, an interceptor must be returned", () => {
          {
            const value = [1, 2, 3];
            const i = interceptor(value, {
              'length': field.returns(1)
            });
            const out1 = i.length;

            const out2 = _core.dogma.getItem(i, 2);

            expected(out1).equalTo(1);
            expected(out2).equalTo(_core.dogma.getItem(value, 2));
          }
        });
      }
    });
  }
});