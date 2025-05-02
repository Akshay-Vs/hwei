import {
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from 'generated/runtime/library';

interface InternalErrorHandlerProps {
  error: unknown;
  entity: string;
  logger: Logger;
}

export const handleInternalError = ({
  error,
  entity,
  logger,
}: InternalErrorHandlerProps): never => {
  if (error == null) {
    logger.error(
      'An error occured, but the error object is null',
      'InternalErrorHandler',
    );
    throw new InternalServerErrorException(`Operation failed unexpectedly`);
  }

  // Use the correct Prisma error class
  if (error instanceof PrismaClientKnownRequestError) {
    logger.error(`[Prisma ${error.code}] : ${error.message}`, error.stack);

    switch (error.code) {
      case 'P2002':
        throw new ConflictException(
          `${entity} with same identifier already exists`,
        );
      case 'P2025':
        throw new NotFoundException(`${entity} not found`);
      case 'P2003':
        throw new BadRequestException(
          `Operation failed due to an invalid reference`,
        );
      case 'P2014':
        throw new BadRequestException(
          `Operation failed due to a relation error`,
        );
      default:
        throw new InternalServerErrorException(
          `Operation could not be completed`,
        );
    }
  }

  if (error instanceof Error) {
    logger.error(`[Error] : ${error.message}`, error.stack);
    throw new InternalServerErrorException(
      `Operation failed due to an internal error`,
    );
  }

  logger.error(`[Unknown] : ${JSON.stringify(error)}`);
  throw new InternalServerErrorException(`Operation failed unexpectedly`);
};
