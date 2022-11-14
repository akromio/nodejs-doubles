"use strict";

var _core = require("@dogmalang/core");
const {
  Duplex
} = _core.dogma.use(require("stream"));
const Simulator = _core.dogma.use(require("./Simulator"));
const Behavior = _core.dogma.use(require("./behavior/Behavior"));
const PositionBasedBehavior = _core.dogma.use(require("./behavior/PositionBasedBehavior"));
const ArgsBasedBehavior = _core.dogma.use(require("./behavior/ArgsBasedBehavior"));
const field = _core.dogma.use(require("./field"));
const createMembers = _core.dogma.use(require("./createMembers"));
function simulator(...args) {
  let sim;
  {
    {
      const size = (0, _core.len)(args);
      switch (size) {
        case 0:
          {
            sim = createObjectSimulator({});
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case 1:
          {
            sim = createObjectSimulator(_core.dogma.getItem(args, 0));
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case 2:
          {
            const [Type, members] = _core.dogma.getArrayToUnpack(args, 2);
            sim = _core.dogma.setTypeToObject(createObjectSimulator(members), Type);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        default:
          {
            _core.dogma.raise(TypeError(`Invalid number of arguments, expected 0, 1 or 2. Got: ${size}.`));
          }
      }
    }
  }
  return sim;
}
module.exports = exports = simulator;
simulator.fun = simulator.method = (behavior, members) => {
  /* c8 ignore next */if (behavior != null) _core.dogma.expect("behavior", behavior, [_core.list, _core.map]); /* c8 ignore next */
  if (members != null) _core.dogma.expect("members", members, _core.map);
  {
    return createFunctionSimulator(behavior, members);
  }
};
simulator.fun.resolves = value => {
  {
    return createFunctionSimulator({
      'resolves': value
    });
  }
};
simulator.fun.rejects = value => {
  {
    return createFunctionSimulator({
      'rejects': value
    });
  }
};
simulator.fun.returns = value => {
  {
    return createFunctionSimulator({
      'returns': value
    });
  }
};
simulator.fun.raises = value => {
  {
    return createFunctionSimulator({
      'raises': value
    });
  }
};
simulator.fun.invokes = fun => {
  {
    return createFunctionSimulator({
      'invokes': fun
    });
  }
};
simulator.constructor = simulator.fun;
simulator.constructor.returns = simulator.fun.returns;
simulator.constructor.raises = simulator.fun.raises;
simulator.constructor.invokes = simulator.fun.invokes;
simulator.field = field;
simulator.stream = {
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
function createObjectSimulator(def) {
  /* c8 ignore next */_core.dogma.expect("def", def, _core.map);
  {
    const sim = Simulator({
      'members': createMembers(def)
    });
    return (0, _core.proxy)({}, {
      ["get"]: (_, member) => {
        /* c8 ignore next */_core.dogma.expect("_", _); /* c8 ignore next */
        _core.dogma.expect("member", member);
        {
          return sim.processGet(member);
        }
      }
    });
  }
}
function createFunctionSimulator(def, members) {
  /* c8 ignore next */if (def != null) _core.dogma.expect("def", def, [_core.list, _core.map]); /* c8 ignore next */
  if (members != null) _core.dogma.expect("members", members, _core.map);
  {
    if (members) {
      members = createMembers(members);
    }
    let behavior;
    if (_core.dogma.is(def, _core.list)) {
      let Behavior = PositionBasedBehavior;
      {
        const _ = (0, _core.len)(def);
        switch (_) {
          case 0:
            {
              _core.dogma.nop();
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
          case 1:
            {
              if (_core.dogma.includes(_core.dogma.getItem(def, 0), "args") && !_core.dogma.includes(_core.dogma.getItem(def, 0), "i")) {
                Behavior = ArgsBasedBehavior;
              }
            } /* c8 ignore start */
            break;
          /* c8 ignore stop */
          default:
            {
              if (!_core.dogma.includes(!_core.dogma.includes(_core.dogma.getItem(def, 0), "default") ? _core.dogma.getItem(def, 0) : _core.dogma.getItem(def, 1), "i")) {
                Behavior = ArgsBasedBehavior;
              }
            }
        }
      }
      behavior = Behavior();
      for (const resp of def) {
        behavior.addResponse(resp);
      }
    } else if (_core.dogma.is(def, _core.map)) {
      behavior = PositionBasedBehavior();
      behavior.addResponse(_core.dogma.clone(def, {
        "default": true
      }, {}, [], []));
    } else {
      behavior = PositionBasedBehavior();
      behavior.addResponse({
        'default': true,
        'returns': null
      });
    }
    const sim = Simulator({
      'callBehavior': behavior,
      'members': members
    });
    return (0, _core.proxy)(_core.dogma.nop(), {
      ["construct"]: (_, args) => {
        /* c8 ignore next */_core.dogma.expect("_", _); /* c8 ignore next */
        _core.dogma.expect("args", args);
        {
          return sim.processCall(args);
        }
      },
      ["apply"]: (_, thisArg, args) => {
        /* c8 ignore next */_core.dogma.expect("_", _); /* c8 ignore next */
        _core.dogma.expect("args", args);
        {
          return sim.processCall(args);
        }
      },
      ["get"]: (_, member, receiver) => {
        /* c8 ignore next */_core.dogma.expect("_", _); /* c8 ignore next */
        _core.dogma.expect("member", member); /* c8 ignore next */
        _core.dogma.expect("receiver", receiver);
        {
          return sim.processGet(member);
        }
      }
    });
  }
}