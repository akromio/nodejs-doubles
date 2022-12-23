"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  Readable,
  Writable
} = _core.dogma.use(require("stream"));
const {
  readable,
  writable,
  duplex
} = _core.dogma.use(require("./streams"));
suite(__filename, () => {
  {
    suite("readable()", () => {
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
            expected(stream).toBe(Readable);
            expected(out).equalTo(data);
          }
        });
      }
    });
    suite("writable()", () => {
      {
        test("when called, a dummy writable stream must be returned", () => {
          {
            const out = writable();
            expected(out).toBe(Writable);
          }
        });
      }
    });
    suite("duplex()", () => {
      {
        test("when called, a dummy duplex stream must be returned", () => {
          {
            const out = duplex();
            expected(out).toBeDuplexStream();
          }
        });
      }
    });
  }
});