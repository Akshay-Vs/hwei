import { AxiosError } from "axios";
import { BaseError } from "@errors/base-error";


export const withErrorHandling = <Args extends any[], ReturnType>(
  fn: (...args: Args) => Promise<ReturnType>
): ((...args: Args) => Promise<ReturnType>) => {
  return async (...args: Args): Promise<ReturnType> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new BaseError(error.message, error.code || "E_UNKNOWN", error);
      }

      throw new BaseError(
        (error as Error).message,
        "E_UNKNOWN",
        error as Error,
        "github.com/akshay-vs/hwei/issues/new"
      );
    }
  };
};

