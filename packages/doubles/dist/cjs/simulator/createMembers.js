"use strict";

var _core = require("@dogmalang/core");

const Behavior = _core.dogma.use(require("./behavior/Behavior"));

function createMembers(def) {
  let members = {};
  /* c8 ignore next */

  _core.dogma.expect("def", def, _core.map);

  {
    for (const [name, value] of Object.entries(def)) {
      {
        if (_core.dogma.isNot(value, [Behavior, _core.func, _core.map])) {
          _core.dogma.raise(TypeError(`Member '${name}' must be map, field simulator or function simulator.`));
        }

        _core.dogma.setItem("=", members, name, value);
      }
    }
  }
  return members;
}

module.exports = exports = createMembers;