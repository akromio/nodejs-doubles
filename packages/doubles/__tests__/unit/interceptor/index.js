"use strict";

var _core = require("@dogmalang/core");

const expected = _core.dogma.use(require("@akromio/expected"));

const {
  interceptor,
  field,
  fun,
  simulator
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
    suite("interceptor.module()", () => {
      {
        const shortUuidModulePath = require.resolve("short-uuid");

        teardown(() => {
          {
            interceptor.clear(shortUuidModulePath);
          }
        });
        test("when module found, this must be replaced by interceptor proxy", () => {
          {
            _core.dogma.use(require("short-uuid"));

            interceptor.module(shortUuidModulePath, {
              'generate': fun.returns("Second - Rincón Exquisito")
            });

            const uuid = require("short-uuid");

            const out = uuid.generate();
            expected(out).equalTo("Second - Rincón Exquisito");
          }
        });
        test("when module not found, this must be loaded and replaced by interceptor proxy", () => {
          {
            (0, _core.remove)(shortUuidModulePath, require.cache);
            interceptor.module(shortUuidModulePath, {
              'generate': fun.returns("Second - Rincón Exquisito")
            });

            const uuid = require("short-uuid");

            const out = uuid.generate();
            expected(out).equalTo("Second - Rincón Exquisito");
          }
        });
      }
    });
  }
});