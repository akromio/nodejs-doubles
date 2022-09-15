"use strict";

var _core = require("@dogmalang/core");

const $Double = class Double {
  constructor(_) {
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */

    /* c8 ignore start */

    if (this._pvt_cb9cf777cf7912870cb7631893f35053___init__ instanceof Function) this._pvt_cb9cf777cf7912870cb7631893f35053___init__(_);
    /* c8 ignore stop */

    /* c8 ignore start */

    if (this._pvt_cb9cf777cf7912870cb7631893f35053___post__ instanceof Function) this._pvt_cb9cf777cf7912870cb7631893f35053___post__();
    /* c8 ignore stop */

    /* c8 ignore start */

    if (this._pvt_cb9cf777cf7912870cb7631893f35053___validate__ instanceof Function) this._pvt_cb9cf777cf7912870cb7631893f35053___validate__();
    /* c8 ignore stop */
  }

};
const Double = new Proxy($Double, {
  /* c8 ignore start */
  apply(receiver, self, args) {
    throw "'Double' is abstract.";
  }
  /* c8 ignore stop */


});
module.exports = exports = Double;