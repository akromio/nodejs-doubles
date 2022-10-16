"use strict";

var _core = require("@dogmalang/core");

const Interceptor = _core.dogma.use(require("./Interceptor"));

const createMembers = _core.dogma.use(require("../simulator/createMembers"));

function interceptor(object, members) {
  /* c8 ignore next */
  _core.dogma.expect("object", object, _core.any);
  /* c8 ignore next */


  _core.dogma.expect("members", members, _core.map);

  {
    return createObjectInterceptor(object, members);
  }
}

module.exports = exports = interceptor;

function createObjectInterceptor(object, members) {
  /* c8 ignore next */
  _core.dogma.expect("object", object);
  /* c8 ignore next */


  _core.dogma.expect("members", members, _core.map);

  {
    return createInterceptorProxy(Interceptor({
      'intercepted': object,
      'members': createMembers(members)
    }), members);
  }
}

function createInterceptorProxy(interceptor, members) {
  /* c8 ignore next */
  _core.dogma.expect("interceptor", interceptor);
  /* c8 ignore next */


  _core.dogma.expect("members", members);

  {
    return (0, _core.proxy)(interceptor.intercepted, {
      'get': (_, member) => {
        let result;
        /* c8 ignore next */

        _core.dogma.expect("_", _);
        /* c8 ignore next */


        _core.dogma.expect("member", member);

        {
          if (interceptor.hasToIntercept(member)) {
            result = interceptor.processGet(member);
          } else {
            result = _core.dogma.getItem(interceptor.intercepted, member);
          }
        }
        return result;
      }
    });
  }
}

interceptor.modules = {};

interceptor.module = (path, members) => {
  /* c8 ignore next */
  _core.dogma.expect("path", path, _core.text);
  /* c8 ignore next */


  _core.dogma.expect("members", members, _core.map);

  {
    if (!_core.dogma.includes(require.cache, path)) {
      require(path);
    }

    const mod = _core.dogma.getItem(require.cache, path);

    const inter = Interceptor({
      'intercepted': mod.exports,
      'members': createMembers(members)
    });
    const interProxy = createInterceptorProxy(inter, members);

    _core.dogma.setItem("=", require.cache, path, _core.dogma.clone(mod, {
      "exports": interProxy
    }, {}, [], []));

    _core.dogma.setItem("=", interceptor.modules, path, inter);
  }
};

interceptor.clear = path => {
  /* c8 ignore next */
  _core.dogma.expect("path", path, _core.text);

  {
    {
      const inter = _core.dogma.getItem(interceptor.modules, path);

      if (inter) {
        _core.dogma.setItem("=", require.cache, path, inter.intercepted);

        (0, _core.remove)(path, interceptor.modules);
      }
    }
  }
};