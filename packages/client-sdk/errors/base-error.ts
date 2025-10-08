export class BaseError extends Error {

  public readonly code: string;
  public readonly cause?: Error;
  public readonly reference?: string;

  constructor(message: string, code: string, cause?: Error, reference?: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype)

    this.code = code;
    this.cause = cause;
    this.reference = reference;

    if (typeof Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
