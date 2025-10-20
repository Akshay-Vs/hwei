import axios from "axios";
import { BaseError } from "@errors/base-error";


export const withErrorHandling = <Args extends any[], ReturnType>(
  fn: (...args: Args) => Promise<ReturnType>
): ((...args: Args) => Promise<ReturnType>) => {
  return async (...args: Args): Promise<ReturnType> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 401:
            throw new BaseError(
              "Unauthorized request, cannot access resource",
              "E_UNAUTHORIZED",
              error as Error,
              "https://github.com/Akshay-Vs/hwei/issues/new"
            );
          case 400:
            throw new BaseError(
              "Invalid request body",
              "E_BAD_REQUEST",
              error as Error,
              "https://github.com/Akshay-Vs/hwei/issues/new"
            );
          case 404:
            throw new BaseError(
              "Resource not found",
              "E_NOT_FOUND",
              error as Error,
              "https://github.com/Akshay-Vs/hwei/issues/new"
            );
          case 409:
            throw new BaseError(
              "Operation failed due to a conflict or duplicate record",
              'E_CONFLICT',
              error as Error,
              "https://github.com/Akshay-Vs/hwei/issues/new"
            )
          default:
            throw new BaseError(
              (error as Error).message,
              "E_UNKNOWN",
              error as Error,
              "https://github.com/Akshay-Vs/hwei/issues/new"
            );
        }
      }

      throw new BaseError(
        (error as Error).message,
        "E_UNKNOWN",
        error as Error,
        "https://github.com/Akshay-Vs/hwei/issues/new"
      );
    }
  };
};

