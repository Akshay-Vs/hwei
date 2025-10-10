import { BaseError } from "./base-error";

type ErrorCode = "E_MISSING_KEY" | "E_INVALID_KEY" | "E_INVALID_VALUE"

const reference = "gihub.com/akshay-vs/hwei/blob/main/packages/client-sdk/src/errors/configuration_error.ts";

export class ConfigurationError extends BaseError {
  constructor(message: string, code: ErrorCode, cause?: Error) {
    super(message, code, cause, reference.concat(`#${code}`));
  }
}
