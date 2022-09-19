/// <reference types="node" />

declare module "@akromio/doubles" {
  type Class = {new (): Class}

  /**
   * Creates a dummy simulator.
   *
   * @returns The simulator instance.
   */
  export function simulator(): any

  /**
   * Creates an object simulator from its members.
   *
   * @param members - The members to simulate.
   * @returns The simulator instance.
   */
  export function simulator(members: any): any

  /**
   * Creates an instance simulator for a given class.
   *
   * @param C - The class object to simulate.
   * @param members - The members to simulate.
   * @retuns The simulator instance for the given instance.
   */
  export function simulator(C: any, members: any): typeof C

  /**
   * Creates an interceptor for a given object.
   *
   * @param obj - The object to intercept.
   * @param members - The members to intercept.
   * @returns The interceptor.
   */
  export function interceptor(obj: any, members: any): typeof obj

  /**
   * Returns a method simulator.
   *
   * @param responses - The responses to use.
   * @returns The method simulator.
   */
  export function method(responses?: any): (...args: any[]) => void

  namespace method {
    /**
     * Creates and returns a simulator to return the value returned
     * by a function.
     *
     * @param fun - Function to run for getting the value.
     */
    function invokes(fun: () => void): (...args: any[]) => any

    /**
     * Creates and returns a simulator to return a given value.
     *
     * @param value - The value to return.
     */
    function returns(value?: any): (...args: any[]) => any

    /**
     * Creates and returns a simulator to raise a given value.
     *
     * @param value - The value to raise.
     */
    function raises(value?: any): (...args: any[]) => void

    /**
     * Creates and returns a simulator to resolve a given value.
     *
     * @param value - The value to resolve.
     */
    function resolves(value?: any): (...args: any[]) => Promise<any>

    /**
     * Creates and returns a simulator to reject a given value.
     */
    function rejects(value?: any): (...args: any[]) => Promise<any>
  }

  /**
   * Returns a field simulator.
   *
   * @param responses - The responses to use.
   * @returns The field simulator.
   */
  export function field(responses: any): any

  namespace field {
    /**
     * Creates and returns a field simulator
     * to return a given value.
     *
     * @param value - The value to return.
     */
    function returns(value?: any): any
  }

  /**
   * The monitor options.
   */
  interface MonitorOpts {
    /**
     * The members to supervise.
     * If not set, all monitored.
     */
    members?: string[]

    /**
     * The methods to supervise.
     * If set, onlyCalls set implicitly.
     */
    methods?: string[]

    /**
     * The method to supervise.
     * If set, onlyCalls set implicitly.
     */
    method?: string

    /**
     * To set if the only to monitor member functions.
     */
    onlyCalls?: boolean
  }

  /**
   * Creates a monitor to supervise an object.
   *
   * @param object - The object to supervise.
   * @param opts - The monitor options.
   */
  function monitor(object: any, opts?: MonitorOpts): typeof object

  namespace monitor {
    /**
     * Removes all the monitors.
     */
    function clearAll(): void

    /**
     * Removes a monitor.
     *
     * @param monitor - The monitor to remove if it exists.
     */
    function clear(monitor: any): boolean

    /**
     * Returns the log for a monitor.
     *
     * @param monitor - The monitor to returned its log.
     * @param options - Options: clear, get and clear.
     */
    function log(monitor: any, options?: {clear?: boolean}): Log
  }

  /**
   * A log entry.
   */
  interface Entry {
    /**
     * The value returned or raised.
     */
    value?: any

    /**
     * The result: return or raise.
     */
    result: Result

    /**
     * Check whether the result is a return.
     */
    returned: boolean

    /**
     * Check whether the result is a raise.
     */
    raised: boolean

    /**
     * Check whether returned a given value.
     *
     * @param value - The value to check.
     */
    returnedValue(value?: any): boolean

    /**
     * Check whether returned a value of a given type.
     *
     * @param Type - The type to check.
     */
    returnedType(Type: any): boolean

    /**
     * Check whether raised a given value.
     *
     * @param value - The value to check.
     */
    raisedValue(value?: any): boolean

    /**
     * Check whether raised a value of a given type.
     *
     * @param Type - The type to check.
     */
    raisedType(Type: any): boolean
  }

  /**
   * A member access.
   */
  interface Access extends Entry {
    /**
     * The member name.
     */
    member: string

    /**
     * The kind of access.
     */
    kind: AccessKind

    /**
     * Checks whether the access is a get/read.
     */
    isGet(): boolean

    /**
     * Checks whether the access is a set/update.
     */
    isSet(): boolean
  }

  /**
   * Kind of member access.
   */
  enum AccessKind {
    get,
    set
  }

  /**
   * A function call.
   */
  interface Call extends Entry {
    /**
     * The arguments passed to the function in the call.
     */
    args: any[]

    /**
     * Check whether the args are these passed to the call.
     *
     * @param args - The arguments to check.
     */
    calledWith(args: any[]): boolean
  }

  /**
   * A log where the field accesses and the function calls are saved.
   */
  interface Log {
    /**
     * The number of entries.
     */
    len: number

    /**
     * The number of calls.
     */
    calls: number

    /**
     * The number of field accesses.
     */
    accesses: number

    /**
     * The number of returns.
     */
    returns: number

    /**
     * The number of raises.
     */
    raises: number

    /**
     * Returns the times returned a given value.
     *
     * @param value - The value to check.
     */
    returnedValue(value?: any): number

    /**
     * Return the times returned a value of a given type.
     *
     * @param Type - The type to check.
     */
    returnedType(Type: any): number

    /**
     * Returns the times raised a given value.
     *
     * @param value - The value to check.
     */
    raisedValue(value?: any): number

    /**
     * Returns the times raised a value of a given type.
     *
     * @param Type - The type to check.
     */
    raisedType(Type: any): number

    /**
     * Returns the times a call called with the given args.
     *
     * @param args - The arguments to check.
     */
    calledWith(args: any[]): number

    /**
     * Returns a given entry from its index/position.
     *
     * @param i - The index/position to return.
     */
    getEntry(i: number): Entry

    /**
     * Sugar for getEntry(0).
     */
    entry: Entry

    /**
     * Returns a call from its index.
     *
     * @param i - The index/position to return.
     */
    getCall(i: number): Call

    /**
     * Sugar for getCall(0).
     */
    call: Call

    /**
     * Returns a field access from its index.
     *
     * @param i - The index/position to return.
     */
    getAccess(i: number): Access
  }

  /**
   * The result kind of an access or a call.
   */
  enum Result {
    returned,
    raised
  }
}
