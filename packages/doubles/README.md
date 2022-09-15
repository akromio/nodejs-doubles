# `@akromio/doubles`

[![NPM version](https://img.shields.io/npm/v/@akromio/doubles.svg)](https://npmjs.org/package/@akromio/doubles)
[![Total downloads](https://img.shields.io/npm/dt/@akromio/doubles.svg)](https://npmjs.org/package/@akromio/doubles)

Doubles library to simulate objects:

- **Monitors** to save the accesses and the calls to objects.

- **Simulators** to simulate the behavior of an object or a function.

You can create mocks by combining simulator and monitor.

*Product of Spain, made in Valencia by Sia Codelabs.*

## Monitors

A **monitor** is an object to save the accesses to an object or the calls to a function.
Similar to the spies.

### Object monitor

An **object monitor** monitors an object: its field accesses and its method calls.
We can use the monitor as the object being monitored.

We can create a monitor for an object as follows:

```javascript
const {monitor} = require("@akromio/doubles");
const object = {/* ... */};

//monitor all: field accesses and calls
const m = monitor(object);

//monitor only the calls
const m = monitor(object, {onlyCalls: true});

//monitor only given members
const m = monitor(object, {members: ["member1", "member2"]});
const m = monitor(object, {members: ["method1", "method2"], onlyCalls: true});

//examples of use
console.log(m.x);       //monitored
console.log(object.x);  //not monitored, using object directly
```

When an object monitored, we have two kinds of entry in the log:

- **Access**, a member access.

- **Call**, a function object call.

When a method is accessed, we can't forget that two operations are performed:

1. The access to the function object.

2. The function object call.

If only the method calls must be monitored, use the `onlyCalls` option.

### Function monitor

A **function monitor** monitors a function.
We can use the monitor as the function object being monitored.

We can create a monitor for a function object as follows:

```javascript
const {monitor} = require("@akromio/doubles");
function fn(/*...*/) { /* ... */ }

//monitor function calls
const m = monitor(fn);

//examples of use
console.log(m(1, 2));   //monitored
console.log(fn(1, 2));  //not monitored, using function object directly
```

### Monitor clear

To clear a monitor:

```javascript
const m = monitor({});
monitor.clear(m);
```

### Monitor log

A monitor has a **log**, where the accesses and the calls are saved.
To get the log associated to a monitor, use the `monitor.log()` function:

```typescript
function log(m, opts?: {clear: boolean}): any
```

If `clear` specified, `monitor.clear(m)` is performed too.

Example:

```javascript
const m = monitor({});

//work with m

const log = monitor.log(m);
```

#### Operations with the log

```javascript
//number of calls, not keeping in mind the field accesses
log.calls

//number of field accesses, not keeping in mind the calls
log.accesses

//number of log entries (calls + accesses)
log.len

//number of operations returning
log.returns

//number of times a given value returned
log.returnedValue(value)

//number of times a value returned of a given type
log.returnedType(Type)

//number of operations raising an error
log.raises

//number of times a given value raised
log.raisedValue(value)

//number of times a value raised of a given type
log.raisedType(Type)

//number of times called with a given arguments
log.calledWith([arg1, arg2...])

//given entry by its index in the log
log.getEntry(i)

//given call by its index in the log, not keeping in mind the accesses
log.getCall(i)

//given field access by its index in the log, not keeping in mind the calls
log.getAccess(i)
```

When `getEntry()`, `getCall()` or `getAccess()` used, the instances returned are of the following types:

- `Access`, representing a field access:

  Member | Date type | Description
  -- | -- | --
  member | string | Member name.
  value | any | Value returned or raised.
  returned | boolean | Did the access return a value?
  raised | boolean | Did the access raise an error?
  returnedValue(value) | boolean | Was the given value returned?
  returnedType(Type) | boolean | Is the returned value of the given type?
  raisedValue(value) | boolean | Was the given value raised?
  raisedType(Type) | boolean | Is the raised value of the given type?
  isGet() | boolean | Is a read access?
  isSet() | boolean | Is a write access?

- `Call`, representing a function/method call:

  Member | Date type | Description
  -- | -- | --
  value | any | Value returned or raised by the call.
  returned | boolean | Did the call return a value?
  raised | boolean | Did the call raise an error?
  returnedValue(value) | boolean | Was the given value returned?
  returnedType(Type) | boolean | Is the returned value of the given type?
  raisedValue(value) | boolean | Was the given value raised?
  raisedType(Type) | boolean | Is the raised value of the given type?
  calledWith([arg1, arg2...]) | boolean | Were the given arguments passed to the call?

Examples:

```javascript
const log = monitor.log(m);

expected(log.calls).equalTo(1);
expected(log.getCall(0)).toHave({value: 123});
```

## Simulator

A **simulator** is an object to simulate another, defining only the responses.

### Function simulator

A **function simulator** is a simulator for a function.
This is defined with the `simulator.fun()` function:

```javascript
//returning always null
simulator.fun(): function

//returning attending to given behavior/responses
simulator.fun(behavior: object[]|object): function
```

The `behavior` is an object containing the responses for the calls.
If we always want to perform the same operation, we can use an object, as follows:

```javascript
fn = simulator.fun({returns: 1234});
fn(/*...*/)  //returns 1234

fn = simulator.fun({raises: new Error("my error")});
fn(/*...*/)  //throws the error

fn = simulator.fun({resolves: 1234});
await(fn(/*...*/))  //returns 1234

fn = simulator.fun({rejects: new Error("my error")});
await(fn(/*...*/))  //throws the error
```

The following fields are possible:

Field | Data type | Description
-- | -- | --
returns | any | Value to return.
raises | any | Value to raise.
resolves | any | Value to return using a resolved promise.
rejects | any | Value to raise using a rejected promise.
invokes | function | Function to call, the value returned by this function will be the value returned. The arguments passed to the simulated function are passed to the function.

But if we want to select among several possibilities, we have to use an array of objects.
Two types are possible: position-based or arguments-based.

On the one hand, we can use a **position-based behavior**, keeping in mind the arguments passed to the calls aren't used.
In this case, the first response must contain the `i` field set to `0`.
Example:

```javascript
const m = simulator.fun([
  {i: 0, returns: 1234},
  {returns: 5678},
  {default: true, returns: 13579}
]);

m("one")    //returns 1234
m("two")    //returns 5678
m("three")  //returns 13579
m("four")   //returns 13579
```

The **default response**, defined with `default` to `true`, is used when call out of range.
If not defined, in the previous example, the third and fourth calls will raise an error.

On the other hand, we have the **arguments-based behavior**, using the arguments to select the response.
These are defined with an `args` field.
Example:

```javascript
fn = simulator.fun([
  {default: true, returns: "default value"},
  {args: [12, 34], returns: 1234},
  {args: [34, 12], raises: new Error("my error")},
  {args: [12, 34, 56], resolves: 135},
  {args: [56, 34, 12], rejects: new Error("my error")}
]);

fn()                  //returns "default value", arguments not found in the responses
fn(34, 12)            //throws error
fn(12, 34)            //returns 1234
await(fn(56, 34, 12)) //throws error
await(fn(12, 34, 56)) //returns 135
fn(1, 3, 5, 7, 9)     //returns "default value", arguments not found in the responses
```

If the function simulator must simulate fields too, we can define its members in the second argument of `simulator.fun()`:

```javascript
fn = simulator.fun(
  {returns: 1234},  //always returns  1234, but this argument can be an array
  {
    x: simulator.field({returns: "value of x"}),
    y: simulator.field({returns: "value of y"})
  }
);

fn()        //returns 1234
fn(12, 34)  //returns 1234
fn.x        //returns value of x
fn.y        //returns value of y
```

### Object simulator

An **object simulator** is a simulator for a (non-callable) object.
These are created with `simulator()`:

```javascript
const {simulator} = require("@akromio/doubles");
const {field, fun} = simulator;

const obj = simulator({
  member1: field(/*...*/),
  member2: fun(/*...*/)
});
```

The fields must be defined with `simulator.field()` and the methods with `simulator.fun()` or its alias `simulator.method()`.

Example:

```javascript
const {simulator} = require("@akromio/doubles");
const {field, fun} = simulator;

const m = simulator({
  x: field({returns: 12}),
  y: field({raises: new Error("my error")}),
  z: fun({returns: 1234})
});

m.x   //returns 12
m.y   //raises an error
m.z() //returns 1234
```

The fields can have position-based behaviors if needed, defined as seen with `simulator.fun()`.

#### Special fields

```javascript
simulator.field.uuid()         //similar to: simulator.field({default: true, returns: uuid.v4()})
simulator.field.list(returns)  //similar to: simulator.field({default: true, returns: returns ?? []})
simulator.field.map(returns)   //similar to: simulator.field({default: true, returns: returns ?? {}})
simulator.field.text(returns)  //similar to: simulator.field({default: true, returns: "text to return"})
simulator.field.bool(returns)  //similar to: simulator.field({default: true, returns: true|false})
simulator.field.any(returns)   //similar to: simulator.field({default: true, returns: value})
```

**Important**. When a `returns` passed, a clone of the value is used.
So well, the original value is not modified.
