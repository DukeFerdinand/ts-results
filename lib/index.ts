export enum ResultType {
  Ok = 'Ok',
  Err = 'Err'
}

export interface ResultProto<T, E> {
  /**
   * ### type
   * Not likely to be used, but could be useful if stringification is ever needed
   *
   * type will only ever be `Ok` or `Err`
   */
  type: ResultType;

  /**
    * ### isOk
    * `true` if instance of `Ok` variant, else false
  */
  isOk(): boolean;

  /**
    * ### isErr
    * `true` if instance of `Err` variant, else false
  */
  isErr(): boolean;

  /**
   * ### unwrap
   * Assuming the `Result` type is `Ok`:
   * Returns the wrapped value. Unlike Rust, the wrapper class is not destroyed
   *
   * Assuming
  */
  unwrap(): T;

  /**
    * ### unwrapErr
    * Assuming the `Result` type is `Ok`:
    * Throws a type error. You can't unwrap an error if the instance is not an error.
    *
    * Assuming the `Result` type is `Err`:
  */
  unwrapErr(): E;
}

export class Ok<T> implements ResultProto<T, never> {
  private value: T;
  public type: ResultType;
  constructor(val: T) {
    this.value = val
    this.type = ResultType.Ok
  }

  public isOk() { return true }
  public isErr() { return false }

  public unwrap() { return this.value }
  public unwrapErr(): never {
    throw new TypeError('[RESULT ERROR] Attempted to call `unwrapErr` on `Ok` Result variant')
  }
}

export class Err<E> implements ResultProto<never, E> {
  private value: E;
  public type: ResultType;
  constructor(val: E) {
    this.value = val
    this.type = ResultType.Err
  }

  public isOk() { return false }
  public isErr() { return true }

  public unwrap(): never {
    throw new TypeError('[RESULT ERROR] Attempted to call `unwrapErr` on `Ok` Result variant')
  }
  public unwrapErr() { return this.value }
}


export type Result<T, E> = Ok<T> | Err<E>

export const ok = <T>(val: T) => new Ok(val)
export const err = <E>(val: E) => new Err(val)
