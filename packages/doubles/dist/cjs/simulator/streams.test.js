"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  readable,
  duplex
} = _core.dogma.use(require("./streams"));
suite(__filename, () => {
  {
    suite("readable", () => {
      {
        test("when data w/o interval, these must be pushed and readable", async () => {
          {
            const data = ["one", "two", "three"];
            const stream = readable({
              ["data"]: data
            });
            const out = [];
            for await (const item of stream) {
              out.push((0, _core.text)(item));
            }
            expected(out).equalTo(data);
          }
        });
      }
    });
    suite("duplex", () => {
      {
        const out = duplex();
        expected(out).toBeDuplexStream();
      }
    });
  }
});