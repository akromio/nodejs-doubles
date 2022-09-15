"use strict";

var _core = require("@dogmalang/core");

const expected = _core.dogma.use(require("@akromio/expected"));

const {
  simulator,
  field
} = _core.dogma.use(require("../../.."));

suite(__filename, () => {
  {
    test("when field.uuid() used, a uuid must be returned", () => {
      {
        const out = simulator({
          'fld': field.uuid()
        });
        expected(out).toBeMap().member("fld").toBeUuid();
      }
    });
    test("when field.text(), the passed value must be returned", () => {
      {
        const out = simulator({
          'fld': field.text("ciao!")
        });
        expected(out).toBeMap().member("fld").equalTo("ciao!");
      }
    });
    test("when field.bool(), the passed value must be returned", () => {
      {
        const out = simulator({
          'fld': field.bool(true)
        });
        expected(out).toBeMap().member("fld").equalTo(true);
      }
    });
    test("when field.any(), passed value must be cloned and can be modified", () => {
      {
        const original = {};
        const out = simulator({
          'fld': field.any(original)
        });
        out.fld.x = 11;
        out.fld.y = 22;
        expected(original).toBeEmpty();
        expected(out).toBeMap().member("fld").toHave({
          'x': 11,
          'y': 22
        });
      }
    });
    suite("field.map()", () => {
      {
        test("when field doesn't receive object, new object must be created and it can be modified", () => {
          {
            const out = simulator({
              'fld': field.map()
            });
            out.fld.x = 123;
            out.fld.y = 321;
            expected(out).toBeMap().member("fld").toHave({
              'x': 123,
              'y': 321
            });
          }
        });
        test("when field receives object, this must be cloned and its clone can be modified", () => {
          {
            const original = {};
            const out = simulator({
              'fld': field.map(original)
            });
            out.fld.x = 123;
            out.fld.y = 321;
            expected(original).toBeEmpty();
            expected(out).toBeMap().member("fld").toHave({
              'x': 123,
              'y': 321
            });
          }
        });
      }
    });
    suite("field.list()", () => {
      {
        test("when list field doesn't receive list, new list must be created and it can be modified", () => {
          {
            const out = simulator({
              'fld': field.list()
            });
            out.fld.push(123);
            out.fld.push(321);
            expected(out).toBeMap().member("fld").equalTo([123, 321]);
          }
        });
        test("when list field receives list, this must be cloned and its clone can be modified", () => {
          {
            const original = [123, 456];
            const out = simulator({
              'fld': field.list(original)
            });
            out.fld.push(789);
            expected(original).equalTo([123, 456]);
            expected(out).toBeMap().member("fld").equalTo([123, 456, 789]);
          }
        });
      }
    });
    test("when field(invokes), the function must be invoked and its return must be returned", () => {
      {
        const obj = simulator({
          'fld': field({
            'invokes': () => {
              {
                return 1234;
              }
            }
          })
        });
        const out = obj.fld;
        expected(out).equalTo(1234);
      }
    });
    suite("returns", () => {
      {
        test("when field.returns(), the indicated value must be returned", () => {
          {
            const obj = simulator({
              'fld': field.returns(1234)
            });
            const out = obj.fld;
            expected(out).equalTo(1234);
          }
        });
        test("when field(returns), the indicated value must be returned", () => {
          {
            const obj = simulator({
              'fld': field({
                'returns': 1234
              })
            });
            const out = obj.fld;
            expected(out).equalTo(1234);
          }
        });
      }
    });
    suite("stream", () => {
      {
        test("when stream.duplex(), a duplex stream must be returned", () => {
          {
            const out = field.stream.duplex();
            expected(out).toBeDuplexStream();
          }
        });
      }
    });
  }
});