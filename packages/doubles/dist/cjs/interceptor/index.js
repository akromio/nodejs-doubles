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
    const i = Interceptor({
      'members': createMembers(members)
    });
    return (0, _core.proxy)(object, {
      'get': (_, member) => {
        let result;
        /* c8 ignore next */

        _core.dogma.expect("_", _);
        /* c8 ignore next */


        _core.dogma.expect("member", member);

        {
          if (i.hasToIntercept(member)) {
            result = i.processGet(member);
          } else {
            result = _core.dogma.getItem(object, member);
          }
        }
        return result;
      }
    });
  }
}