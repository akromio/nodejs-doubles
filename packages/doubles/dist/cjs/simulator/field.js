"use strict";

var _core = require("@dogmalang/core");
const {
  Duplex
} = _core.dogma.use(require("stream"));
const uuid = _core.dogma.use(require("uuid"));
const PositionBasedBehavior = _core.dogma.use(require("./behavior/PositionBasedBehavior"));
function field(def) {
  let behavior; /* c8 ignore next */
  _core.dogma.expect("def", def, [_core.list, _core.map]);
  {
    behavior = PositionBasedBehavior();
    if (_core.dogma.is(def, _core.list)) {
      for (const resp of def) {
        behavior.addResponse(resp);
      }
    } else {
      behavior.addResponse(_core.dogma.clone(def, {
        "default": true
      }, {}, [], []));
    }
  }
  return behavior;
}
module.exports = exports = field;
field.returns = value => {
  let behavior;
  {
    behavior = PositionBasedBehavior();
    behavior.addResponse({
      'default': true,
      'returns': value
    });
  }
  return behavior;
};
field.uuid = () => {
  let behavior;
  {
    behavior = PositionBasedBehavior();
    behavior.addResponse({
      'default': true,
      'returns': uuid.v4()
    });
  }
  return behavior;
};
field.text = returns => {
  let behavior; /* c8 ignore next */
  _core.dogma.expect("returns", returns, _core.text);
  {
    behavior = PositionBasedBehavior();
    behavior.addResponse({
      'default': true,
      'returns': returns
    });
  }
  return behavior;
};
field.bool = returns => {
  let behavior; /* c8 ignore next */
  _core.dogma.expect("returns", returns, _core.bool);
  {
    behavior = PositionBasedBehavior();
    behavior.addResponse({
      'default': true,
      'returns': returns
    });
  }
  return behavior;
};
field.list = returns => {
  let behavior; /* c8 ignore next */
  if (returns != null) _core.dogma.expect("returns", returns, _core.list);
  {
    var _dogma$copy;
    behavior = PositionBasedBehavior();
    behavior.addResponse({
      'default': true,
      'returns': (_dogma$copy = _core.dogma.copy(returns)) !== null && _dogma$copy !== void 0 ? _dogma$copy : []
    });
  }
  return behavior;
};
field.map = returns => {
  let behavior; /* c8 ignore next */
  if (returns != null) _core.dogma.expect("returns", returns, _core.map);
  {
    var _dogma$copy2;
    behavior = PositionBasedBehavior();
    behavior.addResponse({
      'default': true,
      'returns': (_dogma$copy2 = _core.dogma.copy(returns)) !== null && _dogma$copy2 !== void 0 ? _dogma$copy2 : {}
    });
  }
  return behavior;
};
field.any = returns => {
  let behavior; /* c8 ignore next */
  _core.dogma.expect("returns", returns, _core.any);
  {
    behavior = PositionBasedBehavior();
    behavior.addResponse({
      'default': true,
      'returns': _core.dogma.copy(returns)
    });
  }
  return behavior;
};
field.stream = {
  ["duplex"]: () => {
    {
      return (/* c8 ignore start */new Duplex({
          read() {},
          write() {}
        }) /* c8 ignore stop */
      );
    }
  }
};